import originalPhotos from './photos.json' with { type: 'json' };

/** Business content recovered from https://www.rinconcarwash.com/. */
export interface Photo {
  src: string;
  alt: string;
}

interface SiteContent {
  name: string;
  startingPrice: number;
  originalWebsite: string;
  description: string | null;
  address: string | null;
  hours: string | null;
  phone: { label: string; href: string } | null;
  directionsUrl: string | null;
  mapEmbedUrl: string | null;
  tutorialEmbedUrl: string;
  payments: string;
  essentialsPrice: number;
  essentials: Photo[];
  photos: Photo[];
  links: { label: string; href: string }[];
}

const toPhoto = (photo: { url: string; file: string; alt: string }): Photo => ({
  src: import.meta.env?.VITE_LOCAL_PHOTOS === 'true' ? `/photos/${photo.file}` : photo.url,
  alt: photo.alt,
});

export const content: SiteContent = {
  name: 'Rincon Car Wash',
  startingPrice: 3,
  originalWebsite: 'https://www.rinconcarwash.com/',
  description: 'Orange’s affordable self-serve car wash. Serving the community for over 30 years with professional-grade soaps and essential wash products.',
  address: '140 N Prospect St\nOrange, CA 92869',
  hours: 'Open 24 hours a day, 7 days a week.\n365 days a year.',
  phone: { label: '+1 909-248-4480', href: 'tel:+19092484480' },
  directionsUrl: null,
  mapEmbedUrl: "https://maps-api-ssl.google.com/maps?hl=en-US&ll=33.788474,-117.818669&output=embed&q=140+N+Prospect+St,+Orange,+CA+92869,+United+States+(Rincon+Carwash)&z=17",
  tutorialEmbedUrl: "https://www.youtube.com/embed/Oq56HcZrxow?embed_config=%7B%22enc%22:%22AXH1ezm9GC8nmdLni3Ajuvom7JU19Z2qaazof2no-_DPagZGGyXUjyIMb3jsc4RevIMuybGK9gvkaWnFolhM5gTeDdIdIRJQGd-AWdTq6E0EpBIuXvjbC-zlWhNdjKiJ5BJPmp59Z-cTpvstm7PUaGhVSiuENCabYJ9e1beGKatSKjl74gkZdkoVENd-S_A46wQuKkzJzbX9aPkSikOHp8gJMjxGrI1iZC7xT10u-1e5alH0GLDeC_a4hfFfshzC5TpqH4WbJ3j6ijQdLmuxzUCxggJhTPTqeE6sGFmoo03Z6STgjle1v0tM6G2la5sY_nGg3696Wpp8lRfHNRfW9f04FN_SVjyNW7tlKOYnTjhLEE-8%22%7D&enablejsapi=1&errorlinks=1&origin=https://www.rinconcarwash.com&vl=1",
  payments: "Wash tokens, quarters, and credit cards accepted. The token machine is at the front of the building facing Prospect Street.",
  essentialsPrice: 1.5,
  photos: originalPhotos.filter(photo => ['hero', 'gallery'].includes(photo.role)).map(toPhoto),
  essentials: originalPhotos.filter(photo => photo.role === 'essential').map(toPhoto),
  links: [{ label: 'help@rinconcarwash.com', href: 'mailto:help@rinconcarwash.com' }],
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
