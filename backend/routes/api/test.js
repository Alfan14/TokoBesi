const jwt = require('jsonwebtoken');
const secret = "ce00a4d5e287aa5635ab027de87a88bfc641f56717d1fdfcad7918b6fcc594b5";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWVhYWYzZjRiNzgyNmIxYzZlZDg0MCIsImVtYWlsIjoibWljaGFlNTZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQyMjYxNzM4LCJleHAiOjE3NDIyNjUzMzh9.e-ZWUsL8FpKtQjOarDf2y164bCxCn55b5SV9mMObU7g";

try {
    const decoded = jwt.verify(token, secret);
    console.log("Token is valid:", decoded);
} catch (err) {
    console.log("Token verification failed:", err.message);
}
