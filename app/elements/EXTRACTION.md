# Royal Vows effects extraction

Source supplied by user: `royal-vows-website.zip`.

- `royal-vows-download/assets/routes-BH302NXA.js`: seeded petal generator (function `o`) and canvas scratch component (`destination-out`, 46 px brush, 70% cleared threshold).
- `royal-vows-download/assets/styles-VVoNKiZ_.css`: `petal-fall` keyframes.

Readable adaptation: `effects.tsx`; supporting styles: `review.css`.

Usage: render `<Petals />` and `<ScratchDate />` inside the `.er` styled container, as demonstrated by `page.tsx` at `/elements`.

Changes: burgundy/gold colours, 27 January 2027 date, accessible reveal alternative, replay/reset, pointer cancellation cleanup, resize observer cleanup, motion pause and reduced-motion initial state. Petals remain decorative and do not intercept taps. The review page uses local fonts and no additional dependencies.

Unrelated bundled scripts, telemetry, music, guest information and original event dates were not imported.
