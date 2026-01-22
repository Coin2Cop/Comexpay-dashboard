window.onload = function() {
    console.log("Bien")
    const id = localStorage.getItem("idUser")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresa", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            console.log(res)
            //document.getElementById("users").innerHTML = res2.data.data
            //localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            for(i = 0; i < res.data.data.length; i++){
              if(res.data.data[i].activo == "1" || res.data.data[i].activo == "1"){
                const botHabilitar = document.getElementById("habilitar");
                const botInhabilitar = document.getElementById("inhabilitar");
                botInhabilitar.style.display = "block";
                botHabilitar.style.display = "none";
                estado = "<span class='badge border border-success text-success'>activa</span>"
              }
              else{
                const botHabilitar = document.getElementById("habilitar");
                const botInhabilitar = document.getElementById("inhabilitar");
                botInhabilitar.style.display = "none";
                botHabilitar.style.display = "block";
                estado = "<span class='badge border border-danger text-danger'>inactiva</span>"
              }
                let tabla = document.getElementById("list_empresa")
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles_empresa(\""+res.data.data[i]._id+"\",\""+res.data.data[i].camara+"\",\""+res.data.data[i].composicion+"\",\""+res.data.data[i].declaracion+"\",\""+res.data.data[i].esta_financieros+"\",\""+res.data.data[i].img_cedula+"\",\""+res.data.data[i].razon+"\",\""+res.data.data[i].rut+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].razon+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                //tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+"</td><td style='text-align: center;'>"+estCedulaFront+"</td><td style='text-align: center;'>"+estCedulaBack+"</td><td style='text-align: center;'>"+estSelfie+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                //tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+' '+res.data.data[i].user[0].lastName+"</td><td style='text-align: center;'>"+imagen+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                window.addEventListener('scroll', onScroll2) // llamamos a onScroll cuando el usuario hace scroll
            }
        }).catch(function(err) {
          console.log(err)
        })
  };
function detalles(id){
    localStorage.idKyc=id
    window.location.href= "https://app.comexpay.co/pages/kyc/detallesKyc"
}


function detalles_empresa(id, camara, composicion, declaracion, esta_financieros, img_cedula, razon, rut){
  localStorage.idEmpresa = id
  document.getElementById("razon").value=razon
  document.getElementById("camara").setAttribute('href', "https://api.comexpay.co/recursos/"+camara);
  document.getElementById("camara").textContent = "https://api.comexpay.co/recursos/"+camara
  document.getElementById("composicion").setAttribute('href', "https://api.comexpay.co/recursos/"+composicion);
  document.getElementById("composicion").textContent = "https://api.comexpay.co/recursos/"+composicion
  document.getElementById("cedula").setAttribute('href', "https://api.comexpay.co/recursos/"+img_cedula);
  document.getElementById("cedula").textContent = "https://api.comexpay.co/recursos/"+img_cedula
  document.getElementById("rut").setAttribute('href', "https://api.comexpay.co/recursos/"+rut);
  document.getElementById("rut").textContent = "https://api.comexpay.co/recursos/"+rut
  document.getElementById("declaracion").setAttribute('href', "https://api.comexpay.co/recursos/"+declaracion);
  document.getElementById("declaracion").textContent = "https://api.comexpay.co/recursos/"+declaracion
  document.getElementById("estados").setAttribute('href', "https://api.comexpay.co/recursos/"+esta_financieros);
  document.getElementById("estados").textContent = "https://api.comexpay.co/recursos/"+esta_financieros

  
  const detalles_ced = document.querySelector("#empresa");
  const myModal = new bootstrap.Modal(detalles_ced);
  myModal.show();
}

function inhabilitar(){
  idEmpresa = localStorage.idEmpresa
  const formData = new FormData
  formData.append('idEmpresa', idEmpresa)
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/inhaEmpresa", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
    Swal.fire({
        icon: "success",
        title: "Empresa Inhabilitada con exito",
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
      window.location.href = "https://app.comexpay.co/pages/general/profileUser"
    })
  }).catch(function(err){
      console.log(err)
  })
}

function habilitar(){
  idEmpresa = localStorage.idEmpresa
  const formData = new FormData
  formData.append('idEmpresa', idEmpresa)
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/habiEmpresa", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
    Swal.fire({
        icon: "success",
        title: "Empresa habilitada con exito",
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
      window.location.href = "https://app.comexpay.co/pages/general/profileUser"
    })
  }).catch(function(err){
      console.log(err)
  })
}



function detalles_passp(id, imgPassp, imgSelfie, name, lastname, email, phone){
  localStorage.idKyc = id;
  document.getElementById("detalles_cedLabel2").textContent = name + " " + lastname;
  document.getElementById("nombre2").textContent = name;
  document.getElementById("apellido2").textContent = lastname;
  document.getElementById("correo2").textContent = email;
  document.getElementById("telefono2").textContent = phone;
  document.getElementById("img_passp").src = "https://api.comexpay.co/recursos/"+imgPassp;
  document.getElementById("img_selfie2").src = "https://api.comexpay.co/recursos/"+imgSelfie;
  const detalles_ced = document.querySelector("#detalles_passp");
  const myModal = new bootstrap.Modal(detalles_ced);
  myModal.show();
}

function verificar(){
  idKyc = localStorage.idKyc
  const formData = new FormData
  formData.append('idKyc', idKyc)
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/aproKyc", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
    Swal.fire({
        icon: "success",
        title: "Verficiacion aprobada con exito",
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
      window.location.href = "https://app.comexpay.co/pages/kyc/kycAdmin"
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
 