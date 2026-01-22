// npm package: jquery-steps
// github link: https://github.com/rstaib/jquery-steps/

$(function() {
  $.validator.addMethod("pagado", function(value, element) {
    // lógica de validación: true si es válido, false si no
    return value !== '1';  // por ejemplo: no permitir que sea '1'
}, "Solo podemos ayudarte si no has pagado tu importación");
  



  'use strict';

  $("#wizard").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "slideLeft"
  });

  $("#importacion").steps({
    headerTag: "h2",
    bodyTag: "section",
    saveState: "true",
    transitionEffect: "slideLeft",
    labels: {
      next: "Siguiente",
      previous: "Volver",
      finish: "Enviar"
    },
    onStepChanging: function (event, currentIndex, newIndex)
    {
      if ($("#pagado").val() === '1') {
              Swal.fire({
                icon: "error",
                title: "Solo podemos ayudarte si no has pagado tu importación",
                showConfirmButton: false,
                timer: 2500
              })
            }
      $("#importacion").validate().settings.ignore = ":disabled,:hidden";
      return $("#importacion").valid();
    },
    onFinishing: function (event, currentIndex)
    {
      console.log("Prueba")
        $("#importacion").validate().settings.ignore = ":disabled";
        return $("#importacion").valid();
    },
    onFinished: function (event, currentIndex)
    {
      console.log("Bien")
      const id = localStorage.getItem("id")
      let tipo
      let idEmpresa
      const formData = new FormData();
      if(document.getElementById("origen").value == 1 || document.getElementById("origen").value == "1"){
        tipo = 1
      }else{
        tipo = 2
        idEmpresa = document.getElementById("origen").value
        formData.append('idEmpresa', idEmpresa);
      }
      const impor_pagada = document.getElementById("pagado").value;
      const pais_orig = document.getElementById("pais").value;
      const descrip_mercan = document.getElementById("mercancia").value;
      const mod_transporte = document.getElementById("modalidad").value;
      const incoterm = document.getElementById("incoterm").value;
      const cantidad = document.getElementById("cantidad").value;
      const largo = document.getElementById("largo").value;
      const ancho = document.getElementById("ancho").value;
      const alto = document.getElementById("alto").value;
      const pBruto = document.getElementById("pBruto").value;
      const pNeto = document.getElementById("pNeto").value;
      const volumen = document.getElementById("volumen").value;


      const oper_aduanero = document.getElementById("operador").value;
      let fact_profor = document.querySelector("#proforma").files[0];
      const mercan_factur = document.getElementById("facturada").value;
      let fact_imexfin = document.querySelector("#fac_imexfin").files[0];

      const formData2 = new FormData();
      formData.append('idUser', id);
      //formData2.append('idUser', id);
      formData.append('tipo', tipo)
      formData.append('impor_pagada', impor_pagada);
      formData.append('pais_orig', pais_orig);
      formData.append('descrip_mercan', descrip_mercan);
      formData.append('mod_transporte', mod_transporte);
      formData.append('incoterm', incoterm);
      formData.append('embalaje', embalaje);
      formData.append('cantidad', cantidad);
      formData.append('largo', largo);
      formData.append('ancho', ancho);
      formData.append('alto', alto);
      formData.append('pBruto', pBruto);
      formData.append('pNeto', pNeto);
      formData.append('volumen', volumen);
      formData.append('oper_aduanero', oper_aduanero);
      formData.append('fact_profor', fact_profor);
      formData.append('mercan_factur', mercan_factur);
      formData.append('fact_imexfin', fact_imexfin);


      axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/importacion", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
          //console.log(res.data.signing.signingUrl)
          localStorage.contrato1=res.data.signing.signingUrl
          Swal.fire({
            icon: "success",
            title: "Importacion creada con exito, continua con los contratos",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              location.href ='https://app.comexpay.co/pages/contratos/contrato?imp='+res.data.data._id;
          })
          }).catch(function(err){

          })



          /*formData2.append('idImport', res.data.data._id);
          axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/documento", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
          .then(function(res) {
            Swal.fire({
              icon: "success",
              title: "Importacion creada con exito",
              showConfirmButton: false,
              timer: 1500
              }).then(() => {
                  location.href ='https://app.comexpay.co/dashboard';
              })

          }).catch(function(err){

          })

        }).catch(function(err) {
          console.log(err)
        })*/
    },
  })

  $("#data_importacion").steps({
    headerTag: "h2",
    bodyTag: "section",
    saveState: "true",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex)
    {
      $("#data_importacion").validate().settings.ignore = ":disabled,:hidden";
      return $("#data_importacion").valid();
    },
    onFinishing: function (event, currentIndex)
    {
      console.log("Prueba")
        $("#data_importacion").validate().settings.ignore = ":disabled";
        return $("#data_importacion").valid();
    },
    onFinished: function (event, currentIndex)
    {
      location.href ='https://app.comexpay.co/dashboard';
    },
  })
});