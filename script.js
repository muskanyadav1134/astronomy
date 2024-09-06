var dateElement = document.querySelector(".date");
var image = document.querySelector(".image");
var imageName = document.querySelector(".image-name");
var popup = document.getElementById("popup");
var popupDescription = document.getElementById("popupDescription");
var closePopup = document.getElementById("closePopup");
var apiKey = "ZwqvWYcMPbCrGI5iLTcK2ieaw5IKF5PlacqcFYVE";
var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  // Add suffix for day
  const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                 (day % 10 === 2 && day !== 12) ? 'nd' :
                 (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
  
  return `${day}${suffix} ${month} ${year}`;
}

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dateElement.textContent = formatDate(data.date); // Format the date
    image.src = data.url;
    imageName.textContent = data.title;
    
    // Set up image click event to show popup
    image.addEventListener("click", function() {
      popupDescription.textContent = data.explanation;
      popup.style.display = "flex";
    });
    
    // Set up close button event to hide popup
    closePopup.addEventListener("click", function() {
      popup.style.display = "none";
    });

    // Hide popup if user clicks outside of it
    window.addEventListener("click", function(event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
