import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const APPS = ["linkedin", "twitter", "instagram"];
const AIS = ["gpt", "gemini"];

type Task = {
  id: number;
  app: string;
  ai_model: string;
  prompt: string;
  automation_result: string;
};

function App() {
  const [app, setApp] = useState(APPS[0]);
  const [ai, setAi] = useState(AIS[0]);
  const [prompt, setPrompt] = useState("");
  const [linkedinUsername, setLinkedinUsername] = useState("");
  const [linkedinPassword, setLinkedinPassword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/task/");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      const payload: any = {
        app,
        ai_model: ai,
        prompt,
      };

      // Send LinkedIn credentials only if the app is LinkedIn
      if (app === "linkedin") {
        payload.linkedin_username = linkedinUsername;
        payload.linkedin_password = linkedinPassword;
      }

      const response = await axios.post("http://127.0.0.1:8000/api/task/", payload);
      console.log("Task submitted:", response.data);
      setPrompt("");
      setLinkedinUsername("");
      setLinkedinPassword("");
      fetchTasks();
    } catch (error: any) {
      console.error("Failed to submit task:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Automate a Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            select
            label="App"
            value={app}
            onChange={(e) => setApp(e.target.value)}
            fullWidth
            margin="normal"
          >
            {APPS.map((option) => (
              <MenuItem key={option} value={option}>
                {option.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="AI Model"
            value={ai}
            onChange={(e) => setAi(e.target.value)}
            fullWidth
            margin="normal"
          >
            {AIS.map((option) => (
              <MenuItem key={option} value={option}>
                {option.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            fullWidth
            required
            multiline
            minRows={2}
            margin="normal"
          />

          {app === "linkedin" && (
            <>
              <TextField
                label="LinkedIn Username"
                value={linkedinUsername}
                onChange={(e) => setLinkedinUsername(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="LinkedIn Password"
                type="password"
                value={linkedinPassword}
                onChange={(e) => setLinkedinPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
            </>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6">Task History</Typography>
        <List>
          {tasks.length === 0 && (
            <ListItem>
              <ListItemText primary="No tasks submitted yet." />
            </ListItem>
          )}
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ bgcolor: "#f5f5f5", mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={`${task.app.toUpperCase()} | ${task.ai_model.toUpperCase()}`}
                secondary={
                  <>
                    <strong>Prompt:</strong> {task.prompt}
                    <br />
                    <strong>Result:</strong> {task.automation_result}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
