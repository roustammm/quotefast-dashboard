# GitHub Copilot Instructions for QuoteFast Dashboard

## Project Overview
This is a Next.js 14 dashboard application with TypeScript, Tailwind CSS, and Supabase integration. The project focuses on invoice management, customer relations, and AI-powered features.

## Code Style Guidelines

### TypeScript
- Use strict TypeScript with proper type definitions
- Prefer interfaces over types for object shapes
- Use generic types for reusable components
- Always define return types for functions
- Use proper error handling with custom error types

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Use Next.js 14 App Router patterns
- Prefer server components when possible
- Use proper loading and error states

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming
- Implement proper dark/light mode support
- Use consistent spacing and typography scales

### Performance
- Implement React.memo for expensive components
- Use useCallback and useMemo appropriately
- Optimize images with Next.js Image component
- Implement proper code splitting
- Use proper caching strategies

### Security
- Validate all user inputs
- Use proper authentication patterns
- Implement CSRF protection
- Sanitize data before rendering
- Use environment variables for secrets

## Common Patterns

### API Calls
```typescript
// Use the api-service pattern
const { data, error } = await customersApi.getAll();
if (error) {
  throw new Error(error);
}
return data;
```

### Error Handling
```typescript
// Use custom error types
try {
  // operation
} catch (error) {
  if (error instanceof ApiError) {
    // handle API error
  } else {
    // handle unexpected error
  }
}
```

### Component Structure
```typescript
interface ComponentProps {
  // Define props with proper types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX with proper accessibility
  );
};
```

## AI-Powered Features
- Implement performance monitoring hooks
- Use AI for code quality suggestions
- Implement automated testing patterns
- Use AI for accessibility improvements
- Implement smart caching strategies

## Testing
- Write unit tests for all utilities
- Test components with React Testing Library
- Implement integration tests for API calls
- Use proper mocking strategies
- Test accessibility features

## Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Performance Monitoring
- Use performance hooks for monitoring
- Implement bundle size tracking
- Monitor API response times
- Track user interaction metrics
- Implement error tracking

## Security Best Practices
- Validate all inputs
- Use proper authentication
- Implement rate limiting
- Use HTTPS everywhere
- Sanitize user-generated content

## Code Quality
- Follow ESLint rules strictly
- Use Prettier for formatting
- Implement proper TypeScript types
- Write self-documenting code
- Use meaningful variable names

## Database Patterns
- Use Supabase client properly
- Implement proper error handling
- Use transactions when needed
- Implement proper indexing
- Use proper data validation

## Deployment
- Use environment variables
- Implement proper CI/CD
- Use proper caching headers
- Monitor performance metrics
- Implement proper error logging
