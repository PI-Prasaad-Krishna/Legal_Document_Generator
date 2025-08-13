// This is a placeholder for your actual OpenRouter API key
const OPENROUTER_API_KEY = ""; 
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function generateDocument(prompt) {
  console.log("Sending prompt to OpenRouter:", prompt);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // Sticking with Mistral
        messages: [
          // --- UPDATED & STRICTER PROMPT ---
          { 
            role: "system", 
            content: `You are an expert legal assistant. Your task is to generate a formal, well-structured legal document based on the user's request.
            CRITICAL INSTRUCTIONS:
            1.  You MUST format the entire document using only HTML tags.
            2.  Start the response DIRECTLY with the <h1> tag for the main title. Do NOT include the word "html" or any code fences like \`\`\`html.
            3.  Use <h2> for major sections.
            4.  Use <strong> for sub-headings or to emphasize text.
            5.  Wrap all text paragraphs in <p> tags.
            6.  Do NOT use Markdown (e.g., no **, ##, or -).
            7.  Ensure there is absolutely no commentary, whitespace, or any characters after the final closing HTML tag of the document.`
          },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    console.log("Full API Response:", data);

    if (!response.ok) {
      const errorMessage = data?.error?.message || `API error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
      // Trim the response to remove any potential leading/trailing whitespace
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("Received an empty or invalid response from the AI.");
    }

  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    return `<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p class="font-bold">An Error Occurred</p>
              <p>${error.message}</p>
            </div>`;
  }
}