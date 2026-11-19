# DylanOS: Design Document
*Personal site of Dylan Weicker, v1.0 draft, October 2026*

## 1. Vision
A personal website built like a desktop OS that never existed: Windows Vista's glass, Frutiger Aero's optimism, and some late-90s internet fun. A visitor should smile within two seconds and know who Dylan is and what Dylan builds within ten.

**One-line pitch:** *A sunny, glossy desktop where you can open Dylan's work, peek at the cats, and catch a dolphin jumping over a rainbow.*

### Design principles
1. **Content before chrome.** The OS metaphor wraps the content and never blocks it. The most important information is visible without understanding the metaphor.
2. **Joy in the details.** Every surface gets a small delight: a gloss highlight, a bubble, a sparkle, an easter egg. The delight should never slow anyone down.
3. **Curated, not complete.** Only the best few projects are shown, told well.
4. **Original, not copied.** The site evokes Vista and Aero without using any Microsoft assets, logos, sounds or wallpapers.
5. **Works for everyone.** It works on mobile, by keyboard, with screen readers and with reduced motion. Being fancy is no excuse for being inaccessible.

## 2. Audience & goals

| Visitor | What they want | What they should get within 30 seconds |
|---|---|---|
| Recruiter / hiring manager | Is Dylan a strong full-stack/AI dev? | Role, headline skills, 3 work case studies, résumé download |
| Potential client / collaborator | Can Dylan build my thing? | Case studies with problem → solution → stack; contact |
| Friend / new acquaintance | Who is Dylan, really? | Bio, hobbies, cats, photos, personality |

**Success looks like:** the visitor opens at least one project and one personal window, downloads the résumé or makes contact, and remembers the site.

## 3. Aesthetic direction

### 3.1 Mood
**Mood words:** sunny · glossy · bubbly · clean · optimistic · aquatic · playful · nostalgic.

**Frutiger Aero (the base, about 80%)**
- Big blue skies, white puffy clouds, rolling green grass
- Clear water, rising bubbles, koi and goldfish
- Glossy orbs and glass panels, aurora light ribbons, lens flares
- Chrome and nature together: technology that feels clean and alive

**Retro internet / vaporwave-lite (the accent, about 20%)**
- Leaping dolphins, rainbows, sparkles and stars, glitter
- Early-web artifacts: 88×31 badges, a visitor counter, "under construction" signs, a guestbook, webrings, marquee text, "Best viewed at 1024×768"
- Bubbly Y2K type and chrome highlights
- **Not used:** sunset grids, Greek busts, palm-tree dusk, neon-on-black, ironic glitch or VHS distortion.

**Mood board references** (for inspiration only, not to be copied):
- Vista and Windows 7 Aero glass
- Wii and DS system menus
- 2007-era iPod and iTunes gloss
- Windows Live Messenger
- The Frutiger Aero archive community
- Lisa Frank–style dolphin and rainbow imagery
- GeoCities

### 3.2 Colour palette
Light is the primary theme.

| Token | Hex | Use |
|---|---|---|
| `--sky-50` | `#F2FAFF` | Window body backgrounds |
| `--sky-100` | `#DDF2FF` | Panels, inputs |
| `--sky-300` | `#8FD3FF` | Glass tint, hover |
| `--sky-500` | `#2BA6F0` | Primary accent, links, focused title bars |
| `--sky-700` | `#0B6FB8` | Pressed states, headings |
| `--ink` | `#0E2A47` | Body text (AA on all light surfaces) |
| `--ink-soft` | `#3D5A78` | Secondary text |
| `--aqua` | `#3FE0D0` | Bubbles, success, water highlights |
| `--grass-400` | `#7BD148` | Hills, positive accents, "online" status |
| `--grass-600` | `#3E9E2A` | Grass shadow, green buttons |
| `--sun` | `#FFE36E` | Sun glow, stars, highlights |
| `--dolphin` | `#FF8AD8` | Retro accent (sparingly): sparkles, badges |
| `--lilac` | `#B79CFF` | Retro accent: rainbow, Messenger |
| `--rainbow` | `linear-gradient(90deg,#FF6B6B,#FFB86B,#FFE36E,#7BD148,#3FE0D0,#2BA6F0,#B79CFF)` | Rainbow motif, progress bars, start orb ring |
| `--glass` | `rgba(255,255,255,.55)` | Window chrome |
| `--gloss` | `linear-gradient(180deg,rgba(255,255,255,.95) 0%,rgba(255,255,255,.35) 48%,rgba(255,255,255,0) 52%)` | The classic "wet" highlight band |

