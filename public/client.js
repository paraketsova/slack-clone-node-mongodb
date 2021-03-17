document.addEventListener("DOMContentLoaded", function (e) {
  loadUserInfo();
  loadChannels();
  activateSockets();
});

const loadUserInfo = () => {
  let userContainer = document.getElementById('userinfo');

  fetch('/api/getMe')
    .then(response => response.ok ? response.json() : null)
    .then(user => {
      if (!user) return;
      userContainer.innerHTML = `${user.username} <br> ${user.firstname} ${user.lastname} <br> ${user.email}`;
    });
};

const loadChannels = () => {
  let channelsContainer = document.getElementById('channels');

  fetch('/api/getChannels') 
    .then(response => response.ok ? response.json() : null)
    .then(channels => {      
      if (!channels) return;

      channelsContainer.innerHTML = '';

      channels.forEach(element => {
        let channelLink = document.createElement('a'); //  skapar label till input för att väljer 5 frågor 
        channelLink.addEventListener('click', (event) =>  {
          event.preventDefault();
          loadChannelMessages(element._id);
        });
        channelLink.href = '#'; // TODO: remove after adding CSS
        channelLink.innerText = element.name;

        let channel = document.createElement('li');
        channel.appendChild(channelLink);

        channelsContainer.appendChild(channel);
      })
    });
};

const loadChannelMessages = (channelId) => {
  let messagesContainer = document.getElementById('messages');

  fetch(`/api/getMessages/${channelId}`)
    .then(response => response.ok ? response.json() : null)
    .then(messages => {      
      if (!messages) return;

      messagesContainer.innerHTML = '';

      messages.forEach(element => {
        let message = renderMessage(element);
        messagesContainer.appendChild(message);
      })
    });
};

const renderMessage = (obj) => {
  const m =  document.createElement('ul');

  const mFrom = document.createElement('li');
  mFrom.innerHTML = obj.user.username;
  m.appendChild(mFrom);
  const mDate = document.createElement('li');
  mDate.innerHTML = obj.timestamp;
  m.appendChild(mDate);
  const mText = document.createElement('li');
  mText.innerHTML = obj.text;
  m.appendChild(mText);

  return m;
};

const activateSockets = () => {
  const socket = io();

  const form = document.getElementById('message-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = form.getElementsByTagName('input')[0];
    if (input.value) {
      // Send message to server
      socket.emit('message', input.value);
      input.value = '';
    }
  });

  // Catch message from server
  socket.on('message', function(msg) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = msg;
    //window.scrollTo(0, document.body.scrollHeight);
  });
};