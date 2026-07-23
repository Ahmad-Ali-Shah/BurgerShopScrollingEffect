# 🛸 ZERO-G CHEESEBURGER — PARALLAX PROJECT & CODEBASE ARCHITECTURE

Welcome to the definitive architectural overview and workflow guide for **The Zero-G Cheeseburger ("AHMAD") Cinematic Single-Page Web Application**.

---

## 📐 1. Architecture & Tech Stack

This project is built using modern web standards for high-performance 60 FPS scroll-driven animations:

- **Core Framework**: React 18 + TypeScript + Vite
- **Styling & Aesthetics**: TailwindCSS + Custom CSS Utilities (**Ahmad Crimson Theme**)
  - Background: Deep Black (`#0A0000`) to Dark Crimson (`#1A0000`)
  - Primary Accent: Neon Crimson (`#FF1A1A`)
  - Secondary Accent: Melted Gold (`#FFB000`)
  - Typography: Google Fonts `Orbitron`, `Space Grotesk`, and `JetBrains Mono`
- **Animation & Physics Engines**:
  - **Lenis**: Smooth inertial scroll engine
  - **Framer Motion**: Scroll progress transforms (`useScroll`, `useTransform`)
  - **HTML5 Canvas**: Frame scrubbing engine for 201 preloaded high-res image sequence frames

---

## 📂 2. Comprehensive Directory & File Breakdown

Below is the complete breakdown of every file in the codebase and its specific role:

```
2nd one/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── images/                          # 201 extracted frame sequence images (ezgif-frame-001.jpg ... ezgif-frame-201.jpg)
└── src/
    ├── main.tsx                     # React application entry point
    ├── App.tsx                      # Main layout, Lenis setup & section orchestrator
    ├── index.css                    # Tailwind directives, glowing neon text, scanlines, HUD grid styling
    └── components/
        ├── HeroSection.tsx          # Section 1: Sticky hero scroll, floating title "AHMAD", cheeseburger float-up
        ├── IngredientsSection.tsx   # Section 2: Horizontal pan parallax, flying zero-G ingredients, word-by-word reveal
        ├── AssemblySection.tsx      # Section 3: 360° rotation & snap assembly, red shockwave pulse, typewriter text
        ├── TechSpecsSection.tsx     # Section 4: Pinned left burger, neon tech spec cards sliding up on right
        ├── OutroSection.tsx         # Section 5: 3D particle explosion, fade to black, pulsing launch CTA button
        ├── ZeroGBurgerScrubber.tsx  # High-performance HTML5 canvas engine scrubbing 201 frames with smooth lerp
        ├── AsciiImage.tsx           # Interactive ASCII art renderer with mouse-hover photorealistic reveal
        ├── AsciiScannerOverlay.tsx  # Fullscreen modal scanner allowing live tweaking of ASCII parameters
        ├── Navbar.tsx               # Fixed header with live telemetry (0.0G), version badge, scanner & order triggers
        └── OrderModal.tsx           # Interactive orbital dispatch wizard with customization & launch confirmation
```

### Detailed File Roles:

#### 🟢 `index.html`
- Serves as the HTML shell.
- Preloads Google Fonts (`Orbitron`, `Space Grotesk`, `JetBrains Mono`).
- Sets viewport settings and page metadata.

#### 🟢 `vite.config.ts`
- Vite configuration file. Configures path aliases (`@/*` pointing to `src/*`) and dev server options.

#### 🟢 `tailwind.config.js`
- Custom design system configuration. Defines key color tokens (`ahmadRed`, `bgDeep`, `meltedGold`), glowing box shadows, fonts, and custom keyframes (`pulseGlow`, `floatSlow`, `scanline`).

#### 🟢 `src/main.tsx`
- Mounts the React application tree into the `#root` DOM node using `ReactDOM.createRoot`.

#### 🟢 `src/App.tsx`
- Main application shell. Initialises **Lenis smooth scrolling** loop and stacks the 5 scroll sections and modal overlays.

#### 🟢 `src/index.css`
- Custom CSS utilities: neon text glow classes (`.text-glow-red`, `.text-glow-gold`), scanline background pattern (`.scanline-bg`), custom glowing scrollbars, and HUD grid patterns (`.bg-hud-grid`).

#### 🟢 `src/components/HeroSection.tsx` (Section 1)
- Pinned 100vh sticky scroll container.
- As the user scrolls, giant glowing red text **"AHMAD"** scales up and fades out while the 3D cheeseburger floats up into center.

