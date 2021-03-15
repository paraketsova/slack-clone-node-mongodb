document.addEventListener("DOMContentLoaded", function (e) {
  
  loadChannels();
});

const loadChannels = () => {
  let channelsContainer = document.getElementById('channelsContainer');
  fetch('/mdb') 
    .then(channels => {
      channelsContainer.innerHTML = '';
      channels.forEach(element => {
        let channelLink = document.createElement('a'); //  skapar label till input för att väljer 5 frågor 
        channelLink.addEventListener('click', (event) =>  {
          event.preventDefault();
          console.log('lalalalala');
          //loadChannelMessages(element.id);
        });
        channelLink.href = '#'; // TODO: remove after adding CSS
        channelLink.innerText = element.name;

        let channel = document.createElement('li');
        channel.appendChild(channelLink);

        channelsContainer.appendChild(channel);
      })
    })
}

const loadChannels = () => {
  let messagesContainer = document.getElementById('messagesContainer');
}