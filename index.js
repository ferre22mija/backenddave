const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const credentials = require("./src/middleware/credentials");
const PORT = process.env.PORT || 8080;
const verifyJWT = require("./src/middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const corsOptions = require("./src/config/corsOptions");


app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
// middleware for coockies
app.use(cookieParser());

app.use("/register", require("./src/routes/register"));
app.use("/auth", require("./src/routes/auth"));
app.use("/refresh", require("./src/routes/refresh"));
app.use("/logout", require("./src/routes/logout"));
app.get("/", (req, res) => {
  console.log("nel");
  res.send("hola");
});
app.use(verifyJWT);
app.use("/employee", require("./src/routes/employees"));
app.listen(PORT, () => console.log(`server running on port ${PORT} `));
