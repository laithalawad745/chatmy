'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GSAPAnimation() {
  const boxRefs = useRef([]);

  useGSAP(() => {
    // إنشاء Timeline واحد يتحكم بالكل
    const tl = gsap.timeline({ 
      repeat: -1  // كرر كل القصة لا نهائياً
    });

    // القصة بالترتيب مع تداخل الحركات:
    
    // 1. البوكس الأحمر يتحرك
    tl.to(boxRefs.current[0], { 
      x: 500, 
      scale: 2, 
      rotation: 180,
      borderRadius: "50%",
      duration: 2
    })
    
    // 2. البوكس الأحمر يرجع
    .to(boxRefs.current[0], { 
      x: 0, 
      scale: 1, 
      rotation: 0,
      borderRadius: "0%",
      duration: 2
    })
    
    // 3. البوكس الأخضر يتحرك (يبدأ قبل نهاية الأحمر بثانية)
    .to(boxRefs.current[1], { 
      x: 500, 
      scale: 2,
      rotation: 180,
      borderRadius: "50%",
      duration: 2
    }, "-=4")  // يبدأ قبل نهاية الأحمر بثانية
    
    // 4. البوكس الأخضر يرجع
    .to(boxRefs.current[1], { 
      x: 0, 
      scale: 1,
      rotation: 0,
      borderRadius: "0%",
      duration: 2
    })
    
    // 5. البوكس الأزرق يتحرك (يبدأ قبل نهاية الأخضر بنص ثانية)
    .to(boxRefs.current[2], { 
      x: 500, 
      scale: 2, 
      rotation: 180,
      borderRadius: "50%",
      duration: 2
    }, "-=3")  // يبدأ قبل نهاية الأخضر بنص ثانية
    
    // 6. البوكس الأزرق يرجع
    .to(boxRefs.current[2], { 
      x: 0, 
      scale: 1,
      rotation: 0,
      borderRadius: "0%",
      duration: 2
    })

  });

  return (
    <div className="w-screen h-screen bg-gray-900 p-12">
      <div ref={(el) => boxRefs.current[0] = el} 
           className="w-24 h-24 bg-red-500 mb-32"></div>
      
      <div ref={(el) => boxRefs.current[1] = el} 
           className="w-24 h-24 bg-green-500 mb-32"></div>
      
      <div ref={(el) => boxRefs.current[2] = el} 
           className="w-24 h-24 bg-blue-500 mb-32"></div>
    </div>
  );
}
