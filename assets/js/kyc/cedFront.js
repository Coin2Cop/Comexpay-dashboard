// Ensure DOM elements are available before assigning to constants
// It's good practice to wrap this in a DOMContentLoaded listener or ensure scripts run after HTML is parsed.
let openCameraBtn, cameraContainer, video2, overlay, captureButton, fileInput;
let stream; // To hold the camera stream

// Function to initialize DOM element variables for the front camera script
function initializeFrontCameraDOMElements() {
    openCameraBtn = document.getElementById("open-camera");
    cameraContainer = document.getElementById("camera-capture-container");
    video2 = document.getElementById("video2"); // Assuming this is the video element for the front camera
    overlay = document.getElementById("overlay"); // Assuming this is the overlay for the front camera
    captureButton = document.getElementById("capture-button");
    fileInput = document.getElementById("frontal"); // Input for the front image

    // Add event listeners if elements are found
    if (openCameraBtn) {
        openCameraBtn.addEventListener("click", async () => {
            await showCamera();
        });
    } else {
        console.error("Button 'open-camera' (for front camera) not found.");
    }

    if (captureButton) {
        captureButton.addEventListener("click", async (event) => {
            await capturar(event);
        });
    } else {
        console.error("Button 'capture-button' (for front camera) not found.");
    }
}

// Call initialization when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFrontCameraDOMElements);
} else {
    initializeFrontCameraDOMElements(); // DOMContentLoaded has already fired
}

// This function seems to be a general starting point, ensure 'startCamera' is defined if used.
// async function iniciarFeDeVida() {
//     // await startCamera(); // Make sure startCamera is defined and does what's needed
//     // statusText.textContent = "Por favor, parpadea 5 veces seguidas.";
//     console.log("iniciarFeDeVida called, ensure camera and UI are ready.");
// }

// Función para mostrar la cámara y dibujar el overlay
async function showCamera() {
    if (!cameraContainer || !video2 || !overlay) {
        console.error("One or more camera elements are missing for showCamera (front).");
        return;
    }
    cameraContainer.style.display = "flex";
    try { // Corrected from 'probar'
        const constraints = {
            video: {
                facingMode: { ideal: "environment" }, // Typically "user" for front, "environment" for back
                width: { ideal: 1920 },
                height: { ideal: 1080 },
            },
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video2.srcObject = stream;

        await new Promise(resolve => {
            video2.onloadedmetadata = () => {
                video2.play().then(resolve).catch(err => {
                    console.error("Error playing video2 (front):", err);
                    resolve(); // Resolve anyway to not hang
                });
            };
        });

        if (stream && stream.getVideoTracks().length > 0) {
            const track = stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities?.();
            if (capabilities?.focusMode && capabilities.focusMode.includes("continuous")) {
                try {
                    await track.applyConstraints({
                        advanced: [{ focusMode: "continuous" }],
                    });
                    console.log("Continuous focus applied to front camera.");
                } catch (focusError) {
                    console.warn("Could not apply continuous focus to front camera:", focusError);
                }
            } else { // Corrected from 'más'
                console.log("Focus control is not available on this device (front camera).");
            }
        }
        drawOverlay();
    } catch (error) {
        console.error("Error al acceder a la cámara (front):", error);
        closeCamera();
    }
}

// Función para dibujar el marco de la cédula (overlay)
function drawOverlay() {
    if (!overlay) {
        console.error("Overlay canvas element not found for drawOverlay (front).");
        return;
    }
    const ctx = overlay.getContext("2d");
    overlay.width = overlay.clientWidth > 0 ? overlay.clientWidth : 300;
    overlay.height = overlay.clientHeight > 0 ? overlay.clientHeight : 150;

    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, overlay.width, overlay.height);

    const aspectRatio = 8.5 / 5.5;
    let cardWidth = overlay.width * 0.95;
    let cardHeight = cardWidth / aspectRatio;

    if (cardHeight > overlay.height * 0.95) {
        cardHeight = overlay.height * 0.95;
        cardWidth = cardHeight * aspectRatio;
    }

    const x = (overlay.width - cardWidth) / 2;
    const y = (overlay.height - cardHeight) / 2;

    ctx.clearRect(x, y, cardWidth, cardHeight);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    const cornerRadius = 20;

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + cardWidth - cornerRadius, y);
    ctx.arcTo(x + cardWidth, y, x + cardWidth, y + cornerRadius, cornerRadius);
    ctx.lineTo(x + cardWidth, y + cardHeight - cornerRadius);
    ctx.arcTo(x + cardWidth, y + cardHeight, x + cardWidth - cornerRadius, y + cardHeight, cornerRadius);
    ctx.lineTo(x + cornerRadius, y + cardHeight);
    ctx.arcTo(x, y + cardHeight, x, y + cardHeight - cornerRadius, cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    ctx.closePath();
    ctx.stroke();
}

