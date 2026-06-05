import { graphql } from "@octokit/graphql";
import { GraphQLErrorResponse } from "@/lib/github/graphql-types";

export const github = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export function isGraphQLError(error: unknown): error is GraphQLErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as GraphQLErrorResponse).errors)
  );
}

export function formatGitHubError(error: unknown): string {
  if (isGraphQLError(error)) {
    return error.errors[0]?.message ?? "GitHub API failed";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "GitHub API failed";
}
