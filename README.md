# Transport Planner

A beginner-friendly college mini project for exploring sample journey options. Built with Node.js, Express, EJS, HTML, CSS, and browser JavaScript. It has no database and no login system.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). For automatic restarts while editing, run `npm run dev`.

## Pages and routes

- `GET /` displays the home page.
- `GET /planner` displays the journey form.
- `POST /plan` validates the form and renders matching transport options.
- `GET /about` explains the project.

## Project structure

```text
transport-planner/
├── app.js
├── package.json
├── public/
│   ├── css/style.css
│   └── js/script.js
├── views/
│   ├── index.ejs
│   ├── planner.ejs
│   ├── results.ejs
│   └── about.ejs
└── README.md
```

Sample transport options are stored in `app.js`. Hyderabad-to-Delhi has a dedicated long-distance example; other city pairs use generic local-trip demo values. Results are illustrative only and are not live schedules, fares, or availability.
