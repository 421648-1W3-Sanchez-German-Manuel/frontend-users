import * as i0 from '@angular/core';
import { Pipe, signal, Injectable, input, ChangeDetectionStrategy, Component, output, viewChild, model, computed, inject, ElementRef, HostListener, viewChildren, effect, DestroyRef } from '@angular/core';

class SentenceCasePipe {
    transform(value) {
        const text = value?.trim() ?? '';
        if (!text)
            return '';
        const lower = text.toLocaleLowerCase('es');
        return lower.replace(/(^|[.!?…]\s*|[\n\r]+\s*|[¿¡])(\p{L})/gu, (full, prefix, letter) => {
            if (full.startsWith('¿') || full.startsWith('¡')) {
                return full[0] + letter.toLocaleUpperCase('es');
            }
            return `${prefix}${letter.toLocaleUpperCase('es')}`;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: SentenceCasePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "22.1.7", ngImport: i0, type: SentenceCasePipe, isStandalone: true, name: "sentenceCase" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: SentenceCasePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'sentenceCase',
                }]
        }] });

const STORAGE_KEY = 'generic-ui-theme';
class ThemeService {
    theme = signal(this.readTheme(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    constructor() {
        this.apply(this.theme());
    }
    set(theme) {
        this.theme.set(theme);
        this.apply(theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }
    toggle() {
        this.set(this.theme() === 'dark' ? 'light' : 'dark');
    }
    readTheme() {
        if (typeof localStorage === 'undefined')
            return 'dark';
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'light' || stored === 'dark' ? stored : 'dark';
    }
    apply(theme) {
        if (typeof document === 'undefined')
            return;
        document.documentElement.setAttribute('data-theme', theme);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ThemeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

class GenericTitle {
    level = input(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTitle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericTitle, isStandalone: true, selector: "generic-title", inputs: { level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"title level-{{ level() }} tone-{{ tone() }}\" role=\"heading\" [attr.aria-level]=\"level()\">\n  <ng-content />\n</div>\n", styles: [":host{display:block}.title{margin:0;font-family:var(--font-retro);font-weight:400;text-transform:none;letter-spacing:0;line-height:1.35;-webkit-font-smoothing:none;font-smooth:never}.level-1{font-size:1.5rem}.level-2{font-size:1.25rem}.level-3{font-size:1rem}.tone-cyan{color:var(--accent-secondary)}.tone-magenta{color:var(--accent-primary)}.tone-gold{color:var(--accent-gold)}.tone-green{color:var(--accent-success)}.tone-red{color:var(--accent-danger)}.tone-neutral{color:var(--text-primary)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTitle, decorators: [{
            type: Component,
            args: [{ selector: 'generic-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"title level-{{ level() }} tone-{{ tone() }}\" role=\"heading\" [attr.aria-level]=\"level()\">\n  <ng-content />\n</div>\n", styles: [":host{display:block}.title{margin:0;font-family:var(--font-retro);font-weight:400;text-transform:none;letter-spacing:0;line-height:1.35;-webkit-font-smoothing:none;font-smooth:never}.level-1{font-size:1.5rem}.level-2{font-size:1.25rem}.level-3{font-size:1rem}.tone-cyan{color:var(--accent-secondary)}.tone-magenta{color:var(--accent-primary)}.tone-gold{color:var(--accent-gold)}.tone-green{color:var(--accent-success)}.tone-red{color:var(--accent-danger)}.tone-neutral{color:var(--text-primary)}\n"] }]
        }], propDecorators: { level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }] } });

class GenericSubtitle {
    tone = input('neutral', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSubtitle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericSubtitle, isStandalone: true, selector: "generic-subtitle", inputs: { tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<p class=\"subtitle tone-{{ tone() }}\"><ng-content /></p>\n", styles: [":host{display:block}.subtitle{margin:0;font-family:var(--font-pixel);font-size:1.15rem;letter-spacing:0;text-transform:none;-webkit-font-smoothing:none;font-smooth:never;color:var(--text-muted)}.tone-cyan{color:var(--accent-secondary)}.tone-magenta{color:var(--accent-primary)}.tone-gold{color:var(--accent-gold)}.tone-green{color:var(--accent-success)}.tone-red{color:var(--accent-danger)}.tone-neutral{color:var(--text-muted)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSubtitle, decorators: [{
            type: Component,
            args: [{ selector: 'generic-subtitle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<p class=\"subtitle tone-{{ tone() }}\"><ng-content /></p>\n", styles: [":host{display:block}.subtitle{margin:0;font-family:var(--font-pixel);font-size:1.15rem;letter-spacing:0;text-transform:none;-webkit-font-smoothing:none;font-smooth:never;color:var(--text-muted)}.tone-cyan{color:var(--accent-secondary)}.tone-magenta{color:var(--accent-primary)}.tone-gold{color:var(--accent-gold)}.tone-green{color:var(--accent-success)}.tone-red{color:var(--accent-danger)}.tone-neutral{color:var(--text-muted)}\n"] }]
        }], propDecorators: { tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }] } });

class GenericText {
    muted = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "muted" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericText, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericText, isStandalone: true, selector: "generic-text", inputs: { muted: { classPropertyName: "muted", publicName: "muted", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<p class=\"copy size-{{ size() }}\" [class.muted]=\"muted()\"><ng-content /></p>\n", styles: [":host{display:block}.copy{margin:0;font-family:var(--font-arcade);color:var(--text-primary);line-height:1.4}.muted{color:var(--text-muted)}.size-sm{font-size:.75rem}.size-md{font-size:1rem}.size-lg{font-size:1.25rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericText, decorators: [{
            type: Component,
            args: [{ selector: 'generic-text', changeDetection: ChangeDetectionStrategy.OnPush, template: "<p class=\"copy size-{{ size() }}\" [class.muted]=\"muted()\"><ng-content /></p>\n", styles: [":host{display:block}.copy{margin:0;font-family:var(--font-arcade);color:var(--text-primary);line-height:1.4}.muted{color:var(--text-muted)}.size-sm{font-size:.75rem}.size-md{font-size:1rem}.size-lg{font-size:1.25rem}\n"] }]
        }], propDecorators: { muted: [{ type: i0.Input, args: [{ isSignal: true, alias: "muted", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class GenericButton {
    variant = input('magenta', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    type = input('button', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericButton, isStandalone: true, selector: "generic-button", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button\n  class=\"btn variant-{{ variant() }} size-{{ size() }}\"\n  [attr.type]=\"type()\"\n  [disabled]=\"disabled()\"\n>\n  <ng-content />\n</button>\n", styles: [":host{display:inline-flex}.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-family:var(--font-arcade);text-transform:none;font-weight:700;border:2px solid;border-radius:2px;cursor:pointer;-webkit-user-select:none;user-select:none;transition:transform .08s ease,box-shadow .08s ease,filter .15s ease}.btn:hover:not(:disabled){filter:brightness(1.1)}.btn:active:not(:disabled){transform:translateY(4px);box-shadow:none}.btn:disabled{opacity:.45;cursor:not-allowed}.size-sm{padding:.4rem .8rem;font-size:.75rem}.size-md{padding:.7rem 1.35rem;font-size:1rem}.size-lg{padding:.9rem 1.75rem;font-size:1.25rem}.variant-cyan{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-secondary-fill) 65%,black)}.variant-magenta{background:var(--accent-primary-fill);border-color:var(--accent-primary-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-primary-fill) 65%,black)}.variant-gold{background:var(--accent-gold-fill);border-color:var(--accent-gold-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-gold-fill) 65%,black)}.variant-green{background:var(--accent-success-fill);border-color:var(--accent-success-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-success-fill) 65%,black)}.variant-ghost{background:transparent;border-color:var(--border-subtle);color:var(--text-muted);box-shadow:0 4px color-mix(in srgb,var(--border-subtle) 70%,black)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericButton, decorators: [{
            type: Component,
            args: [{ selector: 'generic-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"btn variant-{{ variant() }} size-{{ size() }}\"\n  [attr.type]=\"type()\"\n  [disabled]=\"disabled()\"\n>\n  <ng-content />\n</button>\n", styles: [":host{display:inline-flex}.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-family:var(--font-arcade);text-transform:none;font-weight:700;border:2px solid;border-radius:2px;cursor:pointer;-webkit-user-select:none;user-select:none;transition:transform .08s ease,box-shadow .08s ease,filter .15s ease}.btn:hover:not(:disabled){filter:brightness(1.1)}.btn:active:not(:disabled){transform:translateY(4px);box-shadow:none}.btn:disabled{opacity:.45;cursor:not-allowed}.size-sm{padding:.4rem .8rem;font-size:.75rem}.size-md{padding:.7rem 1.35rem;font-size:1rem}.size-lg{padding:.9rem 1.75rem;font-size:1.25rem}.variant-cyan{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-secondary-fill) 65%,black)}.variant-magenta{background:var(--accent-primary-fill);border-color:var(--accent-primary-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-primary-fill) 65%,black)}.variant-gold{background:var(--accent-gold-fill);border-color:var(--accent-gold-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-gold-fill) 65%,black)}.variant-green{background:var(--accent-success-fill);border-color:var(--accent-success-fill);color:#1a1814;box-shadow:0 4px color-mix(in srgb,var(--accent-success-fill) 65%,black)}.variant-ghost{background:transparent;border-color:var(--border-subtle);color:var(--text-muted);box-shadow:0 4px color-mix(in srgb,var(--border-subtle) 70%,black)}\n"] }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

class GenericImportButton {
    accept = input('*/*', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "accept" }] : /* istanbul ignore next */ []));
    multiple = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "multiple" }] : /* istanbul ignore next */ []));
    variant = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    label = input('Importar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    filesSelected = output();
    fileInput = viewChild.required('fileInput', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "fileInput" }] : /* istanbul ignore next */ []));
    openPicker() {
        this.fileInput().nativeElement.click();
    }
    onChange(event) {
        const inputEl = event.target;
        const files = Array.from(inputEl.files ?? []);
        if (files.length)
            this.filesSelected.emit(files);
        inputEl.value = '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericImportButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: GenericImportButton, isStandalone: true, selector: "generic-import-button", inputs: { accept: { classPropertyName: "accept", publicName: "accept", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { filesSelected: "filesSelected" }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, isSignal: true }], ngImport: i0, template: "<generic-button\n  [variant]=\"variant()\"\n  [size]=\"size()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  {{ label() }}\n</generic-button>\n<input\n  #fileInput\n  class=\"sr-only\"\n  type=\"file\"\n  [attr.accept]=\"accept()\"\n  [multiple]=\"multiple()\"\n  [disabled]=\"disabled()\"\n  (change)=\"onChange($event)\"\n/>\n", styles: [":host{display:inline-flex}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}\n"], dependencies: [{ kind: "component", type: GenericButton, selector: "generic-button", inputs: ["variant", "size", "type", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericImportButton, decorators: [{
            type: Component,
            args: [{ selector: 'generic-import-button', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericButton], template: "<generic-button\n  [variant]=\"variant()\"\n  [size]=\"size()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  {{ label() }}\n</generic-button>\n<input\n  #fileInput\n  class=\"sr-only\"\n  type=\"file\"\n  [attr.accept]=\"accept()\"\n  [multiple]=\"multiple()\"\n  [disabled]=\"disabled()\"\n  (change)=\"onChange($event)\"\n/>\n", styles: [":host{display:inline-flex}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}\n"] }]
        }], propDecorators: { accept: [{ type: i0.Input, args: [{ isSignal: true, alias: "accept", required: false }] }], multiple: [{ type: i0.Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], filesSelected: [{ type: i0.Output, args: ["filesSelected"] }], fileInput: [{ type: i0.ViewChild, args: ['fileInput', { isSignal: true }] }] } });

class GenericModal {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    title = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    subtitle = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    dismissable = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dismissable" }] : /* istanbul ignore next */ []));
    closeLabel = input('Cerrar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closeLabel" }] : /* istanbul ignore next */ []));
    closed = output();
    close() {
        if (!this.dismissable())
            return;
        this.open.set(false);
        this.closed.emit();
    }
    onBackdrop() {
        this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericModal, isStandalone: true, selector: "generic-modal", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, dismissable: { classPropertyName: "dismissable", publicName: "dismissable", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", closed: "closed" }, host: { listeners: { "document:keydown.escape": "close()" } }, ngImport: i0, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel tone-{{ tone() }} size-{{ size() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    [attr.aria-label]=\"title()\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <span class=\"pixel tl\"></span>\n    <span class=\"pixel tr\"></span>\n    <span class=\"pixel bl\"></span>\n    <span class=\"pixel br\"></span>\n\n    @if (title() || dismissable()) {\n    <header class=\"head\">\n      <div class=\"titles\">\n        @if (title()) {\n        <h2 class=\"title\">{{ title() }}</h2>\n        } @if (subtitle()) {\n        <p class=\"sub\">{{ subtitle() }}</p>\n        }\n      </div>\n      @if (dismissable()) {\n      <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n      }\n    </header>\n    }\n\n    <div class=\"body\">\n      <ng-content />\n    </div>\n\n    <footer class=\"foot\">\n      <ng-content select=\"[footer]\" />\n    </footer>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.panel{position:relative;width:100%;max-height:85vh;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:6px;outline:none}.size-sm{max-width:24rem}.size-md{max-width:32rem}.size-lg{max-width:42rem}.size-xl{max-width:56rem}.tone-cyan{border-color:var(--accent-secondary)}.tone-magenta{border-color:var(--accent-primary)}.tone-gold{border-color:var(--accent-gold)}.tone-green{border-color:var(--accent-success)}.tone-red{border-color:var(--accent-danger)}.tone-cyan .title{color:var(--accent-secondary)}.tone-magenta .title{color:var(--accent-primary)}.tone-gold .title{color:var(--accent-gold)}.tone-green .title{color:var(--accent-success)}.tone-red .title{color:var(--accent-danger)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid var(--border-subtle)}.titles{display:flex;flex-direction:column;gap:.25rem}.title{margin:0;font-family:var(--font-retro);font-size:1rem;letter-spacing:.03em}.sub{margin:0;font-family:var(--font-pixel);font-size:1rem;color:var(--text-muted)}.x{background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:28px;height:28px;border-radius:2px;cursor:pointer;font-size:1.2rem;line-height:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.body{padding:1rem 1.25rem;overflow-y:auto;font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.foot:empty{display:none}.foot{display:flex;align-items:center;justify-content:flex-end;gap:.75rem;padding:1rem 1.25rem;border-top:1px solid var(--border-subtle)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericModal, decorators: [{
            type: Component,
            args: [{ selector: 'generic-modal', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(document:keydown.escape)': 'close()',
                    }, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel tone-{{ tone() }} size-{{ size() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    [attr.aria-label]=\"title()\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <span class=\"pixel tl\"></span>\n    <span class=\"pixel tr\"></span>\n    <span class=\"pixel bl\"></span>\n    <span class=\"pixel br\"></span>\n\n    @if (title() || dismissable()) {\n    <header class=\"head\">\n      <div class=\"titles\">\n        @if (title()) {\n        <h2 class=\"title\">{{ title() }}</h2>\n        } @if (subtitle()) {\n        <p class=\"sub\">{{ subtitle() }}</p>\n        }\n      </div>\n      @if (dismissable()) {\n      <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n      }\n    </header>\n    }\n\n    <div class=\"body\">\n      <ng-content />\n    </div>\n\n    <footer class=\"foot\">\n      <ng-content select=\"[footer]\" />\n    </footer>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.panel{position:relative;width:100%;max-height:85vh;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:6px;outline:none}.size-sm{max-width:24rem}.size-md{max-width:32rem}.size-lg{max-width:42rem}.size-xl{max-width:56rem}.tone-cyan{border-color:var(--accent-secondary)}.tone-magenta{border-color:var(--accent-primary)}.tone-gold{border-color:var(--accent-gold)}.tone-green{border-color:var(--accent-success)}.tone-red{border-color:var(--accent-danger)}.tone-cyan .title{color:var(--accent-secondary)}.tone-magenta .title{color:var(--accent-primary)}.tone-gold .title{color:var(--accent-gold)}.tone-green .title{color:var(--accent-success)}.tone-red .title{color:var(--accent-danger)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid var(--border-subtle)}.titles{display:flex;flex-direction:column;gap:.25rem}.title{margin:0;font-family:var(--font-retro);font-size:1rem;letter-spacing:.03em}.sub{margin:0;font-family:var(--font-pixel);font-size:1rem;color:var(--text-muted)}.x{background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:28px;height:28px;border-radius:2px;cursor:pointer;font-size:1.2rem;line-height:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.body{padding:1rem 1.25rem;overflow-y:auto;font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.foot:empty{display:none}.foot{display:flex;align-items:center;justify-content:flex-end;gap:.75rem;padding:1rem 1.25rem;border-top:1px solid var(--border-subtle)}\n"] }]
        }], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], dismissable: [{ type: i0.Input, args: [{ isSignal: true, alias: "dismissable", required: false }] }], closeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeLabel", required: false }] }], closed: [{ type: i0.Output, args: ["closed"] }] } });

class GenericFileModal {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    title = input('Subir archivos', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    subtitle = input('Arrastrá o elegí archivos', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    accept = input('*/*', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "accept" }] : /* istanbul ignore next */ []));
    multiple = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "multiple" }] : /* istanbul ignore next */ []));
    maxSizeMb = input(10, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "maxSizeMb" }] : /* istanbul ignore next */ []));
    files = model([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "files" }] : /* istanbul ignore next */ []));
    dragging = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dragging" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    onDrag(over, event) {
        event.preventDefault();
        this.dragging.set(over);
    }
    onDrop(event) {
        event.preventDefault();
        this.dragging.set(false);
        this.add(Array.from(event.dataTransfer?.files ?? []));
    }
    onPick(event) {
        const inputEl = event.target;
        this.add(Array.from(inputEl.files ?? []));
        inputEl.value = '';
    }
    remove(index) {
        const next = this.files().filter((_, i) => i !== index);
        this.files.set(next);
    }
    add(incoming) {
        const limit = this.maxSizeMb() * 1024 * 1024;
        const rejected = incoming.find(file => file.size > limit);
        if (rejected) {
            this.error.set(`${rejected.name} supera ${this.maxSizeMb()} MB`);
            return;
        }
        this.error.set('');
        const next = this.multiple() ? [...this.files(), ...incoming] : incoming.slice(0, 1);
        this.files.set(next);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericFileModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericFileModal, isStandalone: true, selector: "generic-file-modal", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, accept: { classPropertyName: "accept", publicName: "accept", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, maxSizeMb: { classPropertyName: "maxSizeMb", publicName: "maxSizeMb", isSignal: true, isRequired: false, transformFunction: null }, files: { classPropertyName: "files", publicName: "files", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", files: "filesChange" }, ngImport: i0, template: "<generic-modal [(open)]=\"open\" [title]=\"title()\" [subtitle]=\"subtitle()\" [tone]=\"tone()\" size=\"lg\">\n  <div\n    class=\"drop\"\n    [class.over]=\"dragging()\"\n    (dragover)=\"onDrag(true, $event)\"\n    (dragleave)=\"onDrag(false, $event)\"\n    (drop)=\"onDrop($event)\"\n  >\n    <p>Solt\u00E1 archivos ac\u00E1</p>\n    <label class=\"pick\">\n      Elegir archivos\n      <input type=\"file\" [accept]=\"accept()\" [multiple]=\"multiple()\" (change)=\"onPick($event)\" />\n    </label>\n    <small>M\u00E1ximo {{ maxSizeMb() }} MB por archivo</small>\n  </div>\n\n  @if (error()) {\n  <p class=\"error\">{{ error() }}</p>\n  } @if (files().length) {\n  <ul class=\"list\">\n    @for (file of files(); track file.name + file.size; let i = $index) {\n    <li>\n      <span>{{ file.name }} ({{ file.size }} B)</span>\n      <button type=\"button\" (click)=\"remove(i)\">Quitar</button>\n    </li>\n    }\n  </ul>\n  }\n\n  <div footer>\n    <ng-content select=\"[footer]\" />\n  </div>\n</generic-modal>\n", styles: [".drop{display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1.5rem;border:2px dashed var(--border-subtle);background:color-mix(in srgb,var(--bg-app) 70%,transparent);text-align:center;font-family:var(--font-arcade)}.drop.over{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.drop p{margin:0;font-size:1.15rem}.pick{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;text-transform:none;padding:.5rem .9rem;border:2px solid var(--accent-secondary-fill);color:#020617;background:var(--accent-secondary-fill);cursor:pointer}.pick input{display:none}small{color:var(--text-muted)}.error{color:var(--accent-danger);font-family:var(--font-arcade)}.list{list-style:none;margin:1rem 0 0;padding:0;display:flex;flex-direction:column;gap:.4rem}.list li{display:flex;justify-content:space-between;gap:1rem;padding:.45rem .6rem;border:1px solid var(--border-subtle);background:var(--bg-surface-alt);font-family:var(--font-arcade)}.list button{background:transparent;border:1px solid var(--accent-danger);color:var(--accent-danger);cursor:pointer;font-family:var(--font-arcade);font-size:.75rem;font-weight:700;text-transform:none}\n"], dependencies: [{ kind: "component", type: GenericModal, selector: "generic-modal", inputs: ["open", "title", "subtitle", "tone", "size", "dismissable", "closeLabel"], outputs: ["openChange", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericFileModal, decorators: [{
            type: Component,
            args: [{ selector: 'generic-file-modal', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericModal], template: "<generic-modal [(open)]=\"open\" [title]=\"title()\" [subtitle]=\"subtitle()\" [tone]=\"tone()\" size=\"lg\">\n  <div\n    class=\"drop\"\n    [class.over]=\"dragging()\"\n    (dragover)=\"onDrag(true, $event)\"\n    (dragleave)=\"onDrag(false, $event)\"\n    (drop)=\"onDrop($event)\"\n  >\n    <p>Solt\u00E1 archivos ac\u00E1</p>\n    <label class=\"pick\">\n      Elegir archivos\n      <input type=\"file\" [accept]=\"accept()\" [multiple]=\"multiple()\" (change)=\"onPick($event)\" />\n    </label>\n    <small>M\u00E1ximo {{ maxSizeMb() }} MB por archivo</small>\n  </div>\n\n  @if (error()) {\n  <p class=\"error\">{{ error() }}</p>\n  } @if (files().length) {\n  <ul class=\"list\">\n    @for (file of files(); track file.name + file.size; let i = $index) {\n    <li>\n      <span>{{ file.name }} ({{ file.size }} B)</span>\n      <button type=\"button\" (click)=\"remove(i)\">Quitar</button>\n    </li>\n    }\n  </ul>\n  }\n\n  <div footer>\n    <ng-content select=\"[footer]\" />\n  </div>\n</generic-modal>\n", styles: [".drop{display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1.5rem;border:2px dashed var(--border-subtle);background:color-mix(in srgb,var(--bg-app) 70%,transparent);text-align:center;font-family:var(--font-arcade)}.drop.over{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.drop p{margin:0;font-size:1.15rem}.pick{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;text-transform:none;padding:.5rem .9rem;border:2px solid var(--accent-secondary-fill);color:#020617;background:var(--accent-secondary-fill);cursor:pointer}.pick input{display:none}small{color:var(--text-muted)}.error{color:var(--accent-danger);font-family:var(--font-arcade)}.list{list-style:none;margin:1rem 0 0;padding:0;display:flex;flex-direction:column;gap:.4rem}.list li{display:flex;justify-content:space-between;gap:1rem;padding:.45rem .6rem;border:1px solid var(--border-subtle);background:var(--bg-surface-alt);font-family:var(--font-arcade)}.list button{background:transparent;border:1px solid var(--accent-danger);color:var(--accent-danger);cursor:pointer;font-family:var(--font-arcade);font-size:.75rem;font-weight:700;text-transform:none}\n"] }]
        }], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], accept: [{ type: i0.Input, args: [{ isSignal: true, alias: "accept", required: false }] }], multiple: [{ type: i0.Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], maxSizeMb: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxSizeMb", required: false }] }], files: [{ type: i0.Input, args: [{ isSignal: true, alias: "files", required: false }] }, { type: i0.Output, args: ["filesChange"] }] } });

class GenericBadge {
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    appearance = input('outline', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "appearance" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericBadge, isStandalone: true, selector: "generic-badge", inputs: { tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, appearance: { classPropertyName: "appearance", publicName: "appearance", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span class=\"badge tone-{{ tone() }} look-{{ appearance() }} size-{{ size() }}\">\n  <ng-content />\n</span>\n", styles: [":host{display:inline-flex}.badge{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);text-transform:none;letter-spacing:0;font-weight:700;border:1px solid;border-radius:2px;white-space:nowrap;vertical-align:middle}.size-sm{font-size:11px;padding:.2rem .45rem}.size-md{font-size:13px;padding:.28rem .55rem}.tone-cyan.look-solid{background:var(--accent-secondary-fill);color:#020617;border-color:var(--accent-secondary-fill)}.tone-cyan.look-outline{color:var(--accent-secondary);border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.tone-magenta.look-solid{background:var(--accent-primary-fill);color:#020617;border-color:var(--accent-primary-fill)}.tone-magenta.look-outline{color:var(--accent-primary);border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}.tone-gold.look-solid{background:var(--accent-gold-fill);color:#1a1408;border-color:var(--accent-gold-fill)}.tone-gold.look-outline{color:var(--accent-gold);border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}.tone-green.look-solid{background:var(--accent-success-fill);color:#02140b;border-color:var(--accent-success-fill)}.tone-green.look-outline{color:var(--accent-success);border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.tone-red.look-solid{background:var(--accent-danger-fill);color:#1a1408;border-color:var(--accent-danger-fill)}.tone-red.look-outline{color:var(--accent-danger);border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.tone-neutral.look-solid{background:var(--bg-surface-alt);color:var(--text-primary);border-color:var(--border-subtle)}.tone-neutral.look-outline{color:var(--text-muted);border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-badge', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"badge tone-{{ tone() }} look-{{ appearance() }} size-{{ size() }}\">\n  <ng-content />\n</span>\n", styles: [":host{display:inline-flex}.badge{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);text-transform:none;letter-spacing:0;font-weight:700;border:1px solid;border-radius:2px;white-space:nowrap;vertical-align:middle}.size-sm{font-size:11px;padding:.2rem .45rem}.size-md{font-size:13px;padding:.28rem .55rem}.tone-cyan.look-solid{background:var(--accent-secondary-fill);color:#020617;border-color:var(--accent-secondary-fill)}.tone-cyan.look-outline{color:var(--accent-secondary);border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.tone-magenta.look-solid{background:var(--accent-primary-fill);color:#020617;border-color:var(--accent-primary-fill)}.tone-magenta.look-outline{color:var(--accent-primary);border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}.tone-gold.look-solid{background:var(--accent-gold-fill);color:#1a1408;border-color:var(--accent-gold-fill)}.tone-gold.look-outline{color:var(--accent-gold);border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}.tone-green.look-solid{background:var(--accent-success-fill);color:#02140b;border-color:var(--accent-success-fill)}.tone-green.look-outline{color:var(--accent-success);border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.tone-red.look-solid{background:var(--accent-danger-fill);color:#1a1408;border-color:var(--accent-danger-fill)}.tone-red.look-outline{color:var(--accent-danger);border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.tone-neutral.look-solid{background:var(--bg-surface-alt);color:var(--text-primary);border-color:var(--border-subtle)}.tone-neutral.look-outline{color:var(--text-muted);border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"] }]
        }], propDecorators: { tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], appearance: [{ type: i0.Input, args: [{ isSignal: true, alias: "appearance", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class GenericIcon {
    name = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    size = input(20, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericIcon, isStandalone: true, selector: "generic-icon", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span\n  class=\"icon\"\n  [style.width.px]=\"size()\"\n  [style.height.px]=\"size()\"\n  [attr.aria-label]=\"label() || null\"\n  [attr.role]=\"label() ? 'img' : null\"\n>\n  @switch (name()) { @case ('trophy') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M3 2h10v2h-1v4h-1v2H9v2h2v2H5v-2h2v-2H6V8H5V4H4V2H3zM1 3h2v4H2V6H1V3zm12 0h2v3h-1v1h-1V3z\"\n      fill=\"#f59e0b\"\n    />\n    <path d=\"M6 4h4v3H6z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('chest') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 4h14v10H1V4z\" fill=\"#78350f\" />\n    <path d=\"M2 5h12v3H2V5z\" fill=\"#d97706\" />\n    <path d=\"M1 8h14v1H1V8zm7 0h2v3H8V8z\" fill=\"#fde047\" />\n    <path d=\"M3 10h10v3H3v-3z\" fill=\"#92400e\" />\n  </svg>\n  } @case ('chat') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 2h12v9H9l-4 3v-3H2V2z\" fill=\"#e879f9\" />\n    <path d=\"M4 4h8v5H4V4z\" fill=\"#581c87\" />\n    <path d=\"M5 6h2v1H5V6zm4 0h2v1H9V6z\" fill=\"#f5d0fe\" />\n  </svg>\n  } @case ('bell') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 1h2v1H7V1z\" fill=\"#fde047\" />\n    <path d=\"M6 2h4v1H6V2z\" fill=\"#f59e0b\" />\n    <path d=\"M5 3h6v1H5V3zm-1 1h8v1H4V4zm0 1h8v5H4V5z\" fill=\"#fbbf24\" />\n    <path d=\"M5 6h6v3H5V6z\" fill=\"#fde047\" />\n    <path d=\"M3 10h10v1H3v-1z\" fill=\"#f59e0b\" />\n    <path d=\"M6 12h4v1H6v-1zm1 1h2v1H7v-1z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('user') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M6 2h4v4H6V2zm-3 8h10v4H3v-4z\" fill=\"#38bdf8\" />\n    <path d=\"M5 5h6v2H5V5zm-1 4h8v2H4V9z\" fill=\"#0284c7\" />\n  </svg>\n  } @case ('scroll') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M4 2h8v12H4V2z\" fill=\"#fef08a\" />\n    <path d=\"M3 3h1v10H3V3zm10 0h1v10h-1V3z\" fill=\"#ca8a04\" />\n    <path d=\"M6 5h4v1H6V5zm0 3h4v1H6V8zm0 3h3v1H6v-1z\" fill=\"#854d0e\" />\n  </svg>\n  } @case ('heart') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 3h4v1h4V3h4v5h-1v2h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V8H2V3z\" fill=\"#ef4444\" />\n    <path d=\"M4 5h2v2H4V5z\" fill=\"#fca5a5\" />\n  </svg>\n  } @case ('heart-empty') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 3h4v1h4V3h4v5h-1v2h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V8H2V3z\" fill=\"#4a1c22\" />\n    <path d=\"M3 4h2v1H3V4z\" fill=\"#6b2a32\" />\n  </svg>\n  } @case ('coin') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M5 1h6v1h2v2h1v8h-1v2h-2v1H5v-1H3v-2H2V4h1V2h2V1z\" fill=\"#b45309\" />\n    <path d=\"M5 2h6v1h1v1h1v8h-1v1h-1v1H5v-1H4v-1H3V4h1V3h1V2z\" fill=\"#fbbf24\" />\n    <path d=\"M7 4h2v8H7V4zm-1 1h4v1H6V5zm0 5h4v1H6v-1z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('fire') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M8 1h1v2h1v1h1v1h1v2h1v5h-1v1h-2v1H6v-1H4v-1H3V9h1V7h1V5h1V3h1V1h1z\" fill=\"#f97316\" />\n    <path d=\"M8 5h1v2h1v3h-1v2H7v-2H6V8h1V6h1V5z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('medal') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M4 1h3v5H4V1zm5 0h3v5H9V1z\" fill=\"#3b82f6\" />\n    <path d=\"M5 6h6v1h1v1h1v4h-1v1h-1v1H5v-1H4v-1H3V8h1V7h1V6z\" fill=\"#a16207\" />\n    <path d=\"M6 7h4v1h1v3h-1v1H6v-1H5V8h1V7z\" fill=\"#fbbf24\" />\n    <path d=\"M7 9h2v1H7V9z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('lock') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M5 2h6v1h1v4h-2V4H6v3H4V3h1V2z\" fill=\"#94a3b8\" />\n    <path d=\"M3 7h10v7H3V7z\" fill=\"#64748b\" />\n    <path d=\"M7 9h2v3H7V9z\" fill=\"#1e293b\" />\n  </svg>\n  } @case ('clock') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M6 1h4v1H6V1zM5 3h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V6h1V4h2V3z\" fill=\"#e2e8f0\" />\n    <path d=\"M6 4h4v1h2v2h1v4h-1v2h-2v1H6v-1H4v-2H3V7h1V5h2V4z\" fill=\"#475569\" />\n    <path d=\"M7 5h2v4H7V5zm2 4h3v2H9V9z\" fill=\"#f8fafc\" />\n  </svg>\n  } @case ('check') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M13 3h2v2h-2V3zm-2 2h2v2h-2V5zM9 7h2v2H9V7zM7 9h2v2H7V9zm-2 2h2v2H5v-2zM3 9h2v2H3V9zM1 7h2v2H1V7z\"\n      fill=\"#10b981\"\n    />\n  </svg>\n  } @case ('star') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 1h2v4h4v2h-2v2h1v5H9v-2H7v2H4V9h1V7H3V5h4V1z\" fill=\"#fbbf24\" />\n    <path d=\"M7 5h2v2H7V5z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('video') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 3h10v10H1V3z\" fill=\"#334155\" />\n    <path d=\"M11 6h1V5h1V4h2v8h-2v-1h-1v-1h-1V6z\" fill=\"#64748b\" />\n    <path d=\"M5 6h1v1h1v1h1v1H7v1H6v1H5V6z\" fill=\"#38bdf8\" />\n  </svg>\n  } @case ('audio') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 6h3V5h1V4h1V3h1v10H6v-1H5v-1H4v-1H1V6z\" fill=\"#a78bfa\" />\n    <path d=\"M9 5h1v1h1v4h-1v1H9V5zm3-2h1v1h1v8h-1v1h-1V3z\" fill=\"#7c3aed\" />\n  </svg>\n  } @case ('link') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M9 2h5v5h-2V5h-1V4H9V2zM2 9h2v2h1v1h2v2H2V9z\" fill=\"#0ea5e9\" />\n    <path d=\"M6 9h1v1H6V9zm1-1h1v1H7V8zm1-1h1v1H8V7zm1-1h1v1H9V6zm1-1h1v1h-1V5z\" fill=\"#38bdf8\" />\n  </svg>\n  } @case ('folder') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 3h5v1h1v1H1V3z\" fill=\"#b45309\" />\n    <path d=\"M1 5h14v9H1V5z\" fill=\"#f59e0b\" />\n    <path d=\"M2 6h12v2H2V6z\" fill=\"#fbbf24\" />\n  </svg>\n  } @case ('pdf') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M3 1h7v3h3v11H3V1z\" fill=\"#f1f5f9\" />\n    <path d=\"M10 1h1v1h1v1h1v1h-3V1z\" fill=\"#94a3b8\" />\n    <path d=\"M4 9h8v4H4V9z\" fill=\"#dc2626\" />\n    <path d=\"M5 10h2v1H5v-1zm3 0h3v1H8v-1zm-3 2h6v1H5v-1z\" fill=\"#fef2f2\" />\n  </svg>\n  } @case ('quiz') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 1h12v14H2V1z\" fill=\"#f8fafc\" />\n    <path d=\"M4 3h3v3H4V3zm0 5h3v3H4V8z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M8 4h4v1H8V4zm0 5h4v1H8V9zm0 3h3v1H8v-1z\" fill=\"#475569\" />\n  </svg>\n  } @case ('upload') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 2h2v8H7V2z\" fill=\"var(--accent-secondary)\" />\n    <path d=\"M4 5h3V4h2v1h3L8 1 4 5z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M2 10h12v4H2v-4z\" fill=\"var(--bg-surface-alt)\" />\n  </svg>\n  } @case ('search') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M3 3h7v7H3V3z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M4 4h5v5H4V4z\" fill=\"var(--bg-app)\" />\n    <path d=\"M9 9h2v2H9V9zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2z\" fill=\"var(--accent-secondary)\" />\n  </svg>\n  } @case ('close') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M3 3h2v2H3V3zm2 2h2v2H5V5zm2 2h2v2H7V7zm2 2h2v2H9V9zm2 2h2v2h-2v-2zM9 5h2v2H9V5zm2-2h2v2h-2V3zM5 9h2v2H5V9zm-2 2h2v2H3v-2z\"\n      fill=\"#ef4444\"\n    />\n  </svg>\n  } }\n</span>\n", styles: [":host{display:inline-flex;line-height:0}.icon,.icon svg{display:block;width:100%;height:100%;image-rendering:pixelated}.icon svg{fill:currentColor}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericIcon, decorators: [{
            type: Component,
            args: [{ selector: 'generic-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  class=\"icon\"\n  [style.width.px]=\"size()\"\n  [style.height.px]=\"size()\"\n  [attr.aria-label]=\"label() || null\"\n  [attr.role]=\"label() ? 'img' : null\"\n>\n  @switch (name()) { @case ('trophy') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M3 2h10v2h-1v4h-1v2H9v2h2v2H5v-2h2v-2H6V8H5V4H4V2H3zM1 3h2v4H2V6H1V3zm12 0h2v3h-1v1h-1V3z\"\n      fill=\"#f59e0b\"\n    />\n    <path d=\"M6 4h4v3H6z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('chest') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 4h14v10H1V4z\" fill=\"#78350f\" />\n    <path d=\"M2 5h12v3H2V5z\" fill=\"#d97706\" />\n    <path d=\"M1 8h14v1H1V8zm7 0h2v3H8V8z\" fill=\"#fde047\" />\n    <path d=\"M3 10h10v3H3v-3z\" fill=\"#92400e\" />\n  </svg>\n  } @case ('chat') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 2h12v9H9l-4 3v-3H2V2z\" fill=\"#e879f9\" />\n    <path d=\"M4 4h8v5H4V4z\" fill=\"#581c87\" />\n    <path d=\"M5 6h2v1H5V6zm4 0h2v1H9V6z\" fill=\"#f5d0fe\" />\n  </svg>\n  } @case ('bell') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 1h2v1H7V1z\" fill=\"#fde047\" />\n    <path d=\"M6 2h4v1H6V2z\" fill=\"#f59e0b\" />\n    <path d=\"M5 3h6v1H5V3zm-1 1h8v1H4V4zm0 1h8v5H4V5z\" fill=\"#fbbf24\" />\n    <path d=\"M5 6h6v3H5V6z\" fill=\"#fde047\" />\n    <path d=\"M3 10h10v1H3v-1z\" fill=\"#f59e0b\" />\n    <path d=\"M6 12h4v1H6v-1zm1 1h2v1H7v-1z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('user') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M6 2h4v4H6V2zm-3 8h10v4H3v-4z\" fill=\"#38bdf8\" />\n    <path d=\"M5 5h6v2H5V5zm-1 4h8v2H4V9z\" fill=\"#0284c7\" />\n  </svg>\n  } @case ('scroll') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M4 2h8v12H4V2z\" fill=\"#fef08a\" />\n    <path d=\"M3 3h1v10H3V3zm10 0h1v10h-1V3z\" fill=\"#ca8a04\" />\n    <path d=\"M6 5h4v1H6V5zm0 3h4v1H6V8zm0 3h3v1H6v-1z\" fill=\"#854d0e\" />\n  </svg>\n  } @case ('heart') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 3h4v1h4V3h4v5h-1v2h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V8H2V3z\" fill=\"#ef4444\" />\n    <path d=\"M4 5h2v2H4V5z\" fill=\"#fca5a5\" />\n  </svg>\n  } @case ('heart-empty') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 3h4v1h4V3h4v5h-1v2h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V8H2V3z\" fill=\"#4a1c22\" />\n    <path d=\"M3 4h2v1H3V4z\" fill=\"#6b2a32\" />\n  </svg>\n  } @case ('coin') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M5 1h6v1h2v2h1v8h-1v2h-2v1H5v-1H3v-2H2V4h1V2h2V1z\" fill=\"#b45309\" />\n    <path d=\"M5 2h6v1h1v1h1v8h-1v1h-1v1H5v-1H4v-1H3V4h1V3h1V2z\" fill=\"#fbbf24\" />\n    <path d=\"M7 4h2v8H7V4zm-1 1h4v1H6V5zm0 5h4v1H6v-1z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('fire') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M8 1h1v2h1v1h1v1h1v2h1v5h-1v1h-2v1H6v-1H4v-1H3V9h1V7h1V5h1V3h1V1h1z\" fill=\"#f97316\" />\n    <path d=\"M8 5h1v2h1v3h-1v2H7v-2H6V8h1V6h1V5z\" fill=\"#fde047\" />\n  </svg>\n  } @case ('medal') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M4 1h3v5H4V1zm5 0h3v5H9V1z\" fill=\"#3b82f6\" />\n    <path d=\"M5 6h6v1h1v1h1v4h-1v1h-1v1H5v-1H4v-1H3V8h1V7h1V6z\" fill=\"#a16207\" />\n    <path d=\"M6 7h4v1h1v3h-1v1H6v-1H5V8h1V7z\" fill=\"#fbbf24\" />\n    <path d=\"M7 9h2v1H7V9z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('lock') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M5 2h6v1h1v4h-2V4H6v3H4V3h1V2z\" fill=\"#94a3b8\" />\n    <path d=\"M3 7h10v7H3V7z\" fill=\"#64748b\" />\n    <path d=\"M7 9h2v3H7V9z\" fill=\"#1e293b\" />\n  </svg>\n  } @case ('clock') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M6 1h4v1H6V1zM5 3h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V6h1V4h2V3z\" fill=\"#e2e8f0\" />\n    <path d=\"M6 4h4v1h2v2h1v4h-1v2h-2v1H6v-1H4v-2H3V7h1V5h2V4z\" fill=\"#475569\" />\n    <path d=\"M7 5h2v4H7V5zm2 4h3v2H9V9z\" fill=\"#f8fafc\" />\n  </svg>\n  } @case ('check') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M13 3h2v2h-2V3zm-2 2h2v2h-2V5zM9 7h2v2H9V7zM7 9h2v2H7V9zm-2 2h2v2H5v-2zM3 9h2v2H3V9zM1 7h2v2H1V7z\"\n      fill=\"#10b981\"\n    />\n  </svg>\n  } @case ('star') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 1h2v4h4v2h-2v2h1v5H9v-2H7v2H4V9h1V7H3V5h4V1z\" fill=\"#fbbf24\" />\n    <path d=\"M7 5h2v2H7V5z\" fill=\"#fef3c7\" />\n  </svg>\n  } @case ('video') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 3h10v10H1V3z\" fill=\"#334155\" />\n    <path d=\"M11 6h1V5h1V4h2v8h-2v-1h-1v-1h-1V6z\" fill=\"#64748b\" />\n    <path d=\"M5 6h1v1h1v1h1v1H7v1H6v1H5V6z\" fill=\"#38bdf8\" />\n  </svg>\n  } @case ('audio') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 6h3V5h1V4h1V3h1v10H6v-1H5v-1H4v-1H1V6z\" fill=\"#a78bfa\" />\n    <path d=\"M9 5h1v1h1v4h-1v1H9V5zm3-2h1v1h1v8h-1v1h-1V3z\" fill=\"#7c3aed\" />\n  </svg>\n  } @case ('link') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M9 2h5v5h-2V5h-1V4H9V2zM2 9h2v2h1v1h2v2H2V9z\" fill=\"#0ea5e9\" />\n    <path d=\"M6 9h1v1H6V9zm1-1h1v1H7V8zm1-1h1v1H8V7zm1-1h1v1H9V6zm1-1h1v1h-1V5z\" fill=\"#38bdf8\" />\n  </svg>\n  } @case ('folder') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M1 3h5v1h1v1H1V3z\" fill=\"#b45309\" />\n    <path d=\"M1 5h14v9H1V5z\" fill=\"#f59e0b\" />\n    <path d=\"M2 6h12v2H2V6z\" fill=\"#fbbf24\" />\n  </svg>\n  } @case ('pdf') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M3 1h7v3h3v11H3V1z\" fill=\"#f1f5f9\" />\n    <path d=\"M10 1h1v1h1v1h1v1h-3V1z\" fill=\"#94a3b8\" />\n    <path d=\"M4 9h8v4H4V9z\" fill=\"#dc2626\" />\n    <path d=\"M5 10h2v1H5v-1zm3 0h3v1H8v-1zm-3 2h6v1H5v-1z\" fill=\"#fef2f2\" />\n  </svg>\n  } @case ('quiz') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M2 1h12v14H2V1z\" fill=\"#f8fafc\" />\n    <path d=\"M4 3h3v3H4V3zm0 5h3v3H4V8z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M8 4h4v1H8V4zm0 5h4v1H8V9zm0 3h3v1H8v-1z\" fill=\"#475569\" />\n  </svg>\n  } @case ('upload') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M7 2h2v8H7V2z\" fill=\"var(--accent-secondary)\" />\n    <path d=\"M4 5h3V4h2v1h3L8 1 4 5z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M2 10h12v4H2v-4z\" fill=\"var(--bg-surface-alt)\" />\n  </svg>\n  } @case ('search') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path d=\"M3 3h7v7H3V3z\" fill=\"var(--accent-secondary-fill)\" />\n    <path d=\"M4 4h5v5H4V4z\" fill=\"var(--bg-app)\" />\n    <path d=\"M9 9h2v2H9V9zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2z\" fill=\"var(--accent-secondary)\" />\n  </svg>\n  } @case ('close') {\n  <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n    <path\n      d=\"M3 3h2v2H3V3zm2 2h2v2H5V5zm2 2h2v2H7V7zm2 2h2v2H9V9zm2 2h2v2h-2v-2zM9 5h2v2H9V5zm2-2h2v2h-2V3zM5 9h2v2H5V9zm-2 2h2v2H3v-2z\"\n      fill=\"#ef4444\"\n    />\n  </svg>\n  } }\n</span>\n", styles: [":host{display:inline-flex;line-height:0}.icon,.icon svg{display:block;width:100%;height:100%;image-rendering:pixelated}.icon svg{fill:currentColor}\n"] }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

class GenericProgress {
    value = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    max = input(100, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    showValue = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showValue" }] : /* istanbul ignore next */ []));
    showPercent = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showPercent" }] : /* istanbul ignore next */ []));
    segmented = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "segmented" }] : /* istanbul ignore next */ []));
    hearts = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hearts" }] : /* istanbul ignore next */ []));
    percent = computed(() => {
        const max = this.max() > 0 ? this.max() : 1;
        const clamped = Math.min(Math.max(this.value(), 0), max);
        return (clamped / max) * 100;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "percent" }] : /* istanbul ignore next */ []));
    segments = Array.from({ length: 20 }, (_, i) => i);
    heartSlots = computed(() => {
        const max = Math.max(0, Math.round(this.max()));
        const filled = Math.min(Math.max(Math.round(this.value()), 0), max);
        return Array.from({ length: max }, (_, i) => i < filled);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "heartSlots" }] : /* istanbul ignore next */ []));
    heartPx = computed(() => {
        if (this.size() === 'sm')
            return 16;
        if (this.size() === 'lg')
            return 28;
        return 22;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "heartPx" }] : /* istanbul ignore next */ []));
    roundedPercent = computed(() => Math.round(this.percent()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "roundedPercent" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericProgress, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericProgress, isStandalone: true, selector: "generic-progress", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, showValue: { classPropertyName: "showValue", publicName: "showValue", isSignal: true, isRequired: false, transformFunction: null }, showPercent: { classPropertyName: "showPercent", publicName: "showPercent", isSignal: true, isRequired: false, transformFunction: null }, segmented: { classPropertyName: "segmented", publicName: "segmented", isSignal: true, isRequired: false, transformFunction: null }, hearts: { classPropertyName: "hearts", publicName: "hearts", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.hearts-mode": "hearts()" } }, ngImport: i0, template: "<div class=\"wrap\">\n  @if (label() || showValue() || showPercent()) {\n  <div class=\"meta\">\n    @if (label()) {\n    <span class=\"label\">{{ label() }}</span>\n    } @if (showPercent()) {\n    <span class=\"value\">{{ roundedPercent() }}%</span>\n    } @else if (showValue()) {\n    <span class=\"value\">{{ value() }}/{{ max() }}</span>\n    }\n  </div>\n  } @if (hearts()) {\n  <div\n    class=\"hearts size-{{ size() }}\"\n    role=\"meter\"\n    [attr.aria-valuenow]=\"value()\"\n    [attr.aria-valuemin]=\"0\"\n    [attr.aria-valuemax]=\"max()\"\n    [attr.aria-label]=\"label() || 'Vidas'\"\n  >\n    @for (filled of heartSlots(); track $index) {\n    <generic-icon\n      [name]=\"filled ? 'heart' : 'heart-empty'\"\n      [size]=\"heartPx()\"\n      [label]=\"filled ? 'Vida' : 'Vida perdida'\"\n    />\n    }\n  </div>\n  } @else {\n  <div\n    class=\"track size-{{ size() }}\"\n    role=\"progressbar\"\n    [attr.aria-valuenow]=\"value()\"\n    [attr.aria-valuemin]=\"0\"\n    [attr.aria-valuemax]=\"max()\"\n    [attr.aria-label]=\"label()\"\n  >\n    @if (segmented()) {\n    <div class=\"segments\">\n      @for (seg of segments; track seg) {\n      <span class=\"seg tone-{{ tone() }}\" [class.fill]=\"seg < percent() / 5\"></span>\n      }\n    </div>\n    } @else {\n    <div class=\"fill tone-{{ tone() }}\" [style.width.%]=\"percent()\"></div>\n    }\n  </div>\n  }\n</div>\n", styles: [":host{display:block;width:100%}:host.hearts-mode{display:inline-flex;width:auto}.wrap{display:flex;flex-direction:column;gap:.4rem;text-align:left}.meta{display:flex;justify-content:space-between;gap:.75rem}.label,.value{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;letter-spacing:0}.label{color:var(--text-primary)}.value{color:var(--text-muted)}.track{width:100%;background:var(--bg-app);border:2px solid var(--border-subtle);border-radius:2px;overflow:hidden}.size-sm{height:8px}.size-md{height:16px}.size-lg{height:24px}.hearts{display:flex;flex-wrap:wrap;align-items:center;gap:.2rem}.hearts.size-sm,.hearts.size-md,.hearts.size-lg{height:auto}.fill{height:100%;transition:width .3s ease}.segments{display:flex;height:100%;width:100%;gap:2px;padding:2px}.seg{flex:1;background:var(--bg-surface-alt)}.seg.fill.tone-cyan,.fill.tone-cyan{background:var(--accent-secondary-fill)}.seg.fill.tone-magenta,.fill.tone-magenta{background:var(--accent-primary-fill)}.seg.fill.tone-gold,.fill.tone-gold{background:var(--accent-gold-fill)}.seg.fill.tone-green,.fill.tone-green{background:var(--accent-success-fill)}.seg.fill.tone-red,.fill.tone-red{background:var(--accent-danger-fill)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericProgress, decorators: [{
            type: Component,
            args: [{ selector: 'generic-progress', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], host: {
                        '[class.hearts-mode]': 'hearts()',
                    }, template: "<div class=\"wrap\">\n  @if (label() || showValue() || showPercent()) {\n  <div class=\"meta\">\n    @if (label()) {\n    <span class=\"label\">{{ label() }}</span>\n    } @if (showPercent()) {\n    <span class=\"value\">{{ roundedPercent() }}%</span>\n    } @else if (showValue()) {\n    <span class=\"value\">{{ value() }}/{{ max() }}</span>\n    }\n  </div>\n  } @if (hearts()) {\n  <div\n    class=\"hearts size-{{ size() }}\"\n    role=\"meter\"\n    [attr.aria-valuenow]=\"value()\"\n    [attr.aria-valuemin]=\"0\"\n    [attr.aria-valuemax]=\"max()\"\n    [attr.aria-label]=\"label() || 'Vidas'\"\n  >\n    @for (filled of heartSlots(); track $index) {\n    <generic-icon\n      [name]=\"filled ? 'heart' : 'heart-empty'\"\n      [size]=\"heartPx()\"\n      [label]=\"filled ? 'Vida' : 'Vida perdida'\"\n    />\n    }\n  </div>\n  } @else {\n  <div\n    class=\"track size-{{ size() }}\"\n    role=\"progressbar\"\n    [attr.aria-valuenow]=\"value()\"\n    [attr.aria-valuemin]=\"0\"\n    [attr.aria-valuemax]=\"max()\"\n    [attr.aria-label]=\"label()\"\n  >\n    @if (segmented()) {\n    <div class=\"segments\">\n      @for (seg of segments; track seg) {\n      <span class=\"seg tone-{{ tone() }}\" [class.fill]=\"seg < percent() / 5\"></span>\n      }\n    </div>\n    } @else {\n    <div class=\"fill tone-{{ tone() }}\" [style.width.%]=\"percent()\"></div>\n    }\n  </div>\n  }\n</div>\n", styles: [":host{display:block;width:100%}:host.hearts-mode{display:inline-flex;width:auto}.wrap{display:flex;flex-direction:column;gap:.4rem;text-align:left}.meta{display:flex;justify-content:space-between;gap:.75rem}.label,.value{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;letter-spacing:0}.label{color:var(--text-primary)}.value{color:var(--text-muted)}.track{width:100%;background:var(--bg-app);border:2px solid var(--border-subtle);border-radius:2px;overflow:hidden}.size-sm{height:8px}.size-md{height:16px}.size-lg{height:24px}.hearts{display:flex;flex-wrap:wrap;align-items:center;gap:.2rem}.hearts.size-sm,.hearts.size-md,.hearts.size-lg{height:auto}.fill{height:100%;transition:width .3s ease}.segments{display:flex;height:100%;width:100%;gap:2px;padding:2px}.seg{flex:1;background:var(--bg-surface-alt)}.seg.fill.tone-cyan,.fill.tone-cyan{background:var(--accent-secondary-fill)}.seg.fill.tone-magenta,.fill.tone-magenta{background:var(--accent-primary-fill)}.seg.fill.tone-gold,.fill.tone-gold{background:var(--accent-gold-fill)}.seg.fill.tone-green,.fill.tone-green{background:var(--accent-success-fill)}.seg.fill.tone-red,.fill.tone-red{background:var(--accent-danger-fill)}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], showValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "showValue", required: false }] }], showPercent: [{ type: i0.Input, args: [{ isSignal: true, alias: "showPercent", required: false }] }], segmented: [{ type: i0.Input, args: [{ isSignal: true, alias: "segmented", required: false }] }], hearts: [{ type: i0.Input, args: [{ isSignal: true, alias: "hearts", required: false }] }] } });

class GenericCourseModal {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    tone = input('celeste', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    kicker = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "kicker" }] : /* istanbul ignore next */ []));
    title = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    subtitle = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    lives = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "lives" }] : /* istanbul ignore next */ []));
    maxLives = input(3, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "maxLives" }] : /* istanbul ignore next */ []));
    coins = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "coins" }] : /* istanbul ignore next */ []));
    badges = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "badges" }] : /* istanbul ignore next */ []));
    progressLabel = input('Progreso del curso', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progressLabel" }] : /* istanbul ignore next */ []));
    progressValue = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progressValue" }] : /* istanbul ignore next */ []));
    progressMax = input(100, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progressMax" }] : /* istanbul ignore next */ []));
    actionLabel = input('Ver curso', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "actionLabel" }] : /* istanbul ignore next */ []));
    dismissable = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dismissable" }] : /* istanbul ignore next */ []));
    closeLabel = input('Cerrar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closeLabel" }] : /* istanbul ignore next */ []));
    actionClick = output();
    closed = output();
    close() {
        if (!this.dismissable())
            return;
        this.open.set(false);
        this.closed.emit();
    }
    onBackdrop() {
        this.close();
    }
    onAction() {
        this.actionClick.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericCourseModal, isStandalone: true, selector: "generic-course-modal", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, kicker: { classPropertyName: "kicker", publicName: "kicker", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, lives: { classPropertyName: "lives", publicName: "lives", isSignal: true, isRequired: false, transformFunction: null }, maxLives: { classPropertyName: "maxLives", publicName: "maxLives", isSignal: true, isRequired: false, transformFunction: null }, coins: { classPropertyName: "coins", publicName: "coins", isSignal: true, isRequired: false, transformFunction: null }, badges: { classPropertyName: "badges", publicName: "badges", isSignal: true, isRequired: false, transformFunction: null }, progressLabel: { classPropertyName: "progressLabel", publicName: "progressLabel", isSignal: true, isRequired: false, transformFunction: null }, progressValue: { classPropertyName: "progressValue", publicName: "progressValue", isSignal: true, isRequired: false, transformFunction: null }, progressMax: { classPropertyName: "progressMax", publicName: "progressMax", isSignal: true, isRequired: false, transformFunction: null }, actionLabel: { classPropertyName: "actionLabel", publicName: "actionLabel", isSignal: true, isRequired: false, transformFunction: null }, dismissable: { classPropertyName: "dismissable", publicName: "dismissable", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", actionClick: "actionClick", closed: "closed" }, host: { listeners: { "document:keydown.escape": "close()" } }, ngImport: i0, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel tone-{{ tone() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    [attr.aria-label]=\"title() || 'Curso'\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <span class=\"pixel tl\"></span>\n    <span class=\"pixel tr\"></span>\n    <span class=\"pixel bl\"></span>\n    <span class=\"pixel br\"></span>\n\n    @if (dismissable()) {\n    <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n    }\n\n    <div class=\"top\">\n      <div class=\"headings\">\n        @if (kicker()) {\n        <p class=\"kicker\">{{ kicker() }}</p>\n        }\n        <h2 class=\"title\">{{ title() }}</h2>\n        @if (subtitle()) {\n        <p class=\"sub\">{{ subtitle() }}</p>\n        }\n      </div>\n      <div class=\"meta\">\n        @if (maxLives() > 0) {\n        <generic-progress [hearts]=\"true\" [value]=\"lives()\" [max]=\"maxLives()\" size=\"sm\" />\n        } @if (coins() !== null) {\n        <span class=\"coins\">\n          <generic-icon name=\"coin\" [size]=\"16\" label=\"Monedas\" />\n          <span>{{ coins() }}</span>\n        </span>\n        }\n      </div>\n    </div>\n\n    @if (badges().length) {\n    <div class=\"badges\">\n      @for (badge of badges(); track badge.label) {\n      <generic-badge\n        [tone]=\"badge.tone ?? 'cyan'\"\n        [appearance]=\"badge.appearance ?? 'outline'\"\n        size=\"sm\"\n      >\n        {{ badge.label }}\n      </generic-badge>\n      }\n    </div>\n    }\n\n    <generic-progress\n      [value]=\"progressValue()\"\n      [max]=\"progressMax()\"\n      [label]=\"progressLabel()\"\n      [showValue]=\"true\"\n      tone=\"cyan\"\n    />\n\n    <div class=\"actions\">\n      <button type=\"button\" class=\"cta\" (click)=\"onAction()\">{{ actionLabel() }}</button>\n    </div>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.panel{position:relative;width:100%;max-width:34rem;display:flex;flex-direction:column;gap:1rem;padding:1.25rem 1.35rem 1.15rem;background:color-mix(in srgb,var(--course-accent) 18%,var(--bg-surface));border:2px solid var(--course-accent);border-radius:4px;outline:none;--course-accent: var(--accent-secondary-fill);--course-fill: var(--accent-secondary-fill)}.tone-celeste{--course-accent: #2eb7c9;--course-fill: #5ecfe0}.tone-rosa{--course-accent: #e86a9a;--course-fill: #f090b0}.tone-naranja{--course-accent: #e8892a;--course-fill: #f0a84a}.tone-verde{--course-accent: var(--accent-success);--course-fill: var(--accent-success-fill)}.tone-violeta{--course-accent: #8b6cc9;--course-fill: #a78be0}.tone-dorado{--course-accent: var(--accent-gold-fill);--course-fill: var(--accent-gold-fill)}.tone-magenta{--course-accent: var(--accent-primary-fill);--course-fill: var(--accent-primary-fill)}:host-context([data-theme=\"dark\"]) .tone-celeste{--course-accent: #4aa8c8;--course-fill: #6ec4dc}:host-context([data-theme=\"dark\"]) .tone-rosa{--course-accent: #e08a9a;--course-fill: #f0a8b4}:host-context([data-theme=\"dark\"]) .tone-naranja{--course-accent: #e09a58;--course-fill: #f0b46a}:host-context([data-theme=\"dark\"]) .tone-violeta{--course-accent: #7a8ec8;--course-fill: #94a8dc}.pixel{position:absolute;width:6px;height:6px;background:var(--course-accent)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.x{position:absolute;top:.55rem;right:.55rem;background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:26px;height:26px;border-radius:2px;cursor:pointer;font-size:1.15rem;line-height:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding-right:1.6rem}.headings{display:flex;flex-direction:column;gap:.2rem;min-width:0}.kicker{margin:0;font-family:var(--font-retro);font-size:.7rem;color:var(--course-accent);text-transform:none}.title{margin:0;font-family:var(--font-retro);font-size:1.35rem;line-height:1.25;color:var(--text-primary)}.sub{margin:0;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted)}.meta{display:flex;align-items:center;gap:.65rem;flex-shrink:0}.coins{display:inline-flex;align-items:center;gap:.3rem;padding:.18rem .45rem;border:2px solid var(--accent-gold-fill);background:color-mix(in srgb,var(--accent-gold-fill) 18%,var(--bg-surface));color:var(--accent-gold);font-family:var(--font-retro);font-size:.72rem}.badges{display:flex;flex-wrap:wrap;gap:.4rem}.actions{display:flex;justify-content:flex-end}.cta{font-family:var(--font-arcade);font-size:1rem;font-weight:700;text-transform:none;padding:.7rem 1.35rem;border:2px solid var(--course-fill);background:var(--course-fill);color:#020617;cursor:pointer;box-shadow:0 4px color-mix(in srgb,var(--course-fill) 65%,black)}.cta:active{transform:translateY(4px);box-shadow:none}.panel ::ng-deep .fill{background:var(--course-fill)}\n"], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }, { kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }, { kind: "component", type: GenericProgress, selector: "generic-progress", inputs: ["value", "max", "tone", "size", "label", "showValue", "showPercent", "segmented", "hearts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseModal, decorators: [{
            type: Component,
            args: [{ selector: 'generic-course-modal', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge, GenericIcon, GenericProgress], host: {
                        '(document:keydown.escape)': 'close()',
                    }, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel tone-{{ tone() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    [attr.aria-label]=\"title() || 'Curso'\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <span class=\"pixel tl\"></span>\n    <span class=\"pixel tr\"></span>\n    <span class=\"pixel bl\"></span>\n    <span class=\"pixel br\"></span>\n\n    @if (dismissable()) {\n    <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n    }\n\n    <div class=\"top\">\n      <div class=\"headings\">\n        @if (kicker()) {\n        <p class=\"kicker\">{{ kicker() }}</p>\n        }\n        <h2 class=\"title\">{{ title() }}</h2>\n        @if (subtitle()) {\n        <p class=\"sub\">{{ subtitle() }}</p>\n        }\n      </div>\n      <div class=\"meta\">\n        @if (maxLives() > 0) {\n        <generic-progress [hearts]=\"true\" [value]=\"lives()\" [max]=\"maxLives()\" size=\"sm\" />\n        } @if (coins() !== null) {\n        <span class=\"coins\">\n          <generic-icon name=\"coin\" [size]=\"16\" label=\"Monedas\" />\n          <span>{{ coins() }}</span>\n        </span>\n        }\n      </div>\n    </div>\n\n    @if (badges().length) {\n    <div class=\"badges\">\n      @for (badge of badges(); track badge.label) {\n      <generic-badge\n        [tone]=\"badge.tone ?? 'cyan'\"\n        [appearance]=\"badge.appearance ?? 'outline'\"\n        size=\"sm\"\n      >\n        {{ badge.label }}\n      </generic-badge>\n      }\n    </div>\n    }\n\n    <generic-progress\n      [value]=\"progressValue()\"\n      [max]=\"progressMax()\"\n      [label]=\"progressLabel()\"\n      [showValue]=\"true\"\n      tone=\"cyan\"\n    />\n\n    <div class=\"actions\">\n      <button type=\"button\" class=\"cta\" (click)=\"onAction()\">{{ actionLabel() }}</button>\n    </div>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.panel{position:relative;width:100%;max-width:34rem;display:flex;flex-direction:column;gap:1rem;padding:1.25rem 1.35rem 1.15rem;background:color-mix(in srgb,var(--course-accent) 18%,var(--bg-surface));border:2px solid var(--course-accent);border-radius:4px;outline:none;--course-accent: var(--accent-secondary-fill);--course-fill: var(--accent-secondary-fill)}.tone-celeste{--course-accent: #2eb7c9;--course-fill: #5ecfe0}.tone-rosa{--course-accent: #e86a9a;--course-fill: #f090b0}.tone-naranja{--course-accent: #e8892a;--course-fill: #f0a84a}.tone-verde{--course-accent: var(--accent-success);--course-fill: var(--accent-success-fill)}.tone-violeta{--course-accent: #8b6cc9;--course-fill: #a78be0}.tone-dorado{--course-accent: var(--accent-gold-fill);--course-fill: var(--accent-gold-fill)}.tone-magenta{--course-accent: var(--accent-primary-fill);--course-fill: var(--accent-primary-fill)}:host-context([data-theme=\"dark\"]) .tone-celeste{--course-accent: #4aa8c8;--course-fill: #6ec4dc}:host-context([data-theme=\"dark\"]) .tone-rosa{--course-accent: #e08a9a;--course-fill: #f0a8b4}:host-context([data-theme=\"dark\"]) .tone-naranja{--course-accent: #e09a58;--course-fill: #f0b46a}:host-context([data-theme=\"dark\"]) .tone-violeta{--course-accent: #7a8ec8;--course-fill: #94a8dc}.pixel{position:absolute;width:6px;height:6px;background:var(--course-accent)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.x{position:absolute;top:.55rem;right:.55rem;background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:26px;height:26px;border-radius:2px;cursor:pointer;font-size:1.15rem;line-height:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding-right:1.6rem}.headings{display:flex;flex-direction:column;gap:.2rem;min-width:0}.kicker{margin:0;font-family:var(--font-retro);font-size:.7rem;color:var(--course-accent);text-transform:none}.title{margin:0;font-family:var(--font-retro);font-size:1.35rem;line-height:1.25;color:var(--text-primary)}.sub{margin:0;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted)}.meta{display:flex;align-items:center;gap:.65rem;flex-shrink:0}.coins{display:inline-flex;align-items:center;gap:.3rem;padding:.18rem .45rem;border:2px solid var(--accent-gold-fill);background:color-mix(in srgb,var(--accent-gold-fill) 18%,var(--bg-surface));color:var(--accent-gold);font-family:var(--font-retro);font-size:.72rem}.badges{display:flex;flex-wrap:wrap;gap:.4rem}.actions{display:flex;justify-content:flex-end}.cta{font-family:var(--font-arcade);font-size:1rem;font-weight:700;text-transform:none;padding:.7rem 1.35rem;border:2px solid var(--course-fill);background:var(--course-fill);color:#020617;cursor:pointer;box-shadow:0 4px color-mix(in srgb,var(--course-fill) 65%,black)}.cta:active{transform:translateY(4px);box-shadow:none}.panel ::ng-deep .fill{background:var(--course-fill)}\n"] }]
        }], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], kicker: [{ type: i0.Input, args: [{ isSignal: true, alias: "kicker", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], lives: [{ type: i0.Input, args: [{ isSignal: true, alias: "lives", required: false }] }], maxLives: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLives", required: false }] }], coins: [{ type: i0.Input, args: [{ isSignal: true, alias: "coins", required: false }] }], badges: [{ type: i0.Input, args: [{ isSignal: true, alias: "badges", required: false }] }], progressLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "progressLabel", required: false }] }], progressValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "progressValue", required: false }] }], progressMax: [{ type: i0.Input, args: [{ isSignal: true, alias: "progressMax", required: false }] }], actionLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "actionLabel", required: false }] }], dismissable: [{ type: i0.Input, args: [{ isSignal: true, alias: "dismissable", required: false }] }], closeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeLabel", required: false }] }], actionClick: [{ type: i0.Output, args: ["actionClick"] }], closed: [{ type: i0.Output, args: ["closed"] }] } });

