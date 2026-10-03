import { getCall } from '@/lib/calls';
export const runtime='nodejs';
export async function POST(_request:Request,context:{params:Promise<{id:string}>}){const{id}=await context.params;if(!getCall(id))return Response.json({error:'CALL_NOT_FOUND_OR_EXPIRED'},{status:404});return Response.json({ok:true,state:'ENDED'});}
