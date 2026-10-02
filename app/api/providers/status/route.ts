import { providerStatus } from '@/lib/providers';
export async function GET() {
  return Response.json({ realtime: { provider: 'livekit', configured: Boolean(process.env.LIVEKIT_URL && process.env.LIVEKIT_API_KEY && process.env.LIVEKIT_API_SECRET) }, ...providerStatus() });
}
