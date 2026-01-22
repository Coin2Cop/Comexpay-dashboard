window.onload = function() {
    const id = localStorage.getItem("id")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/user/10/0", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countUser", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            document.getElementById("users").innerHTML = res2.data.data
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            let emailVerifi
            let phoneVerifi
            for(i = 0; i < res.data.data.length; i++){
                let tabla = document.getElementById("list_importacion")
                if(res.data.data[i].emailVerifi == true){
                  emailVerifi="<i class='mdi mdi-check-circle-outline' style='color: rgb(81, 244, 0); font-size: 23px; margin-left: 5px;'></i>"
                }else{
                  emailVerifi="<i class='mdi mdi-close-circle-outline' style='color: rgb(234, 46, 46); font-size: 23px; margin-left: 5px;'></i>"
                }
                if(res.data.data[i].phoneVerifi == true){
                  phoneVerifi="<i class='mdi mdi-check-circle-outline' style='color: rgb(81, 244, 0); font-size: 23px; margin-left: 5px;'></i>"
                }else{
                  phoneVerifi="<i class='mdi mdi-close-circle-outline' style='color: rgb(234, 46, 46); font-size: 23px; margin-left: 5px;'></i>"
                }
                tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i].name+"\",\""+res.data.data[i].lastName+"\",\""+res.data.data[i].email+"\",\""+res.data.data[i].phone+"\")'><th>"+(Number(i)+Number(1))+"</th><td>"+res.data.data[i].name+"</td><td>"+res.data.data[i].lastName+"</td><td>"+res.data.data[i].email+emailVerifi+"</td><td>"+res.data.data[i].phone+phoneVerifi+"</td></tr>");
                window.addEventListener('scroll', onScroll2) // llamamos a onScroll cuando el usuario hace scroll
            }
          }).catch(function(err) {
            console.log(err)
          })
        }).catch(function(err) {
          console.log(err)
        })
  };
function detalles(id, name, lastName, email, phone){
    localStorage.idUser = id
    window.location.href="https://app.comexpay.co/pages/general/profileUser.html"


    /*document.getElementById("name").value = name
    document.getElementById("lastName").value = lastName
    document.getElementById("email").value = email
    document.getElementById("phone").value = phone
    document.getElementById("id").value = id
    console.log(id)
    console.log(name)
    console.log(lastName)
    console.log(email)
    console.log(phone)
    const exampleModal = document.querySelector("#exampleModal");
    const myModal = new bootstrap.Modal(exampleModal);
    myModal.show();



    $('#exampleModal').modal({ show:true });*/
    //localStorage.id_importacion = id
    //location.href ='https://comexpay.co/dashboard/template/comexpay/pages/importacion/admin_importacion.html';
}
function actualizar(){
  const name = document.getElementById("name").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const id = document.getElementById("id").value
  const formData = new FormData
  formData.append('id', id)
  formData.append('name', name)
  formData.append('lastName', lastName)
  formData.append('email', email)
  formData.append('phone', phone)
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/editUser", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
    .then(function(res) {
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado correctamente",
        showConfirmButton: false,
        timer: 2000
      }).then(function(){
        axios.get("https://api.telegram.org/bot8190492794:AAGbP4X7WY8_4YxCegnIhxZf6EzCbw9vWxY/sendMessage?text=Usuario%20"+email+"%20actualizado%20por%20un%20administrador&chat_id=-1002348698878")
        .then(function(res){
          location.href ='https://app.comexpay.co/pages/usuarios/usuarios';
        })
      })
    }).catch(function(err){
      console.log(err)
    })
}

const onScroll2 = () => {
  if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    // hacer fetch
    let indice = Number(localStorage.indice)
    let cantidad =  localStorage.cantidad
    if(indice < cantidad){
      console.log("entro")
      indice = indice + 10
      localStorage.indice = indice
      j = Number(indice)
      axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/user/10/"+indice, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          for(i = 0; i < res.data.data.length; i++){
            j = j + 1
            let tabla = document.getElementById("list_importacion")
            tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i].name+"\",\""+res.data.data[i].lastName+"\",\""+res.data.data[i].email+"\",\""+res.data.data[i].phone+"\")'><th>"+(Number(j))+"</th><td>"+res.data.data[i].name+"</td><td>"+res.data.data[i].lastName+"</td><td>"+res.data.data[i].email+"</td><td>"+res.data.data[i].phone+"</td></tr>");
          }
        }).catch(function(err) {
          console.log(err)
        })
      localStorage.indice = indice
    }
    console.log('estoy en el final del scroll')
  }
}

function filt_oper(info){
  if(info == ""){
    let tabla = document.getElementById("list_importacion")
    tabla.innerHTML = "";
    const id = localStorage.getItem("id")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/user/10/0", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countUser", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            for(i = 0; i < res.data.data.length; i++){
                let tabla = document.getElementById("list_importacion")
                /*let fecha = res.data.data[i].createdAt
                fecha = fecha.slice(0, -14);
                let estado = res.data.data[i].estado
                if(estado == "1"){
                  estado = "<span class='badge border border-warning text-warning'>En proceso</span>"
                }else{
                  if(estado == "2"){
                    estado = "<span class='badge border border-danger text-danger'>rechazada</span>"
                  }
                  else{
                    if(estado == "3"){
                      estado = "<span class='badge border border-primary text-primary'>Error en documentos</span>"
                    }else{
                      estado = "<span class='badge border border-success text-success'>aceptada</span>"
                    }
                  }
                }*/
                tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i].name+"\",\""+res.data.data[i].lastName+"\",\""+res.data.data[i].email+"\",\""+res.data.data[i].phone+"\")'><th>"+(Number(i)+Number(1))+"</th><td>"+res.data.data[i].name+"</td><td>"+res.data.data[i].lastName+"</td><td>"+res.data.data[i].email+"</td><td>"+res.data.data[i].phone+"</td></tr>");
                window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll
            }
          }).catch(function(err) {
            console.log(err)
          })
        }).catch(function(err) {
          console.log(err)
        })
  }
  else{
    const id = localStorage.getItem("id")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/user/30/0?busqueda="+info, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countUser", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            let tabla = document.getElementById("list_importacion")
            tabla.innerHTML = "";
            for(i = 0; i < res.data.data.length; i++){
                /*let fecha = res.data.data[i].createdAt
                fecha = fecha.slice(0, -14);
                let estado = res.data.data[i].estado
                if(estado == "1"){
                  estado = "<span class='badge border border-warning text-warning'>En proceso</span>"
                }else{
                  if(estado == "2"){
                    estado = "<span class='badge border border-danger text-danger'>rechazada</span>"
                  }
                  else{
                    if(estado == "3"){
                      estado = "<span class='badge border border-primary text-primary'>Error en documentos</span>"
                    }else{
                      estado = "<span class='badge border border-success text-success'>aceptada</span>"
                    }
                  }
                }*/
                tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i].name+"\",\""+res.data.data[i].lastName+"\",\""+res.data.data[i].email+"\",\""+res.data.data[i].phone+"\")'><th>"+(Number(i)+Number(1))+"</th><td>"+res.data.data[i].name+"</td><td>"+res.data.data[i].lastName+"</td><td>"+res.data.data[i].email+"</td><td>"+res.data.data[i].phone+"</td></tr>");
                window.removeEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll
            }
          }).catch(function(err) {
            console.log(err)
          })
        }).catch(function(err) {
          console.log(err)
        })
  }

}
 