export interface CommitAnalytics {
  available: boolean;
  hygiene: {
    score: number;
    analyzedCount: number;
    goodCount: number;
    weakCount: number;
    insights: string[];
  };
  contributionTrend: {
    totalLastYear: number;
    monthly: Array<{ month: string; count: number }>;
    direction: "up" | "down" | "stable";
    recentAverage: number;
    priorAverage: number;
  };
  inactivity: {
    longestGapDays: number;
    gapsOver30Days: number;
    daysSinceLastCommit: number | null;
    notableGaps: Array<{ start: string; end: string; days: number }>;
    insight: string;
  };
  chronotype: {
    peakDay: string;
    peakHour: number;
    peakHourLabel: string;
    dayDistribution: Array<{ day: string; count: number }>;
    hourDistribution: Array<{ hour: number; count: number }>;
    label: string;
    insight: string;
  };
}

export interface ProfileAnalysis {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  scores: {
    total: number;
    profile: number;
    repoQuality: number;
    consistency: number;
    branding: number;
    commitHygiene?: number;
    velocity?: number;
    contribution?: number;
  };
  stats: {
    totalRepos: number;
    totalStars: number;
    forks: number;
  };
  repos: AnalyzedRepo[];
  redFlags: string[];
  strengths: string[];
  commitAnalytics?: CommitAnalytics;
  recommendations?: string[];
  aiReview: {
    persona: string;
    commentary: string;
    roadmap: string[];
  };
}

export interface AnalyzedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  issues: string[]; // e.g. "No Documentation", "No License"
  score: number; // 0-100
}

export type Persona = 'recruiter' | 'roast' | 'mentor';