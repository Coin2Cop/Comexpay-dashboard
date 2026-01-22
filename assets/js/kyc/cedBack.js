// Ensure DOM elements are available before assigning to constants
// It's good practice to wrap this in a DOMContentLoaded listener or ensure scripts run after HTML is parsed.
let openCameraBackBtn, cameraContainerBack, videoBack, overlayBack, captureButtonBack, fileInputBack;
let streamBack; // To hold the camera stream

// Function to initialize DOM element variables
function initializeDOMElements() {
    openCameraBackBtn = document.getElementById("open-camera-back");
    cameraContainerBack = document.getElementById("camera-capture-container-back");
    videoBack = document.getElementById("video-back");
    overlayBack = document.getElementById("overlay-back");
    captureButtonBack = document.getElementById("capture-button-back");
    fileInputBack = document.getElementById("trasera");

    // Add event listeners if elements are found
    if (openCameraBackBtn) {
        openCameraBackBtn.addEventListener("click", async () => {
            await showCameraBack();
        });
    } else {
        console.error("Button 'open-camera-back' not found.");
    }
    
    if (captureButtonBack) {
        captureButtonBack.addEventListener("click", async (event) => {
             await capturar2(event);
        });
    } else {
        console.error("Button 'capture-button-back' not found.");
    }
}

// Call initialization when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDOMElements);
} else {
    initializeDOMElements(); // DOMContentLoaded has already fired
}


// Mostrar cámara trasera y activar enfoque continuo
async function showCameraBack() {
    if (!cameraContainerBack || !videoBack || !overlayBack) {
        console.error("One or more camera elements are missing for showCameraBack.");
        return;
    }
    cameraContainerBack.style.display = "flex";
    try {
        streamBack = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                // Note: 'advanced' constraints might not be universally supported.
                // It's safer to apply them after getting the track if possible.
            }
        });

        videoBack.srcObject = streamBack;

        await new Promise(resolve => {
            videoBack.onloadedmetadata = () => {
                videoBack.play().then(resolve).catch(err => {
                    console.error("Error playing video:", err);
                    resolve(); // Resolve anyway to not hang
                });
            };
        });

        // Attempt to apply continuous focus after stream is active
        if (streamBack && streamBack.getVideoTracks().length > 0) {
            const track = streamBack.getVideoTracks()[0];
            const capabilities = track.getCapabilities?.();
            if (capabilities?.focusMode && capabilities.focusMode.includes("continuous")) {
                try {
                    await track.applyConstraints({
                        advanced: [{ focusMode: "continuous" }]
                    });
                    console.log("Continuous focus applied.");
                } catch (focusError) {
                    console.warn("Could not apply continuous focus:", focusError);
                }
            } else {
                console.warn("Continuous focus not supported by this track/device.");
            }
        }

        drawOverlayBack();
    } catch (error) {
        console.error("Error al acceder a la cámara trasera:", error);
        closeCameraBack();
    }
}

// Dibuja el marco de recorte
function drawOverlayBack() {
    if (!overlayBack) {
        console.error("Overlay canvas element not found for drawOverlayBack.");
        return;
    }
    const ctx = overlayBack.getContext("2d");
    // Ensure clientWidth/Height are positive before setting canvas dimensions
    overlayBack.width = overlayBack.clientWidth > 0 ? overlayBack.clientWidth : 300; // Default if 0
    overlayBack.height = overlayBack.clientHeight > 0 ? overlayBack.clientHeight : 150; // Default if 0


    ctx.clearRect(0, 0, overlayBack.width, overlayBack.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, overlayBack.width, overlayBack.height);

    const aspectRatio = 8.5 / 5.5; // Standard ID card aspect ratio
    // Calculate card dimensions based on overlay width, ensuring it fits height-wise
    let cardWidth = overlayBack.width * 0.95; // Use 95% of width for some padding
    let cardHeight = cardWidth / aspectRatio;

    if (cardHeight > overlayBack.height * 0.95) { // If calculated height is too much
        cardHeight = overlayBack.height * 0.95;
        cardWidth = cardHeight * aspectRatio;
    }
    
    const x = (overlayBack.width - cardWidth) / 2;
    const y = (overlayBack.height - cardHeight) / 2;

    ctx.clearRect(x, y, cardWidth, cardHeight);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    const cornerRadius = 20; // Rounded corners for the guide

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


// Validación de nitidez con Sobel (Pure JavaScript)
function imagenDesenfocada(canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gray = []; // Grayscale image data

    // Convert to grayscale (luminance)
    for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        const avg = 0.299 * r + 0.587 * g + 0.114 * b; // Standard luminance calculation
        gray.push(avg);
    }

    const width = canvas.width;
    const height = canvas.height;
    let sobelTotal = 0;
    let sobelCount = 0;

    // Apply Sobel operator
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            // Sobel X
            const gx =
                -gray[idx - width - 1] - 2 * gray[idx - 1] - gray[idx + width - 1] +
                 gray[idx - width + 1] + 2 * gray[idx + 1] + gray[idx + width + 1];
            // Sobel Y
            const gy =
                -gray[idx - width - 1] - 2 * gray[idx - width] - gray[idx - width + 1] +
                 gray[idx + width - 1] + 2 * gray[idx + width] + gray[idx + width + 1];

            const magnitude = Math.sqrt(gx * gx + gy * gy);
            sobelTotal += magnitude;
            sobelCount++;
        }
    }
    if (sobelCount === 0) return true; // Avoid division by zero, assume blurry if no pixels processed
    const mean = sobelTotal / sobelCount;
    const blurThreshold = 15; // Adjustable threshold
    console.log("Sobel mean (blurriness):", mean);
    return mean < blurThreshold;
}

