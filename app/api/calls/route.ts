import { createCall } from '@/lib/calls';
import { createCallSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const parsed = createCallSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: 'INVALID_CALL', details: parsed.error.flatten() }, { status: 400 });
    const call = createCall(parsed.data.sourceLanguage, parsed.data.targetLanguage);
    return Response.json({ call, inviteUrl: `/call/${call.id}` }, { status: 201 });
  } catch {
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
}
