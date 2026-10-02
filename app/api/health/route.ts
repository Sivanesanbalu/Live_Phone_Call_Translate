import { providerStatus } from '@/lib/providers';
export const dynamic = 'force-dynamic';
export async function GET() {
  const realtimeConfigured = Boolean(process.env.LIVEKIT_URL && process.env.LIVEKIT_API_KEY && process.env.LIVEKIT_API_SECRET);
  return Response.json({
    status: 'ok', service: 'Live Phone Call Translate', version: '1.1.0',
    realtime: { provider: 'livekit', configured: realtimeConfigured },
    ai: providerStatus(), timestamp: new Date().toISOString()
  });
}