// Validar si la imagen está borrosa usando varianza del gradiente (Sobel) - PURE JAVASCRIPT
function imagenDesenfocada(canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gray = [];

    for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        const avg = 0.299 * r + 0.587 * g + 0.114 * b;
        gray.push(avg);
    }

    const width = canvas.width;
    const height = canvas.height;
    let sobelTotal = 0;
    let sobelCount = 0;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const gx =
                -gray[idx - width - 1] - 2 * gray[idx - 1] - gray[idx + width - 1] +
                gray[idx - width + 1] + 2 * gray[idx + 1] + gray[idx + width + 1];
            const gy =
                -gray[idx - width - 1] - 2 * gray[idx - width] - gray[idx - width + 1] +
                gray[idx + width - 1] + 2 * gray[idx + width] + gray[idx + width + 1];
            const magnitude = Math.sqrt(gx * gx + gy * gy);
            sobelTotal += magnitude;
            sobelCount++;
        }
    }
    if (sobelCount === 0) return true;
    const mean = sobelTotal / sobelCount;
    const blurThreshold = 15; // Adjustable
    console.log("Sobel mean (blurriness - front):", mean);
    return mean < blurThreshold;
}


// --- Pure JavaScript Image Processing Functions (copied from previous script) ---
function getMeanBrightness(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let sumBrightness = 0;
    const numPixels = data.length / 4;
    if (numPixels === 0) return 128;
    for (let i = 0; i < data.length; i += 4) {
        sumBrightness += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
    return sumBrightness / numPixels;
}

function adjustBrightnessContrast(canvas, alpha, beta) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, data[i] * alpha + beta));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * alpha + beta));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * alpha + beta));
    }
    ctx.putImageData(imageData, 0, 0);
}

function simpleWhiteBalance(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let avgR = 0, avgG = 0, avgB = 0;
    const numPixels = data.length / 4;
    if (numPixels === 0) return;
    for (let i = 0; i < data.length; i += 4) {
        avgR += data[i]; avgG += data[i + 1]; avgB += data[i + 2];
    }
    avgR /= numPixels; avgG /= numPixels; avgB /= numPixels;
    if (avgG === 0 || avgR === 0 || avgB === 0) {
        console.warn("White balance skipped: zero average intensity in a channel.");
        return;
    }
    const scaleR = avgG / avgR; const scaleB = avgG / avgB;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, data[i] * scaleR));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * scaleB));
    }
    ctx.putImageData(imageData, 0, 0);
}

function boxBlur(canvas, kernelSize = 3) {
    if (kernelSize % 2 === 0) { kernelSize++; }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const srcData = new Uint8ClampedArray(imageData.data);
    const dstData = imageData.data;
    const width = canvas.width; const height = canvas.height;
    const halfKernel = Math.floor(kernelSize / 2);
    if (width === 0 || height === 0) return;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0; let count = 0;
            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const pixelY = Math.min(height - 1, Math.max(0, y + ky));
                    const pixelX = Math.min(width - 1, Math.max(0, x + kx));
                    const srcIdx = (pixelY * width + pixelX) * 4;
                    r += srcData[srcIdx]; g += srcData[srcIdx + 1]; b += srcData[srcIdx + 2];
                    count++;
                }
            }
            const dstIdx = (y * width + x) * 4;
            dstData[dstIdx] = r / count; dstData[dstIdx + 1] = g / count; dstData[dstIdx + 2] = b / count;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
// --- End of Pure JavaScript Image Processing Functions ---


