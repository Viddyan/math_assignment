// generate-result.js

const fs = require("fs")

let totalTests = 0
let passedTests = 0

try {
  const testData = JSON.parse(fs.readFileSync("results.json", "utf-8"))

  totalTests = testData.numTotalTests || 0
  passedTests = testData.numPassedTests || 0

} catch (err) {
  console.error("Error reading test results:", err.message)
}

// Safe score calculation
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

// Write result file
fs.writeFileSync("result.json", JSON.stringify(result, null, 2))

// console.log("✅ Result generated:")
// console.log(result)