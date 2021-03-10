const express = require('express');
const app = express();
const path = require('path');

let messages = getFakeMessages()

//по умолчанию  приложение ищет статические файлы в папке /public
app.use(express.static('public')); // serving static files (HTML, js, CSS)


app.get('/api/getChannels', function (request, response) {
  const channels = ['aaa', 'bbb', 'ccc'];
  response.json(channels);
});

app.get('/api/getUser', function (request, response) {
  const user = ['Mariia', 'Paraketsova', 'ponka'];
  response.json(user);
});

app.get('/messages', (request, response) => {
  response.send(messages)
})

app.listen(3000);

function getFakeMessages() {
  return [
    {
      "from": "Anna",
      "to": "Boris",
      "date": "1995-12-17T03:22:00",
      "text": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
    },
    {
      "from": "Boris",
      "to": "Carla",
      "date": "1995-12-17T03:23:00",
      "text": "What kind of magic do cows believe in? MOODOO."
    },
    {
      "from": "Carla",
      "to": "Dastin",
      "date": "1995-12-17T03:24:00",
      "text": "What do you call someone with no nose? Nobody knows."
    },
  ]
}