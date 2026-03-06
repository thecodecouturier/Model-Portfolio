**Name of the project:** Model Portfolio Platform

**Description of the project and the role of the participant:** A multi-page digital portfolio platform designed to showcase creative works in the fashion industry. The project features an interactive frontend with animations, a custom navigation bar, multi-language support, portfolio galleries with lightbox functionality, and contact pages, all built with HTML, CSS, and Vanilla JavaScript. The backend dashboard for content management is planned for future development.

I started developing this website out of my passion for fashion elegance, and modeling, alongside my studies. Every section of the interface is crafted with care, with every detail selected to reflect my artistic taste and style.

**Link to the project's website:** https://capable-sable-e69d10.netlify.app/

---

# Model Portfolio Platform - Professional Creative Portfolio

## Project Overview

A professional multi-page digital portfolio platform designed to showcase creative works in the fashion industry. The project is currently under development and aims to build a complete system combining an interactive frontend with a backend dashboard for content management.

### Current Project Status:
- Actively under development
- Responsive design completed only for Portfolio and Contact pages
- Home and About pages still require responsive completion
- All current data and images are temporary placeholders
- Next phase: Build a full Dashboard for backend management

---

## Technical Architecture

### Frontend - Pure Web Technologies
- **HTML5**: Semantic and structured markup
- **CSS3**: Responsive design with visual effects
- **Vanilla JavaScript**: Pure JS without frameworks
- **GSAP**: Advanced animation library (used in About page)
- **Color Thief**: Extract dominant colors from images (Portfolio pages)
- **Google Translate API**: Multi-language support with custom UI

### Planned Backend (Blueprint)
- **Dashboard Panel**: Full admin panel for content management
- **Content Management**: Edit texts and paragraphs
- **Image Management**: Upload and replace images
- **Dynamic Updates**: Real-time frontend updates
- **Database Integration**: Store all content in a database

