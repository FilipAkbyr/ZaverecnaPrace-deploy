
import { Typography, Container, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { NextPage } from 'next';
import Navbar from '../components/navbar';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AboutPage: NextPage = () => {
  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          Welcome to our website! We are a small group of people who are passionate about real estate and want to
            help you find your dream home.
        </Typography>
        <Typography paragraph>
          Our mission is to make your online experience enjoyable and informative. Feel free to
          explore our website and discover the wealth of the offers we have for you.
        </Typography>
        <Typography paragraph>
          If you have any questions or suggestions, please do not hesitate to reach out to us.
        </Typography>
        <Typography paragraph>
          <CallIcon /> 606 60 50 70 <br />
          <EmailIcon /> info@notable-reality.cz <br />
          <LocationOnIcon /> Česká Třebová, Czech Republic
        </Typography>
        <Link href="/" passHref>
          <Button sx={{background: "#3562a6"}}variant="contained" color="primary">
            Go Back Home
          </Button>
        </Link>
      </Paper>
    </Container>
    </> 
  );
};

export default AboutPage;