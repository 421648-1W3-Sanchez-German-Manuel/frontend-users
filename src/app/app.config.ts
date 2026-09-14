import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Con la sesión en cookies HttpOnly, JS no puede leer si hay un access
    // token — la única forma de saberlo al arrancar es preguntarle al
    // servidor. restoreSession() nunca rechaza (un 401 acá es un visitante
    // anónimo, no un error), así que esto no puede trabar el arranque.
    provideAppInitializer(() => firstValueFrom(inject(AuthService).restoreSession())),
  ]
};
