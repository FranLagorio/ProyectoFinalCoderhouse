import { ThemeProvider } from '@emotion/react'
import { purpleTheme } from './'
// import {fontTheme} from "./"

export const AppTheme = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={purpleTheme}>{children}</ThemeProvider>
    </>
  )
}
