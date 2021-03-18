const state = {
  user: {},
  channels: [],
  currentChannel: {},
  messages: []
};

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
      state.user = user;
      userContainer.innerHTML = `${user.username} <br> ${user.firstname} ${user.lastname} <br> ${user.email}`;
    });
};

const loadChannels = () => {
  fetch('/api/getChannels') 
    .then(response => response.ok ? response.json() : null)
    .then(channels => {      
      if (!channels) return;
      state.channels = channels;
      renderChannels();
    })
    .then(channels => {
      // Loading the first channel automatically
      const channel = state.channels[0];
      const id = channel._id;
      selectCurrentChannel(channel);
      loadChannelMessages(id);
    });
};

const loadChannelMessages = (channelId) => {
  fetch(`/api/getMessages/${channelId}`)
    .then(response => response.ok ? response.json() : null)
    .then(messages => {      
      if (!messages) return;
      state.messages = messages;
      renderMessages();
    });
};

const renderChannels = () => {
  const channelsContainer = document.getElementById('channels');
  channelsContainer.innerHTML = '';

  state.channels.forEach(element => {
    let channelLink = document.createElement('a'); //  skapar label till input för att väljer 5 frågor 
    channelLink.addEventListener('click', (event) =>  {
      event.preventDefault();
      selectCurrentChannel(element);
      loadChannelMessages(element._id);
    });
    channelLink.href = '#'; // TODO: remove after adding CSS
    channelLink.innerText = element.name;

    let channel = document.createElement('li');
    channel.id = `channel-${element._id}`;
    channel.appendChild(channelLink);

    channelsContainer.appendChild(channel);
  })
};

const selectCurrentChannel = (channel) => {
  state.currentChannel = channel;

  const previousChannelElement = document.getElementsByClassName('channel-selected')[0];
  if (previousChannelElement) {
    previousChannelElement.classList.remove('channel-selected');
  }

  const currentChannelElement = document.getElementById(`channel-${channel._id}`);
  currentChannelElement.classList.add('channel-selected');
};

const renderMessages = () => {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';

  state.messages.forEach(element => {
    let message = renderMessage(element);
    messagesContainer.appendChild(message);
  })

  messagesContainer.scrollIntoView(false);
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
      const msg = {
        channel: state.currentChannel._id,
        user: state.user._id,
        text: input.value
      };
      // Send message to server
      socket.emit('message', msg);
      input.value = '';
    }
  });

  // Catch message from server
  socket.on('message', function(msg) {
    if (state.currentChannel._id === msg.channel) {
      state.messages.push(msg);
      renderMessages();
    }
  });
};
