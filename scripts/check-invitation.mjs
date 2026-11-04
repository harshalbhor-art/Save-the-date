import assert from 'node:assert/strict';
import {build} from 'esbuild';
const result=await build({stdin:{contents:`export {rsvpSchema} from './lib/rsvp'; export {languages,invitationLink,isLanguage} from './lib/languages'; export {celebration} from './app/celebration-content';`,resolveDir:process.cwd(),loader:'ts'},bundle:true,write:false,format:'esm',platform:'node'});
const {rsvpSchema,languages,invitationLink,isLanguage,celebration}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const data={id:'89da8504-13cc-4aae-a97b-cc360d8cd261',name:'Local test',contact:'test@example.com',attendance:'yes',adults:2,children:1,stay:'yes',notes:'',website:''};
for(const [language]of languages){assert.equal(new URL(invitationLink('https://example.com/planning',language)).searchParams.get('lang'),language);assert(rsvpSchema.safeParse({...data,language}).success);assert.equal(celebration[language].events.flat().length,5);assert.equal(celebration[language].days.length,2);}
assert(!isLanguage('xx'));assert(!rsvpSchema.safeParse({...data,language:'kn',adults:20,children:2}).success);assert(!rsvpSchema.safeParse({...data,language:'kn',contact:'invalid'}).success);assert(!('diet' in rsvpSchema.parse({...data,language:'kn',diet:'vegetarian'})));
console.log('PASS: four language links, schedules, RSVP without food preference, and validation.');
