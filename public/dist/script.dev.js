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
  var listChannelsTitle = document.createElement('p');
  listChannelsTitle.innerText = "List of channels:";
  channelsArticle.appendChild(listChannelsTitle);
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
        var channel = document.createElement('input');
        channelsArticle.appendChild(channel);
        channel.type = 'radio';
        channel.id = element.id;
        channel.name = 'listChannel'; // skapar en namn för alla radiobutton 

        channel.value = 'text';
        var channelLabel = document.createElement('label'); //  skapar label till input för att väljer 5 frågor 

        channelLabel.setAttribute('for', channel.id);
        channelLabel.innerText = element.name;
        channelsArticle.appendChild(channelLabel);
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
  var m = document.createElement('ul');
  var mFrom = document.createElement('li');
  mFrom.innerHTML = obj.from;
  m.appendChild(mFrom);
  var mTo = document.createElement('li');
  mTo.innerHTML = obj.to;
  m.appendChild(mTo);
  var mDate = document.createElement('li');
  mDate.innerHTML = obj.date;
  m.appendChild(mDate);
  var mText = document.createElement('li');
  mText.innerHTML = obj.text;
  m.appendChild(mText);
  return m;
};