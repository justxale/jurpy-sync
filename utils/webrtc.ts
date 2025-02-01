const stunURL = "stun:localhost"

class RTCLocalHandler {
    connection: RTCPeerConnection
    sendChannel: RTCDataChannel

    public constructor() {
        this.connection = new RTCPeerConnection({
            iceServers: [ { urls: stunURL } ]
        })
        this.sendChannel = this.connection.createDataChannel('sendChannel')
        this.sendChannel.onopen = this.onChannelStatusChanged
        this.sendChannel.onclose = this.onChannelStatusChanged
    }

    onChannelStatusChanged(ev: Event) {

    }

    connectTracks(stream: MediaStream) {
        const localPlayer: HTMLVideoElement | null = document.getElementById("local_video") as HTMLVideoElement | null
        if (localPlayer !== null) {
            localPlayer.srcObject = stream
            stream
                .getTracks()
                .forEach((track) => this.connection.addTrack(track, stream));
        }
    }

    getUserTracks() {
        navigator.mediaDevices
            .getUserMedia({audio: true, video: true})
            .then(this.connectTracks)
            .catch();
    }
}

class RTCRemoteHandler {
    connection: RTCPeerConnection

    constructor() {
        this.connection = new RTCPeerConnection({
            iceServers: [ { urls: stunURL } ]
        })
        this.connection.ondatachannel = this.getChannelData
    }

    getChannelData() {
        
    }
}