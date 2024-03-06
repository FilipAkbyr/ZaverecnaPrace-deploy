import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import { Box, Typography, Button } from "@mui/material";


export const Home: NextPage = () => 
{
    return (
        <>
        <Head>
            <title>Notable reality</title>
        </Head>
        <Navbar></Navbar>
        <Box sx={{
          position: 'static',
          layout: 'fill',
          objectFit: 'cover',
          backgroundImage: 'url(/background.jpg)',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '-64px',
        }}> 
        </Box>

<Box>
<Typography
          variant="h4"
          component="div"
          sx={{
            position: 'absolute',
            left: '8%', 
            top: '40%',
            transform: 'translateY(-50%)',
            color: 'white',
          }}
        >
            Live like in the palm of your hand
            <br />
            cheap and close    
        </Typography>
        <Typography variant="h5"
        component="div"
        sx={{
          position: 'absolute',
          left: '8%',
          top: '54%',
          transform: 'translateY(-50%)',
          color: 'white',
        }}
        >
        Check out our offers below
        </Typography>
        <Button
        variant="contained"
        href="adverts"
        color="primary"
        sx={{
          position: 'absolute',
          left: '8%', 
          top: '55%', 
          width: '200px',
          borderRadius: '12px',
          marginTop: '10px',
          background: "#3562a6"
        }}
      >
        Offers
      </Button>
</Box>
        
        
        </>
    );
}
export default Home;