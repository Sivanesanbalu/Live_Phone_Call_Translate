# LinguaCall — Live Phone Call Translate

Production-oriented two-person VoIP translation built with Next.js, LiveKit and pluggable AI providers.

## What works
- Signed, expiring call invitations with host/guest language direction.
- LiveKit WebRTC room connection and reconnection handling.
- Raw microphone audio stays local; the browser sends short utterances to the server AI pipeline and publishes only synthesized translated speech into the room.
- Real STT → translation → TTS adapter using OpenAI server-side APIs.
- Tamil, Hindi, English, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati and Punjabi.
- Live transcript/translation, latency display, mute, invite copy, end call, mobile UI.
- Health/provider endpoints expose configuration state without secrets.

## Required production environment
Copy `.env.example` into your deployment environment and set `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `CALL_SIGNING_SECRET`, and `OPENAI_API_KEY`. Never expose these as `NEXT_PUBLIC_*` values.

## Run
```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Open the home page, choose two languages, create a call, then share the guest link. Both users grant microphone permission. Each browser processes its own speech and publishes translated synthetic audio for the other participant.

## Architecture
`Browser microphone → utterance capture → /api/ai/process → STT → translation → TTS → Web Audio → LiveKit translated audio track → remote participant`

This initial production path is app-controlled VoIP. It does not intercept normal cellular calls. SIP/PSTN can be added behind the same session/provider boundaries later.

## Privacy
The application does not persist raw audio or transcripts by default. Provider-side retention is governed by the configured provider account and policy. Recording and voice cloning are intentionally not implemented without explicit consent flows.
