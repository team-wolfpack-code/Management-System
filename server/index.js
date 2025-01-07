const express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");

var schema = require("./schema");
var { ruruHTML } = require("ruru/server");

const cors = require("cors");

const { connectDB } = require("./db/models");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT;
require("dotenv").config();
//using cors
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

//if you want to use the body of request use a middle-ware:
app.use(express.json());

// Available Routes:
app.all("/graphql", (req, res) => {
  createHandler({
    schema: schema,
    context: { req, res },
  })(req, res);
});

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, async () => {
  console.log(
    `Management System backend(server) listening at http://localhost:${port}`
  );
  try {
    await connectDB();
  } catch (error) {
    console.error("Error: ", error);
  }
});
