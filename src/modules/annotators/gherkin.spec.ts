import { dialectFor } from '../dialect'
import GherkinAnnotator from './gherkin'

describe('GherkinAnnotator', () => {
  it('works', () => {
    const dialect = dialectFor('en')
    const annotator = new GherkinAnnotator(dialect, 'feature')

    expect(annotator).toBeDefined()
  })

  it('parse a gherkin document', () => {
    const dialect = dialectFor('en')
    const annotator = new GherkinAnnotator(dialect, 'feature')

    expect(annotator.getAnnotations('Feature: My awsome feature')).toHaveLength(0)
  })
})
