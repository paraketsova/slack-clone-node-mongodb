document.addEventListener("DOMContentLoaded", function (e) {

  const root = document.getElementById('root');

  //----UserInfo----
  let userArticle = document.createElement('div');
  root.appendChild(userArticle);

  let userInfoTitle = document.createElement('p');
  userInfoTitle.innerText = ("User Info:");
  userArticle.appendChild(userInfoTitle);

  let userLink = ('/api/getUser');

  fetch(userLink)
      .then(response => response.json())
      .then(userInfo => {      
        userInfo.forEach(element => {
          let userInfoUnit = document.createElement('p');
          userInfoUnit.innerText = element;
          userArticle.appendChild(userInfoUnit);
        })
      });

  //----Channels----
  let channelsArticle = document.createElement('div');
  root.appendChild(channelsArticle);

  let listChannelsTitle = document.createElement('p');
  listChannelsTitle.innerText = ("List of channels:");
  channelsArticle.appendChild(listChannelsTitle);

  const btnLoadCh = document.createElement('button');
  btnLoadCh.id = 'btnLoadCh';
  btnLoadCh.innerHTML = 'Load channels';
  channelsArticle.appendChild(btnLoadCh);

  btnLoadCh.addEventListener('click', (event) => {

    let link = ('/api/getChannels');
    fetch(link)
      .then(response => response.json())
      .then(channels => {      
        channels.forEach(element => {
          let channel = document.createElement('input');
          channelsArticle.appendChild(channel);
          channel.type = 'radio';
          channel.id = element.id;
          channel.name = 'listChannel'; // skapar en namn för alla radiobutton 
          channel.value = 'text';

          let channelLabel = document.createElement('label'); //  skapar label till input för att väljer 5 frågor 
          channelLabel.setAttribute('for', channel.id);
          channelLabel.innerText = element.name;
          channelsArticle.appendChild(channelLabel);
        })
      });
  })

  //---Messages----//
  let messagesArticle = document.createElement('div');
  root.appendChild(messagesArticle);

  const btnLoadMess = document.createElement('button');
  btnLoadMess.id = 'btnLoadMess';
  btnLoadMess.innerHTML = 'Load all messages';
  messagesArticle.appendChild(btnLoadMess);

  btnLoadMess.addEventListener('click', (event) => {

    let messLink = ('/api/getMessages');
    fetch(messLink)
      .then(response => response.json())
      .then(messages => {      
        messages.forEach(element => {
          let message = renderMessage(element);
          messagesArticle.appendChild(message);
        })
      });
  })
});

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
