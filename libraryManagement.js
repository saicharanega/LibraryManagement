let searchInput = document.getElementById("searchInput");
let container = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");



let url = "https://apis.ccbp.in/book-store?title=";
let options = {
    method: "GET"
};

function getBooks(jsonData) {
    spinner.classList.toggle("d-none")
    let heading = document.createElement("p");
    heading.textContent = "Popular Books";
    heading.classList.add("containerError", "col-12")
    container.appendChild(heading)
    for (let item of jsonData) {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("col-6")
        container.appendChild(bookContainer)
        let imageContainer = document.createElement("div");
        bookContainer.appendChild(imageContainer);
        let img = document.createElement("img");
        imageContainer.appendChild(img);
        img.setAttribute("src", item.imageLink);
        let bookAuthor = document.createElement("p");
        bookAuthor.style.textAlign = "center"
        bookContainer.appendChild(bookAuthor)
        bookAuthor.textContent = item.author
        bookAuthor.classList.add("bookAuthor")
    }
}


searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none")

        if (event.target.value === "") {
            spinner.classList.toggle("d-none")
            container.textContent = "No results Found"
            container.classList.add("containerError")

        } else {
            container.textContent = ""
            let targetVal = event.target.value
            fetch(url + targetVal, options)
                .then(function(response) {
                    return response.json()
                })
                .then(function(jsonData) {
                    if (jsonData.total === 0) {
                        container.textContent = "No results Found"
                        container.classList.add("containerError")
                    } else {
                        console.log(jsonData)

                        getBooks(jsonData.search_results)
                    }
                })

        }





    }
})