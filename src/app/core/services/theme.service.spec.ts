import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-style');
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default style', () => {
    expect(service.style()).toBe('arcade');
  });

  it('should default mode to the OS color-scheme preference when nothing is stored', () => {
    // jsdom doesn't implement matchMedia at all, unlike a real browser —
    // define it before spying, there's nothing to spy on otherwise.
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({ matches: query.includes('dark') })) as typeof window.matchMedia;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ThemeService] });
    expect(TestBed.inject(ThemeService).mode()).toBe('dark');

    window.matchMedia = original;
  });

  it('should switch mode and persist to localStorage and DOM', () => {
    TestBed.flushEffects();

    service.setMode('dark');
    TestBed.flushEffects();
    expect(service.mode()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('fu.theme.mode')).toBe('dark');

    service.setMode('light');
    TestBed.flushEffects();
    expect(service.mode()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('fu.theme.mode')).toBe('light');
  });

  it('should toggle mode', () => {
    service.setMode('light');
    TestBed.flushEffects();

    service.toggleMode();
    TestBed.flushEffects();
    expect(service.mode()).toBe('dark');

    service.toggleMode();
    TestBed.flushEffects();
    expect(service.mode()).toBe('light');
  });

  it('should switch style and persist to localStorage and DOM', () => {
    service.setStyle('pro');
    TestBed.flushEffects();
    expect(service.style()).toBe('pro');
    expect(document.documentElement.getAttribute('data-style')).toBe('pro');
    expect(localStorage.getItem('fu.theme.style')).toBe('pro');

    service.setStyle('arcade');
    TestBed.flushEffects();
    expect(service.style()).toBe('arcade');
    expect(document.documentElement.getAttribute('data-style')).toBe('arcade');
    expect(localStorage.getItem('fu.theme.style')).toBe('arcade');
  });

  it('should toggle style', () => {
    service.setStyle('arcade');
    TestBed.flushEffects();

    service.toggleStyle();
    TestBed.flushEffects();
    expect(service.style()).toBe('pro');

    service.toggleStyle();
    TestBed.flushEffects();
    expect(service.style()).toBe('arcade');
  });
});
