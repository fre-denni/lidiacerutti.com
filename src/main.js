// Main scrolling and animation code
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const contents = gsap.utils.toArray("#scrollbox .content");

gsap.to(contents, {
  xPercent: -100 * (contents.length - 1),
  scrollTrigger: {
    trigger: "#scrollbox",
    pin: true,
    scrub: 1,
  },
});
