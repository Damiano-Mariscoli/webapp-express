const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const notFound = require("./middlewares/notFound.js");
const errorsHandler = require("./middlewares/errorsHandler.js");
app.use(express.static("public"));
const movieRouter = require("./routers/movieRouter.js");

app.get("/", (req, res) => {
  res.send("metodo get");
});

app.use("/api/movies", movieRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`server runnin on port ${port}`);
});
