/**
 * Better Within AI Engines
 *
 * This file exports all the AI engines used in the Better Within app.
 */

const recommendationEngine = require("./recommendation")
const contentGenerator = require("./content-generator")
const culturalAdapter = require("./cultural-adapter")

module.exports = {
  recommendation: recommendationEngine,
  contentGenerator: contentGenerator,
  culturalAdapter: culturalAdapter,
}
