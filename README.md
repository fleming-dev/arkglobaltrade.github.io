# ARK GLOBAL — Squarespace files

Open `index.html` in a browser for a standalone preview. It loads `styles.css`, `script.js` and the local `assets` folder. No framework, package installation or build step is needed to use these files.

## Insert into Squarespace

1. Upload the ten images in `assets` to your Squarespace site and copy their public image URLs.
2. Open `squarespace-embed.html` in a text editor. Replace every `assets/filename` image reference with the corresponding uploaded image URL. Local computer paths will not work on the published site.
3. Add a Code Block to a blank page and paste the entire updated snippet as HTML, with display-source mode disabled. It contains all markup, CSS and vanilla JavaScript.
4. Use a full-width page section and reduce the surrounding block spacing. If your site already has a header, you can remove the `<header>...</header>` inside this snippet to avoid duplicate navigation.
5. Preview the saved page outside the editor and check both desktop and mobile layouts. JavaScript execution depends on your Squarespace plan and code settings. If inline scripts are unavailable in the block, put the contents of `script.js` in an allowed footer code-injection area, enclosed in `<script>` tags, after this page's markup.

All component styling is scoped to `#ark-global`, except optional smooth scrolling on the document. IDs have the `ark-` prefix. Insert the component once per page.

## Form behavior

The form validates required entries and prepares a `mailto:` enquiry addressed to `info@arkglobaltrading.com`. The visitor must send it from their email application. It does not store enquiries, submit to a server, or claim delivery. For automatic email delivery, replace it with a configured Squarespace Form Block or connect a form endpoint. Long messages may exceed some email clients' URL limits; direct email and WhatsApp links are also supplied.

Contact details and business copy were transcribed from the reference images. Verify them before publishing. Product popup text asks for sourcing requirements without promising availability. The supplied raster artwork was cropped from the screenshots, so it retains their resolution and background. Replace it with original high-resolution assets for the sharpest final result.

## Files

- `index.html`: standalone preview
- `styles.css`: responsive CSS
- `script.js`: menu, active navigation, product dialogs and enquiry behavior
- `squarespace-embed.html`: combined copy-and-paste version
- `assets/`: extracted reference artwork
- `build.cjs`: optional generator; run `node build.cjs` after editing the generator, CSS or JavaScript to regenerate both HTML versions
