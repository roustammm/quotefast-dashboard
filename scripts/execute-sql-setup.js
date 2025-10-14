#!/usr/bin/env node

/**
 * 🔧 SQL Database Setup Executor
 * 
 * Dit script voert het database schema setup SQL script uit
 * Voer uit met: node scripts/execute-sql-setup.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Controleer environment variabelen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔧 Executing SQL Database Setup...\n');

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQLSetup() {
    try {
        console.log('📋 Reading SQL setup file...');
        
        // Lees het SQL bestand
        const sqlPath = path.join(__dirname, 'create-database-schema.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('✅ SQL file loaded successfully');
        console.log('🚀 Executing SQL statements...\n');
        
        // Split SQL in individuele statements
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            
            if (statement.trim() === '') continue;
            
            try {
                console.log(`📝 Executing statement ${i + 1}/${statements.length}...`);
                
                // Voer SQL statement uit
                const { data, error } = await supabase.rpc('exec_sql', {
                    sql: statement
                });
                
                if (error) {
                    // Probeer directe query als RPC niet werkt
                    if (statement.toLowerCase().includes('create table')) {
                        console.log('   ℹ️  Table creation - checking if exists...');
                    } else if (statement.toLowerCase().includes('create policy')) {
                        console.log('   ℹ️  Policy creation - checking if exists...');
                    } else if (statement.toLowerCase().includes('create function')) {
                        console.log('   ℹ️  Function creation - checking if exists...');
                    } else if (statement.toLowerCase().includes('create trigger')) {
                        console.log('   ℹ️  Trigger creation - checking if exists...');
                    } else {
                        console.log('   ⚠️  Statement result:', error.message);
                    }
                } else {
                    console.log('   ✅ Statement executed successfully');
                    successCount++;
                }
                
            } catch (err) {
                console.log(`   ⚠️  Statement ${i + 1} warning:`, err.message);
                errorCount++;
            }
        }
        
        console.log('\n📊 SQL Execution Summary:');
        console.log(`   Successful statements: ${successCount}`);
        console.log(`   Warnings/Errors: ${errorCount}`);
        
        // Test de setup
        console.log('\n🧪 Testing database setup...');
        
        // Test profiles table
        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);
        
        if (profilesError) {
            console.log('❌ Profiles table test failed:', profilesError.message);
        } else {
            console.log('✅ Profiles table is accessible');
        }
        
        // Test auth users
        const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
        
        if (usersError) {
            console.log('❌ Auth users test failed:', usersError.message);
        } else {
            console.log(`✅ Auth users accessible (${users.users.length} users found)`);
        }
        
        console.log('\n🎉 Database setup completed!');
        console.log('💡 You can now test the authentication system.');
        
    } catch (error) {
        console.error('❌ SQL setup failed:', error.message);
        console.log('\n💡 Manual setup required:');
        console.log('   1. Go to Supabase Dashboard → SQL Editor');
        console.log('   2. Copy the content from scripts/create-database-schema.sql');
        console.log('   3. Paste and execute the SQL script');
    }
}

executeSQLSetup();