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


//=== ===//

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

//=== ===//

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
    let channelLink = document.createElement('a');
    channelLink.addEventListener('click', (event) =>  {
      event.preventDefault();
      selectCurrentChannel(element);
      loadChannelMessages(element._id);
    });
    channelLink.href = '#'; // TODO: remove after adding CSS
    channelLink.innerText = element.name;

    let channel = document.createElement('li');
    channel.id = `channel-${element._id}`;
    channel.classList.add('channel');
    channel.appendChild(channelLink);
    channelsContainer.appendChild(channel);
  })

  // Add new channel
  let wrappNameNewChannel = document.getElementById("wrappNameNewChannel")
  let btnAddChannel = document.getElementById('btnAddChannel');
  let btnSaveChannel =document.getElementById('btnSaveChannel');

  btnAddChannel.addEventListener('click', (event) =>  {
    btnAddChannel.style.visibility = "hidden";
    let nameNewChannel = document.createElement('input');
    nameNewChannel.type = 'text';
    nameNewChannel.placeholder = `Add channel's name`;
    nameNewChannel.id = 'nameNewChannel';
    wrappNameNewChannel.appendChild(nameNewChannel);
    btnSaveChannel.style.visibility = "visible";
    addNewChannel();
  })
};

const addNewChannel = () => {} //TODO: add new channels name to channels container; add functional to choose new channel

const selectCurrentChannel = (channel) => {
  state.currentChannel = channel;

  const previousChannelElement = document.getElementsByClassName('channel-selected')[0]; // begin with channel 1
  if (previousChannelElement) {
    previousChannelElement.classList.remove('channel-selected');
  }

  const currentChannelElement = document.getElementById(`channel-${channel._id}`);
  currentChannelElement.classList.add('channel-selected');

  const channelInfo = document.getElementById('channelInfo'); // add channel's name to the top of the page
  channelInfo.innerHTML = '';
  channelInfo.innerHTML = `${channel.name} `;
  let channelInfoText = document.createElement('div');
  channelInfoText.id = 'channelInfoText'
  channelInfoText.innerHTML = `  channel's messages:`;
  channelInfo.appendChild(channelInfoText);
};

const renderMessages = () => {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';

  state.messages.forEach(element => {
    let message = renderMessage(element);
    messagesContainer.appendChild(message);
  })

  messagesContainer.scrollIntoView(false); // scroll messages to the bottom
};

const renderMessage = (obj) => {
  const m = document.createElement('div');

  const mFrom = document.createElement('div');
  mFrom.id = 'mUsername';
  mFrom.innerHTML = obj.user.username;
  m.appendChild(mFrom);
  const mDate = document.createElement('div');
  mDate.id = 'mDate';
  mDate.innerHTML = obj.timestamp;
  m.appendChild(mDate);
  const mText = document.createElement('div');
  mText.id = 'mText';
  mText.innerHTML = obj.text;
  m.appendChild(mText);

  const attachments = obj.attachments;

  attachments.forEach(element => {
    let mAttachment = document.createElement('img');
    mAttachment.src = `/attachments/${element._id}/${element.name}`;
    m.appendChild(mAttachment);
  });

  const hr = document.createElement('hr');
  m.appendChild(hr);

  return m;
};
//---//

const activateSockets = () => {
  const socket = io();

  const form = document.getElementById('message-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const textInput = form.getElementsByTagName('input')[0];
    const filesInput = form.getElementsByTagName('input')[1];

    if (textInput.value) {
      // Here, `filesInput.files` is FileList - an Array-like object, but not Array. Let's make it a real Array:
      const fileArray = Array.from(filesInput.files);

      // Here, `fileArray` is array of File objects. Since Socket.io serialize File object as Buffer
      // (losing all the metadata along the way), let's reformat every File into simple Object,
      // where the original File will be just one of the Object's properties. This way all metadata
      // properties will be successfully delivered to the server, not lost.
      const files = fileArray.map(f => {
        return {
          name: f.name,
          size: f.size,
          type: f.type,
          blob: f // original File, that will be serialized into a Buffer by Socket.io, on upload
        };
      });

      // This is the message object that will be sent via websocket
      const msg = {
        channel: state.currentChannel._id,
        user: state.user._id,
        text: textInput.value,
        files: files
      };

      // Send message to server
      socket.emit('message', msg);
      textInput.value = '';
      filesInput.value = '';
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
