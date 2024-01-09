const accessKey = "Q1O5Ss2p6eXwvhuKu1KZ1QhK6IRDdAgwRUUQztP0pbI";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let pageNumber = 1;
let totalPages = 0;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (pageNumber === 1) {
        searchResults.innerHTML = "";
        totalPages = data.total_pages; // Set the total pages from the API response
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    if (pageNumber < totalPages) {
        showMore.style.display = "block";
    } else {
        showMore.style.display = "none"; // Hide the "show more" button if there are no more pages
    }

    pageNumber++;
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    pageNumber = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
