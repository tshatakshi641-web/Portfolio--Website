# Shatakshi Tiwari — Portfolio

A typography-first, recruiter-friendly portfolio built with React + Tailwind. Deployable to GitHub Pages.

## Edit your details

All content lives in **one file**:

```
frontend/src/data/portfolio.js
```

Update the placeholders for `phone`, `linkedin`, `github`, and `resumeUrl` there.

To enable the resume download:
1. Drop your resume PDF into `frontend/public/` and name it `resume.pdf`
2. (or change `resumeUrl` in `portfolio.js` to any public URL)

## Local development

```bash
cd frontend
yarn install
yarn start
```

Open http://localhost:3000

## Deploy to GitHub Pages (Portfolio--Website repo)

This is a static React build — perfect for GitHub Pages.

### One-time setup

1. Install the `gh-pages` helper:
   ```bash
   cd frontend
   yarn add --dev gh-pages
   ```

2. Open `frontend/package.json` and add at the top level:
   ```json
   "homepage": "https://<your-github-username>.github.io/Portfolio--Website",
   ```

3. Add these two scripts inside the `"scripts"` block:
   ```json
   "predeploy": "yarn build",
   "deploy": "gh-pages -d build"
   ```

4. (Frontend uses `REACT_APP_BACKEND_URL` only for an environment unrelated to this portfolio — the portfolio itself makes **no API calls**, so no env vars are needed for GitHub Pages.)

### Deploy

From the `frontend/` directory:

```bash
yarn deploy
```

This builds the site and pushes the static files to the `gh-pages` branch of your repo.

Then on GitHub:
- Open your `Portfolio--Website` repo → **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **/ (root)** → Save

Your site will be live at `https://<your-github-username>.github.io/Portfolio--Website` within a minute.

### Custom domain (optional)

Add a `CNAME` file to `frontend/public/` containing your domain (e.g. `shatakshi.dev`).

## Contact

The contact button uses a plain `mailto:` link — works perfectly on GitHub Pages with no backend needed.
