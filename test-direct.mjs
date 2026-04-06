import { readFileSync } from "fs";

// Manually load .env.local
const envConfig = readFileSync(".env.local", "utf8");
envConfig.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) process.env[key.trim()] = value.trim();
});

const API_KEY = process.env.GEMINI_API_KEY;

async function testFetch() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [{ parts: [{ text: "Hello" }] }]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", JSON.stringify(data, null, 2));

    if (res.ok) {
       console.log("DIRECT FETCH SUCCESSFUL!");
    }
  } catch (error) {
    console.error("FETCH ERROR:", error.message);
  }
}

testFetch();
