import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggle } from './theme-toggle';
import { ThemeService } from '../../../core/services/theme.service';

describe('ThemeToggle', () => {
  let fixture: ComponentFixture<ThemeToggle>;
  let themeService: ThemeService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
      providers: [ThemeService],
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render mode and style toggle buttons', () => {
    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  });

  it('should update mode on clicking light or dark buttons', () => {
    const el = fixture.nativeElement as HTMLElement;
    const lightBtn = el.querySelector<HTMLButtonElement>('button[aria-label="Modo día"]')!;
    const darkBtn = el.querySelector<HTMLButtonElement>('button[aria-label="Modo noche"]')!;

    lightBtn.click();
    fixture.detectChanges();
    expect(themeService.mode()).toBe('light');

    darkBtn.click();
    fixture.detectChanges();
    expect(themeService.mode()).toBe('dark');
  });

  it('should update style on clicking arcade or pro buttons', () => {
    const el = fixture.nativeElement as HTMLElement;
    const arcadeBtn = el.querySelector<HTMLButtonElement>('button[aria-label="Estilo Arcade"]')!;
    const proBtn = el.querySelector<HTMLButtonElement>('button[aria-label="Estilo Pro"]')!;

    proBtn.click();
    fixture.detectChanges();
    expect(themeService.style()).toBe('pro');

    arcadeBtn.click();
    fixture.detectChanges();
    expect(themeService.style()).toBe('arcade');
  });
});
