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
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { 
            role: "system", 
            content: "You are a machine that only generates legal documents formatted in valid HTML. You must not include any commentary, code fences, or any text outside of the HTML document itself. Your response must start directly with an `<h1>` tag and end with the final closing tag. Do not include extra quotes at the begining and at the end of the file. The file content should be set to a fixed length of a single pdf page not less nor more. Keep it in a FIXED format at ALL TIMES - within a border in the single pdf sheet."
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
      // --- ADDED CLEANUP LOGIC ---
      // This removes the ```html and ``` from the response string.
      let cleanedContent = data.choices[0].message.content.trim();
      cleanedContent = cleanedContent.replace(/^```html/i, '').replace(/```$/, '');
      return cleanedContent.trim();
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