import { readFileSync, writeFileSync } from "fs";

// Manually load .env.local
const envConfig = readFileSync(".env.local", "utf8");
envConfig.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) process.env[key.trim()] = value.trim();
});

const API_KEY = process.env.GEMINI_API_KEY;

async function listAllModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const models = data.models.map(m => m.name);
    writeFileSync("full-model-list.txt", models.join("\n"));
    console.log(`Saved ${models.length} models to full-model-list.txt`);
  } catch (error) {
    console.error("LIST FETCH ERROR:", error.message);
  }
}

listAllModels();
