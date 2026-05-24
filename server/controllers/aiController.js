const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

// Initialize the SDK cleanly
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithStylist = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please provide a styling request prompt." });
    }

    // Define the schema directly so the model is locked into JSON format
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            reply: { type: "string" },
            searchKeywords: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["reply", "searchKeywords"]
        }
      }
    });

    const aiPrompt = `
      You are an expert personal fashion stylist and beauty consultant for a lifestyle store.
      Analyze this user inquiry and extract the core search keywords (aesthetics, categories, colors) 
      to query our product database.
      
      User Inquiry: "${message}"
    `;

    // Generate content safely
    const aiResult = await model.generateContent(aiPrompt);
    const rawText = aiResult.response.text().trim();

    // No cleaning or matching needed; guaranteed clean JSON by the API configuration
    const parsedResponse = JSON.parse(rawText);

    // Query MongoDB using the stable array data
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

    // Send the structured payload back to the client
    res.status(200).json({
      reply: parsedResponse.reply,
      products: matchedProducts
    });

  } catch (error) {
    res.status(500).json({ message: "AI Stylist pipeline ran into an error.", error: error.message });
  }
};