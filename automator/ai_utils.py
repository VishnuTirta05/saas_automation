import os

import google.generativeai as genai

def handle_prompt(prompt):
    try:
        genai.configure(api_key = os.getenv("GEMINI_API_KEY"))

        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content(prompt)

        return response.text.strip()
    except Exception as e:
        return f"[ERROR] AI model failed: {e}"






