  const openCameraPasspBtn = document.getElementById("fileButton3");
  const cameraContainerPassp = document.getElementById("camera-capture-container-passp");
  const videoPassp = document.getElementById("video-passp");
  const overlayPassp = document.getElementById("overlay-passp");
  const captureButtonPassp = document.getElementById("capture-button-passp");
  const fileInputPassp = document.getElementById("pasaporte");

  let streamPassp;

  // Mostrar la cámara trasera
  openCameraPasspBtn.addEventListener("click", async () => {
      showCameraPassp();
  });

  async function showCameraPassp() {
    cameraContainerPassp.style.display = "flex";
    try {
        // Solicitar acceso a la cámara trasera con restricciones (ideal: 1920x1080 se puede agregar si se desea)
        streamPassp = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: { ideal: "environment" },
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
        });
        videoPassp.srcObject = streamPassp;

        // (Opcional) Intentar aplicar enfoque continuo si el dispositivo lo soporta
        const [track] = streamPassp.getVideoTracks();
        const capabilities = track.getCapabilities();
        if (capabilities.focusMode && capabilities.focusMode.includes("continuous")) {
            await track.applyConstraints({
                advanced: [{ focusMode: "continuous" }]
            });
            console.log("Enfoque continuo aplicado.");
        } else {
            console.log("El control de enfoque no está disponible en este dispositivo.");
        }

        drawOverlayPassp();
    } catch (error) {
        console.error("Error al acceder a la cámara trasera:", error);
        closeCameraPassp();
    }
}

// Función para dibujar el marco de la cédula (overlay) para pasaporte
function drawOverlayPassp() {
    const ctx = overlayPassp.getContext("2d");
    overlayPassp.width = overlayPassp.clientWidth;
    overlayPassp.height = overlayPassp.clientHeight;

    ctx.clearRect(0, 0, overlayPassp.width, overlayPassp.height);

    // Fondo oscuro
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, overlayPassp.width, overlayPassp.height);

    // Relación de aspecto de la cédula (8.5:5.5)
    const aspectRatio = 8.5 / 5.5;
    const cardWidth = overlayPassp.width;
    const cardHeight = cardWidth / aspectRatio;
    const x = 0;
    const y = Math.max((overlayPassp.height - cardHeight) / 2, 0);

    // Limpiar el área del recorte
    ctx.clearRect(x, y, cardWidth, cardHeight);

    // Dibujar bordes redondeados
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.arcTo(x + cardWidth, y, x + cardWidth, y + cardHeight, 20);
    ctx.arcTo(x + cardWidth, y + cardHeight, x, y + cardHeight, 20);
    ctx.arcTo(x, y + cardHeight, x, y, 20);
    ctx.arcTo(x, y, x + cardWidth, y, 20);
    ctx.closePath();
    ctx.stroke();
}

function capturar3(event) {
    document.activeElement.blur();
    event.preventDefault();
  
    const canvas = document.createElement("canvas");
    canvas.width = videoPassp.videoWidth;
    canvas.height = videoPassp.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoPassp, 0, 0, canvas.width, canvas.height);
  
    const overlayWidth = overlayPassp.clientWidth;
    const aspectRatio = 8.5 / 5.5;
    const cardHeight = overlayWidth / aspectRatio;
    const clearX = 0;
    const clearY = Math.max((overlayPassp.clientHeight - cardHeight) / 2, 0);
  
    const videoRect = videoPassp.getBoundingClientRect();
    const overlayRect = overlayPassp.getBoundingClientRect();
  
    const scaleX = canvas.width / videoRect.width;
    const scaleY = canvas.height / videoRect.height;
  
    const cropX = (overlayRect.left - videoRect.left + clearX) * scaleX;
    const cropY = (overlayRect.top - videoRect.top + clearY) * scaleY;
    const cropWidth = overlayWidth * scaleX;
    const cropHeight = cardHeight * scaleY;
  
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  
    if (imagenDesenfocada(croppedCanvas)) {
      alert("La imagen está desenfocada o borrosa. Por favor, vuelve a intentarlo.");
      return;
    }
  
    // Procesamiento con OpenCV.js
    let src = cv.imread(croppedCanvas);
    let dst = new cv.Mat();
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  
    let meanScalar = cv.mean(gray);
    gray.delete();
    let brightnessMean = meanScalar[0];
  
    let alpha = 1.0, beta = 0;
    if (brightnessMean < 90) {
      alpha = 1.3; beta = 40;
    } else if (brightnessMean > 170) {
      alpha = 0.9; beta = -40;
    } else {
      alpha = 1.1; beta = 10;
    }
  
    cv.convertScaleAbs(src, dst, alpha, beta);
    src.delete();
  
    let mean = cv.mean(dst);
    let avgG = mean[1];
    let balanced = new cv.Mat();
    let channels = new cv.MatVector();
    cv.split(dst, channels);
    for (let i = 0; i < 3; i++) {
      let scale = avgG / mean[i];
      cv.convertScaleAbs(channels.get(i), channels.get(i), scale, 0);
    }
    cv.merge(channels, balanced);
    channels.delete();
    dst.delete();
  
    let final = new cv.Mat();
    cv.GaussianBlur(balanced, final, new cv.Size(3, 3), 0);
    balanced.delete();
  
    cv.imshow(croppedCanvas, final);
    final.delete();
  
    croppedCanvas.toBlob(blob => {
      const file = new File([blob], "passport_image.png", { type: "image/png" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputPassp.files = dataTransfer.files;
      closeCameraPassp();
    }, "image/png", 0.9);
  }
  


  function closeCameraPassp() {
      cameraContainerPassp.style.display = "none";
      if (streamPassp) {
          streamPassp.getTracks().forEach((track) => track.stop());
      }
      videoPassp.srcObject = null;
  }