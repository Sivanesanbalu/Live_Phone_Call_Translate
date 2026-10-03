import './globals.css';import type {Metadata} from 'next';
export const metadata:Metadata={title:'LinguaCall — Live Voice Translation',description:'Private bidirectional AI voice translation calls.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
