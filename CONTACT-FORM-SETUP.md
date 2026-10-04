# MJ Hub Contact Form

The form is intentionally ready for a static GitHub Pages deployment.

## Why Formspree?

GitHub Pages does not execute server-side functions. Formspree supports ordinary HTML forms and accepts submissions through a unique form endpoint.

## What you need to do

1. Create a Formspree account.
2. Create a new form.
3. Set the target email to your MJ Hub inbox.
4. Copy the unique form endpoint.
5. Open `contact.html`.
6. Find:

   https://formspree.io/f/YOUR_FORM_ID

7. Replace `YOUR_FORM_ID` with the ID from your Formspree dashboard.

Do not replace the whole URL with your email address.

The form already includes:
- Name
- Email
- Enquiry Type
- Message
- Send button
- Browser validation
- AJAX submission
- Success/error feedback
- Honeypot field

The direct email link remains separate.
