const video = document.getElementById('video');

let stream;

navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const videoSource = videoDevices[1]; // Change this to select the correct device

        return navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: videoSource ? videoSource.deviceId : undefined
            }
        });
    })
    .then(mediaStream => {
        video.srcObject = mediaStream;
        stream = mediaStream; // Save the stream
    })
    .catch(err => {
        console.log('An error occurred: ' + err);
    });

window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save the current theme
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light'); // Save the current theme
    }
});

// When the page loads, set the theme from localStorage
let theme = localStorage.getItem('theme');
if (theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
}

document.getElementById('checkout').addEventListener('click', function() {
    window.location.href = 'payment.html';
});