**Dark mode is "Deep Water", not night-time.** For users who prefer dark mode, the world goes underwater: deep teal-blue water (`#04294A` → `#0A4D7A`), sun rays filtering down from the surface, glowing aqua bubbles, and the same glass at lower opacity. It is still bright, still Aero, and has no sunset or neon.

### 3.3 Typography

| Role | Font | Notes |
|---|---|---|
| UI / body | **Selawik** (open-source, Segoe-metric), fallback `"Segoe UI", system-ui` | The authentic Vista feel without shipping Segoe |
| Display / headings | **Frutiger** if installed, otherwise **Source Sans 3** (self-hosted via Fontsource) | Frutiger needs a paid web licence, so it is only used when the visitor already has it |
| Retro accents | **Silkscreen** or **VT323** (Google Fonts) | Visitor counter, badges, "system" messages; use sparingly |

Type scale: 13px UI (Vista-authentic), 16px body inside content windows, 28–40px display headings.

### 3.4 Materials & components
- **Glass window**:
  - Frame: `--glass` with `backdrop-filter: blur(18px) saturate(1.4)`, a 1px inner white border at 70%, and an outer 1px `--sky-700` border at 30%.
  - Title bar: carries the `--gloss` band.
  - Shadow: soft and blue-tinted (`0 12px 40px rgba(11,111,184,.25)`).
  - Body: an **opaque** `--sky-50` panel, so text never sits directly on blur.
- **Glossy button**: a pill shape with a vertical gradient (`--sky-300` → `--sky-500`) and a top gloss band. The hover state adds a cyan inner glow. Pressed shifts it 1px and darkens it.
- **Start orb**: an original glossy sphere with a rainbow ring and a "D" monogram, glowing on hover. It does not resemble the Windows logo.
- **Taskbar**: a dark-glass strip in deep blue glass (`rgba(6,62,112,.6)` + blur) with a gloss highlight. It is the one darker surface, for contrast, as in Vista.
- **Icons**: glossy 3D style from **Microsoft Fluent Emoji 3D (MIT licence)**, plus custom SVGs where needed (folders, the orb). Each desktop icon has a label with a subtle text shadow, and a selection state of a translucent blue rounded rectangle.
- **Scrollbars, checkboxes, progress bars**: custom glossy versions. Progress bars use the rainbow gradient.

### 3.5 Wallpaper (the hero)
The wallpaper is an illustrated painting (`art/background.png`): a rainbow sky, tropical islands, and a split view above and below the water. Animated layers sit on top of it in the painting's own coordinates, built in `components/os/Wallpaper.tsx`.

- **Assets:** source art lives in `art/`. Running `python scripts/build-scene-assets.py` writes trimmed WebP files to `public/scene/`.
- **Water surface mask:** fish and bubbles are masked by `public/scene/underwater-mask.svg`. The mask is traced from the bottom edge of the painted surface, which curves down from the horizon, so nothing underwater ever shows above it.
- **Fish:** reef, angel, clown and a school of blue fish swim across at different depths. Distant fish are smaller and hazier.
  - Each sprite is split at the tail joint into two halves that rotate in opposite directions under perspective, so the tail and head swing toward and away from the viewer.
  - The fish also bob gently up and down.
