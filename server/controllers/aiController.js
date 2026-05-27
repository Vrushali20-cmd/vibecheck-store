const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const Product = require('../models/Product');

// Initialize the client with your stable .env key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithStylist = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please provide a styling request prompt." });
    }

    // UPDATED: Points to the live, supported gemini-2.5-flash model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            reply: { 
              type: SchemaType.STRING 
            },
            searchKeywords: {
              type: SchemaType.ARRAY,
              items: { 
                type: SchemaType.STRING 
              }
            }
          },
          required: ["reply", "searchKeywords"]
        }
      }
    });

    const aiPrompt = `
      You are an expert personal fashion stylist and beauty consultant for a lifestyle store.
      Analyze this user inquiry and extract the core search keywords (such as aesthetics, clothing categories, colors) 
      to query our product database text index.
      
      User Inquiry: "${message}"
    `;

    // Fire the request directly
    const aiResult = await model.generateContent(aiPrompt);
    const rawText = aiResult.response.text().trim();

    // Parse the guaranteed clean JSON object natively
    const parsedResponse = JSON.parse(rawText);

    // Query MongoDB using the stable array keywords matching our seed data
    let matchedProducts = [];
    if (parsedResponse.searchKeywords && parsedResponse.searchKeywords.length > 0) {
      const searchString = parsedResponse.searchKeywords.join(' ');
      
      matchedProducts = await Product.find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(4);
    }

    // Return the response back to Postman
    res.status(200).json({
      reply: parsedResponse.reply,
      products: matchedProducts
    });

  } catch (error) {
    res.status(500).json({ message: "AI Stylist pipeline ran into an error.", error: error.message });
  }
};

exports.seedCatalog = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              brand: { type: SchemaType.STRING },
              price: { type: SchemaType.INTEGER },
              description: { type: SchemaType.STRING },
              category: { type: SchemaType.STRING },
              styleTags: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              },
              imageUrl: { type: SchemaType.STRING }
            },
            required: ["name", "brand", "price", "description", "category", "styleTags", "imageUrl"]
          }
        }
      }
    });

    const seederPrompt = `
      Generate an array of exactly 15 diverse premium fashion items. 
      Mix items between "Clothing" and "Accessories" categories.
      Ensure styleTags contain values like "Minimalist", "Streetwear", "Casual", or "Evening Wear" so they can be easily searched.
      Use realistic premium Indian Rupee prices between 800 and 5000.
      For imageUrl, use valid, high-quality fashion photography links from Unsplash.
    `;

    const aiResult = await model.generateContent(seederPrompt);
    const rawText = aiResult.response.text().trim();
    const productData = JSON.parse(rawText);

    // Clear old data to prevent clutter and batch insert new materials
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(productData);

    res.status(201).json({
      success: true,
      message: `${insertedProducts.length} high-fidelity products generated and seeded to database successfully.`,
      products: insertedProducts
    });

  } catch (error) {
    res.status(500).json({ message: "Catalog seeding pipeline failed.", error: error.message });
  }
};