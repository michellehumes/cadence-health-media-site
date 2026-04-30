# Cadence Health Media Site

Static launch package for Cadence Health Media, focused on healthcare and pharma media consulting.

## Local Preview

```bash
npm run serve
```

Open `http://127.0.0.1:4173`.

The local server supports static form POST redirects so the guide and contact flows can be tested before deployment.

## QA

```bash
npm run qa
```

The QA script checks page metadata, local links, required assets, form actions, and banned public-claim or named-employer patterns.

## Launch Configuration

Before publishing, confirm these values:

- Calendly URL: replace `https://calendly.com/cadencehealthmedia/strategy-call` if the live event URL differs.
- Email: replace `hello@cadencehealthmedia.com` if a different inbox should receive inquiries.
- Domain: replace `https://cadencehealthmedia.com` in canonical, sitemap, Open Graph, and schema tags if the launch domain differs.
- Analytics: add a GA4, GTM, or privacy-friendly analytics container if conversion reporting should be active.

## Deployment Notes

- Netlify: forms and `_redirects` are ready.
- Other hosts: connect the forms to a CRM or form backend, or adapt `action` targets accordingly.
- The diagnostic is available after submission at `diagnostic.html` and is intentionally marked `noindex`.
