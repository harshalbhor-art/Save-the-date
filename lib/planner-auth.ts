import {env} from "cloudflare:workers";
import {getChatGPTUser} from "@/app/chatgpt-auth";
export async function plannerAccess(){const user=await getChatGPTUser();const configured=String((env as unknown as Record<string,unknown>).PLANNER_EMAILS||"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);return {user,configured:configured.length>0,allowed:!!user&&configured.includes(user.email.toLowerCase())};}
