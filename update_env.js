const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔧 Updating .env.local with service role key...');

try {
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';
  
  // Check if service role key exists
  if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
    // Replace existing key
    envContent = envContent.replace(
      /SUPABASE_SERVICE_ROLE_KEY=.*/,
      `SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`
    );
    console.log('✅ Service role key updated');
  } else {
    // Add service role key
    envContent += `\nSUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}\n`;
    console.log('✅ Service role key added');
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local updated successfully');
  
} catch (error) {
  console.error('❌ Error updating .env.local:', error.message);
}

console.log('\n🎯 Now you can run all scripts:');
console.log('- npm run test:connection');
console.log('- npm run test:registration');
console.log('- npm run fix:database');
console.log('\n🚀 Try registering again in your browser!');
