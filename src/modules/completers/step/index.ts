import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import calculateSize from 'calculate-size'
import { Dialect } from '@cucumber/gherkin'
import { Ace } from 'ace-builds'
import { keywordSetFor } from '../../dialect'

export type Step = {
  name: string
  value: string
  score: number
}

class StepCompleter implements Ace.Completer {
  constructor(
    private readonly dialect: Partial<Dialect>,
    private readonly autoCompleteFunction: (
      keyword: string,
      text: string
    ) => Promise<Step[]>
  ) {}

  async getCompletions(editor, session, position, prefix, callback) {
    const lineTokens = session.getLine(position.row).trim().split(' ')
    const keywordSet = keywordSetFor(this.dialect)
    const keywords = keywordSet.stepKeywords

    if (lineTokens.length > 1 && keywords.includes(lineTokens[0])) {
      const keyword = lineTokens.shift()
      const text = lineTokens.join(' ')
      try {
        const completions = await this.autoCompleteFunction(keyword, text)
        callback(null, completions)
        this.resizePopup(editor, completions)
      } catch (error) {
        callback(null, [])
        console.error(error)
      }
    }
  }

  private resizePopup = (editor, completions) => {
    if (_isEmpty(completions)) {
      return
    }

    const longestString = _orderBy(
      _map(completions, 'caption'),
      'length',
      'desc'
    ).shift()

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
