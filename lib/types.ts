export const languages = [
  { code: 'ta', name: 'Tamil' }, { code: 'hi', name: 'Hindi' },
  { code: 'en', name: 'English' }, { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' }, { code: 'kn', name: 'Kannada' },
  { code: 'bn', name: 'Bengali' }, { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' }, { code: 'pa', name: 'Punjabi' },
  { code: 'ar', name: 'Arabic' }, { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' }, { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' }, { code: 'ko', name: 'Korean' }
] as const;

export type CallStatus = 'CREATED'|'WAITING'|'CONNECTING'|'CONNECTED'|'TRANSLATING'|'RECONNECTING'|'ENDED'|'FAILED';

export interface CallSession {
  id: string;
  roomId: string;
  sourceLanguage: string;
  targetLanguage: string;
  status: CallStatus;
  translationEnabled: boolean;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  error?: string;
}
