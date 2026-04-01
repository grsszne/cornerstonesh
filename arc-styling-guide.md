# Arc Design System: The Real Styling Guide

After exploring the actual codebase, here's how Arc styling actually works in practice.

---

## 1. The Core Reality

**Arc is built entirely on inline styles + CSS variables.** There's almost no Tailwind class usage for styling. Every component builds its appearance with `style={}` objects that reference `var(--*)` tokens.

```jsx
// This is the Arc way
<button style={{
  padding: '8px 16px',
  background: 'var(--text-primary)',
  color: 'var(--surface-page)',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}}>
  Click me
</button>
```

**Why?** This gives maximum control and flexibility. The visual hierarchy is explicit in each component; there's no hidden Tailwind config to hunt through.

---

## 2. The Token System

Arc defines ~25 CSS variables in `/app/globals.css` that drive the entire color system. These live in `:root` (light mode) and `.dark` class (dark mode).

### Surface Tokens (Backgrounds)

```css
--surface-page:     #F8F8F8 (light) | #0A0A0A (dark)    /* Page bg */
--surface-card:     #FFFFFF (light) | #141414 (dark)    /* Card/modal bg */
--surface-raised:   #F2F2F2 (light) | #1A1A1A (dark)    /* Hover, secondary bg */
--surface-overlay:  #EBEBEB (light) | #212121 (dark)    /* Overlay bg */
```

**Real usage from dashboard/page.tsx:**
- Cards: `background: 'var(--surface-card)'`
- Hover rows: `background: 'var(--surface-raised)'`
- Page: CSS sets `body { background: var(--surface-page) }`

### Text Tokens (Foreground)

```css
--text-primary:   #111111 (light) | #EBEBEB (dark)    /* Main text */
--text-secondary: #888888 (light) | #5A5A5A (dark)    /* Secondary/meta */
--text-tertiary:  #BBBBBB (light) | #333333 (dark)    /* Disabled/faint */
```

**Real usage:**
- Headers: `color: 'var(--text-primary)'`
- Helper text: `color: 'var(--text-secondary)'`
- Disabled/meta: `color: 'var(--text-tertiary)'`

### Border Tokens (Strokes)

```css
--border-subtle:  #E8E8E8 (light) | #1E1E1E (dark)
--border-default: #D8D8D8 (light) | #2C2C2C (dark)
--border-strong:  #C0C0C0 (light) | #3D3D3D (dark)
```

**Real usage:**
- Input borders: `border: '1px solid var(--border-default)'`
- Table lines: `borderBottom: '1px solid var(--border-subtle)'`
- Focus state: `borderColor: 'var(--border-strong)'`

### Status Colors (Semantic)

```css
--status-healthy: #4AA06D (light)  | #5BBF80 (dark)
--status-warning: #D4923A (light)  | #E5A84D (dark)
--status-error:   #C0392B (light)  | #E74C3C (dark)
```

**Real usage from dashboard/page.tsx:**
- Active route status: `color: 'var(--status-healthy)'`
- Destructive button: `background: 'var(--status-error)'`
- Semantic cache: `color: route.cacheMode === 'semantic' ? 'var(--status-healthy)' : '...'`

### Provider-Specific

```css
--provider-openai:    #111111 (light) | #D0D0D0 (dark)  /* Black/gray */
--provider-anthropic: #C0392B (always)                  /* Red */
```

---

## 3. The Swatch Palette (for Pills & Route Badges)

Arc defines 9 named swatches, each with a `-bg` (background) and `-fg` (text) variant. These are **deterministic per route**—the same route always gets the same swatch color.

