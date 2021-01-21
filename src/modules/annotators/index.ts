import GherkinAnnotator from './gherkin'

export type Annotation = {
  line: number
  row: number
  character: number
  column: number
  text: string
  type: 'warning' | 'error'
}

export interface Annotator {
  getAnnotations(value: string): Annotation[]
}

export { GherkinAnnotator }
