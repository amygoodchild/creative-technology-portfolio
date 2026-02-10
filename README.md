# Creative Technology Portfolio

Minimal creative technology portfolio showcasing UX/service design and generative art projects.

## Structure

```
/
├── index.html              # Homepage with project grid
├── project-1.html          # UX case study example
├── project-2.html          # Generative art case study example
├── style.css               # Shared styles for all pages
├── js/
│   └── sketch.js          # p5.js generative header
└── images/                 # Add your project images here
```

## Tech Stack

- **Vanilla HTML/CSS/JS** - No frameworks or build tools
- **p5.js** - Generative header animation (instance mode)
- **CSS Grid & Flexbox** - Responsive layout
- **Mobile-first design** - Optimized for all screen sizes

## Getting Started

1. **Add your content:**
   - Update the name, tagline, and intro text in `index.html`
   - Replace placeholder projects with your own
   - Customize colors in `style.css` (see CSS variables in `:root`)

2. **Add projects:**
   - Duplicate `project-1.html` or `project-2.html` for new case studies
   - Update project cards in `index.html` to link to your case study pages
   - Add images to the `/images` folder and replace placeholder divs

3. **Customize the p5.js sketch:**
   - Edit `js/sketch.js` to change the header animation
   - Adjust `particleCount`, `noiseScale`, colors, and movement behavior

4. **Update contact info:**
   - Replace email/social links in footer (appears on all pages)

## Color Customization

Change the color palette by editing CSS variables in `style.css`:

```css
:root {
    --color-bg: #ffffff;        /* Background */
    --color-text: #1a1a1a;      /* Main text */
    --color-accent: #333333;    /* Accent color */
    --color-subtle: #666666;    /* Secondary text */
    --color-border: #e5e5e5;    /* Borders and dividers */
}
```

## Running Locally

Simply open `index.html` in a web browser. No build process required.

For local development with live reload, you can use any static server:

```bash
# Python
python -m http.server 8000

# Node (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment

This site can be deployed to any static hosting service:

- **GitHub Pages:** Enable in repository settings
- **Netlify:** Drag and drop the folder
- **Vercel:** Import from GitHub
- **Cloudflare Pages:** Connect your repository

No build configuration needed—just deploy the files as-is.

## Adding New Projects

1. Create a new HTML file (e.g., `project-3.html`)
2. Copy the structure from `project-1.html` or `project-2.html`
3. Update the content
4. Add a new project card in `index.html`:

```html
<article class="project-card">
    <a href="project-3.html">
        <div class="project-image">
            <div class="placeholder-image">Project Name</div>
        </div>
        <div class="project-info">
            <h3>Project Title</h3>
            <p class="project-type">Project Type</p>
            <p class="project-description">Brief description</p>
        </div>
    </a>
</article>
```

