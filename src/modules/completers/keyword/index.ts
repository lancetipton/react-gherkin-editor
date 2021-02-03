import { Ace } from 'ace-builds'
import { Dialect } from '@cucumber/gherkin'
import { keywordSetFor } from '../../dialect'

class KeywordCompleter implements Ace.Completer {
  constructor(private readonly dialect: Partial<Dialect>) {}

  getCompletions = async (_editor, session, position, prefix, callback) => {
    const lineTokens = session.getLine(position.row).trim().split(' ')

    if (lineTokens.length === 1) {
      const keywordSet = keywordSetFor(this.dialect)
      const keywords = [
        ...keywordSet.featureKeywords,
        ...keywordSet.stepKeywords
      ]

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
