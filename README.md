# Live Phone Call Translate

Production-oriented real-time multilingual voice calling platform.

## Architecture

Client / mobile app → WebRTC media layer → realtime translation gateway → streaming STT → translation → streaming TTS → remote caller.

The web control surface is deployed separately from the persistent realtime media gateway. Provider credentials must never be committed to GitHub.

## Initial languages
Tamil, Hindi, English, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi, Arabic, Spanish, French, German, Japanese, Korean.

## Development
```bash
npm install
npm run dev
```

## Deployment
The web application is Vercel-ready. Connect the repository to Vercel for automatic production deployments from `main` and preview deployments from feature branches.

## Production roadmap
1. Web control surface and language routing
2. WebRTC signaling and rooms
3. Streaming speech-to-text provider abstraction
4. Translation provider abstraction
5. Streaming TTS provider abstraction
6. Bidirectional audio orchestration, VAD, interruption/barge-in and latency controls
7. Authentication, call sessions, usage metering and observability
8. Native Flutter clients
9. SIP/PSTN gateway for phone-number calling

This repository intentionally contains no API keys or provider secrets.
