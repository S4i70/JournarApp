import { Typography, Grid } from "@mui/material"

export const Isloading = () => {


  return (
    <Grid
        container
        sx={{
          borderRadius: 4,
          opacity: 0.9,
          backgroundColor: "#262254",
          width: 350,
          position: "fixed",
          justifyContent: "center",
          right: {xs:'10%', md: '20%', lg:'30%'},
          bottom: 300,
        }} >
          <Grid item sx={{mt:3, mr:3,}}>
            <Typography 
              variant="h4"
              color="white"
              >Cargando imagen...</Typography>
          </Grid>
          <Grid item>
            <div className="lds-heart">
              <div></div>
            </div>
          </Grid>
      </Grid>
  )
}
