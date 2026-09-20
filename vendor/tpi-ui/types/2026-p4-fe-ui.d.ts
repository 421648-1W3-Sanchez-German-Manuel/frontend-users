import * as _angular_core from '@angular/core';
import { PipeTransform } from '@angular/core';

declare class SentenceCasePipe implements PipeTransform {
    transform(value: string | null | undefined): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SentenceCasePipe, never>;
    static ɵpipe: _angular_core.ɵɵPipeDeclaration<SentenceCasePipe, "sentenceCase", true>;
}

type ArcadeTone = 'cyan' | 'magenta' | 'gold' | 'green' | 'red' | 'neutral';
type ArcadeSize = 'sm' | 'md' | 'lg';
type ThemeName = 'light' | 'dark';

declare class ThemeService {
    readonly theme: _angular_core.WritableSignal<ThemeName>;
    constructor();
    set(theme: ThemeName): void;
    toggle(): void;
    private readTheme;
    private apply;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<any>;
}

declare class GenericTitle {
    readonly level: _angular_core.InputSignal<1 | 2 | 3>;
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericTitle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericTitle, "generic-title", never, { "level": { "alias": "level"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericSubtitle {
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericSubtitle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericSubtitle, "generic-subtitle", never, { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericText {
    readonly muted: _angular_core.InputSignal<boolean>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericText, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericText, "generic-text", never, { "muted": { "alias": "muted"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type ButtonVariant = 'cyan' | 'magenta' | 'gold' | 'green' | 'ghost';
declare class GenericButton {
    readonly variant: _angular_core.InputSignal<ButtonVariant>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly type: _angular_core.InputSignal<"button" | "submit">;
    readonly disabled: _angular_core.InputSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericButton, "generic-button", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericImportButton {
    readonly accept: _angular_core.InputSignal<string>;
    readonly multiple: _angular_core.InputSignal<boolean>;
    readonly variant: _angular_core.InputSignal<ButtonVariant>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly label: _angular_core.InputSignal<string>;
    readonly filesSelected: _angular_core.OutputEmitterRef<File[]>;
    private readonly fileInput;
    openPicker(): void;
    onChange(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericImportButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericImportButton, "generic-import-button", never, { "accept": { "alias": "accept"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, { "filesSelected": "filesSelected"; }, never, never, true, never>;
}

declare class GenericModal {
    readonly open: _angular_core.ModelSignal<boolean>;
    readonly title: _angular_core.InputSignal<string>;
    readonly subtitle: _angular_core.InputSignal<string>;
    readonly tone: _angular_core.InputSignal<"cyan" | "magenta" | "gold" | "green" | "red">;
    readonly size: _angular_core.InputSignal<"sm" | "md" | "lg" | "xl">;
    readonly dismissable: _angular_core.InputSignal<boolean>;
    readonly closeLabel: _angular_core.InputSignal<string>;
    readonly closed: _angular_core.OutputEmitterRef<void>;
    close(): void;
    onBackdrop(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericModal, "generic-modal", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "dismissable": { "alias": "dismissable"; "required": false; "isSignal": true; }; "closeLabel": { "alias": "closeLabel"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "closed": "closed"; }, never, ["*", "[footer]"], true, never>;
}

declare class GenericFileModal {
    readonly open: _angular_core.ModelSignal<boolean>;
    readonly title: _angular_core.InputSignal<string>;
    readonly subtitle: _angular_core.InputSignal<string>;
    readonly tone: _angular_core.InputSignal<"cyan" | "magenta" | "gold" | "green" | "red">;
    readonly accept: _angular_core.InputSignal<string>;
    readonly multiple: _angular_core.InputSignal<boolean>;
    readonly maxSizeMb: _angular_core.InputSignal<number>;
    readonly files: _angular_core.ModelSignal<File[]>;
    readonly dragging: _angular_core.WritableSignal<boolean>;
    readonly error: _angular_core.WritableSignal<string>;
    onDrag(over: boolean, event: DragEvent): void;
    onDrop(event: DragEvent): void;
    onPick(event: Event): void;
    remove(index: number): void;
    private add;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericFileModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericFileModal, "generic-file-modal", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "accept": { "alias": "accept"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "maxSizeMb": { "alias": "maxSizeMb"; "required": false; "isSignal": true; }; "files": { "alias": "files"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "files": "filesChange"; }, never, ["[footer]"], true, never>;
}

type GenericCourseTone = 'celeste' | 'rosa' | 'naranja' | 'verde' | 'violeta' | 'dorado' | 'magenta';
interface GenericCourseBadge {
    label: string;
    tone?: ArcadeTone;
    appearance?: 'solid' | 'outline';
}

declare class GenericCourseModal {
    readonly open: _angular_core.ModelSignal<boolean>;
    readonly tone: _angular_core.InputSignal<GenericCourseTone>;
    readonly kicker: _angular_core.InputSignal<string>;
    readonly title: _angular_core.InputSignal<string>;
    readonly subtitle: _angular_core.InputSignal<string>;
    readonly lives: _angular_core.InputSignal<number>;
    readonly maxLives: _angular_core.InputSignal<number>;
    readonly coins: _angular_core.InputSignal<number | null>;
    readonly badges: _angular_core.InputSignal<GenericCourseBadge[]>;
    readonly progressLabel: _angular_core.InputSignal<string>;
    readonly progressValue: _angular_core.InputSignal<number>;
    readonly progressMax: _angular_core.InputSignal<number>;
    readonly actionLabel: _angular_core.InputSignal<string>;
    readonly dismissable: _angular_core.InputSignal<boolean>;
    readonly closeLabel: _angular_core.InputSignal<string>;
    readonly actionClick: _angular_core.OutputEmitterRef<void>;
    readonly closed: _angular_core.OutputEmitterRef<void>;
    close(): void;
    onBackdrop(): void;
    onAction(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCourseModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCourseModal, "generic-course-modal", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "kicker": { "alias": "kicker"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "lives": { "alias": "lives"; "required": false; "isSignal": true; }; "maxLives": { "alias": "maxLives"; "required": false; "isSignal": true; }; "coins": { "alias": "coins"; "required": false; "isSignal": true; }; "badges": { "alias": "badges"; "required": false; "isSignal": true; }; "progressLabel": { "alias": "progressLabel"; "required": false; "isSignal": true; }; "progressValue": { "alias": "progressValue"; "required": false; "isSignal": true; }; "progressMax": { "alias": "progressMax"; "required": false; "isSignal": true; }; "actionLabel": { "alias": "actionLabel"; "required": false; "isSignal": true; }; "dismissable": { "alias": "dismissable"; "required": false; "isSignal": true; }; "closeLabel": { "alias": "closeLabel"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "actionClick": "actionClick"; "closed": "closed"; }, never, never, true, never>;
}

interface GenericTableColumn {
    key: string;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
}
type GenericTableRow = Record<string, string | number | boolean | null>;
declare class GenericTable {
    readonly columns: _angular_core.InputSignal<GenericTableColumn[]>;
    readonly rows: _angular_core.InputSignal<GenericTableRow[]>;
    readonly searchable: _angular_core.InputSignal<boolean>;
    readonly searchPlaceholder: _angular_core.InputSignal<string>;
    readonly pageSize: _angular_core.InputSignal<number>;
    readonly emptyMessage: _angular_core.InputSignal<string>;
    readonly rowClick: _angular_core.OutputEmitterRef<GenericTableRow>;
    readonly sortChange: _angular_core.OutputEmitterRef<{
        key: string;
        direction: "asc" | "desc";
    }>;
    readonly query: _angular_core.WritableSignal<string>;
    readonly sortKey: _angular_core.WritableSignal<string>;
    readonly sortDir: _angular_core.WritableSignal<"asc" | "desc">;
    readonly page: _angular_core.WritableSignal<number>;
    readonly filters: _angular_core.WritableSignal<Record<string, string>>;
    readonly filterableColumns: _angular_core.Signal<GenericTableColumn[]>;
    readonly filterOptions: _angular_core.Signal<Record<string, string[]>>;
    readonly filtered: _angular_core.Signal<GenericTableRow[]>;
    readonly sorted: _angular_core.Signal<GenericTableRow[]>;
    readonly pageCount: _angular_core.Signal<number>;
    readonly pageRows: _angular_core.Signal<GenericTableRow[]>;
    setQuery(value: string): void;
    setFilter(key: string, value: string): void;
    sort(col: GenericTableColumn): void;
    go(page: number): void;
    filterValue(key: string): string;
    cell(row: GenericTableRow, key: string): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericTable, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericTable, "generic-table", never, { "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; "searchable": { "alias": "searchable"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "pageSize": { "alias": "pageSize"; "required": false; "isSignal": true; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; "isSignal": true; }; }, { "rowClick": "rowClick"; "sortChange": "sortChange"; }, never, never, true, never>;
}

declare class GenericBadge {
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    readonly appearance: _angular_core.InputSignal<"solid" | "outline">;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericBadge, "generic-badge", never, { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "appearance": { "alias": "appearance"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

interface GenericStep {
    id: string;
    label: string;
    locked?: boolean;
}
declare class GenericStepper {
    readonly steps: _angular_core.InputSignal<GenericStep[]>;
    readonly currentIndex: _angular_core.InputSignal<number>;
    readonly orientation: _angular_core.InputSignal<"horizontal" | "vertical">;
    readonly stepClick: _angular_core.OutputEmitterRef<{
        step: GenericStep;
        index: number;
    }>;
    stateOf(index: number): 'done' | 'active' | 'todo';
    onClick(step: GenericStep, index: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericStepper, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericStepper, "generic-stepper", never, { "steps": { "alias": "steps"; "required": false; "isSignal": true; }; "currentIndex": { "alias": "currentIndex"; "required": false; "isSignal": true; }; "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; }, { "stepClick": "stepClick"; }, never, never, true, never>;
}

interface GenericMenuItem {
    id: string;
    label: string;
    disabled?: boolean;
    danger?: boolean;
}
declare class GenericDropdown {
    private readonly host;
    readonly label: _angular_core.InputSignal<string>;
    readonly items: _angular_core.InputSignal<GenericMenuItem[]>;
    readonly align: _angular_core.InputSignal<"left" | "right">;
    readonly itemSelect: _angular_core.OutputEmitterRef<GenericMenuItem>;
    readonly open: _angular_core.WritableSignal<boolean>;
    toggle(): void;
    pick(item: GenericMenuItem): void;
    onDocumentClick(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericDropdown, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericDropdown, "generic-dropdown", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "items": { "alias": "items"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; }, { "itemSelect": "itemSelect"; }, never, ["*"], true, never>;
}

declare class GenericProgress {
    readonly value: _angular_core.InputSignal<number>;
    readonly max: _angular_core.InputSignal<number>;
    readonly tone: _angular_core.InputSignal<"cyan" | "magenta" | "gold" | "green" | "red">;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly label: _angular_core.InputSignal<string>;
    readonly showValue: _angular_core.InputSignal<boolean>;
    readonly showPercent: _angular_core.InputSignal<boolean>;
    readonly segmented: _angular_core.InputSignal<boolean>;
    readonly hearts: _angular_core.InputSignal<boolean>;
    readonly percent: _angular_core.Signal<number>;
    readonly segments: number[];
    readonly heartSlots: _angular_core.Signal<boolean[]>;
    readonly heartPx: _angular_core.Signal<16 | 28 | 22>;
    readonly roundedPercent: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericProgress, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericProgress, "generic-progress", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "showValue": { "alias": "showValue"; "required": false; "isSignal": true; }; "showPercent": { "alias": "showPercent"; "required": false; "isSignal": true; }; "segmented": { "alias": "segmented"; "required": false; "isSignal": true; }; "hearts": { "alias": "hearts"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericSpinner {
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly label: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericSpinner, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericSpinner, "generic-spinner", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericSwitch {
    readonly label: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly checked: _angular_core.ModelSignal<boolean>;
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericSwitch, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericSwitch, "generic-switch", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "checked": { "alias": "checked"; "required": false; "isSignal": true; }; }, { "checked": "checkedChange"; }, never, never, true, never>;
}

type GenericIconName = 'trophy' | 'chest' | 'chat' | 'bell' | 'user' | 'scroll' | 'heart' | 'heart-empty' | 'coin' | 'fire' | 'medal' | 'lock' | 'clock' | 'check' | 'star' | 'video' | 'audio' | 'link' | 'folder' | 'pdf' | 'quiz' | 'upload' | 'search' | 'close';

declare class GenericIcon {
    readonly name: _angular_core.InputSignal<GenericIconName>;
    readonly size: _angular_core.InputSignal<number>;
    readonly label: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericIcon, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericIcon, "generic-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface GenericChartPoint {
    label: string;
    value: number;
    color?: string;
}
declare class GenericChart {
    readonly type: _angular_core.InputSignal<"bar" | "line" | "donut">;
    readonly data: _angular_core.InputSignal<GenericChartPoint[]>;
    readonly caption: _angular_core.InputSignal<string>;
    readonly height: _angular_core.InputSignal<number>;
    readonly max: _angular_core.Signal<number>;
    readonly bars: _angular_core.Signal<{
        color: string;
        h: number;
        label: string;
        value: number;
    }[]>;
    readonly linePoints: _angular_core.Signal<string>;
    readonly donut: _angular_core.Signal<{
        color: string;
        dash: number;
        offset: number;
        percent: number;
        label: string;
        value: number;
    }[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericChart, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericChart, "generic-chart", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "caption": { "alias": "caption"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericStat {
    readonly label: _angular_core.InputSignal<string>;
    readonly value: _angular_core.InputSignal<string | number>;
    readonly hint: _angular_core.InputSignal<string>;
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    readonly icon: _angular_core.InputSignal<GenericIconName | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericStat, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericStat, "generic-stat", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericDashboard {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericDashboard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericDashboard, "generic-dashboard", never, {}, {}, never, ["generic-stat", "*"], true, never>;
}

type SurveyQuestionType = 'single' | 'multi' | 'rating' | 'text';
interface SurveyOption {
    id: string;
    label: string;
}
interface SurveyQuestion {
    id: string;
    prompt: string;
    type: SurveyQuestionType;
    options?: SurveyOption[];
    max?: number;
    required?: boolean;
}
type SurveyValue = Record<string, string | string[] | number>;

declare class GenericSurvey {
    readonly title: _angular_core.InputSignal<string>;
    readonly questions: _angular_core.InputSignal<SurveyQuestion[]>;
    readonly value: _angular_core.ModelSignal<SurveyValue>;
    readonly submitted: _angular_core.OutputEmitterRef<SurveyValue>;
    asList(id: string): string[];
    asText(id: string): string;
    asNumber(id: string): number;
    setSingle(id: string, optionId: string): void;
    toggleMulti(id: string, optionId: string): void;
    setRating(id: string, score: number): void;
    setText(id: string, text: string): void;
    submit(): void;
    private patch;
    stars(max: number): number[];
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericSurvey, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericSurvey, "generic-survey", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "questions": { "alias": "questions"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "submitted": "submitted"; }, never, never, true, never>;
}

declare class GenericCard {
    readonly tone: _angular_core.InputSignal<ArcadeTone | "default">;
    readonly padding: _angular_core.InputSignal<"sm" | "md" | "none">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCard, "generic-card", never, { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericInput {
    readonly label: _angular_core.InputSignal<string>;
    readonly type: _angular_core.InputSignal<string>;
    readonly placeholder: _angular_core.InputSignal<string>;
    readonly error: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly value: _angular_core.ModelSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericInput, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericInput, "generic-input", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface GenericSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
declare class GenericSelect {
    readonly label: _angular_core.InputSignal<string>;
    readonly placeholder: _angular_core.InputSignal<string>;
    readonly error: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly options: _angular_core.InputSignal<GenericSelectOption[]>;
    readonly value: _angular_core.ModelSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericSelect, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericSelect, "generic-select", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

declare class GenericCheckbox {
    readonly label: _angular_core.InputSignal<string>;
    readonly description: _angular_core.InputSignal<string>;
    readonly error: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly checked: _angular_core.ModelSignal<boolean>;
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCheckbox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCheckbox, "generic-checkbox", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "checked": { "alias": "checked"; "required": false; "isSignal": true; }; }, { "checked": "checkedChange"; }, never, never, true, never>;
}

interface GenericChatMessage {
    id?: string;
    text: string;
    from?: 'me' | 'them';
}

declare class GenericChat {
    readonly name: _angular_core.InputSignal<string>;
    readonly messages: _angular_core.InputSignal<GenericChatMessage[]>;
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericChat, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericChat, "generic-chat", never, { "name": { "alias": "name"; "required": false; "isSignal": true; }; "messages": { "alias": "messages"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericTextarea {
    readonly label: _angular_core.InputSignal<string>;
    readonly error: _angular_core.InputSignal<string>;
    readonly showCount: _angular_core.InputSignal<boolean>;
    readonly maxLength: _angular_core.InputSignal<number | undefined>;
    readonly placeholder: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly rows: _angular_core.InputSignal<number>;
    readonly value: _angular_core.ModelSignal<string>;
    readonly used: _angular_core.Signal<number>;
    readonly displayCount: _angular_core.Signal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericTextarea, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericTextarea, "generic-textarea", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "showCount": { "alias": "showCount"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface GenericRadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

declare class GenericRadioGroup {
    readonly name: _angular_core.InputSignal<string>;
    readonly options: _angular_core.InputSignal<GenericRadioOption[]>;
    readonly label: _angular_core.InputSignal<string>;
    readonly error: _angular_core.InputSignal<string>;
    readonly value: _angular_core.ModelSignal<string | undefined>;
    optionId(option: GenericRadioOption): string;
    select(option: GenericRadioOption): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericRadioGroup, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericRadioGroup, "generic-radio-group", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "options": { "alias": "options"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

type GenericAvatarRing = ArcadeTone | 'none';
declare class GenericAvatar {
    readonly src: _angular_core.InputSignal<string | undefined>;
    readonly name: _angular_core.InputSignal<string>;
    readonly size: _angular_core.InputSignal<"sm" | "md" | "lg" | "xl" | "xs">;
    readonly level: _angular_core.InputSignal<number | undefined>;
    readonly ring: _angular_core.InputSignal<GenericAvatarRing>;
    readonly initials: _angular_core.Signal<string>;
    private getInitials;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericAvatar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericAvatar, "generic-avatar", never, { "src": { "alias": "src"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "ring": { "alias": "ring"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericEmptyState {
    readonly title: _angular_core.InputSignal<string>;
    readonly description: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericEmptyState, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericEmptyState, "generic-empty-state", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; }, {}, never, ["[icon]", "[action]"], true, never>;
}

type GenericCalloutTone = Exclude<ArcadeTone, 'magenta'>;
declare class GenericCallout {
    readonly tone: _angular_core.InputSignal<GenericCalloutTone>;
    readonly title: _angular_core.InputSignal<string | undefined>;
    readonly resolvedTitle: _angular_core.Signal<string>;
    readonly icon: _angular_core.Signal<GenericIconName>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCallout, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCallout, "generic-callout", never, { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericMathBlock {
    readonly expression: _angular_core.InputSignal<string>;
    readonly display: _angular_core.InputSignal<"inline" | "block">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericMathBlock, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericMathBlock, "generic-math-block", never, { "expression": { "alias": "expression"; "required": true; "isSignal": true; }; "display": { "alias": "display"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface GenericTabItem {
    id: string;
    label: string;
    disabled?: boolean;
    icon?: GenericIconName;
}

declare class GenericTabs {
    readonly tabs: _angular_core.InputSignal<GenericTabItem[]>;
    readonly activeId: _angular_core.ModelSignal<string>;
    readonly tabChange: _angular_core.OutputEmitterRef<GenericTabItem>;
    private readonly tabButtons;
    /** The tab that should carry tabindex="0". Falls back to the first enabled
     * tab when activeId() doesn't match any enabled tab (e.g. default ''), so
     * the tablist is always reachable via Tab per the WAI-ARIA tabs pattern. */
    readonly focusableTabId: _angular_core.Signal<string>;
    select(tab: GenericTabItem): void;
    onKeydown(event: KeyboardEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericTabs, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericTabs, "generic-tabs", never, { "tabs": { "alias": "tabs"; "required": false; "isSignal": true; }; "activeId": { "alias": "activeId"; "required": false; "isSignal": true; }; }, { "activeId": "activeIdChange"; "tabChange": "tabChange"; }, never, never, true, never>;
}

declare class GenericTooltip {
    readonly text: _angular_core.InputSignal<string>;
    readonly position: _angular_core.InputSignal<"left" | "right" | "top" | "bottom">;
    readonly disabled: _angular_core.InputSignal<boolean>;
    /** Hover and focus are tracked independently so the tooltip doesn't hide
     * on mouseleave while the trigger still has keyboard focus (or vice versa). */
    readonly hovering: _angular_core.WritableSignal<boolean>;
    readonly focused: _angular_core.WritableSignal<boolean>;
    readonly visible: _angular_core.Signal<boolean>;
    readonly tooltipId: string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericTooltip, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericTooltip, "generic-tooltip", never, { "text": { "alias": "text"; "required": true; "isSignal": true; }; "position": { "alias": "position"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class GenericDrawer {
    readonly open: _angular_core.ModelSignal<boolean>;
    readonly dismissable: _angular_core.InputSignal<boolean>;
    readonly side: _angular_core.InputSignal<"left" | "right" | "top" | "bottom">;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly closeLabel: _angular_core.InputSignal<string>;
    readonly closed: _angular_core.OutputEmitterRef<void>;
    close(): void;
    onBackdrop(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericDrawer, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericDrawer, "generic-drawer", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "dismissable": { "alias": "dismissable"; "required": false; "isSignal": true; }; "side": { "alias": "side"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "closeLabel": { "alias": "closeLabel"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "closed": "closed"; }, never, ["*"], true, never>;
}

interface GenericBreadcrumbItem {
    id: string;
    label: string;
    href?: string;
    icon?: GenericIconName;
}

declare class GenericBreadcrumb {
    readonly items: _angular_core.InputSignal<GenericBreadcrumbItem[]>;
    readonly showHome: _angular_core.InputSignal<boolean>;
    readonly itemClick: _angular_core.OutputEmitterRef<GenericBreadcrumbItem>;
    readonly homeClick: _angular_core.OutputEmitterRef<void>;
    isLast(index: number): boolean;
    select(item: GenericBreadcrumbItem, index: number): void;
    selectHome(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericBreadcrumb, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericBreadcrumb, "generic-breadcrumb", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "showHome": { "alias": "showHome"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; "homeClick": "homeClick"; }, never, never, true, never>;
}

interface GenericFooterLink {
    id: string;
    label: string;
    href: string;
}

declare class GenericFooter {
    readonly links: _angular_core.InputSignal<GenericFooterLink[]>;
    readonly copyrightText: _angular_core.InputSignal<string>;
    readonly linkClick: _angular_core.OutputEmitterRef<GenericFooterLink>;
    select(link: GenericFooterLink): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericFooter, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericFooter, "generic-footer", never, { "links": { "alias": "links"; "required": false; "isSignal": true; }; "copyrightText": { "alias": "copyrightText"; "required": false; "isSignal": true; }; }, { "linkClick": "linkClick"; }, never, ["[brand]"], true, never>;
}

interface GenericNavItem {
    id: string;
    label: string;
    href?: string;
    icon?: GenericIconName;
}

declare class GenericNavbar {
    private readonly host;
    private readonly themeService;
    readonly items: _angular_core.InputSignal<GenericNavItem[]>;
    readonly activeId: _angular_core.InputSignal<string | null>;
    readonly brandLabel: _angular_core.InputSignal<string>;
    readonly itemClick: _angular_core.OutputEmitterRef<GenericNavItem>;
    readonly mobileMenuOpen: _angular_core.WritableSignal<boolean>;
    readonly isDarkMode: _angular_core.Signal<boolean>;
    readonly themeIconLabel: _angular_core.Signal<"Cambiar a tema claro" | "Cambiar a tema oscuro">;
    readonly hamburgerLabel: _angular_core.Signal<"Cerrar menú" | "Abrir menú">;
    toggleMobileMenu(): void;
    toggleTheme(): void;
    select(item: GenericNavItem): void;
    onDocumentClick(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericNavbar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericNavbar, "generic-navbar", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "activeId": { "alias": "activeId"; "required": false; "isSignal": true; }; "brandLabel": { "alias": "brandLabel"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; }, never, ["[account]"], true, never>;
}

declare class GenericLessonHeader {
    readonly title: _angular_core.InputSignal<string>;
    readonly subtitle: _angular_core.InputSignal<string>;
    readonly progress: _angular_core.InputSignal<number>;
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    readonly badgeLabel: _angular_core.InputSignal<string>;
    /** generic-progress doesn't support the 'neutral' tone; fall back to 'cyan'. */
    readonly progressTone: _angular_core.Signal<"cyan" | "magenta" | "gold" | "green" | "red">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericLessonHeader, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericLessonHeader, "generic-lesson-header", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "progress": { "alias": "progress"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "badgeLabel": { "alias": "badgeLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericCodeBlock {
    readonly code: _angular_core.InputSignal<string>;
    readonly language: _angular_core.InputSignal<string>;
    readonly filename: _angular_core.InputSignal<string>;
    readonly showCopyButton: _angular_core.InputSignal<boolean>;
    readonly copied: _angular_core.OutputEmitterRef<void>;
    protected readonly justCopied: _angular_core.WritableSignal<boolean>;
    copy(): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCodeBlock, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCodeBlock, "generic-code-block", never, { "code": { "alias": "code"; "required": true; "isSignal": true; }; "language": { "alias": "language"; "required": false; "isSignal": true; }; "filename": { "alias": "filename"; "required": false; "isSignal": true; }; "showCopyButton": { "alias": "showCopyButton"; "required": false; "isSignal": true; }; }, { "copied": "copied"; }, never, never, true, never>;
}

declare class GenericCountdownTimer {
    readonly durationSeconds: _angular_core.InputSignal<number>;
    readonly autoStart: _angular_core.InputSignal<boolean>;
    readonly tick: _angular_core.OutputEmitterRef<number>;
    readonly expired: _angular_core.OutputEmitterRef<void>;
    readonly paused: _angular_core.ModelSignal<boolean>;
    protected readonly remaining: _angular_core.WritableSignal<number>;
    private readonly expiredEmitted;
    readonly display: _angular_core.Signal<string>;
    readonly critical: _angular_core.Signal<boolean>;
    private intervalId;
    private started;
    constructor();
    togglePause(): void;
    private start;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCountdownTimer, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCountdownTimer, "generic-countdown-timer", never, { "durationSeconds": { "alias": "durationSeconds"; "required": true; "isSignal": true; }; "autoStart": { "alias": "autoStart"; "required": false; "isSignal": true; }; "paused": { "alias": "paused"; "required": false; "isSignal": true; }; }, { "tick": "tick"; "expired": "expired"; "paused": "pausedChange"; }, never, never, true, never>;
}

declare class GenericStarRating {
    readonly value: _angular_core.ModelSignal<number>;
    readonly max: _angular_core.InputSignal<number>;
    readonly readonly: _angular_core.InputSignal<boolean>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly label: _angular_core.InputSignal<string>;
    protected readonly hovered: _angular_core.WritableSignal<number | null>;
    protected readonly stars: _angular_core.Signal<number[]>;
    protected readonly starPx: _angular_core.Signal<16 | 28 | 22>;
    protected readonly previewValue: _angular_core.Signal<number>;
    onHover(star: number): void;
    onLeave(): void;
    onClick(star: number): void;
    onKeydown(event: KeyboardEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericStarRating, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericStarRating, "generic-star-rating", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface GenericChoiceOption {
    id: string;
    label: string;
    disabled?: boolean;
}

declare class GenericMultipleChoice {
    readonly question: _angular_core.InputSignal<string>;
    readonly options: _angular_core.InputSignal<GenericChoiceOption[]>;
    readonly value: _angular_core.ModelSignal<string | null>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly showResult: _angular_core.InputSignal<boolean>;
    readonly correctOptionId: _angular_core.InputSignal<string | null>;
    protected readonly name: string;
    protected readonly questionId: string;
    protected readonly resultTone: _angular_core.Signal<Record<string, "correct" | "incorrect" | null>>;
    optionId(option: GenericChoiceOption): string;
    isDisabled(option: GenericChoiceOption): boolean;
    select(option: GenericChoiceOption): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericMultipleChoice, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericMultipleChoice, "generic-multiple-choice", never, { "question": { "alias": "question"; "required": true; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "showResult": { "alias": "showResult"; "required": false; "isSignal": true; }; "correctOptionId": { "alias": "correctOptionId"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface GenericOutlineLesson {
    id: string;
    label: string;
    completed?: boolean;
    locked?: boolean;
}
interface GenericOutlineModule {
    id: string;
    label: string;
    lessons: GenericOutlineLesson[];
}

declare class GenericCourseOutline {
    readonly modules: _angular_core.InputSignal<GenericOutlineModule[]>;
    readonly activeLessonId: _angular_core.InputSignal<string | null>;
    readonly lessonClick: _angular_core.OutputEmitterRef<{
        module: GenericOutlineModule;
        lesson: GenericOutlineLesson;
    }>;
    /** Modules start expanded by default; collapsing is tracked as an exception set. */
    private readonly collapsedIds;
    isExpanded(module: GenericOutlineModule): boolean;
    toggleModule(module: GenericOutlineModule): void;
    onLessonClick(module: GenericOutlineModule, lesson: GenericOutlineLesson): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCourseOutline, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCourseOutline, "generic-course-outline", never, { "modules": { "alias": "modules"; "required": false; "isSignal": true; }; "activeLessonId": { "alias": "activeLessonId"; "required": false; "isSignal": true; }; }, { "lessonClick": "lessonClick"; }, never, never, true, never>;
}

interface GenericRubricLevel {
    label: string;
    points: number;
    description?: string;
}
interface GenericRubricCriterion {
    id: string;
    label: string;
    levels: GenericRubricLevel[];
    selectedLevelIndex?: number | null;
}

declare class GenericRubricPanel {
    readonly criteria: _angular_core.InputSignal<GenericRubricCriterion[]>;
    readonly readonly: _angular_core.InputSignal<boolean>;
    readonly levelSelect: _angular_core.OutputEmitterRef<{
        criterion: GenericRubricCriterion;
        levelIndex: number;
    }>;
    /** Public: sum of each criterion's currently-selected level points (0 if none selected). */
    readonly totalPoints: _angular_core.Signal<number>;
    isSelected(criterion: GenericRubricCriterion, levelIndex: number): boolean;
    onLevelClick(criterion: GenericRubricCriterion, levelIndex: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericRubricPanel, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericRubricPanel, "generic-rubric-panel", never, { "criteria": { "alias": "criteria"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; }, { "levelSelect": "levelSelect"; }, never, never, true, never>;
}

type ActivityStatus = 'not-started' | 'in-progress' | 'completed' | 'overdue';
type ActivityKind = 'reading' | 'video' | 'quiz' | 'assignment' | 'discussion';
type CourseStatus = 'draft' | 'published' | 'archived';
type Difficulty = 'beginner' | 'intermediate' | 'advanced';
type ResourceType = 'pdf' | 'link' | 'video' | 'audio' | 'code';
type AssessmentType = 'quiz' | 'exam' | 'project' | 'peer-review';

declare class GenericActivityStatusBadge {
    readonly status: _angular_core.InputSignal<ActivityStatus>;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    readonly tone: _angular_core.Signal<ArcadeTone>;
    readonly label: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericActivityStatusBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericActivityStatusBadge, "generic-activity-status-badge", never, { "status": { "alias": "status"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericActivityKindBadge {
    readonly kind: _angular_core.InputSignal<ActivityKind>;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    readonly tone: _angular_core.Signal<ArcadeTone>;
    readonly label: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericActivityKindBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericActivityKindBadge, "generic-activity-kind-badge", never, { "kind": { "alias": "kind"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericCourseStatusBadge {
    readonly status: _angular_core.InputSignal<CourseStatus>;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    readonly tone: _angular_core.Signal<ArcadeTone>;
    readonly label: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCourseStatusBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCourseStatusBadge, "generic-course-status-badge", never, { "status": { "alias": "status"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericGradeBadge {
    readonly score: _angular_core.InputSignal<number>;
    readonly passingThreshold: _angular_core.InputSignal<number>;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    readonly tone: _angular_core.Signal<ArcadeTone>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericGradeBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericGradeBadge, "generic-grade-badge", never, { "score": { "alias": "score"; "required": true; "isSignal": true; }; "passingThreshold": { "alias": "passingThreshold"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericCourseMetaBadges {
    readonly difficulty: _angular_core.InputSignal<Difficulty | null>;
    readonly durationLabel: _angular_core.InputSignal<string>;
    readonly status: _angular_core.InputSignal<CourseStatus | null>;
    readonly size: _angular_core.InputSignal<"sm" | "md">;
    readonly difficultyTone: _angular_core.Signal<ArcadeTone | undefined>;
    readonly difficultyLabel: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCourseMetaBadges, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCourseMetaBadges, "generic-course-meta-badges", never, { "difficulty": { "alias": "difficulty"; "required": false; "isSignal": true; }; "durationLabel": { "alias": "durationLabel"; "required": false; "isSignal": true; }; "status": { "alias": "status"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericXpBar {
    readonly currentXp: _angular_core.InputSignal<number>;
    readonly levelXp: _angular_core.InputSignal<number>;
    readonly level: _angular_core.InputSignal<number | null>;
    readonly tone: _angular_core.InputSignal<"cyan" | "magenta" | "gold" | "green" | "red">;
    readonly caption: _angular_core.InputSignal<string>;
    readonly ariaLabel: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericXpBar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericXpBar, "generic-xp-bar", never, { "currentXp": { "alias": "currentXp"; "required": true; "isSignal": true; }; "levelXp": { "alias": "levelXp"; "required": true; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "caption": { "alias": "caption"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericCoinCounter {
    readonly count: _angular_core.InputSignal<number>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly ariaLabel: _angular_core.Signal<string>;
    readonly iconPx: _angular_core.Signal<16 | 28 | 22>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericCoinCounter, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericCoinCounter, "generic-coin-counter", never, { "count": { "alias": "count"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericStreakFlame {
    readonly days: _angular_core.InputSignal<number>;
    readonly active: _angular_core.InputSignal<boolean>;
    readonly ariaLabel: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericStreakFlame, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericStreakFlame, "generic-streak-flame", never, { "days": { "alias": "days"; "required": true; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class GenericLevelBadge {
    readonly level: _angular_core.InputSignal<number>;
    readonly size: _angular_core.InputSignal<ArcadeSize>;
    readonly tone: _angular_core.InputSignal<ArcadeTone>;
    readonly ariaLabel: _angular_core.Signal<string>;
    readonly hostClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericLevelBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericLevelBadge, "generic-level-badge", never, { "level": { "alias": "level"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface GenericAchievementBadge {
    id: string;
    label: string;
    iconName: GenericIconName;
    earned: boolean;
    description?: string;
}

declare class GenericBadgeShowcase {
    readonly badges: _angular_core.InputSignal<GenericAchievementBadge[]>;
    readonly badgeClick: _angular_core.OutputEmitterRef<GenericAchievementBadge>;
    ariaLabelFor(badge: GenericAchievementBadge): string;
    onClick(badge: GenericAchievementBadge): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GenericBadgeShowcase, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GenericBadgeShowcase, "generic-badge-showcase", never, { "badges": { "alias": "badges"; "required": false; "isSignal": true; }; }, { "badgeClick": "badgeClick"; }, never, never, true, never>;
}

export { GenericActivityKindBadge, GenericActivityStatusBadge, GenericAvatar, GenericBadge, GenericBadgeShowcase, GenericBreadcrumb, GenericButton, GenericCallout, GenericCard, GenericChart, GenericChat, GenericCheckbox, GenericCodeBlock, GenericCoinCounter, GenericCountdownTimer, GenericCourseMetaBadges, GenericCourseModal, GenericCourseOutline, GenericCourseStatusBadge, GenericDashboard, GenericDrawer, GenericDropdown, GenericEmptyState, GenericFileModal, GenericFooter, GenericGradeBadge, GenericIcon, GenericImportButton, GenericInput, GenericLessonHeader, GenericLevelBadge, GenericMathBlock, GenericModal, GenericMultipleChoice, GenericNavbar, GenericProgress, GenericRadioGroup, GenericRubricPanel, GenericSelect, GenericSpinner, GenericStarRating, GenericStat, GenericStepper, GenericStreakFlame, GenericSubtitle, GenericSurvey, GenericSwitch, GenericTable, GenericTabs, GenericText, GenericTextarea, GenericTitle, GenericTooltip, GenericXpBar, SentenceCasePipe, ThemeService };
export type { ActivityKind, ActivityStatus, ArcadeSize, ArcadeTone, AssessmentType, ButtonVariant, CourseStatus, Difficulty, GenericAchievementBadge, GenericAvatarRing, GenericBreadcrumbItem, GenericCalloutTone, GenericChartPoint, GenericChatMessage, GenericChoiceOption, GenericCourseBadge, GenericCourseTone, GenericFooterLink, GenericIconName, GenericMenuItem, GenericNavItem, GenericOutlineLesson, GenericOutlineModule, GenericRadioOption, GenericRubricCriterion, GenericRubricLevel, GenericSelectOption, GenericStep, GenericTabItem, GenericTableColumn, GenericTableRow, ResourceType, SurveyOption, SurveyQuestion, SurveyQuestionType, SurveyValue, ThemeName };
