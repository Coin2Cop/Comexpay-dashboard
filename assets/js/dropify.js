// npm package: dropify
// github link: https://github.com/JeremyFagis/dropify

$(function() {
  'use strict';

  $('#myDropify').dropify();
  $('#myDropify2').dropify();
  $('#myDropify3').dropify();
  $('#myDropify4').dropify();
  $('#frontal').dropify({
    messages: {
        'default': 'Toque aquí para agregar imagen frontal',
        'replace': 'Si no estas conforme toca eliminar',
        'remove': 'Eliminar',
        'error': 'Ooops, algo salió mal.'
    }
  });
  $('#trasera').dropify({
    messages: {
        'default': 'Toque aquí para agregar imagen trasera',
        'replace': 'Si no estas conforme toca eliminar',
        'remove': 'Eliminar',
        'error': 'Ooops, algo salió mal.'
    }
  });
  $('#pasaporte').dropify({
    messages: {
        'default': 'Toque aquí para agregar imagen del pasaporte',
        'replace': 'Si no estas conforme toca eliminar',
        'remove': 'Eliminar',
        'error': 'Ooops, algo salió mal.'
    }
  });
  $('#selfie').dropify();

  // Mostrar el botón cuando se carga un archivo
  $('#frontal').on('change', function () {
    setTimeout(() => {
        // Verificar si hay un archivo cargado
        if (this.files && this.files.length > 0) {
            $('#primer_form').show(); // Mostrar el botón
            $('#primer_formInfo').hide();
            $('#block_cedFront').hide();
            $('#block_cedFront2').show();
        }
    }, 100); // Pequeña pausa para asegurar la lectura del archivo
  });

  // Ocultar el botón si el archivo se elimina
  $('#frontal').on('dropify.afterClear', function (event, element) {
      $('#primer_form').hide();
      $('#primer_formInfo').show();
      $('#block_cedFront').show();
      $('#block_cedFront2').hide();
  });

  $('#trasera').on('change', function() {
    // Verificar si hay un archivo cargado
    if (this.files && this.files.length > 0) {
        $('#segun_form').show(); // Mostrar el botón
        $('#segun_formInfo').hide();
        $('#block_cedBack').hide();
        $('#block_cedBack2').show();
    } 
  });

  // Ocultar el botón si el archivo se elimina
  $('#trasera').on('dropify.afterClear', function(event, element) {
    $('#segun_form').hide();
    $('#segun_formInfo').show();
    $('#block_cedBack').show();
    $('#block_cedBack2').hide();
  });

  $('#pasaporte').on('change', function() {
    // Verificar si hay un archivo cargado
    if (this.files && this.files.length > 0) {
        $('#tercer_form').show(); // Mostrar el botón
        $('#tercer_formInfo').hide();
        $('#block_pass').hide();
        $('#block_pass2').show();
    } 
  });

  // Ocultar el botón si el archivo se elimina
  $('#pasaporte').on('dropify.afterClear', function(event, element) {
    $('#tercer_form').hide();
    $('#tercer_formInfo').show();
    $('#block_pass').show();
    $('#block_pass2').hide();
  });








});