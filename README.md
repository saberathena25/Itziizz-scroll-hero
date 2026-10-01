# ItzFizz — Scroll-Driven Hero Section

A frontend animation assignment built with HTML, CSS, JavaScript and GSAP. The hero uses scroll position as the animation timeline, with transform-based movement for smooth interaction.

## Features

- Full-screen hero section
- Letter-spaced `WELCOME ITZFIZZ` headline
- Staggered intro animation
- Animated impact metrics
- Scroll-linked visual movement
- Smooth easing/interpolation
- requestAnimationFrame scroll handling
- Transform-based animation for performance
- Responsive mobile layout
- CSS-built hero visual with no required image asset
- GitHub Pages compatible

## Run locally

Open `index.html` directly in a browser, or use VS Code Live Server.

## GitHub Pages deployment

1. Create a GitHub repository, for example `itzfizz-scroll-hero`.
2. Upload `index.html` and `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and wait for GitHub Pages to publish.
7. Your URL will be:

`https://YOUR-USERNAME.github.io/itzfizz-scroll-hero/`

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- GSAP 3
- Google Fonts

## Assignment mapping

### Hero layout
Full-screen hero, letter-spaced headline and three percentage/statistic blocks.

### Initial load
Headline characters reveal in sequence, followed by the supporting copy, visual and statistics.

### Scroll animation
The visual object changes position, scale and rotation based directly on scroll progress.

### Performance
Scroll events use `requestAnimationFrame`, while visual movement is performed through CSS transforms rather than layout properties.
