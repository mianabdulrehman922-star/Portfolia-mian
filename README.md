# Abdulrehman — Front-End Developer Portfolio

A standalone, premium dark-theme personal portfolio. No backend, no database, no dependency on any other project — plain HTML5, CSS3 and vanilla JavaScript, ready to host anywhere static (GitHub Pages, Vercel, Netlify, cPanel).

---

## 1. Project structure

```
index.html        Single-page site — every section lives here
css/style.css       Design system: dark theme, gradient accents, all components
js/script.js         Project data, nav/scroll behavior, form logic
images/               Empty — every visual (hero graphic, project thumbnails,
                      icons) is built with inline SVG + CSS gradients, so
                      there's nothing broken to fall back on and no external
                      image weight. Add real project screenshots here later
                      if you want photographic thumbnails (see section 3).
```

## 2. The 5 project links

Used **exactly as provided**, unmodified, each opening in a new tab (`target="_blank" rel="noopener noreferrer"`):

1. Academy Nova Hub — `https://academy-nova-hub.lovable.app/`
2. Rustic Table — `https://rustic-table-dishup.lovable.app/`
3. Gold Royal Fitness — `https://gold-royal-fitness.lovable.app/`
4. Real Project — `https://mianabdulrehman922-star.github.io/real/`
5. VU Learn Nova — `https://mianabdulrehman922-star.github.io/vu-learn-nova/`

All five live in one array at the top of `js/script.js` (`PROJECTS`) — title, description, tech badges, and URL together. The project grid renders from that array, so adding a 6th project later means adding one object there, not touching the HTML.

## 3. Project thumbnails

Each project card shows a **live screenshot of the real project URL**, pulled on-demand via [thum.io](https://thum.io) — a free screenshot service that needs no API key. The browser requests something like:

```
https://image.thum.io/get/width/720/crop/450/noanimate/https://academy-nova-hub.lovable.app/
```

and gets back a current image of that actual live site. If that request ever fails (slow connection, the free service is rate-limited, etc.), the `onerror` handler hides the broken image and the gradient-+-icon placeholder underneath it (already built for exactly this case) shows instead — never a broken-image icon.

**To use your own real screenshots instead:** take a screenshot of each project, save it into `images/`, and in `js/script.js` replace the `<img src="https://image.thum.io/...">` line in the `projectsGrid.innerHTML` template with `<img src="images/yourfile.jpg" ...>`. That's a more reliable long-term option than depending on a third-party service, especially once the free tier's rate limit is a concern.

## 4. Contact form — Formspree-ready, not a fake backend

The form validates client-side and, right now, tells the visitor to email or WhatsApp directly instead of pretending to submit anywhere. To make it actually send:

1. Create a free form at [formspree.io](https://formspree.io), set the receiving address to `mianabdulrehman922@gmail.com`.
2. Copy the endpoint it gives you (`https://formspree.io/f/xxxxxxx`).
3. Paste it into `js/script.js`:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```

That's the only change needed — the fetch/submit logic is already wired up.

(An EmailJS integration would work the same way: swap the `fetch()` call in the form's submit handler for `emailjs.send(...)`.)

## 5. Placeholders you may want to update

- `js/script.js` → `WHATSAPP_NUMBER` is already set to `923079657528` (from `03079657528`).
- GitHub icon in the hero is intentionally **not a link** (no real GitHub URL was provided) — it's shown greyed-out with a "coming soon" tooltip rather than pointing anywhere fake. Once there's a real GitHub profile, give that `<a class="social-btn">` in `index.html` a real `href` and remove `aria-disabled="true"` / `tabindex="-1"`.
- Favicon is a minimal inline placeholder — swap the `<link rel="icon">` in `index.html` for a real favicon file once you have one.

## 6. Design notes

Deep charcoal-blue background (`#0A0B10`) with blue/purple/cyan gradient accents used deliberately — the hero's animated orb + code-editor mockup is the one signature moment; everything else (skill cards, project cards, service cards) stays restrained: thin borders, a single hover lift, no gradient glow on every element. Space Grotesk carries the display type, Plus Jakarta Sans the body copy, and JetBrains Mono the code snippet and small data labels — grounded in the fact that this is, specifically, a developer's site.
