"use strict";

// imports the express into this file
const express = require("express");

// what controls all the routes/end points/paths that our api can handle
const routes = express.Router();

// meat of the code in the middle

const movies = [
  { id: 1, title: "2001: A Space Odyssey", year: 1968, animated: false },
  { id: 2, title: "The Godfather", year: 1972, animated: false },
  { id: 3, title: "The Lion King", year: 1994, animated: true },
  { id: 4, title: "Black Panther", year: 2018, animated: false },
];
let nextId = 5;

// GET /movies - respond with a JSON array of movies
// req = request - res = response
routes.get("/movies", (req, res) => {
  const minYear = parseInt(req.query.minYear);

  if (minYear) {
    const filteredMovies = movies.filter((movie) => movie.year >= minYear);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

//export the routes for use in server.js
module.exports = routes;

// :id - path parameter is a variable portion of the uri path
routes.get("/movies/:id", (req, res) => {
  // allows access any named path parameters | needs to match parameters
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    // always put the status before the send
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

// POST /movies -- response is a 201
routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

// UPDATE /movies/:id
routes.delete("/movies/:id", (req, res) => {
  console.log("Ran DELETE");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  console.log("Finished DELETE");
  res.send();
});
