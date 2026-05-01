import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");

const Session = {};

function gen() {
  return Math.random().toString(36).substring(2, 10);
}

function create(id) {
  if (!Session[id]) {
    Session[id] = {};
  }
  return Session[id];
}


app.get("/", (req, res) => {
  res.render("login");
});


app.post("/login", (req, res) => {
  const { name, email, sessionId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  const id = sessionId || gen();
  const session = create(id);

  session.name = name;
  session.email = email;
res.cookie("sessionId", id);

 
  res.json({ sessionId: id, session });
})

app.get("/dash", (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  const session = Session[sessionId];

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  res.send(`Welcome ${session.name}`);
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});