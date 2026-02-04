require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

(async () => {
  try {
    // Check environment variables
    if (!process.env.SUPABASE_URL) {
      console.error('❌ Error: SUPABASE_URL must be set in .env file');
      process.exit(1);
    }

    // Use service role key if available (for admin operations), otherwise use anon key
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!supabaseKey) {
      console.error('❌ Error: SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY must be set');
      console.error('   Note: SUPABASE_SERVICE_ROLE_KEY is recommended for creating admin users');
      process.exit(1);
    }

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('ℹ️  Using service role key (recommended for admin operations)\n');
    } else {
      console.log('⚠️  Using anon key (may have permission issues - consider using SUPABASE_SERVICE_ROLE_KEY)\n');
    }

    const supabase = createClient(process.env.SUPABASE_URL, supabaseKey);

    // Test connection
    console.log('🔍 Testing Supabase connection...');
    const { error: testError } = await supabase.from('users').select('id').limit(1);
    if (testError && !testError.message.includes('does not exist') && !testError.message.includes('permission denied')) {
      console.error('❌ Connection error:', testError.message);
      console.error('   Make sure your Supabase project is active and tables are created');
      process.exit(1);
    }
    console.log('✅ Connected to Supabase\n');

    // Get admin credentials
    const username = await ask('Enter admin username (default: admin): ') || 'admin';
    const password = await ask('Enter admin password: ');
    
    if (!password) {
      console.error('❌ Password cannot be empty');
      rl.close();
      process.exit(1);
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, username')
      .eq('username', username)
      .single();

    if (existingUser) {
      const overwrite = await ask(`User "${username}" already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ Cancelled');
        rl.close();
        process.exit(0);
      }
    }

    // Hash password
    console.log('\n🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed\n');

    // Insert or update user
    const userData = {
      username,
      password: hashedPassword,
      role: 'admin',
      admin: true
    };

    if (existingUser) {
      // Update existing user
      const { error: updateError } = await supabase
        .from('users')
        .update(userData)
        .eq('username', username);

      if (updateError) {
        console.error('❌ Error updating user:', updateError.message);
        console.error('   Details:', updateError);
        rl.close();
        process.exit(1);
      }
      console.log(`✅ Admin user "${username}" updated successfully!`);
    } else {
      // Insert new user
      const { error: insertError } = await supabase
        .from('users')
        .insert([userData]);

      if (insertError) {
        console.error('❌ Error creating user:', insertError.message);
        console.error('   Details:', insertError);
        rl.close();
        process.exit(1);
      }
      console.log(`✅ Admin user "${username}" created successfully!`);
    }

    console.log('\n📝 Summary:');
    console.log(`   Username: ${username}`);
    console.log(`   Role: admin`);
    console.log(`   Password: [hidden]`);
    console.log('\n✅ Setup complete! You can now log in at /admin/login');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error('   Stack:', error.stack);
    process.exit(1);
  } finally {
    rl.close();
  }
})();
