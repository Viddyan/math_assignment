// generate-result.js

const fs = require("fs")

let totalTests = 0
let passedTests = 0

try {
  if (!fs.existsSync("results.json")) {
    throw new Error("results.json not found")
  }

  const raw = fs.readFileSync("results.json", "utf-8")

  if (!raw || raw.trim() === "") {
    throw new Error("results.json is empty")
  }

  const testData = JSON.parse(raw)

  totalTests = testData.numTotalTests || 0
  passedTests = testData.numPassedTests || 0

} catch (err) {
  console.error("❌ Error reading test results:", err.message)

  // FORCE FAIL SAFE
  totalTests = 0
  passedTests = 0
}

const score =
  totalTests === 0 ? 0 : Math.round((passedTests / totalTests) * 100)

const result = {
  studentId: process.env.GITHUB_ACTOR || "unknown",
  repo: process.env.GITHUB_REPOSITORY || "unknown",
  assignment: process.env.ASSIGNMENT_NAME || "math-assignment",
  totalTests,
  passedTests,
  score,
  timestamp: new Date().toISOString()
}

fs.writeFileSync("result.json", JSON.stringify(result, null, 2))

console.log("✅ Final Result:", result)