| Name | Light Background | Light Text | Dark Background | Dark Text | Purpose |
|------|---|---|---|---|---|
| clay | #F0E6DC | #8B4A28 | rgba(139, 94, 60, 0.18) | #C08860 | Warm, approachable |
| moss | #DCE8D8 | #3A6830 | rgba(74, 103, 65, 0.18) | #7AAA6A | Healthy, safe |
| ochre | #EDE4D0 | #8A6020 | rgba(122, 98, 48, 0.18) | #BCA060 | Caution, attention |
| dusk | #E8D8D8 | #8A3E3E | rgba(107, 79, 79, 0.18) | #B08080 | Calm, introspective |
| sand | #E8E2D4 | #7A5A3A | rgba(122, 110, 90, 0.18) | #B0A080 | Warm neutral |
| slate | #D8E4E2 | #2E5E5C | rgba(77, 98, 96, 0.18) | #70AAA8 | Cool, technical |
| mauve | #E8DCEC | #6A4870 | rgba(107, 85, 112, 0.18) | #B090B8 | Creative, special |
| pine | #DCE8DC | #2A6840 | rgba(74, 103, 65, 0.18) | #80B890 | Growth, depth |
| stone | #E6E4E0 | #6B6860 | rgba(100, 100, 95, 0.15) | #909088 | Default/universal |

**Real usage from dashboard/page.tsx:**
```jsx
<UseCasePill label={route.name} color={route.color as SwatchColor} />
```

The pill component uses these variables directly:
```jsx
const bg = `var(--${color}-bg)`
const fg = `var(--${color}-fg)`
return <span style={{ background: bg, color: fg, ... }} />
```

---

## 4. Typography: All Ronzino, All The Time

Arc loads 6 variants of **Ronzino** serif in `/app/globals.css`:
- Regular (400), Regular Oblique (400)
- Medium (500), Medium Oblique (500)
- Bold (700), Bold Oblique (700)

Then **both** `--font-sans` and `--font-mono` are set to Ronzino:

```css
--font-sans: 'Ronzino', Georgia, serif;
--font-mono: 'Ronzino', Georgia, serif;  /* Not a monospace—still Ronzino */
```

This means in TSX, applying `className="font-mono"` or `className="font-sans"` renders the same Ronzino font. It's consistent, elegant, and distinctive.

### Font Sizes in Real Components

Looking at actual pages:

| Context | Size | Weight | Usage |
|---------|------|--------|-------|
| Page title | 22px | 300 | "Routes" heading |
| Section header | 16px | 500 | Modal titles ("New Route") |
| Body text | 13px | 400 | Input labels, descriptions |
| Small label | 11px | 500 (mono) | Table headers, status badges |
| Tiny label | 9px | 400 (mono) | Form labels, helper text |
| Mini | 10px | 400 (mono) | Buttons, pills |

### Font Weight Patterns

```jsx
// Main heading
style={{ fontSize: '22px', fontWeight: 300, ... }}

// Section heading
style={{ fontSize: '16px', fontWeight: 500, ... }}

// Uppercase label
className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', ... }}

// Button text
className="font-mono" style={{ fontSize: '10.5px', letterSpacing: '0.06em', textTransform: 'uppercase', ... }}
```

---

## 5. Button Styles (Real Patterns from Code)

### Primary Button

```jsx
<button style={{
  fontSize: '10.5px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '8px 16px',
  background: 'var(--text-primary)',
  color: 'var(--surface-page)',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
}}>
  + Add Route
</button>
```

**Characteristics:**
- Black/light background with inverted text
- Uppercase, tight letter-spacing
- Small padding (8px vertical)
- No border
- 4px border-radius (subtle rounding)

### Secondary Button (Cancel)

```jsx
<button style={{
  fontSize: '13px',
  color: 'var(--text-tertiary)',
  background: 'none',
  border: '1px solid var(--border-subtle)',
  borderRadius: '6px',
  padding: '7px 16px',
  cursor: 'pointer',
}}>
  Cancel
</button>
```

**Characteristics:**
- Transparent background
- Subtle border
- Secondary text color
- 6px border-radius (slightly more rounded)

### Destructive Button (Delete, Revoke)

```jsx
<button style={{
  background: 'var(--status-error, #dc2626)',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  padding: '7px 16px',
  fontSize: '13px',
  cursor: 'pointer',
  fontWeight: 500,
}}>
  Delete
</button>
```

