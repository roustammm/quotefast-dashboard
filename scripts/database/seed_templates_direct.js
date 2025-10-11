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
  }
];

async function seedTemplatesDirect() {
  try {
    console.log('🌱 Seeding default templates directly...');
    
    // Insert templates directly
    const { data, error } = await supabase
      .from('document_templates')
      .insert(defaultTemplates);
    
    if (error) {
      if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
        console.log('✅ Templates already exist, skipping seed');
      } else {
        console.error('❌ Error seeding templates:', error);
      }
    } else {
      console.log('✅ Successfully seeded', defaultTemplates.length, 'default templates');
      console.log('📋 Seeded templates:', defaultTemplates.map(t => t.name));
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

seedTemplatesDirect();
