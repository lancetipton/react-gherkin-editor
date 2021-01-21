import { Dialect, dialects } from '@cucumber/gherkin'
import pick from 'lodash/pick'
import { LanguageIdentifier } from '../../lib/gherkin-languages'
import { GherkinMode } from '../../modules/mode'

type KeywordSet = {
  featureKeywords: string[]
  stepKeywords: string[]
}

export const dialectFor = (languageIdentifier: LanguageIdentifier): Dialect =>
  dialects[languageIdentifier]

export const partialDialectFor = (
  languageIdentifier: LanguageIdentifier,
  mode: GherkinMode
): Partial<Dialect> => {
  const dialect = dialectFor(languageIdentifier)
  switch (mode) {
    case 'background':
      return pick(dialect, ['given', 'when', 'then', 'and', 'but'])
    case 'scenario':
      return pick(dialect, ['given', 'when', 'then', 'and', 'but', 'examples'])
    default:
      return dialect
  }
}

export const keywordSetFor = (dialect: Partial<Dialect>): KeywordSet => {
  const isDefined = value => value !== undefined
  const trimWhiteSpace = (string: string) => string.trim()

  return {
    featureKeywords: [
      dialect.feature,
      dialect.background,
      dialect.rule,
      dialect.scenario,
      dialect.scenarioOutline,
      dialect.examples
    ]
      .filter(isDefined)
      .flat()
      .map(trimWhiteSpace),

    stepKeywords: [
      dialect.given,
      dialect.when,
      dialect.then,
      dialect.and,
      dialect.but
    ]
      .filter(isDefined)
      .flat()
      .map(trimWhiteSpace)
  }
}