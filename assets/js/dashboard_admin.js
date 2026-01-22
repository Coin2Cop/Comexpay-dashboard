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
  window.removeEventListener('scroll', onScroll) // llamamos a onScroll cuando el usuario hace scroll
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
    /*axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          localStorage.name = res.data.data[0].name
          localStorage.lastName = res.data.data[0].lastName
          localStorage.email = res.data.data[0].email
          localStorage.phone = res.data.data[0].phone
          console.log(res.data.data[0])
          document.getElementById('personalName1').innerHTML=res.data.data[0].name;
          document.getElementById('personalName2').innerHTML=res.data.data[0].name;
          document.getElementById('email1').innerHTML=res.data.data[0].email;

        }).catch(function(err) {
          console.log(err)
        })*/
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/importacion/10/0", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countImporAdmin", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            for(let i = 0; i < res.data.data.length; i++){
              const formData3 = new FormData();
                formData3.append('idUser', res.data.data[i].idUser);
              let nombre
              let tabla = document.getElementById("list_importacion")
              let fecha = res.data.data[i].createdAt
              fecha = fecha.slice(0, -14);
              let estado = res.data.data[i].estado
              let tipo = res.data.data[i].tipo
              if(tipo == "1" || tipo == 1){
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                  console.log(res.data.data[0].name)
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
  };
function detalles(id){
    console.log(id)
    localStorage.id_importacion = id
    location.href ='https://app.comexpay.co/pages/importacion/admin_importacion';
}
const onScroll = () => {
  if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    // hacer fetch
    let indice = Number(localStorage.indice)
    let cantidad =  localStorage.cantidad
    if(indice < cantidad){
      console.log("entro")
      indice = indice + 10
      localStorage.indice = indice
      j = Number(indice)
      axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/importacion/10/"+indice, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
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
    let tabla = document.getElementById("list_importacion")
    tabla.innerHTML = "";
    const id = localStorage.getItem("id")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/importacion/10/0", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countImporAdmin", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            for(i = 0; i < res.data.data.length; i++){
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
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/importacion/10/0?busqueda="+info, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countImporAdmin", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            let tabla = document.getElementById("list_importacion")
            tabla.innerHTML = "";
            for(i = 0; i < res.data.data.length; i++){
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