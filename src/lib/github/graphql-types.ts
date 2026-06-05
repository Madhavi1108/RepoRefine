/** Shared GitHub GraphQL primitives — only fields requested by our queries. */

export interface TotalCount {
  totalCount: number;
}

export interface NamedEntity {
  name: string;
}

export interface LicenseInfo {
  name: string;
}

export interface GitBlob {
  text: string;
}

export interface GitTreeEntry {
  name: string;
  type: string;
}

export interface GitTree {
  entries: GitTreeEntry[];
}

export interface LanguageEdge {
  node: NamedEntity;
}

export interface TopicNode {
  topic: NamedEntity;
}

/** Profile query (`PROFILE_QUERY` in github-service.ts) */
export interface ProfileRepoNode {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  primaryLanguage: NamedEntity | null;
  licenseInfo: LicenseInfo | null;
  object: GitBlob | null;
}

export interface ProfileQueryResponse {
  user: {
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    twitterUsername: string | null;
    websiteUrl: string | null;
    followers: TotalCount;
    stats: TotalCount;
    repositories: { nodes: ProfileRepoNode[] };
  } | null;
}

/** Repository query (`REPO_QUERY` in repo-service.ts) */
export interface RepositoryNode {
  name: string;
  description: string | null;
  url: string;
  isFork: boolean;
  isPrivate: boolean;
  pushedAt: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: NamedEntity | null;
  licenseInfo: LicenseInfo | null;
  repositoryTopics: { nodes: TopicNode[] };
  languages: { edges: LanguageEdge[] };
  issues: TotalCount;
  readme: GitBlob | null;
  root: GitTree | null;
  workflows: GitTree | null;
}

export interface RepoQueryResponse {
  repository: RepositoryNode | null;
}

/** Blob probe query (`BLOB_QUERY` in repo-service.ts) */
export interface BlobQueryResponse {
  repository: {
    object: GitBlob | null;
  } | null;
}

export interface GraphQLErrorItem {
  message: string;
}

export interface GraphQLErrorResponse {
  errors: GraphQLErrorItem[];
}
