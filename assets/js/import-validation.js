$(document).ready(function() {
    $("#importacion").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            apellido: {
                required: true,
                minlength: 3
            },
            telefono: {
                required: true,
                minlength: 3
            },
            camara: {
                required: true,
            },
            composicion: {
                required: true,
            },
            cedula: {
                required: true,
            },
            rut: {
                required: true,
            },
            declaracion: {
                required: true,
            },
            estados: {
                required: true,
            },
            pagado: {
                required: true
            },
            mercancia:{
                required: true,
                minlength: 10
            },
            incoterm:{
                required: true,
                minlength: 3
            },
            pais:{
                required: true
            },
            modalidad:{
                required: true
            },
            embalaje:{
                required: true
            },
            cantidad:{
                required: true
            },
            largo:{
                required: true
            },
            ancho:{
                required: true
            },
            alto:{
                required: true
            },
            pBruto:{
                required: true
            },
            pNeto:{
                required: true
            },
            operador:{
                required: true
            },
            facturada: {
                required: true
            },
            proforma: {
                required: true
            },
            fac_imexfin: {
                required: true
            },
            pagado: {
                required: true,
                pagado: true
            }
        },
        messages: {
            nombre: {
                required: "Por favor escribe el nombre",
                minlength: "el nombre debe contener minimo 3 caracteres"
            },
            email: "escribe un email valido",
            apellido: {
                required: "Por favor escribe el Apellido",
                minlength: "el Apellido debe contener minimo 3 caracteres"
            },
            telefono: {
                required: "Por favor digite el numero de telefono",
                minlength: "el telefono debe contener minimo 3 digitos"
            },
            camara: {
                required: "Este archivo es obligatorio",
            },
            composicion: {
                required: "Este archivo es obligatorio",
            },
            cedula: {
                required: "Este archivo es obligatorio",
            },
            rut: {
                required: "Este archivo es obligatorio",
            },
            declaracion: {
                required: "Este archivo es obligatorio",
            },
            estados: {
                required: "Este archivo es obligatorio",
            },
            pagado: {
                required: "Debe seleccionar si la importación ya fue pagada"
            },
            mercancia: {
                required: "Por favor escribe ela descripcion de la mercancia",
                minlength: "la descripcion debe contener minimo 10 caracteres"
            },
            incoterm: {
                required: "Por favor escribe el incoterm",
                minlength: "el incoterm debe contener minimo 3 caracteres"
            },
            pais: {
                required: "Debe seleccionar un pais de origen"
            },
            modalidad: {
                required: "Debe seleccionar una modalidad"
            },
            embalaje: {
                required: "Debe seleccionar una tipo de embalaje"
            },
            cantidad: {
                required: "Debe indicar la cantidad"
            },
            largo: {
                required: "debe indicar el largo"
            },
            ancho: {
                required: "debe indicar el ancho"
            },
            alto: {
                required: "debe indicar el alto"
            },
            pBruto: {
                required: "debe indicar el peso bruto"
            },
            pNeto: {
                required: "debe indicar el peso neto"
            },
            pNeto: {
                required: "debe indicar el peso neto"
            },
            operador: {
                required: "Debe seleccionar si cuenta con un operador aduanero y logistico"
            },
            facturada: {
                required: "Debe seleccionar si la mercancia esta facturada"
            },
            proforma: {
                required: "Debe cargar la factura proforma"
            },
            fac_imexfin: {
                required: "Debe cargar la factura endosada a imexfin"
            },
        },
    })
})