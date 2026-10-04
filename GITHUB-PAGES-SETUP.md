# MJ Hub GitHub Pages Setup

This package is prepared for a GitHub Pages deployment.

## Included

* Static HTML pages
* Existing CSS and JavaScript
* Mobile navigation and accessibility scripts
* 404 page
* robots.txt
* sitemap.xml
* .nojekyll
* GitHub Actions Pages deployment workflow
* favicon
* available site images
* GitHub Pages compatible contact form
* Contact form status handling and honeypot

## 1. Upload the package contents

Upload the contents of this package to the root of the GitHub repository that should publish MJ Hub.

The repository should contain:

    index.html
    about.html
    projects.html
    writing.html
    contact.html
    style.css
    js/script.js
    images/
    favicon.svg
    404.html
    robots.txt
    sitemap.xml
    .nojekyll
    .github/workflows/pages.yml

The five project images referenced by `projects.html` are not present in the current ChatGPT file library, so keep the corresponding files from your existing GitHub project inside `images/`:

    solar-hybrid-fish-dryer.jpg
    motorized-screw-jack.jpg
    solar-dryer.jpg
    shaft-remover.jpg
    fruit-sorting-machine.jpg

Do not replace those with invented images.

## 2. Enable Pages

Open:

Repository → Settings → Pages

Set:

    Source: GitHub Actions

The included workflow deploys the repository whenever you push to `main`.

## 3. Custom domain

Your exact purchased domain name was not included in the request, so `CNAME.template` is intentionally not activated.

When you know the exact domain:

1. Rename `CNAME.template` to `CNAME`.
2. Put only the domain name inside it.
3. Commit and push.

GitHub recommends verifying your custom domain before connecting it to Pages.

## 4. DNS

For an apex domain such as `example.com`, GitHub currently documents:

    A  @  185.199.108.153
    A  @  185.199.109.153
    A  @  185.199.110.153
    A  @  185.199.111.153

For IPv6, GitHub documents:

    AAAA  @  2606:50c0:8000::153
    AAAA  @  2606:50c0:8001::153
    AAAA  @  2606:50c0:8002::153
    AAAA  @  2606:50c0:8003::153

For `www`:

    CNAME  www  YOUR-GITHUB-USERNAME.github.io

GitHub recommends using the `www` variant alongside an apex domain for HTTPS stability.

Do not use wildcard DNS records.

DNS changes can take up to 24 hours.

## 5. HTTPS

After DNS is correct, go to:

Repository → Settings → Pages

and enable:

    Enforce HTTPS

Certificate issuance can take some time.

## 6. Contact form

GitHub Pages does not execute server-side code. The MJ Hub form therefore uses Formspree as the form-processing service.

In `contact.html`, find:

    https://formspree.io/f/YOUR_FORM_ID

Create your Formspree form, copy its unique endpoint, and replace `YOUR_FORM_ID`.

The form keeps the existing MJ Hub design and includes:

* Name
* Email
* Enquiry Type
* Message
* Send button
* Browser validation
* AJAX submission
* Success/error feedback
* Honeypot spam field

The direct `mailto:` email link remains available as a fallback.

## 7. Domain-specific SEO

Before going live, replace `YOUR-DOMAIN.COM` in:

* `robots.txt`
* `sitemap.xml`
* canonical URLs
* Open Graph URLs

with the actual domain.

The domain was deliberately not guessed.

## 8. No secrets in GitHub

Do not put:

* email passwords
* SMTP passwords
* private API keys
* Formspree private credentials

into the repository.

The public Formspree form endpoint is intended to appear in the browser, but account credentials must remain private.

## Official GitHub references

GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

Custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

Custom-domain DNS: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
