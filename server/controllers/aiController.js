const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const fs   = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const dataPath = path.resolve(__dirname, '..', '..', 'client', 'src', 'components', 'products', 'data.json');

const loadProducts = () => {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
};

exports.chatWithStylist = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Please provide a styling request.' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            reply:          { type: SchemaType.STRING },
            searchKeywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
          },
          required: ['reply', 'searchKeywords']
        }
      }
    });

    const aiPrompt = `
      You are an expert personal fashion stylist for a premium Indian lifestyle store called VibeCheck.
      The store sells: Dresses, Makeup, Bags, Shoes, Accessories.
      Style tags include: Boho Chic, Elegant, Soft Girl, Y2K, Minimal, Ethnic, Festive, Glam, Casual, Bridal, Romantic, Party, Bold, Professional.

      Analyze this user message and:
      1. Reply warmly and helpfully as a stylist (2-3 sentences max)
      2. Extract 2-4 search keywords from the style tags or product categories above that best match their request

      User message: "${message}"
    `;

    const aiResult   = await model.generateContent(aiPrompt);
    const rawText    = aiResult.response.text().trim();
    const parsed     = JSON.parse(rawText);

    // Search data.json using keywords
    let matchedProducts = [];
    if (parsed.searchKeywords?.length > 0) {
      const products = loadProducts();
      const keywords = parsed.searchKeywords.map(k => k.toLowerCase());

      matchedProducts = products
        .map((p, index) => ({ ...p, _id: index }))
        .filter(p => {
          const haystack = [
            p.name, p.brand, p.description, p.category,
            ...(p.styleTags || [])
          ].join(' ').toLowerCase();

          return keywords.some(kw => haystack.includes(kw));
        })
        .slice(0, 4);
    }

    res.status(200).json({
      reply:    parsed.reply,
      products: matchedProducts,
    });

  } catch (error) {
    console.error('AI Stylist error:', error.message);
    res.status(500).json({ message: 'AI Stylist ran into an error.', error: error.message });
  }
};

exports.seedCatalog = async (req, res) => {
  res.json({ message: 'Seed not needed — products loaded from data.json' });
};