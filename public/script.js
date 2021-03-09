document.addEventListener("DOMContentLoaded", function(e) {

const root = document.getElementById('root');
let testTitle = document.createElement('p'); 
testTitle.innerText = ("List of channels:");
root.appendChild(testTitle); 
console.log("lalala");

const btnLoad = document.createElement('button'); 
  btnLoad.id = 'btnLoad';
  btnLoad.innerHTML = 'Load'; 
  btnLoad.addEventListener('click', (event) => { 
    alert("The place for list of channels")
  });
  root.appendChild(btnLoad); 

})