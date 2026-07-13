# iampoojatheauditor.com — Personal Portfolio

A fast, custom-coded portfolio site for Pooja Singh.
No website-builder, no monthly hosting bill — just three small files you fully own.

## What's in here

```
MyWebsiteDevelopment/
├── index.html        ← all the page content (edit text here)
├── css/styles.css    ← all the styling / colors
├── js/main.js        ← theme toggle, menu, lightbox, animations
├── favicon.svg       ← the little browser-tab icon
├── CNAME             ← your custom domain (for GitHub Pages) — leave as-is
├── .nojekyll         ← tells GitHub Pages not to reprocess the site — leave as-is
└── assets/
    ├── Pooja-Singh-Resume.pdf   ← your résumé (already generated ✅)
    ├── og-image.png             ← LinkedIn/social share preview (already made ✅)
    ├── pooja.jpg                ← your headshot (add this)
    ├── moment-1/2/3.jpg         ← personal photos (add these)
    └── proj-*.jpg               ← project cover images (add these)
```

Three focus areas, each with its own accent color:
- **GRC, IT Risk & Audit** (blue)
- **ServiceNow Development** (emerald)
- **AI Development & Prompt Engineering** (violet)

## Preview it on your own computer

Open a terminal in this folder and run:

```
py -m http.server 8347
```

Then open **http://127.0.0.1:8347** in your browser. Stop the server with `Ctrl+C`.
(You can also just double-click `index.html`, but the local server matches how it'll behave when live.)

## Your résumé (already added ✅)

A PDF of your CV was generated at `assets/Pooja-Singh-Resume.pdf`, so the **Download résumé**
buttons already work. To update it later: in Word do **File → Save As → PDF**, name it exactly
`Pooja-Singh-Resume.pdf`, and replace the file in `assets/`.

---

## Adding your own content — photos, video, projects, GitHub

Everything is a plain file in the `assets/` folder plus a tiny edit in `index.html`.
You don't need to "upload" anywhere special — on GitHub you just drag files into `assets/` and commit.
Look for the `✏️ EDIT` and `HOW TO USE` comments already placed in `index.html`.

### 1. Your profile photo
Save a headshot as **`assets/pooja.jpg`**. It appears automatically in the hero (the "PS"
placeholder disappears). Square-ish, at least 600×750px looks best.

### 2. The About text (about you / hobbies / family)
In `index.html`, find the **"Beyond the résumé"** block. Replace the placeholder sentences inside
each `<p class="editable">…</p>`. Remove the word `editable` from the class once you've written
your own text, and the dashed style goes away.

### 3. Personal photos ("A few moments")
Save photos as **`assets/moment-1.jpg`, `moment-2.jpg`, `moment-3.jpg`**. They fill the gallery
and become click-to-zoom automatically. Want more than three? Copy one `<figure class="gallery__item">…</figure>`
block and rename the file.

### 4. A project or research paper
Each project card in the **Projects** section can hold:
- **Cover image** → save e.g. `assets/proj-sox.jpg` (the filename is shown on each placeholder).
- **PDF** → drop the paper in `assets/`, set the link's `href="assets/your-paper.pdf"`, and delete
  `is-todo` from that link's class so it becomes clickable.
- **GitHub / Demo** → set `href` to your repo or live URL, then delete `is-todo`.

To add a **new** project, copy the `TEMPLATE` card (the dashed "Add your next project" one) and fill it in.

### 5. A video (YouTube or your own file)
In the **Demos & Code** section, find the `.video` block. Replace the `.video__ph` placeholder with **one** of:
```html
<!-- YouTube -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Demo" allowfullscreen loading="lazy"></iframe>

<!-- OR a file you own -->
<video controls preload="metadata" poster="assets/video-poster.jpg" src="assets/intro.mp4"></video>
```
For a YouTube link like `youtube.com/watch?v=ABC123`, the `VIDEO_ID` is `ABC123`.

### 6. GitHub repositories
Once your GitHub is set up, tell me your username (or edit yourself): in the **Repositories** block,
set each `<a class="repo …" href="https://github.com/USERNAME/REPO">`, update the name/description,
and delete `is-todo`. Also update the **"View my GitHub"** button's `href`.

> **Tip on image size:** keep photos under ~500 KB each (JPG, ~1600px wide max) so the site stays fast.
> Free tools like squoosh.app or tinypng.com shrink them in seconds.

---

## Going live on GitHub Pages (free — no GoDaddy hosting needed)

You already own the domain at GoDaddy; that's all you needed from them.
GitHub Pages hosts the site for free **and** gives you a public GitHub profile — a credibility
plus for the ServiceNow and AI sections. No coding tools required; you can do it all in the browser.

The `CNAME` and `.nojekyll` files in this folder are already set up for your domain — leave them as-is.

### Step 1 — Create the account & repository
1. Sign up (free) at **github.com**. Pick a clean username — it becomes part of your URL
   (e.g. `poojasingh`).
2. Click **New repository**. Name it exactly **`<your-username>.github.io`**
   (for example `poojasingh.github.io`). Set it **Public**, then **Create repository**.

### Step 2 — Upload the site files
1. On the new repo page, click **"uploading an existing file"**.
2. Select **everything inside this folder** — `index.html`, the `css`, `js`, `assets` folders,
   `favicon.svg`, `CNAME`, `.nojekyll` — and drag them in. (Upload the *contents*, not the
   outer `MyWebsiteDevelopment` folder itself.)
3. Click **Commit changes**. Your site is now live at `https://<your-username>.github.io`.

### Step 3 — Turn on Pages + custom domain
1. In the repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source: Deploy from a branch**, branch **main**, folder **/(root)**, Save.
3. Under **Custom domain**, type `iampoojatheauditor.com` and Save. Tick **Enforce HTTPS**
   (may take a few minutes to become available).

### Step 4 — Point the GoDaddy domain at GitHub
In **GoDaddy → your domain → DNS → Manage DNS**, add these records:

| Type  | Name | Value                         |
|-------|------|-------------------------------|
| A     | @    | 185.199.108.153               |
| A     | @    | 185.199.109.153               |
| A     | @    | 185.199.110.153               |
| A     | @    | 185.199.111.153               |
| CNAME | www  | `<your-username>.github.io`   |

Delete any existing "Parked" / forwarding A record on `@` first if GoDaddy added one.
DNS changes take ~15 min to a few hours to spread. Then `iampoojatheauditor.com` shows your site,
with free HTTPS. 🎉

### Updating the site later
Edit files here, then in the repo click **Add file → Upload files** (or edit a file directly on
GitHub) and commit. Changes go live in a minute or two.

---

## The one-time DNS step, in plain English

Your GoDaddy domain currently isn't pointed anywhere (that's the "Let's connect" screen you saw).
GitHub Pages gives your files an address; the A/CNAME records above tell
`iampoojatheauditor.com` to send visitors to that address. That's the whole trick —
GoDaddy stays your **registrar**, GitHub serves the **site**, and you pay nothing extra.
