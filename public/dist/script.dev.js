"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  var root = document.getElementById('root'); //----UserInfo----

  var userArticle = document.createElement('div');
  root.appendChild(userArticle);
  var userInfoTitle = document.createElement('p');
  userInfoTitle.innerText = "User Info:";
  userArticle.appendChild(userInfoTitle);
  var userLink = '/api/getUser';
  fetch(userLink).then(function (response) {
    return response.json();
  }).then(function (userInfo) {
    userInfo.forEach(function (element) {
      var userInfoUnit = document.createElement('p');
      userInfoUnit.innerText = element;
      userArticle.appendChild(userInfoUnit);
    });
  }); //----Channels----

  var channelsArticle = document.createElement('div');
  root.appendChild(channelsArticle);
  var listChennelsTitle = document.createElement('p');
  listChennelsTitle.innerText = "List of channels:";
  channelsArticle.appendChild(listChennelsTitle);
  var btnLoadCh = document.createElement('button');
  btnLoadCh.id = 'btnLoadCh';
  btnLoadCh.innerHTML = 'Load channels';
  channelsArticle.appendChild(btnLoadCh);
  btnLoadCh.addEventListener('click', function (event) {
    var link = '/api/getChannels';
    fetch(link).then(function (response) {
      return response.json();
    }).then(function (channels) {
      channels.forEach(function (element) {
        var listChannels = document.createElement('p');
        listChannels.innerText = element;
        channelsArticle.appendChild(listChannels);
      });
    });
  }); //---Messages----//

  var messagesArticle = document.createElement('div');
  root.appendChild(messagesArticle);
  var btnLoadMess = document.createElement('button');
  btnLoadMess.id = 'btnLoadMess';
  btnLoadMess.innerHTML = 'Load all messages';
  messagesArticle.appendChild(btnLoadMess);
  btnLoadMess.addEventListener('click', function (event) {
    var messLink = '/api/getMessages';
    fetch(messLink).then(function (response) {
      return response.json();
    }).then(function (messages) {
      messages.forEach(function (element) {
        var message = renderMessage(element);
        messagesArticle.appendChild(message);
      });
    });
  });
});

var renderMessage = function renderMessage(obj) {
  var m = document.createElement('div');
  m.innerHTML = obj.text;
  return m;
};