# 🚀 Zero-G Cheeseburger

### A Cinematic Scroll-Driven Web Experience

Zero-G Cheeseburger is a cinematic single-page application built with **React**, **TypeScript**, and **Framer Motion**, featuring smooth scroll-driven storytelling, HTML5 Canvas frame scrubbing, parallax effects, and interactive ASCII rendering.

---

# Overview

The experience is divided into five animated sections that guide the user through a zero-gravity cheeseburger journey.

Highlights include:

-  Scroll-driven cinematic storytelling
-  HTML5 Canvas frame scrubbing
-  Smooth inertial scrolling with Lenis
-  Interactive ASCII renderer
-  Depth, parallax, and particle effects
-  Built with React + TypeScript + Vite

---

# Tech Stack

## Frontend

- React 18
- TypeScript
- Vite

## Styling

- Tailwind CSS
- Custom CSS
- Google Fonts
  - Orbitron
  - Space Grotesk
  - JetBrains Mono

## Animation

- Framer Motion
- Lenis
- HTML5 Canvas

---

# Design Theme

| Element | Color |
|---------|-------|
| Background | `#0A0000` → `#1A0000` |
| Primary Accent | `#FF1A1A` |
| Secondary Accent | `#FFB000` |

---

# Project Structure

```text
2nd one/
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── images/
│   └── ezgif-frame-001.jpg ... ezgif-frame-201.jpg
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── HeroSection.tsx
        ├── IngredientsSection.tsx
        ├── AssemblySection.tsx
        ├── TechSpecsSection.tsx
        ├── OutroSection.tsx
        ├── ZeroGBurgerScrubber.tsx
        ├── AsciiImage.tsx
        ├── AsciiScannerOverlay.tsx
        ├── Navbar.tsx
        └── OrderModal.tsx
```

---

# Component Overview

## Hero Section

Introduces the experience with a full-screen hero.

Features

- Sticky scroll section
- Animated title
- Floating burger reveal

---

## Ingredients Section

Transforms vertical scrolling into a horizontal journey.

Features

- Zero-gravity ingredient cards
- Word-by-word text animation
- Embedded ASCII previews
- Floating particle effects

---

## Assembly Section

Animates the burger assembly sequence.

Features

- 360° rotation
- Snap animation
- Shockwave effect
- Animated completion text

---

## Tech Specs Section

Displays engineering-style specification cards while pinning the burger on screen.

Example specifications include

- Flavor Output
- Juice Retention
- Gravity Field Status

---

## Outro Section

Finishes the experience with a cinematic ending.

Features

- Particle explosion
- Fade to black
- Call-to-action button

---

## ZeroGBurgerScrubber

High-performance canvas renderer responsible for

- Preloading image frames
- Scroll scrubbing
- Frame interpolation
- Particle rendering

---

## ASCII Components

### AsciiImage

Interactive ASCII renderer that converts images into character grids with a mouse-controlled reveal.

### AsciiScannerOverlay

Developer overlay for adjusting

- Grid density
- Contrast
- Ink color
- Lens size

---

## Navigation & Order System

### Navbar

Provides

- Live telemetry
- Scanner controls
- Version indicator
- Order shortcut

### OrderModal

Interactive ordering interface with customization and confirmation workflow.

---

# Creating Your Own Frame Sequence

The animation pipeline consists of four simple stages.

```text
AI Image
      │
      ▼
AI Video
      │
      ▼
Extract Frames
      │
      ▼
Canvas Scrubber
```

## Step 1

Generate a high-resolution burger render using an AI image generator such as

- Midjourney
- FLUX
- ImageFX

---

## Step 2

Animate the image using

- Google Veo
- Luma
- Runway
- Kling

Export as an MP4 video.

---

## Step 3

Extract frames using FFmpeg.

```bash
ffmpeg -i burger_orbit.mp4 \
-q:v 2 \
-vf "scale=800:800:force_original_aspect_ratio=decrease" \
images/ezgif-frame-%03d.jpg
```

---

## Step 4

Place the generated frames inside

```text
images/
```

The scrubber automatically preloads the sequence.

---

# Git Setup

Initialize the repository

```bash
git init
```

Add the project

```bash
git add .
```

Commit

```bash
git commit -m "Initial commit"
```

Create the main branch

```bash
git branch -M main
```

Add the remote

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

Push

```bash
git push -u origin main
```

---

# Features

- Smooth scroll-driven storytelling
- HTML5 Canvas rendering
- Framer Motion animations
- Lenis smooth scrolling
- Interactive ASCII rendering
- Responsive layout
- Modern React architecture
- Modular component design

---

<p align="center">
Built with ❤️ using React, TypeScript, Framer Motion, Lenis, and HTML5 Canvas.
</p>
