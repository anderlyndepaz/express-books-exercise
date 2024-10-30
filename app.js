const books = require('./data/books.json');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json()); // Habilito recepción de JSON en servidor

// app.get('/', (req, res) => {
//   res.send('culitooooooo!')
// })


// ejercicio 1
app.get('/all', (req, res) => {
    res.json(books)
  })
  
  //ejercicio 2 

  app.get('/first', (req, res) => {
    res.status(200).json(
      books[0]
  )
  });

  // ejercicio 3

  app.get('/last', (req, res) => {
    res.status(200).json(
      books[books.length - 1]
    )
  });

  
// 3. Crea una ruta /last para obtener el último libro
// GET http://localhost:3000/last
app.get("/last", (req, res) => {
  res.status(200).json(
      books[books.length - 1]
  );
});

// 4. Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
// GET http://localhost:3000/middle
app.get("/middle", (req, res) => {
  res.status(200).json(
      books[Math.round((books.length - 1)/2)]
  );
});

// 5. Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
// GET http://localhost:3000/author/dante-alighieri
app.get("/author/dante-alighieri", (req, res) => {
  books.forEach(book => {
      book.author == 'Dante Alighieri' ?  res.status(200).json(book.title) : ""
  })
});

// 6. Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
// GET http://localhost:3000/country/charles-dickens
app.get("/country/charles-dickens", (req, res) => {
  books.forEach(book => {
      book.author == 'Charles Dickens' ?  res.status(200).json(book.country) : ""
  })
});

// 7. Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
// GET http://localhost:3000/year&pages/cervantes
app.get("/year&pages/cervantes", (req, res) => {
  books.forEach(book => {
      if (book.author == 'Miguel de Cervantes'){
          let pageAndYear = {
              pages: book.pages,
              year: book.year
          }
          res.status(200).json(pageAndYear)
      }
  })
});

// 8. Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
// GET http://localhost:3000/country/count/spain
app.get("/country/count/spain", (req, res) => {
  let counter = 0;
  books.forEach(book => {
      book.country ==='Spain' ? counter++ : ""
  })
  res.status(200).json(counter);
});

// Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
// GET http://localhost:3000/country/at-least/germany
app.get("/country/at-least/germany", (req, res) => {
  let oneGerman = false;
  books.forEach(book => {
      book.country === 'Germany' ? oneGerman = true : "";
  })
  res.status(200).json(oneGerman);
});

// Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
// GET http://localhost:3000/pages/all-greater/200
app.get("/pages/all-greater/200", (req, res) => {
  let allMoreThan200 = books.every(book => book.pages < 200);
  res.status(200).json(allMoreThan200);
});

// Para ruta no existente
app.use("*",(req, res) => {
res.status(404).send("Ruta no encontrada");
});
  
// para poder inicializar el servidor son necesarias las siguientes lineas:

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
  
  