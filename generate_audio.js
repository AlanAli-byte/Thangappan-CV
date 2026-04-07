/**
 * Generate 5 missing MP3 audio placeholder files for the prank app.
 * 
 * Since we don't have ffmpeg, we generate valid MP3 files using a minimal
 * MPEG Audio Layer III frame structure. Each file contains a valid MP3
 * with silence or a simple tone encoded as valid MPEG frames.
 * 
 * We use the simplest valid MP3: MPEG1 Layer3, 128kbps, 44100Hz, mono.
 */

const fs = require('fs');
const path = require('path');

// --- Minimal valid MP3 generator ---
// A valid MP3 frame header for MPEG1 Layer3 128kbps 44100Hz Mono:
// Sync: 0xFFE0 (11 sync bits + MPEG1)
// Version: MPEG1 = 11
// Layer: Layer3 = 01
// Protection: No CRC = 1
// Bitrate: 128kbps for MPEG1 L3 = 1001
// Sample rate: 44100 = 00
// Padding: 0
// Channel: Mono = 11
//
// Full header bytes: FF FB 90 00 (approximately)
// Frame size = 144 * bitrate / samplerate = 144 * 128000 / 44100 = 417 bytes (with padding: 418)

function createMp3Frame(silentData) {
  // MPEG1, Layer 3, 128kbps, 44100Hz, Mono, no padding
  // Header: 0xFF 0xFB 0x90 0x00
  const header = Buffer.from([0xFF, 0xFB, 0x90, 0x00]);
  const frameSize = 417; // bytes total for this config
  const dataSize = frameSize - 4; // minus header
  const data = silentData || Buffer.alloc(dataSize, 0);
  return Buffer.concat([header, data.slice(0, dataSize)]);
}

function generateSilentMp3(durationSeconds) {
  // ~38.28 frames per second at 44100Hz (1152 samples per frame)
  const framesPerSecond = 44100 / 1152;
  const totalFrames = Math.ceil(framesPerSecond * durationSeconds);
  const frames = [];
  for (let i = 0; i < totalFrames; i++) {
    frames.push(createMp3Frame());
  }
  return Buffer.concat(frames);
}

function generateToneMp3(durationSeconds, variation) {
  // Same structure but with non-zero data to create a slight audible artifact
  const framesPerSecond = 44100 / 1152;
  const totalFrames = Math.ceil(framesPerSecond * durationSeconds);
  const frames = [];
  for (let i = 0; i < totalFrames; i++) {
    const dataSize = 413;
    const buf = Buffer.alloc(dataSize);
    // Fill with a simple pattern — won't be musical but won't error
    for (let j = 0; j < dataSize; j++) {
      buf[j] = Math.floor(Math.sin((i * dataSize + j) * variation) * 20) & 0xFF;
    }
    frames.push(createMp3Frame(buf));
  }
  return Buffer.concat(frames);
}

// Generate all 5 missing files
const dir = __dirname;

const files = [
  { name: 'softskills_bgm.mp3',  duration: 30, desc: 'Soft skills BGM' },
  { name: 'glitch_sting.mp3',    duration: 3,  desc: 'Glitch sting effect' },
  { name: 'end_credits.mp3',     duration: 20, desc: 'End credits music' },
  { name: 'muffled_voice.mp3',   duration: 15, desc: 'Muffled interview voice' },
  { name: 'carnatic_bg.mp3',     duration: 45, desc: 'Carnatic background ambient' },
];

files.forEach(f => {
  const filePath = path.join(dir, f.name);
  if (fs.existsSync(filePath)) {
    console.log(`[SKIP] ${f.name} already exists`);
    return;
  }
  const mp3 = generateSilentMp3(f.duration);
  fs.writeFileSync(filePath, mp3);
  console.log(`[CREATED] ${f.name} (${f.desc}) — ${mp3.length} bytes, ~${f.duration}s`);
});

console.log('\nAll audio files generated!');
