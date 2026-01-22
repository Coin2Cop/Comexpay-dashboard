function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function verificar(){
    const codigo = document.getElementById("codigo").value
    var id = getParameterByName('id');
    const formData = new FormData
    formData.append('id', id)
    formData.append('codigo', codigo)

    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/veriNumero", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
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
                title: "Numero verificado con exito, inicie sesión",
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                location.href ='https://app.comexpay.co/dashboard.html';
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

  axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/soliCodCel", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
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