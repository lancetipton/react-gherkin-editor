import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import { require as acequire } from 'ace-builds'
import KeywordCompleter from '../../modules/keyword-completer'
import StepCompleter from '../../modules/step-completer'
import {
  setGherkinDialect as setDialect,
  getGherkinDialect as getDialect
} from '../../modules/dialects/gherkin_i18n'
import {
  setGherkinDialect as setBackgroundDialect,
  getGherkinDialect as getBackgroundDialect
} from '../../modules/dialects/gherkin_background_i18n'
import {
  setGherkinDialect as setScenarioDialect,
  getGherkinDialect as getScenarioDialect
} from '../../modules/dialects/gherkin_scenario_i18n'
import GherkinAnnotator from '../../modules/gherkin-annotator'

import 'ace-builds/src-noconflict/ext-language_tools'

import '../../themes/herkin'

import '../../modules/mode/gherkin_i18n'
import '../../modules/mode/gherkin_background_i18n'
import '../../modules/mode/gherkin_scenario_i18n'

const setGherkinDialectFunctions = {
  gherkin_i18n: setDialect,
  gherkin_background_i18n: setBackgroundDialect,
  gherkin_scenario_i18n: setScenarioDialect
}

const getGherkinDialectFunctions = {
  gherkin_i18n: getDialect,
  gherkin_background_i18n: getBackgroundDialect,
  gherkin_scenario_i18n: getScenarioDialect
}

const defaultOptions = {
  fontFamily: [
    'Monaco',
    "'Ubuntu Mono'",
    'Menlo',
    'Consolas',
    'monospace'
  ].join(', '),
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  showLineNumbers: true,
  displayIndentGuides: false,
  fixedWidthGutter: true,
  tabSize: 2
}

const EditorWrapper = props => {
  return (
    <div className={props.className || 'gherkin-editor-wrapper'} style={props.style} >
      {props.children}
    </div>
  )
}

let gherkinAnnotator = null

const GherkinEditor = React.forwardRef((props, ref) => {
  const [currentLanguage, setCurrentLanguage] = useState(props.language)
  const [height, setHeight] = useState(props.initialHeight)

  const aceEditorRef = useRef()

  const {
    activateLinter,
    autoCompleteFunction,
    autoFocus,
    initialValue,
    language,
    mode,
    onLanguageChange,
    onParse,
    onSubmit,
    readOnly,
    setOptions,
    showGutter,
    scrollMargin,
    showPrintMargin,
    style,
    theme,
    uniqueId,
    RootComponent,
  } = props

  const setGherkinDialect = setGherkinDialectFunctions[mode] || setDialect
  const getGherkinDialect = getGherkinDialectFunctions[mode] || getDialect
  const isLinterActivated = activateLinter && showGutter

  useEffect(() => {
    autoFocus && aceEditorRef.current.editor.focus()
  }, [autoFocus])

  useEffect(() => {
    const keywordCompleter = new KeywordCompleter(getGherkinDialect)
    const stepCompleter = new StepCompleter(
      autoCompleteFunction,
      getGherkinDialect
    )
    const langTools = acequire('ace/ext/language_tools')

    langTools.setCompleters([keywordCompleter, stepCompleter])
  }, [autoCompleteFunction, getGherkinDialect])

  useEffect(() => {
    setCurrentLanguage(language)
  }, [language])

  useEffect(() => {
    setGherkinDialect(currentLanguage)

    const editor = aceEditorRef.current.editor
    if(!editor) return

    scrollMargin && editor.renderer.setScrollMargin(scrollMargin)
    editor.setShowPrintMargin(showPrintMargin)
    editor.session.setMode({
      path: `ace/mode/${mode}`,
      v: Date.now()
    })

  }, [
    mode,
    scrollMargin,
    showPrintMargin,
    currentLanguage,
    setGherkinDialect,
  ])

  useEffect(() => {
    if (!isLinterActivated) {
      gherkinAnnotator = null
      return
    }

    const session = aceEditorRef.current.editor.getSession()

    !gherkinAnnotator
      ? (gherkinAnnotator = new GherkinAnnotator(session, onParse))
      : gherkinAnnotator.setSession(session)

  }, [isLinterActivated])

  useEffect(() => {
    if (gherkinAnnotator) {
      gherkinAnnotator.setLanguage(currentLanguage)
      gherkinAnnotator.setMode(mode)
      gherkinAnnotator.annotate(initialValue)
    }
  }, [currentLanguage, mode, initialValue])

  useImperativeHandle(ref, () => ({
    editor: aceEditorRef.current.editor
  }))

  if (activateLinter && !showGutter) {
    console.warn('activateLinter requires showGutter to be true')
  }


  const onChangeHandler = (newValue, ...args) => {
    if (gherkinAnnotator) {
      gherkinAnnotator.annotate(newValue)
    }

    return props.onChange(newValue, ...args)
  }

  const options = { ...defaultOptions, ...setOptions }

  return (
    <RootComponent style={style} >
      <AceEditor
        {...props}
        onChange={onChangeHandler}
        ref={aceEditorRef}
        theme={theme}
        value={initialValue}
        name={uniqueId}
        editorProps={{ $blockScrolling: true }}
        setOptions={options}
        height={`${height}px`}
        commands={[
          {
            name: 'test',
            bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
            exec: editor => onSubmit(editor.getValue())
          }
        ]}
      />
    </RootComponent>
  )
})

GherkinEditor.propTypes = {
  initialValue: PropTypes.string,
  language: PropTypes.string,
  readOnly: PropTypes.bool,
  uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoCompleteFunction: PropTypes.func,
  onLanguageChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  initialHeight: PropTypes.number,
  theme: PropTypes.string,
  mode: PropTypes.oneOf([
    'gherkin_i18n',
    'gherkin_background_i18n',
    'gherkin_scenario_i18n'
  ]),
  fontSize: PropTypes.number,
  width: PropTypes.string,
  showPrintMargin: PropTypes.bool,
  showGutter: PropTypes.bool,
  scrollMargin: PropTypes.array,
  highlightActiveLine: PropTypes.bool,
  activateLinter: PropTypes.bool,
  setOptions: PropTypes.object,
  RootComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.func,
  ])
}

GherkinEditor.defaultProps = {
  initialValue: '',
  language: 'en',
  readOnly: false,
  uniqueId: Math.random().toString(36).substr(2, 9),
  onChange: () => {},
  onSubmit: () => {},
  autoCompleteFunction: () => Promise.resolve([]),
  onLanguageChange: () => {},
  autoFocus: false,
  initialHeight: 500,
  theme: 'jira',
  mode: 'gherkin_i18n',
  fontSize: 14,
  width: '100%',
  showPrintMargin: false,
  showGutter: false,
  scrollMargin: [0, 0, 0, 0],
  highlightActiveLine: false,
  activateLinter: false,
  setOptions: {},
  RootComponent: EditorWrapper,
}

export default GherkinEditor
