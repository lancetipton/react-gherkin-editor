import { Dialect } from '@cucumber/gherkin'
import { require as acequire } from 'ace-builds'
import escapeStringRegexp from 'escape-string-regexp'
import { keywordSetFor } from '../../modules/dialect'
import { editorHighlightRulesFor } from './highlightRules'

export const modeFor = (dialect: Partial<Dialect>) => {
  const EditorMode = editorModeFor(dialect)
  return new EditorMode()
}

export const editorModeFor = (dialect: Partial<Dialect>) => {
  const keywordSet = keywordSetFor(dialect)

  const oop = acequire('ace/lib/oop')
  const mode = function () {
    const LocalizedGherkinMode = editorHighlightRulesFor(dialect)
    oop.inherits(
      LocalizedGherkinMode,
      acequire('ace/mode/text_highlight_rules').TextHighlightRules
    )
    this.HighlightRules = LocalizedGherkinMode
    this.$behaviour = this.$defaultBehaviour
  }

  oop.inherits(mode, acequire('ace/mode/text').Mode)
  ;(function () {
    this.lineCommentStart = '#'
    this.$id = `ace/mode/gherkin_${dialect.name}`

    this.getNextLineIndent = function (state, line, _tab) {
      let indent = this.$getIndent(line)
      const space2 = '  '

      const tokenizedLine = this.getTokenizer().getLineTokens(line, state)
      const tokens = tokenizedLine.tokens

      if (line.match('[ ]*\\|')) {
        indent += '| '
      }

      if (tokens.length && tokens[tokens.length - 1].type === 'comment') {
        return indent
      }

      if (state === 'start') {
        if (
          line.match(
            keywordSet.featureKeywords.map(escapeStringRegexp).join(':|') + ':'
          )
        ) {
          indent += space2
        } else if (
          line.match(
            '(' +
              keywordSet.stepKeywords.map(escapeStringRegexp).join('|') +
              ').+(:)$|Examples:'
          )
        ) {
          indent += space2
        } else if (line.match('\\*.+')) {
          indent += '* '
        }
      }

      return indent
    }
  }.call(mode.prototype))

  return mode
}
