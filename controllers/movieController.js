const connection = require("../data/db.js");

function index(req, res) {
  let sql = `SELECT * FROM movies`;
  if (req.query.title) {
    sql += ` WHERE title LIKE "%${req.query.title}%"`;
  }
  connection.query(sql, (err, movies) => {
    if (err) return res.status(500).json({ message: err.message });

    movies.forEach((movie) => {
      movie.image = `http://localhost:3000/images/movies-covers/${movie.image}`;
    });
    res.json(movies);
  });
}

function show(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(404).json({
      error: "Not Found",
      message: "Movie not found",
    });
  const sql = `SELECT * FROM movies  WHERE id = ?`;
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({
        error: "Not Found",
        message: "Movie Not Found",
      });

    const movie = results[0];

    const sql = `SELECT * FROM reviews WHERE movie_id = ?`;
    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      movie.reviews = results;

      res.json(movie);
    });
  });
}

function storeReview(req, res) {
  const id = req.params.id;
  const { text, vote, name } = req.body;
  console.log({ id, text, vote, name });
  const sql =
    "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?,?,?,?)";

  connection.query(sql, [text, name, vote, id], (err, results) => {
    if (err) return res.status(500).json({ error: "database query failed" });
    console.log(results);
    res.status(201).json({ message: "aggiunta review", id: results.insertId });
  });
}

module.exports = { index, show, storeReview };
