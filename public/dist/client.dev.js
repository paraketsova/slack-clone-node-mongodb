"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  loadUserInfo();
  loadChannels();
});

var loadUserInfo = function loadUserInfo() {
  var userContainer = document.getElementById('userinfo');
  fetch('/api/getUser').then(function (response) {
    return response.json();
  }).then(function (userInfo) {
    userContainer.innerHTML = '';
    userInfo.forEach(function (element) {
      var userInfoUnit = document.createElement('p');
      userInfoUnit.innerText = element;
      userContainer.appendChild(userInfoUnit);
    });
  });
};

var loadChannels = function loadChannels() {
  var channelsContainer = document.getElementById('channels');
  fetch('/api/getChannels').then(function (response) {
    return response.json();
  }).then(function (channels) {
    channelsContainer.innerHTML = '';
    channels.forEach(function (element) {
      var channelLink = document.createElement('a'); //  skapar label till input för att väljer 5 frågor 

      channelLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadChannelMessages(element.id);
      });
      channelLink.href = '#'; // TODO: remove after adding CSS

      channelLink.innerText = element.name;
      var channel = document.createElement('li');
      channel.appendChild(channelLink);
      channelsContainer.appendChild(channel);
    });
  });
};

var loadChannelMessages = function loadChannelMessages(channelId) {
  var messagesContainer = document.getElementById('messages');
  fetch("/api/getMessages/".concat(channelId)).then(function (response) {
    return response.json();
  }).then(function (messages) {
    messagesContainer.innerHTML = '';
    messages.forEach(function (element) {
      var message = renderMessage(element);
      messagesContainer.appendChild(message);
    });
  });
};

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