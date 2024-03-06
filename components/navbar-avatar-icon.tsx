import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Box, Typography } from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authUtils } from "../firebase/auth-utils";
import { useAuthContext } from "./auth-context-provider";
import { useUserDataQuery } from "../generated/graphql";

export const HeaderProfileButton = () => {
    const { loading, user } = useAuthContext();
    const auth = useAuthContext();
    console.log(auth); 
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const [username, setUsername] = useState(user?.username ?? "");
    const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {data, refetch} = useUserDataQuery({variables: {email: user?.email ?? ""}});
    
    
    const hover = {
        "&:hover": {
            backgroundColor: "blue",
            transition: 'background-color 0.5s ease'
        },
        '&:not(:hover)': {
            backgroundColor: "#3562a6",
            transition: 'background-color 0.5s ease'
        },
    };

    
    return (
        <>
            <Button onClick={handleClickOpen} sx={{ display: 'flex' }}>
                <AccountCircleIcon sx={{ height: '50px', width: '50px', color: "white" }} />
            </Button>
            <Box>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ position: 'absolute' }}>
                    <MenuItem sx={{ fontWeight: 'bold', borderBottom: '2px solid ' + "white", padding: '6px 16px', pointerEvents: 'none' }}>
                        <Typography sx={{ fontWeight: '550', fontSize: '17px' }}>{user?.email}</Typography>
                    </MenuItem>
                    <MenuItem sx={{ ...hover }}>
                        <Link style={{ color: "white", textDecoration: 'none' }} href={'#'}>Profile</Link>
                    </MenuItem>
                    <MenuItem sx={{ ...hover }}>
                        <Link style={{ color: "white", textDecoration: 'none' }} href={'#'}>Settings</Link>
                    </MenuItem>
                    <MenuItem sx={{ ...hover }}>
                        <Link style={{ color: "white", textDecoration: 'none' }} href={'/login'} onClick={authUtils.logout}>Logout</Link>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};