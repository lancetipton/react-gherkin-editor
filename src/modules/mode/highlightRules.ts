import { Dialect } from '@cucumber/gherkin'
import escapeStringRegexp from 'escape-string-regexp'
import { keywordSetFor } from '../../modules/dialect'

export const editorHighlightRulesFor = (
  dialect: Partial<Dialect>
): Function => {
  const keywordSet = keywordSetFor(dialect)

  return function () {
    const stringEscape =
      '\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})'
    this.$rules = {
      start: [
        {
          token: 'constant.numeric',
          regex: '(?:(?:[1-9]\\d*)|(?:0))'
        },
        {
          token: 'comment',
          regex: '#.*$'
        },
        {
          token: 'keyword',
          regex:
            '(?:' +
            keywordSet.featureKeywords.map(escapeStringRegexp).join('|') +
            '):'
        },
        {
          token: 'keyword',
          regex:
            '(?:' +
            keywordSet.stepKeywords.map(escapeStringRegexp).join('|') +
            ')\\b'
        },
        {
          token: 'string',
          regex: '"{3}',
          next: 'qqstring3'
        },
        {
          token: 'string',
          regex: '"',
          next: 'qqstring'
        },
        {
          token: 'text',
          regex: '^\\s*(?=@[\\w])',
          next: [
            {
              token: 'text',
              regex: '\\s+'
            },
            {
              token: 'variable.parameter',
              regex: '@[\\w]+'
            },
            {
              token: 'empty',
              regex: '',
              next: 'start'
            }
          ]
        },
        {
          token: 'argument',
          regex: '<[^>]+>'
        },
        {
          token: 'comment',
          regex: '\\|(?=.)',
          next: 'table-item'
        },
        {
          token: 'comment',
          regex: '\\|$',
          next: 'start'
        }
      ],
      qqstring3: [
        {
          token: 'constant.language.escape',
          regex: stringEscape
        },
        {
          token: 'string',
          regex: '"{3}',
          next: 'start'
        },
        {
          defaultToken: 'string'
        }
      ],
      qqstring: [
        {
          token: 'constant.language.escape',
          regex: stringEscape
        },
        {
          token: 'string',
          regex: '\\\\$',
          next: 'qqstring'
        },
        {
          token: 'string',
          regex: '"|$',
          next: 'start'
        },
        {
          defaultToken: 'string'
        }
      ],
      'table-item': [
        {
          token: 'comment',
          regex: /$/,
          next: 'start'
        },
        {
          token: 'comment',
          regex: /\|/
        },
        {
          token: 'string',
          regex: /\\./
        },
        {
          defaultToken: 'string'
        }
      ]
    }
    this.normalizeRules()
  }
}
