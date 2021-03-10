"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  var root = document.getElementById('root');
  var testTitle = document.createElement('p');
  testTitle.innerText = "List of channels:";
  root.appendChild(testTitle);
  var btnLoad = document.createElement('button');
  btnLoad.id = 'btnLoad';
  btnLoad.innerHTML = 'Load';
  root.appendChild(btnLoad);
  btnLoad.addEventListener('click', function (event) {
    var listChannels = document.createElement('p');
    var link = '/api/getChannels';
    fetch(link).then(function (response) {
      return response.json();
    }).then(function (commits) {
      /* alert(commits[0]); */
      commits.forEach(function (element) {
        console.log(element);
        var listChannels = document.createElement('p');
        listChannels.innerText = element;
        root.appendChild(listChannels);
      });
    });
  });
});