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

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function() {
    const ident = getParameterByName('id');
    localStorage.id= ident
    const formData = new FormData
    formData.append('id', ident)
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/veriEmail", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
    .then(function(res) {
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
}
function continuar(){
    location.href ='https://app.comexpay.co/pages/verificacion/verificarNum';
}*/
function continuar(){
  /*const token = getCookie("token");

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
  }*/


  const codigo = document.getElementById("codigo").value
  const formData = new FormData
  var id = getParameterByName('id');
  formData.append('id', id)
  formData.append('codigo', codigo)

  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/veriEmail", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
      if(res.data.data.phoneVerifi == undefined){
          Swal.fire({
              icon: "error",
              title: "Error en el codigo",
              showConfirmButton: false,
              timer: 1500
          })
      }else{
          Swal.fire({
              icon: "success",
              title: "Correo verificado con exito",
              showConfirmButton: false,
              timer: 2000
          }).then(() => {
              location.href ='https://app.comexpay.co/pages/verificacion/verificarNum?id='+id;
          })
      }
  }).catch(function(err){
      console.log(err)
  })
}

function solicitar(){
  const COOLDOWN_SECONDS = 60;
  let cooldownInterval = null;
  let isOnCooldown = false;
  const formData = new FormData
  var id = getParameterByName('id');
  formData.append('id', id)

  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/soliCodEmail", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
  .then(function(res) {
    const resendBtn = document.getElementById('reenviar');
    let remaining = COOLDOWN_SECONDS;
    isOnCooldown = true;
    resendBtn.disabled = true;
    resendBtn.classList.remove('btn-inverse-success');
    resendBtn.classList.add('btn-secondary');
    resendBtn.textContent = `Reenviar código (${remaining}s)`;
    cooldownInterval = setInterval(() => {
      remaining--;

      if (remaining <= 0) {
        clearInterval(cooldownInterval);
        cooldownInterval = null;
        isOnCooldown = false;
        resendBtn.classList.remove('btn-secondary');
        resendBtn.classList.add('btn-inverse-success');
        resendBtn.disabled = false;
        resendBtn.textContent = 'Reenviar código';
      } else {
        resendBtn.textContent = `Reenviar código (${remaining}s)`;
      }
    }, 1000);

  }).catch(function(err){
      console.log(err)
      alert(err)
  })
}