- **Bubbles:** the seven single bubbles from the top row of the bubble sheet rise from the bottom of the screen with a gentle sway, fading out at the surface.
- **The dolphin moment:** a small, distant dolphin leaps along a curve that it rotates to follow, with splashes where it leaves and re-enters the water. The water hides it below the waterline, because its layer is clipped just under the horizon.
  - It happens every 30–60 seconds, or when someone clicks the painted sun.
- **Twinkles:** four-point stars flash on the brightest glints along the wave crests. The glints were found by scanning the painting between the horizon and the bottom of the surface.
- **Reduced motion:** fish, bubbles and twinkles are hidden, and the dolphin only appears when the sun is clicked.

### 3.6 Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Bright skies, water, grass, gloss | Sunsets, neon on black, grids to the horizon |
| Rounded, bubbly, friendly | Glitch, VHS noise, irony |
| Rainbows and dolphins as accents | Rainbow everything (it gets tacky fast) |
| Opaque panels behind body text | Long text on blurred glass |
| Original orb, icons and wallpaper | Windows logos, Vista wallpapers, MS sounds |

## 4. Experience concept

### 4.1 First visit flow
1. **Boot (≤ 2.5 s, skippable, shown once).** A white screen, then the glossy DylanOS orb pulses with a rainbow ring and a progress bar shows "Starting DylanOS…". It is skipped on return visits (localStorage) and under reduced motion.
2. **Login screen (optional, ≤ 1 s, auto-advances).** Dylan's avatar tile (or a cat) and "Welcome". Clicking it advances immediately.
3. **Desktop.** The **Welcome** window opens automatically and centred: a photo, a two-line intro, and three glossy buttons: **See my work**, **Résumé**, **Say hi**. A Recruiter can stop here and still get value.

### 4.2 Desktop layout (≥ 1024px)
- **Left column:** desktop icons in a 2-column grid.
- **Right edge:** a Sidebar with 2–3 gadgets.
- **Bottom:** the taskbar, holding the Start orb, open-window buttons, and a tray with a sound toggle (default off), a theme toggle and the clock.
- **Start menu:** all apps, "Classic view" (a plain résumé-style page), contact links and a power button. "Shut down" plays a goodbye animation, which is an easter egg.

### Naming rule
Apps are named for what they are, not the style they borrow. For example, the MSN-style profile is **Hobbies**, and the "Dylan says…" pop-up opens the contact form.

### 4.2a Desktop interactions (added after reviewing mitchivin.com)
- **Mouse:** one click selects an icon and a double-click opens it. Ctrl+click toggles an icon in the selection and Shift+click adds to it.
- **Drag-select:** dragging across empty desktop draws a glossy selection rectangle.
- **Moving icons:** dragging moves the whole selection. Icons snap to a 96×104 grid, and a drop onto a taken cell moves to the nearest free one.
- **Touch and phones:** tap to open. Phones keep the fixed launcher grid.
- **Icon right-click menu:** Open, Copy, Delete (copies only; deleting is permanent), and Lock position.
- **Desktop right-click menu:** Paste (at the clicked cell), Arrange icons, Sort by name, Reset desktop, Show desktop, Refresh, and Full screen.
- **Keyboard:** Enter opens, Delete, Ctrl+C/V/A, and Shift+F10 or the menu key opens the right-click menu.
- **Saved layout:** each visitor's layout and copies are kept in their own browser (localStorage) and restored after the page loads.
- **Notifications:** a welcome tip bubble over the tray on the first visit, and a Messenger "Dylan says…" pop-up once per session after 30 seconds.
- **Start → Shut down:** a goodbye screen with "Turn DylanOS back on".

### 4.3 Window manager behaviour
- Windows open, close, minimize to the taskbar, maximize, drag by the title bar and resize from the corner.
- Clicking a window focuses it and brings it to the front. Only the focused window gets live backdrop blur; the others switch to static tinted glass (performance).
- Open and close animate with a Vista-style scale-and-fade, 180 ms.
- **Every window has a URL** (`/work/qatalink`, `/photos/cats`…). Deep links open the desktop with that window focused, the browser back button closes the window, and each route is also pre-rendered as a standalone static page for SEO and link previews.
- Windows cascade so new ones don't stack exactly on top of each other. There's no limit on how many can be open.

