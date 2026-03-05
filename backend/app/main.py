from __future__ import annotations

from fastapi import FastAPI, HTTPException

from .analytics import aggregate_activity
from .github_graphql import GitHubGraphQLError, fetch_github_analytics
from .scoring import score_recruiter_readiness

app = FastAPI(title="RepoRefine Analytics API", version="0.1.0")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/v1/analyze/{username}")
async def analyze_developer(username: str) -> dict:
    try:
        user_data = await fetch_github_analytics(username)
        aggregated = aggregate_activity(user_data)
        scoring = score_recruiter_readiness(aggregated)
        return {
            "developer": {
                "login": user_data.get("login"),
                "name": user_data.get("name"),
                "followers": user_data.get("followers", {}).get("totalCount", 0),
            },
            "analytics": {
                k: v for k, v in aggregated.items() if k != "commit_messages"
            },
            "recruiter_readiness": scoring,
        }
    except GitHubGraphQLError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
