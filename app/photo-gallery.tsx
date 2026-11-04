'use client';
import {useRef,useState} from 'react';
import {X} from 'lucide-react';
import {celebration} from './celebration-content';
import type {Language} from '@/lib/languages';
export default function PhotoGallery({language}:{language:Language}){
 const c=celebration[language],dialog=useRef<HTMLDialogElement>(null);const [selected,setSelected]=useState(1);
 return <section className="photo-gallery" aria-labelledby="gallery-title"><h2 id="gallery-title">{c.gallery}</h2><p className="gallery-note">{c.samples}</p><div className="gallery-grid">{[1,2,3,4,5].map(n=><button key={n} className={'gallery-photo photo-'+n} aria-label={`${c.photo} ${n}`} onClick={()=>{setSelected(n);dialog.current?.showModal();}}><img src={`/gallery/couple-${n}.webp`} alt={`${c.photo} ${n}`} loading="lazy" width="1200" height="900"/></button>)}</div><dialog ref={dialog} className="gallery-dialog" aria-label={`${c.photo} ${selected}`} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}><button className="gallery-close" aria-label={c.close} onClick={()=>dialog.current?.close()}><X aria-hidden="true"/></button><img src={`/gallery/couple-${selected}.webp`} alt={`${c.photo} ${selected}`}/></dialog></section>;
}
