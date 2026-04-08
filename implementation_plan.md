# Implementation Plan: WebRTC Camera Prank & Premium Polish

This document serves as the implementation plan to integrate the new camera/snapshot logic and visual polish into the Thangappan prank. As per your request, this plan is formatted so that it can be executed right now, or used as a direct prompt for another session.

## User Review Required

> [!IMPORTANT]  
> Are you ready for me to execute this plan? Once approved, I will dive directly into `index.html` and write the code exactly as planned below.

## Proposed Changes

### 1. Typography & Aesthetic Overhaul
**Goal**: Make the environment feel entirely serious, elevating the prank's "authenticity".
- **Action**: Replace Thangappan's handwritten font (`Gochi Hand` / `Caveat`) with `Playfair Display, serif` or a sleek `Inter` variant.
- **Action**: Update the JS typewriter string logic to ensure all of Thangappan's dialogue uses proper capitalization, punctuation, and a highly professional tone (until he naturally breaks into his angry/roast states).
- **Action**: Add subtle premium transitions (fade-ins for the dialogue boxes, soft dropshadows on the video elements).

### 2. The WebRTC Camera Setup
**Goal**: Subvert the avatar generation by forcing the user to take a web snapshot under pressure.
- **Action**: Inject a new hidden `div` cluster inside the Avatar page:
  ```html
  <div id="camera-module" class="hidden">
     <video id="webcam-feed" autoplay playsinline></video>
     <canvas id="webcam-canvas" class="hidden"></canvas>
     <div class="camera-actions">
        <button id="btn-upload-fake" class="btn btn-secondary">Upload Photo</button>
        <button id="btn-capture-fake" class="btn btn-primary">TAKE PHOTO</button>
     </div>
  </div>
  ```
- **Action**: Implement JS `navigator.mediaDevices.getUserMedia({video: true})` to trigger the browser's camera permission.

### 3. State & Logic Updates
**When User clicks [NO] to the AI Avatar**:
1. Typewriter: *"Look, I did my best. This is what the data gave me. Fine, if you think you are better, take your photo 😤"*
2. Trigger the `camera-module` to appear.
3. If they click **Upload Photo**:
   - Thangappan interrupts: *"Uh-Ah you are not going to upload photos you are going to upload AI generated lies 🤬 and i won't let you 😤 TAKE YOUR PHOTO NOW NO MATTER WHERE YOU ARE AND WHAT YOU ARE DOING 😡"*
4. If they click **TAKE PHOTO**:
   - Button glitches or says "Focusing..." and does not capture.
   - Thangappan forces the snapshot using the canvas API catching them off-guard.
   - The frozen frame replaces the video feed.
   - `audio-3` (`pokkiri_raja.mp3`) is triggered exactly at the snap.
   - We set an event listener: `document.getElementById('audio-3').onended = () => { goPage(nextPage) }`. The page is completely locked until the audio finishes.

**When User clicks [YES] to the AI Avatar**:
1. Typewriter: *"liar 🙂 but ok. I know you ain't this 🤬🤬 show your REAL FACE 🤨"*
2. Transitions immediately into the exact same Camera/Upload flow documented above.

## Verification Plan

### Manual Verification
1. I will start the local server.
2. I will run the browser subagent to click through the flow to the Avatar generation step.
3. I will test both the [YES] and [NO] paths and ensure the fake upload click triggers the scolding dialogue.
4. I will verify that `audio-3` actually prevents the user from proceeding until it finishes playing.
