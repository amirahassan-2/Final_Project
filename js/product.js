
function goToDetails(title) {
    let book = allBooks.find(b => b.title === title);
    if (book) {
        localStorage.setItem("selectedBook", JSON.stringify(book));
    } else {
        localStorage.removeItem("selectedBook");
    }
    window.location.href = `details.html?title=${encodeURIComponent(title)}`;
}

function addToCart(book, button) {
    const currentEmail = localStorage.getItem("currentUserEmail");

    if (!currentEmail) {
        window.location.href = "./login.html"; 
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (!cartItems.some(item => item.title === book.title)) {
        cartItems.push({
            title: book.title,
            author: book.author,
            isbn: Date.now().toString(),
            price: parseFloat(book.price.replace('$', '')),
            qty: 1
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    if (button) {
        button.disabled = true;
        button.innerText = "Added";
    }
}


const defaultBooks = [
    { img: "./img/Book3.jpeg", title: "EYEcontact", author: "Cal Newport", price: "$30", language: "English", publisher: "Grand Central Publishing", category: "Technology", summary: "A guide to deep, focused work that leads to extraordinary results." },
    { img: "./img/Book2.jpeg", title: "Atomic Habits", author: "James Clear", price: "$25", language: "English", publisher: "Penguin Random House", category: "Technology", summary: "Practical strategies for building good habits and breaking bad ones." },
    { img: "./img/Book1.jpeg", title: "The Power of Now", author: "Eckhart Tolle", price: "$20", language: "English", publisher: "New World Library", category: "Technology", summary: "A spiritual guide to living in the present moment." },
    { img: "./img/Book4.jpeg", title: "Deep Work", author: "Cal Newport", price: "$28", language: "English", publisher: "Grand Central Publishing", category: "History", summary: "Rules for focused success in a distracted world." },
    { img: "./img/Book5.jpeg", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: "$22", language: "English", publisher: "Warner Books", category: "History", summary: "Personal finance lessons from two father figures." },
    { img: "./img/Book6.jpeg", title: "Think and Grow Rich", author: "Napoleon Hill", price: "$18", language: "English", publisher: "The Ralston Society", category: "Science", summary: "Timeless principles on wealth creation and success." },
    { img: "./img/Book7.jpeg", title: "The Lean Startup", author: "Eric Ries", price: "$26", language: "English", publisher: "Crown Business", category: "Science", summary: "How modern entrepreneurs use continuous innovation to create success." },
    { img: "./img/Book8.jpeg", title: "Start With Why", author: "Simon Sinek", price: "$24", language: "English", publisher: "Portfolio", category: "Science", summary: "Discover how great leaders inspire action." },
    { img: "./img/Book9.jpeg", title: "Sapiens", author: "Yuval Noah Harari", price: "$29", language: "English", publisher: "Harper", category: "History", summary: "A brief history of humankind." },
    { img: "./img/Book10.jpeg", title: "Educated", author: "Tara Westover", price: "$27", language: "English", publisher: "Random House", category: "Psychology", summary: "A memoir about growing up in a strict survivalist family." },
    { img: "./img/Book11.jpeg", title: "Becoming", author: "Michelle Obama", price: "$32", language: "English", publisher: "Crown Publishing", category: "Psychology", summary: "The memoir of former First Lady Michelle Obama." },
    { img: "./img/Book12.jpeg", title: "The Alchemist", author: "Paulo Coelho", price: "$19", language: "English", publisher: "HarperOne", category: "Psychology", summary: "A philosophical novel about pursuing dreams." },
    { img: "./img/Book13.jpeg", title: "To Kill a Mockingbird", author: "Harper Lee", price: "$21", language: "English", publisher: "J.B. Lippincott & Co.", category: "Fiction", summary: "A classic novel on race, injustice, and morality." },
    { img: "./img/Book14.jpeg", title: "1984", author: "George Orwell", price: "$17", language: "English", publisher: "Secker & Warburg", category: "Fiction", summary: "A dystopian novel about totalitarianism and surveillance." },
    { img: "./img/Book15.jpeg", title: "Pride and Prejudice", author: "Jane Austen", price: "$16", language: "English", publisher: "T. Egerton", category: "Fiction", summary: "A romantic novel about manners and social class." }
];


let adminBooks = JSON.parse(localStorage.getItem("adminBooks")) || [];
let allBooks = [...defaultBooks, ...adminBooks];


const container = document.getElementById("booksContainer");
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');

let filteredBooks = selectedCategory 
    ? allBooks.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase()) 
    : allBooks;


function displayBooks(booksToDisplay) {
    const cartItemsLocal = JSON.parse(localStorage.getItem("cartItems")) || [];
    container.innerHTML = "";
    booksToDisplay.forEach(book => {
        const isInCart = cartItemsLocal.some(item => item.title === book.title);
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card shadow-lg p-3">
                    <img src="${book.img}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="text-muted">by ${book.author}</h6>
                        <p>Price: ${book.price}</p>
                        <p>Language: ${book.language}</p>
                        <p>Publisher: ${book.publisher}</p>
                        <p>Category: ${book.category}</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary btn-sm" style="background-color:#a60dee;" onclick="goToDetails('${book.title}')">Details</button>
                            <button class="btn btn-success btn-sm" style="background-color:#6f42c1;" 
                                onclick='addToCart(${JSON.stringify(book)}, this)' 
                                ${isInCart ? "disabled" : ""}>
                                ${isInCart ? "Added" : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}


const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function runSearch() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const result = q ? filteredBooks.filter(b => b.title.toLowerCase().includes(q)) : filteredBooks;
    displayBooks(result);
}

if (searchInput && searchButton) {
    searchButton.addEventListener("click", runSearch);
    searchInput.addEventListener("input", runSearch);
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            runSearch();
        }
    });
}


displayBooks(filteredBooks);
