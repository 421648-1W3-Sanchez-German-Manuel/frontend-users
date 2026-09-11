import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config/api.config';
import { PublicProfile } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  getPublicProfile(id: string): Observable<PublicProfile> {
    return this.http.get<PublicProfile>(API.profile(id));
  }
}
