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

  let listChennelsTitle = document.createElement('p');
  listChennelsTitle.innerText = ("List of channels:");
  root.appendChild(listChennelsTitle);

  const btnLoad = document.createElement('button');
  btnLoad.id = 'btnLoad';
  btnLoad.innerHTML = 'Load';
  root.appendChild(btnLoad);

  btnLoad.addEventListener('click', (event) => {

    let link = ('/api/getChannels');
    fetch(link)
      .then(response => response.json())
      .then(channels => {      
        channels.forEach(element => {
          let listChannels = document.createElement('p');
          listChannels.innerText = element;
          root.appendChild(listChannels);
        })
      });

  })

 
});