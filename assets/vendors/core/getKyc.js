window.onload = function() {
    console.log("Bien")
    const id = localStorage.getItem("id")
    if(id == null)
      location.href ='https://comexpay.co';
    const formData = new FormData();
    formData.append('idUser', id);
    axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/kyc/10/0", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            console.log(res)
          axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/countKyc", {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res2) {
            console.log(res2)
            document.getElementById("users").innerHTML = res2.data.data
            localStorage.cantidad = res2.data.data
            localStorage.indice = 0
            console.log(res2.data.data)
            let estCedulaFront
            let estCedulaBack
            let estSelfie
            let estado
            let imagen
            for(i = 0; i < res.data.data.length; i++){
                let tabla = document.getElementById("list_importacion")
                


                if(res.data.data[i].estCedulaFront == 0){
                  estCedulaFront="<i class='mdi mdi-information-outline' style='color: rgb(251, 188, 6); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estCedulaFront == 1){
                  estCedulaFront="<i class='mdi mdi-check-circle-outline' style='color: rgb(81, 244, 0); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estCedulaFront == 2){
                  estCedulaFront="<i class='mdi mdi-close-circle-outline' style='color: rgb(234, 46, 46); font-size: 23px; margin-left: 10px;'></i>"
                  
                }
                
                if(res.data.data[i].estCedulaBack == 0){
                  estCedulaBack="<i class='mdi mdi-information-outline' style='color: rgb(251, 188, 6); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estCedulaBack == 1){
                  estCedulaBack="<i class='mdi mdi-check-circle-outline' style='color: rgb(81, 244, 0); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estCedulaBack == 2){
                  estCedulaBack="<i class='mdi mdi-close-circle-outline' style='color: rgb(234, 46, 46); font-size: 23px; margin-left: 10px;'></i>"
                  
                }

                if(res.data.data[i].estSelfie == 0){
                  estSelfie="<i class='mdi mdi-information-outline' style='color: rgb(251, 188, 6); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estSelfie == 1){
                  estSelfie="<i class='mdi mdi-check-circle-outline' style='color: rgb(81, 244, 0); font-size: 23px; margin-left: 10px;'></i>"
                }
                if(res.data.data[i].estSelfie == 2){
                  estSelfie="<i class='mdi mdi-close-circle-outline' style='color: rgb(234, 46, 46); font-size: 23px; margin-left: 10px;'></i>"
                  
                }
                if(res.data.data[i].estKyc == 2){
                  estado = "<span class='badge border border-warning text-warning'>En proceso</span>"
                }
                if(res.data.data[i].estKyc == 1){
                  estado = "<span class='badge border border-success text-success'>aceptada</span>"
                }
                if(res.data.data[i].estKyc == 0){
                  estado = "<span class='badge border border-danger text-danger'>rechazada</span>"
                }

                if(res.data.data[i].tipo == 0){
                  imagen="<svg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4.08011 6.12C2.58464 6.12 1.36011 7.34453 1.36011 8.83999V25.16C1.36011 26.6555 2.58464 27.88 4.08011 27.88H29.9201C31.4156 27.88 32.6401 26.6555 32.6401 25.16V8.83999C32.6401 7.34453 31.4156 6.12 29.9201 6.12H4.08011ZM4.08011 7.48H29.9201C30.6798 7.48 31.2801 8.08031 31.2801 8.83999V25.16C31.2801 25.9197 30.6798 26.52 29.9201 26.52H4.08011C3.32042 26.52 2.72011 25.9197 2.72011 25.16V8.83999C2.72011 8.08031 3.32042 7.48 4.08011 7.48ZM11.4964 10.2C9.98761 10.2266 8.92245 10.9411 8.50011 11.9425C8.12558 12.835 8.19995 13.8417 8.41511 14.8112C8.40979 14.8192 8.42042 14.8245 8.41511 14.8325C8.29558 15.037 8.18933 15.3398 8.20261 15.7037C8.2212 16.227 8.41511 16.6202 8.62761 16.8725C8.73917 17.0053 8.78698 17.0186 8.88261 17.085C8.99151 17.4223 9.11104 17.765 9.28636 17.9987C9.40323 18.1555 9.53605 18.2298 9.64761 18.3387C9.65558 18.6283 9.66354 18.8966 9.64761 19.1675C9.59183 19.2764 9.49354 19.3933 9.18011 19.55C8.83745 19.7227 8.33808 19.898 7.82011 20.1237C7.30214 20.3495 6.7523 20.6311 6.29011 21.1012C5.82792 21.5714 5.49058 22.2461 5.44011 23.0775C5.42948 23.2661 5.49589 23.4494 5.62339 23.5848C5.75355 23.723 5.93151 23.8 6.12011 23.8H17.0001C17.1887 23.8 17.3667 23.723 17.4968 23.5848C17.6243 23.4494 17.6907 23.2661 17.6801 23.0775C17.6296 22.2461 17.2923 21.5714 16.8301 21.1012C16.3679 20.6311 15.8181 20.3495 15.3001 20.1237C14.7821 19.898 14.2828 19.7227 13.9401 19.55C13.6134 19.3853 13.4992 19.2578 13.4514 19.1462C13.4381 18.8833 13.4646 18.6203 13.4726 18.3387C13.6001 18.2166 13.7621 18.1395 13.8764 17.9775C14.0437 17.7358 14.1446 17.3931 14.2376 17.0637C14.466 16.8937 14.8964 16.5272 14.8964 15.7675C14.8964 15.4487 14.737 15.2548 14.6414 15.0237C14.8007 14.5005 15.0026 13.7195 14.9176 12.8775C14.8698 12.418 14.7423 11.9452 14.4076 11.5387C14.1314 11.2014 13.6692 11.0155 13.1751 10.9437C12.782 10.5134 12.2348 10.2 11.5176 10.2C11.5096 10.2 11.5043 10.2 11.4964 10.2ZM11.5176 11.56C11.5282 11.56 11.5282 11.56 11.5389 11.56C11.9692 11.5706 12.2587 11.8203 12.3039 11.9C12.4234 12.1045 12.6412 12.2347 12.8776 12.24C13.1831 12.24 13.2575 12.3037 13.3451 12.41C13.4328 12.5162 13.5284 12.7314 13.5576 13.0262C13.616 13.6159 13.4354 14.4314 13.3239 14.7687C13.2468 14.9945 13.2946 15.2469 13.4514 15.4275C13.4434 15.4355 13.5364 15.5895 13.5364 15.7675C13.5364 15.8923 13.3239 16.0862 13.3239 16.0862C13.1539 16.1872 13.0396 16.3598 13.0051 16.5537C12.9732 16.7769 12.875 17.0133 12.7501 17.1912C12.6253 17.3692 12.4579 17.5073 12.4951 17.4887C12.2667 17.6003 12.1179 17.8287 12.1126 18.0837C12.1126 18.4822 12.0621 18.87 12.1126 19.4225C12.1206 19.4809 12.1339 19.5367 12.1551 19.5925C12.3782 20.1875 12.875 20.5248 13.3451 20.7612C13.8153 20.9977 14.296 21.1809 14.7476 21.3775C15.1992 21.5741 15.5896 21.7892 15.8526 22.0575C15.9429 22.1505 15.9562 22.3284 16.0226 22.44H7.09761C7.16401 22.3284 7.17729 22.1505 7.26761 22.0575C7.53058 21.7892 7.92104 21.5741 8.37261 21.3775C8.82417 21.1809 9.30495 20.9977 9.77511 20.7612C10.2453 20.5248 10.7446 20.1902 10.9651 19.5925C10.9864 19.5367 10.9996 19.4809 11.0076 19.4225C11.0581 18.8673 11.0076 18.4822 11.0076 18.0837C11.0103 17.8394 10.8801 17.6109 10.6676 17.4887C10.6782 17.4994 10.6729 17.502 10.6464 17.4887C10.6065 17.4516 10.4737 17.3294 10.3701 17.1912C10.224 16.9973 10.0965 16.7344 10.0726 16.5537C10.0381 16.3306 9.89464 16.1394 9.69011 16.0437C9.69011 16.0437 9.71401 16.0544 9.66886 16.0012C9.6237 15.9481 9.57058 15.8658 9.56261 15.64C9.55995 15.5709 9.62636 15.47 9.62636 15.47C9.79636 15.2973 9.86276 15.045 9.79636 14.8112C9.55729 13.8922 9.52542 13.0156 9.75386 12.4737C9.97964 11.9372 10.3807 11.5866 11.5176 11.56ZM19.5926 12.92C19.2181 12.9545 18.9418 13.2892 18.9764 13.6637C19.0109 14.0383 19.3456 14.3145 19.7201 14.28H27.8801C28.1245 14.2827 28.3529 14.1552 28.4778 13.9427C28.5999 13.7302 28.5999 13.4698 28.4778 13.2573C28.3529 13.0448 28.1245 12.9173 27.8801 12.92H19.7201C19.6989 12.92 19.6776 12.92 19.6564 12.92C19.6351 12.92 19.6139 12.92 19.5926 12.92ZM19.5926 16.32C19.2181 16.3545 18.9418 16.6892 18.9764 17.0637C19.0109 17.4383 19.3456 17.7145 19.7201 17.68H27.8801C28.1245 17.6827 28.3529 17.5552 28.4778 17.3427C28.5999 17.1302 28.5999 16.8698 28.4778 16.6573C28.3529 16.4448 28.1245 16.3173 27.8801 16.32H19.7201C19.6989 16.32 19.6776 16.32 19.6564 16.32C19.6351 16.32 19.6139 16.32 19.5926 16.32ZM19.5926 19.72C19.2181 19.7545 18.9418 20.0892 18.9764 20.4637C19.0109 20.8383 19.3456 21.1145 19.7201 21.08H27.8801C28.1245 21.0827 28.3529 20.9552 28.4778 20.7427C28.5999 20.5302 28.5999 20.2698 28.4778 20.0573C28.3529 19.8448 28.1245 19.7173 27.8801 19.72H19.7201C19.6989 19.72 19.6776 19.72 19.6564 19.72C19.6351 19.72 19.6139 19.72 19.5926 19.72Z' fill='black'/></svg>"
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles_ced(\""+res.data.data[i]._id+"\",\""+res.data.data[i].nomCedulaBack+"\",\""+res.data.data[i].nomCedulaFront+"\",\""+res.data.data[i].nomSelfie+"\",\""+res.data.data[i].user[0].name+"\",\""+res.data.data[i].user[0].lastName+"\",\""+res.data.data[i].user[0].email+"\",\""+res.data.data[i].user[0].phone+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+' '+res.data.data[i].user[0].lastName+"</td><td style='text-align: center;'>"+imagen+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                }
                if(res.data.data[i].tipo == 1){
                  imagen="<svg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.12008 0.680054C5.0018 0.680054 4.08008 1.60177 4.08008 2.72005V31.2801C4.08008 32.3983 5.0018 33.3201 6.12008 33.3201H27.8801C28.9984 33.3201 29.9201 32.3983 29.9201 31.2801V2.72005C29.9201 1.60177 28.9984 0.680054 27.8801 0.680054H6.12008ZM6.12008 2.04005H27.8801C28.2573 2.04005 28.5601 2.34287 28.5601 2.72005V31.2801C28.5601 31.6572 28.2573 31.9601 27.8801 31.9601H6.12008C5.74289 31.9601 5.44008 31.6572 5.44008 31.2801V2.72005C5.44008 2.34287 5.74289 2.04005 6.12008 2.04005ZM17.0001 6.12005C12.8882 6.12005 9.52008 9.48818 9.52008 13.6001C9.52008 17.7119 12.8882 21.0801 17.0001 21.0801C21.112 21.0801 24.4801 17.7119 24.4801 13.6001C24.4801 9.48818 21.112 6.12005 17.0001 6.12005ZM16.3201 7.69255V12.9201H14.3226C14.4023 11.4166 14.7157 10.0566 15.1938 9.09505C15.5365 8.40177 15.9323 7.93958 16.3201 7.69255ZM17.6801 7.69255C18.0679 7.93958 18.4637 8.40177 18.8063 9.09505C19.2845 10.0566 19.5979 11.4166 19.6776 12.9201H17.6801V7.69255ZM14.1526 8.1813C14.0941 8.2849 14.0357 8.39115 13.9826 8.50005C13.3876 9.69802 13.021 11.2307 12.9413 12.9201H10.9226C11.1537 10.8694 12.4021 9.10568 14.1526 8.1813ZM19.8476 8.1813C21.598 9.10568 22.8465 10.8694 23.0776 12.9201H21.0588C20.9791 11.2307 20.6126 9.69802 20.0176 8.50005C19.9645 8.39115 19.906 8.2849 19.8476 8.1813ZM10.9226 14.2801H12.9413C13.021 15.9694 13.3876 17.5021 13.9826 18.7001C14.0357 18.809 14.0941 18.9152 14.1526 19.0188C12.4021 18.0944 11.1537 16.3307 10.9226 14.2801ZM14.3226 14.2801H16.3201V19.5076C15.9323 19.2605 15.5365 18.7983 15.1938 18.1051C14.7157 17.1435 14.4023 15.7835 14.3226 14.2801ZM17.6801 14.2801H19.6776C19.5979 15.7835 19.2845 17.1435 18.8063 18.1051C18.4637 18.7983 18.0679 19.2605 17.6801 19.5076V14.2801ZM21.0588 14.2801H23.0776C22.8465 16.3307 21.598 18.0944 19.8476 19.0188C19.906 18.9152 19.9645 18.809 20.0176 18.7001C20.6126 17.5021 20.9791 15.9694 21.0588 14.2801ZM8.71258 25.8401C8.33805 25.8746 8.0618 26.2093 8.09633 26.5838C8.13086 26.9583 8.46555 27.2346 8.84008 27.2001H25.1601C25.4045 27.2027 25.6329 27.0752 25.7577 26.8627C25.8799 26.6502 25.8799 26.3899 25.7577 26.1774C25.6329 25.9649 25.4045 25.8374 25.1601 25.8401H8.84008C8.81883 25.8401 8.79758 25.8401 8.77633 25.8401C8.75508 25.8401 8.73383 25.8401 8.71258 25.8401Z' fill='black'/></svg>"
                  tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles_passp(\""+res.data.data[i]._id+"\",\""+res.data.data[i].nomPasaporte+"\",\""+res.data.data[i].nomSelfie+"\",\""+res.data.data[i].user[0].name+"\",\""+res.data.data[i].user[0].lastName+"\",\""+res.data.data[i].user[0].email+"\",\""+res.data.data[i].user[0].phone+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+' '+res.data.data[i].user[0].lastName+"</td><td style='text-align: center;'>"+imagen+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                }



                //tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+"</td><td style='text-align: center;'>"+estCedulaFront+"</td><td style='text-align: center;'>"+estCedulaBack+"</td><td style='text-align: center;'>"+estSelfie+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                //tabla.insertAdjacentHTML("beforeend", "<tr onclick='detalles(\""+res.data.data[i]._id+"\",\""+res.data.data[i]._id+"\")'><th>"+(Number(i)+Number(1))+"</th><td style='text-align: center;'>"+res.data.data[i].user[0].name+' '+res.data.data[i].user[0].lastName+"</td><td style='text-align: center;'>"+imagen+"</td><td style='text-align: center;'>"+estado+"</td></tr>");
                window.addEventListener('scroll', onScroll2) // llamamos a onScroll cuando el usuario hace scroll
            }
          }).catch(function(err) {
            console.log(err)
          })
        }).catch(function(err) {
          console.log(err)
        })
  };
function detalles(id){
    localStorage.idKyc=id
    window.location.href= "https://app.comexpay.co/pages/kyc/detallesKyc"
}


function detalles_ced(id, imgCedBack, imgCedFront, imgSelfie, name, lastname, email, phone){
  localStorage.idKyc = id;
  document.getElementById("detalles_cedLabel").textContent = name + " " + lastname;
  document.getElementById("nombre").textContent = name;
  document.getElementById("apellido").textContent = lastname;
  document.getElementById("correo").textContent = email;
  document.getElementById("telefono").textContent = phone;
  document.getElementById("img_frontal").src = "https://api.comexpay.co/recursos/"+imgCedFront;
  document.getElementById("img_trasera").src = "https://api.comexpay.co/recursos/"+imgCedBack;
  document.getElementById("img_selfie").src = "https://api.comexpay.co/recursos/"+imgSelfie;
  const detalles_ced = document.querySelector("#detalles_ced");
  const myModal = new bootstrap.Modal(detalles_ced);
  myModal.show();
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
 