import { getCall } from '@/lib/calls';
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const call = getCall(id);
  if (!call) return Response.json({ error: 'CALL_NOT_FOUND' }, { status: 404 });
  return Response.json({ call });
}
