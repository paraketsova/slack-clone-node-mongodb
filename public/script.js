document.addEventListener("DOMContentLoaded", function (e) {

  const root = document.getElementById('root');

  let testTitle = document.createElement('p');
  testTitle.innerText = ("List of channels:");
  root.appendChild(testTitle);


  const btnLoad = document.createElement('button');
  btnLoad.id = 'btnLoad';
  btnLoad.innerHTML = 'Load';
  root.appendChild(btnLoad);

  btnLoad.addEventListener('click', (event) => {

    let listChannels = document.createElement('p');


    let link = ('/api/getChannels');

    fetch(link)
      .then(response => response.json())
      .then(commits => {
        alert(commits[0]);

        listChannels.innerText = commits[1]; 
        root.appendChild(listChannels);

      });

  })


});