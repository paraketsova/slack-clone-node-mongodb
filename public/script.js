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

  let listChennelsTitle = document.createElement('p');
  listChennelsTitle.innerText = ("List of channels:");
  channelsArticle.appendChild(listChennelsTitle);

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
          let listChannels = document.createElement('p');
          listChannels.innerText = element;
          channelsArticle.appendChild(listChannels);
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
  const m = document.createElement('div');
  m.innerHTML = obj.text;
  return m;
};
