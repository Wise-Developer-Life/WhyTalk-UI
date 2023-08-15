import { Box, useColorMode, useColorStyle } from '@tonic-ui/react'
import { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const GlobalStyle = createGlobalStyle`
  :root {
    --login-card-height: 310px;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    
  }
  body {
    margin: 0;
    font-size: .875rem;
    line-height: 1.25rem;
    min-height: 100vh;
    min-width: 360px;
    //background: linear-gradient(-45deg, #7ee0d2, #6b9cdb, #00db75, #7ee0d2);
    //background: linear-gradient(-45deg, #002f26, #1c669b, #a06616, #612e00);
    background: linear-gradient(-45deg, #001d4f, #1c669b, #be5c43, #8a000f);
  }
`

const Layout = props => {
  const [colorMode] = useColorMode()
  const [colorStyle] = useColorStyle({ colorMode })
  const color = colorStyle.color.primary

  return (
    <>
      <GlobalStyle />
      <Box
        className={styles.layout}
        color={color}
        fontSize="sm"
        lineHeight="sm"
      >
        {props.children}
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
export default Layout
