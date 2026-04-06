import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { readFileSync } from "fs";

// Manually load .env.local because Node.js doesn't do it by default
const envConfig = readFileSync(".env.local", "utf8");
envConfig.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) process.env[key.trim()] = value.trim();
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    console.log("Testing Key:", process.env.GEMINI_API_KEY?.substring(0, 5) + "...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say 'API Key Working'");
    const response = await result.response;
    console.log("SUCCESS:", response.text());
  } catch (error) {
    console.error("FAILURE:", error.message);
  }
}

test();
