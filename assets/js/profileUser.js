document.addEventListener("DOMContentLoaded", function(event) {
    idUser = localStorage.idUser
    const formData = new FormData();
    formData.append('idUser', idUser);

    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
    .then(function(res) {
        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res2) {


            document.getElementById("name").value = res2.data.data[0].nomUser
            document.getElementById("name2").value = res2.data.data[0].nom2User
            document.getElementById("lastName").value = res2.data.data[0].lastNameUser
            document.getElementById("lastName2").value = res2.data.data[0].lastName2User
            document.getElementById("email").value = email
            document.getElementById("phone").value = phone


            
        }).catch(function(err) {
            console.log(err)
        })

        console.log(res)
    }).catch(function(err) {
        console.log(err)
    })

    

    const name = localStorage.name
    const lastName = localStorage.lastName
    const email = localStorage.email
    const phone = localStorage.phone
    document.getElementById("name").value = name
    document.getElementById("lastName").value = lastName
    document.getElementById("email").value = email
    document.getElementById("phone").value = phone
});
function actualizar(){
    const actual = document.getElementById("actual").value
    const nueva = document.getElementById("nueva").value
    const repita = document.getElementById("repita").value
    if(nueva != repita){
        Swal.fire({
            icon: "warning",
            title: "las contraseñas no coinciden",
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    if(actual == "" || nueva == "" || repita == ""){
        Swal.fire({
            icon: "warning",
            title: "ningun campo debe estar vacio",
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    if(nueva.length < 8){
        Swal.fire({
            icon: "warning",
            title: "tu contraseña debe contener 8 caracteres o mas",
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    if(actual == nueva){
        Swal.fire({
            icon: "warning",
            title: "la nueva contraseña no debe ser igual a la anterior",
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    const id = localStorage.id
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', actual);
    formData.append('newpassword', nueva);
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/actualizaPass", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            if(res.data.data == 0){
                Swal.fire({
                    icon: "warning",
                    title: "contraseña incorrecta",
                    showConfirmButton: false,
                    timer: 2500
                })
            }
            if(res.data.data == 1){
                Swal.fire({
                    icon: "success",
                    title: "contraseña modificada con exito",
                    showConfirmButton: false,
                    timer: 2500
                })
            }
            console.log(res)
        }).catch(function(err) {
            console.log(err)
        })


}