### Design Philosophy
- **Minimalist Elegance**: Clean, content-focused design
- **Custom Typography**: Playfair Display, Montserrat, Cormorant Garamond
- **Dark Theme**: Dark backgrounds with golden accents (#e0c097)

---

## Actual Project Structure

```
My Profile/
├── Home.html                           # Home page (responsive incomplete)
├── Home page/
│   ├── styles.css                      # Styles for Home page
│   ├── script.js                       # Interactions & animations
│   ├── Photos/                         # Placeholder images
│   └── SVG/                            # Custom SVG icons
│       ├── SVG1.svg                    # Rotation indicator
│       └── Tap.svg                     # TAP button icon
│
├── About page/
│   ├── index.html                      # About page (responsive incomplete)
│   ├── style.css
│   ├── script.js
│   └── 1.jpg, 2.jpg, 3.jpg            # Placeholder images
│
├── Contact page/
│   ├── index.html                      # Contact page (responsive complete)
│   ├── style.css
│   ├── script.js
│   └── 1.jpeg                          # Placeholder image
│
├── Portfolio pages/                    # (Responsive complete)
│   ├── Runway page/
│   ├── Fashion page/
│   ├── Beauty page/
│   ├── Campaign page/
│   ├── Editorial page/
│   ├── Lifestyle page/
│   ├── Accessories page/
│   └── My Designs page/
│       Each contains:
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       └── images/                     # 6 placeholder images per section
│
└── Components/
    ├── navbar.html                     # Reusable navigation bar
    ├── navbar.css                      # ~400 lines of custom styling
    ├── navbar.js                       # ~250 lines of interactions + Google Translate
    ├── navbar-utils.js                 # Helper functions for path resolution
    └── logo 1.2.png
```

---

## Page Details

### 1. Home Page (Home.html)

**Status**: Under development - responsive design incomplete

#### Main Sections:

**A. Header Section**
- **Designer Name**: Adrien Jalbtier with fade-in effect
- **Tagline**: Descriptive line ("I embody the royal shadow…")
- **Social Links**: Instagram, Threads, LinkedIn, Email
- **Creative Trigger Button**: "My Essence" with per-letter animation
  - Text: "* My Essence *"
  - Each letter appears individually with transition delay
  - Special handling for spaces (&nbsp;) and stars (opacity: 0.5)
  - 3D hover effect (translateY, scale, textShadow)

**B. Creative Vision Message**
- Long message displayed on clicking "My Essence"
- 20 lines of creative text
- Gradual line-by-line fade-in (400ms each)
- Unique disappearing effect:
  - Each word wrapped in `<span class="vision-word">`
  - Brightness: 1 → 3 → 2 → 0
  - Blur: 0 → 1px → 3px
  - Rotation & scale synchronized
  - Total disappearance: ~3.5 seconds
- Auto-hide after 5 seconds
- Instant hide on scroll

**C. About Section Preview**
- Title: "ADRIANO IN DETAILS"
- Two short intro paragraphs
- "LOAD MORE DETAILS" button linking to full About page
- Side image (9.png)

**D. Signature Section**
- Title: "MY SIGNTURE" (note: typo preserved from original code)
- **Horizontal Scroll Gallery**
  - 5 signature images
  - Smooth horizontal scroll
  - Dot navigation
  - Play/Pause button (4s per image)
  - End of gallery: button changes to "↻" for restart
- **TAP Button**
  - Fixed at bottom-right corner
  - Opens Lightbox with full slider copy
  - Custom SVG (Tap.svg)

**E. Portfolio Grid Section**
- **Filter Box**: Double-width container
  - Title: "OF MY WORKS"
  - 9 Filter Buttons:
    1. All (default)
    2. Runway
    3. Fashion
    4. Campaign
    5. Editorial
    6. Beauty
    7. Lifestyle
    8. Accessories
    9. My Designs
  - Flexbox wrap for responsive alignment
- **Portfolio Items**: 4 placeholder images
  - Each image with data-tag for filtering
  - Show/hide based on selected filter
- **Load More Box**
  - "LOAD MORE WORKS" link
  - Updates dynamically per selected filter
  - Links to the respective Portfolio page

**F. Aura Quotes Section**
- Horizontal layout: left image + right text
- Title: "AURA QUOTES"
- **Quotes Slider**
  - 3 quotes in French, English, Arabic
  - Each with data-gradient
  - Arrow + dot navigation
  - Smooth horizontal scroll
  - Gradient activates on active card
  - Threads Link: Direct link

**G. Footer**
- Dynamic copyright year (JavaScript)

#### Interactions & Animations (script.js)

1. **Header Animation Sequence**
   - Timing: 200ms → Overlay appears
   - +600ms → Name appears
   - +600ms → Tagline appears
   - +600ms → Social Links appear
   - +600ms → "My Essence" appears letter-by-letter

2. **Scroll Effects**
   - Track `window.scrollY`
   - Trigger Point: 300px
   - Fade-out elements with scroll:
     - Name: opacity 1 → 0 over 180px
     - Tagline: opacity 1 → 0 over 240px
     - Social Links: opacity 1 → 0 over 300px
     - Overlay: opacity 1 → 0 over 360px
   - Uses `requestAnimationFrame` for performance

3. **Vision Message Controls**
   - Variables: `isVisionMessageVisible`, `isDisappearing`, `isNaturalDisappearance`, `visionMessageTimeout`
   - Two disappearance modes:
     1. Natural (after 5s)
     2. Instant (on scroll)

4. **Signature Slider Logic**
   - Image width + gap calculation (40px)
   - Smooth scroll to target position
   - Update dots on scroll
   - AutoPlay every 4 seconds
   - 3 button states: ▶ / ❚❚ / ↻

5. **Lightbox System**
   - Full slider copy
   - Disable body scroll: `document.body.style.overflow = "hidden"`
   - Close via X, click outside, Escape key

6. **Portfolio Filter System**
   - Track active button
   - Display control: block/none
   - Dynamic "Load More" link update
   - Filter logic: `data-filter === data-tag`

7. **Aura Quotes Slider**
   - Scroll listener
   - Current index calculation
   - Apply gradient on active card
   - Arrows + interactive dots

---

### 2. About Page (About page/index.html)

**Status**: Under development - responsive design incomplete

#### Components:

**A. Side Counter**
- 4 numeric steps (01, 02, 03, 04)
- First active by default
- Tracks page progress

**B. Header**
- Title: "ADRIANO IN DETAILS"
- Decorative divider

**C. Slider Sections (4 Sections)**

**Section 1 - Image Left + Text Right:**
- Zoomable image (zoom-wrapper)
- "Tap to see lookbook" button
- Two text paragraphs
- RTL direction

**Section 2 - Text Left + Image Right:**
- Same content reversed
- Same interactions

**Section 3 - Image Left + Text Right:**
- Repeat Section 1 pattern

**Section 4 - Measurements + Image:**
- **Full Measurements Section**
  - Essential Measurements (9)
  - Detailed Measurements (8)
  - Values currently empty (`<span class="measure-value"></span>`)
  - Placeholder data to be filled from Dashboard later

**D. Lightbox**
- Image enlargement system
- Same design as Portfolio Lightbox
- Navigation arrows, counter, Play button

**E. Footer**
- Dynamic year

#### Libraries Used
- **GSAP 3.12.2**: Advanced animations
- **ScrollTrigger**: Scroll-based triggers

---

### 3. Contact Page (Contact page/index.html)

**Status**: Fully responsive

#### Components:

**A. Page Header**
- Title: "Let's Get in Touch"
- Intro text

**B. Contact Form**
- Fields:
  1. First Name (required)
  2. Last Name (required)
  3. Email (required)
  4. Message textarea (required)
- Custom submit button
- Name fields side-by-side (`.name-fields`)

**C. Image Section**
- Zoom effect on hover

**D. Footer**
- Dynamic copyright

#### Notes
- Fully responsive
- Works on all screen sizes
- Form ready (backend not integrated yet)

---

### 4. Portfolio Pages (8 Separate Pages)

**Status**: Fully responsive

#### Pages:
1. Runway
2. Fashion
3. Beauty
4. Campaign
5. Editorial
6. Lifestyle
7. Accessories
8. My Designs

#### Unified Structure:

**A. Glass Navigation Bar**
- Transparent with blur
- Logo: Designer name
- Links: Home, About, Portfolio (dropdown), Contact
- Portfolio Dropdown: All 8 categories
- Language Selector: 10 languages (EN, FR, IT, ES, DE, PT, RU, JA, KO, AR) with flags
- Google Translate API integration
- Hamburger menu for small screens

**B. Side Menu (Mobile)**
- Slide-in menu
- Close button (SVG)
- Same links
- Expandable Portfolio section

**C. Page Header**
- Section title (e.g., "Fashion")
- Decorative divider

**D. Gallery Grid**
- 6 placeholder images per page
- Responsive grid layout
- `.gallery-img-wrapper` for each image
- Overlay color extracted via Color Thief
- Fallback: `rgba(0, 0, 0, 0.6)`

**E. Lightbox System**
- Header controls: Play/Pause, image counter, close button
- Navigation arrows
- Slideshow: Play (2s), Pause, Restart ⟳
- Prevent body scroll during Lightbox

**F. JavaScript Functionality**
1. Color Thief Integration
2. Lightbox Logic
3. Navigation Interactions
4. Dynamic Year Update

---

## Custom Navbar Component - Technical Innovation

### Overview
- Fully custom navigation with Google Translate API hijacking
- Full design control, reusable across all pages

### Why Special?
- Standard Google Translate: ugly, uncustomizable
- Custom solution hides original widget, builds custom UI
- Full 10-language support, flags, smart path resolution

### How It Works
1. Hide original Google Translate element
2. Build 100% custom UI
3. Programmatically trigger translations
4. Save language preference via localStorage
5. Reusable via Fetch API

### Responsive Features
- Hamburger menu <768px
- Slide-in side menu
- Portfolio dropdown toggle
- Scroll detection to hide menus
- Async script loading

---

## Technical Stats

| Component | Code | Purpose |
|-----------|------|---------|
| navbar.html | ~100 lines | Structure |
| navbar.css | ~400 lines | Styling + Responsive |
| navbar.js | ~250 lines | Interactions + Google Translate |
| navbar-utils.js | ~30 lines | Path Resolution |
| **Total** | **~780 lines** | **Complete component** |

---

## Advanced Features Implemented

1. Custom Navbar + Google Translate integration
2. Per-character animation in Home page
3. Vision disappearing effect
4. Scroll-based opacity
5. Dynamic color extraction from images
6. Smart filter system

---

## Technologies & Tools

### Core
- HTML5, CSS3, Vanilla JS, SVG graphics

### Libraries
- GSAP 3.12.2
- ScrollTrigger
- Color Thief 2.6.0
- Google Translate API
- Font Awesome 6.5.0

### Fonts
- Playfair Display
- Montserrat
- Cormorant Garamond
- EB Garamond
- Libre Baskerville

### External Resources
- Google Fonts
- Flagcdn.com
- CDNJS

---

## Project Metrics

- 13 HTML pages
- 12+ CSS files
- 12+ JS files
- 50+ placeholder images
- 2 custom SVGs
- 10 supported languages
- 3 responsive breakpoints
- ~5000+ lines of code

---

## Completed Features

- Custom Navbar Component (Google Translate hijacking, reusable, responsive)
- 8 Portfolio Pages (lightbox, color extraction, multi-language)
- Contact Page (form, responsive, image zoom)
- Home Page (Creative Vision, Signature slider, Portfolio filter, Aura quotes, social media)
- About Page (GSAP animations, multi-section slider, measurements, lightbox)

---

## In Development

- Home & About responsiveness
- Backend dashboard and content management
- Replace placeholder data
- SEO & performance optimization

---

## Next Phases

1. **Phase 1**: Complete pages, Navbar, Portfolio & Contact responsiveness
2. **Phase 2**: Dashboard UI, Backend API, Database, CMS, Image upload
3. **Phase 3**: Replace placeholder content, optimize, launch

---

## Design & Colors

### Color Palette
- **Primary Gold**: `#e0c097`
- **Deep Black**: `#0a0a0a`
- **Background**: `#1a1a1a`
- **Pure White**: `#ffffff`
- **Accent**: `rgba(224, 192, 151, 0.8)`

---

## Conclusion

This project is a multi-page creative portfolio in advanced development, featuring:

1. Custom Navbar with unique Google Translate integration
2. Component-based architecture for reusability
3. Fully custom animations
4. Smart systems: filter, path resolution, color extraction
5. Modern UI/UX with Glass Morphism

Completed parts function efficiently, next focus is a full Dashboard to turn the project into a complete content management system.

---

**Built with Precision & Passion**  
*A Work in Progress, Crafted with Innovation*
