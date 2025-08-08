
const adminData = {
    email: "admin@example.com",
    password: "123456"
};


document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.querySelector('input[type="email"]').value.trim();
    let password = document.querySelector('input[type="password"]').value.trim();

    
    if (email === adminData.email && password === adminData.password) {
        alert("Welcome Admin!");
        window.location.href = "admin_dashboard.html"; 
        return;
    }

    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    
    let userFound = users.find(user => user.email === email && user.password === password);

    if (userFound) {
        alert("Login successful!");
        window.location.href = "user_home.html";
    } else {
        
    }
});