### 4.4 Mobile (< 768px)
- The desktop becomes a **glossy home screen**: the same wallpaper, the icon grid in 4 columns, and a bottom dock with Work, About, Photos and Contact.
- Windows open as **full-screen sheets** with a glossy title bar and a back arrow. There is no dragging.
- The sidebar gadgets become a swipe-left "Today" panel.
- The boot sequence is shortened to 1 s.

### 4.5 Tablet (768–1023px)
The desktop layout is used, but windows open maximized by default and the sidebar is hidden.

## 5. Information architecture: the apps
The core set is deliberately small. ★ marks the MVP.

| Icon | App | Window style | Content |
|---|---|---|---|
| ★ 👋 **Welcome** | About Me | Vista "Welcome Center" | Photo, bio (§6.1), current role, location, quick buttons |
| ★ 📁 **My Work** | Professional projects | Explorer folder: large glossy thumbnails plus a details pane | 3 case studies (§6.3) |
| ★ 🧪 **Side Projects** | Personal projects | Explorer folder | 3 projects (§6.4) |
| ★ ⚙️ **Skills** | Tech stack | "System Properties" parody | Grouped tech (§6.5), with "System: Dylan v31 · Uptime: 13 years coding" style details |
| ★ 📄 **Résumé** | CV | PDF-viewer style window plus a Download button | Rendered from the same data and printable |
| ★ 🎲 **Hobbies** | Hobbies & interests | Styled like a Windows Live Messenger profile (named for what it is, not the style) | Status message, display pic (Dylan's photo), and interests as a "profile" (§6.2) |
| ★ 🖼️ **Photos** | Gallery | Photo Gallery with albums plus a slideshow | Albums: **The Cats**, **Travels**, **Life** (improv, yoga, game nights) |
| ★ ✉️ **Contact** | Say hi | Mail-compose look | Email, LinkedIn, GitHub. The form is `mailto:`, or Formspree if wanted later |
| 🌐 **Interests** | Hobbies & interests in depth | A 2007-era web browser (no real browser branding) showing "Dylan's World", a deliberately amateur 2006-style homepage in blue with a left sidebar. No emojis | Home (intro and photo, a 6-page explore grid, a random-fact button, the "web design is my passion" box), then six pages: Games, Performance, Travel, Cats, Pop Culture, Yoga. Each page has a tagline and sections built from typed blocks (`src/data/homepage.ts`): text, feature, cards (with spoiler toggles and jump links), photo galleries with a lightbox, tables, lists, Steam favourites, and random board game picks that open the Game Shelf. Photos go in `art/homepage/<page>/`; `scripts/build-scene-assets.py` makes 1400px plus thumbnail WebPs with EXIF/GPS stripped. Easter eggs: the visitor counter, the ugly cat, and a hidden footer link |
| 🎵 **Music** | Music | iTunes 8 (2008) style: transport buttons, LCD, a Details/Tiles display toggle, search, sortable and resizable columns, and a resizable Now Playing pane that moves below the list in narrow windows | A 21-song playlist (`src/data/music.ts`) of official YouTube "Art Track" audio (song + album cover) from the artists' Topic channels, played through YouTube's embedded player. Everyone hears full songs. Includes shuffle, repeat, volume and seeking; no audio is hosted on the site |
| 🐧 **Cannon Dodger** | Game | Window with the Unity WebGL build in an iframe | Playable in place (served from the separate `cannon-dodger` repo) |

**Sidebar gadgets** (desktop):
- 🕐 Clock + Vancouver weather (static "☀️ Always sunny on DylanOS", or a free API later)
- 🐱 **Cat Status**: a random cat photo, name and a mood ("Napping", "Demanding breakfast")
- 🔢 Retro visitor counter, a fake odometer showing a fun number

**Retro-web touches**, scattered sparingly:
- an 88×31 badge strip in the Start menu ("Made with Astro", "Powered by cats", "Best viewed with eyes")
- a webring row of friends' sites
- an "under construction" GIF on any app not built yet

## 6. Content

### 6.1 Bio (draft; Dylan to edit)
> **Hi, I'm Dylan!** 👋
> I'm a full-stack developer in Vancouver, BC, building AI-powered tools at **Qatalyst Research Group**. Most days I'm turning messy research work like proposals, surveys, interviews and data into software that does the heavy lifting, using Next.js, TypeScript, Postgres and LLMs like Claude.
>
> Off the clock, you'll find me running a Pathfinder campaign, doing improv and yoga every week, losing at Blood on the Clocktower, cooking something vegetarian, or being bossed around by my two cats.

*Short version for the Welcome window:* "Full-stack developer in Vancouver building AI tools for researchers. Also: improv, yoga, board games, TTRPGs, and two very sweet cats."

### 6.2 Hobbies (MSN-profile style)
- Display name: **Dylan ✨ (Busy GMing)**.
- Status message: *"♪ Now Playing: Lady Gaga — Bad Romance"*.
- Interests are listed as profile rows:

| | Interest | Line |
|---|---|---|
| 🎲 | Board Games | From casual to strategy and everything in between |
| 🐉 | Tabletop RPGs | D&D and Pathfinder, as both GM and player |
| 🕵️ | Social Deduction | Blood on the Clocktower, Secret Hitler, Werewolf |
| 🎮 | Video Games | Dead by Daylight, Civ 6, Stardew Valley, and any game where you can build a house |
| 🎭 | Improv | Every week. Yes, and… |
| 🧘 | Yoga | Every week. Gotta align your chakras and stay flexy |
| 🎶 | Pop Music | Little Monster for life |
| 🎤 | Karaoke | Bad, but enthusiastic |
| 💃 | Dancing | Poorly, but passionately |
| 🍳 | Cooking | Vegetarian, always |
| 🐱 | Cats | Two little cuties (see Photos → The Cats) |
| 📱 | Internet Culture | Dank memes & TikTok |
| 🌈 | The Gay Agenda™ | *(Dylan's call on the exact wording; the original "radical communist ideologies" line can stay or be softened)* |

### 6.3 My Work: 3 curated case studies
Each case study has the same structure: **The problem → What I built → My role → Stack → Outcome**, with 2–3 mock or redacted screenshots and the client named.

1. **Qatalink: AI platform for research consultants** (Qatalyst, 2022 → present). This is the flagship.
   - A multi-tool platform: literature reviews, economic-development profiles, interview transcript analysis, survey coding, proposal drafting, and project/time management.
   - It evolved from a Nuxt/Firebase v1 to a Next.js/Supabase v3, which shows growth.
   - *Stack:* Next.js, TypeScript, Supabase/Postgres, Claude + OpenAI APIs, Langfuse, TipTap.
2. **Qatalyst.ca website**
3. **Proposal Wizard: from RFP to draft proposal** (Qatalyst, 2025–26).
   - A multi-tenant, 11-step AI pipeline that reads an RFP and produces a structured proposal draft.
   - Covers the Azure rebuild and the Claude Code plugin that preceded it.
   - *Stack:* Next.js 15, Postgres + Drizzle with row-level security, pg-boss workers, Azure OpenAI, Azure Bicep, Docker.
   (--No for this the Claude Cowork plugin actually is what followed it and is what we use. The displayed product should be the Claude Cowork plugin.)
4. **CRRF Reporting Portal** (for the Canadian Race Relations Foundation, 2026).
   - A survey and reporting portal that generates Word, Excel and PDF reports. It has social impact and a named national client.
   - *Stack:* Next.js, shadcn/ui, Supabase, docx/exceljs/pdfmake.
5. **TIAC Tourism Insights**: a StatCan data pipeline (R, Postgres, Azure) with a web viewer.
6. **SME Benchmarking Platform**: Business Forward, with pgvector and an AI chatbot.

**Earlier career**: a compact timeline line, with no cards:
- Convertus (QA and development, 1,400+ dealership sites)
- Goss Gillroy
- UBC TA
- Mazdis
- Vision Critical (Software engineer in test)
- UBC BSc Computer Science, 2018

### 6.4 Side Projects: 3 curated

1. **Gemma & Warren's Wedding Site.** RSVP, registry and an admin dashboard for friends' 2027 wedding.
   - *Stack:* React 19, Vite, Tailwind 4, Firebase, Playwright.
2. **Abomination Vaults Companion.** A player companion site for Dylan's Pathfinder 2e campaign: lore, maps, party notes.
   - *Stack:* Next.js, Tailwind, shadcn/ui, content in Markdown, Vercel.
3. **A game.** Recommended: **Cannon Dodger** (Unity WebGL, playable in a window and already hosted at `/cannon-dodger/` from its own repo).

*Optional fourth:* this site itself ("DylanOS: you're looking at it").

### 6.5 Skills (derived from the full project inventory)
- **Frontend:** TypeScript, React, Next.js, Vue/Nuxt, Tailwind, shadcn/ui
- **Backend & data:** Node.js, Python, FastAPI, PostgreSQL, Supabase, Drizzle, Firebase, R
- **AI:** Claude/Anthropic SDK, OpenAI/Azure OpenAI, RAG and pgvector, LLM pipelines and agents, Claude Code plugins/skills, Langfuse
- **Cloud & DevOps:** Azure (Bicep, Blob, OpenAI), Vercel, Railway, Firebase Hosting, Docker, GitHub Actions
- **Testing:** Vitest, Playwright
- **Games & fun:** Unity/C#, Phaser, Three.js

Shown as "Installed components" with glossy progress bars as decoration only, never as fake percentages.

## 7. Motion & sound
- **Motion budget:**
  - UI transitions: 150–250 ms ease-out.
  - Ambient motion (bubbles, clouds, aurora): slow (20–60 s loops) and GPU-friendly (transform/opacity only).
  - The dolphin moment: about every 60 s.
- **`prefers-reduced-motion`:** no boot animation, a static wallpaper, no dolphin auto-leap (clicking still triggers it), and instant window transitions.
- **Sound:** off by default; a tray toggle turns it on. Use original or CC0 soft chimes for window open and close, a bubble pop and a dolphin squeak. No startup sound, and nothing autoplays.

## 8. Accessibility & performance
- Windows are `role="dialog"` with labelled title bars, and Esc closes the focused window. Desktop icons are real `<button>`s in a grid with arrow-key navigation. The taskbar is a `<nav>`.
- There is a "Skip to content" link and a **Classic view**: one plain, semantic, printable page with all the core content.
- Contrast: body text is always on opaque panels, and all text meets WCAG AA. Focus rings are visible as glossy cyan outlines.
- **Performance targets:** Lighthouse Performance ≥ 90 and Accessibility ≥ 95; under 200 KB of JS for the desktop island; images as AVIF/WebP with lazy loading.
- Backdrop blur is limited to the focused window and the taskbar. If `backdrop-filter` is unsupported, fall back to solid tinted glass.

## 9. Technical architecture
- **Framework:** Astro 7 + React 19 islands + TypeScript + Tailwind 4.
- **Deploy:** Vercel project `dylanweicker` (scope "Dylan's projects") at `dylanweicker.ca`; `www.dylanweicker.ca` redirects there (`vercel.json`). Deployed from this folder with `vercel deploy --prod`; `.vercelignore` limits the upload to what `astro build` needs, so `art/` and `moodboard/` stay local. The project is also connected to the GitHub repo, so pushes to `master` deploy too. The older GitHub Actions workflow (`.github/workflows/deploy.yml`) still targets GitHub Pages at `dylanweicker.github.io`.
- **Structure:**
  ```
  src/
    content/            # Astro content collections (Markdown/MDX + frontmatter)
      work/             # qatalink.mdx, proposal-wizard.mdx, crrf.mdx
      projects/         # wedding.mdx, abomination-vaults.mdx, cannon-dodger.mdx
      albums/           # cats/, travels/, life/ (images + captions.json)
    data/               # interests.ts, skills.ts, timeline.ts, profile.ts
    components/
      os/               # Desktop, Window, TitleBar, Taskbar, StartMenu, Icon, Sidebar, Wallpaper, Boot
      apps/             # Welcome, Explorer, CaseStudy, Messenger, Photos, MediaPlayer, Skills, Resume, Contact
      ui/               # GlassPanel, GlossButton, ProgressBar, Badge88x31
    stores/windows.ts   # Zustand: open/close/focus/z-order/minimize/maximize, URL sync
    styles/tokens.css   # palette, gloss, glass, type tokens (Aero + Deep Water)
    pages/
      index.astro       # desktop
      [app]/[...slug].astro  # pre-rendered per-window routes (SEO + deep links)
      classic.astro     # plain view
      resume.astro      # print-optimized résumé
  public/               # fonts (Selawik), icons, sounds, og images
  ```
- **Window manager:** custom Zustand store (`src/stores/windows.ts`) with pointer-event drag and resize (no extra library). The focused window drives the URL; back/forward re-sync it.
- **Content model** (frontmatter for work/projects): `title, client?, year, role, stack[], summary, thumbnail, screenshots[], links{live?, repo?}, order, featured`.
- **Legacy:** the old site is not carried over. `/cannon-dodger/` keeps working because it lives in its own repo; never create a folder with that name. *Open question:* whether to also rescue the small old games (Clue, TowerBuilder, generative art) into their own repo or drop them.
- **Repo:** after Dylan's backup, the new project replaces the contents of `dylanweicker.github.io`. Either commit on top or start a fresh history; the repo name must stay the same for the user-site URL.

## 10. Assets Dylan needs to gather
- [x] Headshot (`art/dylan.jpg` → `public/dylan.webp`)
- [ ] Cat photos (10–20) plus **names and one fun fact each**
- [ ] Travel photos (by trip/album) with captions and places
- [ ] Life photos: improv, game nights (with friends' consent), cooking
- [ ] Current title and start date at Qatalyst; any other roles since 2020
- [ ] Screenshots (or OK to mock) for the 3 work and 3 side projects; live URLs for the wedding and Abomination Vaults sites (and permission from Gemma & Warren to feature theirs)
- [ ] Gaga top 10 for the Media Player
- [ ] Final wording on bio and interests

## 11. Roadmap
1. **M0: Setup.** Astro scaffold, Actions deploy, tokens, fonts, a "Hello DylanOS" placeholder live.
2. **M1: Shell.** Wallpaper (static first), desktop icons, the window manager, taskbar and Start menu, URL routing, the mobile home screen and sheets.
3. **M2: Core content (MVP launch).** Welcome, My Work (3), Side Projects (3), Skills, Résumé, Contact, Classic view.
4. **M3: Personality.** Messenger, Photos, sidebar gadgets, boot/login, the Deep Water theme.
5. **M4: Delight.** Animated wallpaper and the dolphin moment, Music, retro badges, sounds.
6. **M5: Polish.** Accessibility audit, Lighthouse, OG images per window, cross-browser (Safari backdrop-filter), launch.

## 12. Open questions
1. Which 3 work case studies are final (Qatalink, Proposal Wizard and CRRF are recommended)?
2. Which game for Side Projects: Cannon Dodger (playable) or a newer prototype?
3. Keep or rescue the old small games (Clue, TowerBuilder, generative art)?
4. Real contact form (Formspree) or mailto only?
5. Exact wording of the Gay Agenda™ line.
6. ~~Custom domain or stay on github.io?~~ Decided: `dylanweicker.ca` on Vercel.

