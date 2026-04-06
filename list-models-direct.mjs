import { readFileSync } from "fs";

// Manually load .env.local
const envConfig = readFileSync(".env.local", "utf8");
envConfig.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) process.env[key.trim()] = value.trim();
});

const API_KEY = process.env.GEMINI_API_KEY;

async function listModelsFetch() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("STATUS:", res.status);
    console.log("AVAILABLE MODELS:");
    data.models.forEach(m => console.log(m.name));
  } catch (error) {
    console.error("LIST FETCH ERROR:", error.message);
  }
}

listModelsFetch();
