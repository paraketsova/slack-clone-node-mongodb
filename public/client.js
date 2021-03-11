document.addEventListener("DOMContentLoaded", function (e) {
  loadUserInfo();
  loadChannels();
});

const loadUserInfo = () => {
  let userContainer = document.getElementById('userinfo');

  fetch('/api/getUser')
    .then(response => response.json())
    .then(userInfo => {      
      userContainer.innerHTML = '';

      userInfo.forEach(element => {
        let userInfoUnit = document.createElement('p');
        userInfoUnit.innerText = element;
        userContainer.appendChild(userInfoUnit);
      })
    });
};

const loadChannels = () => {
  let channelsContainer = document.getElementById('channels');

  fetch('/api/getChannels')
    .then(response => response.json())
    .then(channels => {      
      channelsContainer.innerHTML = '';

      channels.forEach(element => {
        let channelLink = document.createElement('a'); //  skapar label till input för att väljer 5 frågor 
        channelLink.addEventListener('click', (event) =>  {
          event.preventDefault();
          loadChannelMessages(element.id);
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
    .then(response => response.json())
    .then(messages => {      
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
  mFrom.innerHTML = obj.from;
  m.appendChild(mFrom);
  const mTo = document.createElement('li');
  mTo.innerHTML = obj.to;
  m.appendChild(mTo);
  const mDate = document.createElement('li');
  mDate.innerHTML = obj.date;
  m.appendChild(mDate);
  const mText = document.createElement('li');
  mText.innerHTML = obj.text;
  m.appendChild(mText);

  return m;
};
