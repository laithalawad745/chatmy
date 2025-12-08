'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function WaveAnimation() {
  const pinkWave = useRef(null);
  const blueWave = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // الموجة الوردية من أعلى اليسار
    tl.fromTo(pinkWave.current,
      {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0% 0%, 50% 50%, 50% 100%, 0% 100%)',
        duration: 2,
        ease: 'power3.inOut'
      }, 0)
    
    // الموجة الزرقاء من أعلى اليمين
    .fromTo(blueWave.current,
      {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      },
      {
        clipPath: 'polygon(100% 0%, 50% 50%, 50% 100%, 100% 100%)',
        duration: 2,
        ease: 'power3.inOut'
      }, 0);
  });

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      
      {/* الموجة الوردية - من أعلى اليسار */}
      <div 
        ref={pinkWave}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbbf24 100%)',
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          filter: 'blur(2px)'
        }}
      />

      {/* طبقة blur ناعمة للوردي */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 25% 70%, rgba(236, 72, 153, 0.9) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.8
        }}
      />

      {/* الموجة الزرقاء - من أعلى اليمين */}
      <div 
        ref={blueWave}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(225deg, #3b82f6 0%, #60a5fa 50%, #06b6d4 100%)',
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          filter: 'blur(2px)'
        }}
      />

      {/* طبقة blur ناعمة للأزرق */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 75% 70%, rgba(59, 130, 246, 0.9) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.8
        }}
      />

      {/* المحتوى */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        
        {/* عنوان */}
        <h1 className="text-6xl md:text-8xl font-bold text-slate-100 mb-6 text-center">
          منتج رائع
        </h1>
        
        {/* وصف */}
        <p className="text-xl md:text-2xl text-slate-300 mb-12 text-center max-w-2xl font-medium">
          تصميم احترافي بموجات عريضة وناعمة
        </p>

        {/* صورة منتج مثال */}
        <div className="w-64 h-64 md:w-96 md:h-96 bg-slate-800/60 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-slate-700/50 shadow-2xl">
          <div className="text-slate-300 text-6xl">📱</div>
        </div>

        {/* زر */}
        <button className="mt-12 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
          اطلب الآن
        </button>

      </div>

    </div>
  );
}