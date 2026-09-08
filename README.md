# North Pacific Marine Research Station

An easy-level Web / Recon CTF challenge. Players explore a marine research
station's website, perform directory enumeration to discover a hidden
`/salmon` archive page, then inspect the page's HTML source to find the flag
inside an HTML comment.

- Category: Web / Recon
- Difficulty: Easy
- Flag: `flag{sen_si_vix_six_seven}`

## Project structure

```
project/
├── api/
│   └── index.js       # Express app, exported for Vercel serverless functions
├── public/
│   ├── index.html      # Homepage
│   ├── salmon.html      # Hidden legacy archive (contains the flag in a comment)
│   └── style.css
├── package.json
├── vercel.json
└── README.md
```

## Local development

```bash
npm install
npm run dev
```

This starts the Express app directly with `node api/index.js` at
`http://localhost:3000`. Visit `/` for the homepage and `/salmon` for the
hidden archive page.

## Deploying to Vercel (free tier)

1. Push this project to a GitHub repository (or any Git provider Vercel
   supports).
2. Go to [vercel.com](https://vercel.com), create a new project, and import
   the repository. No environment variables or database are required.
3. Vercel will detect `api/index.js` as a Node.js serverless function and use
   `vercel.json` to route all requests (`/`, `/salmon`, anything else) through
   it.
4. Deploy. Your challenge will be live at `https://your-project.vercel.app`.

Alternatively, using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Verifying the challenge

```bash
curl -i https://your-project.vercel.app/            # 200, homepage
curl -i https://your-project.vercel.app/salmon       # 200, legacy archive
curl -i https://your-project.vercel.app/does-not-exist  # 404
```

Directory enumeration tools such as `dirb` or `gobuster` will find `/salmon`
because it responds with `200 OK`, while unknown paths return `404`. The flag
is only present in the HTML source of `/salmon`, inside a comment — it is
never rendered on the page, and is not exposed via headers, JavaScript,
robots.txt, or any other channel.

## Notes for challenge admins

- No database, authentication, or environment variables are needed.
- No rate limiting or bot detection is implemented, by design, to keep this
  challenge beginner-friendly for scanning tools.
- The application performs no file system access, command execution, or file
  uploads beyond serving the three static-content routes described above.
