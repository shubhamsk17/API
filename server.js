const express = require('express');
const app = express();

app.use(express.json());

let movies = [
  {
    name: "Harry Potter and the Order of the Phoenix",
    img: "https://bit.ly/2IcnSwz",
    summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
  },
  {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    img: "https://bit.ly/2tC1Lcg",
    summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
  },
  {
    name: "Avengers: Endgame",
    img: "https://bit.ly/2Pzczlb",
    summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
  }
];

// Read all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Read a single movie by index
app.get('/movies/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < movies.length) {
    res.json(movies[index]);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Create a new movie
app.post('/movies', (req, res) => {
  const { name, img, summary } = req.body;

  if (!name || !img || !summary) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMovie = { name, img, summary };
  movies.push(newMovie);

  res.status(201).json(newMovie); // 201 Created
});

// Update a movie by index
app.put('/movies/:index', (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < movies.length) {
    const { name, img, summary } = req.body;

    if (!name || !img || !summary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    movies[index] = { name, img, summary };
    res.json(movies[index]); // Respond with the updated movie
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Delete a movie by index
app.delete('/movies/:index', (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < movies.length) {
    const deletedMovie = movies.splice(index, 1);
    res.json({ message: 'Movie deleted successfully', deletedMovie });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
