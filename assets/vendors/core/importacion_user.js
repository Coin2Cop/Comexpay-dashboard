window.onload = function() {
    const id = localStorage.getItem("id_importacion")
    console.log(id)
    const formData = new FormData();
    const formData2 = new FormData();
    formData.append('idImpor', id);

    function visible_div(elemento){
        var elemento = document.getElementById(elemento);
        elemento.style.display = 'inline';
     }


    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getimportacion", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res1) {
            if(res1.data.data[0].tipo == 1 || res1.data.data[0].tipo == "1"){
                const formData3 = new FormData();
                formData.append('idUser', localStorage.id);
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                    document.getElementById("nombre").value = res3.data.data[0].nomUser;
                    document.getElementById("nombre2").value = res3.data.data[0].nom2User;
                    document.getElementById("apellido").value = res3.data.data[0].lastNameUser;
                    document.getElementById("apellido2").value = res3.data.data[0].lastName2User;
                    document.getElementById("email").value = localStorage.email;
                    document.getElementById("telefono").value = localStorage.phone;
                    var bloq_empresa = document.getElementById("bloq_empresa");
                    bloq_empresa.style.display = "none";

                    

                    /*const camara = document.getElementById("camara")
                    if(res2.data.data[0].estadCamara == 1){
                        camara.insertAdjacentHTML("beforeend", " <input accept='application/pdf' onchange='documento(\"camara_arc\", \"camara\")' placeholder='Elegir' class='form-control' type='file' name='camara_arc' id='camara_arc'> ");
                        visible_div('comenCamara')
                    }else{
                        camara.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].camara+"' target='_blank'>"+res2.data.data[0].camara+"</a>");
                    }

                    const composicion = document.getElementById("composicion")
                    if(res2.data.data[0].estadCompo == 1){
                        composicion.insertAdjacentHTML("beforeend", " <input accept='application/pdf' onchange='documento(\"composicion_arc\", \"composicion\")' placeholder='Elegir' class='form-control' type='file' name='composicion_arc' id='composicion_arc'> ");
                    }else{
                        composicion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].composicion+"' target='_blank'>"+res2.data.data[0].composicion+"</a>");
                    }

                    const img_cedula = document.getElementById("img_cedula")
                    if(res2.data.data[0].estadCompo == 1){
                        img_cedula.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"cedula_arc\", \"cedula\")' placeholder='Elegir' class='form-control' type='file' name='cedula_arc' id='cedula_arc'>");
                    }else{
                        img_cedula.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].img_cedula+"' target='_blank'>"+res2.data.data[0].img_cedula+"</a>");
                    }

                    const rut = document.getElementById("rut")
                    if(res2.data.data[0].estadCompo == 1){
                        rut.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"rut_arc\", \"rut\")' placeholder='Elegir' class='form-control' type='file' name='rut_arc' id='rut_arc'>");
                    }else{
                        rut.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].rut+"' target='_blank'>"+res2.data.data[0].rut+"</a>");
                    }
                    
                    const declaracion = document.getElementById("declaracion")
                    if(res2.data.data[0].estadCompo == 1){
                        declaracion.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"declaracion_arc\", \"declaracion\")' placeholder='Elegir' class='form-control' type='file' name='declaracion_arc' id='declaracion_arc'>");
                    }else{
                        declaracion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].declaracion+"' target='_blank'>"+res2.data.data[0].declaracion+"</a>");
                    }

                    const esta_financieros = document.getElementById("esta_financieros")
                    if(res2.data.data[0].estadCompo == 1){
                        esta_financieros.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"estados_arc\", \"estados\")' placeholder='Elegir' class='form-control' type='file' name='estados_arc' id='estados_arc'>");
                    }else{
                        esta_financieros.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].esta_financieros+"' target='_blank'>"+res2.data.data[0].esta_financieros+"</a>");
                    }*/
                    
                    document.getElementById("impor_pagada").value = res1.data.data[0].impor_pagada;
                    document.getElementById("descrip_mercan").value = res1.data.data[0].descrip_mercan;
                    document.getElementById("incoterm").value = res1.data.data[0].incoterm;
                    document.getElementById("pais_orig").value = res1.data.data[0].pais_orig;
                    document.getElementById("mod_transporte").value = res1.data.data[0].mod_transporte;
                    document.getElementById("embalaje").value = res1.data.data[0].embalaje;
                    document.getElementById("cantidad").value = res1.data.data[0].cantidad;
                    document.getElementById("largo").value = res1.data.data[0].largo;
                    document.getElementById("ancho").value = res1.data.data[0].ancho;
                    document.getElementById("alto").value = res1.data.data[0].alto;
                    document.getElementById("pBruto").value = res1.data.data[0].peso_bruto;
                    document.getElementById("pNeto").value = res1.data.data[0].peso_neto;
                    document.getElementById("volumen").value = res1.data.data[0].volumen;
                    document.getElementById("oper_aduanero").value = res1.data.data[0].oper_aduanero;
                    document.getElementById("mercan_factur").value = res1.data.data[0].mercan_factur;

                    const fact_profor = document.getElementById("fact_profor")
                    if(res1.data.data[0].estadCompo == 1){
                        fact_profor.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"proforma_arc\", \"proforma\")' placeholder='Elegir' class='form-control' type='file' name='proforma_arc' id='proforma_arc'>");
                    }else{
                        fact_profor.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_profor+"' target='_blank'>"+res1.data.data[0].fact_profor+"</a>");
                    }

                    const fact_imexfin = document.getElementById("fact_imexfin")
                    if(res1.data.data[0].estadCompo == 1){
                        fact_imexfin.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"fac_imexfin_arc\", \"fac_imexfin\")' placeholder='Elegir' class='form-control' type='file' name='fac_imexfin_arc' id='fac_imexfin_arc'>");
                    }else{
                        fact_imexfin.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_imexfin+"' target='_blank'>"+res1.data.data[0].fact_imexfin+"</a>");
                    }

                    console.log(res2)

                })

            }


            formData2.append('id', res1.data.data[0].idEmpresa);
            axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresaid", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res2) {


                    const formData3 = new FormData();
                    formData.append('idUser', localStorage.id);
                    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                    .then(function(res3) {
                        localStorage.setItem("documento", JSON.stringify(res2.data.data[0]));
                        document.getElementById("nombre").value = res3.data.data[0].nomUser;
                        document.getElementById("nombre2").value = res3.data.data[0].nom2User;
                        document.getElementById("apellido").value = res3.data.data[0].lastNameUser;
                        document.getElementById("apellido2").value = res3.data.data[0].lastName2User;
                        document.getElementById("email").value = localStorage.email;
                        document.getElementById("telefono").value = localStorage.phone;

                        const camara = document.getElementById("camara")
                        if(res2.data.data[0].estadCamara == 1){
                            camara.insertAdjacentHTML("beforeend", " <input accept='application/pdf' onchange='documento(\"camara_arc\", \"camara\")' placeholder='Elegir' class='form-control' type='file' name='camara_arc' id='camara_arc'> ");
                            visible_div('comenCamara')
                        }else{
                            camara.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].camara+"' target='_blank'>"+res2.data.data[0].camara+"</a>");
                        }

                        const composicion = document.getElementById("composicion")
                        if(res2.data.data[0].estadCompo == 1){
                            composicion.insertAdjacentHTML("beforeend", " <input accept='application/pdf' onchange='documento(\"composicion_arc\", \"composicion\")' placeholder='Elegir' class='form-control' type='file' name='composicion_arc' id='composicion_arc'> ");
                        }else{
                            composicion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].composicion+"' target='_blank'>"+res2.data.data[0].composicion+"</a>");
                        }

                        const img_cedula = document.getElementById("img_cedula")
                        if(res2.data.data[0].estadCompo == 1){
                            img_cedula.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"cedula_arc\", \"cedula\")' placeholder='Elegir' class='form-control' type='file' name='cedula_arc' id='cedula_arc'>");
                        }else{
                            img_cedula.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].img_cedula+"' target='_blank'>"+res2.data.data[0].img_cedula+"</a>");
                        }

                        const rut = document.getElementById("rut")
                        if(res2.data.data[0].estadCompo == 1){
                            rut.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"rut_arc\", \"rut\")' placeholder='Elegir' class='form-control' type='file' name='rut_arc' id='rut_arc'>");
                        }else{
                            rut.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].rut+"' target='_blank'>"+res2.data.data[0].rut+"</a>");
                        }
                        
                        const declaracion = document.getElementById("declaracion")
                        if(res2.data.data[0].estadCompo == 1){
                            declaracion.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"declaracion_arc\", \"declaracion\")' placeholder='Elegir' class='form-control' type='file' name='declaracion_arc' id='declaracion_arc'>");
                        }else{
                            declaracion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].declaracion+"' target='_blank'>"+res2.data.data[0].declaracion+"</a>");
                        }

                        const esta_financieros = document.getElementById("esta_financieros")
                        if(res2.data.data[0].estadCompo == 1){
                            esta_financieros.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"estados_arc\", \"estados\")' placeholder='Elegir' class='form-control' type='file' name='estados_arc' id='estados_arc'>");
                        }else{
                            esta_financieros.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].esta_financieros+"' target='_blank'>"+res2.data.data[0].esta_financieros+"</a>");
                        }
                        
                        document.getElementById("impor_pagada").value = res1.data.data[0].impor_pagada;
                        document.getElementById("descrip_mercan").value = res1.data.data[0].descrip_mercan;
                        document.getElementById("incoterm").value = res1.data.data[0].incoterm;
                        document.getElementById("pais_orig").value = res1.data.data[0].pais_orig;
                        document.getElementById("mod_transporte").value = res1.data.data[0].mod_transporte;
                        document.getElementById("embalaje").value = res1.data.data[0].embalaje;
                        document.getElementById("cantidad").value = res1.data.data[0].cantidad;
                        document.getElementById("largo").value = res1.data.data[0].largo;
                        document.getElementById("ancho").value = res1.data.data[0].ancho;
                        document.getElementById("alto").value = res1.data.data[0].alto;
                        document.getElementById("pBruto").value = res1.data.data[0].peso_bruto;
                        document.getElementById("pNeto").value = res1.data.data[0].peso_neto;
                        document.getElementById("volumen").value = res1.data.data[0].volumen;
                        document.getElementById("oper_aduanero").value = res1.data.data[0].oper_aduanero;
                        document.getElementById("mercan_factur").value = res1.data.data[0].mercan_factur;

                        const fact_profor = document.getElementById("fact_profor")
                        if(res1.data.data[0].estadCompo == 1){
                            fact_profor.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"proforma_arc\", \"proforma\")' placeholder='Elegir' class='form-control' type='file' name='proforma_arc' id='proforma_arc'>");
                        }else{
                            fact_profor.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_profor+"' target='_blank'>"+res1.data.data[0].fact_profor+"</a>");
                        }

                        const fact_imexfin = document.getElementById("fact_imexfin")
                        if(res1.data.data[0].estadCompo == 1){
                            fact_imexfin.insertAdjacentHTML("beforeend", "<input accept='application/pdf' onchange='documento(\"fac_imexfin_arc\", \"fac_imexfin\")' placeholder='Elegir' class='form-control' type='file' name='fac_imexfin_arc' id='fac_imexfin_arc'>");
                        }else{
                            fact_imexfin.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_imexfin+"' target='_blank'>"+res1.data.data[0].fact_imexfin+"</a>");
                        }

                        console.log(res2)

                    })
                    
                }).catch(function(err) {
                    console.log(err)
                })
            
                console.log(res1)
        }).catch(function(err) {
            console.log(err)
        })
}
function detalle(payload){
    const data = JSON.parse(localStorage.getItem('documento'))
    if(payload == "comenCamara"){
        swal.fire({
            text: data.comenCamara,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "comenRut"){
        swal.fire({
            text: data.comenRut,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "comenCompo"){
        swal.fire({
            text: data.comenCompo,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "comenDecla"){
        swal.fire({
            text: data.comenDecla,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "comenCedula"){
        swal.fire({
            text: data.comenCedula,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "comenFinaci"){
        swal.fire({
            text: data.comenFinaci,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "estadProfor"){
        swal.fire({
            text: data.estadProfor,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
    if(payload == "estadImexfin"){
        swal.fire({
            text: data.estadImexfin,
            confirmButtonText: 'Cerrar',
            confirmButtonClass: 'btn btn-danger',
        })
    }
}

function documento(documento, nombre){
    console.log(documento)
    let archivo = document.querySelector('#'+documento).files[0];
    console.log(archivo)
    const formData = new FormData();
    const idImpor = localStorage.getItem("id_importacion")
    console.log(idImpor)
    console.log(nombre)
    console.log(documento)
    formData.append('idImpor', idImpor);
    formData.append('archivo', nombre);
    formData.append('documento', archivo);

    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/editDocumento", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            Swal.fire({
              icon: "success",
              title: "Documento cargado con exito",
              showConfirmButton: false,
              timer: 1500
              }).then(() => {
                  location.href ='https://app.comexpay.co/pages/importacion/data_importacion';
              })
        }).catch(function(err) {
          console.log(err)
        })


}