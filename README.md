# Toufikul Islam — Production Portfolio 2.0 (System Ops Style)

A high-performance, responsive ops-console portfolio website engineered for **Toufikul Islam**, Full Stack Developer & MERN Engineer based in Dhaka, Bangladesh.

Built with **React 18 + Vite**, **Tailwind CSS** (driven entirely by CSS variables for 6 distinct operational palettes), **Node.js + Express backend**, and **MongoDB (Mongoose)** with an automated in-memory development fallback.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22.23.1)
- **npm** v9+

### 2. Install All Dependencies
Run this single command from the project root to install dependencies for root, client, and server:
```bash
npm run install:all
```
*(Or run `npm install` inside `/`, `/client`, and `/server` respectively).*

### 3. Run Development Servers Concurrently
Start both the Vite frontend (`http://localhost:3000`) and the Express telemetry backend (`http://localhost:5001`) simultaneously:
```bash
npm run dev
```

You can also run them independently:
```bash
# Frontend only (Vite on port 3000)
npm run dev:client

# Backend only (Express on port 5001)
npm run dev:server
```

### 4. Build for Production
```bash
npm run build
```
Creates a minified, code-split production bundle in `client/dist`.

---

## ⚙️ Environment Variables

### Backend Configuration (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Express server port | `5001` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/toufikul-portfolio` (Falls back to high-speed in-memory store if mongod is offline) |
| `SMTP_HOST` | Nodemailer SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `imranmeg2356@gmail.com` |
| `SMTP_PASS` | SMTP app password | *(Optional in dev — simulated alerts are logged)* |
| `NOTIFICATION_EMAIL`| Destination for `POST /contact` alerts | `imranmeg2356@gmail.com` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:3000` |

---

## 🎨 Theme Control Center & Signatures

- **6 Theme Palettes**:
  1. `Cyan Ops`: The default high-tech dark telemetry console style from `status.html`.
  2. `Matrix Green`: Retro phosphor green terminal.
  3. `Amber CRT`: 1980s warm monochrome radiation display.
  4. `Neon Purple`: Cyberpunk violet & magenta.
  5. `Solar Light`: High-contrast daylight lab console.
  6. `Bangladesh`: Deep national bottle green with crimson sun accent.
- **Language Toggle**: Full English (`EN`) and Bangla (`বাংলা`) support toggled with one click from the status bar.
- **Operator Hologram & Photo Studio**: Live floating studio allowing visitors to adjust filter presets, brightness, contrast, neon glow, CRT scanlines, background styles (Radar sweep, Ops Grid, Code Rain, Circuit lines, Gradient mesh), and frame geometry (ID card, Monitor bezel, Circle, Hexagon).
- **System Terminal**: Accessible with the backtick (`` ` ``) key or header button. Supports `help`, `whoami`, `skills`, `projects`, `open <section>`, `theme <name>`, `neofetch`, `hire`, and `sudo hire toufikul`!
- **Command Palette**: Accessible with `Ctrl+K` or `Cmd+K` for instant fuzzy searching and quick navigation.
- **Konami Code**: Press `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the site for celebratory confetti and instant Matrix terminal mode.

---

## 📝 How to Update Portfolio Content

All copy and project details are decoupled into a central data directory:

### 1. Updating Personal Bio, Stats & Skills
Edit `client/src/data/portfolioData.js`:
- `personal`: Name, role, contact details, social links, rotating roles.
- `kpis`: Top summary counters (healthy services, latency, projects shipped).
- `skillsMatrix`: Grouped by Frontend, Backend, Databases, Mobile, Tools, and Soft Skills.

### 2. Adding a New Project / Deployment
In `client/src/data/portfolioData.js`, add a new object to `projects`:
```javascript
{
  id: "my-new-project",
  name: "Project Name",
  category: "Full Stack", // "All" | "Full Stack" | "Web" | "Mobile"
  categoryType: "web",
  subtitle: "One-line operational summary",
  status: "Production",
  liveUrl: "https://your-live-link.com",
  githubUrl: "https://github.com/codewithToufikul/repo",
  stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  problem: "What problem does this project solve?",
  approach: "How did you architect and implement the solution?",
  features: [
    "Key capability 1",
    "Key capability 2"
  ],
  result: "Quantifiable impact or verified achievement."
}
```

### 3. Updating Translations
Edit `client/src/data/translations.js` to add or update copy for both English (`en`) and Bangla (`bn`).

### 4. Changing the Operator Photo
1. Place your new photo in `client/public/toufikul-original.jpg`.
2. Generate a clean cutout by running:
   ```bash
   node client/scripts/remove-bg.js
   ```
   This will output `client/public/toufikul-cutout.png`.

---

## 🛡️ API Endpoints

- `GET /api`: Health check and system metadata.
- `GET /api/health`: Real-time system diagnostics (uptime, V8 heap usage, CPU load, Dhaka time).
- `POST /api/contact`: Form handler with Zod validation, IP rate limiting, and honeypot spam traps.
- `GET /api/contact/messages`: Development endpoint to inspect recent contact transmissions.
