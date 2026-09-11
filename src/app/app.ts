import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainer } from './shared/ui/toast/toast-container';
import { DevMailbox } from './shared/ui/dev-mailbox/dev-mailbox';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainer, DevMailbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  // Eagerly instantiated so the data-theme attribute is set before any
  // route-specific component (which might not use ThemeToggle) renders.
  private readonly theme = inject(ThemeService);
}
