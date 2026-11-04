# Rohin Dillibabu — Finance Portfolio

Static Next.js site (App Router, TypeScript, Tailwind CSS) presenting two independent Excel finance projects:

- **Airbus SE — Equity Research & DCF Valuation** → `/projects/airbus-valuation/`
- **Starbucks — Driver-Based FP&A Model** → `/projects/starbucks-fpa/`

All figures live in typed data files under `data/` and were checked against the final workbooks.

## Project structure

```
app/
  layout.tsx                      # fonts, metadata, Person structured data, nav + footer
  page.tsx                        # homepage: hero, projects, about, contact
  icon.svg                        # "RD" favicon
  projects/airbus-valuation/page.tsx
  projects/starbucks-fpa/page.tsx
components/                       # nav, footer, ui, charts (SVG), blocks, gallery (lightbox)
data/                             # personal.ts, airbus.ts, starbucks.ts  ← edit content here
lib/format.ts                     # number formatting
public/
  resume/Rohin-Dillibabu-CV.pdf
  models/Rohin-Dillibabu-Airbus-Valuation-Model.xlsx
  models/Rohin-Dillibabu-Starbucks-FPA-Model.xlsx
  reports/Rohin-Dillibabu-Airbus-Equity-Research-Summary.pdf
  reports/Rohin-Dillibabu-Starbucks-FPA-Summary.pdf
  images/                         # report-page previews (WebP)
  og.png                          # social preview image
```

## Run locally

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run build      # static export into ./out
```

## Updating content

- Text, figures and links: edit the files in `data/`.
- Replace a document: overwrite the file in `public/…` **with exactly the same name**, so every link keeps working.

## Deploy on Vercel

### Option A — replace your existing portfolio (keeps rohin-portfolio-tau.vercel.app)
1. On GitHub, open the repository connected to your current Vercel project.
2. Delete the old files (or create a new branch), then upload **everything in this folder except `node_modules`, `.next` and `out`**, and commit to the main branch.
3. In Vercel → your project → **Settings → Build & Development**: Framework Preset **Next.js**, Build Command `npm run build`, Output Directory **`out`**. Save.
4. Vercel redeploys automatically after the commit. Open **Deployments** and wait for **Ready**.
5. Check in an incognito window: homepage, both case studies, and all five downloads.

### Option B — new project
1. Create a new GitHub repository and upload this folder (without `node_modules`, `.next`, `out`).
2. On vercel.com: **Add New → Project**, import the repository. Set Output Directory to `out` and click **Deploy**.
3. If the address changes, update the link on your CV and LinkedIn, and `SITE_URL` in `data/personal.ts`.

## Notes
- The Excel files open best in Microsoft Excel (the Starbucks scenario table uses an Excel data table).
- No analytics, cookies or contact form are included.
