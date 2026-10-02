'use client';
import { useState } from 'react';
import { languages } from '@/lib/types';

export default function Home() {
  const [mine, setMine] = useState('ta'); const [theirs, setTheirs] = useState('hi');
  const [enabled, setEnabled] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function startCall() {
    setBusy(true); setError('');
    try {
      const r = await fetch('/api/calls', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({sourceLanguage:mine,targetLanguage:theirs}) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Could not create call');
      window.location.href = data.inviteUrl;
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not create call'); setBusy(false); }
  }
  const name=(code:string)=>languages.find(x=>x.code===code)?.name || code;
  return <main><section className="hero"><div className="badge">REAL-TIME AI VOICE TRANSLATION</div><h1>Speak naturally.<br/><span>Understand anyone.</span></h1><p>App-controlled WebRTC calls with secure server-side provider integration.</p><div className="card"><div className="status"><i/> Ready to create a call</div><div className="grid"><label>My language<select value={mine} onChange={e=>setMine(e.target.value)}>{languages.map(x=><option key={x.code} value={x.code}>{x.name}</option>)}</select></label><button className="swap" aria-label="Swap languages" onClick={()=>{setMine(theirs);setTheirs(mine)}}>⇄</button><label>Other person's language<select value={theirs} onChange={e=>setTheirs(e.target.value)}>{languages.map(x=><option key={x.code} value={x.code}>{x.name}</option>)}</select></label></div><div className="route"><b>{name(mine)}</b><span>speech → translation → voice</span><b>{name(theirs)}</b></div><button className="call" disabled={busy || mine===theirs} onClick={startCall}>{busy?'Creating…':'☎ Start translated call'}</button>{mine===theirs&&<p className="notice">Choose two different languages.</p>}{error&&<p className="error">{error}</p>}<div className="toggle"><span>Live translation</span><button onClick={()=>setEnabled(!enabled)} className={enabled?'on':''}>{enabled?'ON':'OFF'}</button></div></div><div className="features"><div><b>↯ Streaming architecture</b><small>Designed for conversational media</small></div><div><b>◉ Provider-ready</b><small>STT, translation and TTS adapters</small></div><div><b>⇄ Two-way design</b><small>Bidirectional call pipeline</small></div></div></section></main>;
}
