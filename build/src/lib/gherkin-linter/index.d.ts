import { messages as m } from '@cucumber/messages';
export declare type OnParseCallback = (messages: Readonly<m.IEnvelope[]>) => void;
export default class GherkinLinter {
    private onParse?;
    private options;
    private offset;
    private isSubset;
    private subsetType;
    private language;
    private featureKeyword;
    private lastParsedGherkin;
    private lintingErrors;
    constructor(onParse?: OnParseCallback);
    setLanguage(language: any): this;
    setSubsetType(type: any): this;
    parse(gherkin: any): this;
    getLintingErrors(): object[];
    private parseGherkin;
    private getContentToLint;
    private removeLineNumber;
}
