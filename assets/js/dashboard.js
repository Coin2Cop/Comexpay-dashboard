function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
window.onload = function() {
  localStorage.clear();

  const token = getCookie("token");
    let id = ""

    if (token) {
      try {
        // Decodificar el token JWT usando jwt-decode
        const payload = jwt_decode(token);
        console.log('Payload:', payload);
  
        // Obtener el ID del payload
        id = payload.id;
        console.log('User ID:', id);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.log('No se encontró el token en la cookie.');
    }
    console.log(id)
    localStorage.id=id
  
  if(id == null)
    location.href ='https://comexpay.co';
  const formData = new FormData();
  formData.append('idUser', id);
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
      .then(function(res) {
        console.log(res)
        localStorage.name = res.data.data[0].name
        localStorage.lastName = res.data.data[0].lastName
        localStorage.email = res.data.data[0].email
        localStorage.phone = res.data.data[0].phone
        console.log(res.data.data[0])
        /*document.getElementById('personalName1').innerHTML=localStorage.name;
        document.getElementById('email1').innerHTML=localStorage.email;*/
        document.getElementById('personalName2').innerHTML=res.data.data[0].name;

      }).catch(function(err) {
        console.log(err)
      })

  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
    console.log(res)
    if(res.data.data != ""){
      if(res.data.data[0].estCedulaBack == 1 && res.data.data[0].estCedulaFront == 1 && res.data.data[0].estSelfie == 1){
        document.getElementById('cartelKyc').style.display = 'none';
        localStorage.kyc = 1
      }
    }
    else{
      localStorage.kyc = 0
    }

  }).catch(function(err) {
    console.log(err)
  })
  


  const formData2 = new FormData();
  formData2.append('cantidad', 10);
  formData2.append('indice', 0);
  formData2.append('busqueda', "");
  formData2.append('idUser', id);
  const formData3 = new FormData();
  formData3.append('idUser', id);
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/importacionUser", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
      .then(function(res) {
        const formData3 = new FormData();
        formData3.append('idUser', id);
        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/countImporUser", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res2) {
          localStorage.cantidad = res2.data.data;
          //document.getElementById('cant_impor').innerHTML=res2.data.data;
          localStorage.indice = 0
          for(let i = 0; i < res.data.data.length; i++){
              let nombre
              let tabla = document.getElementById("list_importacion")
              let fecha = res.data.data[i].createdAt
              fecha = fecha.slice(0, -14);
              let estado = res.data.data[i].estado
              let tipo = res.data.data[i].tipo
              if(tipo == "1" || tipo == 1){
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].name
                  if(estado == "1"){
                    estado2 = "<span class='badge border border-warning text-warning'>En proceso</span>"
                  }else{
                    if(estado == "2"){
                      estado2 = "<span class='badge border border-danger text-danger'>rechazada</span>"
                    }
                    else{
                      if(estado == "3"){
                        estado2 = "<span class='badge border border-primary text-primary'>Error en documentos</span>"
                      }
                      else{
                        if(estado == "4"){
                          estado2 = "<span class='badge border border-warning text-warning'>Por firmar</span>"
                        }else{
                          estado2 = "<span class='badge border border-success text-success'>aceptada</span>"
                        }
                      }
                    }
                  }
                  if(estado == "4"){
                    tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles2(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado2+"</td></tr>");
                  }else{
                    tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado2+"</td></tr>");
                  }
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })

              }else{

                const formData4 = new FormData();
                formData4.append('id', res.data.data[i].idEmpresa);

                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresaid", formData4, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].razon
                  if(estado == "1"){
                    estado2 = "<span class='badge border border-warning text-warning'>En proceso</span>"
                  }else{
                    if(estado == "2"){
                      estado2 = "<span class='badge border border-danger text-danger'>rechazada</span>"
                    }
                    else{
                      if(estado == "3"){
                        estado2 = "<span class='badge border border-primary text-primary'>Error en documentos</span>"
                      }else{
                        if(estado == "4"){
                          estado2 = "<span class='badge border border-warning text-warning'>Por firmar</span>"
                        }else{
                          estado2 = "<span class='badge border border-success text-success'>aceptada</span>"
                        }
                      }
                    }
                  }
                  if(estado == "4"){
                    tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles2(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado2+"</td></tr>");
                  }else{
                    tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado2+"</td></tr>");
                  }
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })



              }
          }
        }).catch(function(err) {
          console.log(err)
        })
      }).catch(function(err) {
        console.log(err)
      })
};
function pasarKyc(){
  window.location.href = "https://app.comexpay.co/pages/general/empezarKyc"
}
function detalles(id){
  console.log(id)
  localStorage.id_importacion = id
  location.href ='https://app.comexpay.co/pages/importacion/data_importacion';
}
function detalles2(id){
  localStorage.id_importacion = id
  location.href ='https://app.comexpay.co/pages/contratos/contrato?imp='+id;
}
const onScroll = () => {
if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
  // hacer fetch
  let indice = Number(localStorage.indice)
  let cantidad =  localStorage.cantidad
  const id = localStorage.id
  if(indice < cantidad){
    console.log("entro")
    indice = indice + 10
    localStorage.indice = indice
    j = Number(indice)
    const formData2 = new FormData();
    formData2.append('cantidad', 10);
    formData2.append('indice', indice);
    formData2.append('busqueda', "");
    formData2.append('idUser', id);
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/importacionUser", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
      .then(function(res) {
        for(i = 0; i < res.data.data.length; i++){
          j = j + 1
          let tabla = document.getElementById("list_importacion")
          let fecha = res.data.data[i].createdAt
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
          }
          tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+res.data.data[i].name+"</td><td>"+fecha+"</td><td>"+estado+"</td></tr>");
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
  console.log(1)
  const id = localStorage.getItem("id")
  if(id == null)
    location.href ='https://comexpay.co';
  const formData2 = new FormData();
  formData2.append('cantidad', 10);
  formData2.append('indice', 0);
  formData2.append('busqueda', "");
  formData2.append('idUser', id);
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/importacionUser", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
      .then(function(res) {
        const formData3 = new FormData();
        formData3.append('idUser', id);
        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/countImporUser", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res2) {
          let tabla = document.getElementById("list_importacion")
          tabla.innerHTML = "";
          localStorage.cantidad = res2.data.data;
          //document.getElementById('cant_impor').innerHTML=res2.data.data;
          localStorage.indice = 0
          for(let i = 0; i < res.data.data.length; i++){
              let nombre
              let tabla = document.getElementById("list_importacion")
              let fecha = res.data.data[i].createdAt
              fecha = fecha.slice(0, -14);
              let estado = res.data.data[i].estado
              let tipo = res.data.data[i].tipo
              if(tipo == "1" || tipo == 1){
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].name
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
                  }
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado+"</td></tr>");
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })

              }else{

                const formData4 = new FormData();
                formData4.append('id', res.data.data[i].idEmpresa);

                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresaid", formData4, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].razon
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
                  }
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado+"</td></tr>");
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })



              }
          }
        }).catch(function(err) {
          console.log(err)
        })
      }).catch(function(err) {
        console.log(err)
      })
}
else{
  let tabla = document.getElementById("list_importacion")
  tabla.innerHTML = "";
  const id = localStorage.getItem("id")
  if(id == null)
    location.href ='https://comexpay.co';
  const formData = new FormData();
  formData.append('idUser', id);
  const formData2 = new FormData();
  formData2.append('cantidad', 10);
  formData2.append('indice', 0);
  formData2.append('busqueda', info);
  formData2.append('idUser', id);
  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/importacionUser", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
      .then(function(res) {
        let tabla = document.getElementById("list_importacion")
        tabla.innerHTML = "";
        const formData3 = new FormData();
        formData3.append('idUser', id);
        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/countImporUser", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res2) {
          let tabla = document.getElementById("list_importacion")
          tabla.innerHTML = "";
          localStorage.cantidad = res2.data.data;
          //document.getElementById('cant_impor').innerHTML=res2.data.data;
          localStorage.indice = 0
          for(let i = 0; i < res.data.data.length; i++){
              let nombre
              let tabla = document.getElementById("list_importacion")
              let fecha = res.data.data[i].createdAt
              fecha = fecha.slice(0, -14);
              let estado = res.data.data[i].estado
              let tipo = res.data.data[i].tipo
              if(tipo == "1" || tipo == 1){
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].name
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
                  }
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado+"</td></tr>");
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })

              }else{

                const formData4 = new FormData();
                formData4.append('id', res.data.data[i].idEmpresa);

                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresaid", formData4, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  nombre = res3.data.data[0].razon
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
                  }
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td>Importación</td><td>"+nombre+"</td><td>"+fecha+"</td><td>"+estado+"</td></tr>");
                  window.addEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll

                }).catch(function(err) {
                  console.log(err)
                })



              }
          }
        }).catch(function(err) {
          console.log(err)
        })
      }).catch(function(err) {
        console.log(err)
      })
}

}

function crear(){
  const comprobar = localStorage.kyc
  if(comprobar == 0){
    Swal.fire({
      icon: "error",
      title: "Debe completar la verificación de identidad (KYC)",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      location.href ='https://app.comexpay.co/pages/general/empezarKyc';
    })
  }
  else{
    location.href ='https://app.comexpay.co/pages/importacion/importacion.html';
  }
}