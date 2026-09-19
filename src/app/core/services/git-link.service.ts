import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config/api.config';

/** Where the callback returns after a successful link (§9.4). One-shot flag. */
export type GitLinkReturn = 'onboarding' | 'profile';

const RETURN_KEY = 'fu.gitLinkReturn';

export interface GitLinkStartResponse {
  authorizationUrl: string;
}

export interface GitLinkCallbackRequest {
  code: string;
  state: string;
}

export interface GitLinkResponse {
  provider: string;
  username: string;
}

export interface GitProviderLinkView {
  provider: string;
  username: string;
  linkedAt: string;
}

/** Git hosting provider linking (SPEC-git-provider-linking §9). */
@Injectable({ providedIn: 'root' })
export class GitLinkService {
  private readonly http = inject(HttpClient);

  start(provider: string): Observable<GitLinkStartResponse> {
    return this.http.post<GitLinkStartResponse>(API.gitLinkStart(provider), {});
  }

  callback(provider: string, body: GitLinkCallbackRequest): Observable<GitLinkResponse> {
    return this.http.post<GitLinkResponse>(API.gitLinkCallback(provider), body);
  }

  unlink(provider: string): Observable<void> {
    return this.http.delete<void>(API.gitLinkByProvider(provider));
  }

  list(): Observable<GitProviderLinkView[]> {
    return this.http.get<GitProviderLinkView[]>(API.gitLinks);
  }

  /**
   * sessionStorage, not localStorage: it belongs to the tab that is leaving
   * for GitHub and cleans itself up. Read-once: the callback consumes it.
   */
  rememberReturn(where: GitLinkReturn): void {
    sessionStorage.setItem(RETURN_KEY, where);
  }

  takeReturn(): GitLinkReturn | null {
    const value = sessionStorage.getItem(RETURN_KEY);
    sessionStorage.removeItem(RETURN_KEY);
    return value === 'onboarding' || value === 'profile' ? value : null;
  }
}