// Evento para capturar la imagen y procesarla (NO OpenCV.js)
async function capturar(event) { // Renamed from capturar to avoid conflict if both scripts are on same page
    if (!video2 || !overlay || !fileInput) {
        console.error("One or more elements are missing for capturar (front).");
        return;
    }
    document.activeElement.blur();
    event.preventDefault();

    if (video2.videoWidth === 0 || video2.videoHeight === 0) {
        console.error("Video dimensions are zero for front camera. Cannot capture.");
        return;
    }

    const fullFrameCanvas = document.createElement("canvas");
    fullFrameCanvas.width = video2.videoWidth;
    fullFrameCanvas.height = video2.videoHeight;
    const fullFrameCtx = fullFrameCanvas.getContext("2d");
    fullFrameCtx.drawImage(video2, 0, 0, fullFrameCanvas.width, fullFrameCanvas.height);

    const overlayClientWidth = overlay.clientWidth > 0 ? overlay.clientWidth : video2.clientWidth;
    const overlayClientHeight = overlay.clientHeight > 0 ? overlay.clientHeight : video2.clientHeight;

    const aspectRatio = 8.5 / 5.5;
    let guideWidth = overlayClientWidth * 0.95;
    let guideHeight = guideWidth / aspectRatio;

    if (guideHeight > overlayClientHeight * 0.95) {
        guideHeight = overlayClientHeight * 0.95;
        guideWidth = guideHeight * aspectRatio;
    }
    
    const guideX = (overlayClientWidth - guideWidth) / 2;
    const guideY = (overlayClientHeight - guideHeight) / 2;

    const scaleX = video2.videoWidth / video2.clientWidth;
    const scaleY = video2.videoHeight / video2.clientHeight;

    const cropX = guideX * scaleX;
    const cropY = guideY * scaleY;
    const cropWidth = guideWidth * scaleX;
    const cropHeight = guideHeight * scaleY;

    if (cropWidth <= 0 || cropHeight <= 0) {
        console.error("Calculated crop dimensions are invalid for front camera:", cropWidth, cropHeight);
        return;
    }

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.drawImage(fullFrameCanvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    if (imagenDesenfocada(croppedCanvas)) {
        console.warn("La imagen (frontal) está desenfocada o borrosa. Por favor, vuelve a intentarlo.");
        return; // Stop if blurry
        // return; // Optional: stop if blurry
    }

    // --- Pure JavaScript Image Processing ---
    const brightnessMean = getMeanBrightness(croppedCanvas);
    console.log("Mean Brightness (front):", brightnessMean);

    let alpha = 1.0, beta = 0;
    if (brightnessMean < 80) { alpha = 1.35; beta = 45; }
    else if (brightnessMean > 175) { alpha = 0.85; beta = -35; }
    else { alpha = 1.15; beta = 15; }
    console.log(`Adjusting brightness/contrast (front) with alpha: ${alpha}, beta: ${beta}`);
    adjustBrightnessContrast(croppedCanvas, alpha, beta);

    console.log("Applying white balance (front)...");
    simpleWhiteBalance(croppedCanvas);

    console.log("Applying box blur (front)...");
    boxBlur(croppedCanvas, 3);
    // --- End of Pure JavaScript Image Processing ---

    croppedCanvas.toBlob(blob => {
        if (!blob) {
            console.error("Failed to create blob from canvas (front).");
            return;
        }
        const file = new File([blob], "captured_image_front.png", { type: "image/png" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        
        if (fileInput) {
            fileInput.files = dataTransfer.files;
        } else {
            console.error("fileInput element (frontal) not found.");
        }

        closeCamera(); // Close the front camera

        if (typeof reviFront === 'function') {
            reviFront();
        } else {
            console.warn('reviFront function is not defined.');
        }
    }, "image/png", 0.9); // Added quality parameter, though it's for JPEG mostly
}

function closeCamera() {
    if (cameraContainer) {
        cameraContainer.style.display = "none";
    }
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
    }
    if (video2) {
        video2.srcObject = null;
    }
    console.log("Front camera closed.");
}

// Assuming jQuery ($) is available for this part
function reviFront() {
    if (typeof $ === 'undefined') {
        console.error("jQuery is not loaded. Cannot execute reviFront.");
        return;
    }
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        console.error("No file selected in fileInput (frontal) for reviFront.");
        // Potentially show an error to the user or re-enable capture
        $('#primer_form').hide(); // Or some other UI reset
        $('#primer_formInfo').show();
        $('#block_cedFront').show();
        $('#block_cedFront2').hide();
        return;
    }

    $('#primer_form').show();
    $('#primer_formInfo').hide();
    $('#block_cedFront').hide();
    $('#block_cedFront2').show();
    $('#cedPass2').hide(); // This was in original, ensure its ID is correct and intended
    
    const file = fileInput.files[0];
    const id = getParameterByName("id");

    if (!id) {
        console.error("ID parameter is missing for reviFront.");
        // Handle missing ID, perhaps show an error.
        $('#loadingOverlay').hide(); // Ensure loading overlay is hidden on error
        return;
    }

    const formData = new FormData();
    formData.append('front', file);
    formData.append('idUser', id);
    $('#loadingOverlay').show();

    try {
        // Ensure axios is available
        if (typeof axios === 'undefined') {
            console.error("Axios is not defined. Cannot send KYC data.");
            $('#loadingOverlay').hide();
            return;
        }

        axios.post("https://api.comexpay.co/api/v1/comexpayRoutes/veriFront", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (res) {
            $('#loadingOverlay').hide();
            if (res.data.data == 1) { // Success
                $('#ced_front').attr('style', 'display: none !important');
                $('#ced_trase').attr('style', 'display: flex !important');
            } else if (res.data.data == 0) { // Invalid file
                const $fileInput = $('#frontal'); // jQuery object for Dropify
                if ($fileInput.data('dropify')) {
                    $fileInput.data('dropify').destroy();
                }
                $fileInput.val(''); // Clear the value
                if (typeof $.fn.dropify === 'function') { // Check if dropify is loaded
                    $fileInput.dropify(); // Reinitialize if available
                } else {
                    console.warn("Dropify plugin not available to reinitialize file input.");
                }
                console.warn('El archivo no es válido, por favor sube otro.'); // Replaced alert
                $('#primer_form').hide();
                $('#primer_formInfo').show();
                $('#block_cedFront').show();
                $('#block_cedFront2').hide();
            } else {
                console.log("Unexpected response from veriFront:", res.data);
            }
        }).catch(function (err) {
            $('#loadingOverlay').hide();
            console.error("Error sending front ID data:", err.response ? err.response.data : err.message, err);
            // Inform user about the error
            // e.g., $('#status').text("Error al enviar datos. Intente más tarde.");
        });
    } catch (error) {
        $('#loadingOverlay').hide();
        console.error('Error en el proceso de reviFront:', error);
        // Inform user about the error
        // e.g., $('#status').text("Ocurrió un error al procesar el documento.");
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}