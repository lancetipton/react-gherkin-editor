import { reStyle } from '@keg-hub/re-theme/reStyle'

export const EditorWrapper = reStyle('div')((__, props) => ({
  ...props?.style,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'rgb(223, 225, 230)',
  borderRadius: 3,
}))
