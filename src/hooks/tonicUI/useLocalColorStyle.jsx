import { useColorMode, useColorStyle } from '@tonic-ui/react'

const useLocalColorStyle = () => {
  const [colorMode] = useColorMode()
  const [colorStyle] = useColorStyle({ colorMode })

  // official example
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode]

  const tableBorderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode]

  const dividerColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode]

  return {
    colorStyle,
    hoverBackgroundColor,
    tableBorderColor,
    dividerColor,
  }
}

export default useLocalColorStyle
