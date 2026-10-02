[README.md](https://github.com/user-attachments/files/32952649/README.md)
# ItzFizz Scroll Hero

A complete scroll-driven hero website built with plain HTML, CSS and JavaScript.

## Run

1. Extract the ZIP.
2. Open the folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Scroll down from the hero.

## Main files

- `index.html` — page structure
- `style.css` — layout and visual styling
- `script.js` — scroll-linked animation
- `assets/samurai.svg` — standalone samurai artwork

## Scroll behavior

The animation is driven by `window.scrollY`. It calculates a normalized scroll progress from `0` to `1`, then interpolates toward that value on `requestAnimationFrame`.

The vehicle moves diagonally and rotates slightly.
The samurai follows a separate curved path using the same scroll progress.
No time-based autoplay is used.

## Replace the samurai

If you have a transparent PNG/WebP samurai, replace:

`assets/samurai.svg`

and change the image source in `index.html` to your file, for example:

`assets/samurai.png`

A transparent image is recommended for the cleanest result.
