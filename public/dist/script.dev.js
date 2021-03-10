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

  var listChennelsTitle = document.createElement('p');
  listChennelsTitle.innerText = "List of channels:";
  root.appendChild(listChennelsTitle);
  var btnLoad = document.createElement('button');
  btnLoad.id = 'btnLoad';
  btnLoad.innerHTML = 'Load';
  root.appendChild(btnLoad);
  btnLoad.addEventListener('click', function (event) {
    var link = '/api/getChannels';
    fetch(link).then(function (response) {
      return response.json();
    }).then(function (channels) {
      channels.forEach(function (element) {
        var listChannels = document.createElement('p');
        listChannels.innerText = element;
        root.appendChild(listChannels);
      });
    });
  });
});