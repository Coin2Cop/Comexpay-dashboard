
document.getElementById('processButton').addEventListener('click', function() {
    var videoFile = document.getElementById('videoFile').files[0];
    if (videoFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var ffmpeg = new FFMPEG({
                MEMFS: [{name: videoFile.name, data: new Uint8Array(e.target.result)}],
                arguments: ['-i', videoFile.name, 'output.mp3'],
                print: function(data) { console.log(data); },
                onExit: function(code) {
                    var output = ffmpeg.MEMFS.find((file) => file.name === 'output.mp3');
                    if (output) {
                        var audioBlob = new Blob([output.data], {type: 'audio/mp3'});
                        var audioUrl = URL.createObjectURL(audioBlob);
                        document.getElementById('audioOutput').src = audioUrl;

                        // Convertir audio a texto
                        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                        recognition.lang = 'es-ES'; // Ajusta el idioma según sea necesario
                        recognition.onresult = function(event) {
                            var transcript = event.results[0][0].transcript;
                            document.getElementById('transcription').value = transcript;
                        };
                        recognition.onerror = function(event) {
                            console.error('Error:', event.error);
                        };

                        // Crear un Blob URL para el audio y empezar el reconocimiento
                        var audioFileReader = new FileReader();
                        audioFileReader.onload = function(event) {
                            recognition.start(new Blob([event.target.result], { type: 'audio/mp3' }));
                        };
                        audioFileReader.readAsArrayBuffer(audioBlob);
                    }
                }
            });
        };
        reader.readAsArrayBuffer(videoFile);
    } else {
        alert('Por favor, selecciona un archivo de video.');
    }
});