#### 🟢 `src/components/IngredientsSection.tsx` (Section 2)
- Converts vertical scrolling into a horizontal pan.
- Displays 3 deconstructed ingredient cards (Buns, Wagyu Patty, Ahmad Cheddar) with flying zero-G particle trails, word-by-word animated text, and embedded ASCII previews.

#### 🟢 `src/components/AssemblySection.tsx` (Section 3)
- Rotates scattered ingredients 360° and snaps them together in the center.
- Triggers a red neon shockwave pulse at the snap point and types out *"ASSEMBLY COMPLETE. Calibrated for maximum taste. Structural integrity: 100%."*

#### 🟢 `src/components/TechSpecsSection.tsx` (Section 4)
- Pins the burger on the left side while engineering data cards slide up on the right with neon glows:
  - *Flavor Output: 10,000 Lumens*
  - *Juice Retention: 99.9%*
  - *Gravity Reversal Field: Active*

#### 🟢 `src/components/OutroSection.tsx` (Section 5)
- Burger disassembles into 3D red glowing canvas particles flying towards the screen.
- Background fades to `#000000` (pure black).
- Displays pulsing red **"INITIATE ORDER SEQUENCE"** CTA button with space confetti burst.

#### 🟢 `src/components/ZeroGBurgerScrubber.tsx`
- HTML5 Canvas frame scrubbing component.
- Preloads all 201 frames, calculates smooth linear interpolation (`lerp`) frame scrubbing driven by scroll progress, and renders background particle physics.

#### 🟢 `src/components/AsciiImage.tsx`
- Live ASCII matrix renderer component. Uses canvas luminance sampling to translate images into ASCII character grids with interactive mouse cursor photo reveal.

#### 🟢 `src/components/AsciiScannerOverlay.tsx`
- Fullscreen telemetry inspection overlay for analyzing burger layers with live controls for grid density, ink color, contrast, and reveal lens size.

#### 🟢 `src/components/Navbar.tsx` & `src/components/OrderModal.tsx`
- Cinematic header with real-time zero-G telemetry indicators and order wizard popup.

---

## 🎬 3. How to Generate Your Own 3D Frame Sequence (AI & Pipeline Workflow)

If you want to recreate or customize the 3D rotating zero-G burger frame sequence from scratch, follow this 4-step pipeline:

```
[1. AI Image Gen] ──► [2. Google Flow / Video Gen] ──► [3. Video-to-JPG Sequence] ──► [4. Scrubber Engine]
```

### Step 1: Generate High-Res 3D Master Image
Use an AI Image Generator (Midjourney v6, FLUX.1, or Gemini / ImageFX):
- **Sample Prompt**:
  > *"Hyper-realistic cinematic 3D render of a premium gourmet Wagyu cheeseburger floating in zero gravity, studio dark lighting, red neon backlight rim, melted gold cheddar cheese, vacuum baked sesame bun, floating sesame seeds, black background, octane render, 8k resolution --ar 1:1"*

### Step 2: Generate Orbiting Video via Google Veo / Luma / Runway / Kling
Upload the master image into an AI Video Generator (such as Google Veo, Luma Dream Machine, or Runway Gen-3):
- **Camera Prompt**:
  > *"360 degree slow rotation orbit camera around floating burger, zero gravity floating motion, seamless smooth loop, 60fps cinematic light reflections"*
- Save the resulting output as a high-bitrate **MP4 video file** (`burger_orbit.mp4`).

### Step 3: Convert Video into JPG Frame Sequence
Convert the MP4 video into numbered JPG frames (`ezgif-frame-001.jpg` to `ezgif-frame-201.jpg`):
Using **FFmpeg** terminal command:
```bash
ffmpeg -i burger_orbit.mp4 -q:v 2 -vf "scale=800:800:force_original_aspect_ratio=decrease" images/ezgif-frame-%03d.jpg
```
*(Or use an online tool like Ezgif Video-to-JPG converter).*

### Step 4: Package into Project
Place the 201 extracted `.jpg` files into the `images/` directory in your workspace. The `ZeroGBurgerScrubber` engine will automatically handle preloading and 60 FPS scroll scrubbing!

---

## 🚀 4. Git Setup & GitHub Push Guide

Follow these steps to create a Git repository and push your project to GitHub:

```bash
# 1. Initialize Git repository inside the workspace folder
git init

# 2. Add all project files
git add .

# 3. Commit your changes
git commit -m "feat: Initial commit of Zero-G Cheeseburger (AHMAD) scroll parallax experience"

# 4. Set main branch
git branch -M main

# 5. Add your remote repository URL (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/parallex_project.git

# 6. Push code to GitHub
git push -u origin main
```

---

*Project generated for AHMAD — Ahmad Culinary Engine.*
