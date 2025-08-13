document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const booksTableBody = document.querySelector("#booksTable tbody");
    const defaultImage = "./img/default-book.jpg";
    let adminBooks = JSON.parse(localStorage.getItem("adminBooks")) || [];

    function renderBooks() {
        booksTableBody.innerHTML = "";
        adminBooks.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>${book.language}</td>
                <td>${book.publisher}</td>
                <td>${book.category}</td>
                <td>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            `;
            booksTableBody.appendChild(row);
        });
        localStorage.setItem("adminBooks", JSON.stringify(adminBooks));
    }

    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const price = document.getElementById("price").value.trim();
        const language = document.getElementById("language").value.trim() || "English";
        const publisher = document.getElementById("publisher").value.trim() || "Unknown";
        const category = document.getElementById("category").value.trim() || "General";
        const summary = document.getElementById("summary").value.trim() || "";
        const imgInput = document.getElementById("img");

        if (!title || !author || !price) {
            alert("Please fill in the required fields!");
            return;
        }

        const saveBook = (imgBase64) => {
            adminBooks.push({ 
                img: imgBase64 || defaultImage, 
                title, 
                author, 
                price: `$${price}`, 
                language, 
                publisher, 
                category, 
                summary 
            });
            renderBooks();
            bookForm.reset();
        };

        if (imgInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                saveBook(event.target.result);
            };
            reader.readAsDataURL(imgInput.files[0]);
        } else {
            saveBook("");
        }
    });

    window.deleteBook = (index) => {
        adminBooks.splice(index, 1);
        renderBooks();
    };

    window.editBook = (index) => {
        const book = adminBooks[index];
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("price").value = book.price.replace('$', '');
        document.getElementById("language").value = book.language || "";
        document.getElementById("publisher").value = book.publisher || "";
        document.getElementById("category").value = book.category || "";
        document.getElementById("summary").value = book.summary || "";
        adminBooks.splice(index, 1);
        renderBooks();
    };

    renderBooks();
});
