import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config/api.config';
import {
  AdminUser,
  ChangeRoleRequest,
  CreateUserRequest,
  CreateWhitelistRequest,
  DeleteUserRequest,
  ReviewWhitelistRequest,
  WhitelistRequest,
} from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);

  /** Inferred endpoint (not in the handoff) — confirm shape with backend. */
  listUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(API.users);
  }

  createUser(body: CreateUserRequest): Observable<AdminUser> {
    return this.http.post<AdminUser>(API.users, body);
  }

  deleteUser(id: string, body: DeleteUserRequest): Observable<void> {
    return this.http.request<void>('delete', API.userById(id), { body });
  }

  changeRole(id: string, body: ChangeRoleRequest): Observable<AdminUser> {
    return this.http.patch<AdminUser>(API.userRole(id), body);
  }

  createWhitelistRequest(body: CreateWhitelistRequest): Observable<WhitelistRequest> {
    return this.http.post<WhitelistRequest>(API.whitelistRequests, body);
  }

  /** Inferred endpoint (not in the handoff) — confirm shape with backend. */
  listWhitelistRequests(): Observable<WhitelistRequest[]> {
    return this.http.get<WhitelistRequest[]>(API.whitelistRequests);
  }

  reviewWhitelistRequest(id: string, body: ReviewWhitelistRequest): Observable<WhitelistRequest> {
    return this.http.patch<WhitelistRequest>(API.whitelistRequestById(id), body);
  }
}
