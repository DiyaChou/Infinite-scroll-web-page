const imageContainer = document.getElementsByClassName("imageContainer")[0];
const loader = document.getElementsByClassName("loader")[0];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Unsplash API
const count = 30;
const apiKey = "fozZzsinusLIYOqphg-pwl-asFlr81sqUb7Yvy62rWg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const images = document.createElement("img");
    setAttributes(images, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listner, check when each is finished loading
    images.addEventListener('load', imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(images);
    imageContainer.appendChild(item);
    
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

//on Load
getPhotos();