/// <reference types="jest" />
declare const setSession: jest.Mock<any, any>;
declare const setLanguage: jest.Mock<any, any>;
declare const setMode: jest.Mock<any, any>;
declare const annotate: jest.Mock<any, any>;
declare const GherkinAnnotator: jest.Mock<any, any>;
export default GherkinAnnotator;
export { setSession, setLanguage, setMode, annotate };
