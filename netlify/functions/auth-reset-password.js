// Netlify Function for password reset
const { logger } = require('../../lib/logger');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Basic validation
    if (!email || typeof email !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'E-mailadres is verplicht.' }),
      };
    }

    // In a real application, you would add logic here to:
    // 1. Check if the user with this email exists in your database.
    // 2. Generate a unique password reset token.
    // 3. Save the token and its expiry date to the user's record in the database.
    // 4. Send an email to the user with a link containing the token.
    
    console.log(`Password reset requested for: ${email}`);

    // For now, we'll just simulate a success response.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Als het e-mailadres in ons systeem bestaat, is er een reset-link verzonden.' 
      }),
    };

  } catch (error) {
    console.error('Error in reset-password function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Er is een interne fout opgetreden.' }),
    };
  }
};
