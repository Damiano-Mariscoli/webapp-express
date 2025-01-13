const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const notFound = require("./middlewares/notFound.js");
const errorsHandler = require("./middlewares/errorsHandler.js");
const movieRouter = require("./routers/movieRouter.js");

app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("metodo get");
});

app.use("/api/movies", movieRouter);

app.use(notFound);

app.use(errorsHandler);
app.listen(port, () => {
  console.log(`server runnin on port ${port}`);
});
