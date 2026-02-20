'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once — prevents duplicate registration and tree-shaking issues.
// All components must import gsap, useGSAP, and ScrollTrigger from this module,
// never directly from 'gsap' or '@gsap/react'.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Global animation defaults — establishes consistent timing rhythm across all pages.
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

export { gsap, useGSAP, ScrollTrigger };
