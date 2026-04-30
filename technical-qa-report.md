# Cadence Health Media Technical QA Report

Date: 2026-04-30

## Scope

Reviewed and created a static website package for Cadence Health Media focused on healthcare and pharma media consulting. The site avoids past employer names and public dollar claims while emphasizing HCP media strategy, omnichannel planning, analytics, vendor orchestration, lead generation, and Calendly conversion.

## Pages Created

- `index.html`: Conversion-focused homepage with positioning, services preview, credibility, lead magnet, and strategy-call CTA.
- `services.html`: Detailed service page covering HCP strategy, omnichannel planning, analytics, partner orchestration, and lead generation.
- `guide.html`: Lead magnet landing page for the HCP Media Planning Diagnostic.
- `contact.html`: Booking and inquiry flow with Calendly CTA and email fallback.
- `thank-you.html`: Post-conversion page for lead magnet and contact form submissions.
- `styles.css`: Responsive visual system, layout, typography, forms, and CTAs.
- `analytics.js`: Lightweight dataLayer and optional gtag event hooks for CTA clicks and form submissions.
- `assets/favicon.svg`: Brand favicon.
- `assets/og-image.svg`: Social sharing image.
- `diagnostic.html`: Printable HCP Media Planning Diagnostic asset.
- `privacy.html`: Privacy and no-PHI form guidance page.
- `package.json` and `scripts/qa.mjs`: Repeatable local QA command.
- `scripts/serve.mjs`: Local preview server that supports static form POST redirects for QA.
- `README.md`: Launch, preview, QA, and deployment notes.
- `404.html`: Branded fallback page.
- `netlify.toml`: Netlify publish, headers, cache, redirects, and 404 configuration.
- `launch-plan.md`: CEO launch sequence, conversion priorities, first 30 days, and analytics events.
- `robots.txt`: Search crawler access.
- `sitemap.xml`: Sitemap entries for core pages.
- `_redirects`: Netlify-friendly clean URL routing for extensionless canonical URLs.

## Messaging QA

- No past employer names are used.
- No public dollar claims, revenue claims, media spend claims, or unsupported numeric performance claims are used.
- Positioning clearly targets healthcare and pharma teams.
- Core service language includes:
  - HCP media strategy
  - Omnichannel planning
  - Analytics and measurement
  - Vendor and partner orchestration
  - Lead generation and conversion
  - Calendly booking
- Credibility is framed through experience areas and operating fluency, not named logos.

## SEO QA

- Each page includes a unique title tag.
- Each page includes a unique meta description.
- Each page includes a canonical URL.
- Each page includes Open Graph title, description, and type.
- Core pages include an Open Graph image.
- Homepage includes Twitter card metadata.
- Sitemap and robots files are present.
- Homepage includes `ProfessionalService` structured data.

Recommended before launch:

- Replace `https://cadencehealthmedia.com` if the final domain differs.
- Confirm whether the final site should use `cadencehealthmedia.com` or another domain, then update canonical, sitemap, and OG URLs if needed.
- Add a full business address only if the consulting practice wants local SEO visibility.

## Conversion QA

- Primary CTA: Book a strategy call.
- Secondary CTA: Get the HCP Media Planning Diagnostic.
- Lead magnet concept is specific to the buyer's planning problem.
- Contact page gives both booking and email inquiry paths.
- Calendly placeholder URL is present: `https://calendly.com/cadencehealthmedia/strategy-call`.
- Forms now post to `thank-you.html` with Netlify-compatible static form attributes.
- Forms include honeypot spam fields.
- CTA clicks and form submits push events to `window.dataLayer` and optional `gtag`.

Recommended before launch:

- Replace placeholder Calendly URL with the live event URL.
- Replace `hello@cadencehealthmedia.com` if a different inbox should receive leads.
- If not deploying on Netlify, connect the forms to HubSpot, Webflow, Formspree, or the site's CRM form handler.
- Add a GA4 or GTM container snippet if analytics reporting should be active on launch.

## Accessibility QA

- Semantic headings are used in order.
- Forms include visible labels.
- Navigation has an accessible label.
- Buttons and links have descriptive text.
- Color contrast is designed to be high across primary text and CTAs.
- Visible keyboard focus styles are included for links, buttons, inputs, and text areas.

Recommended before launch:

- Run Lighthouse or axe in the deployment environment.

## Responsive QA

- CSS includes breakpoints for tablet and mobile layouts.
- Grid sections collapse to single-column layouts under 900px.
- CTA rows and navigation stack under 620px.
- Buttons and form fields become full width on small screens.

Recommended before launch:

- Check on real iPhone and desktop viewport widths after the final Calendly embed is added.

## Technical Risks

- Static forms are configured for Netlify. If the site is hosted elsewhere, the form `action` and backend need to be connected.
- Calendly link is a placeholder until the live account URL is confirmed.
- Analytics events are instrumented, but no GA4/GTM container ID is installed yet.
- No cookie consent logic is included because no tracking scripts are currently installed.

## Local QA Checks Run

- Searched the content for dollar claims and major employer or pharma company names; no matches were found.
- Reviewed page-level titles, descriptions, canonical tags, Open Graph tags, Calendly link, and email links.
- Reviewed all visible internal links and confirmed the linked static files are present.
- Added and reviewed form submission paths, thank-you page flow, CTA tracking hooks, favicon, OG image, and schema.
- Added Netlify clean URL redirects for `/services`, `/guide`, `/contact`, and `/thank-you`.
- Added a repeatable `npm run qa` script to check metadata, local links, form actions, required assets, and banned claim/name patterns.
- Added `npm run serve` for local preview with static form POST handling.
- Browser-tested homepage, contact, guide, diagnostic, and thank-you pages in local preview.
- Browser-tested guide form and contact inquiry form using fake QA data; both redirect to `thank-you.html`.
- Browser console check on the diagnostic page returned no errors.
- Adjusted desktop typography and spacing after visual QA so primary CTAs appear earlier in common viewports.
- Adjusted diagnostic table columns after visual QA so scoring labels are readable.
- Added buyer FAQ language, clearer service deliverables, security headers, asset caching, Netlify routing, and a branded 404 page.

## Recommended Next Steps

1. Connect a live Calendly event.
2. Deploy on Netlify or connect the forms to the preferred CRM/form backend.
3. Add GA4, GTM, or privacy-friendly analytics using the existing `dataLayer` events.
4. Publish to the final domain and rerun Lighthouse, link checks, and mobile QA.
5. Replace placeholder email and domain values if they differ from the launch configuration.
