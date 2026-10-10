const container = document.querySelector('.parallax-container');

const layers = [
  { el: document.querySelector('.sky'),      depth: 0 },
  { el: document.querySelector('.cloud-1'),  depth: 30},
  { el: document.querySelector('.cloud-2'),  depth: 30 },
  { el: document.querySelector('.cloud-3'),  depth: 30 },
  { el: document.querySelector('.mountain'), depth: 20 },
  { el: document.querySelector('.sea'),      depth: 25 },
  { el: document.querySelector('.ship'),     depth: 55 },
  { el: document.querySelector('.man'),      depth: 45 },
  { el: document.querySelector('.wind1'),    depth: 55 },
  { el: document.querySelector('.wind2'),    depth: 55 },
  { el: document.querySelector('.wind3'),    depth: 55 },
];

container.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  // -0.5 to 0.5 range based on cursor position relative to screen center
  const xRatio = (clientX / innerWidth) - 0.5;
  const yRatio = (clientY / innerHeight) - 0.5;

  layers.forEach(({ el, depth }) => {
    const moveX = xRatio * depth;
    const moveY = yRatio * depth;
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});


const heading = document.querySelector('.hero-content h1');
const text = heading.textContent;
const startDelay = 1.2; // seconds before the animation begins at all
const staggerPerLetter = 0.07; // gap between each letter

heading.innerHTML = text
  .split('')
  .map((char, i) => `<span style="animation-delay: ${startDelay + i * staggerPerLetter}s">${char === ' ' ? '&nbsp;' : char}</span>`)
  .join('');