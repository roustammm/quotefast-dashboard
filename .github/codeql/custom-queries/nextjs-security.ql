/**
 * @name Next.js Security Issues
 * @description Custom queries to detect Next.js specific security vulnerabilities
 * @kind problem
 * @id javascript/nextjs-security
 * @severity error
 */

import javascript
import DataFlow::PathGraph

/**
 * Detects potential XSS vulnerabilities in Next.js dynamic imports
 */
predicate isDynamicImport(DataFlow::Node node) {
  exists(DataFlow::CallNode call |
    call = node.asExpr() and
    call.getTarget().hasQualifiedName("import") and
    call.getAnArgument().(StringLiteral).getValue().matches("%")
  )
}

/**
 * Detects unsafe use of dangerouslySetInnerHTML
 */
predicate isDangerouslySetInnerHTML(DataFlow::Node node) {
  exists(DataFlow::PropertyWrite prop |
    prop = node.asExpr() and
    prop.getPropertyName() = "dangerouslySetInnerHTML" and
    prop.getAnOperand().(DataFlow::CallNode).getTarget().hasQualifiedName("React.createElement")
  )
}

/**
 * Detects potential SQL injection in Supabase queries
 */
predicate isSupabaseQuery(DataFlow::Node node) {
  exists(DataFlow::CallNode call |
    call = node.asExpr() and
    (
      call.getTarget().hasQualifiedName("supabase.from") or
      call.getTarget().hasQualifiedName("supabase.rpc")
    )
  )
}

/**
 * Detects hardcoded secrets in environment variables
 */
predicate isHardcodedSecret(DataFlow::Node node) {
  exists(StringLiteral str |
    str = node.asExpr() and
    (
      str.getValue().matches("sk_%") or
      str.getValue().matches("pk_%") or
      str.getValue().matches("ghp_%") or
      str.getValue().matches("gho_%") or
      str.getValue().matches("ghu_%") or
      str.getValue().matches("ghs_%") or
      str.getValue().matches("ghr_%")
    )
  )
}

/**
 * Detects missing CSRF protection in API routes
 */
predicate isApiRoute(DataFlow::Node node) {
  exists(DataFlow::CallNode call |
    call = node.asExpr() and
    call.getTarget().hasQualifiedName("NextRequest") and
    call.getFile().getRelativePath().matches("app/api/%/route.ts")
  )
}

from DataFlow::Node node
where
  isDynamicImport(node) or
  isDangerouslySetInnerHTML(node) or
  isSupabaseQuery(node) or
  isHardcodedSecret(node) or
  isApiRoute(node)
select node, "Potential security vulnerability detected in Next.js application"
