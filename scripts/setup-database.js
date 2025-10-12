#!/usr/bin/env node

/**
 * Database Setup Script
 * This script sets up the database tables and RLS policies
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Starting database setup...');
  
  try {
    // Read migration files
    const fs = require('fs');
    const path = require('path');
    
    // Migration 1: Initial schema
    const migration1Path = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
    const migration1SQL = fs.readFileSync(migration1Path, 'utf8');
    
    // Migration 2: AI tables and RLS
    const migration2Path = path.join(__dirname, '../supabase/migrations/002_add_ai_tables_and_rls.sql');
    const migration2SQL = fs.readFileSync(migration2Path, 'utf8');
    
    console.log('📄 Executing migration 1: Initial schema...');
    const { error: error1 } = await supabase.rpc('exec_sql', { sql: migration1SQL });
    if (error1) {
      console.error('❌ Migration 1 failed:', error1);
      return;
    }
    console.log('✅ Migration 1 completed');
    
    console.log('📄 Executing migration 2: AI tables and RLS...');
    const { error: error2 } = await supabase.rpc('exec_sql', { sql: migration2SQL });
    if (error2) {
      console.error('❌ Migration 2 failed:', error2);
      return;
    }
    console.log('✅ Migration 2 completed');
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

// Run the setup
setupDatabase();
