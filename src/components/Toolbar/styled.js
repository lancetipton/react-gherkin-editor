import { reStyle } from '@keg-hub/re-theme/reStyle'
import { View } from '@keg-hub/keg-components/view'

export const ToolbarContainer = reStyle('div')((__, props) => ({
  ...props?.style,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 3,
  backgroundColor: 'rgb(235, 236, 240)'
}))

export const LanguageDropdownContainer = reStyle('div')((__, props) => ({
  ...props?.style,
  minWidth: 150,
}))

