# 🚀 RepoRefine

🔗 **Live Demo:** https://repo-refine.vercel.app/

**RepoRefine** is a GitHub profile and repository audit tool that analyzes profiles, repository links, activity patterns, tech stacks, README quality, and project health to detect weaknesses and generate actionable improvements — making your GitHub presence recruiter-ready.

RepoRefine combines deterministic GitHub GraphQL checks with optional Groq-powered review summaries so scoring stays transparent while recommendations can still feel personalized.

---

## ✨ Features

### 🔍 Profile Audit
- Profile completeness analysis
- Bio strength check
- Pinned repo validation
- Branding score
- Recruiter impression score

### 📂 Repository Health Analysis
- Analyze a single GitHub repository from its URL
- Tech stack detection from languages, manifests, config files, topics, Docker, and CI signals
- README quality scoring with detected and missing sections
- License detection
- Maintenance activity check
- Open issue count detection
- CI/CD presence detection
- Test folder detection
- Documentation scoring
- Feature and update recommendations for the given repository

### 📊 Commit & Activity Analysis
- Commit consistency detection
- Inactivity gap detection
- Commit message hygiene scoring
- Commit chronotype analysis

### 📈 Scoring System
- Profile Health Score (0–100)
- Repository Health Score
- Documentation Score
- Consistency Score
- Recruiter Readiness Index

### 📊 Visual Dashboard
- Radar skill graph
- Health score meter
- Repository audit cards
- Red/Yellow/Green indicators
- Commit heatmap visualization

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **API:** GitHub GraphQL API and optional Groq API
- **Auth:** GitHub Personal Access Token

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sushma-1706/RepoRefine.git
cd RepoRefine
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Add Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your values.

#### Getting your GitHub Personal Access Token (Required)

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name (e.g. `RepoRefine`)
4. Select these scopes:
   - `read:user` — to fetch profile data
   - `repo` — for repository analysis
5. Click **Generate token** and copy it
6. Paste it as the value of `GITHUB_TOKEN` in `.env.local`

> ⚠️ Without `GITHUB_TOKEN`, the app will silently fail with "Could not analyze profile."

#### Getting your Groq API Key (Optional)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Create an API key and paste it as `GROQ_API_KEY` in `.env.local`

> Without `GROQ_API_KEY`, AI review commentary will be replaced with a fallback message.

### 4️⃣ Run locally
```bash
npm run dev
```
App runs at:
```bash
http://localhost:3000
```
---
## ⚠️ GitHub API Rate Limits

RepoRefine uses the [GitHub GraphQL API](https://docs.github.com/en/graphql), which enforces rate limits on all requests.

### Limits at a glance

| Auth status | Rate limit |
|---|---|
| Unauthenticated | 60 requests / hour |
| Authenticated (with PAT) | 5,000 points / hour |

> RepoRefine makes multiple GraphQL queries per audit. **Always use a GitHub Personal Access Token (PAT)** to avoid hitting limits quickly.

### Symptoms of hitting the rate limit

- Audit results fail to load or appear incomplete
- You see a `403` error or a message like `API rate limit exceeded`
- The app stops responding mid-analysis

### How to fix it

**1. Add your GitHub PAT to `.env.local`**

````env
GITHUB_TOKEN=your_github_pat_here
````

Generate a token at [github.com/settings/tokens](https://github.com/settings/tokens). For read-only auditing, the following scopes are enough:
- `read:user`
- `repo` (for private repo analysis, optional)

**2. Check your current rate limit status**

Visit this URL while logged in to GitHub:
````
https://api.github.com/rate_limit
````
Look for `"graphql"` → `"remaining"` to see how many points you have left, and `"reset"` for when it refills.

**3. Wait for the reset**

Rate limits reset every hour. If you've hit the limit, wait until the reset time shown in the API response above.

### Tips to stay within limits

- Avoid auditing the same profile repeatedly in a short window
- Use a dedicated PAT for RepoRefine rather than a shared one
- If you're running RepoRefine locally for development/testing, keep audits spaced out

### 🧠 How It Works
RepoRefine uses GitHub GraphQL queries to fetch:
- Profile metadata
- Repository data
- Commit history
- Issues & pull requests
- Then it applies deterministic audit logic to:
- Detect weaknesses
- Calculate scores
- Generate structured improvement suggestions
- Identify the tech stack and README improvements for a pasted GitHub repository URL

If `GROQ_API_KEY` is configured, RepoRefine can also generate persona-based review commentary for profile audits.

### 📦 Future Enhancements
- PDF export mode
- Before vs After improvement comparison
- Recruiter bulk candidate mode
- Open-source scoring benchmark
 ---
### 📜 License
MIT License
