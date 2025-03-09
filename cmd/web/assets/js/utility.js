"use strict";
const constraints = {
  audio: false,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
  },
};

function handleSuccess(stream) {
  const video = document.querySelector("#gum-local");
  const videoTracks = stream.getVideoTracks();
  console.log("Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream;
  video.srcObject = stream;
}

function handleError(error) {
  const errorElement = document.querySelector("#errorMsg");
  let msg = "";
  if (error.name === "OverconstrainedError") {
    msg = `OverconstrainedError: The constraints could not be satisfied.`;
  } else if (error.name === "NotAllowedError") {
    msg =
      "NotAllowedError: Camera access was denied. Please allow permissions.";
  } else {
    msg = `getUserMedia error: ${error.name}`;
  }
  errorElement.innerHTML += `<p>${msg}</p>`;
  console.error(error);
}

async function init() {
  try {
    const stream =
      await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (error) {
    handleError(error);
  }
}
