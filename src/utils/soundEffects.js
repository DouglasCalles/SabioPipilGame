import clickSound from "../assets/sounds/click.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.wav";

const soundFiles = {
  click: clickSound,
  correct: correctSound,
  incorrect: incorrectSound,
};

const DEFAULT_VOLUME = 0.35;
const audioCache = new Map();

let soundVolume = DEFAULT_VOLUME;
let soundMuted = false;

function clampVolume(volume) {
  return Math.min(1, Math.max(0, volume));
}

function applyAudioSettings(audio) {
  audio.volume = soundMuted ? 0 : soundVolume;
}

export function setSoundVolume(volume) {
  soundVolume = clampVolume(volume);

  audioCache.forEach((audio) => {
    applyAudioSettings(audio);
  });
}

export function getSoundVolume() {
  return soundVolume;
}

export function setSoundMuted(isMuted) {
  soundMuted = isMuted;

  audioCache.forEach((audio) => {
    applyAudioSettings(audio);
  });
}

export function getSoundMuted() {
  return soundMuted;
}

export function playSoundEffect(soundName) {
  const source = soundFiles[soundName];

  if (!source || typeof Audio === "undefined") {
    return;
  }

  const audio = audioCache.get(soundName) || new Audio(source);
  audioCache.set(soundName, audio);

  applyAudioSettings(audio);
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Browsers can block audio until the first user interaction.
  });
}
