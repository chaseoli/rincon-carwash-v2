import { Box, Button, Chip, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { content, formatPrice } from './content';

function Brand() {
  return <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
    <Box component="img" src="/favicon.svg" alt="" sx={{ width: 42, height: 42 }} />
    <Typography component="span" sx={{ fontWeight: 700, fontSize: { xs: 17, sm: 21 }, letterSpacing: '-.03em' }}>{content.name}</Typography>
  </Stack>;
}

export function App() {
  const heroPhoto = content.photos[0];
  const hasLocation = Boolean(content.address || content.hours || content.mapEmbedUrl || content.directionsUrl || content.phone);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Box component="header" sx={{ borderBottom: '1px solid #dce5df' }}>
      <Container sx={{ py: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Box component="a" href="#" aria-label="Rincon Car Wash home" sx={{ color: 'inherit', textDecoration: 'none' }}><Brand /></Box>
          <Stack component="nav" aria-label="Main navigation" direction="row" spacing={1}>
            <Button href="#pricing" size="small">Pricing</Button>
            {hasLocation && <Button href="#visit" size="small">Visit us</Button>}
          </Stack>
        </Stack>
      </Container>
    </Box>

    <Box component="main" id="main">
      <Container component="section" aria-labelledby="hero-title" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: heroPhoto ? '1fr 1fr' : 'minmax(0, 1.5fr) minmax(0, 1fr)' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
          <Box>
            <Chip label="RINCON CAR WASH" size="small" sx={{ bgcolor: '#e5eee7', fontSize: 11, letterSpacing: '.14em', fontWeight: 700, mb: 3 }} />
            <Typography id="hero-title" variant="h1" sx={{ fontSize: { xs: '3.2rem', sm: '4.5rem', md: '5.5rem' }, maxWidth: 650 }}>A fresh start.<br /><Box component="span" sx={{ color: '#507e73' }}>A cleaner car.</Box></Typography>
            <Typography sx={{ mt: 3, maxWidth: 460, fontSize: 19, lineHeight: 1.75, color: 'text.secondary' }}>{content.description ?? 'Make a little time for a little shine. Start your next wash at Rincon Car Wash.'}</Typography>
            <Stack direction="row" spacing={2} useFlexGap sx={{ mt: 4, flexWrap: "wrap" }}>
              <Button variant="contained" href={content.directionsUrl ?? '#pricing'}>{content.directionsUrl ? 'Get directions' : 'View pricing'}<Box component="span" aria-hidden="true" sx={{ ml: 2 }}>↗</Box></Button>
              {content.phone && <Button variant="outlined" href={content.phone.href}>Call us</Button>}
            </Stack>
          </Box>
          {heroPhoto
            ? <Box component="img" src={heroPhoto.src} alt={heroPhoto.alt} fetchPriority="high" sx={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 6 }} />
            : <Paper elevation={0} sx={{ bgcolor: 'primary.main', color: 'white', p: { xs: 4, md: 5 }, borderRadius: 6, minHeight: 330, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundImage: 'radial-gradient(circle at 90% 10%, #507e73 0, transparent 55%)' }}>
              <Typography sx={{ letterSpacing: '.14em', fontSize: 12 }}>YOUR NEXT WASH</Typography>
              <Box><Typography sx={{ color: '#c6eae3' }}>Starts at</Typography><Typography component="p" sx={{ fontSize: { xs: 90, md: 120 }, lineHeight: 1.15, letterSpacing: '-.06em', fontWeight: 700 }}>{formatPrice(content.startingPrice)}</Typography></Box>
              <Typography sx={{ color: '#c6eae3' }}>{content.name}</Typography>
            </Paper>}
        </Box>
      </Container>

      <Box component="section" id="pricing" aria-labelledby="pricing-title" sx={{ bgcolor: '#e8efe9', py: { xs: 6, md: 8 }, scrollMarginTop: 24 }}>
        <Container>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Box><Typography component="p" sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '.15em', mb: 2 }}>SIMPLE PRICING</Typography><Typography id="pricing-title" variant="h2" sx={{ fontSize: { xs: 36, md: 48 } }}>A little change.<br />A fresh shine.</Typography></Box>
            <Paper elevation={0} sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, border: '1px solid #d8e3da' }}>
              <Box><Typography variant="h3" sx={{ fontSize: 24 }}>Start your wash</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Starting price</Typography></Box>
              <Typography sx={{ fontSize: { xs: 60, sm: 80 }, letterSpacing: '-.06em', fontWeight: 700 }}>{formatPrice(content.startingPrice)}</Typography>
            </Paper>
          </Box>
          <Typography sx={{ mt: 3, maxWidth: 650, color: 'text.secondary', lineHeight: 1.8 }}>{content.payments}</Typography>
        </Container>
      </Box>

      <Container component="section" aria-labelledby="howto-title" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 5, alignItems: 'center' }}>
          <Box><Typography id="howto-title" variant="h2" sx={{ fontSize: { xs: 36, md: 48 }, mb: 2 }}>Your wash.<br />Your way.</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>New to a self-serve car wash? Learn how to use the wash functions in this helpful video from our original site.</Typography></Box>
          <Box component="iframe" src={content.tutorialEmbedUrl} title="Understanding All Those Self-Serve Car Wash Functions" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen sx={{ width: '100%', aspectRatio: '16 / 9', border: 0, borderRadius: 5 }} />
        </Box>
      </Container>

      {content.photos.length > 1 && <Container component="section" aria-labelledby="photos-title" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography id="photos-title" variant="h2" sx={{ fontSize: { xs: 36, md: 48 }, mb: 4 }}>Around the wash</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
          {content.photos.slice(1).map(photo => <Box key={photo.src} component="img" src={photo.src} alt={photo.alt} loading="lazy" sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 5 }} />)}
        </Box>
      </Container>}

      <Box component="section" aria-labelledby="essentials-title" sx={{ bgcolor: '#e8efe9', py: { xs: 6, md: 8 } }}>
        <Container>
          <Typography id="essentials-title" variant="h2" sx={{ fontSize: { xs: 36, md: 48 }, mb: 2 }}>The finishing touches</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>Essential wash products for your convenience. {formatPrice(content.essentialsPrice)} each.</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
            {content.essentials.map(photo => <Paper key={photo.src} elevation={0} sx={{ p: 2.5 }}>
              <Box component="img" src={photo.src} alt={photo.alt} loading="lazy" sx={{ width: '100%', aspectRatio: '1', objectFit: 'contain' }} />
              <Typography sx={{ textAlign: 'center', fontWeight: 700, mt: 2 }}>{formatPrice(content.essentialsPrice)}</Typography>
            </Paper>)}
          </Box>
        </Container>
      </Box>

      {hasLocation && <Container component="section" id="visit" aria-labelledby="visit-title" sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: 24 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: content.mapEmbedUrl ? '1fr 1.3fr' : '1fr' }, gap: 5 }}>
          <Box><Typography id="visit-title" variant="h2" sx={{ fontSize: { xs: 36, md: 48 }, mb: 3 }}>Come by.<br />Clean up.</Typography>
            {content.address && <Typography sx={{ fontSize: 18, whiteSpace: 'pre-line', mb: 2 }}>{content.address}</Typography>}
            {content.hours && <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-line', mb: 2 }}>{content.hours}</Typography>}
            {content.phone && <Typography sx={{ mb: 3 }}><a href={content.phone.href}>{content.phone.label}</a></Typography>}
            {content.directionsUrl && <Button variant="contained" href={content.directionsUrl}>Get directions ↗</Button>}
          </Box>
          {content.mapEmbedUrl && <Box component="iframe" src={content.mapEmbedUrl} title="Rincon Car Wash location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen sx={{ width: '100%', height: 380, border: 0, borderRadius: 5 }} />}
        </Box>
      </Container>}
    </Box>

    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 5 }}>
      <Container>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
          <Brand />
          {content.links.length > 0 && <Stack component="nav" aria-label="More links" direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>{content.links.map(link => <Box component="a" key={link.href} href={link.href} sx={{ color: 'inherit' }}>{link.label}</Box>)}</Stack>}
        </Stack>
        <Divider sx={{ my: 3, borderColor: '#ffffff26' }} />
        <Typography sx={{ fontSize: 13, color: '#c6d9d5' }}>© {new Date().getFullYear()} {content.name}</Typography>
      </Container>
    </Box>
  </>;
}
