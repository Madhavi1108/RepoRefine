import { CommitAnalytics } from "@/types";

export const UNAVAILABLE_COMMIT_ANALYTICS: CommitAnalytics = {
  available: false,
  hygiene: {
    score: 0,
    analyzedCount: 0,
    goodCount: 0,
    weakCount: 0,
    insights: ["Commit analytics require the Python backend API."],
  },
  contributionTrend: {
    totalLastYear: 0,
    monthly: [],
    direction: "stable",
    recentAverage: 0,
    priorAverage: 0,
  },
  inactivity: {
    longestGapDays: 0,
    gapsOver30Days: 0,
    daysSinceLastCommit: null,
    notableGaps: [],
    insight: "Inactivity analysis is unavailable without backend commit aggregation.",
  },
  chronotype: {
    peakDay: "N/A",
    peakHour: 0,
    peakHourLabel: "N/A",
    dayDistribution: [],
    hourDistribution: [],
    label: "Unavailable",
    insight: "Activity pattern analysis requires backend commit analytics.",
  },
};
