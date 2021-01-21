import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import calculateSize from 'calculate-size'
import { Completer } from '../index'
import { Dialect } from '@cucumber/gherkin'

class StepCompleter implements Completer {
  dialect: Partial<Dialect>
  autoCompleteFunction: Function

  constructor(dialect: Partial<Dialect>, autoCompleteFunction: Function) {
    this.dialect = dialect
    this.autoCompleteFunction = autoCompleteFunction
  }

  async getCompletions(editor, session, position, _prefix, callback) {
    const lineTokens = session.getLine(position.row).trim().split(' ')
    // TODO: Refactor
    const isDefined = value => value !== undefined
    const keywords = [
      this.dialect.given,
      this.dialect.when,
      this.dialect.then,
      this.dialect.and,
      this.dialect.but
    ]
      .flat()
      .filter(isDefined)
      .map(keyword => keyword.trim())

    if (lineTokens.length > 1 && keywords.includes(lineTokens[0])) {
      const keyword = lineTokens.shift()
      const text = lineTokens.join(' ')
      try {
        const completions = await this.autoCompleteFunction(keyword, text)
        callback(null, completions)
        this.resizePopup(editor, completions)
      } catch (error) {
        callback(null, [])
        throw error
      }
    }
  }

  private resizePopup = (editor, completions) => {
    if (_isEmpty(completions)) {
      return
    }

    const strings = _map(completions, 'caption')
    const longestString = _orderBy(strings, 'length', 'desc').shift()
    const width = this.calculateVisualLength(editor, longestString)

    editor.completer.popup.container.style.width = `${width + 50}px`
  }

  private calculateVisualLength = (editor, string) => {
    const { fontFamily, fontSize } = editor.getOptions()
    const { width } = calculateSize(string, {
      font: fontFamily,
      fontSize: fontSize
    })

    return width
  }
}

export default StepCompleter
