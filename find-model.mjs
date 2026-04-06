import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";

// Manually load .env.local
const envConfig = readFileSync(".env.local", "utf8");
envConfig.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) process.env[key.trim()] = value.trim();
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Checking available models for key...");
    const models = await genAI.getGenerativeModel({ model: "gemini-pro" }).listModels();
    // Note: Standard way to list models in newer SDK is different, let's try the generic method
    // If listModels() is not available on model, we try to use the fetch directly or check SDK docs
    console.log("Available Models:");
    // In @google/generative-ai, listModels is actually not on the model instance but usually a separate call or not easily exposed in some versions.
    // Let's try to just hit the endpoint manually to see what's up.
  } catch (error) {
    console.error("List Models Error:", error.message);
  }
}

// Actually, let's just try the most likely names one by one in a script until one works.
async function testModel(name) {
  try {
    const model = genAI.getGenerativeModel({ model: name });
    const result = await model.generateContent("test");
    await result.response;
    return true;
  } catch (e) {
    return false;
  }
}

async function findWorkingModel() {
  const candidates = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-pro-latest",
    "gemini-pro",
    "gemini-1.0-pro"
  ];
  
  for (const name of candidates) {
    console.log(`Testing ${name}...`);
    if (await testModel(name)) {
      console.log(`FOUND WORKING MODEL: ${name}`);
      return;
    }
  }
  console.log("No working model found in candidates.");
}

findWorkingModel();
