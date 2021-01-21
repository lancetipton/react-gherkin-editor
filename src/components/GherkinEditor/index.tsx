import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import AceEditor from 'react-ace'
import { Ace, require as acequire } from 'ace-builds'
import { LanguageIdentifier } from '../../lib/gherkin-languages'
import { GherkinMode, modeFor } from '../../modules/mode'
import { dialectFor, partialDialectFor } from '../../modules/dialect'
import { KeywordCompleter, StepCompleter } from '../../modules/completers'
import { GherkinAnnotator } from '../../modules/annotators'
import Toolbar from '../Toolbar'

import 'ace-builds/src-noconflict/ext-language_tools'
import '../../themes/cucumber'
import '../../themes/jira'

interface GherkinEditorProps {
  activateLinter?: boolean
  autoCompleteFunction?(): Promise<string[]>
  autoFocus?: boolean
  fontSize?: number
  hideToolbar?: boolean
  highlightActiveLine?: boolean
  initialHeight?: number
  initialValue?: string
  initialLanguage?: LanguageIdentifier
  mode?: GherkinMode
  onChange?(value: string, ...rest: any): void
  onLanguageChange?(language: LanguageIdentifier): void
  onParse?(): void
  onSubmit?(value: string): void
  readOnly?: boolean
  setOptions?: object
  showGutter?: boolean
  showPrintMargin?: boolean
  theme?: string
  toolbarContent?: React.ReactNode
  uniqueId?: string
  width?: string
}

const defaultOptions = {
  displayIndentGuides: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  fontFamily: [
    "'SFMono-Medium'",
    "'SF Mono'",
    "'Segoe UI Mono'",
    "'Roboto Mono'",
    "'Ubuntu Mono'",
    'Menlo',
    'Consolas',
    'Courier',
    'monospace'
  ].join(', '),
  showLineNumbers: false,
  tabSize: 2
}

const GherkinEditor = React.forwardRef((props: GherkinEditorProps, ref) => {
  const {
    activateLinter,
    autoCompleteFunction,
    autoFocus,
    hideToolbar,
    initialValue,
    initialLanguage,
    mode,
    onChange,
    onLanguageChange,
    onSubmit,
    readOnly,
    setOptions,
    showGutter,
    toolbarContent,
    uniqueId
  } = props

  const [value, setValue] = useState(initialValue)
  const [language, setCurrentLanguage] = useState(initialLanguage)
  const [currentDialect, setCurrentDialect] = useState(
    partialDialectFor(language, mode)
  )
  const [currentSyntaxMode, setCurrentSyntaxMode] = useState(
    modeFor(currentDialect)
  )
  const aceEditorRef: React.MutableRefObject<any> = useRef()
  const isLinterActivated = activateLinter && showGutter

  if (activateLinter && !showGutter) {
    console.warn('activateLinter requires showGutter to be true')
  }

  useEffect(() => {
    if (autoFocus) {
      aceEditorRef.current.editor.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    setCurrentLanguage(initialLanguage)
  }, [initialLanguage])

  useEffect(() => {
    const keywordCompleter = new KeywordCompleter(currentDialect)
    const stepCompleter = new StepCompleter(
      currentDialect,
      autoCompleteFunction
    )
    const langTools = acequire('ace/ext/language_tools')
    langTools.setCompleters([keywordCompleter, stepCompleter])
  }, [autoCompleteFunction, currentDialect])

  useEffect(() => {
    setCurrentDialect(partialDialectFor(language, mode))
  }, [language, mode])

  useEffect(() => {
    setCurrentSyntaxMode(modeFor(currentDialect))
  }, [currentDialect])

  useEffect(() => {
    if (isLinterActivated) {
      const annotator = new GherkinAnnotator(dialectFor(language), mode)
      const annotations = annotator.getAnnotations(value)
      if (annotations.length > 0) {
        aceEditorRef.current.editor.getSession().setAnnotations(annotations)
      } else {
        aceEditorRef.current.editor.getSession().clearAnnotations()
      }
    }
  }, [isLinterActivated, value, language, mode])

  useImperativeHandle(ref, () => ({
    editor: aceEditorRef.current.editor as Ace.Editor
  }))

  const languageChangeHandler = option => {
    setCurrentLanguage(option.value)
    onLanguageChange(option)
  }

  const onChangeHandler = (newValue, ...args) => {
    setValue(newValue)
    onChange(newValue, ...args)
  }

  const options = { ...defaultOptions, ...setOptions }

  return (
    <>
      {!hideToolbar && (
        <Toolbar
          content={toolbarContent}
          language={language}
          readOnly={readOnly}
          onLanguageChange={languageChangeHandler}
        />
      )}

      <AceEditor
        {...props}
        commands={[
          {
            name: 'Submit',
            bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
            exec: editor => onSubmit(editor.getValue())
          }
        ]}
        editorProps={{ $blockScrolling: true }}
        mode={currentSyntaxMode}
        name={uniqueId}
        onChange={onChangeHandler}
        ref={aceEditorRef}
        setOptions={options}
        value={value}
      />
    </>
  )
})

GherkinEditor.defaultProps = {
  activateLinter: false,
  autoCompleteFunction: () => Promise.resolve([]),
  autoFocus: false,
  fontSize: 14,
  hideToolbar: false,
  highlightActiveLine: false,
  initialHeight: 500,
  initialValue: '',
  initialLanguage: 'en',
  mode: 'feature',
  onChange: () => {},
  onLanguageChange: () => {},
  onSubmit: () => {},
  readOnly: false,
  setOptions: {},
  showGutter: false,
  showPrintMargin: false,
  theme: 'cucumber',
  uniqueId: Math.random().toString(36).substr(2, 9),
  width: '100%'
}

export default GherkinEditor
