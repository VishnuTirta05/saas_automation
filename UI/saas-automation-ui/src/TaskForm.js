import { useState } from "react";
import axios from "axios";

export default function TaskForm() {
  const [form, setForm] = useState({
    app: "linkedin",
    ai_model: "gemini",
    prompt: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/task/", form);
      setResult(res.data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Automate a Task</h2>
      <form onSubmit={handleSubmit}>
        <label>App: </label>
        <select name="app" onChange={handleChange} value={form.app}>
          <option value="linkedin">LinkedIn</option>
        </select>

        <br /><br />

        <label>AI Model: </label>
        <select name="ai_model" onChange={handleChange} value={form.ai_model}>
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
        ></textarea>

        <br /><br />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Response</h3>
          <pre>{result.ai_response}</pre>
          <h3>Automation Result</h3>
          <pre>{result.automation_result}</pre>
        </div>
      )}
    </div>
  );
}
