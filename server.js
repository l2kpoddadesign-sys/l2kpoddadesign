const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/thumbnails", express.static("thumbnails"));

// simple database
let db = { users: [], movies: [] };

// ADMIN LOGIN DETAILS
const ADMIN = {
  username: "admin",
  password: "1234"
};

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, "thumbnails/");
    } else {
      cb(null, "uploads/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ================= USERS =================

// signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  db.users.push({ username, password });
  res.json({ message: "Signup success" });
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    return res.json({ role: "admin" });
  }

  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ role: "user" });

  res.json({ message: "Invalid login" });
});

// ================= MOVIES =================

// upload movie + thumbnail (admin only)
app.post("/upload", upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumb", maxCount: 1 }
]), (req, res) => {

  const video = req.files["video"][0].filename;
  const thumb = req.files["thumb"][0].filename;

  db.movies.push({
    video,
    thumb,
    title: video
  });

  res.redirect("/admin.html");
});

// get movies
app.get("/movies", (req, res) => {
  res.json(db.movies);
});

// ================= PAGES =================

app.get("/", (req, res) => res.sendFile(__dirname + "/public/login.html"));

app.listen(3000, () => console.log("Running on http://localhost:3000"));