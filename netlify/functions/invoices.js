// Netlify Function for invoices API
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get all invoices with customer data
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
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch invoices' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ invoices }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new invoice
      const body = JSON.parse(event.body);
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
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: invoice_number, customer_id, title, total'
          }),
        };
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
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to create invoice' }),
        };
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ invoice }),
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in invoices function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
