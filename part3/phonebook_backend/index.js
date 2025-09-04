const express = require("express");
const app = express();
var morgan = require("morgan");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(morgan("tiny"));

app.get("/info", (request, response) => {
  const ahora = Date.now();
  const today = new Date(ahora);
  response.send(
    `<p>Phonebook has info of ${
      persons.length
    } people</p> <p>${today.toISOString()}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateID = () => {
  const min = 4;
  const max = 10000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

morgan.token("post", (req, res) => {
  // console.log(req.body);
  return JSON.stringify(req.body);
});

app.use(morgan(":post"));

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or phone number missing",
    });
  }

  const same = persons.filter((some) => some.name === body.name);

  if (same.length > 0) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: String(generateID()),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