// --- Pure JavaScript Image Processing Functions ---

// Calculates the mean brightness of a canvas image
function getMeanBrightness(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let sumBrightness = 0;
    const numPixels = data.length / 4;

    if (numPixels === 0) return 128; // Default brightness for empty image

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b; // Luminance
        sumBrightness += brightness;
    }
    return sumBrightness / numPixels;
}

// Adjusts brightness and contrast of a canvas image
function adjustBrightnessContrast(canvas, alpha, beta) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, data[i] * alpha + beta));         // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * alpha + beta)); // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * alpha + beta)); // Blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// Simple white balance based on scaling R and B channels relative to G's average
function simpleWhiteBalance(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let avgR = 0, avgG = 0, avgB = 0;
    const numPixels = data.length / 4;

    if (numPixels === 0) return;

    for (let i = 0; i < data.length; i += 4) {
        avgR += data[i];
        avgG += data[i + 1];
        avgB += data[i + 2];
    }
    avgR /= numPixels;
    avgG /= numPixels;
    avgB /= numPixels;

    if (avgG === 0 || avgR === 0 || avgB === 0) { // Avoid division by zero if any channel is completely black
        console.warn("White balance skipped: one or more color channels have zero average intensity.");
        return;
    }

    const scaleR = avgG / avgR;
    const scaleB = avgG / avgB;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, data[i] * scaleR));     // Red
        // Green channel (data[i+1]) is the reference, so it's not scaled relative to itself
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * scaleB)); // Blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// Simple 3x3 box blur
function boxBlur(canvas, kernelSize = 3) {
    if (kernelSize % 2 === 0) {
        console.warn("Kernel size for box blur should be odd. Adjusting to " + (kernelSize + 1));
        kernelSize++;
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const srcData = new Uint8ClampedArray(imageData.data); // Work on a copy
    const dstData = imageData.data; // Modify in place
    const width = canvas.width;
    const height = canvas.height;
    const halfKernel = Math.floor(kernelSize / 2);

    if (width === 0 || height === 0) return;


    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            let count = 0;
            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const pixelY = Math.min(height - 1, Math.max(0, y + ky));
                    const pixelX = Math.min(width - 1, Math.max(0, x + kx));
                    const srcIdx = (pixelY * width + pixelX) * 4;
                    
                    r += srcData[srcIdx];
                    g += srcData[srcIdx + 1];
                    b += srcData[srcIdx + 2];
                    // Alpha (srcData[srcIdx + 3]) is usually kept or handled separately
                    count++;
                }
            }
            const dstIdx = (y * width + x) * 4;
            dstData[dstIdx] = r / count;
            dstData[dstIdx + 1] = g / count;
            dstData[dstIdx + 2] = b / count;
            // dstData[dstIdx + 3] remains unchanged (original alpha)
        }
    }
    ctx.putImageData(imageData, 0, 0);
}


