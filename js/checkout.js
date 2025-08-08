var userFristName = document.getElementById("fname");
var userLastName = document.getElementById("lname");
var town = document.getElementById("town");
var address = document.getElementById("address");
var country = document.getElementById("country");
var zipCode = document.getElementById("zipcode");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var note = document.getElementById("note");
var placeOrder = document.getElementById("placeOrder");


function validateForm() {
  let fnameValid = /^[A-Za-z]{3,8}$/.test(userFristName.value);
  let lnameValid = /^[A-Za-z]{3,8}$/.test(userLastName.value);
  let noteValid = /^.{10,}$/.test(note.value) || note.value.trim() === "";
  let emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  let addressValid = /^[\w\s.,'-]{5,100}$/.test(address.value);
  let zipCodeValid = /^\d{5}(-\d{4})?$/.test(zipCode.value);
  let phoneValid = /^01[0125]{1}[0-9]{8}$/.test(phone.value);
  let townValid = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/.test(town.value);
  let countryValid = country.value !== "";

toggleError("fnameError", fnameValid, userFristName.value);
toggleError("lnameError", lnameValid, userLastName.value);
toggleError("noteError", noteValid, note.value);
toggleError("emailError", emailValid, email.value);
toggleError("addressError", addressValid, address.value);
toggleError("zipcodeError", zipCodeValid, zipCode.value);
toggleError("phoneError", phoneValid, phone.value);
toggleError("townError", townValid, town.value);


  if (
    fnameValid && lnameValid && emailValid &&
    addressValid && zipCodeValid && phoneValid &&
    townValid && countryValid && noteValid
  ) {
    placeOrder.disabled = false;
    placeOrder.classList.remove("disabled");
  } else {
    placeOrder.disabled = true;
    placeOrder.classList.add("disabled");
  }
}

function toggleError(errorId, isValid, inputValue) {
  const errorElement = document.getElementById(errorId);
  if (!errorElement) return;
  if (inputValue.trim() === "") {
    errorElement.classList.add("d-none");
  } else if (isValid) {
    errorElement.classList.add("d-none");
  } else {
    errorElement.classList.remove("d-none");
  }
}


[userFristName, userLastName, town, address, country, zipCode, phone, email, note].forEach(input =>
  input.addEventListener("input", validateForm)
);

placeOrder.disabled = true;
placeOrder.classList.add("disabled");
