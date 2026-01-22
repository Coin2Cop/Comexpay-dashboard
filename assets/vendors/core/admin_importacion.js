function cancel_docu(estado, comentario){
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

    const formData = new FormData
    formData.append('idImpor', idImpor)
    formData.append('titEstado', estado)
    formData.append('estado', 1)
    formData.append('titComen', comenEnviar)
    formData.append('comentario', comentario)
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/negaDocumento", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            const idImpor = localStorage.getItem("id_importacion")
            const formData2 = new FormData();
            formData2.append('idImpor', idImpor);
            formData2.append('estado', 3);
            axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/aproImportacion", formData2, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
            .then(function(res2) {
                Swal.fire({
                    icon: "success",
                    title: "Documento rechazado",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }).catch(function(err){
            console.log(err)
        })

}
function verificar(valor){
    console.log(valor)

    const idImpor = localStorage.getItem("id_importacion")


    const formData = new FormData();
    formData.append('idImpor', idImpor);
    formData.append('estado', valor);
    axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/aproImportacion", formData, {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data'}})
        .then(function(res) {
            if(valor == 0){
                Swal.fire({
                    icon: "success",
                    title: "Importacion aprobada con exito",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.href ='https://app.comexpay.co/dashboardAdmin';
                })
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Importacion Denegada con exito",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    console.log("terminado")
                    location.href ='https://app.comexpay.co/dashboardAdmin';
                })
            }
        }).catch(function(err) {
        if(err.response.status == 401){
            alert("Error")
        }
        })

}

async function documento1() {
  const idImpor = localStorage.getItem("id_importacion");
  if (!idImpor) {
    return Swal.fire({ icon: "error", title: "Falta id_importacion en localStorage" });
  }

  const btn = document.getElementById('Descargar');
  const url = `https://api.comexpay.co/api/v1/comexpayRoutes/importaciones/${encodeURIComponent(idImpor)}/contratos/1/download`;

  try {
    // UI: deshabilitar botón
    btn.disabled = true;
    btn.dataset._old = btn.innerHTML;
    btn.innerHTML = 'Descargando...';

    const resp = await axios.get(url, {
      withCredentials: true,    // ← envía las cookies de sesión
      responseType: 'blob',     // ← recibimos binario (PDF)
      validateStatus: () => true,
      // (opcional) progreso de descarga
      onDownloadProgress: (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          btn.innerHTML = `Descargando… ${pct}%`;
        }
      }
    });

    // Si no fue 200, intentar mostrar mensaje de error del backend
    if (resp.status !== 200) {
      let msg = `Error ${resp.status} al descargar`;
      try {
        const text = await resp.data.text();     // blob -> texto
        const j = JSON.parse(text);
        msg = j?.error || msg;
      } catch (_) {}
      return Swal.fire({ icon: "error", title: "Descarga fallida", text: msg });
    }

    // Nombre por defecto
    let filename = `Contrato-${idImpor}-1.pdf`;

    // Intentar leer Content-Disposition (requiere Expose-Headers en el server)
    const cd = resp.headers?.['content-disposition'] || resp.headers?.['Content-Disposition'];
    if (cd) {
      const m = /filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i.exec(cd);
      const raw = decodeURIComponent((m && (m[1] || m[2] || '')).trim());
      if (raw) filename = raw;
    }

    // Disparar descarga
    const blob = new Blob([resp.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);

  } catch (err) {
    Swal.fire({ icon: "error", title: "Error de red", text: err?.message || "Desconocido" });
  } finally {
    // Restaurar botón
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = btn.dataset._old || 'Descargar';
      delete btn.dataset._old;
    }
  }
}




