// utils/generateCode.js
export function generateUniqueCode(prefix = "THO") {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars
  const timestampPart = Date.now().toString(36).toUpperCase(); // time-based
  return `${prefix}-${randomPart}${timestampPart}`;
}
