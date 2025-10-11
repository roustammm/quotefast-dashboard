const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultTemplates = [
  {
    name: 'Modern Clean',
    type: 'offerte',
    category: 'modern-clean',
    description: 'Modern en schone offerte template met professionele uitstraling',
    is_global: true,
    is_default: true,
    template_data: {
      name: 'Modern Clean',
      type: 'offerte',
      category: 'modern-clean',
      description: 'Modern en schone offerte template met professionele uitstraling',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; color: #333; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
    .document-info { text-align: right; }
    .document-title { font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
    .document-number { font-size: 18px; color: #6b7280; }
    .client-info, .company-info { margin-bottom: 30px; }
    .info-section h3 { color: #374151; margin-bottom: 10px; font-size: 16px; }
    .info-section p { margin: 5px 0; color: #6b7280; }
    .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .items-table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
    .items-table .description { width: 50%; }
    .items-table .quantity, .items-table .price, .items-table .total { width: 15%; text-align: right; }
    .totals { margin-top: 20px; text-align: right; }
    .totals table { margin-left: auto; width: 300px; }
    .totals td { padding: 8px 12px; }
    .totals .label { text-align: left; color: #6b7280; }
    .totals .amount { text-align: right; font-weight: 600; }
    .total-row { border-top: 2px solid #2563eb; font-size: 18px; font-weight: bold; color: #1f2937; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .terms { margin-top: 30px; }
    .terms h3 { color: #374151; margin-bottom: 10px; }
    .terms p { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">{{companyName}}</div>
    <div class="document-info">
      <div class="document-title">{{documentTitle}}</div>
      <div class="document-number">{{documentNumber}}</div>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <div class="company-info">
      <h3>Van:</h3>
      <p><strong>{{companyName}}</strong></p>
      <p>{{companyAddress}}</p>
      <p>Tel: {{companyPhone}}</p>
      <p>Email: {{companyEmail}}</p>
      {{#companyVatNumber}}<p>BTW: {{companyVatNumber}}</p>{{/companyVatNumber}}
      {{#companyBankAccount}}<p>Rekening: {{companyBankAccount}}</p>{{/companyBankAccount}}
    </div>

    <div class="client-info">
      <h3>Voor:</h3>
      <p><strong>{{clientName}}</strong></p>
      {{#clientAddress}}<p>{{clientAddress}}</p>{{/clientAddress}}
      <p>Email: {{clientEmail}}</p>
      {{#clientPhone}}<p>Tel: {{clientPhone}}</p>{{/clientPhone}}
    </div>
  </div>

  <div class="info-section">
    <h3>Project:</h3>
    <p>{{projectDescription}}</p>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th class="description">Beschrijving</th>
        <th class="quantity">Aantal</th>
        <th class="price">Prijs per eenheid</th>
        <th class="total">Totaal</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td class="description">{{description}}</td>
        <td class="quantity">{{quantity}}</td>
        <td class="price">€{{unitPrice}}</td>
        <td class="total">€{{total}}</td>
      </tr>
      {{/items}}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr>
        <td class="label">Subtotaal:</td>
        <td class="amount">€{{subtotal}}</td>
      </tr>
      <tr>
        <td class="label">BTW ({{vatRate}}%):</td>
        <td class="amount">€{{vatAmount}}</td>
      </tr>
      <tr class="total-row">
        <td class="label">Totaal:</td>
        <td class="amount">€{{total}}</td>
      </tr>
    </table>
  </div>

  {{#terms}}
  <div class="terms">
    <h3>Voorwaarden:</h3>
    <p>{{terms}}</p>
  </div>
  {{/terms}}

  {{#notes}}
  <div class="terms">
    <h3>Opmerkingen:</h3>
    <p>{{notes}}</p>
  </div>
  {{/notes}}

  <div class="footer">
    <p><strong>{{validUntilLabel}}:</strong> {{validUntil}}</p>
    <p>Deze {{documentType}} is automatisch gegenereerd door QuoteFast</p>
  </div>
</body>
</html>`
    }
  },
  {
    name: 'Professional',
    type: 'offerte',
    category: 'professional',
    description: 'Professionele offerte template voor zakelijke klanten',
    is_global: true,
    is_default: false,
    template_data: {
      name: 'Professional',
      type: 'offerte',
      category: 'professional',
      description: 'Professionele offerte template voor zakelijke klanten',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Times New Roman', serif; margin: 0; padding: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
    .logo { font-size: 32px; font-weight: bold; color: #000; margin-bottom: 10px; }
    .document-title { font-size: 24px; font-weight: bold; color: #000; margin-bottom: 10px; }
    .document-number { font-size: 16px; color: #666; }
    .client-info, .company-info { margin-bottom: 30px; }
    .info-section h3 { color: #000; margin-bottom: 10px; font-size: 16px; text-decoration: underline; }
    .info-section p { margin: 5px 0; color: #333; }
    .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid #000; }
    .items-table th, .items-table td { padding: 12px; text-align: left; border: 1px solid #000; }
    .items-table th { background-color: #f0f0f0; font-weight: bold; color: #000; }
    .totals { margin-top: 20px; text-align: right; }
    .totals table { margin-left: auto; width: 300px; border: 1px solid #000; }
    .totals td { padding: 8px 12px; border: 1px solid #000; }
    .totals .label { text-align: left; }
    .totals .amount { text-align: right; font-weight: bold; }
    .total-row { background-color: #f0f0f0; font-size: 18px; font-weight: bold; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #000; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">{{companyName}}</div>
    <div class="document-title">{{documentTitle}}</div>
    <div class="document-number">{{documentNumber}}</div>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <div class="company-info">
      <h3>Van:</h3>
      <p><strong>{{companyName}}</strong></p>
      <p>{{companyAddress}}</p>
      <p>Tel: {{companyPhone}}</p>
      <p>Email: {{companyEmail}}</p>
      {{#companyVatNumber}}<p>BTW: {{companyVatNumber}}</p>{{/companyVatNumber}}
    </div>

    <div class="client-info">
      <h3>Voor:</h3>
      <p><strong>{{clientName}}</strong></p>
      {{#clientAddress}}<p>{{clientAddress}}</p>{{/clientAddress}}
      <p>Email: {{clientEmail}}</p>
      {{#clientPhone}}<p>Tel: {{clientPhone}}</p>{{/clientPhone}}
    </div>
  </div>

  <div class="info-section">
    <h3>Project:</h3>
    <p>{{projectDescription}}</p>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th>Beschrijving</th>
        <th>Aantal</th>
        <th>Prijs per eenheid</th>
        <th>Totaal</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td>{{description}}</td>
        <td>{{quantity}}</td>
        <td>€{{unitPrice}}</td>
        <td>€{{total}}</td>
      </tr>
      {{/items}}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr>
        <td class="label">Subtotaal:</td>
        <td class="amount">€{{subtotal}}</td>
      </tr>
      <tr>
        <td class="label">BTW ({{vatRate}}%):</td>
        <td class="amount">€{{vatAmount}}</td>
      </tr>
      <tr class="total-row">
        <td class="label">Totaal:</td>
        <td class="amount">€{{total}}</td>
      </tr>
    </table>
  </div>

  {{#terms}}
  <div class="terms">
    <h3>Voorwaarden:</h3>
    <p>{{terms}}</p>
  </div>
  {{/terms}}

  <div class="footer">
    <p><strong>{{validUntilLabel}}:</strong> {{validUntil}}</p>
    <p>Deze {{documentType}} is automatisch gegenereerd door QuoteFast</p>
  </div>
</body>
</html>`
    }
  },
  {
    name: 'Minimal',
    type: 'offerte',
    category: 'minimal',
    description: 'Minimalistische offerte template met focus op inhoud',
    is_global: true,
    is_default: false,
    template_data: {
      name: 'Minimal',
      type: 'offerte',
      category: 'minimal',
      description: 'Minimalistische offerte template met focus op inhoud',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 60px; color: #333; line-height: 1.6; }
    .header { margin-bottom: 60px; }
    .logo { font-size: 20px; font-weight: 300; color: #666; margin-bottom: 20px; }
    .document-title { font-size: 36px; font-weight: 100; color: #000; margin-bottom: 10px; }
    .document-number { font-size: 14px; color: #999; }
    .section { margin-bottom: 40px; }
    .section h3 { font-size: 14px; font-weight: 600; color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .section p { margin: 8px 0; color: #666; }
    .items-table { width: 100%; border-collapse: collapse; margin: 40px 0; }
    .items-table th, .items-table td { padding: 15px 0; text-align: left; border-bottom: 1px solid #eee; }
    .items-table th { font-weight: 600; color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .items-table .description { width: 60%; }
    .items-table .quantity, .items-table .price, .items-table .total { width: 13%; text-align: right; }
    .totals { margin-top: 40px; text-align: right; }
    .totals table { margin-left: auto; width: 250px; }
    .totals td { padding: 10px 0; border-bottom: 1px solid #eee; }
    .totals .label { text-align: left; color: #666; }
    .totals .amount { text-align: right; font-weight: 600; }
    .total-row { border-top: 2px solid #000; font-size: 18px; font-weight: 600; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">{{companyName}}</div>
    <div class="document-title">{{documentTitle}}</div>
    <div class="document-number">{{documentNumber}}</div>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <div class="section">
      <h3>Van</h3>
      <p><strong>{{companyName}}</strong></p>
      <p>{{companyAddress}}</p>
      <p>{{companyPhone}}</p>
      <p>{{companyEmail}}</p>
      {{#companyVatNumber}}<p>{{companyVatNumber}}</p>{{/companyVatNumber}}
    </div>

    <div class="section">
      <h3>Voor</h3>
      <p><strong>{{clientName}}</strong></p>
      {{#clientAddress}}<p>{{clientAddress}}</p>{{/clientAddress}}
      <p>{{clientEmail}}</p>
      {{#clientPhone}}<p>{{clientPhone}}</p>{{/clientPhone}}
    </div>
  </div>

  <div class="section">
    <h3>Project</h3>
    <p>{{projectDescription}}</p>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th class="description">Beschrijving</th>
        <th class="quantity">Aantal</th>
        <th class="price">Prijs</th>
        <th class="total">Totaal</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td class="description">{{description}}</td>
        <td class="quantity">{{quantity}}</td>
        <td class="price">€{{unitPrice}}</td>
        <td class="total">€{{total}}</td>
      </tr>
      {{/items}}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr>
        <td class="label">Subtotaal</td>
        <td class="amount">€{{subtotal}}</td>
      </tr>
      <tr>
        <td class="label">BTW {{vatRate}}%</td>
        <td class="amount">€{{vatAmount}}</td>
      </tr>
      <tr class="total-row">
        <td class="label">Totaal</td>
        <td class="amount">€{{total}}</td>
      </tr>
    </table>
  </div>

  {{#terms}}
  <div class="section">
    <h3>Voorwaarden</h3>
    <p>{{terms}}</p>
  </div>
  {{/terms}}

  <div class="footer">
    <p>{{validUntilLabel}}: {{validUntil}}</p>
    <p>Gegenereerd door QuoteFast</p>
  </div>
</body>
</html>`
    }
  },
  {
    name: 'Creative',
    type: 'offerte',
    category: 'creative',
    description: 'Creatieve offerte template met moderne design elementen',
    is_global: true,
    is_default: false,
    template_data: {
      name: 'Creative',
      type: 'offerte',
      category: 'creative',
      description: 'Creatieve offerte template met moderne design elementen',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', 'Segoe UI', sans-serif; margin: 0; padding: 0; color: #2d3748; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
    .container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
    .logo { font-size: 28px; font-weight: 700; margin-bottom: 10px; }
    .document-title { font-size: 32px; font-weight: 300; margin-bottom: 10px; }
    .document-number { font-size: 16px; opacity: 0.9; }
    .content { padding: 40px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .info-section h3 { color: #667eea; margin-bottom: 15px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .info-section p { margin: 8px 0; color: #4a5568; }
    .project-section { background: #f7fafc; padding: 30px; border-radius: 12px; margin-bottom: 40px; }
    .project-section h3 { color: #667eea; margin-bottom: 15px; }
    .items-table { width: 100%; border-collapse: collapse; margin: 40px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .items-table th, .items-table td { padding: 20px; text-align: left; }
    .items-table th { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; }
    .items-table tr:nth-child(even) { background: #f7fafc; }
    .items-table .description { width: 50%; }
    .items-table .quantity, .items-table .price, .items-table .total { width: 16%; text-align: right; }
    .totals { margin-top: 40px; text-align: right; }
    .totals table { margin-left: auto; width: 300px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .totals td { padding: 15px 20px; }
    .totals .label { text-align: left; color: #4a5568; }
    .totals .amount { text-align: right; font-weight: 600; }
    .total-row { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 18px; font-weight: 700; }
    .terms-section { background: #f7fafc; padding: 30px; border-radius: 12px; margin-top: 40px; }
    .terms-section h3 { color: #667eea; margin-bottom: 15px; }
    .footer { background: #2d3748; color: white; padding: 30px 40px; text-align: center; }
    .footer p { margin: 5px 0; opacity: 0.8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">{{companyName}}</div>
      <div class="document-title">{{documentTitle}}</div>
      <div class="document-number">{{documentNumber}}</div>
    </div>

    <div class="content">
      <div class="info-grid">
        <div class="info-section">
          <h3>Van</h3>
          <p><strong>{{companyName}}</strong></p>
          <p>{{companyAddress}}</p>
          <p>📞 {{companyPhone}}</p>
          <p>✉️ {{companyEmail}}</p>
          {{#companyVatNumber}}<p>🏢 {{companyVatNumber}}</p>{{/companyVatNumber}}
        </div>

        <div class="info-section">
          <h3>Voor</h3>
          <p><strong>{{clientName}}</strong></p>
          {{#clientAddress}}<p>{{clientAddress}}</p>{{/clientAddress}}
          <p>✉️ {{clientEmail}}</p>
          {{#clientPhone}}<p>📞 {{clientPhone}}</p>{{/clientPhone}}
        </div>
      </div>

      <div class="project-section">
        <h3>Project</h3>
        <p>{{projectDescription}}</p>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th class="description">Beschrijving</th>
            <th class="quantity">Aantal</th>
            <th class="price">Prijs per eenheid</th>
            <th class="total">Totaal</th>
          </tr>
        </thead>
        <tbody>
          {{#items}}
          <tr>
            <td class="description">{{description}}</td>
            <td class="quantity">{{quantity}}</td>
            <td class="price">€{{unitPrice}}</td>
            <td class="total">€{{total}}</td>
          </tr>
          {{/items}}
        </tbody>
      </table>

      <div class="totals">
        <table>
          <tr>
            <td class="label">Subtotaal</td>
            <td class="amount">€{{subtotal}}</td>
          </tr>
          <tr>
            <td class="label">BTW ({{vatRate}}%)</td>
            <td class="amount">€{{vatAmount}}</td>
          </tr>
          <tr class="total-row">
            <td class="label">Totaal</td>
            <td class="amount">€{{total}}</td>
          </tr>
        </table>
      </div>

      {{#terms}}
      <div class="terms-section">
        <h3>Voorwaarden</h3>
        <p>{{terms}}</p>
      </div>
      {{/terms}}

      {{#notes}}
      <div class="terms-section">
        <h3>Opmerkingen</h3>
        <p>{{notes}}</p>
      </div>
      {{/notes}}
    </div>

    <div class="footer">
      <p><strong>{{validUntilLabel}}:</strong> {{validUntil}}</p>
      <p>Deze {{documentType}} is automatisch gegenereerd door QuoteFast</p>
    </div>
  </div>
</body>
</html>`
    }
  }
];

async function seedTemplates() {
  try {
    console.log('🌱 Seeding default templates...');
    
    // Check if templates already exist
    const { data: existingTemplates, error: checkError } = await supabase
      .from('document_templates')
      .select('name')
      .eq('is_global', true);
    
    if (checkError) {
      console.error('❌ Error checking existing templates:', checkError);
      return;
    }
    
    if (existingTemplates && existingTemplates.length > 0) {
      console.log('✅ Templates already exist, skipping seed');
      console.log('📋 Existing templates:', existingTemplates.map(t => t.name));
      return;
    }
    
    // Insert templates
    const { data, error } = await supabase
      .from('document_templates')
      .insert(defaultTemplates);
    
    if (error) {
      console.error('❌ Error seeding templates:', error);
    } else {
      console.log('✅ Successfully seeded', defaultTemplates.length, 'default templates');
      console.log('📋 Seeded templates:', defaultTemplates.map(t => t.name));
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

seedTemplates();
