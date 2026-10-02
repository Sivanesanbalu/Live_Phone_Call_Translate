import { endCall } from '@/lib/calls';
export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const call = endCall(id);
  if (!call) return Response.json({ error: 'CALL_NOT_FOUND' }, { status: 404 });
  return Response.json({ call });
}