**Characteristics:**
- Red background
- White text (always, for contrast)
- Used in ConfirmModal with `danger={true}` prop

### RippleButton (Special)

Arc has a custom `<RippleButton>` component that adds a subtle **bloom effect** on hover:

```jsx
// Hover creates a soft radial gradient bloom at cursor entry point
const gradient = `radial-gradient(circle at ${x}% ${y}%, rgba(var(--bloom-color), 0.09) 0%, transparent 70%)`
```

**Bloom color:**
- Light mode: `88, 120, 130` (slate-blue, 9% opacity)
- Dark mode: `140, 180, 200` (lighter slate-blue, 5% opacity)

Used for search triggers, nav buttons. Very subtle—barely visible but adds polish.

---

## 6. Input & Form Styling

```jsx
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  fontSize: '13px',
  padding: '9px 12px',
  background: 'transparent',
  border: '1px solid var(--border-default)',
  borderRadius: '4px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}
```

**On focus (not shown in CSS, but implied by globals.css auth-input class):**
```css
.auth-input:focus {
  border-color: var(--border-strong) !important;
  background: var(--surface-raised) !important;
}
```

### Form Labels

```jsx
// Uppercase, tiny, tertiary color
style={{
  fontSize: '9px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-tertiary)',
  marginBottom: '6px',
  display: 'block',
}}
```

---

## 7. Tables & Data Display

### Table Structure

```jsx
<table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
  <thead>
    <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--surface-card)' }}>
      <th className="font-mono" style={{
        padding: '10px 12px',
        textAlign: 'left',
        fontSize: '9px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
        fontWeight: 400,
      }}>
        Header
      </th>
    </tr>
  </thead>
</table>
```

### Table Row Hover

```jsx
<tr
  className="table-row animate-row"
  style={{ borderBottom: '1px solid var(--border-subtle)', animationDelay: `${index * 20}ms` }}
>
```

CSS in globals.css:
```css
.table-row:hover {
  background: var(--surface-raised);
}
```

**Stagger animation:** Each row animates in with a 20ms delay, creating a cascading "appear" effect.

---

## 8. Modals & Overlays (Real from ConfirmModal)

### Modal Backdrop

```jsx
<div style={{
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.45)',  // 45% opacity
  backdropFilter: 'blur(2px)',     // Frosted glass effect
}}
```

### Modal Box

```jsx
<div style={{
  background: 'var(--surface-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  padding: '24px',
  minWidth: '320px',
  maxWidth: '440px',
  width: '100%',
  boxShadow: '0 8px 32px rgba(0,0,0,0.24)',  // Depth shadow
}}>
```

### Modal Title

```jsx
<div className="font-mono" style={{
  fontSize: '15px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '8px',
}}>
  {title}
</div>
```

### Modal Message

```jsx
<div style={{
  fontSize: '14px',
  color: 'var(--text-secondary)',
  marginBottom: '24px',
  lineHeight: '1.5',
}}>
  {message}
</div>
```

---

## 9. Sidebar Navigation Pattern

### Section Header

```jsx
<p className="font-mono" style={{
  fontSize: '9px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--text-tertiary)',
  padding: '0 8px',
  marginBottom: '4px',
}}>
  Platform
</p>
```

### Nav Link (Active)

```jsx
<Link
  href="/dashboard/routes"
  className="sidebar-link flex items-center"
  style={{
    gap: '8px',
    padding: '7px 8px',
    fontSize: '13px',
    fontWeight: active ? 500 : 400,
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    background: active ? 'var(--surface-raised)' : 'transparent',
    borderRadius: '4px',
    transition: 'background 80ms ease, color 80ms ease',
  }}
>
  <Icon size={15} weight={active ? 'fill' : 'regular'} />
  {label}
</Link>
```

**CSS hover:**
```css
.sidebar-link:hover {
  background: var(--surface-raised) !important;
  color: var(--text-primary) !important;
}
```

