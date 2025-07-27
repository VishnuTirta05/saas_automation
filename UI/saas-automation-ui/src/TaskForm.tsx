import { useState } from "react";
import axios from "axios";

interface TaskFormState {
  app: string;
  ai_model: string;
  prompt: string;
}

interface ApiResponse {
  ai_response: string;
  automation_result: string;
}

export default function TaskForm() {
  const [form, setForm] = useState<TaskFormState>({
    app: "linkedin",
    ai_model: "gemini",
    prompt: "",
  });

  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<ApiResponse>("http://localhost:8000/api/task/", form);
      setResult(res.data);
    } catch (error) {
      console.error("Error calling Django API:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Automate a LinkedIn Task</h2>
      <form onSubmit={handleSubmit}>
        <label>App:</label>
        <select name="app" value={form.app} onChange={handleChange}>
          <option value="linkedin">LinkedIn</option>
        </select>

        <br /><br />

        <label>AI Model:</label>
        <select name="ai_model" value={form.ai_model} onChange={handleChange}>
          <option value="gemini">Gemini</option>
        </select>

        <br /><br />

        <label>Prompt:</label><br />
        <textarea
          name="prompt"
          value={form.prompt}
          onChange={handleChange}
          rows={5}
          cols={50}
        />

        <br /><br />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Response:</h3>
          <pre>{result.ai_response}</pre>
          <h3>Automation Result:</h3>
          <pre>{result.automation_result}</pre>
        </div>
      )}
    </div>
  );
}
