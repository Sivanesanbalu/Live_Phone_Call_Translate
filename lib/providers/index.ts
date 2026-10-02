export interface SpeechToTextProvider {
  readonly name: string;
  supports(language: string): boolean;
  transcribe(audio: ArrayBuffer, language: string): Promise<string>;
}
export interface TranslationProvider {
  readonly name: string;
  supports(source: string, target: string): boolean;
  translate(text: string, source: string, target: string): Promise<string>;
}
export interface TextToSpeechProvider {
  readonly name: string;
  supports(language: string): boolean;
  synthesize(text: string, language: string): Promise<ArrayBuffer>;
}

export function providerStatus() {
  return {
    stt: { provider: process.env.STT_PROVIDER || 'unconfigured', configured: Boolean(process.env.STT_PROVIDER && process.env.STT_PROVIDER !== 'unconfigured') },
    translation: { provider: process.env.TRANSLATION_PROVIDER || 'unconfigured', configured: Boolean(process.env.TRANSLATION_PROVIDER && process.env.TRANSLATION_PROVIDER !== 'unconfigured') },
    tts: { provider: process.env.TTS_PROVIDER || 'unconfigured', configured: Boolean(process.env.TTS_PROVIDER && process.env.TTS_PROVIDER !== 'unconfigured') }
  };
}