---

## 10. Spacing Patterns

Looking at actual code, Arc uses these consistent gaps and paddings:

| Context | Value | Notes |
|---------|-------|-------|
| Micro (pill dots) | 2px | Tiny spacing |
| Tight (small padding) | 4px | Input padding, small buttons |
| Small (button gaps) | 8px | Between buttons, icons + text |
| Standard (container gap) | 12px | Stat grids, form groups |
| Medium (card padding) | 16px | Card content, container margins |
| Large (modal padding) | 24px | Modal body padding |
| Page padding (mobile) | 16px | Horizontal |
| Page padding (desktop) | 40px | Horizontal |

---

## 11. Animations (All in globals.css)

### Fade-Slide-Up (Most Common)

```css
@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-row,
.animate-enter {
  opacity: 0;
  animation: fade-slide-up 220ms ease-out forwards;
}
```

**Applied to table rows:**
```jsx
style={{ animationDelay: `${index * 20}ms` }}  // Stagger each row
```

### Modal Content Scale-Fade

```css
@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal-content {
  animation: scale-fade-in 200ms ease-out forwards;
}
```

### Modal Backdrop Fade

```css
.animate-modal-backdrop {
  animation: fade-in 150ms ease-out forwards;
}
```

**Accessibility:** If user has `prefers-reduced-motion`, all animations are disabled:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

---

## 12. Light Mode vs. Dark Mode in Practice

### How It Works

Theme is toggled via `ThemeToggle` component, which:
1. Reads `localStorage('arc-theme')`
2. Sets class on `document.documentElement`: `'dark'`, `'light'`, or neither (for `auto`)
3. All CSS variables respond via `:root { ... }` and `.dark { ... }`

### The Dark Mode Approach

Dark mode uses **semi-transparent swatch backgrounds** instead of solid:

```css
/* Light mode */
:root {
  --clay-bg: #F0E6DC;
}

/* Dark mode */
.dark {
  --clay-bg: rgba(139, 94, 60, 0.18);  /* 18% opacity overlay */
}
```

**Why?** This prevents washing out the dark background. A solid `#F0E6DC` on a `#141414` card would look muddy; a transparent overlay tinted with the swatch color looks polished.

---

## 13. Component Library (What Actually Exists)

Arc doesn't have a large component library. Instead, components are pragmatic and purpose-built:

| Component | Location | Purpose |
|-----------|----------|---------|
| UseCasePill | `components/UseCasePill.tsx` | Route/category badge with swatch color |
| ConfirmModal | `components/ConfirmModal.tsx` | Delete/destructive action confirmation |
| RippleButton | `components/RippleButton.tsx` | Button with bloom hover effect |
| FilterSelect | `components/FilterSelect.tsx` | Dropdown with group headers |
| ThemeToggle | `components/ThemeToggle.tsx` | Light/Dark/Auto switcher |
| Sidebar | `components/Sidebar.tsx` | Main navigation + project switcher |
| StatusBar | `components/StatusBar.tsx` | Status indicators (pending, healthy, etc.) |
| OnboardingFlow | `components/OnboardingFlow.tsx` | Onboarding wizard |
| MosaicIcon | `components/MosaicIcon.tsx` | Deterministic avatar mosaic |

Most other UI is just raw inline styles + HTML.

---

## 14. The "Direct" Route (Special Case)

There's a pinned "Direct" route that always shows at the top of the routes table:

```jsx
<tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-raised)', opacity: 0.75 }}>
  <td><UseCasePill label="Direct" color="stone" /></td>
  <td>System</td>
  {/* ... */}
</tr>
```

This is the **default fallback**—when no route matches, Arc uses the Direct route. It's always stone color, slightly faded (opacity 0.75), and labeled "System".

---

## 15. Status Badge Pattern

Used throughout for route status (Active, Paused, Shadow Testing, Archived):