class GenericTable {
    columns = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []));
    rows = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    searchable = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "searchable" }] : /* istanbul ignore next */ []));
    searchPlaceholder = input('Buscar...', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []));
    pageSize = input(8, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageSize" }] : /* istanbul ignore next */ []));
    emptyMessage = input('Sin resultados', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "emptyMessage" }] : /* istanbul ignore next */ []));
    rowClick = output();
    sortChange = output();
    query = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    sortKey = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sortKey" }] : /* istanbul ignore next */ []));
    sortDir = signal('asc', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sortDir" }] : /* istanbul ignore next */ []));
    page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    filters = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filters" }] : /* istanbul ignore next */ []));
    filterableColumns = computed(() => this.columns().filter(col => col.filterable), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filterableColumns" }] : /* istanbul ignore next */ []));
    filterOptions = computed(() => {
        const map = {};
        for (const col of this.filterableColumns()) {
            const values = new Set(this.rows().map(row => String(row[col.key] ?? '')));
            map[col.key] = Array.from(values).sort();
        }
        return map;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filterOptions" }] : /* istanbul ignore next */ []));
    filtered = computed(() => {
        const q = this.query().trim().toLowerCase();
        const active = this.filters();
        return this.rows().filter(row => {
            for (const [key, value] of Object.entries(active)) {
                if (value && String(row[key] ?? '') !== value)
                    return false;
            }
            if (!q)
                return true;
            return this.columns().some(col => String(row[col.key] ?? '')
                .toLowerCase()
                .includes(q));
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    sorted = computed(() => {
        const key = this.sortKey();
        const dir = this.sortDir() === 'asc' ? 1 : -1;
        const rows = [...this.filtered()];
        if (!key)
            return rows;
        return rows.sort((a, b) => {
            const av = a[key];
            const bv = b[key];
            if (typeof av === 'number' && typeof bv === 'number')
                return (av - bv) * dir;
            return String(av ?? '').localeCompare(String(bv ?? ''), 'es') * dir;
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sorted" }] : /* istanbul ignore next */ []));
    pageCount = computed(() => Math.max(1, Math.ceil(this.sorted().length / this.pageSize())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageCount" }] : /* istanbul ignore next */ []));
    pageRows = computed(() => {
        const size = this.pageSize();
        const start = (this.page() - 1) * size;
        return this.sorted().slice(start, start + size);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageRows" }] : /* istanbul ignore next */ []));
    setQuery(value) {
        this.query.set(value);
        this.page.set(1);
    }
    setFilter(key, value) {
        this.filters.update(current => ({ ...current, [key]: value }));
        this.page.set(1);
    }
    sort(col) {
        if (!col.sortable)
            return;
        if (this.sortKey() === col.key) {
            this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
        }
        else {
            this.sortKey.set(col.key);
            this.sortDir.set('asc');
        }
        this.sortChange.emit({ key: this.sortKey(), direction: this.sortDir() });
    }
    go(page) {
        const next = Math.min(Math.max(page, 1), this.pageCount());
        this.page.set(next);
    }
    filterValue(key) {
        return this.filters()[key] || '';
    }
    cell(row, key) {
        const value = row[key];
        return value == null ? '' : String(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTable, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericTable, isStandalone: true, selector: "generic-table", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null }, searchable: { classPropertyName: "searchable", publicName: "searchable", isSignal: true, isRequired: false, transformFunction: null }, searchPlaceholder: { classPropertyName: "searchPlaceholder", publicName: "searchPlaceholder", isSignal: true, isRequired: false, transformFunction: null }, pageSize: { classPropertyName: "pageSize", publicName: "pageSize", isSignal: true, isRequired: false, transformFunction: null }, emptyMessage: { classPropertyName: "emptyMessage", publicName: "emptyMessage", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { rowClick: "rowClick", sortChange: "sortChange" }, ngImport: i0, template: "<div class=\"shell\">\n  <div class=\"toolbar\">\n    @if (searchable()) {\n    <input\n      class=\"search\"\n      type=\"search\"\n      [placeholder]=\"searchPlaceholder()\"\n      [value]=\"query()\"\n      (input)=\"setQuery($any($event.target).value)\"\n    />\n    } @for (col of filterableColumns(); track col.key) {\n    <label class=\"filter\">\n      {{ col.header }}\n      <select\n        [value]=\"filterValue(col.key)\"\n        (change)=\"setFilter(col.key, $any($event.target).value)\"\n      >\n        <option value=\"\">Todos</option>\n        @for (option of filterOptions()[col.key]; track option) {\n        <option [value]=\"option\">{{ option }}</option>\n        }\n      </select>\n    </label>\n    }\n  </div>\n\n  <div class=\"scroller\">\n    <table>\n      <thead>\n        <tr>\n          @for (col of columns(); track col.key) {\n          <th\n            [style.width]=\"col.width\"\n            [class]=\"'align-' + (col.align ?? 'left')\"\n            [attr.aria-sort]=\"sortKey() === col.key ? (sortDir() === 'asc' ? 'ascending' : 'descending') : null\"\n          >\n            @if (col.sortable) {\n            <button type=\"button\" (click)=\"sort(col)\">\n              {{ col.header }}\n              <span class=\"arrow\" [class.on]=\"sortKey() === col.key\">\n                {{ sortKey() === col.key && sortDir() === 'desc' ? '\u25BC' : '\u25B2' }}\n              </span>\n            </button>\n            } @else { {{ col.header }} }\n          </th>\n          }\n        </tr>\n      </thead>\n      <tbody>\n        @for (row of pageRows(); track $index) {\n        <tr (click)=\"rowClick.emit(row)\">\n          @for (col of columns(); track col.key) {\n          <td [class]=\"'align-' + (col.align ?? 'left')\">{{ cell(row, col.key) }}</td>\n          }\n        </tr>\n        } @empty {\n        <tr>\n          <td class=\"empty\" [attr.colspan]=\"columns().length\">{{ emptyMessage() }}</td>\n        </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  @if (pageCount() > 1) {\n  <nav class=\"pager\" aria-label=\"paginaci\u00F3n\">\n    <button type=\"button\" [disabled]=\"page() <= 1\" (click)=\"go(page() - 1)\">\u2039</button>\n    <span>{{ page() }} / {{ pageCount() }}</span>\n    <button type=\"button\" [disabled]=\"page() >= pageCount()\" (click)=\"go(page() + 1)\">\u203A</button>\n  </nav>\n  }\n</div>\n", styles: [":host{display:block}.shell{display:flex;flex-direction:column;gap:.75rem}.toolbar{display:flex;flex-wrap:wrap;gap:.75rem;align-items:end}.search,.filter select{background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.4rem .65rem;border-radius:2px}.search{min-width:12rem;flex:1}.search:focus,.filter select:focus{outline:none;border-color:var(--accent-secondary)}.filter{display:flex;flex-direction:column;gap:.2rem;font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.scroller{overflow-x:auto;border:2px solid var(--border-subtle);border-radius:2px;background:color-mix(in srgb,var(--bg-surface) 60%,transparent)}table{width:100%;border-collapse:collapse;font-family:var(--font-arcade);font-size:1rem}th{background:var(--bg-surface-alt);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:.85rem;font-weight:700;letter-spacing:0;padding:.65rem .75rem;border-bottom:2px solid var(--border-subtle)}th button{display:inline-flex;align-items:center;gap:.25rem;background:none;border:0;color:inherit;font:inherit;text-transform:none;cursor:pointer}.arrow{opacity:.3}.arrow.on{opacity:1;color:var(--accent-gold)}td{padding:.65rem .75rem;color:var(--text-primary);border-bottom:1px solid var(--border-subtle)}tr:last-child td{border-bottom:0}tbody tr{cursor:pointer}tbody tr:hover{background:color-mix(in srgb,var(--bg-surface-alt) 70%,transparent)}.align-left{text-align:left}.align-center{text-align:center}.align-right{text-align:right}.empty{text-align:center;color:var(--text-muted);padding:1.5rem}.pager{display:flex;align-items:center;justify-content:center;gap:.6rem;font-family:var(--font-arcade);font-size:.85rem}.pager button{min-width:32px;height:32px;border:2px solid var(--border-subtle);background:transparent;color:var(--text-muted);cursor:pointer}.pager button:hover:not(:disabled){border-color:var(--accent-secondary);color:var(--accent-secondary)}.pager button:disabled{opacity:.4;cursor:not-allowed}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTable, decorators: [{
            type: Component,
            args: [{ selector: 'generic-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"shell\">\n  <div class=\"toolbar\">\n    @if (searchable()) {\n    <input\n      class=\"search\"\n      type=\"search\"\n      [placeholder]=\"searchPlaceholder()\"\n      [value]=\"query()\"\n      (input)=\"setQuery($any($event.target).value)\"\n    />\n    } @for (col of filterableColumns(); track col.key) {\n    <label class=\"filter\">\n      {{ col.header }}\n      <select\n        [value]=\"filterValue(col.key)\"\n        (change)=\"setFilter(col.key, $any($event.target).value)\"\n      >\n        <option value=\"\">Todos</option>\n        @for (option of filterOptions()[col.key]; track option) {\n        <option [value]=\"option\">{{ option }}</option>\n        }\n      </select>\n    </label>\n    }\n  </div>\n\n  <div class=\"scroller\">\n    <table>\n      <thead>\n        <tr>\n          @for (col of columns(); track col.key) {\n          <th\n            [style.width]=\"col.width\"\n            [class]=\"'align-' + (col.align ?? 'left')\"\n            [attr.aria-sort]=\"sortKey() === col.key ? (sortDir() === 'asc' ? 'ascending' : 'descending') : null\"\n          >\n            @if (col.sortable) {\n            <button type=\"button\" (click)=\"sort(col)\">\n              {{ col.header }}\n              <span class=\"arrow\" [class.on]=\"sortKey() === col.key\">\n                {{ sortKey() === col.key && sortDir() === 'desc' ? '\u25BC' : '\u25B2' }}\n              </span>\n            </button>\n            } @else { {{ col.header }} }\n          </th>\n          }\n        </tr>\n      </thead>\n      <tbody>\n        @for (row of pageRows(); track $index) {\n        <tr (click)=\"rowClick.emit(row)\">\n          @for (col of columns(); track col.key) {\n          <td [class]=\"'align-' + (col.align ?? 'left')\">{{ cell(row, col.key) }}</td>\n          }\n        </tr>\n        } @empty {\n        <tr>\n          <td class=\"empty\" [attr.colspan]=\"columns().length\">{{ emptyMessage() }}</td>\n        </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  @if (pageCount() > 1) {\n  <nav class=\"pager\" aria-label=\"paginaci\u00F3n\">\n    <button type=\"button\" [disabled]=\"page() <= 1\" (click)=\"go(page() - 1)\">\u2039</button>\n    <span>{{ page() }} / {{ pageCount() }}</span>\n    <button type=\"button\" [disabled]=\"page() >= pageCount()\" (click)=\"go(page() + 1)\">\u203A</button>\n  </nav>\n  }\n</div>\n", styles: [":host{display:block}.shell{display:flex;flex-direction:column;gap:.75rem}.toolbar{display:flex;flex-wrap:wrap;gap:.75rem;align-items:end}.search,.filter select{background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.4rem .65rem;border-radius:2px}.search{min-width:12rem;flex:1}.search:focus,.filter select:focus{outline:none;border-color:var(--accent-secondary)}.filter{display:flex;flex-direction:column;gap:.2rem;font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.scroller{overflow-x:auto;border:2px solid var(--border-subtle);border-radius:2px;background:color-mix(in srgb,var(--bg-surface) 60%,transparent)}table{width:100%;border-collapse:collapse;font-family:var(--font-arcade);font-size:1rem}th{background:var(--bg-surface-alt);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:.85rem;font-weight:700;letter-spacing:0;padding:.65rem .75rem;border-bottom:2px solid var(--border-subtle)}th button{display:inline-flex;align-items:center;gap:.25rem;background:none;border:0;color:inherit;font:inherit;text-transform:none;cursor:pointer}.arrow{opacity:.3}.arrow.on{opacity:1;color:var(--accent-gold)}td{padding:.65rem .75rem;color:var(--text-primary);border-bottom:1px solid var(--border-subtle)}tr:last-child td{border-bottom:0}tbody tr{cursor:pointer}tbody tr:hover{background:color-mix(in srgb,var(--bg-surface-alt) 70%,transparent)}.align-left{text-align:left}.align-center{text-align:center}.align-right{text-align:right}.empty{text-align:center;color:var(--text-muted);padding:1.5rem}.pager{display:flex;align-items:center;justify-content:center;gap:.6rem;font-family:var(--font-arcade);font-size:.85rem}.pager button{min-width:32px;height:32px;border:2px solid var(--border-subtle);background:transparent;color:var(--text-muted);cursor:pointer}.pager button:hover:not(:disabled){border-color:var(--accent-secondary);color:var(--accent-secondary)}.pager button:disabled{opacity:.4;cursor:not-allowed}\n"] }]
        }], propDecorators: { columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: false }] }], rows: [{ type: i0.Input, args: [{ isSignal: true, alias: "rows", required: false }] }], searchable: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchable", required: false }] }], searchPlaceholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchPlaceholder", required: false }] }], pageSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "pageSize", required: false }] }], emptyMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyMessage", required: false }] }], rowClick: [{ type: i0.Output, args: ["rowClick"] }], sortChange: [{ type: i0.Output, args: ["sortChange"] }] } });

class GenericStepper {
    steps = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "steps" }] : /* istanbul ignore next */ []));
    currentIndex = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentIndex" }] : /* istanbul ignore next */ []));
    orientation = input('horizontal', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
    stepClick = output();
    stateOf(index) {
        if (index < this.currentIndex())
            return 'done';
        if (index === this.currentIndex())
            return 'active';
        return 'todo';
    }
    onClick(step, index) {
        if (step.locked)
            return;
        this.stepClick.emit({ step, index });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStepper, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericStepper, isStandalone: true, selector: "generic-stepper", inputs: { steps: { classPropertyName: "steps", publicName: "steps", isSignal: true, isRequired: false, transformFunction: null }, currentIndex: { classPropertyName: "currentIndex", publicName: "currentIndex", isSignal: true, isRequired: false, transformFunction: null }, orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { stepClick: "stepClick" }, ngImport: i0, template: "<ol class=\"steps orient-{{ orientation() }}\">\n  @for (step of steps(); track step.id; let i = $index; let last = $last) {\n  <li class=\"step\" [attr.aria-current]=\"stateOf(i) === 'active' ? 'step' : null\">\n    <div class=\"rail\">\n      @if (orientation() === 'horizontal') {\n      <span\n        class=\"line\"\n        [class.on]=\"i > 0 && stateOf(i) !== 'todo'\"\n        [class.hidden]=\"i === 0\"\n      ></span>\n      }\n      <button\n        type=\"button\"\n        class=\"dot {{ stateOf(i) }}\"\n        [class.locked]=\"step.locked\"\n        [disabled]=\"step.locked\"\n        (click)=\"onClick(step, i)\"\n      >\n        @if (stateOf(i) === 'done') { \u2713 } @else { {{ i + 1 }} }\n      </button>\n      @if (orientation() === 'horizontal') {\n      <span class=\"line\" [class.on]=\"stateOf(i) === 'done'\" [class.hidden]=\"last\"></span>\n      } @else if (!last) {\n      <span class=\"vline\" [class.on]=\"stateOf(i) === 'done'\"></span>\n      }\n    </div>\n    <span class=\"caption\" [class.active]=\"stateOf(i) === 'active'\">{{ step.label }}</span>\n  </li>\n  }\n</ol>\n", styles: [":host{display:block}.steps{display:flex;gap:0;margin:0;padding:0;list-style:none}.orient-horizontal{flex-direction:row;align-items:flex-start;overflow-x:auto}.orient-vertical{flex-direction:column}.step{display:flex;flex:1;min-width:6rem}.orient-horizontal .step{flex-direction:column;align-items:center;text-align:center}.orient-vertical .step{flex-direction:row;align-items:flex-start;gap:.75rem}.rail{display:flex;align-items:center;width:100%}.orient-vertical .rail{flex-direction:column;width:auto}.line{height:2px;flex:1;background:var(--border-subtle)}.line.on{background:var(--accent-secondary-fill)}.line.hidden{visibility:hidden}.vline{width:2px;height:1.5rem;background:var(--border-subtle)}.vline.on{background:var(--accent-secondary-fill)}.dot{flex-shrink:0;width:32px;height:32px;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface-alt);color:var(--text-muted);font-family:var(--font-arcade);font-size:.85rem;font-weight:700;cursor:pointer}.dot.done{background:var(--accent-success-fill);border-color:var(--accent-success-fill);color:#02140b}.dot.active{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#020617}.dot.locked{opacity:.4;cursor:default}.caption{margin-top:.5rem;padding:0 .25rem;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted)}.caption.active{color:var(--accent-secondary)}.orient-vertical .caption{margin-top:.4rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStepper, decorators: [{
            type: Component,
            args: [{ selector: 'generic-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ol class=\"steps orient-{{ orientation() }}\">\n  @for (step of steps(); track step.id; let i = $index; let last = $last) {\n  <li class=\"step\" [attr.aria-current]=\"stateOf(i) === 'active' ? 'step' : null\">\n    <div class=\"rail\">\n      @if (orientation() === 'horizontal') {\n      <span\n        class=\"line\"\n        [class.on]=\"i > 0 && stateOf(i) !== 'todo'\"\n        [class.hidden]=\"i === 0\"\n      ></span>\n      }\n      <button\n        type=\"button\"\n        class=\"dot {{ stateOf(i) }}\"\n        [class.locked]=\"step.locked\"\n        [disabled]=\"step.locked\"\n        (click)=\"onClick(step, i)\"\n      >\n        @if (stateOf(i) === 'done') { \u2713 } @else { {{ i + 1 }} }\n      </button>\n      @if (orientation() === 'horizontal') {\n      <span class=\"line\" [class.on]=\"stateOf(i) === 'done'\" [class.hidden]=\"last\"></span>\n      } @else if (!last) {\n      <span class=\"vline\" [class.on]=\"stateOf(i) === 'done'\"></span>\n      }\n    </div>\n    <span class=\"caption\" [class.active]=\"stateOf(i) === 'active'\">{{ step.label }}</span>\n  </li>\n  }\n</ol>\n", styles: [":host{display:block}.steps{display:flex;gap:0;margin:0;padding:0;list-style:none}.orient-horizontal{flex-direction:row;align-items:flex-start;overflow-x:auto}.orient-vertical{flex-direction:column}.step{display:flex;flex:1;min-width:6rem}.orient-horizontal .step{flex-direction:column;align-items:center;text-align:center}.orient-vertical .step{flex-direction:row;align-items:flex-start;gap:.75rem}.rail{display:flex;align-items:center;width:100%}.orient-vertical .rail{flex-direction:column;width:auto}.line{height:2px;flex:1;background:var(--border-subtle)}.line.on{background:var(--accent-secondary-fill)}.line.hidden{visibility:hidden}.vline{width:2px;height:1.5rem;background:var(--border-subtle)}.vline.on{background:var(--accent-secondary-fill)}.dot{flex-shrink:0;width:32px;height:32px;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface-alt);color:var(--text-muted);font-family:var(--font-arcade);font-size:.85rem;font-weight:700;cursor:pointer}.dot.done{background:var(--accent-success-fill);border-color:var(--accent-success-fill);color:#02140b}.dot.active{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#020617}.dot.locked{opacity:.4;cursor:default}.caption{margin-top:.5rem;padding:0 .25rem;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted)}.caption.active{color:var(--accent-secondary)}.orient-vertical .caption{margin-top:.4rem}\n"] }]
        }], propDecorators: { steps: [{ type: i0.Input, args: [{ isSignal: true, alias: "steps", required: false }] }], currentIndex: [{ type: i0.Input, args: [{ isSignal: true, alias: "currentIndex", required: false }] }], orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "orientation", required: false }] }], stepClick: [{ type: i0.Output, args: ["stepClick"] }] } });

class GenericDropdown {
    host = inject(ElementRef);
    label = input('Menu', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    items = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    align = input('left', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []));
    itemSelect = output();
    open = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    toggle() {
        this.open.update(value => !value);
    }
    pick(item) {
        if (item.disabled)
            return;
        this.itemSelect.emit(item);
        this.open.set(false);
    }
    onDocumentClick(event) {
        if (!this.host.nativeElement.contains(event.target)) {
            this.open.set(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDropdown, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericDropdown, isStandalone: true, selector: "generic-dropdown", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemSelect: "itemSelect" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, ngImport: i0, template: "<div class=\"menu\">\n  <button type=\"button\" class=\"trigger\" [attr.aria-expanded]=\"open()\" (click)=\"toggle()\">\n    <ng-content />\n    <span>{{ label() }}</span>\n    <span class=\"chevron\" aria-hidden=\"true\"></span>\n  </button>\n  @if (open()) {\n  <ul class=\"list align-{{ align() }}\" role=\"menu\">\n    @for (item of items(); track item.id) {\n    <li>\n      <button\n        type=\"button\"\n        role=\"menuitem\"\n        [disabled]=\"item.disabled\"\n        [class.danger]=\"item.danger\"\n        (click)=\"pick(item)\"\n      >\n        {{ item.label }}\n      </button>\n    </li>\n    }\n  </ul>\n  }\n</div>\n", styles: [":host{display:inline-block;position:relative}.menu{position:relative}.trigger{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-arcade);font-size:.9rem;font-weight:700;text-transform:none;color:var(--text-primary);background:var(--bg-surface);border:2px solid var(--border-subtle);padding:.55rem .8rem;cursor:pointer}.trigger:hover{border-color:var(--accent-secondary);color:var(--accent-secondary)}.chevron{width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px)}.list{position:absolute;top:calc(100% + 4px);z-index:20;min-width:100%;margin:0;padding:.25rem;list-style:none;background:var(--bg-surface);border:2px solid var(--accent-secondary);box-shadow:0 8px color-mix(in srgb,var(--accent-secondary) 35%,black)}.align-left{left:0}.align-right{right:0}:host-context(generic-navbar){position:static}:host-context(generic-navbar) .menu{position:static}:host-context(generic-navbar) .list{top:calc(100% - 2px)}.list button{width:100%;text-align:left;background:transparent;border:0;color:var(--text-primary);font-family:var(--font-arcade);font-size:1rem;padding:.45rem .7rem;cursor:pointer}.list button:hover:not(:disabled){background:var(--bg-surface-alt);color:var(--accent-secondary)}.list button.danger{color:var(--accent-danger)}.list button:disabled{opacity:.4;cursor:not-allowed}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDropdown, decorators: [{
            type: Component,
            args: [{ selector: 'generic-dropdown', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"menu\">\n  <button type=\"button\" class=\"trigger\" [attr.aria-expanded]=\"open()\" (click)=\"toggle()\">\n    <ng-content />\n    <span>{{ label() }}</span>\n    <span class=\"chevron\" aria-hidden=\"true\"></span>\n  </button>\n  @if (open()) {\n  <ul class=\"list align-{{ align() }}\" role=\"menu\">\n    @for (item of items(); track item.id) {\n    <li>\n      <button\n        type=\"button\"\n        role=\"menuitem\"\n        [disabled]=\"item.disabled\"\n        [class.danger]=\"item.danger\"\n        (click)=\"pick(item)\"\n      >\n        {{ item.label }}\n      </button>\n    </li>\n    }\n  </ul>\n  }\n</div>\n", styles: [":host{display:inline-block;position:relative}.menu{position:relative}.trigger{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-arcade);font-size:.9rem;font-weight:700;text-transform:none;color:var(--text-primary);background:var(--bg-surface);border:2px solid var(--border-subtle);padding:.55rem .8rem;cursor:pointer}.trigger:hover{border-color:var(--accent-secondary);color:var(--accent-secondary)}.chevron{width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px)}.list{position:absolute;top:calc(100% + 4px);z-index:20;min-width:100%;margin:0;padding:.25rem;list-style:none;background:var(--bg-surface);border:2px solid var(--accent-secondary);box-shadow:0 8px color-mix(in srgb,var(--accent-secondary) 35%,black)}.align-left{left:0}.align-right{right:0}:host-context(generic-navbar){position:static}:host-context(generic-navbar) .menu{position:static}:host-context(generic-navbar) .list{top:calc(100% - 2px)}.list button{width:100%;text-align:left;background:transparent;border:0;color:var(--text-primary);font-family:var(--font-arcade);font-size:1rem;padding:.45rem .7rem;cursor:pointer}.list button:hover:not(:disabled){background:var(--bg-surface-alt);color:var(--accent-secondary)}.list button.danger{color:var(--accent-danger)}.list button:disabled{opacity:.4;cursor:not-allowed}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], align: [{ type: i0.Input, args: [{ isSignal: true, alias: "align", required: false }] }], itemSelect: [{ type: i0.Output, args: ["itemSelect"] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class GenericSpinner {
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    label = input('Cargando', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSpinner, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericSpinner, isStandalone: true, selector: "generic-spinner", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span class=\"spinner size-{{ size() }}\" role=\"status\" [attr.aria-label]=\"label()\"></span>\n", styles: [":host{display:inline-flex}.spinner{display:inline-block;border-style:solid;border-color:var(--accent-secondary-fill);border-top-color:transparent;border-radius:50%;animation:generic-spin .7s linear infinite}.size-sm{width:16px;height:16px;border-width:2px}.size-md{width:32px;height:32px;border-width:4px}.size-lg{width:48px;height:48px;border-width:4px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'generic-spinner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"spinner size-{{ size() }}\" role=\"status\" [attr.aria-label]=\"label()\"></span>\n", styles: [":host{display:inline-flex}.spinner{display:inline-block;border-style:solid;border-color:var(--accent-secondary-fill);border-top-color:transparent;border-radius:50%;animation:generic-spin .7s linear infinite}.size-sm{width:16px;height:16px;border-width:2px}.size-md{width:32px;height:32px;border-width:4px}.size-lg{width:48px;height:48px;border-width:4px}\n"] }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

class GenericSwitch {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    checked = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    toggle() {
        if (this.disabled())
            return;
        this.checked.set(!this.checked());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSwitch, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericSwitch, isStandalone: true, selector: "generic-switch", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checked: "checkedChange" }, ngImport: i0, template: "<label class=\"row\" [class.disabled]=\"disabled()\">\n  <button\n    type=\"button\"\n    class=\"track\"\n    role=\"switch\"\n    [attr.aria-checked]=\"checked()\"\n    [disabled]=\"disabled()\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"knob\"></span>\n  </button>\n  @if (label()) {\n  <span class=\"label\">{{ label() }}</span>\n  }\n</label>\n", styles: [":host{display:inline-flex}.row{display:inline-flex;align-items:center;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.track{width:42px;height:22px;padding:0;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface-alt);position:relative;cursor:inherit}.track[aria-checked=true]{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill)}.knob{position:absolute;top:2px;left:2px;width:14px;height:14px;background:var(--text-primary);transition:left .12s ease}.track[aria-checked=true] .knob{left:22px;background:#020617}.label{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSwitch, decorators: [{
            type: Component,
            args: [{ selector: 'generic-switch', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label class=\"row\" [class.disabled]=\"disabled()\">\n  <button\n    type=\"button\"\n    class=\"track\"\n    role=\"switch\"\n    [attr.aria-checked]=\"checked()\"\n    [disabled]=\"disabled()\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"knob\"></span>\n  </button>\n  @if (label()) {\n  <span class=\"label\">{{ label() }}</span>\n  }\n</label>\n", styles: [":host{display:inline-flex}.row{display:inline-flex;align-items:center;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.track{width:42px;height:22px;padding:0;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface-alt);position:relative;cursor:inherit}.track[aria-checked=true]{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill)}.knob{position:absolute;top:2px;left:2px;width:14px;height:14px;background:var(--text-primary);transition:left .12s ease}.track[aria-checked=true] .knob{left:22px;background:#020617}.label{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], checked: [{ type: i0.Input, args: [{ isSignal: true, alias: "checked", required: false }] }, { type: i0.Output, args: ["checkedChange"] }] } });

const PALETTE = [
    'var(--accent-secondary-fill)',
    'var(--accent-primary-fill)',
    'var(--accent-gold-fill)',
    'var(--accent-success-fill)',
    'var(--accent-danger-fill)',
    'var(--text-muted)',
];
class GenericChart {
    type = input('bar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    data = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
    caption = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "caption" }] : /* istanbul ignore next */ []));
    height = input(180, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    max = computed(() => Math.max(1, ...this.data().map(d => d.value)), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    bars = computed(() => {
        const max = this.max();
        return this.data().map((point, i) => ({
            ...point,
            color: point.color ?? PALETTE[i % PALETTE.length],
            h: (point.value / max) * 100,
        }));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "bars" }] : /* istanbul ignore next */ []));
    linePoints = computed(() => {
        const items = this.data();
        if (!items.length)
            return '';
        const max = this.max();
        return items
            .map((point, i) => {
            const x = items.length === 1 ? 50 : (i / (items.length - 1)) * 100;
            const y = 100 - (point.value / max) * 100;
            return `${x},${y}`;
        })
            .join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "linePoints" }] : /* istanbul ignore next */ []));
    donut = computed(() => {
        const total = this.data().reduce((sum, point) => sum + point.value, 0) || 1;
        let offset = 0;
        return this.data().map((point, i) => {
            const frac = point.value / total;
            const dash = frac * 100;
            const item = {
                ...point,
                color: point.color ?? PALETTE[i % PALETTE.length],
                dash,
                offset,
                percent: Math.round(frac * 100),
            };
            offset += dash;
            return item;
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "donut" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericChart, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericChart, isStandalone: true, selector: "generic-chart", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, caption: { classPropertyName: "caption", publicName: "caption", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<figure class=\"chart\">\n  @if (caption()) {\n  <figcaption>{{ caption() }}</figcaption>\n  } @if (type() === 'bar') {\n  <div class=\"bars\" [style.height.px]=\"height()\">\n    @for (bar of bars(); track bar.label) {\n    <div class=\"col\">\n      <div\n        class=\"bar\"\n        [style.height.%]=\"bar.h\"\n        [style.background]=\"bar.color\"\n        [title]=\"bar.label + ': ' + bar.value\"\n      ></div>\n      <span>{{ bar.label }}</span>\n    </div>\n    }\n  </div>\n  } @if (type() === 'line') {\n  <svg\n    class=\"line\"\n    viewBox=\"0 0 100 100\"\n    preserveAspectRatio=\"none\"\n    [style.height.px]=\"height()\"\n    role=\"img\"\n  >\n    <polyline\n      [attr.points]=\"linePoints()\"\n      fill=\"none\"\n      stroke=\"var(--accent-secondary)\"\n      stroke-width=\"2\"\n      vector-effect=\"non-scaling-stroke\"\n    />\n  </svg>\n  <div class=\"labels\">\n    @for (point of data(); track point.label) {\n    <span>{{ point.label }}</span>\n    }\n  </div>\n  } @if (type() === 'donut') {\n  <div class=\"donut-wrap\">\n    <svg viewBox=\"0 0 36 36\" class=\"donut\" role=\"img\">\n      @for (slice of donut(); track slice.label) {\n      <circle\n        cx=\"18\"\n        cy=\"18\"\n        r=\"15.915\"\n        fill=\"transparent\"\n        [attr.stroke]=\"slice.color\"\n        stroke-width=\"4\"\n        [attr.stroke-dasharray]=\"slice.dash + ' ' + (100 - slice.dash)\"\n        [attr.stroke-dashoffset]=\"25 - slice.offset\"\n      />\n      }\n    </svg>\n    <ul>\n      @for (slice of donut(); track slice.label) {\n      <li><i [style.background]=\"slice.color\"></i>{{ slice.label }} {{ slice.percent }}%</li>\n      }\n    </ul>\n  </div>\n  }\n</figure>\n", styles: [":host{display:block}.chart{margin:0}figcaption{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;text-transform:none;letter-spacing:0;color:var(--accent-secondary);margin-bottom:.75rem}.bars{display:flex;align-items:stretch;gap:.5rem}.col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:.35rem}.bar{width:100%;min-height:4px;border:1px solid color-mix(in srgb,black 25%,transparent)}.col span,.labels span{font-family:var(--font-arcade);font-size:.85rem;color:var(--text-muted)}.line{width:100%;background:color-mix(in srgb,var(--bg-app) 70%,transparent);border:2px solid var(--border-subtle)}.labels{display:flex;justify-content:space-between;margin-top:.35rem}.donut-wrap{display:flex;align-items:center;gap:1rem}.donut{width:140px;height:140px;transform:rotate(-90deg)}.donut-wrap ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.35rem;font-family:var(--font-arcade)}.donut-wrap li{display:flex;align-items:center;gap:.4rem}.donut-wrap i{width:10px;height:10px;display:inline-block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericChart, decorators: [{
            type: Component,
            args: [{ selector: 'generic-chart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<figure class=\"chart\">\n  @if (caption()) {\n  <figcaption>{{ caption() }}</figcaption>\n  } @if (type() === 'bar') {\n  <div class=\"bars\" [style.height.px]=\"height()\">\n    @for (bar of bars(); track bar.label) {\n    <div class=\"col\">\n      <div\n        class=\"bar\"\n        [style.height.%]=\"bar.h\"\n        [style.background]=\"bar.color\"\n        [title]=\"bar.label + ': ' + bar.value\"\n      ></div>\n      <span>{{ bar.label }}</span>\n    </div>\n    }\n  </div>\n  } @if (type() === 'line') {\n  <svg\n    class=\"line\"\n    viewBox=\"0 0 100 100\"\n    preserveAspectRatio=\"none\"\n    [style.height.px]=\"height()\"\n    role=\"img\"\n  >\n    <polyline\n      [attr.points]=\"linePoints()\"\n      fill=\"none\"\n      stroke=\"var(--accent-secondary)\"\n      stroke-width=\"2\"\n      vector-effect=\"non-scaling-stroke\"\n    />\n  </svg>\n  <div class=\"labels\">\n    @for (point of data(); track point.label) {\n    <span>{{ point.label }}</span>\n    }\n  </div>\n  } @if (type() === 'donut') {\n  <div class=\"donut-wrap\">\n    <svg viewBox=\"0 0 36 36\" class=\"donut\" role=\"img\">\n      @for (slice of donut(); track slice.label) {\n      <circle\n        cx=\"18\"\n        cy=\"18\"\n        r=\"15.915\"\n        fill=\"transparent\"\n        [attr.stroke]=\"slice.color\"\n        stroke-width=\"4\"\n        [attr.stroke-dasharray]=\"slice.dash + ' ' + (100 - slice.dash)\"\n        [attr.stroke-dashoffset]=\"25 - slice.offset\"\n      />\n      }\n    </svg>\n    <ul>\n      @for (slice of donut(); track slice.label) {\n      <li><i [style.background]=\"slice.color\"></i>{{ slice.label }} {{ slice.percent }}%</li>\n      }\n    </ul>\n  </div>\n  }\n</figure>\n", styles: [":host{display:block}.chart{margin:0}figcaption{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;text-transform:none;letter-spacing:0;color:var(--accent-secondary);margin-bottom:.75rem}.bars{display:flex;align-items:stretch;gap:.5rem}.col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:.35rem}.bar{width:100%;min-height:4px;border:1px solid color-mix(in srgb,black 25%,transparent)}.col span,.labels span{font-family:var(--font-arcade);font-size:.85rem;color:var(--text-muted)}.line{width:100%;background:color-mix(in srgb,var(--bg-app) 70%,transparent);border:2px solid var(--border-subtle)}.labels{display:flex;justify-content:space-between;margin-top:.35rem}.donut-wrap{display:flex;align-items:center;gap:1rem}.donut{width:140px;height:140px;transform:rotate(-90deg)}.donut-wrap ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.35rem;font-family:var(--font-arcade)}.donut-wrap li{display:flex;align-items:center;gap:.4rem}.donut-wrap i{width:10px;height:10px;display:inline-block}\n"] }]
        }], propDecorators: { type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], caption: [{ type: i0.Input, args: [{ isSignal: true, alias: "caption", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }] } });

class GenericStat {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    value = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    hint = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    icon = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStat, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericStat, isStandalone: true, selector: "generic-stat", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, hint: { classPropertyName: "hint", publicName: "hint", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"stat tone-{{ tone() }}\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n  <div class=\"top\">\n    <span class=\"label\">{{ label() }}</span>\n    @if (icon(); as iconName) {\n    <generic-icon [name]=\"iconName\" [size]=\"18\" />\n    }\n  </div>\n  <strong>{{ value() }}</strong>\n  @if (hint()) {\n  <small>{{ hint() }}</small>\n  }\n</div>\n", styles: [":host{display:block}.stat{position:relative;padding:1rem;background:color-mix(in srgb,var(--bg-surface) 90%,transparent);border:2px solid var(--border-subtle);display:flex;flex-direction:column;gap:.35rem}.tone-cyan{border-color:color-mix(in srgb,var(--accent-secondary) 70%,transparent)}.tone-magenta{border-color:color-mix(in srgb,var(--accent-primary) 70%,transparent)}.tone-gold{border-color:color-mix(in srgb,var(--accent-gold) 70%,transparent)}.tone-green{border-color:color-mix(in srgb,var(--accent-success) 70%,transparent)}.tone-red{border-color:color-mix(in srgb,var(--accent-danger) 70%,transparent)}.tone-neutral{border-color:var(--border-subtle)}.top{display:flex;justify-content:space-between;align-items:center}.label,small{font-family:var(--font-arcade);font-size:.8rem;font-weight:700;text-transform:none;letter-spacing:0;color:var(--text-muted)}strong{font-family:var(--font-arcade);font-size:2rem;font-weight:400;color:var(--text-primary)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStat, decorators: [{
            type: Component,
            args: [{ selector: 'generic-stat', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"stat tone-{{ tone() }}\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n  <div class=\"top\">\n    <span class=\"label\">{{ label() }}</span>\n    @if (icon(); as iconName) {\n    <generic-icon [name]=\"iconName\" [size]=\"18\" />\n    }\n  </div>\n  <strong>{{ value() }}</strong>\n  @if (hint()) {\n  <small>{{ hint() }}</small>\n  }\n</div>\n", styles: [":host{display:block}.stat{position:relative;padding:1rem;background:color-mix(in srgb,var(--bg-surface) 90%,transparent);border:2px solid var(--border-subtle);display:flex;flex-direction:column;gap:.35rem}.tone-cyan{border-color:color-mix(in srgb,var(--accent-secondary) 70%,transparent)}.tone-magenta{border-color:color-mix(in srgb,var(--accent-primary) 70%,transparent)}.tone-gold{border-color:color-mix(in srgb,var(--accent-gold) 70%,transparent)}.tone-green{border-color:color-mix(in srgb,var(--accent-success) 70%,transparent)}.tone-red{border-color:color-mix(in srgb,var(--accent-danger) 70%,transparent)}.tone-neutral{border-color:var(--border-subtle)}.top{display:flex;justify-content:space-between;align-items:center}.label,small{font-family:var(--font-arcade);font-size:.8rem;font-weight:700;text-transform:none;letter-spacing:0;color:var(--text-muted)}strong{font-family:var(--font-arcade);font-size:2rem;font-weight:400;color:var(--text-primary)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], hint: [{ type: i0.Input, args: [{ isSignal: true, alias: "hint", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }] } });

class GenericDashboard {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDashboard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: GenericDashboard, isStandalone: true, selector: "generic-dashboard", ngImport: i0, template: "<div class=\"kpis\">\n  <ng-content select=\"generic-stat\" />\n</div>\n<div class=\"charts\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:1rem}.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.85rem}.charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDashboard, decorators: [{
            type: Component,
            args: [{ selector: 'generic-dashboard', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"kpis\">\n  <ng-content select=\"generic-stat\" />\n</div>\n<div class=\"charts\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:1rem}.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.85rem}.charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}\n"] }]
        }] });

class GenericSurvey {
    title = input('Encuesta', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    questions = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "questions" }] : /* istanbul ignore next */ []));
    value = model({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    submitted = output();
    asList(id) {
        const current = this.value()[id];
        return Array.isArray(current) ? current : [];
    }
    asText(id) {
        const current = this.value()[id];
        return typeof current === 'string' ? current : '';
    }
    asNumber(id) {
        const current = this.value()[id];
        return typeof current === 'number' ? current : 0;
    }
    setSingle(id, optionId) {
        this.patch(id, optionId);
    }
    toggleMulti(id, optionId) {
        const list = this.asList(id);
        const next = list.includes(optionId)
            ? list.filter(item => item !== optionId)
            : [...list, optionId];
        this.patch(id, next);
    }
    setRating(id, score) {
        this.patch(id, score);
    }
    setText(id, text) {
        this.patch(id, text);
    }
    submit() {
        this.submitted.emit(this.value());
    }
    patch(id, next) {
        this.value.set({ ...this.value(), [id]: next });
    }
    stars(max) {
        return Array.from({ length: max }, (_, i) => i + 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSurvey, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericSurvey, isStandalone: true, selector: "generic-survey", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, questions: { classPropertyName: "questions", publicName: "questions", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", submitted: "submitted" }, ngImport: i0, template: "<form class=\"survey\" (submit)=\"$event.preventDefault(); submit()\">\n  <header>\n    <h2>{{ title() }}</h2>\n  </header>\n\n  @for (question of questions(); track question.id; let i = $index) {\n  <fieldset>\n    <legend>{{ i + 1 }}. {{ question.prompt }}</legend>\n\n    @if (question.type === 'single') { @for (option of question.options; track option.id) {\n    <label class=\"choice\" [class.on]=\"asText(question.id) === option.id\">\n      <input\n        type=\"radio\"\n        [name]=\"question.id\"\n        [checked]=\"asText(question.id) === option.id\"\n        (change)=\"setSingle(question.id, option.id)\"\n      />\n      {{ option.label }}\n    </label>\n    } } @if (question.type === 'multi') { @for (option of question.options; track option.id) {\n    <label class=\"choice\" [class.on]=\"asList(question.id).includes(option.id)\">\n      <input\n        type=\"checkbox\"\n        [checked]=\"asList(question.id).includes(option.id)\"\n        (change)=\"toggleMulti(question.id, option.id)\"\n      />\n      {{ option.label }}\n    </label>\n    } } @if (question.type === 'rating') {\n    <div class=\"stars\" role=\"radiogroup\">\n      @for (score of stars(question.max ?? 5); track score) {\n      <button\n        type=\"button\"\n        [class.on]=\"score <= asNumber(question.id)\"\n        (click)=\"setRating(question.id, score)\"\n      >\n        \u2605\n      </button>\n      }\n    </div>\n    } @if (question.type === 'text') {\n    <textarea\n      [value]=\"asText(question.id)\"\n      (input)=\"setText(question.id, $any($event.target).value)\"\n      rows=\"3\"\n    ></textarea>\n    }\n  </fieldset>\n  }\n\n  <button class=\"send\" type=\"submit\">Enviar</button>\n</form>\n", styles: [":host{display:block}.survey{display:flex;flex-direction:column;gap:1rem;border:2px solid var(--border-subtle);background:color-mix(in srgb,var(--bg-surface) 90%,transparent);padding:1.25rem}header h2{margin:0;font-family:var(--font-retro);font-size:1.15rem;color:var(--accent-secondary);letter-spacing:.03em}fieldset{border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:.45rem}legend{font-family:var(--font-arcade);font-size:1.05rem;color:var(--text-primary);margin-bottom:.35rem;padding:0}.choice{display:flex;align-items:center;gap:.55rem;padding:.55rem .7rem;border:2px solid var(--border-subtle);cursor:pointer;font-family:var(--font-arcade)}.choice.on{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 10%,transparent)}.choice input{accent-color:var(--accent-secondary)}.stars{display:flex;gap:.25rem}.stars button{background:none;border:0;font-size:1.6rem;color:var(--border-subtle);cursor:pointer}.stars button.on{color:var(--accent-gold)}textarea{width:100%;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .7rem;resize:vertical}textarea:focus{outline:none;border-color:var(--accent-secondary)}.send{align-self:flex-end;font-family:var(--font-arcade);font-size:.95rem;font-weight:700;text-transform:none;background:var(--accent-primary-fill);color:#020617;border:2px solid var(--accent-primary-fill);padding:.7rem 1.2rem;cursor:pointer;box-shadow:0 4px color-mix(in srgb,var(--accent-primary-fill) 65%,black)}.send:active{transform:translateY(4px);box-shadow:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSurvey, decorators: [{
            type: Component,
            args: [{ selector: 'generic-survey', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"survey\" (submit)=\"$event.preventDefault(); submit()\">\n  <header>\n    <h2>{{ title() }}</h2>\n  </header>\n\n  @for (question of questions(); track question.id; let i = $index) {\n  <fieldset>\n    <legend>{{ i + 1 }}. {{ question.prompt }}</legend>\n\n    @if (question.type === 'single') { @for (option of question.options; track option.id) {\n    <label class=\"choice\" [class.on]=\"asText(question.id) === option.id\">\n      <input\n        type=\"radio\"\n        [name]=\"question.id\"\n        [checked]=\"asText(question.id) === option.id\"\n        (change)=\"setSingle(question.id, option.id)\"\n      />\n      {{ option.label }}\n    </label>\n    } } @if (question.type === 'multi') { @for (option of question.options; track option.id) {\n    <label class=\"choice\" [class.on]=\"asList(question.id).includes(option.id)\">\n      <input\n        type=\"checkbox\"\n        [checked]=\"asList(question.id).includes(option.id)\"\n        (change)=\"toggleMulti(question.id, option.id)\"\n      />\n      {{ option.label }}\n    </label>\n    } } @if (question.type === 'rating') {\n    <div class=\"stars\" role=\"radiogroup\">\n      @for (score of stars(question.max ?? 5); track score) {\n      <button\n        type=\"button\"\n        [class.on]=\"score <= asNumber(question.id)\"\n        (click)=\"setRating(question.id, score)\"\n      >\n        \u2605\n      </button>\n      }\n    </div>\n    } @if (question.type === 'text') {\n    <textarea\n      [value]=\"asText(question.id)\"\n      (input)=\"setText(question.id, $any($event.target).value)\"\n      rows=\"3\"\n    ></textarea>\n    }\n  </fieldset>\n  }\n\n  <button class=\"send\" type=\"submit\">Enviar</button>\n</form>\n", styles: [":host{display:block}.survey{display:flex;flex-direction:column;gap:1rem;border:2px solid var(--border-subtle);background:color-mix(in srgb,var(--bg-surface) 90%,transparent);padding:1.25rem}header h2{margin:0;font-family:var(--font-retro);font-size:1.15rem;color:var(--accent-secondary);letter-spacing:.03em}fieldset{border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:.45rem}legend{font-family:var(--font-arcade);font-size:1.05rem;color:var(--text-primary);margin-bottom:.35rem;padding:0}.choice{display:flex;align-items:center;gap:.55rem;padding:.55rem .7rem;border:2px solid var(--border-subtle);cursor:pointer;font-family:var(--font-arcade)}.choice.on{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 10%,transparent)}.choice input{accent-color:var(--accent-secondary)}.stars{display:flex;gap:.25rem}.stars button{background:none;border:0;font-size:1.6rem;color:var(--border-subtle);cursor:pointer}.stars button.on{color:var(--accent-gold)}textarea{width:100%;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .7rem;resize:vertical}textarea:focus{outline:none;border-color:var(--accent-secondary)}.send{align-self:flex-end;font-family:var(--font-arcade);font-size:.95rem;font-weight:700;text-transform:none;background:var(--accent-primary-fill);color:#020617;border:2px solid var(--accent-primary-fill);padding:.7rem 1.2rem;cursor:pointer;box-shadow:0 4px color-mix(in srgb,var(--accent-primary-fill) 65%,black)}.send:active{transform:translateY(4px);box-shadow:none}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], questions: [{ type: i0.Input, args: [{ isSignal: true, alias: "questions", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], submitted: [{ type: i0.Output, args: ["submitted"] }] } });

class GenericCard {
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    padding = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "padding" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericCard, isStandalone: true, selector: "generic-card", inputs: { tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, padding: { classPropertyName: "padding", publicName: "padding", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"card tone-{{ tone() }} pad-{{ padding() }}\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n  <ng-content />\n</div>\n", styles: [":host{display:block}.card{position:relative;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px}.pad-none{padding:0}.pad-sm{padding:.75rem}.pad-md{padding:1.25rem}.tone-cyan{border-color:color-mix(in srgb,var(--accent-secondary) 60%,transparent)}.tone-magenta{border-color:color-mix(in srgb,var(--accent-primary) 60%,transparent)}.tone-gold{border-color:color-mix(in srgb,var(--accent-gold) 60%,transparent)}.tone-green{border-color:color-mix(in srgb,var(--accent-success) 60%,transparent)}.tone-red{border-color:color-mix(in srgb,var(--accent-danger) 60%,transparent)}.tone-neutral,.tone-default{border-color:var(--border-subtle)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCard, decorators: [{
            type: Component,
            args: [{ selector: 'generic-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"card tone-{{ tone() }} pad-{{ padding() }}\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n  <ng-content />\n</div>\n", styles: [":host{display:block}.card{position:relative;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px}.pad-none{padding:0}.pad-sm{padding:.75rem}.pad-md{padding:1.25rem}.tone-cyan{border-color:color-mix(in srgb,var(--accent-secondary) 60%,transparent)}.tone-magenta{border-color:color-mix(in srgb,var(--accent-primary) 60%,transparent)}.tone-gold{border-color:color-mix(in srgb,var(--accent-gold) 60%,transparent)}.tone-green{border-color:color-mix(in srgb,var(--accent-success) 60%,transparent)}.tone-red{border-color:color-mix(in srgb,var(--accent-danger) 60%,transparent)}.tone-neutral,.tone-default{border-color:var(--border-subtle)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}\n"] }]
        }], propDecorators: { tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], padding: [{ type: i0.Input, args: [{ isSignal: true, alias: "padding", required: false }] }] } });

class GenericInput {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    type = input('text', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    error = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericInput, isStandalone: true, selector: "generic-input", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <input\n    class=\"control\"\n    [class.has-error]=\"error()\"\n    [type]=\"type()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    [value]=\"value()\"\n    (input)=\"value.set($any($event.target).value)\"\n  />\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.control{width:100%;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .75rem;border-radius:2px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}.control:focus{border-color:var(--accent-secondary);box-shadow:0 0 0 1px var(--focus-glow)}.control.has-error{border-color:var(--accent-danger)}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericInput, decorators: [{
            type: Component,
            args: [{ selector: 'generic-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <input\n    class=\"control\"\n    [class.has-error]=\"error()\"\n    [type]=\"type()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    [value]=\"value()\"\n    (input)=\"value.set($any($event.target).value)\"\n  />\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.control{width:100%;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .75rem;border-radius:2px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}.control:focus{border-color:var(--accent-secondary);box-shadow:0 0 0 1px var(--focus-glow)}.control.has-error{border-color:var(--accent-danger)}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }] } });

class GenericSelect {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    error = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    options = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericSelect, isStandalone: true, selector: "generic-select", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <div class=\"wrap\">\n    <select\n      class=\"control\"\n      [class.has-error]=\"error()\"\n      [disabled]=\"disabled()\"\n      [value]=\"value()\"\n      (change)=\"value.set($any($event.target).value)\"\n    >\n      @if (placeholder()) {\n      <option value=\"\">{{ placeholder() }}</option>\n      } @for (option of options(); track option.value) {\n      <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <span class=\"chevron\" aria-hidden=\"true\"></span>\n  </div>\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.wrap{position:relative}.control{width:100%;appearance:none;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem 2.2rem .5rem .75rem;border-radius:2px;outline:none;cursor:pointer}.control:focus{border-color:var(--accent-secondary)}.control.has-error{border-color:var(--accent-danger)}.chevron{position:absolute;right:.8rem;top:50%;width:8px;height:8px;border-right:2px solid var(--text-muted);border-bottom:2px solid var(--text-muted);transform:translateY(-70%) rotate(45deg);pointer-events:none}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericSelect, decorators: [{
            type: Component,
            args: [{ selector: 'generic-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <div class=\"wrap\">\n    <select\n      class=\"control\"\n      [class.has-error]=\"error()\"\n      [disabled]=\"disabled()\"\n      [value]=\"value()\"\n      (change)=\"value.set($any($event.target).value)\"\n    >\n      @if (placeholder()) {\n      <option value=\"\">{{ placeholder() }}</option>\n      } @for (option of options(); track option.value) {\n      <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <span class=\"chevron\" aria-hidden=\"true\"></span>\n  </div>\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.wrap{position:relative}.control{width:100%;appearance:none;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem 2.2rem .5rem .75rem;border-radius:2px;outline:none;cursor:pointer}.control:focus{border-color:var(--accent-secondary)}.control.has-error{border-color:var(--accent-danger)}.chevron{position:absolute;right:.8rem;top:50%;width:8px;height:8px;border-right:2px solid var(--text-muted);border-bottom:2px solid var(--text-muted);transform:translateY(-70%) rotate(45deg);pointer-events:none}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }] } });

class GenericCheckbox {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    description = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
    error = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    checked = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    toggle() {
        if (this.disabled())
            return;
        this.checked.set(!this.checked());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCheckbox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericCheckbox, isStandalone: true, selector: "generic-checkbox", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checked: "checkedChange" }, ngImport: i0, template: "<div class=\"field\">\n  <label class=\"row\" [class.disabled]=\"disabled()\">\n    <span class=\"box\" [class.on]=\"checked()\">\n      <input type=\"checkbox\" [checked]=\"checked()\" [disabled]=\"disabled()\" (change)=\"toggle()\" />\n      <span class=\"tick\" aria-hidden=\"true\"></span>\n    </span>\n    <span class=\"copy\">\n      <span class=\"name\">{{ label() }}</span>\n      @if (description()) {\n      <span class=\"hint\">{{ description() }}</span>\n      }\n    </span>\n  </label>\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block}.field{display:flex;flex-direction:column;gap:.25rem;text-align:left}.row{display:flex;align-items:flex-start;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:2px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:2px;cursor:inherit}.box.on input{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill)}.tick{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .tick{opacity:1}.tick:before{content:\"\";position:absolute;left:5px;top:1px;width:6px;height:11px;border-right:2px solid #020617;border-bottom:2px solid #020617;transform:rotate(40deg)}.copy{display:flex;flex-direction:column;gap:.1rem}.name{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.hint,.error{font-family:var(--font-arcade);font-size:.85rem}.hint{color:var(--text-muted)}.error{color:var(--accent-danger);margin-left:1.75rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCheckbox, decorators: [{
            type: Component,
            args: [{ selector: 'generic-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"field\">\n  <label class=\"row\" [class.disabled]=\"disabled()\">\n    <span class=\"box\" [class.on]=\"checked()\">\n      <input type=\"checkbox\" [checked]=\"checked()\" [disabled]=\"disabled()\" (change)=\"toggle()\" />\n      <span class=\"tick\" aria-hidden=\"true\"></span>\n    </span>\n    <span class=\"copy\">\n      <span class=\"name\">{{ label() }}</span>\n      @if (description()) {\n      <span class=\"hint\">{{ description() }}</span>\n      }\n    </span>\n  </label>\n  @if (error()) {\n  <span class=\"error\">{{ error() }}</span>\n  }\n</div>\n", styles: [":host{display:block}.field{display:flex;flex-direction:column;gap:.25rem;text-align:left}.row{display:flex;align-items:flex-start;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:2px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:2px;cursor:inherit}.box.on input{background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill)}.tick{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .tick{opacity:1}.tick:before{content:\"\";position:absolute;left:5px;top:1px;width:6px;height:11px;border-right:2px solid #020617;border-bottom:2px solid #020617;transform:rotate(40deg)}.copy{display:flex;flex-direction:column;gap:.1rem}.name{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.hint,.error{font-family:var(--font-arcade);font-size:.85rem}.hint{color:var(--text-muted)}.error{color:var(--accent-danger);margin-left:1.75rem}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], checked: [{ type: i0.Input, args: [{ isSignal: true, alias: "checked", required: false }] }, { type: i0.Output, args: ["checkedChange"] }] } });

class GenericChat {
    name = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    messages = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "messages" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericChat, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericChat, isStandalone: true, selector: "generic-chat", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: false, transformFunction: null }, messages: { classPropertyName: "messages", publicName: "messages", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"frame tone-{{ tone() }}\" role=\"log\" [attr.aria-label]=\"'Chat con ' + name()\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n\n  <header class=\"head\">\n    <span class=\"dot\" aria-hidden=\"true\"></span>\n    <h2 class=\"name\">{{ name() }}</h2>\n  </header>\n\n  <div class=\"thread\">\n    @for (msg of messages(); track msg.id ?? $index) {\n    <p class=\"bubble from-{{ msg.from === 'me' ? 'me' : 'them' }}\">{{ msg.text }}</p>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;width:100%;max-width:28rem}.frame{position:relative;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:4px;overflow:hidden}.tone-cyan{border-color:var(--accent-secondary)}.tone-magenta{border-color:var(--accent-primary)}.tone-gold{border-color:var(--accent-gold)}.tone-green{border-color:var(--accent-success)}.tone-red{border-color:var(--accent-danger)}.tone-neutral{border-color:var(--border-subtle)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle);z-index:1}.tone-cyan .pixel{background:var(--accent-secondary)}.tone-magenta .pixel{background:var(--accent-primary)}.tone-gold .pixel{background:var(--accent-gold)}.tone-green .pixel{background:var(--accent-success)}.tone-red .pixel{background:var(--accent-danger)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.head{display:flex;align-items:center;gap:.55rem;padding:.7rem .9rem;border-bottom:2px solid var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 80%,transparent)}.dot{width:8px;height:8px;border-radius:50%;background:var(--accent-success-fill);flex-shrink:0}.name{margin:0;font-family:var(--font-retro);font-size:.85rem;font-weight:400;color:var(--text-primary)}.thread{display:flex;flex-direction:column;gap:.55rem;padding:.85rem .9rem 1rem;min-height:8rem}.bubble{margin:0;max-width:80%;padding:.55rem .75rem;font-family:var(--font-arcade);font-size:.95rem;line-height:1.35;border:2px solid;border-radius:4px 4px 4px 0}.from-them{align-self:flex-start;background:color-mix(in srgb,var(--bg-surface-alt) 90%,transparent);border-color:var(--border-subtle);color:var(--text-primary)}.from-me{align-self:flex-end;background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#020617;border-radius:4px 4px 0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericChat, decorators: [{
            type: Component,
            args: [{ selector: 'generic-chat', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"frame tone-{{ tone() }}\" role=\"log\" [attr.aria-label]=\"'Chat con ' + name()\">\n  <span class=\"pixel tl\"></span>\n  <span class=\"pixel tr\"></span>\n  <span class=\"pixel bl\"></span>\n  <span class=\"pixel br\"></span>\n\n  <header class=\"head\">\n    <span class=\"dot\" aria-hidden=\"true\"></span>\n    <h2 class=\"name\">{{ name() }}</h2>\n  </header>\n\n  <div class=\"thread\">\n    @for (msg of messages(); track msg.id ?? $index) {\n    <p class=\"bubble from-{{ msg.from === 'me' ? 'me' : 'them' }}\">{{ msg.text }}</p>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;width:100%;max-width:28rem}.frame{position:relative;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:4px;overflow:hidden}.tone-cyan{border-color:var(--accent-secondary)}.tone-magenta{border-color:var(--accent-primary)}.tone-gold{border-color:var(--accent-gold)}.tone-green{border-color:var(--accent-success)}.tone-red{border-color:var(--accent-danger)}.tone-neutral{border-color:var(--border-subtle)}.pixel{position:absolute;width:6px;height:6px;background:var(--border-subtle);z-index:1}.tone-cyan .pixel{background:var(--accent-secondary)}.tone-magenta .pixel{background:var(--accent-primary)}.tone-gold .pixel{background:var(--accent-gold)}.tone-green .pixel{background:var(--accent-success)}.tone-red .pixel{background:var(--accent-danger)}.tl{top:-3px;left:-3px}.tr{top:-3px;right:-3px}.bl{bottom:-3px;left:-3px}.br{bottom:-3px;right:-3px}.head{display:flex;align-items:center;gap:.55rem;padding:.7rem .9rem;border-bottom:2px solid var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 80%,transparent)}.dot{width:8px;height:8px;border-radius:50%;background:var(--accent-success-fill);flex-shrink:0}.name{margin:0;font-family:var(--font-retro);font-size:.85rem;font-weight:400;color:var(--text-primary)}.thread{display:flex;flex-direction:column;gap:.55rem;padding:.85rem .9rem 1rem;min-height:8rem}.bubble{margin:0;max-width:80%;padding:.55rem .75rem;font-family:var(--font-arcade);font-size:.95rem;line-height:1.35;border:2px solid;border-radius:4px 4px 4px 0}.from-them{align-self:flex-start;background:color-mix(in srgb,var(--bg-surface-alt) 90%,transparent);border-color:var(--border-subtle);color:var(--text-primary)}.from-me{align-self:flex-end;background:var(--accent-secondary-fill);border-color:var(--accent-secondary-fill);color:#020617;border-radius:4px 4px 0}\n"] }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: false }] }], messages: [{ type: i0.Input, args: [{ isSignal: true, alias: "messages", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }] } });

class GenericTextarea {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    error = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    showCount = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showCount" }] : /* istanbul ignore next */ []));
    maxLength = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    rows = input(4, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    used = computed(() => this.value().length, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "used" }] : /* istanbul ignore next */ []));
    displayCount = computed(() => this.showCount() && this.maxLength() !== undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "displayCount" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTextarea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericTextarea, isStandalone: true, selector: "generic-textarea", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, showCount: { classPropertyName: "showCount", publicName: "showCount", isSignal: true, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <textarea\n    class=\"control\"\n    [class.has-error]=\"error()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    [rows]=\"rows()\"\n    [attr.maxlength]=\"maxLength() ?? null\"\n    [attr.aria-invalid]=\"error() ? true : null\"\n    [value]=\"value()\"\n    (input)=\"value.set($any($event.target).value)\"\n  ></textarea>\n  <div class=\"meta\">\n    @if (error()) {\n    <span class=\"error\">{{ error() }}</span>\n    } @if (displayCount()) {\n    <span class=\"count\">{{ used() }}/{{ maxLength() }}</span>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.control{width:100%;resize:vertical;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .75rem;border-radius:2px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}.control:focus{border-color:var(--accent-secondary);box-shadow:0 0 0 1px var(--focus-glow)}.control.has-error{border-color:var(--accent-danger)}.control:disabled{opacity:.5;cursor:not-allowed}.meta{display:flex;align-items:center;justify-content:space-between;gap:.5rem}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}.count{margin-left:auto;color:var(--text-muted);font-family:var(--font-arcade);font-size:.75rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTextarea, decorators: [{
            type: Component,
            args: [{ selector: 'generic-textarea', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"field\">\n  @if (label()) {\n  <label class=\"label\">{{ label() }}</label>\n  }\n  <textarea\n    class=\"control\"\n    [class.has-error]=\"error()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    [rows]=\"rows()\"\n    [attr.maxlength]=\"maxLength() ?? null\"\n    [attr.aria-invalid]=\"error() ? true : null\"\n    [value]=\"value()\"\n    (input)=\"value.set($any($event.target).value)\"\n  ></textarea>\n  <div class=\"meta\">\n    @if (error()) {\n    <span class=\"error\">{{ error() }}</span>\n    } @if (displayCount()) {\n    <span class=\"count\">{{ used() }}/{{ maxLength() }}</span>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:.4rem;text-align:left}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0}.control{width:100%;resize:vertical;background:color-mix(in srgb,var(--bg-app) 80%,transparent);border:2px solid var(--border-subtle);color:var(--accent-secondary);font-family:var(--font-arcade);font-size:1rem;padding:.5rem .75rem;border-radius:2px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}.control:focus{border-color:var(--accent-secondary);box-shadow:0 0 0 1px var(--focus-glow)}.control.has-error{border-color:var(--accent-danger)}.control:disabled{opacity:.5;cursor:not-allowed}.meta{display:flex;align-items:center;justify-content:space-between;gap:.5rem}.error{color:var(--accent-danger);font-family:var(--font-arcade);font-size:.85rem}.count{margin-left:auto;color:var(--text-muted);font-family:var(--font-arcade);font-size:.75rem}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], showCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "showCount", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], rows: [{ type: i0.Input, args: [{ isSignal: true, alias: "rows", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }] } });

class GenericRadioGroup {
    name = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    options = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    error = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    value = model(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "value" }] : /* istanbul ignore next */ []));
    optionId(option) {
        return `${this.name()}-${option.value}`;
    }
    select(option) {
        if (option.disabled)
            return;
        this.value.set(option.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericRadioGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericRadioGroup, isStandalone: true, selector: "generic-radio-group", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<fieldset class=\"group\">\n  @if (label()) {\n  <legend class=\"label\">{{ label() }}</legend>\n  } @for (option of options(); track option.value) {\n  <label class=\"row\" [class.disabled]=\"option.disabled\">\n    <span class=\"box\" [class.on]=\"value() === option.value\">\n      <input\n        type=\"radio\"\n        [id]=\"optionId(option)\"\n        [name]=\"name()\"\n        [value]=\"option.value\"\n        [checked]=\"value() === option.value\"\n        [disabled]=\"option.disabled\"\n        (change)=\"select(option)\"\n      />\n      <span class=\"dot\" aria-hidden=\"true\"></span>\n    </span>\n    <span class=\"copy\">\n      <span class=\"name\">{{ option.label }}</span>\n      @if (option.description) {\n      <span class=\"hint\">{{ option.description }}</span>\n      }\n    </span>\n  </label>\n  }\n</fieldset>\n\n@if (error()) {\n<span class=\"error\">{{ error() }}</span>\n}\n", styles: [":host{display:block;text-align:left}.group{display:flex;flex-direction:column;gap:.6rem;border:none;padding:0;margin:0}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0;padding:0;margin-bottom:.2rem}.row{display:flex;align-items:flex-start;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:2px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:50%;cursor:inherit}.box.on input{border-color:var(--accent-secondary-fill)}.dot{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .dot{opacity:1}.dot:before{content:\"\";position:absolute;left:4px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--accent-secondary-fill)}.copy{display:flex;flex-direction:column;gap:.1rem}.name{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.hint,.error{font-family:var(--font-arcade);font-size:.85rem}.hint{color:var(--text-muted)}.error{color:var(--accent-danger);display:block;margin-top:.4rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericRadioGroup, decorators: [{
            type: Component,
            args: [{ selector: 'generic-radio-group', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset class=\"group\">\n  @if (label()) {\n  <legend class=\"label\">{{ label() }}</legend>\n  } @for (option of options(); track option.value) {\n  <label class=\"row\" [class.disabled]=\"option.disabled\">\n    <span class=\"box\" [class.on]=\"value() === option.value\">\n      <input\n        type=\"radio\"\n        [id]=\"optionId(option)\"\n        [name]=\"name()\"\n        [value]=\"option.value\"\n        [checked]=\"value() === option.value\"\n        [disabled]=\"option.disabled\"\n        (change)=\"select(option)\"\n      />\n      <span class=\"dot\" aria-hidden=\"true\"></span>\n    </span>\n    <span class=\"copy\">\n      <span class=\"name\">{{ option.label }}</span>\n      @if (option.description) {\n      <span class=\"hint\">{{ option.description }}</span>\n      }\n    </span>\n  </label>\n  }\n</fieldset>\n\n@if (error()) {\n<span class=\"error\">{{ error() }}</span>\n}\n", styles: [":host{display:block;text-align:left}.group{display:flex;flex-direction:column;gap:.6rem;border:none;padding:0;margin:0}.label{font-family:var(--font-arcade);font-size:.85rem;font-weight:700;color:var(--accent-secondary);letter-spacing:0;padding:0;margin-bottom:.2rem}.row{display:flex;align-items:flex-start;gap:.65rem;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:2px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:50%;cursor:inherit}.box.on input{border-color:var(--accent-secondary-fill)}.dot{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .dot{opacity:1}.dot:before{content:\"\";position:absolute;left:4px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--accent-secondary-fill)}.copy{display:flex;flex-direction:column;gap:.1rem}.name{font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}.hint,.error{font-family:var(--font-arcade);font-size:.85rem}.hint{color:var(--text-muted)}.error{color:var(--accent-danger);display:block;margin-top:.4rem}\n"] }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }] } });

class GenericAvatar {
    src = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []));
    name = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    level = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []));
    ring = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ring" }] : /* istanbul ignore next */ []));
    initials = computed(() => this.getInitials(this.name()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "initials" }] : /* istanbul ignore next */ []));
    getInitials(name) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericAvatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericAvatar, isStandalone: true, selector: "generic-avatar", inputs: { src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, ring: { classPropertyName: "ring", publicName: "ring", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span class=\"avatar size-{{ size() }} ring-{{ ring() }}\">\n  @if (src()) {\n  <img class=\"img\" [src]=\"src()\" [alt]=\"name()\" />\n  } @else {\n  <span class=\"initials\" [attr.aria-label]=\"name()\">{{ initials() }}</span>\n  } @if (level() !== undefined) {\n  <span class=\"level\">{{ level() }}</span>\n  }\n</span>\n", styles: [":host{display:inline-flex}.avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:50%;background:var(--bg-surface-alt);border:2px solid var(--border-subtle);overflow:visible}.img{width:100%;height:100%;border-radius:50%;object-fit:cover}.initials{font-family:var(--font-arcade);font-weight:700;color:var(--text-primary)}.size-xs{width:24px;height:24px}.size-xs .initials{font-size:.6rem}.size-sm{width:32px;height:32px}.size-sm .initials{font-size:.7rem}.size-md{width:44px;height:44px}.size-md .initials{font-size:.9rem}.size-lg{width:60px;height:60px}.size-lg .initials{font-size:1.15rem}.size-xl{width:80px;height:80px}.size-xl .initials{font-size:1.5rem}.ring-cyan{border-color:var(--accent-secondary);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-secondary) 35%,transparent)}.ring-magenta{border-color:var(--accent-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-primary) 35%,transparent)}.ring-gold{border-color:var(--accent-gold);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-gold) 35%,transparent)}.ring-green{border-color:var(--accent-success);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-success) 35%,transparent)}.ring-red{border-color:var(--accent-danger);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-danger) 35%,transparent)}.ring-neutral{border-color:var(--border-subtle);box-shadow:0 0 0 2px color-mix(in srgb,var(--border-subtle) 35%,transparent)}.ring-none{border-color:transparent;box-shadow:none}.level{position:absolute;right:-4px;bottom:-4px;min-width:16px;height:16px;padding:0 3px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:var(--accent-gold-fill);color:#1a1408;font-family:var(--font-arcade);font-size:.6rem;font-weight:700;border:2px solid var(--bg-surface)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericAvatar, decorators: [{
            type: Component,
            args: [{ selector: 'generic-avatar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"avatar size-{{ size() }} ring-{{ ring() }}\">\n  @if (src()) {\n  <img class=\"img\" [src]=\"src()\" [alt]=\"name()\" />\n  } @else {\n  <span class=\"initials\" [attr.aria-label]=\"name()\">{{ initials() }}</span>\n  } @if (level() !== undefined) {\n  <span class=\"level\">{{ level() }}</span>\n  }\n</span>\n", styles: [":host{display:inline-flex}.avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:50%;background:var(--bg-surface-alt);border:2px solid var(--border-subtle);overflow:visible}.img{width:100%;height:100%;border-radius:50%;object-fit:cover}.initials{font-family:var(--font-arcade);font-weight:700;color:var(--text-primary)}.size-xs{width:24px;height:24px}.size-xs .initials{font-size:.6rem}.size-sm{width:32px;height:32px}.size-sm .initials{font-size:.7rem}.size-md{width:44px;height:44px}.size-md .initials{font-size:.9rem}.size-lg{width:60px;height:60px}.size-lg .initials{font-size:1.15rem}.size-xl{width:80px;height:80px}.size-xl .initials{font-size:1.5rem}.ring-cyan{border-color:var(--accent-secondary);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-secondary) 35%,transparent)}.ring-magenta{border-color:var(--accent-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-primary) 35%,transparent)}.ring-gold{border-color:var(--accent-gold);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-gold) 35%,transparent)}.ring-green{border-color:var(--accent-success);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-success) 35%,transparent)}.ring-red{border-color:var(--accent-danger);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent-danger) 35%,transparent)}.ring-neutral{border-color:var(--border-subtle);box-shadow:0 0 0 2px color-mix(in srgb,var(--border-subtle) 35%,transparent)}.ring-none{border-color:transparent;box-shadow:none}.level{position:absolute;right:-4px;bottom:-4px;min-width:16px;height:16px;padding:0 3px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:var(--accent-gold-fill);color:#1a1408;font-family:var(--font-arcade);font-size:.6rem;font-weight:700;border:2px solid var(--bg-surface)}\n"] }]
        }], propDecorators: { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: false }] }], name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: false }] }], ring: [{ type: i0.Input, args: [{ isSignal: true, alias: "ring", required: false }] }] } });

class GenericEmptyState {
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    description = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericEmptyState, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericEmptyState, isStandalone: true, selector: "generic-empty-state", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"empty\">\n  <div class=\"icon\">\n    <ng-content select=\"[icon]\" />\n  </div>\n  <p class=\"title\">{{ title() }}</p>\n  @if (description()) {\n  <p class=\"description\">{{ description() }}</p>\n  }\n  <div class=\"action\">\n    <ng-content select=\"[action]\" />\n  </div>\n</div>\n", styles: [":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:.5rem;padding:2.5rem 1.5rem}.icon{color:var(--text-muted);font-size:2rem;line-height:1}.icon:empty{display:none}.title{font-family:var(--font-arcade);font-size:1.05rem;font-weight:700;color:var(--text-primary);margin:0}.description{font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted);margin:0;max-width:32ch}.action{margin-top:.5rem}.action:empty{display:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericEmptyState, decorators: [{
            type: Component,
            args: [{ selector: 'generic-empty-state', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"empty\">\n  <div class=\"icon\">\n    <ng-content select=\"[icon]\" />\n  </div>\n  <p class=\"title\">{{ title() }}</p>\n  @if (description()) {\n  <p class=\"description\">{{ description() }}</p>\n  }\n  <div class=\"action\">\n    <ng-content select=\"[action]\" />\n  </div>\n</div>\n", styles: [":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:.5rem;padding:2.5rem 1.5rem}.icon{color:var(--text-muted);font-size:2rem;line-height:1}.icon:empty{display:none}.title{font-family:var(--font-arcade);font-size:1.05rem;font-weight:700;color:var(--text-primary);margin:0}.description{font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted);margin:0;max-width:32ch}.action{margin-top:.5rem}.action:empty{display:none}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }] } });

const DEFAULT_TITLES = {
    cyan: 'Nota',
    gold: 'Advertencia',
    green: 'Éxito',
    red: 'Error',
    neutral: 'Info',
};
const TONE_ICONS = {
    cyan: 'scroll',
    gold: 'fire',
    green: 'check',
    red: 'lock',
    neutral: 'chat',
};
class GenericCallout {
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    title = input(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    resolvedTitle = computed(() => this.title() ?? DEFAULT_TITLES[this.tone()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resolvedTitle" }] : /* istanbul ignore next */ []));
    icon = computed(() => TONE_ICONS[this.tone()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCallout, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericCallout, isStandalone: true, selector: "generic-callout", inputs: { tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"callout tone-{{ tone() }}\">\n  <div class=\"header\">\n    <generic-icon class=\"icon\" [name]=\"icon()\" [size]=\"18\" />\n    <p class=\"title\">{{ resolvedTitle() }}</p>\n  </div>\n  <div class=\"body\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:block}.callout{display:flex;flex-direction:column;gap:.35rem;border:1px solid var(--border-subtle);border-left:4px solid var(--border-subtle);border-radius:4px;padding:.85rem 1rem;background:color-mix(in srgb,var(--bg-surface) 90%,transparent);text-align:left}.header{display:flex;align-items:center;gap:.4rem}.icon{flex-shrink:0}.title{margin:0;font-family:var(--font-arcade);font-weight:700;font-size:.9rem}.body{margin:0;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-primary)}.tone-cyan{border-left-color:var(--accent-secondary)}.tone-cyan .title{color:var(--accent-secondary)}.tone-gold{border-left-color:var(--accent-gold)}.tone-gold .title{color:var(--accent-gold)}.tone-green{border-left-color:var(--accent-success)}.tone-green .title{color:var(--accent-success)}.tone-red{border-left-color:var(--accent-danger)}.tone-red .title{color:var(--accent-danger)}.tone-neutral{border-left-color:var(--border-subtle)}.tone-neutral .title{color:var(--text-muted)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCallout, decorators: [{
            type: Component,
            args: [{ selector: 'generic-callout', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"callout tone-{{ tone() }}\">\n  <div class=\"header\">\n    <generic-icon class=\"icon\" [name]=\"icon()\" [size]=\"18\" />\n    <p class=\"title\">{{ resolvedTitle() }}</p>\n  </div>\n  <div class=\"body\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:block}.callout{display:flex;flex-direction:column;gap:.35rem;border:1px solid var(--border-subtle);border-left:4px solid var(--border-subtle);border-radius:4px;padding:.85rem 1rem;background:color-mix(in srgb,var(--bg-surface) 90%,transparent);text-align:left}.header{display:flex;align-items:center;gap:.4rem}.icon{flex-shrink:0}.title{margin:0;font-family:var(--font-arcade);font-weight:700;font-size:.9rem}.body{margin:0;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-primary)}.tone-cyan{border-left-color:var(--accent-secondary)}.tone-cyan .title{color:var(--accent-secondary)}.tone-gold{border-left-color:var(--accent-gold)}.tone-gold .title{color:var(--accent-gold)}.tone-green{border-left-color:var(--accent-success)}.tone-green .title{color:var(--accent-success)}.tone-red{border-left-color:var(--accent-danger)}.tone-red .title{color:var(--accent-danger)}.tone-neutral{border-left-color:var(--border-subtle)}.tone-neutral .title{color:var(--text-muted)}\n"] }]
        }], propDecorators: { tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }] } });

class GenericMathBlock {
    expression = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "expression" }] : /* istanbul ignore next */ []));
    display = input('block', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "display" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericMathBlock, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericMathBlock, isStandalone: true, selector: "generic-math-block", inputs: { expression: { classPropertyName: "expression", publicName: "expression", isSignal: true, isRequired: true, transformFunction: null }, display: { classPropertyName: "display", publicName: "display", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (display() === 'inline') {\n<span class=\"math math-inline\">{{ expression() }}</span>\n} @else {\n<div class=\"math math-block\">{{ expression() }}</div>\n}\n", styles: [":host{display:inline}.math{font-family:var(--font-retro);color:var(--text-primary)}.math-inline{display:inline;padding:.05rem .3rem;background:color-mix(in srgb,var(--bg-surface-alt) 70%,transparent);border-radius:2px}.math-block{display:block;padding:.75rem 1rem;border-left:3px solid var(--accent-secondary);background:color-mix(in srgb,var(--bg-surface) 90%,transparent);overflow-x:auto;white-space:pre}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericMathBlock, decorators: [{
            type: Component,
            args: [{ selector: 'generic-math-block', changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (display() === 'inline') {\n<span class=\"math math-inline\">{{ expression() }}</span>\n} @else {\n<div class=\"math math-block\">{{ expression() }}</div>\n}\n", styles: [":host{display:inline}.math{font-family:var(--font-retro);color:var(--text-primary)}.math-inline{display:inline;padding:.05rem .3rem;background:color-mix(in srgb,var(--bg-surface-alt) 70%,transparent);border-radius:2px}.math-block{display:block;padding:.75rem 1rem;border-left:3px solid var(--accent-secondary);background:color-mix(in srgb,var(--bg-surface) 90%,transparent);overflow-x:auto;white-space:pre}\n"] }]
        }], propDecorators: { expression: [{ type: i0.Input, args: [{ isSignal: true, alias: "expression", required: true }] }], display: [{ type: i0.Input, args: [{ isSignal: true, alias: "display", required: false }] }] } });

class GenericTabs {
    tabs = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []));
    activeId = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeId" }] : /* istanbul ignore next */ []));
    tabChange = output();
    tabButtons = viewChildren('tabButton', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tabButtons" }] : /* istanbul ignore next */ []));
    /** The tab that should carry tabindex="0". Falls back to the first enabled
     * tab when activeId() doesn't match any enabled tab (e.g. default ''), so
     * the tablist is always reachable via Tab per the WAI-ARIA tabs pattern. */
    focusableTabId = computed(() => {
        const items = this.tabs();
        const active = this.activeId();
        if (items.some(tab => tab.id === active && !tab.disabled))
            return active;
        return items.find(tab => !tab.disabled)?.id ?? '';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focusableTabId" }] : /* istanbul ignore next */ []));
    select(tab) {
        if (tab.disabled)
            return;
        this.activeId.set(tab.id);
        this.tabChange.emit(tab);
    }
    onKeydown(event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
            return;
        const items = this.tabs();
        const enabled = items.filter(tab => !tab.disabled);
        if (enabled.length === 0)
            return;
        const currentIndex = enabled.findIndex(tab => tab.id === this.activeId());
        let nextIndex;
        if (currentIndex === -1) {
            // Nothing currently matches (default activeId === ''): start from the
            // first enabled tab instead of doing wraparound arithmetic on -1.
            nextIndex = 0;
        }
        else {
            const delta = event.key === 'ArrowRight' ? 1 : -1;
            nextIndex = (currentIndex + delta + enabled.length) % enabled.length;
        }
        const next = enabled[nextIndex];
        event.preventDefault();
        this.select(next);
        const button = this.tabButtons().find(ref => ref.nativeElement.dataset['tabId'] === next.id);
        button?.nativeElement.focus();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericTabs, isStandalone: true, selector: "generic-tabs", inputs: { tabs: { classPropertyName: "tabs", publicName: "tabs", isSignal: true, isRequired: false, transformFunction: null }, activeId: { classPropertyName: "activeId", publicName: "activeId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { activeId: "activeIdChange", tabChange: "tabChange" }, viewQueries: [{ propertyName: "tabButtons", predicate: ["tabButton"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"tablist\" role=\"tablist\" (keydown)=\"onKeydown($event)\">\n  @for (tab of tabs(); track tab.id) {\n  <button\n    #tabButton\n    type=\"button\"\n    class=\"tab\"\n    [class.active]=\"tab.id === activeId()\"\n    [class.disabled]=\"tab.disabled\"\n    [attr.data-tab-id]=\"tab.id\"\n    role=\"tab\"\n    [attr.aria-selected]=\"tab.id === activeId()\"\n    [attr.aria-disabled]=\"tab.disabled ? true : null\"\n    [tabindex]=\"tab.id === focusableTabId() ? 0 : -1\"\n    (click)=\"select(tab)\"\n  >\n    @if (tab.icon) {\n    <generic-icon [name]=\"tab.icon\" [size]=\"16\" />\n    } {{ tab.label }}\n  </button>\n  }\n</div>\n", styles: [":host{display:block}.tablist{display:flex;align-items:center;gap:.25rem;border-bottom:2px solid var(--border-subtle);overflow-x:auto}.tab{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;font-family:var(--font-arcade);font-size:.9rem;font-weight:700;color:var(--text-muted);cursor:pointer;white-space:nowrap;transition:color .15s ease,border-color .15s ease,background-color .15s ease}.tab:hover:not(.disabled):not(.active){color:var(--text-primary);background:color-mix(in srgb,var(--accent-secondary) 8%,transparent)}.tab.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary-fill)}.tab.disabled{opacity:.45;cursor:not-allowed;pointer-events:none}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTabs, decorators: [{
            type: Component,
            args: [{ selector: 'generic-tabs', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"tablist\" role=\"tablist\" (keydown)=\"onKeydown($event)\">\n  @for (tab of tabs(); track tab.id) {\n  <button\n    #tabButton\n    type=\"button\"\n    class=\"tab\"\n    [class.active]=\"tab.id === activeId()\"\n    [class.disabled]=\"tab.disabled\"\n    [attr.data-tab-id]=\"tab.id\"\n    role=\"tab\"\n    [attr.aria-selected]=\"tab.id === activeId()\"\n    [attr.aria-disabled]=\"tab.disabled ? true : null\"\n    [tabindex]=\"tab.id === focusableTabId() ? 0 : -1\"\n    (click)=\"select(tab)\"\n  >\n    @if (tab.icon) {\n    <generic-icon [name]=\"tab.icon\" [size]=\"16\" />\n    } {{ tab.label }}\n  </button>\n  }\n</div>\n", styles: [":host{display:block}.tablist{display:flex;align-items:center;gap:.25rem;border-bottom:2px solid var(--border-subtle);overflow-x:auto}.tab{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;font-family:var(--font-arcade);font-size:.9rem;font-weight:700;color:var(--text-muted);cursor:pointer;white-space:nowrap;transition:color .15s ease,border-color .15s ease,background-color .15s ease}.tab:hover:not(.disabled):not(.active){color:var(--text-primary);background:color-mix(in srgb,var(--accent-secondary) 8%,transparent)}.tab.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary-fill)}.tab.disabled{opacity:.45;cursor:not-allowed;pointer-events:none}\n"] }]
        }], propDecorators: { tabs: [{ type: i0.Input, args: [{ isSignal: true, alias: "tabs", required: false }] }], activeId: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeId", required: false }] }, { type: i0.Output, args: ["activeIdChange"] }], tabChange: [{ type: i0.Output, args: ["tabChange"] }], tabButtons: [{ type: i0.ViewChildren, args: ['tabButton', { isSignal: true }] }] } });

let uniqueId = 0;
class GenericTooltip {
    text = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []));
    position = input('top', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "position" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    /** Hover and focus are tracked independently so the tooltip doesn't hide
     * on mouseleave while the trigger still has keyboard focus (or vice versa). */
    hovering = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hovering" }] : /* istanbul ignore next */ []));
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
    visible = computed(() => !this.disabled() && (this.hovering() || this.focused()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visible" }] : /* istanbul ignore next */ []));
    tooltipId = `generic-tooltip-${++uniqueId}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTooltip, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericTooltip, isStandalone: true, selector: "generic-tooltip", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: true, transformFunction: null }, position: { classPropertyName: "position", publicName: "position", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "mouseenter": "hovering.set(true)", "mouseleave": "hovering.set(false)", "focusin": "focused.set(true)", "focusout": "focused.set(false)" }, properties: { "attr.aria-describedby": "visible() ? tooltipId : null" } }, ngImport: i0, template: "<ng-content />\n\n@if (visible() && !disabled()) {\n<span class=\"bubble pos-{{ position() }}\" role=\"tooltip\" [id]=\"tooltipId\"> {{ text() }} </span>\n}\n", styles: [":host{display:inline-block;position:relative}.bubble{position:absolute;z-index:10;display:inline-block;width:max-content;max-width:16rem;padding:.35rem .6rem;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:2px;color:var(--text-primary);font-family:var(--font-arcade);font-size:.8rem;font-weight:500;line-height:1.3;pointer-events:none;animation:generic-tooltip-fade .12s ease}.bubble:after{content:\"\";position:absolute;width:8px;height:8px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle)}.pos-top{bottom:calc(100% + 8px);left:50%;transform:translate(-50%)}.pos-top:after{top:100%;left:50%;border-top:none;border-left:none;transform:translate(-50%,-50%) rotate(45deg)}.pos-bottom{top:calc(100% + 8px);left:50%;transform:translate(-50%)}.pos-bottom:after{bottom:100%;left:50%;border-bottom:none;border-right:none;transform:translate(-50%,50%) rotate(45deg)}.pos-left{right:calc(100% + 8px);top:50%;transform:translateY(-50%)}.pos-left:after{left:100%;top:50%;border-left:none;border-bottom:none;transform:translate(-50%,-50%) rotate(45deg)}.pos-right{left:calc(100% + 8px);top:50%;transform:translateY(-50%)}.pos-right:after{right:100%;top:50%;border-right:none;border-top:none;transform:translate(50%,-50%) rotate(45deg)}@keyframes generic-tooltip-fade{0%{opacity:0}to{opacity:1}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericTooltip, decorators: [{
            type: Component,
            args: [{ selector: 'generic-tooltip', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-describedby]': 'visible() ? tooltipId : null',
                        '(mouseenter)': 'hovering.set(true)',
                        '(mouseleave)': 'hovering.set(false)',
                        '(focusin)': 'focused.set(true)',
                        '(focusout)': 'focused.set(false)',
                    }, template: "<ng-content />\n\n@if (visible() && !disabled()) {\n<span class=\"bubble pos-{{ position() }}\" role=\"tooltip\" [id]=\"tooltipId\"> {{ text() }} </span>\n}\n", styles: [":host{display:inline-block;position:relative}.bubble{position:absolute;z-index:10;display:inline-block;width:max-content;max-width:16rem;padding:.35rem .6rem;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:2px;color:var(--text-primary);font-family:var(--font-arcade);font-size:.8rem;font-weight:500;line-height:1.3;pointer-events:none;animation:generic-tooltip-fade .12s ease}.bubble:after{content:\"\";position:absolute;width:8px;height:8px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle)}.pos-top{bottom:calc(100% + 8px);left:50%;transform:translate(-50%)}.pos-top:after{top:100%;left:50%;border-top:none;border-left:none;transform:translate(-50%,-50%) rotate(45deg)}.pos-bottom{top:calc(100% + 8px);left:50%;transform:translate(-50%)}.pos-bottom:after{bottom:100%;left:50%;border-bottom:none;border-right:none;transform:translate(-50%,50%) rotate(45deg)}.pos-left{right:calc(100% + 8px);top:50%;transform:translateY(-50%)}.pos-left:after{left:100%;top:50%;border-left:none;border-bottom:none;transform:translate(-50%,-50%) rotate(45deg)}.pos-right{left:calc(100% + 8px);top:50%;transform:translateY(-50%)}.pos-right:after{right:100%;top:50%;border-right:none;border-top:none;transform:translate(50%,-50%) rotate(45deg)}@keyframes generic-tooltip-fade{0%{opacity:0}to{opacity:1}}\n"] }]
        }], propDecorators: { text: [{ type: i0.Input, args: [{ isSignal: true, alias: "text", required: true }] }], position: [{ type: i0.Input, args: [{ isSignal: true, alias: "position", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

class GenericDrawer {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    dismissable = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dismissable" }] : /* istanbul ignore next */ []));
    side = input('right', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "side" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    closeLabel = input('Cerrar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closeLabel" }] : /* istanbul ignore next */ []));
    closed = output();
    close() {
        if (!this.open())
            return;
        if (!this.dismissable())
            return;
        this.open.set(false);
        this.closed.emit();
    }
    onBackdrop() {
        this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDrawer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericDrawer, isStandalone: true, selector: "generic-drawer", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, dismissable: { classPropertyName: "dismissable", publicName: "dismissable", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", closed: "closed" }, host: { listeners: { "document:keydown.escape": "close()" } }, ngImport: i0, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel side-{{ side() }} size-{{ size() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    @if (dismissable()) {\n    <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n    }\n\n    <div class=\"body\">\n      <ng-content />\n    </div>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:generic-drawer-fade .2s ease}@keyframes generic-drawer-fade{0%{opacity:0}to{opacity:1}}.panel{position:relative;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);outline:none}.side-left{position:absolute;top:0;left:0;bottom:0;height:100%;border-width:0 2px 0 0;animation:generic-drawer-slide-left .25s ease}.side-right{position:absolute;top:0;right:0;bottom:0;height:100%;border-width:0 0 0 2px;animation:generic-drawer-slide-right .25s ease}.side-top{position:absolute;top:0;left:0;right:0;width:100%;border-width:0 0 2px 0;animation:generic-drawer-slide-top .25s ease}.side-bottom{position:absolute;bottom:0;left:0;right:0;width:100%;border-width:2px 0 0 0;animation:generic-drawer-slide-bottom .25s ease}@keyframes generic-drawer-slide-left{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes generic-drawer-slide-right{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes generic-drawer-slide-top{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes generic-drawer-slide-bottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.side-left.size-sm,.side-right.size-sm{width:280px;max-width:90vw}.side-left.size-md,.side-right.size-md{width:360px;max-width:90vw}.side-left.size-lg,.side-right.size-lg{width:480px;max-width:90vw}.side-top.size-sm,.side-bottom.size-sm{height:160px;max-height:90vh}.side-top.size-md,.side-bottom.size-md{height:240px;max-height:90vh}.side-top.size-lg,.side-bottom.size-lg{height:320px;max-height:90vh}.x{position:absolute;top:.75rem;right:.75rem;background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:28px;height:28px;border-radius:2px;cursor:pointer;font-size:1.2rem;line-height:1;z-index:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.body{flex:1;padding:1rem 3.25rem 1rem 1.25rem;overflow-y:auto;font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericDrawer, decorators: [{
            type: Component,
            args: [{ selector: 'generic-drawer', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(document:keydown.escape)': 'close()',
                    }, template: "@if (open()) {\n<div class=\"overlay\" role=\"presentation\">\n  <div class=\"backdrop\" (click)=\"onBackdrop()\" aria-hidden=\"true\"></div>\n  <div\n    class=\"panel side-{{ side() }} size-{{ size() }}\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    tabindex=\"-1\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    @if (dismissable()) {\n    <button type=\"button\" class=\"x\" [attr.aria-label]=\"closeLabel()\" (click)=\"close()\">\u00D7</button>\n    }\n\n    <div class=\"body\">\n      <ng-content />\n    </div>\n  </div>\n</div>\n}\n", styles: [":host{display:contents}.overlay{position:fixed;inset:0;z-index:100;display:flex}.backdrop{position:absolute;inset:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:generic-drawer-fade .2s ease}@keyframes generic-drawer-fade{0%{opacity:0}to{opacity:1}}.panel{position:relative;display:flex;flex-direction:column;background:var(--bg-surface);border:2px solid var(--border-subtle);outline:none}.side-left{position:absolute;top:0;left:0;bottom:0;height:100%;border-width:0 2px 0 0;animation:generic-drawer-slide-left .25s ease}.side-right{position:absolute;top:0;right:0;bottom:0;height:100%;border-width:0 0 0 2px;animation:generic-drawer-slide-right .25s ease}.side-top{position:absolute;top:0;left:0;right:0;width:100%;border-width:0 0 2px 0;animation:generic-drawer-slide-top .25s ease}.side-bottom{position:absolute;bottom:0;left:0;right:0;width:100%;border-width:2px 0 0 0;animation:generic-drawer-slide-bottom .25s ease}@keyframes generic-drawer-slide-left{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes generic-drawer-slide-right{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes generic-drawer-slide-top{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes generic-drawer-slide-bottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.side-left.size-sm,.side-right.size-sm{width:280px;max-width:90vw}.side-left.size-md,.side-right.size-md{width:360px;max-width:90vw}.side-left.size-lg,.side-right.size-lg{width:480px;max-width:90vw}.side-top.size-sm,.side-bottom.size-sm{height:160px;max-height:90vh}.side-top.size-md,.side-bottom.size-md{height:240px;max-height:90vh}.side-top.size-lg,.side-bottom.size-lg{height:320px;max-height:90vh}.x{position:absolute;top:.75rem;right:.75rem;background:transparent;border:1px solid var(--border-subtle);color:var(--text-muted);width:28px;height:28px;border-radius:2px;cursor:pointer;font-size:1.2rem;line-height:1;z-index:1}.x:hover{color:var(--accent-danger);border-color:var(--accent-danger)}.body{flex:1;padding:1rem 3.25rem 1rem 1.25rem;overflow-y:auto;font-family:var(--font-arcade);font-size:1rem;color:var(--text-primary)}\n"] }]
        }], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], dismissable: [{ type: i0.Input, args: [{ isSignal: true, alias: "dismissable", required: false }] }], side: [{ type: i0.Input, args: [{ isSignal: true, alias: "side", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], closeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeLabel", required: false }] }], closed: [{ type: i0.Output, args: ["closed"] }] } });

class GenericBreadcrumb {
    items = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    showHome = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showHome" }] : /* istanbul ignore next */ []));
    itemClick = output();
    homeClick = output();
    isLast(index) {
        return index === this.items().length - 1;
    }
    select(item, index) {
        if (this.isLast(index))
            return;
        this.itemClick.emit(item);
    }
    selectHome() {
        this.homeClick.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBreadcrumb, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericBreadcrumb, isStandalone: true, selector: "generic-breadcrumb", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, showHome: { classPropertyName: "showHome", publicName: "showHome", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClick: "itemClick", homeClick: "homeClick" }, ngImport: i0, template: "<nav class=\"breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol>\n    @if (showHome()) {\n    <li>\n      <button type=\"button\" class=\"crumb link\" (click)=\"selectHome()\">\n        <span class=\"home-icon\" aria-hidden=\"true\"></span>\n        <span>Home</span>\n      </button>\n    </li>\n    @if (items().length > 0) {\n    <li aria-hidden=\"true\"><span class=\"separator\"></span></li>\n    } } @for (item of items(); track item.id; let i = $index; let last = $last) {\n    <li>\n      @if (last) {\n      <span class=\"crumb current\" aria-current=\"page\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </span>\n      } @else if (item.href) {\n      <a class=\"crumb link\" [href]=\"item.href\" (click)=\"select(item, i)\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </a>\n      } @else {\n      <button type=\"button\" class=\"crumb link\" (click)=\"select(item, i)\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </button>\n      }\n    </li>\n    @if (!last) {\n    <li aria-hidden=\"true\"><span class=\"separator\"></span></li>\n    } }\n  </ol>\n</nav>\n", styles: [":host{display:block}.breadcrumb ol{display:flex;align-items:center;flex-wrap:wrap;gap:.4rem;margin:0;padding:0;list-style:none}.crumb{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);font-size:.9rem}.crumb.link{background:transparent;border:0;padding:.15rem 0;color:var(--text-muted);cursor:pointer}.crumb.link:hover{color:var(--accent-secondary)}.crumb.current{color:var(--text-primary);font-weight:700}.separator{display:inline-block;width:6px;height:6px;border-top:2px solid var(--text-muted);border-right:2px solid var(--text-muted);transform:rotate(45deg)}.home-icon{position:relative;display:inline-block;width:10px;height:9px}.home-icon:before{content:\"\";position:absolute;top:0;left:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid currentColor}.home-icon:after{content:\"\";position:absolute;bottom:0;left:2px;width:6px;height:4px;background:currentColor}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBreadcrumb, decorators: [{
            type: Component,
            args: [{ selector: 'generic-breadcrumb', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<nav class=\"breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol>\n    @if (showHome()) {\n    <li>\n      <button type=\"button\" class=\"crumb link\" (click)=\"selectHome()\">\n        <span class=\"home-icon\" aria-hidden=\"true\"></span>\n        <span>Home</span>\n      </button>\n    </li>\n    @if (items().length > 0) {\n    <li aria-hidden=\"true\"><span class=\"separator\"></span></li>\n    } } @for (item of items(); track item.id; let i = $index; let last = $last) {\n    <li>\n      @if (last) {\n      <span class=\"crumb current\" aria-current=\"page\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </span>\n      } @else if (item.href) {\n      <a class=\"crumb link\" [href]=\"item.href\" (click)=\"select(item, i)\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </a>\n      } @else {\n      <button type=\"button\" class=\"crumb link\" (click)=\"select(item, i)\">\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"14\" />\n        } {{ item.label }}\n      </button>\n      }\n    </li>\n    @if (!last) {\n    <li aria-hidden=\"true\"><span class=\"separator\"></span></li>\n    } }\n  </ol>\n</nav>\n", styles: [":host{display:block}.breadcrumb ol{display:flex;align-items:center;flex-wrap:wrap;gap:.4rem;margin:0;padding:0;list-style:none}.crumb{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);font-size:.9rem}.crumb.link{background:transparent;border:0;padding:.15rem 0;color:var(--text-muted);cursor:pointer}.crumb.link:hover{color:var(--accent-secondary)}.crumb.current{color:var(--text-primary);font-weight:700}.separator{display:inline-block;width:6px;height:6px;border-top:2px solid var(--text-muted);border-right:2px solid var(--text-muted);transform:rotate(45deg)}.home-icon{position:relative;display:inline-block;width:10px;height:9px}.home-icon:before{content:\"\";position:absolute;top:0;left:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid currentColor}.home-icon:after{content:\"\";position:absolute;bottom:0;left:2px;width:6px;height:4px;background:currentColor}\n"] }]
        }], propDecorators: { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], showHome: [{ type: i0.Input, args: [{ isSignal: true, alias: "showHome", required: false }] }], itemClick: [{ type: i0.Output, args: ["itemClick"] }], homeClick: [{ type: i0.Output, args: ["homeClick"] }] } });

class GenericFooter {
    links = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "links" }] : /* istanbul ignore next */ []));
    copyrightText = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "copyrightText" }] : /* istanbul ignore next */ []));
    linkClick = output();
    select(link) {
        this.linkClick.emit(link);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericFooter, isStandalone: true, selector: "generic-footer", inputs: { links: { classPropertyName: "links", publicName: "links", isSignal: true, isRequired: false, transformFunction: null }, copyrightText: { classPropertyName: "copyrightText", publicName: "copyrightText", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { linkClick: "linkClick" }, ngImport: i0, template: "<footer class=\"footer\">\n  <div class=\"brand\">\n    <ng-content select=\"[brand]\" />\n  </div>\n\n  @if (links().length > 0) {\n  <ul class=\"links\">\n    @for (link of links(); track link.id) {\n    <li>\n      <a class=\"link\" [href]=\"link.href\" (click)=\"select(link)\">{{ link.label }}</a>\n    </li>\n    }\n  </ul>\n  } @if (copyrightText()) {\n  <p class=\"copyright\">{{ copyrightText() }}</p>\n  }\n</footer>\n", styles: [":host{display:block}.footer{display:flex;align-items:center;flex-wrap:wrap;gap:1rem;padding:1rem 1.25rem;background:var(--bg-surface);border-top:2px solid var(--border-subtle)}.brand:empty{display:none}.links{display:flex;align-items:center;flex-wrap:wrap;gap:1rem;margin:0;padding:0;list-style:none}.link{font-family:var(--font-arcade);font-size:.9rem;text-decoration:none;color:var(--text-muted)}.link:hover{color:var(--accent-secondary)}.copyright{margin:0 0 0 auto;font-family:var(--font-arcade);font-size:.8rem;color:var(--text-muted)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericFooter, decorators: [{
            type: Component,
            args: [{ selector: 'generic-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<footer class=\"footer\">\n  <div class=\"brand\">\n    <ng-content select=\"[brand]\" />\n  </div>\n\n  @if (links().length > 0) {\n  <ul class=\"links\">\n    @for (link of links(); track link.id) {\n    <li>\n      <a class=\"link\" [href]=\"link.href\" (click)=\"select(link)\">{{ link.label }}</a>\n    </li>\n    }\n  </ul>\n  } @if (copyrightText()) {\n  <p class=\"copyright\">{{ copyrightText() }}</p>\n  }\n</footer>\n", styles: [":host{display:block}.footer{display:flex;align-items:center;flex-wrap:wrap;gap:1rem;padding:1rem 1.25rem;background:var(--bg-surface);border-top:2px solid var(--border-subtle)}.brand:empty{display:none}.links{display:flex;align-items:center;flex-wrap:wrap;gap:1rem;margin:0;padding:0;list-style:none}.link{font-family:var(--font-arcade);font-size:.9rem;text-decoration:none;color:var(--text-muted)}.link:hover{color:var(--accent-secondary)}.copyright{margin:0 0 0 auto;font-family:var(--font-arcade);font-size:.8rem;color:var(--text-muted)}\n"] }]
        }], propDecorators: { links: [{ type: i0.Input, args: [{ isSignal: true, alias: "links", required: false }] }], copyrightText: [{ type: i0.Input, args: [{ isSignal: true, alias: "copyrightText", required: false }] }], linkClick: [{ type: i0.Output, args: ["linkClick"] }] } });

class GenericNavbar {
    host = inject(ElementRef);
    themeService = inject(ThemeService);
    items = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    activeId = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeId" }] : /* istanbul ignore next */ []));
    brandLabel = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "brandLabel" }] : /* istanbul ignore next */ []));
    itemClick = output();
    mobileMenuOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "mobileMenuOpen" }] : /* istanbul ignore next */ []));
    isDarkMode = computed(() => this.themeService.theme() === 'dark', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isDarkMode" }] : /* istanbul ignore next */ []));
    themeIconLabel = computed(() => this.isDarkMode() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "themeIconLabel" }] : /* istanbul ignore next */ []));
    hamburgerLabel = computed(() => (this.mobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hamburgerLabel" }] : /* istanbul ignore next */ []));
    toggleMobileMenu() {
        this.mobileMenuOpen.update(value => !value);
    }
    toggleTheme() {
        this.themeService.toggle();
    }
    select(item) {
        this.itemClick.emit(item);
        this.mobileMenuOpen.set(false);
    }
    onDocumentClick(event) {
        if (!this.host.nativeElement.contains(event.target)) {
            this.mobileMenuOpen.set(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericNavbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericNavbar, isStandalone: true, selector: "generic-navbar", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, activeId: { classPropertyName: "activeId", publicName: "activeId", isSignal: true, isRequired: false, transformFunction: null }, brandLabel: { classPropertyName: "brandLabel", publicName: "brandLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClick: "itemClick" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, ngImport: i0, template: "<header class=\"navbar\">\n  <div class=\"row\">\n    <span class=\"brand\">{{ brandLabel() }}</span>\n\n    <nav class=\"nav-links\" aria-label=\"Main\">\n      @for (item of items(); track item.id) { @if (item.href) {\n      <a\n        class=\"nav-item\"\n        [class.active]=\"item.id === activeId()\"\n        [href]=\"item.href\"\n        (click)=\"select(item)\"\n      >\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n        } {{ item.label }}\n      </a>\n      } @else {\n      <button\n        type=\"button\"\n        class=\"nav-item\"\n        [class.active]=\"item.id === activeId()\"\n        (click)=\"select(item)\"\n      >\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n        } {{ item.label }}\n      </button>\n      } }\n    </nav>\n\n    <div class=\"end\">\n      <div class=\"account\">\n        <ng-content select=\"[account]\" />\n      </div>\n\n      <div class=\"actions\">\n        <button\n          type=\"button\"\n          class=\"theme-toggle\"\n          [attr.aria-label]=\"themeIconLabel()\"\n          (click)=\"toggleTheme()\"\n        >\n          <span\n            class=\"theme-icon\"\n            [class.mode-dark]=\"isDarkMode()\"\n            [class.mode-light]=\"!isDarkMode()\"\n          ></span>\n        </button>\n\n        <button\n          type=\"button\"\n          class=\"hamburger\"\n          [attr.aria-expanded]=\"mobileMenuOpen()\"\n          [attr.aria-label]=\"hamburgerLabel()\"\n          (click)=\"toggleMobileMenu()\"\n        >\n          <span></span>\n          <span></span>\n          <span></span>\n        </button>\n      </div>\n    </div>\n  </div>\n\n  @if (mobileMenuOpen()) {\n  <nav class=\"mobile-panel\" aria-label=\"Main mobile\">\n    @for (item of items(); track item.id) { @if (item.href) {\n    <a\n      class=\"mobile-item\"\n      [class.active]=\"item.id === activeId()\"\n      [href]=\"item.href\"\n      (click)=\"select(item)\"\n    >\n      @if (item.icon) {\n      <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n      } {{ item.label }}\n    </a>\n    } @else {\n    <button\n      type=\"button\"\n      class=\"mobile-item\"\n      [class.active]=\"item.id === activeId()\"\n      (click)=\"select(item)\"\n    >\n      @if (item.icon) {\n      <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n      } {{ item.label }}\n    </button>\n    } }\n  </nav>\n  }\n</header>\n", styles: [":host{display:block;position:sticky;top:0;z-index:30;overflow-x:clip;overflow-y:visible;width:100%;max-width:100vw}.navbar{position:relative;overflow-x:clip;overflow-y:visible;background:var(--bg-surface);border-bottom:2px solid var(--border-subtle);width:100%;max-width:100vw}.row{display:flex;align-items:center;gap:.75rem;padding:.6rem 1rem;width:100%;max-width:100%;box-sizing:border-box}.brand{font-family:var(--font-arcade);font-weight:700;font-size:1.15rem;color:var(--text-primary);white-space:nowrap;flex-shrink:0;letter-spacing:.05em;padding-right:.5rem}.end{display:flex;align-items:center;gap:.75rem;margin-left:auto;flex-shrink:0}.nav-links{display:flex;align-items:center;gap:.25rem;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;flex:1 1 0;min-width:0}.nav-links::-webkit-scrollbar{display:none}.account{display:flex;align-items:center;min-width:0}:host ::ng-deep .account generic-dropdown{position:static}:host ::ng-deep .account .menu{position:static}:host ::ng-deep .account .list{top:calc(100% - 2px);z-index:40}.account:empty{display:none}.nav-item{display:inline-flex;align-items:center;gap:.35rem;background:transparent;border:0;border-bottom:2px solid transparent;padding:.5rem .6rem;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted);cursor:pointer;white-space:nowrap;flex-shrink:0}.nav-item:hover{color:var(--text-primary)}.nav-item.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary)}.actions{display:flex;align-items:center;gap:.5rem}.theme-toggle,.hamburger{display:inline-flex;align-items:center;justify-content:center;background:transparent;border:2px solid var(--border-subtle);padding:.4rem;cursor:pointer;color:var(--text-primary);border-radius:4px}.theme-toggle:hover,.hamburger:hover{border-color:var(--accent-secondary);color:var(--accent-secondary)}.theme-icon{position:relative;display:inline-block;width:14px;height:14px;border-radius:50%;background:currentColor}.theme-icon.mode-light:after{content:\"\";position:absolute;inset:-4px;border:2px solid currentColor;border-radius:50%;opacity:.5}.theme-icon.mode-dark{overflow:hidden}.theme-icon.mode-dark:after{content:\"\";position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:var(--bg-surface)}.hamburger{display:none;flex-direction:column;gap:3px}.hamburger span{display:block;width:16px;height:2px;background:currentColor}.mobile-panel{display:none;flex-direction:column;border-top:2px solid var(--border-subtle);background:var(--bg-surface);max-height:80vh;overflow-y:auto}.mobile-item{display:flex;align-items:center;gap:.5rem;background:transparent;border:0;border-left:3px solid transparent;padding:.75rem 1.25rem;text-align:left;font-family:var(--font-arcade);font-size:.95rem;color:var(--text-muted);cursor:pointer}.mobile-item:hover{color:var(--text-primary)}.mobile-item.active{color:var(--accent-secondary);border-left-color:var(--accent-secondary);background:var(--bg-surface-alt)}@media(max-width:1250px){.nav-links{display:none}.hamburger{display:inline-flex}.mobile-panel{display:flex}}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericNavbar, decorators: [{
            type: Component,
            args: [{ selector: 'generic-navbar', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<header class=\"navbar\">\n  <div class=\"row\">\n    <span class=\"brand\">{{ brandLabel() }}</span>\n\n    <nav class=\"nav-links\" aria-label=\"Main\">\n      @for (item of items(); track item.id) { @if (item.href) {\n      <a\n        class=\"nav-item\"\n        [class.active]=\"item.id === activeId()\"\n        [href]=\"item.href\"\n        (click)=\"select(item)\"\n      >\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n        } {{ item.label }}\n      </a>\n      } @else {\n      <button\n        type=\"button\"\n        class=\"nav-item\"\n        [class.active]=\"item.id === activeId()\"\n        (click)=\"select(item)\"\n      >\n        @if (item.icon) {\n        <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n        } {{ item.label }}\n      </button>\n      } }\n    </nav>\n\n    <div class=\"end\">\n      <div class=\"account\">\n        <ng-content select=\"[account]\" />\n      </div>\n\n      <div class=\"actions\">\n        <button\n          type=\"button\"\n          class=\"theme-toggle\"\n          [attr.aria-label]=\"themeIconLabel()\"\n          (click)=\"toggleTheme()\"\n        >\n          <span\n            class=\"theme-icon\"\n            [class.mode-dark]=\"isDarkMode()\"\n            [class.mode-light]=\"!isDarkMode()\"\n          ></span>\n        </button>\n\n        <button\n          type=\"button\"\n          class=\"hamburger\"\n          [attr.aria-expanded]=\"mobileMenuOpen()\"\n          [attr.aria-label]=\"hamburgerLabel()\"\n          (click)=\"toggleMobileMenu()\"\n        >\n          <span></span>\n          <span></span>\n          <span></span>\n        </button>\n      </div>\n    </div>\n  </div>\n\n  @if (mobileMenuOpen()) {\n  <nav class=\"mobile-panel\" aria-label=\"Main mobile\">\n    @for (item of items(); track item.id) { @if (item.href) {\n    <a\n      class=\"mobile-item\"\n      [class.active]=\"item.id === activeId()\"\n      [href]=\"item.href\"\n      (click)=\"select(item)\"\n    >\n      @if (item.icon) {\n      <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n      } {{ item.label }}\n    </a>\n    } @else {\n    <button\n      type=\"button\"\n      class=\"mobile-item\"\n      [class.active]=\"item.id === activeId()\"\n      (click)=\"select(item)\"\n    >\n      @if (item.icon) {\n      <generic-icon [name]=\"item.icon\" [size]=\"16\" />\n      } {{ item.label }}\n    </button>\n    } }\n  </nav>\n  }\n</header>\n", styles: [":host{display:block;position:sticky;top:0;z-index:30;overflow-x:clip;overflow-y:visible;width:100%;max-width:100vw}.navbar{position:relative;overflow-x:clip;overflow-y:visible;background:var(--bg-surface);border-bottom:2px solid var(--border-subtle);width:100%;max-width:100vw}.row{display:flex;align-items:center;gap:.75rem;padding:.6rem 1rem;width:100%;max-width:100%;box-sizing:border-box}.brand{font-family:var(--font-arcade);font-weight:700;font-size:1.15rem;color:var(--text-primary);white-space:nowrap;flex-shrink:0;letter-spacing:.05em;padding-right:.5rem}.end{display:flex;align-items:center;gap:.75rem;margin-left:auto;flex-shrink:0}.nav-links{display:flex;align-items:center;gap:.25rem;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;flex:1 1 0;min-width:0}.nav-links::-webkit-scrollbar{display:none}.account{display:flex;align-items:center;min-width:0}:host ::ng-deep .account generic-dropdown{position:static}:host ::ng-deep .account .menu{position:static}:host ::ng-deep .account .list{top:calc(100% - 2px);z-index:40}.account:empty{display:none}.nav-item{display:inline-flex;align-items:center;gap:.35rem;background:transparent;border:0;border-bottom:2px solid transparent;padding:.5rem .6rem;font-family:var(--font-arcade);font-size:.9rem;color:var(--text-muted);cursor:pointer;white-space:nowrap;flex-shrink:0}.nav-item:hover{color:var(--text-primary)}.nav-item.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary)}.actions{display:flex;align-items:center;gap:.5rem}.theme-toggle,.hamburger{display:inline-flex;align-items:center;justify-content:center;background:transparent;border:2px solid var(--border-subtle);padding:.4rem;cursor:pointer;color:var(--text-primary);border-radius:4px}.theme-toggle:hover,.hamburger:hover{border-color:var(--accent-secondary);color:var(--accent-secondary)}.theme-icon{position:relative;display:inline-block;width:14px;height:14px;border-radius:50%;background:currentColor}.theme-icon.mode-light:after{content:\"\";position:absolute;inset:-4px;border:2px solid currentColor;border-radius:50%;opacity:.5}.theme-icon.mode-dark{overflow:hidden}.theme-icon.mode-dark:after{content:\"\";position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:var(--bg-surface)}.hamburger{display:none;flex-direction:column;gap:3px}.hamburger span{display:block;width:16px;height:2px;background:currentColor}.mobile-panel{display:none;flex-direction:column;border-top:2px solid var(--border-subtle);background:var(--bg-surface);max-height:80vh;overflow-y:auto}.mobile-item{display:flex;align-items:center;gap:.5rem;background:transparent;border:0;border-left:3px solid transparent;padding:.75rem 1.25rem;text-align:left;font-family:var(--font-arcade);font-size:.95rem;color:var(--text-muted);cursor:pointer}.mobile-item:hover{color:var(--text-primary)}.mobile-item.active{color:var(--accent-secondary);border-left-color:var(--accent-secondary);background:var(--bg-surface-alt)}@media(max-width:1250px){.nav-links{display:none}.hamburger{display:inline-flex}.mobile-panel{display:flex}}\n"] }]
        }], propDecorators: { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], activeId: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeId", required: false }] }], brandLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandLabel", required: false }] }], itemClick: [{ type: i0.Output, args: ["itemClick"] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class GenericLessonHeader {
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    subtitle = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    progress = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progress" }] : /* istanbul ignore next */ []));
    tone = input('cyan', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    badgeLabel = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "badgeLabel" }] : /* istanbul ignore next */ []));
    /** generic-progress doesn't support the 'neutral' tone; fall back to 'cyan'. */
    progressTone = computed(() => {
        const tone = this.tone();
        return tone === 'neutral' ? 'cyan' : tone;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progressTone" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericLessonHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericLessonHeader, isStandalone: true, selector: "generic-lesson-header", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, progress: { classPropertyName: "progress", publicName: "progress", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, badgeLabel: { classPropertyName: "badgeLabel", publicName: "badgeLabel", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<header class=\"header tone-{{ tone() }}\">\n  <div class=\"title-row\">\n    <h1 class=\"title\">{{ title() }}</h1>\n    @if (badgeLabel()) {\n    <generic-badge [tone]=\"tone()\" size=\"sm\" class=\"badge\">{{ badgeLabel() }}</generic-badge>\n    }\n  </div>\n  @if (subtitle()) {\n  <p class=\"subtitle\">{{ subtitle() }}</p>\n  }\n  <generic-progress class=\"progress\" [value]=\"progress()\" [tone]=\"progressTone()\" size=\"sm\" />\n</header>\n", styles: [":host{display:block}.header{display:flex;flex-direction:column;gap:.5rem;padding:.85rem 1rem;border-radius:4px;border:2px solid}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem}.badge{flex-shrink:0}.title{margin:0;font-family:var(--font-arcade);font-weight:700;font-size:1.25rem;color:var(--text-primary)}.subtitle{margin:0;font-family:var(--font-arcade);font-size:.95rem;color:var(--text-muted)}.progress{margin-top:.5rem}.tone-cyan{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.tone-magenta{border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}.tone-gold{border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}.tone-green{border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.tone-red{border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.tone-neutral{border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }, { kind: "component", type: GenericProgress, selector: "generic-progress", inputs: ["value", "max", "tone", "size", "label", "showValue", "showPercent", "segmented", "hearts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericLessonHeader, decorators: [{
            type: Component,
            args: [{ selector: 'generic-lesson-header', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge, GenericProgress], template: "<header class=\"header tone-{{ tone() }}\">\n  <div class=\"title-row\">\n    <h1 class=\"title\">{{ title() }}</h1>\n    @if (badgeLabel()) {\n    <generic-badge [tone]=\"tone()\" size=\"sm\" class=\"badge\">{{ badgeLabel() }}</generic-badge>\n    }\n  </div>\n  @if (subtitle()) {\n  <p class=\"subtitle\">{{ subtitle() }}</p>\n  }\n  <generic-progress class=\"progress\" [value]=\"progress()\" [tone]=\"progressTone()\" size=\"sm\" />\n</header>\n", styles: [":host{display:block}.header{display:flex;flex-direction:column;gap:.5rem;padding:.85rem 1rem;border-radius:4px;border:2px solid}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem}.badge{flex-shrink:0}.title{margin:0;font-family:var(--font-arcade);font-weight:700;font-size:1.25rem;color:var(--text-primary)}.subtitle{margin:0;font-family:var(--font-arcade);font-size:.95rem;color:var(--text-muted)}.progress{margin-top:.5rem}.tone-cyan{border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}.tone-magenta{border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}.tone-gold{border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}.tone-green{border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.tone-red{border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.tone-neutral{border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], progress: [{ type: i0.Input, args: [{ isSignal: true, alias: "progress", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], badgeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "badgeLabel", required: false }] }] } });

class GenericCodeBlock {
    code = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "code" }] : /* istanbul ignore next */ []));
    language = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "language" }] : /* istanbul ignore next */ []));
    filename = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filename" }] : /* istanbul ignore next */ []));
    showCopyButton = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showCopyButton" }] : /* istanbul ignore next */ []));
    copied = output();
    justCopied = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "justCopied" }] : /* istanbul ignore next */ []));
    async copy() {
        try {
            await navigator.clipboard.writeText(this.code());
            this.justCopied.set(true);
            this.copied.emit();
            setTimeout(() => this.justCopied.set(false), 1500);
        }
        catch {
            // Clipboard API unavailable or denied — silently ignore, no state change.
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCodeBlock, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericCodeBlock, isStandalone: true, selector: "generic-code-block", inputs: { code: { classPropertyName: "code", publicName: "code", isSignal: true, isRequired: true, transformFunction: null }, language: { classPropertyName: "language", publicName: "language", isSignal: true, isRequired: false, transformFunction: null }, filename: { classPropertyName: "filename", publicName: "filename", isSignal: true, isRequired: false, transformFunction: null }, showCopyButton: { classPropertyName: "showCopyButton", publicName: "showCopyButton", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { copied: "copied" }, ngImport: i0, template: "<div class=\"wrap\">\n  @if (language() || filename() || showCopyButton()) {\n  <div class=\"header\">\n    <span class=\"label\">\n      @if (filename()) { {{ filename() }} } @else if (language()) { {{ language() }} }\n    </span>\n    @if (showCopyButton()) {\n    <button\n      type=\"button\"\n      class=\"copy-btn\"\n      (click)=\"copy()\"\n      [attr.aria-label]=\"justCopied() ? 'Copiado' : 'Copiar c\u00F3digo'\"\n    >\n      @if (justCopied()) {\n      <generic-icon name=\"check\" [size]=\"14\" />\n      }\n      <span>{{ justCopied() ? 'Copiado' : 'Copiar' }}</span>\n    </button>\n    }\n  </div>\n  }\n  <pre class=\"code\"><code>{{ code() }}</code></pre>\n</div>\n", styles: [":host{display:block;width:100%}.wrap{border:2px solid var(--border-subtle);border-radius:2px;overflow:hidden;background:var(--bg-surface)}.header{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.4rem .75rem;background:var(--bg-surface-alt);border-bottom:1px solid var(--border-subtle)}.label{font-family:var(--font-arcade);font-size:.75rem;font-weight:700;color:var(--text-muted)}.copy-btn{display:inline-flex;align-items:center;gap:.3rem;border:1px solid var(--border-subtle);border-radius:2px;background:transparent;color:var(--text-muted);font-family:var(--font-arcade);font-size:.7rem;font-weight:700;padding:.2rem .5rem;cursor:pointer;transition:filter .15s ease}.copy-btn:hover{filter:brightness(1.2);color:var(--text-primary)}.code{margin:0;padding:.85rem 1rem;overflow-x:auto;white-space:pre;font-family:var(--font-retro);font-size:.85rem;line-height:1.5;color:var(--text-primary)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCodeBlock, decorators: [{
            type: Component,
            args: [{ selector: 'generic-code-block', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"wrap\">\n  @if (language() || filename() || showCopyButton()) {\n  <div class=\"header\">\n    <span class=\"label\">\n      @if (filename()) { {{ filename() }} } @else if (language()) { {{ language() }} }\n    </span>\n    @if (showCopyButton()) {\n    <button\n      type=\"button\"\n      class=\"copy-btn\"\n      (click)=\"copy()\"\n      [attr.aria-label]=\"justCopied() ? 'Copiado' : 'Copiar c\u00F3digo'\"\n    >\n      @if (justCopied()) {\n      <generic-icon name=\"check\" [size]=\"14\" />\n      }\n      <span>{{ justCopied() ? 'Copiado' : 'Copiar' }}</span>\n    </button>\n    }\n  </div>\n  }\n  <pre class=\"code\"><code>{{ code() }}</code></pre>\n</div>\n", styles: [":host{display:block;width:100%}.wrap{border:2px solid var(--border-subtle);border-radius:2px;overflow:hidden;background:var(--bg-surface)}.header{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.4rem .75rem;background:var(--bg-surface-alt);border-bottom:1px solid var(--border-subtle)}.label{font-family:var(--font-arcade);font-size:.75rem;font-weight:700;color:var(--text-muted)}.copy-btn{display:inline-flex;align-items:center;gap:.3rem;border:1px solid var(--border-subtle);border-radius:2px;background:transparent;color:var(--text-muted);font-family:var(--font-arcade);font-size:.7rem;font-weight:700;padding:.2rem .5rem;cursor:pointer;transition:filter .15s ease}.copy-btn:hover{filter:brightness(1.2);color:var(--text-primary)}.code{margin:0;padding:.85rem 1rem;overflow-x:auto;white-space:pre;font-family:var(--font-retro);font-size:.85rem;line-height:1.5;color:var(--text-primary)}\n"] }]
        }], propDecorators: { code: [{ type: i0.Input, args: [{ isSignal: true, alias: "code", required: true }] }], language: [{ type: i0.Input, args: [{ isSignal: true, alias: "language", required: false }] }], filename: [{ type: i0.Input, args: [{ isSignal: true, alias: "filename", required: false }] }], showCopyButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showCopyButton", required: false }] }], copied: [{ type: i0.Output, args: ["copied"] }] } });

class GenericCountdownTimer {
    durationSeconds = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "durationSeconds" }] : /* istanbul ignore next */ []));
    autoStart = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "autoStart" }] : /* istanbul ignore next */ []));
    tick = output();
    expired = output();
    paused = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "paused" }] : /* istanbul ignore next */ []));
    remaining = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "remaining" }] : /* istanbul ignore next */ []));
    expiredEmitted = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "expiredEmitted" }] : /* istanbul ignore next */ []));
    display = computed(() => {
        const total = Math.max(0, this.remaining());
        const minutes = Math.floor(total / 60);
        const seconds = total % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "display" }] : /* istanbul ignore next */ []));
    critical = computed(() => {
        const duration = this.durationSeconds();
        if (duration <= 0)
            return false;
        return this.remaining() / duration < 0.1;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "critical" }] : /* istanbul ignore next */ []));
    intervalId;
    started = false;
    constructor() {
        // Required inputs aren't readable directly in the constructor body, so
        // the one-time setup (reading durationSeconds()/autoStart()) runs inside
        // an effect guarded to fire only once. Cleanup is handled explicitly via
        // DestroyRef, the modern Angular way to avoid leaking the interval.
        effect(() => {
            if (this.started)
                return;
            this.started = true;
            this.remaining.set(this.durationSeconds());
            if (this.autoStart()) {
                if (this.remaining() <= 0) {
                    this.expiredEmitted.set(true);
                    this.expired.emit();
                }
                else {
                    this.start();
                }
            }
        });
        inject(DestroyRef).onDestroy(() => {
            if (this.intervalId !== undefined) {
                clearInterval(this.intervalId);
            }
        });
    }
    togglePause() {
        this.paused.update(value => !value);
    }
    start() {
        this.intervalId = setInterval(() => {
            if (this.paused())
                return;
            const next = this.remaining() - 1;
            if (next <= 0) {
                this.remaining.set(0);
                this.tick.emit(0);
                if (!this.expiredEmitted()) {
                    this.expiredEmitted.set(true);
                    this.expired.emit();
                }
                if (this.intervalId !== undefined) {
                    clearInterval(this.intervalId);
                    this.intervalId = undefined;
                }
                return;
            }
            this.remaining.set(next);
            this.tick.emit(next);
        }, 1000);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCountdownTimer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericCountdownTimer, isStandalone: true, selector: "generic-countdown-timer", inputs: { durationSeconds: { classPropertyName: "durationSeconds", publicName: "durationSeconds", isSignal: true, isRequired: true, transformFunction: null }, autoStart: { classPropertyName: "autoStart", publicName: "autoStart", isSignal: true, isRequired: false, transformFunction: null }, paused: { classPropertyName: "paused", publicName: "paused", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { tick: "tick", expired: "expired", paused: "pausedChange" }, ngImport: i0, template: "<div class=\"wrap\" [class.critical]=\"critical()\">\n  <span class=\"display\" role=\"timer\" [attr.aria-label]=\"'Tiempo restante ' + display()\"\n    >{{ display() }}</span\n  >\n  <button\n    type=\"button\"\n    class=\"pause-btn\"\n    (click)=\"togglePause()\"\n    [attr.aria-label]=\"paused() ? 'Reanudar' : 'Pausar'\"\n  >\n    <generic-icon [name]=\"paused() ? 'check' : 'clock'\" [size]=\"16\" />\n  </button>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.6rem;padding:.5rem .9rem;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface)}.display{font-family:var(--font-arcade);font-weight:700;font-size:1.75rem;color:var(--text-primary);letter-spacing:.05em;min-width:3.5ch;text-align:center}.wrap.critical .display{color:var(--accent-danger)}.pause-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:1px solid var(--border-subtle);border-radius:2px;background:transparent;color:var(--text-muted);cursor:pointer;transition:filter .15s ease}.pause-btn:hover{filter:brightness(1.2);color:var(--text-primary)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCountdownTimer, decorators: [{
            type: Component,
            args: [{ selector: 'generic-countdown-timer', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"wrap\" [class.critical]=\"critical()\">\n  <span class=\"display\" role=\"timer\" [attr.aria-label]=\"'Tiempo restante ' + display()\"\n    >{{ display() }}</span\n  >\n  <button\n    type=\"button\"\n    class=\"pause-btn\"\n    (click)=\"togglePause()\"\n    [attr.aria-label]=\"paused() ? 'Reanudar' : 'Pausar'\"\n  >\n    <generic-icon [name]=\"paused() ? 'check' : 'clock'\" [size]=\"16\" />\n  </button>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.6rem;padding:.5rem .9rem;border:2px solid var(--border-subtle);border-radius:2px;background:var(--bg-surface)}.display{font-family:var(--font-arcade);font-weight:700;font-size:1.75rem;color:var(--text-primary);letter-spacing:.05em;min-width:3.5ch;text-align:center}.wrap.critical .display{color:var(--accent-danger)}.pause-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:1px solid var(--border-subtle);border-radius:2px;background:transparent;color:var(--text-muted);cursor:pointer;transition:filter .15s ease}.pause-btn:hover{filter:brightness(1.2);color:var(--text-primary)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { durationSeconds: [{ type: i0.Input, args: [{ isSignal: true, alias: "durationSeconds", required: true }] }], autoStart: [{ type: i0.Input, args: [{ isSignal: true, alias: "autoStart", required: false }] }], tick: [{ type: i0.Output, args: ["tick"] }], expired: [{ type: i0.Output, args: ["expired"] }], paused: [{ type: i0.Input, args: [{ isSignal: true, alias: "paused", required: false }] }, { type: i0.Output, args: ["pausedChange"] }] } });

class GenericStarRating {
    value = model(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    max = input(5, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    readonly = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "readonly" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    hovered = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hovered" }] : /* istanbul ignore next */ []));
    stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "stars" }] : /* istanbul ignore next */ []));
    starPx = computed(() => {
        if (this.size() === 'sm')
            return 16;
        if (this.size() === 'lg')
            return 28;
        return 22;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "starPx" }] : /* istanbul ignore next */ []));
    previewValue = computed(() => this.hovered() ?? this.value(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "previewValue" }] : /* istanbul ignore next */ []));
    onHover(star) {
        if (this.readonly())
            return;
        this.hovered.set(star);
    }
    onLeave() {
        this.hovered.set(null);
    }
    onClick(star) {
        if (this.readonly())
            return;
        this.value.set(star);
    }
    onKeydown(event) {
        if (this.readonly())
            return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
            return;
        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const next = Math.min(Math.max(this.value() + delta, 0), this.max());
        this.value.set(next);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStarRating, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericStarRating, isStandalone: true, selector: "generic-star-rating", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, readonly: { classPropertyName: "readonly", publicName: "readonly", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, host: { listeners: { "keydown": "onKeydown($event)", "mouseleave": "onLeave()" }, properties: { "attr.role": "'slider'", "attr.tabindex": "readonly() ? null : 0", "attr.aria-valuemin": "0", "attr.aria-valuemax": "max()", "attr.aria-valuenow": "value()", "attr.aria-label": "label() || null" } }, ngImport: i0, template: "<div class=\"stars size-{{ size() }}\" [class.readonly]=\"readonly()\">\n  @for (star of stars(); track star) {\n  <button\n    type=\"button\"\n    class=\"star\"\n    [class.filled]=\"star <= previewValue()\"\n    [disabled]=\"readonly()\"\n    [tabindex]=\"-1\"\n    [attr.aria-hidden]=\"true\"\n    (mouseenter)=\"onHover(star)\"\n    (click)=\"onClick(star)\"\n  >\n    <generic-icon name=\"star\" [size]=\"starPx()\" />\n  </button>\n  }\n</div>\n", styles: [":host{display:inline-flex;outline:none;border-radius:2px}:host(:focus-visible){box-shadow:0 0 0 3px var(--focus-glow)}.stars{display:inline-flex;align-items:center;gap:.2rem}.size-sm{gap:.15rem}.size-lg{gap:.3rem}.star{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:transparent;color:var(--accent-gold);cursor:pointer;opacity:.3;filter:grayscale(60%);transition:opacity .1s ease,filter .1s ease,transform .08s ease}.star.filled{opacity:1;filter:none}.stars:not(.readonly) .star:hover{transform:scale(1.1)}.readonly .star{cursor:default}.star:disabled{cursor:default}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStarRating, decorators: [{
            type: Component,
            args: [{ selector: 'generic-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], host: {
                        '[attr.role]': "'slider'",
                        '[attr.tabindex]': 'readonly() ? null : 0',
                        '[attr.aria-valuemin]': '0',
                        '[attr.aria-valuemax]': 'max()',
                        '[attr.aria-valuenow]': 'value()',
                        '[attr.aria-label]': 'label() || null',
                        '(keydown)': 'onKeydown($event)',
                        '(mouseleave)': 'onLeave()',
                    }, template: "<div class=\"stars size-{{ size() }}\" [class.readonly]=\"readonly()\">\n  @for (star of stars(); track star) {\n  <button\n    type=\"button\"\n    class=\"star\"\n    [class.filled]=\"star <= previewValue()\"\n    [disabled]=\"readonly()\"\n    [tabindex]=\"-1\"\n    [attr.aria-hidden]=\"true\"\n    (mouseenter)=\"onHover(star)\"\n    (click)=\"onClick(star)\"\n  >\n    <generic-icon name=\"star\" [size]=\"starPx()\" />\n  </button>\n  }\n</div>\n", styles: [":host{display:inline-flex;outline:none;border-radius:2px}:host(:focus-visible){box-shadow:0 0 0 3px var(--focus-glow)}.stars{display:inline-flex;align-items:center;gap:.2rem}.size-sm{gap:.15rem}.size-lg{gap:.3rem}.star{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:transparent;color:var(--accent-gold);cursor:pointer;opacity:.3;filter:grayscale(60%);transition:opacity .1s ease,filter .1s ease,transform .08s ease}.star.filled{opacity:1;filter:none}.stars:not(.readonly) .star:hover{transform:scale(1.1)}.readonly .star{cursor:default}.star:disabled{cursor:default}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], readonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

let uid = 0;
class GenericMultipleChoice {
    question = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "question" }] : /* istanbul ignore next */ []));
    options = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    value = model(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    showResult = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showResult" }] : /* istanbul ignore next */ []));
    correctOptionId = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "correctOptionId" }] : /* istanbul ignore next */ []));
    name = `generic-multiple-choice-${++uid}`;
    questionId = `${this.name}-question`;
    resultTone = computed(() => {
        const map = {};
        if (!this.showResult())
            return map;
        const selected = this.value();
        const correct = this.correctOptionId();
        for (const option of this.options()) {
            if (option.id === correct) {
                map[option.id] = 'correct';
            }
            else if (option.id === selected) {
                map[option.id] = 'incorrect';
            }
            else {
                map[option.id] = null;
            }
        }
        return map;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resultTone" }] : /* istanbul ignore next */ []));
    optionId(option) {
        return `${this.name}-${option.id}`;
    }
    isDisabled(option) {
        return this.disabled() || !!option.disabled;
    }
    select(option) {
        if (this.isDisabled(option))
            return;
        this.value.set(option.id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericMultipleChoice, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericMultipleChoice, isStandalone: true, selector: "generic-multiple-choice", inputs: { question: { classPropertyName: "question", publicName: "question", isSignal: true, isRequired: true, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, showResult: { classPropertyName: "showResult", publicName: "showResult", isSignal: true, isRequired: false, transformFunction: null }, correctOptionId: { classPropertyName: "correctOptionId", publicName: "correctOptionId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div class=\"widget\" [class.disabled]=\"disabled()\">\n  <p class=\"question\" [id]=\"questionId\">{{ question() }}</p>\n\n  <div class=\"group\" role=\"radiogroup\" [attr.aria-labelledby]=\"questionId\">\n    @for (option of options(); track option.id) {\n    <label\n      class=\"row\"\n      [class.disabled]=\"isDisabled(option)\"\n      [class.correct]=\"resultTone()[option.id] === 'correct'\"\n      [class.incorrect]=\"resultTone()[option.id] === 'incorrect'\"\n    >\n      <span class=\"box\" [class.on]=\"value() === option.id\">\n        <input\n          type=\"radio\"\n          [id]=\"optionId(option)\"\n          [name]=\"name\"\n          [value]=\"option.id\"\n          [checked]=\"value() === option.id\"\n          [disabled]=\"isDisabled(option)\"\n          (change)=\"select(option)\"\n        />\n        <span class=\"dot\" aria-hidden=\"true\"></span>\n      </span>\n      <span class=\"text\">{{ option.label }}</span>\n    </label>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;text-align:left}.widget.disabled{opacity:.7}.question{font-family:var(--font-arcade);font-size:1rem;font-weight:700;color:var(--text-primary);margin:0 0 .75rem}.group{display:flex;flex-direction:column;gap:.6rem}.row{display:flex;align-items:flex-start;gap:.65rem;padding:.5rem .6rem;border:2px solid var(--border-subtle);border-radius:2px;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.row.correct{border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.row.incorrect{border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:1px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:50%;cursor:inherit}.box.on input{border-color:var(--accent-secondary-fill)}.dot{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .dot{opacity:1}.dot:before{content:\"\";position:absolute;left:4px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--accent-secondary-fill)}.row.correct .dot:before,.row.correct .box input{background:var(--accent-success-fill);border-color:var(--accent-success-fill)}.row.incorrect .dot:before,.row.incorrect .box input{background:var(--accent-danger-fill);border-color:var(--accent-danger-fill)}.text{font-family:var(--font-arcade);font-size:.95rem;color:var(--text-primary)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericMultipleChoice, decorators: [{
            type: Component,
            args: [{ selector: 'generic-multiple-choice', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"widget\" [class.disabled]=\"disabled()\">\n  <p class=\"question\" [id]=\"questionId\">{{ question() }}</p>\n\n  <div class=\"group\" role=\"radiogroup\" [attr.aria-labelledby]=\"questionId\">\n    @for (option of options(); track option.id) {\n    <label\n      class=\"row\"\n      [class.disabled]=\"isDisabled(option)\"\n      [class.correct]=\"resultTone()[option.id] === 'correct'\"\n      [class.incorrect]=\"resultTone()[option.id] === 'incorrect'\"\n    >\n      <span class=\"box\" [class.on]=\"value() === option.id\">\n        <input\n          type=\"radio\"\n          [id]=\"optionId(option)\"\n          [name]=\"name\"\n          [value]=\"option.id\"\n          [checked]=\"value() === option.id\"\n          [disabled]=\"isDisabled(option)\"\n          (change)=\"select(option)\"\n        />\n        <span class=\"dot\" aria-hidden=\"true\"></span>\n      </span>\n      <span class=\"text\">{{ option.label }}</span>\n    </label>\n    }\n  </div>\n</div>\n", styles: [":host{display:block;text-align:left}.widget.disabled{opacity:.7}.question{font-family:var(--font-arcade);font-size:1rem;font-weight:700;color:var(--text-primary);margin:0 0 .75rem}.group{display:flex;flex-direction:column;gap:.6rem}.row{display:flex;align-items:flex-start;gap:.65rem;padding:.5rem .6rem;border:2px solid var(--border-subtle);border-radius:2px;cursor:pointer}.row.disabled{opacity:.5;cursor:not-allowed}.row.correct{border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}.row.incorrect{border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}.box{position:relative;width:20px;height:20px;flex-shrink:0;margin-top:1px}.box input{appearance:none;width:20px;height:20px;margin:0;background:var(--bg-app);border:2px solid var(--accent-secondary);border-radius:50%;cursor:inherit}.box.on input{border-color:var(--accent-secondary-fill)}.dot{position:absolute;inset:0;opacity:0;pointer-events:none}.box.on .dot{opacity:1}.dot:before{content:\"\";position:absolute;left:4px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--accent-secondary-fill)}.row.correct .dot:before,.row.correct .box input{background:var(--accent-success-fill);border-color:var(--accent-success-fill)}.row.incorrect .dot:before,.row.incorrect .box input{background:var(--accent-danger-fill);border-color:var(--accent-danger-fill)}.text{font-family:var(--font-arcade);font-size:.95rem;color:var(--text-primary)}\n"] }]
        }], propDecorators: { question: [{ type: i0.Input, args: [{ isSignal: true, alias: "question", required: true }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], showResult: [{ type: i0.Input, args: [{ isSignal: true, alias: "showResult", required: false }] }], correctOptionId: [{ type: i0.Input, args: [{ isSignal: true, alias: "correctOptionId", required: false }] }] } });

class GenericCourseOutline {
    modules = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "modules" }] : /* istanbul ignore next */ []));
    activeLessonId = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeLessonId" }] : /* istanbul ignore next */ []));
    lessonClick = output();
    /** Modules start expanded by default; collapsing is tracked as an exception set. */
    collapsedIds = signal(new Set(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "collapsedIds" }] : /* istanbul ignore next */ []));
    isExpanded(module) {
        return !this.collapsedIds().has(module.id);
    }
    toggleModule(module) {
        const next = new Set(this.collapsedIds());
        if (next.has(module.id)) {
            next.delete(module.id);
        }
        else {
            next.add(module.id);
        }
        this.collapsedIds.set(next);
    }
    onLessonClick(module, lesson) {
        if (lesson.locked)
            return;
        this.lessonClick.emit({ module, lesson });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseOutline, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericCourseOutline, isStandalone: true, selector: "generic-course-outline", inputs: { modules: { classPropertyName: "modules", publicName: "modules", isSignal: true, isRequired: false, transformFunction: null }, activeLessonId: { classPropertyName: "activeLessonId", publicName: "activeLessonId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { lessonClick: "lessonClick" }, ngImport: i0, template: "<ul class=\"modules\">\n  @for (module of modules(); track module.id) {\n  <li class=\"module\">\n    <button\n      type=\"button\"\n      class=\"header\"\n      [attr.aria-expanded]=\"isExpanded(module)\"\n      [attr.aria-controls]=\"module.id + '-lessons'\"\n      (click)=\"toggleModule(module)\"\n    >\n      <span class=\"chevron\" [class.open]=\"isExpanded(module)\" aria-hidden=\"true\"></span>\n      <span class=\"label\">{{ module.label }}</span>\n    </button>\n\n    @if (isExpanded(module)) {\n    <ul class=\"lessons\" [id]=\"module.id + '-lessons'\">\n      @for (lesson of module.lessons; track lesson.id) {\n      <li>\n        <button\n          type=\"button\"\n          class=\"lesson\"\n          [class.active]=\"activeLessonId() === lesson.id\"\n          [class.locked]=\"lesson.locked\"\n          [disabled]=\"lesson.locked\"\n          [attr.aria-disabled]=\"lesson.locked ? 'true' : null\"\n          [attr.aria-current]=\"activeLessonId() === lesson.id ? 'true' : null\"\n          (click)=\"onLessonClick(module, lesson)\"\n        >\n          @if (lesson.completed) {\n          <generic-icon name=\"check\" [size]=\"14\" class=\"status\" />\n          } @else if (lesson.locked) {\n          <generic-icon name=\"lock\" [size]=\"14\" class=\"status\" />\n          } @else {\n          <span class=\"status dot\" aria-hidden=\"true\"></span>\n          }\n          <span class=\"label\">{{ lesson.label }}</span>\n        </button>\n      </li>\n      }\n    </ul>\n    }\n  </li>\n  }\n</ul>\n", styles: [":host{display:block;text-align:left}.modules{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.1rem}.header{display:flex;align-items:center;gap:.45rem;width:100%;background:transparent;border:0;border-radius:6px;padding:.48rem .55rem;cursor:pointer;font-family:var(--font-arcade);font-weight:600;color:var(--text-primary)}.header:hover{background:color-mix(in srgb,var(--bg-surface-alt) 80%,transparent);color:var(--accent-secondary)}.chevron{width:6px;height:6px;flex-shrink:0;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(-45deg);transition:transform .15s ease}.chevron.open{transform:rotate(45deg) translate(-1px,-1px)}.header .label{font-size:.82rem}.lessons{list-style:none;margin:.25rem 0 0;padding:0 0 0 1rem;display:flex;flex-direction:column;gap:.2rem;border-left:2px solid var(--border-subtle)}.lesson{display:flex;align-items:center;gap:.45rem;width:100%;background:transparent;border:0;border-radius:6px;padding:.38rem .55rem;cursor:pointer;font-family:var(--font-arcade);font-size:.78rem;color:var(--text-primary);text-align:left}.lesson:hover:not(:disabled){background:var(--bg-surface-alt)}.lesson.active{background:color-mix(in srgb,var(--accent-secondary-fill) 16%,transparent);box-shadow:inset 3px 0 0 var(--accent-secondary);color:var(--accent-secondary)}.lesson.locked{opacity:.5;cursor:not-allowed}.status{flex-shrink:0}.status.dot{width:8px;height:8px;border-radius:50%;background:var(--border-subtle)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseOutline, decorators: [{
            type: Component,
            args: [{ selector: 'generic-course-outline', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<ul class=\"modules\">\n  @for (module of modules(); track module.id) {\n  <li class=\"module\">\n    <button\n      type=\"button\"\n      class=\"header\"\n      [attr.aria-expanded]=\"isExpanded(module)\"\n      [attr.aria-controls]=\"module.id + '-lessons'\"\n      (click)=\"toggleModule(module)\"\n    >\n      <span class=\"chevron\" [class.open]=\"isExpanded(module)\" aria-hidden=\"true\"></span>\n      <span class=\"label\">{{ module.label }}</span>\n    </button>\n\n    @if (isExpanded(module)) {\n    <ul class=\"lessons\" [id]=\"module.id + '-lessons'\">\n      @for (lesson of module.lessons; track lesson.id) {\n      <li>\n        <button\n          type=\"button\"\n          class=\"lesson\"\n          [class.active]=\"activeLessonId() === lesson.id\"\n          [class.locked]=\"lesson.locked\"\n          [disabled]=\"lesson.locked\"\n          [attr.aria-disabled]=\"lesson.locked ? 'true' : null\"\n          [attr.aria-current]=\"activeLessonId() === lesson.id ? 'true' : null\"\n          (click)=\"onLessonClick(module, lesson)\"\n        >\n          @if (lesson.completed) {\n          <generic-icon name=\"check\" [size]=\"14\" class=\"status\" />\n          } @else if (lesson.locked) {\n          <generic-icon name=\"lock\" [size]=\"14\" class=\"status\" />\n          } @else {\n          <span class=\"status dot\" aria-hidden=\"true\"></span>\n          }\n          <span class=\"label\">{{ lesson.label }}</span>\n        </button>\n      </li>\n      }\n    </ul>\n    }\n  </li>\n  }\n</ul>\n", styles: [":host{display:block;text-align:left}.modules{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.1rem}.header{display:flex;align-items:center;gap:.45rem;width:100%;background:transparent;border:0;border-radius:6px;padding:.48rem .55rem;cursor:pointer;font-family:var(--font-arcade);font-weight:600;color:var(--text-primary)}.header:hover{background:color-mix(in srgb,var(--bg-surface-alt) 80%,transparent);color:var(--accent-secondary)}.chevron{width:6px;height:6px;flex-shrink:0;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(-45deg);transition:transform .15s ease}.chevron.open{transform:rotate(45deg) translate(-1px,-1px)}.header .label{font-size:.82rem}.lessons{list-style:none;margin:.25rem 0 0;padding:0 0 0 1rem;display:flex;flex-direction:column;gap:.2rem;border-left:2px solid var(--border-subtle)}.lesson{display:flex;align-items:center;gap:.45rem;width:100%;background:transparent;border:0;border-radius:6px;padding:.38rem .55rem;cursor:pointer;font-family:var(--font-arcade);font-size:.78rem;color:var(--text-primary);text-align:left}.lesson:hover:not(:disabled){background:var(--bg-surface-alt)}.lesson.active{background:color-mix(in srgb,var(--accent-secondary-fill) 16%,transparent);box-shadow:inset 3px 0 0 var(--accent-secondary);color:var(--accent-secondary)}.lesson.locked{opacity:.5;cursor:not-allowed}.status{flex-shrink:0}.status.dot{width:8px;height:8px;border-radius:50%;background:var(--border-subtle)}\n"] }]
        }], propDecorators: { modules: [{ type: i0.Input, args: [{ isSignal: true, alias: "modules", required: false }] }], activeLessonId: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeLessonId", required: false }] }], lessonClick: [{ type: i0.Output, args: ["lessonClick"] }] } });

class GenericRubricPanel {
    criteria = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "criteria" }] : /* istanbul ignore next */ []));
    readonly = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "readonly" }] : /* istanbul ignore next */ []));
    levelSelect = output();
    /** Public: sum of each criterion's currently-selected level points (0 if none selected). */
    totalPoints = computed(() => this.criteria().reduce((sum, criterion) => {
        const index = criterion.selectedLevelIndex;
        if (index == null || index < 0)
            return sum;
        const level = criterion.levels[index];
        return sum + (level ? level.points : 0);
    }, 0), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPoints" }] : /* istanbul ignore next */ []));
    isSelected(criterion, levelIndex) {
        return criterion.selectedLevelIndex === levelIndex;
    }
    onLevelClick(criterion, levelIndex) {
        if (this.readonly())
            return;
        this.levelSelect.emit({ criterion, levelIndex });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericRubricPanel, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericRubricPanel, isStandalone: true, selector: "generic-rubric-panel", inputs: { criteria: { classPropertyName: "criteria", publicName: "criteria", isSignal: true, isRequired: false, transformFunction: null }, readonly: { classPropertyName: "readonly", publicName: "readonly", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { levelSelect: "levelSelect" }, ngImport: i0, template: "<div class=\"panel\">\n  @for (criterion of criteria(); track criterion.id) {\n  <section class=\"criterion\" [attr.aria-label]=\"criterion.label\">\n    <h3 class=\"criterion-label\">{{ criterion.label }}</h3>\n\n    <div class=\"levels\" role=\"radiogroup\" [attr.aria-label]=\"criterion.label + ' - niveles'\">\n      @for (level of criterion.levels; track $index) {\n      <button\n        type=\"button\"\n        role=\"radio\"\n        class=\"level\"\n        [class.selected]=\"isSelected(criterion, $index)\"\n        [class.static]=\"readonly()\"\n        [attr.aria-checked]=\"isSelected(criterion, $index)\"\n        (click)=\"onLevelClick(criterion, $index)\"\n      >\n        <span class=\"level-label\">{{ level.label }}</span>\n        <span class=\"level-points\">{{ level.points }} pts</span>\n        @if (level.description) {\n        <span class=\"level-desc\">{{ level.description }}</span>\n        }\n      </button>\n      }\n    </div>\n  </section>\n  }\n\n  <div class=\"total\">\n    <span class=\"total-label\">Total</span>\n    <span class=\"total-points\">{{ totalPoints() }} pts</span>\n  </div>\n</div>\n", styles: [":host{display:block;text-align:left}.panel{display:flex;flex-direction:column;gap:.9rem}.criterion{display:flex;flex-direction:column;gap:.5rem;padding:.75rem;background:var(--bg-surface);border:2px solid var(--border-subtle)}.criterion-label{margin:0;font-family:var(--font-arcade);font-size:.95rem;font-weight:700;color:var(--text-primary)}.levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:.5rem}.level{display:flex;flex-direction:column;gap:.2rem;text-align:left;background:var(--bg-surface-alt);border:2px solid var(--border-subtle);padding:.5rem .6rem;cursor:pointer;color:var(--text-primary);font-family:var(--font-arcade)}.level:not(.static):hover{border-color:var(--accent-secondary)}.level.static{cursor:default}.level.static:hover{border-color:var(--border-subtle)}.level.selected{border-color:var(--accent-secondary-fill);background:color-mix(in srgb,var(--accent-secondary) 15%,transparent)}.level-label{font-size:.85rem;font-weight:700}.level-points{font-size:.8rem;color:var(--accent-gold)}.level-desc{font-size:.75rem;color:var(--text-muted)}.total{display:flex;align-items:center;justify-content:flex-end;gap:.5rem;padding-top:.5rem;border-top:2px solid var(--border-subtle);font-family:var(--font-arcade)}.total-label{font-size:.85rem;color:var(--text-muted)}.total-points{font-size:1.1rem;font-weight:700;color:var(--accent-gold)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericRubricPanel, decorators: [{
            type: Component,
            args: [{ selector: 'generic-rubric-panel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"panel\">\n  @for (criterion of criteria(); track criterion.id) {\n  <section class=\"criterion\" [attr.aria-label]=\"criterion.label\">\n    <h3 class=\"criterion-label\">{{ criterion.label }}</h3>\n\n    <div class=\"levels\" role=\"radiogroup\" [attr.aria-label]=\"criterion.label + ' - niveles'\">\n      @for (level of criterion.levels; track $index) {\n      <button\n        type=\"button\"\n        role=\"radio\"\n        class=\"level\"\n        [class.selected]=\"isSelected(criterion, $index)\"\n        [class.static]=\"readonly()\"\n        [attr.aria-checked]=\"isSelected(criterion, $index)\"\n        (click)=\"onLevelClick(criterion, $index)\"\n      >\n        <span class=\"level-label\">{{ level.label }}</span>\n        <span class=\"level-points\">{{ level.points }} pts</span>\n        @if (level.description) {\n        <span class=\"level-desc\">{{ level.description }}</span>\n        }\n      </button>\n      }\n    </div>\n  </section>\n  }\n\n  <div class=\"total\">\n    <span class=\"total-label\">Total</span>\n    <span class=\"total-points\">{{ totalPoints() }} pts</span>\n  </div>\n</div>\n", styles: [":host{display:block;text-align:left}.panel{display:flex;flex-direction:column;gap:.9rem}.criterion{display:flex;flex-direction:column;gap:.5rem;padding:.75rem;background:var(--bg-surface);border:2px solid var(--border-subtle)}.criterion-label{margin:0;font-family:var(--font-arcade);font-size:.95rem;font-weight:700;color:var(--text-primary)}.levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:.5rem}.level{display:flex;flex-direction:column;gap:.2rem;text-align:left;background:var(--bg-surface-alt);border:2px solid var(--border-subtle);padding:.5rem .6rem;cursor:pointer;color:var(--text-primary);font-family:var(--font-arcade)}.level:not(.static):hover{border-color:var(--accent-secondary)}.level.static{cursor:default}.level.static:hover{border-color:var(--border-subtle)}.level.selected{border-color:var(--accent-secondary-fill);background:color-mix(in srgb,var(--accent-secondary) 15%,transparent)}.level-label{font-size:.85rem;font-weight:700}.level-points{font-size:.8rem;color:var(--accent-gold)}.level-desc{font-size:.75rem;color:var(--text-muted)}.total{display:flex;align-items:center;justify-content:flex-end;gap:.5rem;padding-top:.5rem;border-top:2px solid var(--border-subtle);font-family:var(--font-arcade)}.total-label{font-size:.85rem;color:var(--text-muted)}.total-points{font-size:1.1rem;font-weight:700;color:var(--accent-gold)}\n"] }]
        }], propDecorators: { criteria: [{ type: i0.Input, args: [{ isSignal: true, alias: "criteria", required: false }] }], readonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], levelSelect: [{ type: i0.Output, args: ["levelSelect"] }] } });

const TONE_BY_STATUS$1 = {
    'not-started': 'neutral',
    'in-progress': 'cyan',
    completed: 'green',
    overdue: 'red',
};
const LABEL_BY_STATUS$1 = {
    'not-started': 'No iniciado',
    'in-progress': 'En progreso',
    completed: 'Completado',
    overdue: 'Atrasado',
};
class GenericActivityStatusBadge {
    status = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    tone = computed(() => TONE_BY_STATUS$1[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    label = computed(() => LABEL_BY_STATUS$1[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericActivityStatusBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericActivityStatusBadge, isStandalone: true, selector: "generic-activity-status-badge", inputs: { status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n", styles: [""], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericActivityStatusBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-activity-status-badge', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge], template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n" }]
        }], propDecorators: { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

const TONE_BY_KIND = {
    reading: 'neutral',
    video: 'cyan',
    quiz: 'gold',
    assignment: 'magenta',
    discussion: 'green',
};
const LABEL_BY_KIND = {
    reading: 'Lectura',
    video: 'Video',
    quiz: 'Quiz',
    assignment: 'Tarea',
    discussion: 'Discusión',
};
class GenericActivityKindBadge {
    kind = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "kind" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    tone = computed(() => TONE_BY_KIND[this.kind()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    label = computed(() => LABEL_BY_KIND[this.kind()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericActivityKindBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericActivityKindBadge, isStandalone: true, selector: "generic-activity-kind-badge", inputs: { kind: { classPropertyName: "kind", publicName: "kind", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n", styles: [""], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericActivityKindBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-activity-kind-badge', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge], template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n" }]
        }], propDecorators: { kind: [{ type: i0.Input, args: [{ isSignal: true, alias: "kind", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

const TONE_BY_STATUS = {
    draft: 'neutral',
    published: 'green',
    archived: 'red',
};
const LABEL_BY_STATUS = {
    draft: 'Borrador',
    published: 'Publicado',
    archived: 'Archivado',
};
class GenericCourseStatusBadge {
    status = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    tone = computed(() => TONE_BY_STATUS[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    label = computed(() => LABEL_BY_STATUS[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseStatusBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericCourseStatusBadge, isStandalone: true, selector: "generic-course-status-badge", inputs: { status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n", styles: [""], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseStatusBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-course-status-badge', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge], template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\">{{ label() }}</generic-badge>\n" }]
        }], propDecorators: { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class GenericGradeBadge {
    score = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "score" }] : /* istanbul ignore next */ []));
    passingThreshold = input(60, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "passingThreshold" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    tone = computed(() => {
        const score = this.score();
        const threshold = this.passingThreshold();
        if (score >= threshold)
            return 'green';
        if (score >= threshold * 0.7)
            return 'gold';
        return 'red';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericGradeBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericGradeBadge, isStandalone: true, selector: "generic-grade-badge", inputs: { score: { classPropertyName: "score", publicName: "score", isSignal: true, isRequired: true, transformFunction: null }, passingThreshold: { classPropertyName: "passingThreshold", publicName: "passingThreshold", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\" [attr.aria-label]=\"'Calificaci\u00F3n ' + score() + '%'\"\n  >{{ score() }}%</generic-badge\n>\n", styles: [""], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericGradeBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-grade-badge', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge], template: "<generic-badge [tone]=\"tone()\" [size]=\"size()\" [attr.aria-label]=\"'Calificaci\u00F3n ' + score() + '%'\"\n  >{{ score() }}%</generic-badge\n>\n" }]
        }], propDecorators: { score: [{ type: i0.Input, args: [{ isSignal: true, alias: "score", required: true }] }], passingThreshold: [{ type: i0.Input, args: [{ isSignal: true, alias: "passingThreshold", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

const TONE_BY_DIFFICULTY = {
    beginner: 'green',
    intermediate: 'gold',
    advanced: 'red',
};
const LABEL_BY_DIFFICULTY = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
};
class GenericCourseMetaBadges {
    difficulty = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "difficulty" }] : /* istanbul ignore next */ []));
    durationLabel = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "durationLabel" }] : /* istanbul ignore next */ []));
    status = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    difficultyTone = computed(() => {
        const difficulty = this.difficulty();
        return difficulty ? TONE_BY_DIFFICULTY[difficulty] : undefined;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "difficultyTone" }] : /* istanbul ignore next */ []));
    difficultyLabel = computed(() => {
        const difficulty = this.difficulty();
        return difficulty ? LABEL_BY_DIFFICULTY[difficulty] : '';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "difficultyLabel" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseMetaBadges, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericCourseMetaBadges, isStandalone: true, selector: "generic-course-meta-badges", inputs: { difficulty: { classPropertyName: "difficulty", publicName: "difficulty", isSignal: true, isRequired: false, transformFunction: null }, durationLabel: { classPropertyName: "durationLabel", publicName: "durationLabel", isSignal: true, isRequired: false, transformFunction: null }, status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"course-meta-badges\">\n  @if (difficulty()) {\n  <generic-badge [tone]=\"difficultyTone()!\" [size]=\"size()\">{{ difficultyLabel() }}</generic-badge>\n  } @if (durationLabel()) {\n  <generic-badge tone=\"neutral\" [size]=\"size()\">{{ durationLabel() }}</generic-badge>\n  } @if (status()) {\n  <generic-course-status-badge [status]=\"status()!\" [size]=\"size()\" />\n  }\n</div>\n", styles: [".course-meta-badges{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}\n"], dependencies: [{ kind: "component", type: GenericBadge, selector: "generic-badge", inputs: ["tone", "appearance", "size"] }, { kind: "component", type: GenericCourseStatusBadge, selector: "generic-course-status-badge", inputs: ["status", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCourseMetaBadges, decorators: [{
            type: Component,
            args: [{ selector: 'generic-course-meta-badges', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericBadge, GenericCourseStatusBadge], template: "<div class=\"course-meta-badges\">\n  @if (difficulty()) {\n  <generic-badge [tone]=\"difficultyTone()!\" [size]=\"size()\">{{ difficultyLabel() }}</generic-badge>\n  } @if (durationLabel()) {\n  <generic-badge tone=\"neutral\" [size]=\"size()\">{{ durationLabel() }}</generic-badge>\n  } @if (status()) {\n  <generic-course-status-badge [status]=\"status()!\" [size]=\"size()\" />\n  }\n</div>\n", styles: [".course-meta-badges{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}\n"] }]
        }], propDecorators: { difficulty: [{ type: i0.Input, args: [{ isSignal: true, alias: "difficulty", required: false }] }], durationLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "durationLabel", required: false }] }], status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class GenericXpBar {
    currentXp = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentXp" }] : /* istanbul ignore next */ []));
    levelXp = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "levelXp" }] : /* istanbul ignore next */ []));
    level = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []));
    tone = input('gold', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    caption = input('XP', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "caption" }] : /* istanbul ignore next */ []));
    ariaLabel = computed(() => `Experiencia: ${this.currentXp()} de ${this.levelXp()}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericXpBar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericXpBar, isStandalone: true, selector: "generic-xp-bar", inputs: { currentXp: { classPropertyName: "currentXp", publicName: "currentXp", isSignal: true, isRequired: true, transformFunction: null }, levelXp: { classPropertyName: "levelXp", publicName: "levelXp", isSignal: true, isRequired: true, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, caption: { classPropertyName: "caption", publicName: "caption", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"wrap\" [attr.aria-label]=\"ariaLabel()\">\n  @if (level() !== null) {\n  <span class=\"level-tag\">Nivel {{ level() }}</span>\n  }\n  <generic-progress\n    class=\"bar\"\n    [value]=\"currentXp()\"\n    [max]=\"levelXp()\"\n    [tone]=\"tone()\"\n    [label]=\"caption()\"\n    [showValue]=\"true\"\n  />\n</div>\n", styles: [":host{display:block;width:100%}.wrap{display:flex;align-items:center;gap:.6rem}.level-tag{flex-shrink:0;font-family:var(--font-arcade);font-size:.8rem;font-weight:700;color:var(--accent-gold);white-space:nowrap}.bar{flex:1}\n"], dependencies: [{ kind: "component", type: GenericProgress, selector: "generic-progress", inputs: ["value", "max", "tone", "size", "label", "showValue", "showPercent", "segmented", "hearts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericXpBar, decorators: [{
            type: Component,
            args: [{ selector: 'generic-xp-bar', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericProgress], template: "<div class=\"wrap\" [attr.aria-label]=\"ariaLabel()\">\n  @if (level() !== null) {\n  <span class=\"level-tag\">Nivel {{ level() }}</span>\n  }\n  <generic-progress\n    class=\"bar\"\n    [value]=\"currentXp()\"\n    [max]=\"levelXp()\"\n    [tone]=\"tone()\"\n    [label]=\"caption()\"\n    [showValue]=\"true\"\n  />\n</div>\n", styles: [":host{display:block;width:100%}.wrap{display:flex;align-items:center;gap:.6rem}.level-tag{flex-shrink:0;font-family:var(--font-arcade);font-size:.8rem;font-weight:700;color:var(--accent-gold);white-space:nowrap}.bar{flex:1}\n"] }]
        }], propDecorators: { currentXp: [{ type: i0.Input, args: [{ isSignal: true, alias: "currentXp", required: true }] }], levelXp: [{ type: i0.Input, args: [{ isSignal: true, alias: "levelXp", required: true }] }], level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }], caption: [{ type: i0.Input, args: [{ isSignal: true, alias: "caption", required: false }] }] } });

class GenericCoinCounter {
    count = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "count" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    ariaLabel = computed(() => `Monedas: ${this.count()}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    iconPx = computed(() => {
        if (this.size() === 'sm')
            return 16;
        if (this.size() === 'lg')
            return 28;
        return 22;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "iconPx" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCoinCounter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericCoinCounter, isStandalone: true, selector: "generic-coin-counter", inputs: { count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.role": "'status'", "attr.aria-label": "ariaLabel()" } }, ngImport: i0, template: "<div class=\"wrap size-{{ size() }}\">\n  <generic-icon name=\"coin\" [size]=\"iconPx()\" />\n  <span class=\"count\">{{ count() }}</span>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);font-weight:700;color:var(--accent-gold)}.size-sm{font-size:.8rem}.size-md{font-size:1rem}.size-lg{font-size:1.3rem}.count{color:var(--text-primary)}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericCoinCounter, decorators: [{
            type: Component,
            args: [{ selector: 'generic-coin-counter', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], host: {
                        '[attr.role]': "'status'",
                        '[attr.aria-label]': 'ariaLabel()',
                    }, template: "<div class=\"wrap size-{{ size() }}\">\n  <generic-icon name=\"coin\" [size]=\"iconPx()\" />\n  <span class=\"count\">{{ count() }}</span>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--font-arcade);font-weight:700;color:var(--accent-gold)}.size-sm{font-size:.8rem}.size-md{font-size:1rem}.size-lg{font-size:1.3rem}.count{color:var(--text-primary)}\n"] }]
        }], propDecorators: { count: [{ type: i0.Input, args: [{ isSignal: true, alias: "count", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class GenericStreakFlame {
    days = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "days" }] : /* istanbul ignore next */ []));
    active = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "active" }] : /* istanbul ignore next */ []));
    ariaLabel = computed(() => this.active() ? `Racha de ${this.days()} días` : 'Racha perdida', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStreakFlame, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericStreakFlame, isStandalone: true, selector: "generic-streak-flame", inputs: { days: { classPropertyName: "days", publicName: "days", isSignal: true, isRequired: true, transformFunction: null }, active: { classPropertyName: "active", publicName: "active", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.role": "'status'", "attr.aria-label": "ariaLabel()", "class.inactive": "!active()" } }, ngImport: i0, template: "<div class=\"wrap\">\n  <generic-icon name=\"fire\" [size]=\"22\" />\n  <span class=\"days\">{{ days() }}</span>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.3rem;font-family:var(--font-arcade);font-weight:700;font-size:1rem;color:var(--accent-danger)}.days{color:var(--text-primary)}:host.inactive .wrap{color:var(--text-muted);filter:grayscale(1);opacity:.6}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericStreakFlame, decorators: [{
            type: Component,
            args: [{ selector: 'generic-streak-flame', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], host: {
                        '[attr.role]': "'status'",
                        '[attr.aria-label]': 'ariaLabel()',
                        '[class.inactive]': '!active()',
                    }, template: "<div class=\"wrap\">\n  <generic-icon name=\"fire\" [size]=\"22\" />\n  <span class=\"days\">{{ days() }}</span>\n</div>\n", styles: [":host{display:inline-flex}.wrap{display:inline-flex;align-items:center;gap:.3rem;font-family:var(--font-arcade);font-weight:700;font-size:1rem;color:var(--accent-danger)}.days{color:var(--text-primary)}:host.inactive .wrap{color:var(--text-muted);filter:grayscale(1);opacity:.6}\n"] }]
        }], propDecorators: { days: [{ type: i0.Input, args: [{ isSignal: true, alias: "days", required: true }] }], active: [{ type: i0.Input, args: [{ isSignal: true, alias: "active", required: false }] }] } });

class GenericLevelBadge {
    level = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    tone = input('gold', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []));
    ariaLabel = computed(() => `Nivel ${this.level()}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    hostClass = computed(() => `tone-${this.tone()} size-${this.size()}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericLevelBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: GenericLevelBadge, isStandalone: true, selector: "generic-level-badge", inputs: { level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.aria-label": "ariaLabel()", "class": "hostClass()" } }, ngImport: i0, template: "<span class=\"prefix\">Nivel</span><span class=\"number\">{{ level() }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;flex-direction:column;border-radius:50%;border:2px solid;font-family:var(--font-arcade);font-weight:700;line-height:1;text-align:center}:host.size-sm{width:2rem;height:2rem}:host.size-md{width:2.75rem;height:2.75rem}:host.size-lg{width:3.5rem;height:3.5rem}.prefix{font-size:.55em;letter-spacing:0;opacity:.85}.number{font-size:.95em}:host.size-sm .prefix{font-size:.5em}:host.tone-cyan{color:var(--accent-secondary);border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}:host.tone-magenta{color:var(--accent-primary);border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}:host.tone-gold{color:var(--accent-gold);border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}:host.tone-green{color:var(--accent-success);border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}:host.tone-red{color:var(--accent-danger);border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}:host.tone-neutral{color:var(--text-primary);border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericLevelBadge, decorators: [{
            type: Component,
            args: [{ selector: 'generic-level-badge', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-label]': 'ariaLabel()',
                        '[class]': 'hostClass()',
                    }, template: "<span class=\"prefix\">Nivel</span><span class=\"number\">{{ level() }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;flex-direction:column;border-radius:50%;border:2px solid;font-family:var(--font-arcade);font-weight:700;line-height:1;text-align:center}:host.size-sm{width:2rem;height:2rem}:host.size-md{width:2.75rem;height:2.75rem}:host.size-lg{width:3.5rem;height:3.5rem}.prefix{font-size:.55em;letter-spacing:0;opacity:.85}.number{font-size:.95em}:host.size-sm .prefix{font-size:.5em}:host.tone-cyan{color:var(--accent-secondary);border-color:var(--accent-secondary);background:color-mix(in srgb,var(--accent-secondary) 12%,transparent)}:host.tone-magenta{color:var(--accent-primary);border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}:host.tone-gold{color:var(--accent-gold);border-color:var(--accent-gold);background:color-mix(in srgb,var(--accent-gold) 12%,transparent)}:host.tone-green{color:var(--accent-success);border-color:var(--accent-success);background:color-mix(in srgb,var(--accent-success) 12%,transparent)}:host.tone-red{color:var(--accent-danger);border-color:var(--accent-danger);background:color-mix(in srgb,var(--accent-danger) 12%,transparent)}:host.tone-neutral{color:var(--text-primary);border-color:var(--border-subtle);background:color-mix(in srgb,var(--bg-surface-alt) 40%,transparent)}\n"] }]
        }], propDecorators: { level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], tone: [{ type: i0.Input, args: [{ isSignal: true, alias: "tone", required: false }] }] } });

class GenericBadgeShowcase {
    badges = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "badges" }] : /* istanbul ignore next */ []));
    badgeClick = output();
    ariaLabelFor(badge) {
        return `Insignia: ${badge.label} (${badge.earned ? 'obtenida' : 'no obtenida'})`;
    }
    onClick(badge) {
        this.badgeClick.emit(badge);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBadgeShowcase, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: GenericBadgeShowcase, isStandalone: true, selector: "generic-badge-showcase", inputs: { badges: { classPropertyName: "badges", publicName: "badges", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { badgeClick: "badgeClick" }, ngImport: i0, template: "<div class=\"grid\">\n  @for (badge of badges(); track badge.id) {\n  <button\n    type=\"button\"\n    class=\"tile\"\n    [class.earned]=\"badge.earned\"\n    [attr.aria-label]=\"ariaLabelFor(badge)\"\n    (click)=\"onClick(badge)\"\n  >\n    <generic-icon [name]=\"badge.iconName\" [size]=\"28\" />\n    <span class=\"label\">{{ badge.label }}</span>\n  </button>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:.75rem}.tile{display:flex;flex-direction:column;align-items:center;gap:.4rem;padding:.75rem .5rem;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:4px;font-family:var(--font-arcade);cursor:pointer;color:var(--text-muted);opacity:.55;filter:grayscale(1);transition:opacity .2s ease,filter .2s ease,border-color .2s ease}.tile:hover{border-color:var(--border-highlight)}.tile:focus-visible{outline:2px solid var(--accent-secondary);outline-offset:2px}.tile.earned{color:var(--text-primary);opacity:1;filter:none;border-color:var(--accent-gold);box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-gold) 40%,transparent)}.label{font-size:.75rem;font-weight:700;text-align:center;line-height:1.2}\n"], dependencies: [{ kind: "component", type: GenericIcon, selector: "generic-icon", inputs: ["name", "size", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: GenericBadgeShowcase, decorators: [{
            type: Component,
            args: [{ selector: 'generic-badge-showcase', changeDetection: ChangeDetectionStrategy.OnPush, imports: [GenericIcon], template: "<div class=\"grid\">\n  @for (badge of badges(); track badge.id) {\n  <button\n    type=\"button\"\n    class=\"tile\"\n    [class.earned]=\"badge.earned\"\n    [attr.aria-label]=\"ariaLabelFor(badge)\"\n    (click)=\"onClick(badge)\"\n  >\n    <generic-icon [name]=\"badge.iconName\" [size]=\"28\" />\n    <span class=\"label\">{{ badge.label }}</span>\n  </button>\n  }\n</div>\n", styles: [":host{display:block;width:100%}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:.75rem}.tile{display:flex;flex-direction:column;align-items:center;gap:.4rem;padding:.75rem .5rem;background:var(--bg-surface);border:2px solid var(--border-subtle);border-radius:4px;font-family:var(--font-arcade);cursor:pointer;color:var(--text-muted);opacity:.55;filter:grayscale(1);transition:opacity .2s ease,filter .2s ease,border-color .2s ease}.tile:hover{border-color:var(--border-highlight)}.tile:focus-visible{outline:2px solid var(--accent-secondary);outline-offset:2px}.tile.earned{color:var(--text-primary);opacity:1;filter:none;border-color:var(--accent-gold);box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-gold) 40%,transparent)}.label{font-size:.75rem;font-weight:700;text-align:center;line-height:1.2}\n"] }]
        }], propDecorators: { badges: [{ type: i0.Input, args: [{ isSignal: true, alias: "badges", required: false }] }], badgeClick: [{ type: i0.Output, args: ["badgeClick"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { GenericActivityKindBadge, GenericActivityStatusBadge, GenericAvatar, GenericBadge, GenericBadgeShowcase, GenericBreadcrumb, GenericButton, GenericCallout, GenericCard, GenericChart, GenericChat, GenericCheckbox, GenericCodeBlock, GenericCoinCounter, GenericCountdownTimer, GenericCourseMetaBadges, GenericCourseModal, GenericCourseOutline, GenericCourseStatusBadge, GenericDashboard, GenericDrawer, GenericDropdown, GenericEmptyState, GenericFileModal, GenericFooter, GenericGradeBadge, GenericIcon, GenericImportButton, GenericInput, GenericLessonHeader, GenericLevelBadge, GenericMathBlock, GenericModal, GenericMultipleChoice, GenericNavbar, GenericProgress, GenericRadioGroup, GenericRubricPanel, GenericSelect, GenericSpinner, GenericStarRating, GenericStat, GenericStepper, GenericStreakFlame, GenericSubtitle, GenericSurvey, GenericSwitch, GenericTable, GenericTabs, GenericText, GenericTextarea, GenericTitle, GenericTooltip, GenericXpBar, SentenceCasePipe, ThemeService };
//# sourceMappingURL=2026-p4-fe-ui.mjs.map
