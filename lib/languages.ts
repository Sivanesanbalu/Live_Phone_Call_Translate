export const languages = [
  { code:'ta', name:'Tamil', native:'தமிழ்' }, { code:'hi', name:'Hindi', native:'हिन्दी' },
  { code:'en', name:'English', native:'English' }, { code:'te', name:'Telugu', native:'తెలుగు' },
  { code:'ml', name:'Malayalam', native:'മലയാളം' }, { code:'kn', name:'Kannada', native:'ಕನ್ನಡ' },
  { code:'bn', name:'Bengali', native:'বাংলা' }, { code:'mr', name:'Marathi', native:'मराठी' },
  { code:'gu', name:'Gujarati', native:'ગુજરાતી' }, { code:'pa', name:'Punjabi', native:'ਪੰਜਾਬੀ' }
] as const;
export type LanguageCode = typeof languages[number]['code'];
export const languageCodes = languages.map(l=>l.code) as [LanguageCode,...LanguageCode[]];
export function languageName(code:string){ return languages.find(l=>l.code===code)?.name ?? code; }
