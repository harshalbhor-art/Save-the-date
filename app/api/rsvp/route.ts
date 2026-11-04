import {database} from "@/db/raw";
import {rsvpSchema} from "@/lib/rsvp";
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return Response.json({error:"origin"},{status:403});
 if(!request.headers.get("content-type")?.includes("application/json"))return Response.json({error:"format"},{status:415});
 try{
 const raw=await request.text();if(raw.length>8000)return Response.json({error:"size"},{status:413});
 let body;try{body=JSON.parse(raw);}catch{return Response.json({error:"validation"},{status:400});}
 const parsed=rsvpSchema.safeParse(body);if(!parsed.success)return Response.json({error:"validation"},{status:400});
 const d=parsed.data;const no=d.attendance==="no";
 await database().prepare("INSERT INTO rsvps (id,name,contact,attendance,adults,children,diet,stay,notes,language) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING").bind(d.id,d.name,d.contact,d.attendance,no?0:d.adults,no?0:d.children,"",no?"no":d.stay,d.notes,d.language).run();
 return Response.json({saved:true},{status:201,headers:{"Cache-Control":"no-store"}});
 }catch(error){console.error("RSVP save failed",error);return Response.json({error:"unavailable"},{status:503});}
}
