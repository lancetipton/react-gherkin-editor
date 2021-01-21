import { Dialect } from '@cucumber/gherkin'
import { Completer } from '../index'

class KeywordCompleter implements Completer {
  dialect: Partial<Dialect>

  constructor(dialect: Partial<Dialect>) {
    this.dialect = dialect
  }

  getCompletions = async (_editor, session, position, _prefix, callback) => {
    const lineTokens = session.getLine(position.row).trim().split(' ')

    if (lineTokens.length === 1) {
      // TODO: Refactor
      const isDefined = value => value !== undefined
      const keywords = [
        this.dialect.feature,
        this.dialect.background,
        this.dialect.rule,
        this.dialect.scenario,
        this.dialect.scenarioOutline,
        this.dialect.examples,
        this.dialect.given,
        this.dialect.when,
        this.dialect.then,
        this.dialect.and
      ]
        .flat()
        .filter(isDefined)
        .map(keyword => keyword.trim())

      const completions = keywords.map((keyword, index) => ({
        caption: keyword,
        value: keyword,
        score: index,
        meta: 'Keyword'
      }))

      callback(null, completions)
    }
  }
}

export default KeywordCompleter
