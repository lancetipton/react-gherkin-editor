import React from 'react';
interface ToolbarProps {
    content?: React.ReactNode;
    language?: string;
    readOnly?: boolean;
    onLanguageChange?(option: object): void;
}
declare const Toolbar: ({ content, language, readOnly, onLanguageChange }: ToolbarProps) => JSX.Element;
export default Toolbar;
