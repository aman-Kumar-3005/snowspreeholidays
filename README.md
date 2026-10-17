# Spree Holidays enquiry website

## Overview

Travel package website with a PHP enquiry endpoint. Package and traveller details are emailed for manual review rather than booked against live inventory.

## System architecture and modules

- `packages.html`, `package-details.html` and `destinations.html`: package content.
- `enquiry.html`: traveller and travel-preference form.
- `js/script.js`: page and form interactions.
- `send-enquiry.php`: input checks, email construction and JSON response.
- `css/` and `images/`: presentation assets.

## Tech stack

PHP, HTML5, CSS3 and JavaScript. No framework dependency manifest or SQL database is included.

## Local setup

Use a local PHP CLI installation. PHP mail delivery requires separate mail transport configuration; the development server does not provide SMTP.

```sh
git clone https://github.com/shreyasingh3005/snowspreeholidays.git
cd snowspreeholidays
php -S 127.0.0.1:8000
```

Open <http://127.0.0.1:8000/>. External fonts, icons, embeds and remote images still need Internet access where referenced by the HTML.

## Implementation notes

Review `$recipient_email` and `$sender_email` in the handler before using mail. The response reports success even when `mail()` fails. There is no SQL database, payment confirmation or automatic availability check. A received enquiry is not a confirmed reservation.

## Manual checks

Check desktop and mobile navigation, page links, image loading and browser console errors. Use synthetic form values. Inspect the intended request or message before submitting; do not send test enquiries to the configured business contacts.
