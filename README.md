# Rincon Car Wash

A simple, responsive React + TypeScript website using MUI and Vite, prepared for Firebase Hosting. Starting price: **$3**.

## Current status

The site includes the original hours, payment options, contact information, exact map embed URL, email link, and tutorial video URL. The starting price is now $3; essential products remain $1.50 each.

Original photographs and product images are referenced using the original site's URLs. **Local photo recovery is still blocked by the cloud network policy for `lh7-us.googleusercontent.com`.** Recover and inspect these images before launch: they should be stored in this repository rather than depending on Google Sites URLs. The original two pricing illustrations are archived by the recovery script but replaced in the UI by MUI text pricing cards, avoiding an outdated price baked into an image.

## Development

Use Node.js 24 (minimum supported version: 22.12).

```sh
npm ci
npm run dev
```

Update `src/content.ts` for business information and pricing. `src/photos.json` records all 15 source image URLs and their roles. The first photo is the hero; four more appear in the gallery and eight product images appear in the essentials section. Keep original map and external destinations as supplied by the existing site.

To archive the original images locally (requires curl and access to the image host):

```sh
npm run recover:photos
cp .env.example .env
npm run build
```

`VITE_LOCAL_PHOTOS=true` switches the site to your local copies. Verify all images render and their descriptions are accurate before publishing. No generated or stock photos replace the originals.

## Validation

```sh
npm run build
npx playwright install --with-deps chromium
npm test
npm run test:hosting
```

Tests exercise the production build at desktop and mobile sizes, check navigation and the $3 price, and check loaded images and exact map, video, and contact destinations. They do not prove that external map/video services work. Image tests fail if the originals are blocked or the local copies are missing; this must be resolved rather than skipping those checks.

## Firebase Hosting

This site is static and does not require Firebase SDK keys or a database. `firebase.json` serves the production `dist` folder. Deployment is manual; CI does not publish the site.

```sh
npx firebase login
npm run build
npm run emulate
# Once ready to publish, use your actual Firebase project ID:
npm run deploy -- --project YOUR_FIREBASE_PROJECT_ID
```

The `--project` flag is passed to Firebase CLI, not Vite. Choose the intended Firebase Hosting site in that project before deployment. Configure the custom domain in Firebase Hosting after deployment; don't change DNS until the replacement is approved.

## Git workflow

Application changes belong on `feat/react-mui-rebuild`. Do not merge automatically. This repository was empty at the start, so `review-base` points to an empty shared initial commit and is used as the initial draft PR target. No commits have been pushed or merged to `main` by this implementation. The owner can initialize `main` at that empty commit and retarget the PR when ready.
