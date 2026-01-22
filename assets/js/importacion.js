window.onload = function() {
    const name = localStorage.name
    const lastName = localStorage.lastName
    const email = localStorage.email
    const phone = localStorage.phone
    document.getElementById('nombre').value = name;
    document.getElementById('apellido').value = lastName;
    document.getElementById('email').value = email;
    document.getElementById('telefono').value = phone;
}