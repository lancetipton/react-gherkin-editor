import KeywordCompleter from './keyword'
import StepCompleter from './step'

interface Completer {
  getCompletions(
    editor: any,
    session: any,
    position: any,
    _prefix: any,
    callback: Function
  ): Promise<void>
}

export { Completer, KeywordCompleter, StepCompleter }
