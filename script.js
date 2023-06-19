const express = require('express');
const app = express();
app.use(express.json());

const books = [
  { title: 'theNow', id: 1 },
  { title: 'Theafter', id: 2 },
  { title: 'RichDadandPoorDad', id: 3 }
];


app.get('/', (req, res) => {
  res.send('it works on my machine');
});

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));

  if (!book)
    res.status(404).send(
      '<h2 style="font-family: Malgun Gothic; color: darkred;">Oops... Can\'t find what you are looking for!</h2>'
    );

  res.send(book);
});

// CREATE Request Handler
app.post('/api/books', (req, res) => {
  if (!req.body.title || req.body.title.length < 3) {
    res.status(400).send('Title is required and should be at least 3 characters long.');
    return;
  }

  const book = {
    id: books.length + 1,
    title: req.body.title
  };

  books.push(book);
  res.send(book);
});

// UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

  if (!req.body.title || req.body.title.length < 3) {
    res.status(400).send('Title is required and should be at least 3 characters long.');
    return;
  }

  book.title = req.body.title;
  res.send(book);
});

// DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(book);
});

// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
