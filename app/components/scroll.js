'use client';
import {useRef} from 'react';
import {gsap} from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home () {
  const boxRefs = useRef([]);
  useGSAP (() =>{
    const tl  = gsap.timeline({
      scrollTrigger : {
        trigger: boxRefs.current[0],
        start: "top top",
        pin: true,
        scrub: true,
      },
    });
    
    tl.to(boxRefs.current[1], {
      x: 500,
      scale: 2,
      rotation: 180,
      borderRadius: "50%",
    })
  });

  return (                          
    <div> 
      <div ref={(el) => boxRefs.current[0] = el} className='h-[50vh] mx-4 my-4'> 
        <div ref={(el) => boxRefs.current[1] = el} className=' bg-red-500 w-24 h-24'> </div>
      </div>
      <div className='h-[50vh] bg-red-200'> 
        <h1>GSAP Animation</h1>
      </div>
    </div>
  )
}