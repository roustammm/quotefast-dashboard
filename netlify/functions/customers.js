// Netlify Function for customers API
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
      // Get all customers
      const { data: customers, error } = await supabase
        .from('customers')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching customers:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch customers' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ customers }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new customer
      const body = JSON.parse(event.body);
      const { name, email, phone, address, company } = body;

      // Validate required fields
      if (!name || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: name, email'
          }),
        };
      }

      // Create customer
      const { data: customer, error } = await supabase
        .from('customers')
        .insert({
          name,
          email,
          phone,
          address,
          company
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating customer:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to create customer' }),
        };
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ customer }),
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in customers function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
