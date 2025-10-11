import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase';

const supabase = createServerSupabaseClient();

export async function GET(request: NextRequest) {
  try {
    const { data: invoices, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customers (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching invoices:', error);
      return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Error in invoices API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      invoice_number, 
      customer_id, 
      title, 
      description, 
      total, 
      status = 'draft',
      due_date,
      items = []
    } = body;

    // Validate required fields
    if (!invoice_number || !customer_id || !title || !total) {
      return NextResponse.json(
        { error: 'Missing required fields: invoice_number, customer_id, title, total' },
        { status: 400 }
      );
    }

    // Create invoice
    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number,
        customer_id,
        title,
        description,
        total,
        status,
        due_date,
        items: JSON.stringify(items)
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating invoice:', error);
      return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Error in create invoice API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
