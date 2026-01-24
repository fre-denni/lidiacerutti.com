// Main scrolling and animation code
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* HELPER FUNCTION FROM GSAP
Returns a FUNCTION that you can feed an element to get its scroll position.
- targets: selector text, element, or Array of elements
- config: an object with any of the following optional properties:
- start: defaults to "top top" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
- containerAnimation: the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
- pinnedContainer: if you're pinning a container of the element(s), you must define it so that ScrollTrigger can make the proper accommodations.*/
function getScrollLookup(
  targets,
  { start, pinnedContainer, containerAnimation },
) {
  let triggers = gsap.utils.toArray(targets).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: start || "top top",
        pinnedContainer: pinnedContainer,
        refreshPriority: -10,
        containerAnimation: containerAnimation,
      }),
    ),
    st = containerAnimation && containerAnimation.scrollTrigger;
  return (target) => {
    let t = gsap.utils.toArray(target)[0],
      i = triggers.length;
    while (i-- && triggers[i].trigger !== t) {}
    if (i < 0) {
      return console.warn("target not found", target);
    }
    return containerAnimation
      ? st.start +
          (triggers[i].start / containerAnimation.duration()) *
            (st.end - st.start)
      : triggers[i].start;
  };
} //getScrollLookup()

//--- Control the main horizontal scrolling
let container = document.querySelector("#scrollbox");
let contents = container.querySelectorAll(".content");

let smoother = ScrollSmoother.create({
  content: "#smooth-content",
  smooth: 2,
  smoothTouch: 0.1,
  effects: true,
}); //define ScrollSmoother object

let horizontalTween = gsap.to(contents, {
  xPercent: -100 * (contents.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: true,
    markers: true,
  },
}); //define main horizontal animation

let getPosition = getScrollLookup(".content", {
  containerAnimation: horizontalTween,
  start: "left left",
}); // find dinamically the position of the sections

//add logic for mobile
//scrollSmoother is ok (<- manage garbage?)
//matchmedia?
//vertical animation
//get position vertical

//Control the header link scrolling
let home = document.querySelector("#home-lnk");
let about = document.querySelector("#about-lnk");
let works = document.querySelector("#works-lnk");
let footer = document.querySelector("#footer-lnk");

let startingPosition = "left left"; //to change to "top top" in mobile

home.addEventListener("click", (e) => {
  smoother.scrollTo(getPosition("#home"), true, startingPosition);
});

about.addEventListener("click", (e) => {
  smoother.scrollTo(getPosition("#about"), true, startingPosition);
});

works.addEventListener("click", (e) => {
  smoother.scrollTo(getPosition("#works"), true, startingPosition);
});

footer.addEventListener("click", (e) => {
  smoother.scrollTo(getPosition("#footer"), true, startingPosition);
});
