window.onload = function() {
    const id = localStorage.getItem("id_importacion")
    console.log(id)
    const formData = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    formData.append('idImpor', id);


    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getimportacion", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res1) {
            if(res1.data.data[0].tipo === 1 || res1.data.data[0].tipo === "1"){
                console.log("primero")
                formData3.append('idUser', res1.data.data[0].idUser);
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                    .then(function(res4) {

                        document.getElementById("nombre").value = res4.data.data[0].nomUser;
                        document.getElementById("nombre2").value = res4.data.data[0].nom2User;
                        document.getElementById("apellido").value = res4.data.data[0].lastNameUser;
                        document.getElementById("apellido2").value = res4.data.data[0].lastName2User;

                        /*document.getElementById("nombre").value = res3.data.data[0].name;
                        document.getElementById("apellido").value = res3.data.data[0].lastName;*/
                        document.getElementById("email").value = res3.data.data[0].email;
                        document.getElementById("telefono").value = res3.data.data[0].phone;
                        var bloq_empresa = document.getElementById("bloq_empresa");
                        bloq_empresa.style.display = "none";

                        /*const camara = document.getElementById("camara")
                        camara.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].camara+"' target='_blank'>"+res2.data.data[0].camara+"</a>");
                        const composicion = document.getElementById("composicion")
                        composicion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].composicion+"' target='_blank'>"+res2.data.data[0].composicion+"</a>");
                        const img_cedula = document.getElementById("img_cedula")
                        img_cedula.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].img_cedula+"' target='_blank'>"+res2.data.data[0].img_cedula+"</a>");
                        const rut = document.getElementById("rut")
                        rut.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].rut+"' target='_blank'>"+res2.data.data[0].rut+"</a>");
                        const declaracion = document.getElementById("declaracion")
                        declaracion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].declaracion+"' target='_blank'>"+res2.data.data[0].declaracion+"</a>");
                        const esta_financieros = document.getElementById("esta_financieros")
                        esta_financieros.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].esta_financieros+"' target='_blank'>"+res2.data.data[0].esta_financieros+"</a>");*/
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
                        fact_profor.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_profor+"' target='_blank'>"+res1.data.data[0].fact_profor+"</a>");
                        const fact_imexfin = document.getElementById("fact_imexfin")
                        fact_imexfin.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_imexfin+"' target='_blank'>"+res1.data.data[0].fact_imexfin+"</a>");

                        console.log(res2)
                    
                        console.log(res1)
                    })

                })
            }
            if(res1.data.data[0].tipo === 2 || res1.data.data[0].tipo === "2"){
                console.log("segundo")
                formData2.append('id', res1.data.data[0].idEmpresa);
                formData3.append('idUser', res1.data.data[0].idUser);
                axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/userById", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(res3) {
                    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/getKycUser", formData3, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                    .then(function(res4) {


                        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/datempresaid", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
                        .then(function(res2) {

                            document.getElementById("nombre").value = res4.data.data[0].nomUser;
                            document.getElementById("nombre2").value = res4.data.data[0].nom2User;
                            document.getElementById("apellido").value = res4.data.data[0].lastNameUser;
                            document.getElementById("apellido2").value = res4.data.data[0].lastName2User;

                            /*document.getElementById("nombre").value = res3.data.data[0].name;
                            document.getElementById("apellido").value = res3.data.data[0].lastName;*/
                            document.getElementById("email").value = res3.data.data[0].email;
                            document.getElementById("telefono").value = res3.data.data[0].phone;
                            const camara = document.getElementById("camara")
                            camara.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].camara+"' target='_blank'>"+res2.data.data[0].camara+"</a>");
                            const composicion = document.getElementById("composicion")
                            composicion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].composicion+"' target='_blank'>"+res2.data.data[0].composicion+"</a>");
                            const img_cedula = document.getElementById("img_cedula")
                            img_cedula.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].img_cedula+"' target='_blank'>"+res2.data.data[0].img_cedula+"</a>");
                            const rut = document.getElementById("rut")
                            rut.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].rut+"' target='_blank'>"+res2.data.data[0].rut+"</a>");
                            const declaracion = document.getElementById("declaracion")
                            declaracion.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].declaracion+"' target='_blank'>"+res2.data.data[0].declaracion+"</a>");
                            const esta_financieros = document.getElementById("esta_financieros")
                            esta_financieros.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res2.data.data[0].esta_financieros+"' target='_blank'>"+res2.data.data[0].esta_financieros+"</a>");
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
                            fact_profor.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_profor+"' target='_blank'>"+res1.data.data[0].fact_profor+"</a>");
                            const fact_imexfin = document.getElementById("fact_imexfin")
                            fact_imexfin.insertAdjacentHTML("beforeend", "<a href='https://api.comexpay.co/recursos/"+res1.data.data[0].fact_imexfin+"' target='_blank'>"+res1.data.data[0].fact_imexfin+"</a>");

                            console.log(res2)
                        }).catch(function(err) {
                            console.log(err)
                        })
                    
                        console.log(res1)
                    })

                })
            }

            


            
        }).catch(function(err) {
            console.log(err)
        })
}