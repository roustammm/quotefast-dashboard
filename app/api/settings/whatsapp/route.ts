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

    // Get WhatsApp settings for the current user
    const { data: settings, error } = await supabase
      .from('user_whatsapp_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching WhatsApp settings:', error);
      return NextResponse.json({ error: 'Failed to fetch WhatsApp settings' }, { status: 500 });
    }

    // Return default settings if none exist
    const defaultSettings = {
      business_account_id: '',
      access_token: '',
      phone_number_id: '',
      webhook_verify_token: '',
      enabled: false,
      auto_reply_enabled: false,
      auto_reply_message: '',
      business_hours: {
        enabled: false,
        timezone: 'Europe/Amsterdam',
        schedule: {
          monday: { enabled: true, start: '09:00', end: '17:00' },
          tuesday: { enabled: true, start: '09:00', end: '17:00' },
          wednesday: { enabled: true, start: '09:00', end: '17:00' },
          thursday: { enabled: true, start: '09:00', end: '17:00' },
          friday: { enabled: true, start: '09:00', end: '17:00' },
          saturday: { enabled: false, start: '09:00', end: '17:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        }
      }
    };

    return NextResponse.json({ 
      settings: settings || defaultSettings 
    });
  } catch (error) {
    console.error('Error in GET /api/settings/whatsapp:', error);
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
      business_account_id, 
      access_token, 
      phone_number_id, 
      webhook_verify_token,
      enabled,
      auto_reply_enabled,
      auto_reply_message,
      business_hours
    } = body;

    // Validate required fields
    if (!business_account_id || !access_token || !phone_number_id) {
      return NextResponse.json({ 
        error: 'Business account ID, access token, and phone number ID are required' 
      }, { status: 400 });
    }

    // Upsert WhatsApp settings
    const { data: settings, error } = await supabase
      .from('user_whatsapp_settings')
      .upsert({
        user_id: user.id,
        business_account_id,
        access_token, // In production, encrypt this
        phone_number_id,
        webhook_verify_token: webhook_verify_token || '',
        enabled: enabled !== false,
        auto_reply_enabled: auto_reply_enabled === true,
        auto_reply_message: auto_reply_message || '',
        business_hours: business_hours || {
          enabled: false,
          timezone: 'Europe/Amsterdam',
          schedule: {
            monday: { enabled: true, start: '09:00', end: '17:00' },
            tuesday: { enabled: true, start: '09:00', end: '17:00' },
            wednesday: { enabled: true, start: '09:00', end: '17:00' },
            thursday: { enabled: true, start: '09:00', end: '17:00' },
            friday: { enabled: true, start: '09:00', end: '17:00' },
            saturday: { enabled: false, start: '09:00', end: '17:00' },
            sunday: { enabled: false, start: '09:00', end: '17:00' }
          }
        },
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving WhatsApp settings:', error);
      return NextResponse.json({ error: 'Failed to save WhatsApp settings' }, { status: 500 });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error in POST /api/settings/whatsapp:', error);
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
      'business_account_id', 'access_token', 'phone_number_id', 'webhook_verify_token',
      'enabled', 'auto_reply_enabled', 'auto_reply_message', 'business_hours'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Update WhatsApp settings
    const { data: settings, error } = await supabase
      .from('user_whatsapp_settings')
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating WhatsApp settings:', error);
      return NextResponse.json({ error: 'Failed to update WhatsApp settings' }, { status: 500 });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error in PUT /api/settings/whatsapp:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
