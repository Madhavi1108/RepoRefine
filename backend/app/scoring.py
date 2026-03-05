from __future__ import annotations

from collections import Counter
from typing import Any


def _commit_hygiene_score(commit_messages: list[str]) -> int:
    if not commit_messages:
        return 20

    good = 0
    for message in commit_messages:
        normalized = message.strip()
        if len(normalized) >= 10 and normalized[0].isupper() and "update" not in normalized.lower():
            good += 1

    return round((good / len(commit_messages)) * 100)


def score_recruiter_readiness(aggregated: dict[str, Any]) -> dict[str, Any]:
    repo_count = aggregated["repository_count"]
    commit_count = aggregated["commit_count_sample"]
    total_contributions = aggregated["total_contributions_last_year"]
    inactive_repos = aggregated["inactive_repository_count"]
    commit_messages = aggregated["commit_messages"]

    velocity_score = min(100, round((commit_count / 100) * 100))
    consistency_score = max(0, 100 - (inactive_repos * 8))
    contribution_score = min(100, round((total_contributions / 500) * 100))
    hygiene_score = _commit_hygiene_score(commit_messages)
    project_depth_score = min(100, round((repo_count / 12) * 100))

    overall = round(
        (velocity_score * 0.2)
        + (consistency_score * 0.25)
        + (contribution_score * 0.25)
        + (hygiene_score * 0.15)
        + (project_depth_score * 0.15)
    )

    recommendations: list[str] = []
    if consistency_score < 65:
        recommendations.append("Reduce inactive repositories by pushing updates at least once per quarter.")
    if hygiene_score < 60:
        recommendations.append("Use clearer commit messages with concise, descriptive headlines.")
    if contribution_score < 60:
        recommendations.append("Increase weekly contributions with smaller, frequent pull requests.")
    if project_depth_score < 60:
        recommendations.append("Showcase more production-quality repositories with README and tests.")

    if not recommendations:
        recommendations.append("Strong profile. Continue maintaining consistency and measurable impact.")

    language_breakdown = Counter(dict(aggregated["top_languages"]))

    return {
        "scores": {
            "overall": overall,
            "velocity": velocity_score,
            "consistency": consistency_score,
            "contribution": contribution_score,
            "commit_hygiene": hygiene_score,
            "project_depth": project_depth_score,
        },
        "language_breakdown": language_breakdown,
        "recommendations": recommendations,
    }
