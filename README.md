# Infinnovate Website Build

**Built:** 2026-03-10  
**Status:** Complete — Ready for review  

## Pages Built

| Page | File | Status |
|------|------|--------|
| Homepage | `index.html` | ✅ Complete |
| Programs | `programs.html` | ✅ Complete |
| Pricing | `pricing.html` | ✅ Complete |
| About | `about.html` | ✅ Complete |
| Contact | `contact.html` | ✅ Complete |
| For Schools (B2B) | `schools.html` | ✅ Complete |

## Shared Assets

| File | Description |
|------|-------------|
| `css/style.css` | Master stylesheet — mobile-first, 3 breakpoints (375/768/1024) |
| `js/main.js` | Nav, hamburger menu, stats counter, ESBIE timeline, AOS init |

## Design Features

- ✅ Mobile-first responsive (375px → 768px → 1024px)
- ✅ AOS scroll animations (CDN loaded)
- ✅ Ken Burns CSS effect on hero background
- ✅ Stats counter animation (IntersectionObserver-based)
- ✅ ESBIE timeline with staggered scroll-triggered reveal
- ✅ Pathway cards with hover-expand details
- ✅ Hamburger menu for mobile nav
- ✅ Sticky navbar with scroll effect
- ✅ Accessibility: skip links, focus-visible, reduced-motion support
- ✅ Lazy loading on images (`loading="lazy"`)
- ✅ Google Fonts: Cormorant Garamond + Inter

## Pending Items (Require External Input)

| Item | Action Needed |
|------|---------------|
| **Stripe integration** | Replace `#stripe-pending` href on pricing buttons with live Stripe payment links |
| **Formspree** | Replace `https://formspree.io/f/PLACEHOLDER` with actual Formspree form IDs (contact + schools forms) |
| **Google Maps embed** | Replace map placeholder div in `contact.html` with actual Google Maps iframe |
| **Hero background image** | Needs `hero-bg.webp` in `../raw media/processed/final_webp/` — currently references this path |
| **Sophia's title** | Team page shows "Team Member" — update when title confirmed |
| **Alice Kim's title** | Team page shows "Team Member" — update when title confirmed |

## Image References

All images use relative paths to the media folder:
- Logo: `../raw media/processed/logos/WHITE LOGO_bold (1).png`
- Jimmy photo: `../raw media/processed/final_webp/CHO03832.webp`
- Hero BG: `../raw media/processed/final_webp/hero-bg.webp`

## Known Issues

- Image paths contain spaces (`raw media`) — should work but consider renaming the directory if issues arise
- Pricing buttons link to `#stripe-pending` — non-functional until Stripe is configured
- Contact/Schools forms submit to Formspree placeholder — won't work until real form ID is set
- The 1:12 stat on the homepage doesn't animate (it's text, not a number) — displays statically as intended
- Schools page does NOT show $150/hr rate (as specified)

## Tech Stack

- Pure HTML/CSS/JS — no build tools required
- AOS 2.3.1 via CDN (scroll animations)
- Google Fonts via CDN
- Squarespace-ready: can paste into Code Blocks

## How to Preview

```bash
cd ~/AI_Team_Shared/projects/Infinnovate/build/
python3 -m http.server 8888
# Open http://localhost:8888
```
