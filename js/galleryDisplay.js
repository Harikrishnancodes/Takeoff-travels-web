var firebaseConfig = {
    apiKey: "AIzaSyAz2p9B9D1akmzj-CP5QdyiWs3Qkxrfvxs",
    authDomain: "takeoff-45765.firebaseapp.com",
    databaseURL: "https://takeoff-45765-default-rtdb.firebaseio.com",
    projectId: "takeoff-45765",
    storageBucket: "takeoff-45765.appspot.com",
    messagingSenderId: "774098979346",
    appId: "1:774098979346:web:89b1e58f4fb0c1c25526cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);













const galleryRef = firebase.database().ref('gallery');
// Your existing Firebase configuration and database reference code

function displayGalleryPage() {
    galleryRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            populateGalleryPage(data);
        })
        .catch(error => console.error('Error fetching gallery data:', error));
}

function populateGalleryPage(data) {
    const galleryContainer = document.querySelector('.row');

    // Get the total number of images
    const totalImages = Object.keys(data).length;

    // Calculate the number of images in each set
    const imagesPerSet = Math.ceil(totalImages / 3);

    // Loop through each set and distribute images to columns
    for (let set = 0; set < 3; set++) {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'gallery-column'); // Use Bootstrap classes for a 3-column layout

        // Loop through images in the current set
        for (let i = set * imagesPerSet; i < (set + 1) * imagesPerSet && i < totalImages; i++) {
            const country = Object.keys(data)[i];
            const galleryItem = data[country];

            const img = document.createElement('img');
            img.src = galleryItem.img_url;
            img.alt = galleryItem.img_place;
            img.classList.add('img-fluid', 'mb-3'); // Add margin-bottom to create space between images
            col.appendChild(img);
        }

        galleryContainer.appendChild(col);
    }
}

// Call displayGalleryPage to populate the gallery on page load
displayGalleryPage();