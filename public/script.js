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
  const m =  document.createElement('div');

  const mFrom = document.createElement('p');
  mFrom.innerHTML = obj.from;
  m.appendChild(mFrom);
  const mTo = document.createElement('p');
  mTo.innerHTML = obj.to;
  m.appendChild(mTo);
  const mDate = document.createElement('p');
  mDate.innerHTML = obj.date;
  m.appendChild(mDate);
  const mText = document.createElement('div');
  mText.innerHTML = obj.text;
  m.appendChild(mText);

  return m;
};
