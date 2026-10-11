/** Pure call-leg routing policy. No audio or customer data is stored here. */
export type Language = 'ta-IN' | 'hi-IN' | 'unknown';
export type Leg = 'customer' | 'staff';
export type Route = {
  from: Leg;
  to: Leg;
  detected: Language;
  target: 'ta-IN' | 'hi-IN';
  action: 'translate' | 'passthrough' | 'hold';
};
export function routeUtterance(from: Leg, detected: Language): Route {
  const to: Leg = from === 'customer' ? 'staff' : 'customer';
  const target = from === 'customer' ? 'ta-IN' : 'hi-IN';
  return { from, to, detected, target,
    action: detected === 'unknown' ? 'hold' : detected === target ? 'passthrough' : 'translate' };
}
export function shouldTranslate(source: Language, target: 'ta-IN' | 'hi-IN'): boolean {
  return source !== 'unknown' && source !== target;
}
