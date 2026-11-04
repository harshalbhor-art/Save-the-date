export const languages = [['en','English'],['hi','हिन्दी'],['mr','मराठी'],['kn','ಕನ್ನಡ']] as const;
export type Language = typeof languages[number][0];
export function isLanguage(value: string | null): value is Language { return languages.some(([code]) => code === value); }
export function invitationLink(origin: string, language: Language) { const url = new URL('/', origin); url.searchParams.set('lang', language); return url.href; }
