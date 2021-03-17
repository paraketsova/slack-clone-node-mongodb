document.addEventListener("DOMContentLoaded", function (e) {
  loadUserInfo();
  loadChannels();
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
