window.onload = function() {
    idKyc = localStorage.idKyc
    const formData = new FormData
    formData.append('idKyc', idKyc)
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKyc", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            document.getElementById('nombre').innerHTML=res.data.data[0].user[0].name;
            document.getElementById('apellido').innerHTML=res.data.data[0].user[0].lastName;
            document.getElementById('telefono').innerHTML=res.data.data[0].user[0].phone;
            document.getElementById('email').innerHTML=res.data.data[0].user[0].email;
            document.getElementById("frontal").src="https://api.comexpay.co/recursos/"+res.data.data[0].nomCedulaFront;
            document.getElementById("trasero").src="https://api.comexpay.co/recursos/"+res.data.data[0].nomCedulaBack;
            document.getElementById("selfie").src="https://api.comexpay.co/recursos/"+res.data.data[0].nomSelfie;
            if(res.data.data[0].estCedulaFront == 2){
                document.querySelector("#rechazo1").style.display = 'none';
                document.querySelector("#rechazado1").style.display = 'block';
                document.querySelector("#aprobado").style.display = 'none';
            }
            if(res.data.data[0].estCedulaBack == 2){
                document.querySelector("#rechazo2").style.display = 'none';
                document.querySelector("#rechazado2").style.display = 'block';
                document.querySelector("#aprobado").style.display = 'none';
            }
            if(res.data.data[0].estSelfie == 2){
                document.querySelector("#rechazo3").style.display = 'none';
                document.querySelector("#rechazado3").style.display = 'block';
                //document.querySelector("#aprobado").style.display = 'none';
            }

            if(res.data.data[0].estCedulaFront == 1){
                document.querySelector("#rechazo1").style.display = 'none';
                document.querySelector("#rechazado1").style.display = 'none';
                document.querySelector("#aprobado").style.display = 'none';
            }
            if(res.data.data[0].estCedulaBack == 1){
                document.querySelector("#rechazo2").style.display = 'none';
                document.querySelector("#rechazado2").style.display = 'none';
                document.querySelector("#aprobado").style.display = 'none';
            }
            if(res.data.data[0].estSelfie == 1){
                document.querySelector("#rechazo3").style.display = 'none';
                document.querySelector("#rechazado3").style.display = 'none';
                //document.querySelector("#aprobado").style.display = 'none';
            }


            console.log(res.data.data[0])

        }).catch(function(err){
            console.log(err)
        })
};
function cancel_img(estado, comentario){
    console.log(estado)
    console.log(comentario)
    localStorage.setItem("estado", estado)
    localStorage.setItem("comentario", comentario)
    const comentarioModal = document.querySelector("#comentario");
    const myModal = new bootstrap.Modal(comentarioModal);
    myModal.show();
}

function guardar_comen(){
    const comentario = document.getElementById("comentarioFinal").value
    const comenEnviar = localStorage.getItem('comentario')
    const estado = localStorage.getItem('estado')
    const idImpor = localStorage.getItem("id_importacion")
    idKyc = localStorage.idKyc

    const formData = new FormData
    formData.append('idKyc', idKyc)
    formData.append('titEstado', estado)
    formData.append('comentario', comentario)

    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/negaKyc", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            Swal.fire({
                icon: "success",
                title: "Documento rechazado",
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                window.location.href = "https://app.comexpay.co/pages/kyc/kycAdmin"

            })
        }).catch(function(err){
            console.log(err)
        })

}

function verificar(){
    idKyc = localStorage.idKyc
    const formData = new FormData
    formData.append('idKyc', idKyc)
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/aproKyc", formData, {headers: { 'Content-Type': 'multipart/form-data'}})
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

