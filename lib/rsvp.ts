import { z } from "zod";
export const rsvpSchema=z.object({
 id:z.string().uuid(),name:z.string().trim().min(2).max(100),contact:z.string().trim().min(5).max(120).refine(v=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||/^\+?[\d\s()-]{7,25}$/.test(v)),
 attendance:z.enum(["yes","maybe","no"]),adults:z.number().int().min(0).max(20),children:z.number().int().min(0).max(20),stay:z.enum(["yes","maybe","no"]),notes:z.string().trim().max(1000),language:z.enum(["en","hi","mr","kn"]),website:z.string().max(0).default("")
}).superRefine((d,c)=>{if(d.attendance!=="no"&&(d.adults<1||d.adults+d.children>20))c.addIssue({code:"custom",path:["adults"],message:"Choose 1–20 guests including at least one adult."})});
export type RsvpInput=z.infer<typeof rsvpSchema>;
export type RsvpRow={id:string;name:string;contact:string;attendance:string;adults:number;children:number;stay:string;notes:string;language:string;created_at:string};
