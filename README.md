# Ayuki of Umiria Portfolio

Physics-and-universe themed one-page portfolio inspired by lit.link style cards.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Mail Settings

The contact form sends mail via Muumuu Mail by default.

- SMTP host: `smtp.muumuu-mail.com`
- SMTP port: `587` (STARTTLS)
- SMTP user: `orbit@ayukiofumiria.com`
- To address: `orbit@ayukiofumiria.com`

Set at least this environment variable before sending mail:

```bash
SMTP_PASS=your_mail_password
```

Optional overrides:

```bash
SMTP_HOST=smtp.muumuu-mail.com
SMTP_PORT=587
SMTP_USER=orbit@ayukiofumiria.com
CONTACT_TO_EMAIL=orbit@ayukiofumiria.com
```

## Project Structure

- `src/data/portfolio.ts`: single source of truth for profile, links, sections, gallery, contact
- `src/types/portfolio.ts`: public content/data types
- `src/components/*`: reusable UI blocks (`ProfileHeader`, `LinkButtonList`, `SectionCard`, `GalleryCard`, `ContactPanel`)
- `src/app/page.tsx`: one-page composition + JSON-LD
- `src/app/layout.tsx`: metadata, OGP, fonts
- `public/images/*`: profile, gallery images, OGP image

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Confirm framework is `Next.js` and keep default build settings.
4. Deploy and verify the `*.vercel.app` URL.
5. (Optional) Attach a custom domain.

## Quality Checks

```bash
npm run lint
npm run build
```
