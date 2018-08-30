import React, { Component } from 'react'
import './styles/Webcam.css'
class Webcam extends Component {

    state = {
        webcamOn: false
    }

    componentDidMount() {
        this.startWebcam()
    }

    startWebcam = () => {
        if (!this.state.webcamOn) {
            let video = document.getElementById('webcam')
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
            var facingMode = 'environment'
            var constraints = {
                audio: false,
                video: {
                    facingMode: facingMode
                }
            }
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    video.srcObject = stream
                    video.addEventListener('loadeddata', () => {
                        //this.adjustVideoSize(video)
                        this.setState({ webcamOn: true })
                    })
                })
        }

        /*
                video.addEventListener('click', function () {
                    if (facingMode == "user") {
                        facingMode = "environment";
                    } else {
                        facingMode = "user";
                    }
        
                    constraints = {
                        audio: false,
                        video: {
                            facingMode: facingMode
                        }
                    }
        
                    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                        video.srcObject = stream;
                        //adjustVideoSize(video.width, video.height);
                    });
                    
                });
                */
    }
    /*
    function capture(video) {
        const webcamImage = tf.fromPixels(video);
        const croppedImage = cropImage(webcamImage);
        const batchedImage = croppedImage.expandDims(0);
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    }
    
    function cropImage(img) {
        const centerHeight = img.shape[0] / 2;
        const beginHeight = centerHeight - (IMAGE_SIZE / 2);
        const centerWidth = img.shape[1] / 2;
        const beginWidth = centerWidth - (IMAGE_SIZE / 2);
        return img.slice([beginHeight, beginWidth, 0], [IMAGE_SIZE, IMAGE_SIZE, 3]);
    }
    
    function adjustVideoSize(width, height) {
        const aspectRatio = width / height;
        if (width >= height) {
            video.width = aspectRatio * video.height;
        } else if (width < height) {
            video.height = video.width / aspectRatio;
        }
    }
    */
    render() {
        return (
            <div className='webcam'>
                <video autoPlay playsInline muted id='webcam'></video>
            </div>
        )
    }
}

export default Webcam