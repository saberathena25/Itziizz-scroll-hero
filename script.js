const headline = document.getElementById('headline');
    const text = 'WELCOME ITZFIZZ';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00a0' : char;
      span.style.transitionDelay = `${index * 45}ms`;
      headline.appendChild(span);
    });

    const spans = headline.querySelectorAll('span');
    const eyebrow = document.querySelector('.eyebrow');
    const subline = document.querySelector('.subline');
    const stats = document.querySelectorAll('.stat');
    const visual = document.getElementById('visual');
    const progressBar = document.getElementById('progressBar');
    let ticking = false;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }
    function lerp(a, b, t) { return a + (b - a) * t; }

    function introWithGSAP() {
      if (window.gsap) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(eyebrow, { opacity: 1, y: 0, duration: .7 })
          .to(spans, { opacity: 1, y: 0, duration: .75, stagger: .035 }, '-=.35')
          .to(subline, { opacity: 1, y: 0, duration: .7 }, '-=.35')
          .to(visual, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1.25, ease: 'power4.out' }, '-=.5')
          .to(stats, { opacity: 1, y: 0, duration: .7, stagger: .13 }, '-=.65');
      } else {
        requestAnimationFrame(() => {
          eyebrow.style.opacity = 1; eyebrow.style.transform = 'translateY(0)';
          spans.forEach(s => { s.style.opacity = 1; s.style.transform = 'translateY(0)'; });
          subline.style.opacity = 1; subline.style.transform = 'translateY(0)';
          visual.style.opacity = 1; visual.style.transform = 'translate(-50%, -43%) translateY(0) scale(1) rotate(0deg)';
          stats.forEach((s, i) => setTimeout(() => { s.style.opacity = 1; s.style.transform = 'translateY(0)'; }, i * 120));
        });
      }
    }

    function updateScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progressBar.style.transform = `scaleX(${pageProgress})`;

      const heroProgress = clamp(window.scrollY / window.innerHeight, 0, 1);
      const eased = heroProgress * heroProgress * (3 - 2 * heroProgress);

      // Scroll-linked transform only: no layout-changing properties are updated here.
      const y = lerp(0, -170, eased);
      const x = lerp(0, 16, eased);
      const scale = lerp(1, 1.18, eased);
      const rotate = lerp(0, 8, eased);
      visual.style.transform = `translate(calc(-50% + ${x}px), calc(-43% + ${y}px)) scale(${scale}) rotate(${rotate}deg)`;

      headline.style.transform = `translateY(${-eased * 42}px)`;
      headline.style.opacity = String(lerp(1, .35, eased));
      stats.forEach((stat, i) => {
        stat.style.transform = `translateY(${eased * (18 + i * 5)}px)`;
        stat.style.opacity = String(lerp(1, .55, eased));
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', introWithGSAP);
    window.addEventListener('resize', updateScroll);
    updateScroll();