// Capturar imagen trasera
async function capturar2(event) {
    if (!videoBack || !overlayBack || !fileInputBack) {
        console.error("One or more elements are missing for capturar2.");
        return;
    }
    document.activeElement.blur(); // Remove focus from any element
    event.preventDefault();

    // Ensure video has dimensions
    if (videoBack.videoWidth === 0 || videoBack.videoHeight === 0) {
        console.error("Video dimensions are zero. Cannot capture.");
        return;
    }

    // Create a canvas to draw the current video frame
    const fullFrameCanvas = document.createElement("canvas");
    fullFrameCanvas.width = videoBack.videoWidth;
    fullFrameCanvas.height = videoBack.videoHeight;
    const fullFrameCtx = fullFrameCanvas.getContext("2d");
    fullFrameCtx.drawImage(videoBack, 0, 0, fullFrameCanvas.width, fullFrameCanvas.height);

    // Define cropping region based on overlay guide
    // Ensure overlay dimensions are positive
    const overlayClientWidth = overlayBack.clientWidth > 0 ? overlayBack.clientWidth : videoBack.clientWidth;
    const overlayClientHeight = overlayBack.clientHeight > 0 ? overlayBack.clientHeight : videoBack.clientHeight;
    
    const aspectRatio = 8.5 / 5.5;
    let guideWidth = overlayClientWidth * 0.95;
    let guideHeight = guideWidth / aspectRatio;

    if (guideHeight > overlayClientHeight * 0.95) {
        guideHeight = overlayClientHeight * 0.95;
        guideWidth = guideHeight * aspectRatio;
    }
    
    const guideX = (overlayClientWidth - guideWidth) / 2;
    const guideY = (overlayClientHeight - guideHeight) / 2;

    // Scale factors from video element size to video intrinsic size
    const scaleX = videoBack.videoWidth / videoBack.clientWidth;
    const scaleY = videoBack.videoHeight / videoBack.clientHeight;

    // Calculate crop coordinates on the full video frame
    const cropX = guideX * scaleX;
    const cropY = guideY * scaleY;
    const cropWidth = guideWidth * scaleX;
    const cropHeight = guideHeight * scaleY;
    
    if (cropWidth <= 0 || cropHeight <= 0) {
        console.error("Calculated crop dimensions are invalid:", cropWidth, cropHeight);
        return;
    }

    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedCtx = croppedCanvas.getContext("2d");

    // Draw the cropped portion from the full frame canvas to the new cropped canvas
    croppedCtx.drawImage(
        fullFrameCanvas, // source canvas
        cropX, cropY, cropWidth, cropHeight, // source x, y, width, height
        0, 0, cropWidth, cropHeight // destination x, y, width, height
    );

    // Validate focus (sharpness)
    if (imagenDesenfocada(croppedCanvas)) {
        // Replaced alert with console.warn as per instructions
        console.warn("La imagen está desenfocada o borrosa. Por favor, vuelve a intentarlo.");
        return
        // Original code had a commented-out return here.
        // Depending on desired behavior, you might want to stop processing:
        // return; 
    }

    // --- Image Processing Steps (Pure JavaScript) ---
    
    // 1. Calculate mean brightness of the cropped image
    const brightnessMean = getMeanBrightness(croppedCanvas);
    console.log("Mean Brightness:", brightnessMean);

    // 2. Dynamically adjust brightness and contrast
    let alpha = 1.0; // Contrast factor
    let beta = 0;    // Brightness offset
    if (brightnessMean < 80) { // Slightly adjusted thresholds
        alpha = 1.35; beta = 45;
    } else if (brightnessMean > 175) { // Slightly adjusted thresholds
        alpha = 0.85; beta = -35;
    } else {
        alpha = 1.15; beta = 15;
    }
    console.log(`Adjusting brightness/contrast with alpha: ${alpha}, beta: ${beta}`);
    adjustBrightnessContrast(croppedCanvas, alpha, beta);

    // 3. Apply simple white balance
    console.log("Applying white balance...");
    simpleWhiteBalance(croppedCanvas);

    // 4. Apply a simple blur (e.g., box blur)
    console.log("Applying box blur...");
    boxBlur(croppedCanvas, 3); // 3x3 box blur

    // --- End of Image Processing ---

    // Convert the processed canvas to a Blob and assign to the file input
    croppedCanvas.toBlob(blob => {
        if (!blob) {
            console.error("Failed to create blob from canvas.");
            return;
        }
        const file = new File([blob], "captured_image_back.png", { type: "image/png" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        
        if (fileInputBack) {
            fileInputBack.files = dataTransfer.files;
        } else {
            console.error("fileInputBack element not found to assign the file.");
        }
        
        closeCameraBack();

        // Call reviBack if it's defined (assuming it handles the next step)
        if (typeof reviBack === 'function') {
            reviBack();
        } else {
            console.warn('reviBack function is not defined. Captured image is in fileInputBack.');
        }
    }, "image/png");
}

// Cierra la cámara y detiene el stream
function closeCameraBack() {
    if (cameraContainerBack) {
        cameraContainerBack.style.display = "none";
    }
    if (streamBack) {
        streamBack.getTracks().forEach((track) => track.stop());
        streamBack = null; // Clear the stream variable
    }
    if (videoBack) {
        videoBack.srcObject = null;
    }
    console.log("Camera back closed.");
}

// Example of how reviBack might be declared if it's not elsewhere
// function reviBack() {
//     console.log("reviBack called. Process the file in 'fileInputBack'.");
//     // Add logic to handle the captured file, e.g., upload or display
// }
