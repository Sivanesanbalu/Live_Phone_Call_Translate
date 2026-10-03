import crypto from 'node:crypto';
import type { LanguageCode } from './languages';
export type CallState='CREATED'|'WAITING'|'CONNECTING'|'CONNECTED'|'TRANSLATING'|'RECONNECTING'|'ENDED'|'FAILED';
export type CallSession={id:string;roomId:string;sourceLanguage:LanguageCode;targetLanguage:LanguageCode;state:CallState;createdAt:string;expiresAt:string};
type Payload={v:1;roomId:string;sourceLanguage:LanguageCode;targetLanguage:LanguageCode;createdAt:string;expiresAt:string};
function secret(){const value=process.env.CALL_SIGNING_SECRET; if(!value) throw new Error('CALL_SIGNING_SECRET_NOT_CONFIGURED'); return value;}
function b64(v:string){return Buffer.from(v).toString('base64url')}
function sign(body:string){return crypto.createHmac('sha256',secret()).update(body).digest('base64url')}
export function createCall(sourceLanguage:LanguageCode,targetLanguage:LanguageCode):CallSession{const createdAt=new Date();const expiresAt=new Date(createdAt.getTime()+2*60*60*1000);const payload:Payload={v:1,roomId:`call_${crypto.randomUUID()}`,sourceLanguage,targetLanguage,createdAt:createdAt.toISOString(),expiresAt:expiresAt.toISOString()};const body=b64(JSON.stringify(payload));return {...payload,id:`${body}.${sign(body)}`,state:'WAITING'};}
export function getCall(id:string):CallSession|null{try{const [body,sig]=id.split('.');if(!body||!sig)return null;const expected=sign(body);if(sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return null;const payload=JSON.parse(Buffer.from(body,'base64url').toString()) as Payload;if(payload.v!==1||Date.parse(payload.expiresAt)<Date.now())return null;return {...payload,id,state:'WAITING'};}catch{return null}}
