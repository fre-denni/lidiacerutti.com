//Make a radiant spark animation after you click with the mouse
//thanks to https://www.eduardbodak.com/ for the inspiration
const SparkManager = class {
  constructor() {
    this.isAnimating = false;
    this.cooldownTime = 120;
    this.styleSheet = document.createElement("style");
    document.head.appendChild(this.styleSheet);

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const setup = () => {
      if (isFinePointer.matches) {
        document.body.addEventListener("pointerdown", (e) =>
          this.handleClick(e),
        );
      }
    };

    setup();
  }

  createAnimation(name, angle) {
    const i = `translate(-50%, -50%) rotate(${angle}deg) translate(8px, 0px)`;
    const s = `${i} translate(16px, 0px) scale(0.5, 0.75)`;
    const n = `${s} translate(6px, 0) scale(0, 0)`;

    const rule = `@keyframes ${name} { 0%{transform:${i}} 65%{transform:${s}} 100%{transform:${n}} }`;
    this.styleSheet.sheet.insertRule(
      rule,
      this.styleSheet.sheet.cssRules.length,
    );
  }

  handleClick(t) {
    this.isAnimating = true;
    setTimeout(() => (this.isAnimating = false), this.cooldownTime);

    for (let e = 1; e < 5; e++) {
      const angle = -45 * e;
      const name = `spk_${angle.toString().replace("-", "n")}`;

      // Only create the animation if it doesn't exist yet
      if (![...this.styleSheet.sheet.cssRules].some((r) => r.name === name)) {
        this.createAnimation(name, angle);
      }

      const spark = document.createElement("div");
      spark.className = "spark";
      spark.style.cssText = `left:${t.pageX}px; top:${t.pageY}px; animation:${name} 400ms ease-out both;`;
      spark.setAttribute("aria-hidden", "true");

      document.body.append(spark);
      setTimeout(() => spark.remove(), 800);
    }
  }
};

new SparkManager();