```jsx
function StatusBadge({ status }: { status: RouteStatus }) {
  return (
    <span className="flex items-center" style={{ gap: '6px' }}>
      {/* Dot (circle for active, 1px line for others) */}
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: status === 'active' ? '50%' : '1px',
        background: STATUS_COLORS[status],
        display: 'inline-block',
      }} />
      {/* Label */}
      <span className="font-mono" style={{
        fontSize: '10px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: STATUS_COLORS[status],
      }}>
        {STATUS_LABELS[status]}
      </span>
    </span>
  )
}
```

**Status colors:**
```jsx
const STATUS_COLORS: Record<RouteStatus, string> = {
  active: 'var(--status-healthy)',           // Green
  paused: 'var(--text-tertiary)',            // Gray
  shadow_testing: 'var(--status-warning)',   // Amber
  archived: 'var(--text-tertiary)',          // Gray
}
```

---

## 16. Practical Do's & Don'ts

### ✅ Do

- Use CSS variables for all colors (never hardcode `#FF5733`)
- Build with inline `style={}` objects—no need for Tailwind classes
- Use `className="font-mono"` or `className="font-sans"` for Ronzino consistency
- Apply staggered `animationDelay` to lists/tables for cascading entrance
- Respect `prefers-reduced-motion` (already handled in globals.css)
- Use semantic status colors (green=healthy, amber=warning, red=error)
- Test designs in both light and dark modes (toggle in sidebar)
- Use SVG icons from @phosphor-icons/react (never emojis)
- Wrap lists in `<div className="table-scroll">` for horizontal overflow on mobile
- Use `var(--surface-raised)` for hover states

### ❌ Don't

- Hardcode any color hex value—always use `var(--*)`
- Use multiple serif/sans fonts—everything is Ronzino
- Try to make dark mode an afterthought; design for both simultaneously
- Use Tailwind classes for spacing/sizing (use inline styles instead)
- Forget `position: 'relative'` on elements with `z-index`
- Apply animations to users with reduced motion preference
- Use emojis anywhere in the UI
- Mix large icon libraries—use @phosphor-icons/react consistently
- Forget to add `boxSizing: 'border-box'` to inputs
- Use hard shadows; Arc shadows are soft: `0 8px 32px rgba(0,0,0,0.24)`

---

## 17. Copy-Paste Patterns

### Primary Button

```jsx
<button className="font-mono" style={{
  fontSize: '10.5px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '8px 16px',
  background: 'var(--text-primary)',
  color: 'var(--surface-page)',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
}}>
  Action
</button>
```

### Card

```jsx
<div style={{
  background: 'var(--surface-card)',
  border: '1px solid var(--border-default)',
  borderRadius: '8px',
  padding: '16px',
}}>
  Content
</div>
```

### Input with Label

```jsx
<div>
  <p className="font-mono" style={{
    fontSize: '9px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text-tertiary)',
    marginBottom: '6px',
  }}>
    Label
  </p>
  <input style={{
    display: 'block',
    width: '100%',
    fontSize: '13px',
    padding: '9px 12px',
    background: 'transparent',
    border: '1px solid var(--border-default)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    outline: 'none',
  }} />
</div>
```

### Inline Code/Badge

```jsx
<code style={{
  fontSize: '11px',
  background: 'var(--surface-raised)',
  padding: '1px 5px',
  borderRadius: '3px',
  color: 'var(--text-secondary)',
}}>
  X-Arc-Route: customer-support
</code>
```

### Secondary Text

```jsx
<p style={{
  fontSize: '11px',
  color: 'var(--text-tertiary)',
  fontStyle: 'italic',
}}>
  Default — used when no route is matched
</p>
```

### Divider

```jsx
<div style={{
  height: '1px',
  background: 'var(--border-subtle)',
  margin: '16px 0',
}} />
```

---

## 18. The Real Philosophy

Arc's design is **intentional minimalism**:

1. **Every color serves a purpose** — No decorative gradients or effects beyond the ripple bloom
2. **Typography is consistent** — All Ronzino, sizing drives hierarchy, not fanciness
3. **Spacing is measured** — 4px, 8px, 12px, 16px, 24px—predictable scale
4. **Accessibility by default** — Reduced motion respected, contrast ratios checked, focus states clear
5. **Pragmatic over precious** — Inline styles beat CSS files for small-team velocity
6. **Dark mode is co-equal** — Not an afterthought, but designed alongside light mode from day one

The result feels **polished, warm, professional**—like a tool built by people who care about details, not decoration.

---

## 19. CSS Variables Reference (Complete)

```css
/* LIGHT MODE (:root) */
--surface-page:    #F8F8F8;
--surface-card:    #FFFFFF;
--surface-raised:  #F2F2F2;
--surface-overlay: #EBEBEB;
--text-primary:    #111111;
--text-secondary:  #888888;
--text-tertiary:   #BBBBBB;
--border-subtle:   #E8E8E8;
--border-default:  #D8D8D8;
--border-strong:   #C0C0C0;
--status-healthy:  #4AA06D;
--status-warning:  #D4923A;
--status-error:    #C0392B;
--provider-openai: #111111;
--provider-anthropic: #C0392B;
--bloom-color:     88, 120, 130;

/* Swatches */
--clay-bg: #F0E6DC;   --clay-fg: #8B4A28;
--moss-bg: #DCE8D8;   --moss-fg: #3A6830;
--ochre-bg: #EDE4D0;  --ochre-fg: #8A6020;
--dusk-bg: #E8D8D8;   --dusk-fg: #8A3E3E;
--sand-bg: #E8E2D4;   --sand-fg: #7A5A3A;
--slate-bg: #D8E4E2;  --slate-fg: #2E5E5C;
--mauve-bg: #E8DCEC;  --mauve-fg: #6A4870;
--pine-bg: #DCE8DC;   --pine-fg: #2A6840;
--stone-bg: #E6E4E0;  --stone-fg: #6B6860;

/* DARK MODE (.dark) */
--surface-page:    #0A0A0A;
--surface-card:    #141414;
--surface-raised:  #1A1A1A;
--surface-overlay: #212121;
--text-primary:    #EBEBEB;
--text-secondary:  #5A5A5A;
--text-tertiary:   #333333;
--border-subtle:   #1E1E1E;
--border-default:  #2C2C2C;
--border-strong:   #3D3D3D;
--status-healthy:  #5BBF80;
--status-warning:  #E5A84D;
--status-error:    #E74C3C;
--provider-openai: #D0D0D0;
--bloom-color:     140, 180, 200;

/* Swatches (Dark) */
--clay-bg: rgba(139, 94, 60, 0.18);    --clay-fg: #C08860;
--moss-bg: rgba(74, 103, 65, 0.18);    --moss-fg: #7AAA6A;
--ochre-bg: rgba(122, 98, 48, 0.18);   --ochre-fg: #BCA060;
--dusk-bg: rgba(107, 79, 79, 0.18);    --dusk-fg: #B08080;
--sand-bg: rgba(122, 110, 90, 0.18);   --sand-fg: #B0A080;
--slate-bg: rgba(77, 98, 96, 0.18);    --slate-fg: #70AAA8;
--mauve-bg: rgba(107, 85, 112, 0.18);  --mauve-fg: #B090B8;
--pine-bg: rgba(74, 103, 65, 0.18);    --pine-fg: #80B890;
--stone-bg: rgba(100, 100, 95, 0.15);  --stone-fg: #909088;
```

---

## Conclusion

Arc's styling is **intentional, consistent, and practical**. By combining CSS variables, Ronzino typography, inline styles, and measured spacing, it achieves a sophisticated aesthetic that feels both professional and warm. The system scales from mobile to desktop, respects accessibility, and supports both light and dark modes equally.

When building new UI for Arc, follow the patterns here, use the variables consistently, and test in both themes. The result will feel native to Arc.
