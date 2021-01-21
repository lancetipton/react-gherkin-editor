import { Dialect, generateMessages } from '@cucumber/gherkin'
import { Annotation, Annotator } from '.'
import { GherkinMode } from '../mode'

export default class GherkinAnnotator implements Annotator {
  constructor(private dialect: Dialect, private mode: GherkinMode) {
    this.dialect = dialect
    this.mode = mode
  }

  getAnnotations(value: string): Annotation[] {
    return this.parse(value)
      .filter(message => message.parseError)
      .map(message => ({
        line: message.parseError.source.location.line,
        row: message.parseError.source.location.line - 1,
        character: message.parseError.source.location.column,
        column: message.parseError.source.location.column - 1,
        text: message.parseError.message,
        type: 'error'
      }))
  }

  private parse(value: string) {
    // TODO: Refactor
    let valueWithPrefix = ''

    switch (this.mode) {
      case 'background':
        valueWithPrefix = this.dialect.feature[0].concat(
          ':',
          this.dialect.background[0],
          ':',
          value
        )
        break
      case 'scenario':
        valueWithPrefix = this.dialect.feature[0].concat(
          ':',
          this.dialect.scenario[0],
          ':',
          value
        )
        break
      default:
        valueWithPrefix = value
        break
    }

    return generateMessages(valueWithPrefix, '', {
      includeGherkinDocument: true,
      newId: () => Math.random().toString()
    })
  }
}
