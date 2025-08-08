
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    let fullName = document.querySelector('input[type="text"]').value.trim();
    let email = document.querySelector('input[type="email"]').value.trim();
    let phone = document.querySelector('input[type="tel"]').value.trim();
    let password = document.querySelectorAll('input[type="password"]')[0].value.trim();
    let confirmPassword = document.querySelectorAll('input[type="password"]')[1].value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let user = {
        fullName,
        email,
        phone,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! You can now login.");
    window.location.href = "./login.html"; 
});
