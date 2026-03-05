from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
from typing import Any


def _parse_iso(date_str: str) -> datetime:
    return datetime.fromisoformat(date_str.replace("Z", "+00:00"))


def aggregate_activity(user_data: dict[str, Any]) -> dict[str, Any]:
    repositories = user_data.get("repositories", {}).get("nodes", [])
    commit_total = 0
    inactive_repos = 0
    commit_messages: list[str] = []
    language_counter: Counter[str] = Counter()

    now = datetime.now(timezone.utc)

    for repo in repositories:
        language = (repo.get("primaryLanguage") or {}).get("name") or "Unknown"
        language_counter[language] += 1

        pushed_at = repo.get("pushedAt")
        if pushed_at:
            age_days = (now - _parse_iso(pushed_at)).days
            if age_days > 180:
                inactive_repos += 1

        history_nodes = (
            repo.get("defaultBranchRef", {})
            .get("target", {})
            .get("history", {})
            .get("nodes", [])
        )
        commit_total += len(history_nodes)
        commit_messages.extend([c.get("messageHeadline", "") for c in history_nodes])

    contribution_total = (
        user_data.get("contributionsCollection", {})
        .get("contributionCalendar", {})
        .get("totalContributions", 0)
    )

    return {
        "repository_count": len(repositories),
        "commit_count_sample": commit_total,
        "total_contributions_last_year": contribution_total,
        "inactive_repository_count": inactive_repos,
        "top_languages": language_counter.most_common(5),
        "commit_messages": commit_messages,
    }
