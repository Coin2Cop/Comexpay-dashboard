function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function validar1(dat){
    if(dat == ""){
        const block_nombre = document.getElementById("contra1_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "Campo obligatorio"
        document.getElementById("password1").style.borderColor = "red";
      }else
    if(dat.length < 8){
        const block_nombre = document.getElementById("contra1_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "Minimo 8 caracteres alfanumericos"
        document.getElementById("password1").style.borderColor = "red";
    }
    else{
        const block_nombre = document.getElementById("contra1_val");
        block_nombre.style.display = "none";
        block_nombre.innerText = "Campo obligatorio"
        document.getElementById("password1").style.borderColor = "#DEE2E6";
      }
}

function validar2(dat){
    const password2 = document.getElementById("password1").value;
    if(dat == ""){
        const block_nombre = document.getElementById("contra2_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "Campo obligatorio"
        document.getElementById("password2").style.borderColor = "red";
      }else
    if(dat != password2){
        const block_nombre = document.getElementById("contra2_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "contraseñas no coinciden"
        document.getElementById("password2").style.borderColor = "red";
    }
    else{
        const block_nombre = document.getElementById("contra2_val");
        block_nombre.style.display = "none";
        block_nombre.innerText = "Campo obligatorio"
        document.getElementById("password2").style.borderColor = "#DEE2E6";
      }
}

function verificar(){
    const id = getParameterByName('id');
    const uuid = getParameterByName('uuid');
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    console.log(password1)
    console.log(password2)
    if(password1 == ""){
        const block_nombre = document.getElementById("contra1_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "Campo obligatorio"
        document.getElementById("password1").style.borderColor = "red";
        return
    }
    if(password1.length < 8){
        const block_nombre = document.getElementById("contra1_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "Minimo 8 caracteres alfanumericos"
        document.getElementById("password1").style.borderColor = "red";
        return
    }
    if(password1 == password2){
        const formData = new FormData
        formData.append('id', id)
        formData.append('uuid', uuid)
        formData.append('password', password1)
        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/cambiarContra", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            if(res.data.data == 0){
                Swal.fire({
                    icon: "error",
                    title: "Error en el cambio de contraseña",
                    showConfirmButton: false,
                    timer: 2000
                })
                console.log(res)
            }
            if(res.data.data == 1){
                Swal.fire({
                    icon: "success",
                    title: "Cambio realizado con exito",
                    showConfirmButton: false,
                    timer: 2000
                }).then(function(){
                    localStorage.id = id 
                    location.href ='https://app.comexpay.co/dashboard';
                })
                console.log(res)
            }
        }).catch(function(err){
            console.log(err)
        })
        
    }
    else{
        const block_nombre = document.getElementById("contra2_val");
        block_nombre.style.display = "block";
        block_nombre.style.color = "red";
        block_nombre.innerText = "contraseñas no coinciden"
        document.getElementById("password2").style.borderColor = "red";
        return
    }
}