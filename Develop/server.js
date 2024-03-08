// Import Express.js, path, and file system.
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize an instance of Express.js and specify which port the server will run on.
const app = express();
const PORT = 3001;

// Static middleware pointing to the public folder.
app.use(express.static("public"));

// Create Express.js routes for default '/', and '/notes' endpoints
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// listen() method is responsible for listening for incoming connections on the specified port.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
