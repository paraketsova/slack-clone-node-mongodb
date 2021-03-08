const express = require('express');
const app = express();
const path = require('path');

//по умолчанию  приложение ищет статические файлы в папке /public
app.use(express.static('public')); // serving static files (HTML, js, CSS)


app.get('/api/getChannels', function (request, response) {
  const channels = ['aaa', 'bbb', 'ccc'];
  response.json(channels);
});

app.listen(3000);