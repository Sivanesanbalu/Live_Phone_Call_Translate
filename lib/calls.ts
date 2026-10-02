import type { CallSession } from '@/lib/types';

const calls = new Map<string, CallSession>();

export function createCall(sourceLanguage: string, targetLanguage: string): CallSession {
  const id = crypto.randomUUID();
  const call: CallSession = {
    id, roomId: `call-${id}`, sourceLanguage, targetLanguage,
    status: 'WAITING', translationEnabled: true, createdAt: new Date().toISOString()
  };
  calls.set(id, call);
  return call;
}

export function getCall(id: string) { return calls.get(id); }

export function endCall(id: string) {
  const call = calls.get(id);
  if (!call) return undefined;
  call.status = 'ENDED'; call.endedAt = new Date().toISOString();
  calls.set(id, call); return call;
}
