const cors = require("cors");

const corsMiddleware = cors({
  origin: [
    "http://127.0.0.1:8181",
    "www.tzachCards.co.il",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://cardswebsite.onrender.com",
  ],
});

module.exports = corsMiddleware;
