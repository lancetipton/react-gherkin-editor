import { OnParseCallback } from '../../lib/gherkin-linter';
import { LanguageIdentifier } from '../../lib/gherkin-languages';
export default class GherkinAnnotator {
    session: any;
    private onParse?;
    private linter;
    language: LanguageIdentifier;
    mode: '' | 'scenario' | 'background';
    constructor(session: any, onParse?: OnParseCallback);
    setSession(session: any): void;
    setLanguage(language: any): void;
    setMode(mode: 'gherkin_background_i18n' | 'gherkin_scenario_i18n' | ''): void;
    annotate(value: any): void;
    debouncedAnnotate: (...args: any[]) => void;
    annotateNow(value: any): Promise<void>;
    lint(value: any): Promise<object[]>;
}
