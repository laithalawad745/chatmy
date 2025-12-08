'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

// تسجيل ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const gallery1Ref = useRef(null);
  const gallery2Ref = useRef(null);

  useGSAP(() => {
    // النص الأول: من اليسار إلى اليمين
    gsap.fromTo(
      text1Ref.current,
      { x: '-100%' },
      {
        x: '0%',
        scrollTrigger: {
          trigger: text1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // القسم الأول (الصور): من اليمين إلى اليسار
    gsap.fromTo(
      gallery1Ref.current,
      { x: '100%' },
      {
        x: '-100%',
        scrollTrigger: {
          trigger: gallery1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // القسم الثاني (الصور): من اليسار إلى اليمين
    gsap.fromTo(
      gallery2Ref.current,
      { x: '-100%' },
      {
        x: '100%',
        scrollTrigger: {
          trigger: gallery2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // النص الثاني: من اليسار إلى اليمين
    gsap.fromTo(
      text2Ref.current,
      { x: '-100%' },
      {
        x: '0%',
        scrollTrigger: {
          trigger: text2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* مسافة في البداية */}
      <div style={{ height: '50vh' }}></div>

      {/* النص الأول */}
      <section className="demo-text" style={{ overflow: 'hidden', padding: '50px 0' }}>
        <div
          ref={text1Ref}
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            letterSpacing: '0.5rem',
          }}
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
      </section>

      {/* القسم الأول - الصور من اليمين لليسار */}
      <section className="demo-gallery" style={{ overflow: 'hidden', padding: '50px 0' }}>
        <ul
          ref={gallery1Ref}
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
        </ul>
      </section>

      {/* القسم الثاني - الصور من اليسار لليمين */}
      <section className="demo-gallery" style={{ overflow: 'hidden', padding: '50px 0' }}>
        <ul
          ref={gallery2Ref}
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
          <li style={{ flexShrink: 0 }}>
            <Image src="/map.png" alt="Description" width={500} height={300} />
          </li>
        </ul>
      </section>

      {/* النص الثاني */}
      <section className="demo-text" style={{ overflow: 'hidden', padding: '50px 0' }}>
        <div
          ref={text2Ref}
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            letterSpacing: '0.5rem',
          }}
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
      </section>

      {/* مسافة في النهاية */}
      <div style={{ height: '50vh' }}></div>
    </div>
  );
}