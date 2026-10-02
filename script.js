const hero = document.getElementById("hero");
const visual = document.getElementById("visual");
const samurai = document.getElementById("samurai");
const heroCopy = document.querySelector(".hero-copy");
const progressLabel = document.getElementById("progressLabel");

let currentProgress = 0;
let targetProgress = 0;
let ticking = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function updateTargetProgress() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  targetProgress = clamp(window.scrollY / maxScroll, 0, 1);
  if (!ticking) {
    requestAnimationFrame(animate);
    ticking = true;
  }
}

function animate() {
  // Interpolation makes the movement follow scroll without feeling abrupt.
  currentProgress += (targetProgress - currentProgress) * 0.085;

  const p = currentProgress;
  const eased = easeOutCubic(p);

  // Hero copy: rises and fades as the user leaves the hero.
  const copyY = -eased * 210;
  const copyOpacity = 1 - clamp(p * 1.65, 0, 1);
  heroCopy.style.transform = `translate3d(0, ${copyY}px, 0)`;
  heroCopy.style.opacity = copyOpacity;

  // Main visual: travels diagonally and scales as scroll progresses.
  const vehicleX = eased * 360;
  const vehicleY = eased * -125;
  const vehicleScale = 1 - eased * 0.23;
  const vehicleRotate = eased * 7;

  visual.style.transform =
    `translate3d(calc(-50% + ${vehicleX}px), calc(-50% + ${vehicleY}px), 0) ` +
    `scale(${vehicleScale}) rotate(${vehicleRotate}deg)`;

  // Samurai: follows its own arc so it reads as a separate moving character.
  if (samurai) {
    const samuraiX = -eased * 500;
    const samuraiY = Math.sin(p * Math.PI) * -170;
    const samuraiScale = 1 + Math.sin(p * Math.PI) * 0.12;
    const samuraiRotation = (0.5 - p) * 10;
    const samuraiOpacity = p > 0.78 ? 1 - ((p - 0.78) / 0.22) : 1;

    samurai.style.transform =
      `translate3d(calc(-50% + ${samuraiX}px), calc(-50% + ${samuraiY}px), 0) ` +
      `scale(${samuraiScale}) rotate(${samuraiRotation}deg)`;
    samurai.style.opacity = samuraiOpacity;
  }

  if (progressLabel) {
    progressLabel.textContent = `${Math.round(p * 100).toString().padStart(2, "0")}%`;
  }

  // Keep animating while there is meaningful difference.
  if (Math.abs(targetProgress - currentProgress) > 0.0005) {
    requestAnimationFrame(animate);
  } else {
    currentProgress = targetProgress;
    ticking = false;
  }
}

window.addEventListener("scroll", updateTargetProgress, { passive: true });
window.addEventListener("resize", updateTargetProgress);

updateTargetProgress();
