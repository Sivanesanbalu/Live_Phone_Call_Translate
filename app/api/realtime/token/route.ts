import { AccessToken } from 'livekit-server-sdk';
import { getCall } from '@/lib/calls';

export async function POST(request: Request) {
  const { callId, participantName } = await request.json().catch(() => ({}));
  if (!callId || !participantName) return Response.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  const call = getCall(callId);
  if (!call) return Response.json({ error: 'CALL_NOT_FOUND' }, { status: 404 });
  const url = process.env.LIVEKIT_URL, key = process.env.LIVEKIT_API_KEY, secret = process.env.LIVEKIT_API_SECRET;
  if (!url || !key || !secret) return Response.json({ error: 'REALTIME_NOT_CONFIGURED' }, { status: 503 });
  const token = new AccessToken(key, secret, { identity: `${participantName}-${crypto.randomUUID()}`, ttl: '2h' });
  token.addGrant({ roomJoin: true, room: call.roomId, canPublish: true, canSubscribe: true });
  return Response.json({ url, token: await token.toJwt(), room: call.roomId });
}
