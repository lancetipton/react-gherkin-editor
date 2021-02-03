import Languages from '../../lib/gherkin-languages'
import _find from 'lodash/find'
import React from 'react'
import Select from 'react-select'

interface ToolbarProps {
  content?: React.ReactNode
  language?: string
  readOnly?: boolean
  onLanguageChange?(option: any): void
}

const availableLanguages = Object.entries(Languages).map(([key, language]) => ({
  value: key,
  label: language.native
}))

const languageSelectStyles = {
  container: styles => ({ ...styles, 'z-index': 5 })
}

const Toolbar = ({
  content,
  language = 'en',
  readOnly = false,
  onLanguageChange = () => {}
}: ToolbarProps) => {
  const gherkinLanguage = _find(availableLanguages, { value: language })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3px',
        backgroundColor: 'rgb(235, 236, 240)'
      }}
      data-testid='editor-toolbar'
      className='ace-tm'
    >
      <div style={{ minWidth: '150px' }}>
        <Select
          value={gherkinLanguage}
          options={availableLanguages}
          onChange={onLanguageChange}
          styles={languageSelectStyles}
          isDisabled={readOnly}
          classNamePrefix='gherkin-editor-language-select'
        />
      </div>
      {content}
    </div>
  )
}

export default Toolbar
