let number = 0;
let data = []; // Store data retrieved from ajax.json
const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

function getData() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      data = JSON.parse(request.responseText); // Store data once
      updateVideo(); // Display the first video immediately
    }
  };
  request.open("GET", "ajax.json");
  request.send();
}

function updateVideo() {
  if (data.length > 0) {
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);
    
    // Cycle through videos
    number = (number + 1) % data.length;
  }
}

function changeVideo() {
  if (data.length === 0) {
    getData(); // Fetch data only if it hasn't been loaded
  } else {
    updateVideo();
  }
}

// Attach event listener to button
button.addEventListener('click', changeVideo);

// Load data on page load
window.onload = getData;
