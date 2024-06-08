let recordButton = document.getElementById('record');
let stopButton = document.getElementById('stop');
let audioElement = document.getElementById('audio');

let mediaRecorder;
let audioBlob;

recordButton.addEventListener('click', function () {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    this.classList.add('pulse');

    let audioChunks = [];
    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      this.classList.remove('pulse');
      audioBlob = new Blob(audioChunks);
      let audioUrl = URL.createObjectURL(audioBlob);
      audioElement.src = audioUrl;
    });
  });
});

stopButton.addEventListener('click', function () {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
});
