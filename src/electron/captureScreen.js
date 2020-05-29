// In the renderer process.
const { desktopCapturer } = require("electron");

function captureScreen() {
  desktopCapturer
    .getSources({ types: ["window", "screen"] })
    .then(async (sources) => {
      for (const source of sources) {
        if (source.name === "Electron") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720,
                },
              },
            });
            handleStream(stream);
          } catch (e) {
            console.error(e);
          }
          return;
        }
      }

      function handleStream(stream) {
        const video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = (e) => video.play();
      }
    })
    .catch((e) => console.error(e));
}

module.exports = captureScreen;
