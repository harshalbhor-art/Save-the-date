import {database} from "@/db/raw";
import {plannerAccess} from "@/lib/planner-auth";
import type {RsvpRow} from "@/lib/rsvp";
export async function GET(request:Request){const access=await plannerAccess();if(!access.allowed)return Response.json({error:"unauthorized"},{status:403,headers:{"Cache-Control":"no-store"}});
 try{const {results}=await database().prepare("SELECT id,name,contact,attendance,adults,children,stay,notes,language,created_at FROM rsvps ORDER BY created_at DESC,id DESC").all<RsvpRow>();
 if(new URL(request.url).searchParams.get("format")==="csv"){
 const columns:[keyof RsvpRow,string][]=[["name","Name"],["contact","Contact"],["attendance","Attendance"],["adults","Adults"],["children","Children"],["stay","Accommodation needed"],["notes","Notes"],["language","Language"],["created_at","Submitted UTC"]];
 const cell=(value:unknown)=>{let s=String(value??"");if(/^[\s]*[=+@-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
 const csv="\uFEFF"+[columns.map(c=>cell(c[1])).join(","),...results.map(row=>columns.map(c=>cell(row[c[0]])).join(","))].join("\r\n");
 return new Response(csv,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=harshal-snehal-rsvps.csv","Cache-Control":"no-store"}});}
 return Response.json({responses:results},{headers:{"Cache-Control":"no-store"}});
 }catch(error){console.error("Planning load failed",error);return Response.json({error:"unavailable"},{status:503});}}
