import { z } from 'zod';
import { languages } from '@/lib/types';

const codes = languages.map((x) => x.code);
export const createCallSchema = z.object({
  sourceLanguage: z.string().refine((v) => codes.includes(v as never), 'Unsupported source language'),
  targetLanguage: z.string().refine((v) => codes.includes(v as never), 'Unsupported target language')
}).refine((v) => v.sourceLanguage !== v.targetLanguage, 'Languages must be different');
