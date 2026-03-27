# Design System: FIDES SEGUROS
**Project ID:** 1861511600284288146

## 1. Visual Theme & Atmosphere
The design is an elegant, premium, and trustworthy corporate website. It features an airy, clean layout with a light mode (white/light-grey backgrounds), utilizing glassmorphism ("glass-card" with blur and semi-transparent backgrounds) to create depth and modernity.

## 2. Color Palette & Roles
- **Primary Navy Blue** (#0000B0): Used for primary actions, headings accents, icons, hover states, and major buttons.
- **Deep Navy Hover** (#00008B): Used for hover states on primary buttons.
- **WhatsApp Green** (#25D366): Used specifically for WhatsApp contact buttons and badges.
- **Charcoal Black** (#1A1A1A): Used for main headings and primary text to ensure high contrast and readability.
- **Light Grey Background** (#F9F9F9): Used for alternating section backgrounds and subtle input fields.
- **Glass Border** (rgba(0, 0, 176, 0.1)): Used for borders on glassmorphic cards to give a subtle blue tint.
- **Clean White** (#FFFFFF): Used as the primary canvas and structural background.

## 3. Typography Rules
- **Logo Font (Main)**: Montserrat, sans-serif (wght: 900). Stylized lowercase, very tight letter scale (-0.05em).
- **Logo Font (Sub)**: Inter, sans-serif (wght: 400). Uppercase, very wide letter spacing (0.4em).
- **Primary Font (Headings & Body)**: Inter, sans-serif. Headings use heavy weights (700, 800, 900) while body text uses lighter weights (300, 400).
- **Icons**: Material Symbols Outlined and FontAwesome (brands).

## 4. Component Stylings
- **Buttons**:
  - Primary CTA: Pill-shaped (rounded-full), `bg-primary`, white text, heavy font, with a soft shadow tinted primary (`shadow-primary/20`).
  - Secondary/Floating: Circle shapes with `bg-whatsapp` or white backgrounds.
- **Cards/Containers**: 
  - Generously rounded corners (`rounded-[2rem]` or `rounded-[24px]`).
  - Glass effect: `bg-white/90` or `bg-white/70`, `backdrop-blur-md` or `backdrop-blur-xl`.
  - Borders: Thin and subtle `border border-gray-100` or `border-primary/10`.
  - Shadows: Soft, diffused drop shadows (`shadow-sm` expanding to `shadow-xl` on hover).
- **Inputs/Forms**:
  - Subtly rounded inputs (`rounded-xl`), filled with `bg-gray-50`.
  - Focused state uses primary color ring/border.
  - Labels are uppercase, small (`text-[10px]`), tracking wide, and gray.

## 5. Layout Principles
- **Spacing**: Generous whitespace with thick vertical padding (`py-24` to `py-48`). Content constrained in a max-width container (`max-w-7xl`).
- **Header**: Fixed, blurred background, with horizontal navigation on desktop.
- **Footer**: Distinct sections, clean layout, border tops.

## 6. Design System Notes for Stitch Generation
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light, minimal, premium corporate consulting, glassmorphism
- Background: Clean White (#ffffff) and Light Grey (#f9f9f9)
- Surface: Glass cards (white 90% opacity, backdrop blur 20px, 2rem to 24px border radius, subtle shadows)
- Primary Accent: Primary Navy Blue (#0000B0) for icons, headings, active buttons
- WhatsApp Action: Green (#25D366)
- Text Primary: Charcoal (#1A1A1A) for headings
- Text Secondary: Gray (#4B5563) for body/descriptions
- Fonts: Inter for all UI text, Montserrat strictly for Logo
- Input Fields: light gray (#F9FAFB), rounded-xl, borders
