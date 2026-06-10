const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");

const app = express();

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());

// ❌ DO NOT use express.json() with json-server defaults together
// app.use(express.json());  <-- removed to prevent "stream is not readable"

app.use(middlewares);

// =========================
// AUTH MIDDLEWARE
// =========================

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  if (token !== "Bearer super-token") {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  next();
};

// =========================
// LOGIN (custom route BEFORE router)
// =========================

app.post("/login", express.json(), (req, res) => {
  const db = router.db;
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }

  const user = db.get("users").find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: user.token,
    user: { id: user.id, email: user.email },
  });
});

// =========================
// PROTECTED ROUTES
// =========================

app.use("/products", authMiddleware);

// =========================
// CUSTOM FILTER
// =========================

app.get("/filtered-products", (req, res) => {
  const db = router.db;

  let products = db.get("products").value();

  const { category, minPrice, maxPrice, search } = req.query;

  if (category) {
    products = products.filter((item) => item.category === category);
  }

  if (minPrice) {
    products = products.filter((item) => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter((item) => item.price <= Number(maxPrice));
  }

  if (search) {
    products = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  res.json(products);
});

// =========================
// PAGINATION
// =========================

app.get("/paginated-products", (req, res) => {
  const db = router.db;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const products = db.get("products").value();

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    limit,
    total: products.length,
    data: products.slice(start, end),
  });
});

// =========================
// JSON SERVER ROUTES (LAST)
// =========================

app.use(router);

// =========================
// START SERVER
// =========================

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
