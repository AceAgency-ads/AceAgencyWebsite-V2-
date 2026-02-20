'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins once — prevents duplicate registration and tree-shaking issues.
// All components must import gsap, useGSAP, ScrollTrigger, and SplitText from this module,
// never directly from 'gsap' or '@gsap/react'.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Global animation defaults — establishes consistent timing rhythm across all pages.
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

export { gsap, useGSAP, ScrollTrigger, SplitText };
