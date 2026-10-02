'use client';
import { useEffect, useRef, useState } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';

export default function CallPage({ params }: { params: Promise<{ id: string }> }) {
  const [callId,setCallId]=useState(''); const [status,setStatus]=useState('Loading call…'); const [muted,setMuted]=useState(false); const [error,setError]=useState(''); const [connected,setConnected]=useState(false); const roomRef=useRef<Room|null>(null);
  useEffect(()=>{params.then(({id})=>{setCallId(id); fetch(`/api/calls/${id}`).then(async r=>{if(!r.ok) throw new Error('Call not found or expired'); setStatus('Waiting — ready to connect');}).catch(e=>{setError(e.message);setStatus('Unavailable')})})},[params]);
  async function connect(){
    setError(''); setStatus('Connecting…');
    try { const r=await fetch('/api/realtime/token',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({callId,participantName:'web'})}); const data=await r.json(); if(!r.ok) throw new Error(data.error==='REALTIME_NOT_CONFIGURED'?'Realtime service is not configured.':data.error||'Connection failed');
      const room=new Room({adaptiveStream:true,dynacast:true}); roomRef.current=room;
      room.on(RoomEvent.Reconnecting,()=>setStatus('Reconnecting…')); room.on(RoomEvent.Reconnected,()=>setStatus('Connected')); room.on(RoomEvent.Disconnected,()=>{setStatus('Disconnected');setConnected(false)});
      room.on(RoomEvent.TrackSubscribed,(track)=>{if(track.kind===Track.Kind.Audio){const el=track.attach();el.autoplay=true;document.body.appendChild(el)}});
      await room.connect(data.url,data.token); await room.localParticipant.setMicrophoneEnabled(true); setConnected(true);setStatus('Connected — translation provider pipeline pending configuration');
    } catch(e){setError(e instanceof Error?e.message:'Connection failed');setStatus('Unable to connect')}
  }
  async function toggleMute(){const room=roomRef.current;if(!room)return;await room.localParticipant.setMicrophoneEnabled(muted);setMuted(!muted)}
  async function end(){roomRef.current?.disconnect(); if(callId) await fetch(`/api/calls/${callId}/end`,{method:'POST'});setStatus('Call ended');setConnected(false)}
  return <main><section className="hero"><div className="badge">TRANSLATED CALL</div><h1>Live call room</h1><div className="card"><div className="status"><i/> {status}</div><p className="privacy">When connected, microphone audio is sent through the configured realtime/AI providers. Calls are not recorded by this application by default.</p>{error&&<p className="error">{error}</p>}<div className="callControls"><button className="call" disabled={!callId||connected||Boolean(error&&status==='Unavailable')} onClick={connect}>{connected?'Connected':'Join call'}</button><button disabled={!connected} onClick={toggleMute}>{muted?'Unmute':'Mute'}</button><button disabled={!connected} onClick={end}>End call</button></div><p className="roomId">Call ID: {callId||'…'}</p></div></section></main>;
}
