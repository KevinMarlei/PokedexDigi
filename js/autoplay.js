
            document.addEventListener("DOMContentLoaded", function () {
                var video = document.getElementById("video");
                var playButton = document.getElementById("playButton");
    
                if (video && playButton) {
                    playButton.addEventListener("click", function () {
                        video.play().catch(function (error) {
                            console.error("Erro ao reproduzir o vídeo:", error);
                        });
                        playButton.style.display = "none"; // Ocultar o botão após a reprodução iniciar
                    });
                }
            });
       