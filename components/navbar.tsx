import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { HeaderProfileButton } from './navbar-avatar-icon';
import { useState } from 'react';

export const Navbar = () => {


  const [isLogged, setIsLogged] = useState(false);

  
  return (
    <AppBar sx={{ position: 'static', margin: '0px', zIndex: 10000, background: "#3562a6" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
       
          <Link href="/" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
            <Typography variant="h6" color="inherit" component="div" >
              Home
            </Typography>
          </Link>
          <Link href="/adverts" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
            <Typography variant="h6" color="inherit" component="div">
              Offers
            </Typography>
          </Link>
          <Link href="/about" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
            <Typography variant="h6" color="inherit" component="div">
              About
            </Typography>
          </Link>
          {isLogged ? null : 
          <Link href="/login" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
            <Typography variant="h6" color="inherit" component="div">
              Login
            </Typography>
          </Link>
          }
          <Link href="/register" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
            <Typography variant="h6" color="inherit" component="div">
              Register
            </Typography>
          </Link>
          <HeaderProfileButton />
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;