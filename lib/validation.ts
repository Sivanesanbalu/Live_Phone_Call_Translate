import { z } from 'zod';
import { languageCodes } from './languages';
export const createCallSchema=z.object({sourceLanguage:z.enum(languageCodes),targetLanguage:z.enum(languageCodes)}).refine(v=>v.sourceLanguage!==v.targetLanguage,{message:'Languages must be different'});
export const tokenSchema=z.object({callId:z.string().min(8).max(128),role:z.enum(['host','guest']),participantName:z.string().trim().min(1).max(50).default('web')});
export const processSpeechSchema=z.object({sourceLanguage:z.enum(languageCodes),targetLanguage:z.enum(languageCodes)}).refine(v=>v.sourceLanguage!==v.targetLanguage,{message:'Languages must be different'});
