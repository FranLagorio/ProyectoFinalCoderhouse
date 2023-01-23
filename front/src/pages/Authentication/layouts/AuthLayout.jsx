import { Grid } from '@mui/material'

export const AuthLayout = ({ children, bgColorPick }) => {
  return (
    <Grid
      container
      // para que no haya espacio entre hijos
      spacing={0}
      // direction es como flexbox
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        background: `${bgColorPick}`,
      }}>
      {children}
    </Grid>
  )
}
