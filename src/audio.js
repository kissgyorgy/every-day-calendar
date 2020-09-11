const SOUND_FILE = "ding.mp3"

class AudioControl {
  constructor(muted) {
    this.audio = new Audio(SOUND_FILE)
    this.audio.muted = muted
  }

  mute(mute) {
    this.audio.muted = mute
  }

  play(play) {
    if (play) {
      this.audio.currentTime = 0
      this.audio.play()
    } else {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }
}

export default AudioControl
