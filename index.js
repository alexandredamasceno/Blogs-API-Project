const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use(userController);

app.use(categoryController);

app.use(blogPostController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
