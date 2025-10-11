import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get email settings for the current user
    const { data: settings, error } = await supabase
      .from('user_email_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching email settings:', error);
      return NextResponse.json({ error: 'Failed to fetch email settings' }, { status: 500 });
    }

    // Return default settings if none exist
    const defaultSettings = {
      smtp_host: '',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      from_email: user.email || '',
      from_name: '',
      reply_to: user.email || '',
      use_tls: true,
      use_ssl: false,
      enabled: false
    };

    return NextResponse.json({ 
      settings: settings || defaultSettings 
    });
  } catch (error) {
    console.error('Error in GET /api/settings/email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      smtp_host, 
      smtp_port, 
      smtp_username, 
      smtp_password, 
      from_email, 
      from_name, 
      reply_to,
      use_tls,
      use_ssl,
      enabled 
    } = body;

    // Validate required fields
    if (!smtp_host || !smtp_username || !from_email) {
      return NextResponse.json({ 
        error: 'SMTP host, username, and from email are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Upsert email settings
    const { data: settings, error } = await supabase
      .from('user_email_settings')
      .upsert({
        user_id: user.id,
        smtp_host,
        smtp_port: parseInt(smtp_port) || 587,
        smtp_username,
        smtp_password, // In production, encrypt this
        from_email,
        from_name: from_name || '',
        reply_to: reply_to || from_email,
        use_tls: use_tls !== false,
        use_ssl: use_ssl === true,
        enabled: enabled !== false,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving email settings:', error);
      return NextResponse.json({ error: 'Failed to save email settings' }, { status: 500 });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error in POST /api/settings/email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    // Only update provided fields
    const allowedFields = [
      'smtp_host', 'smtp_port', 'smtp_username', 'smtp_password',
      'from_email', 'from_name', 'reply_to', 'use_tls', 'use_ssl', 'enabled'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Validate email format if provided
    if (updateData.from_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.from_email)) {
        return NextResponse.json({ 
          error: 'Invalid email format' 
        }, { status: 400 });
      }
    }

    // Update email settings
    const { data: settings, error } = await supabase
      .from('user_email_settings')
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating email settings:', error);
      return NextResponse.json({ error: 'Failed to update email settings' }, { status: 500 });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error in PUT /api/settings/email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
