import Languages from '../../lib/gherkin-languages'
import _find from 'lodash/find'
import React from 'react'
import Select from 'react-select'

import { LanguageDropdownContainer } from './styled'

interface ToolbarProps {
  content?: React.ReactNode
  language?: string
  readOnly?: boolean
  onLanguageChange?(option: object): void
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
        padding: '3px'
      }}
      data-testid='editor-toolbar'
      className='ace-tm'
    >
      <LanguageDropdownContainer>
        <Select
          value={gherkinLanguage}
          options={availableLanguages}
          onChange={onLanguageChange}
          styles={languageSelectStyles}
          isDisabled={readOnly}
          classNamePrefix='gherkin-editor-language-select'
        />
      </LanguageDropdownContainer>
      {content}
    </div>
  )
}

export default Toolbar
