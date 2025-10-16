import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const transcript = formData.get('transcript') as string;
    const dimensionsStr = formData.get('dimensions') as string;
    const dimensions = JSON.parse(dimensionsStr || '{}');
    
    // Process images
    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_') && value instanceof File) {
        // Convert image to base64
        const arrayBuffer = await value.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        images.push(`data:${value.type};base64,${base64}`);
      }
    }

    // Create AI prompt
    const prompt = `
Je bent een expert in het maken van professionele offertes voor bouw- en renovatieprojecten.

Gegeven de volgende informatie:
- Klantbeschrijving (spraak): "${transcript}"
- Afmetingen: Breedte ${dimensions.width}cm, Hoogte ${dimensions.height}cm, Diepte ${dimensions.depth}cm
- ${images.length} foto's zijn bijgevoegd

Maak een gedetailleerde offerte in JSON formaat met:
{
  "projectTitle": "Titel van het project",
  "clientInfo": {
    "name": "Klantnaam (uit transcript halen)",
    "contact": "Contactgegevens indien vermeld"
  },
  "projectDescription": "Gedetailleerde beschrijving van het werk",
  "measurements": {
    "width": ${dimensions.width},
    "height": ${dimensions.height},
    "depth": ${dimensions.depth},
    "totalArea": "Berekende oppervlakte in m²"
  },
  "materials": [
    {
      "name": "Materiaal naam",
      "quantity": "Hoeveelheid",
      "unit": "Eenheid (m², stuks, etc)",
      "unitPrice": "Prijs per eenheid in €",
      "totalPrice": "Totaalprijs in €"
    }
  ],
  "labor": [
    {
      "description": "Werkzaamheden",
      "hours": "Geschatte uren",
      "hourlyRate": "Uurtarief in €",
      "totalPrice": "Totaalprijs in €"
    }
  ],
  "additionalCosts": [
    {
      "description": "Extra kosten (transport, etc)",
      "price": "Prijs in €"
    }
  ],
  "subtotal": "Subtotaal in €",
  "vat": "BTW (21%) in €",
  "total": "Totaal inclusief BTW in €",
  "validUntil": "Geldig tot datum (30 dagen vanaf nu)",
  "notes": "Extra opmerkingen of voorwaarden"
}

Wees realistisch met prijzen en geef goede schattingen.
`;

    // Call OpenAI API with vision support if images are provided
    const messages: any[] = [
      {
        role: 'system',
        content: 'Je bent een expert offerte specialist voor bouw en renovatie projecten. Je maakt accurate prijsinschattingen gebaseerd op beschrijvingen, foto\'s en afmetingen.',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          ...images.map(img => ({
            type: 'image_url',
            image_url: { url: img },
          })),
        ],
      },
    ];

    const completion = await openai.chat.completions.create({
      model: images.length > 0 ? 'gpt-4-vision-preview' : 'gpt-4-turbo-preview',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const quoteData = JSON.parse(completion.choices[0].message.content || '{}');

    // Save to database (Supabase)
    // const { data, error } = await supabase
    //   .from('quotes')
    //   .insert({
    //     ...quoteData,
    //     created_at: new Date().toISOString(),
    //     status: 'draft',
    //   })
    //   .select()
    //   .single();

    return NextResponse.json({
      success: true,
      quote: quoteData,
      message: 'Offerte succesvol gegenereerd met AI',
    });

  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Er ging iets mis bij het genereren van de offerte' 
      },
      { status: 500 }
    );
  }
}
