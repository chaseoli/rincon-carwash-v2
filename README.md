# Rincon Car Wash

A simple, responsive React + TypeScript website using MUI and Vite, prepared for Firebase Hosting. Starting price: **$3**.

## Current status

The site includes the original hours, payment options, contact information, exact map embed URL, email link, and tutorial video URL. The starting price is now $3; essential products remain $1.50 each.

All 13 images supplied in the owner's Google Drive folder are archived in `public/photos/` and served locally. The car-washing photo appears in the hero, the exterior and wash-bay photos in the gallery, eight labeled product images in the essentials section, and the price icon and accepted-card logos beside the pricing/payment information. Photos no longer depend on Google Sites or Drive at runtime.

## Development

Use Node.js 24 (minimum supported version: 22.12).

```sh
npm ci
npm run dev
```

Update `src/content.ts` for business information and pricing. `src/photos.json` records filenames, source URLs, image descriptions, product names, roles, and checksums. Keep original map and external destinations as supplied by the existing site.

The images are committed to this repository, so no separate download or environment flag is needed to develop or deploy. To verify the archives or recover a missing file (requires curl and access to the shared Drive download URL):

```sh
npm run recover:photos
```

The recovery command verifies checksums and refuses to overwrite modified images. New business photos can be placed under `public/photos/` and registered in `src/photos.json`. The supplied images retain their original bytes; file extensions match the actual JPEG or PNG format.

## Validation

```sh
npm run build
npx playwright install --with-deps chromium
npm test
npm run test:hosting
```

Tests exercise the production build at desktop and mobile sizes, check navigation and the $3 price, and check that every local image loads and map, video, and contact destinations match the original site. The Hosting smoke test verifies all 13 archived images are served with the expected content types and checksums. These checks do not prove that external map/video services work.

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
