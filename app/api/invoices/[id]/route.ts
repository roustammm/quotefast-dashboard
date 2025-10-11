import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '../../../../lib/supabase';

const supabase = getSupabase();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customers (
          id,
          name,
          email
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error fetching invoice:', error);
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Error in get invoice API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      invoice_number, 
      customer_id, 
      title, 
      description, 
      total, 
      status,
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

    // Update invoice
    const { data: invoice, error } = await supabase
      .from('invoices')
      .update({
        invoice_number,
        customer_id,
        title,
        description,
        total,
        status,
        due_date,
        items: JSON.stringify(items),
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating invoice:', error);
      return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Error in update invoice API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting invoice:', error);
      return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error in delete invoice API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
