import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const pages = [{
  settings: 'Home',
  link: '/authenticated',
}, {
  settings: 'Events',
  link: '/events',
}];

const notAuthenticated = [{
  settings: 'Login',
  link: '/',
}, {
  settings: 'Register',
  link: '/register',
}];

const settings = [{
  setting: 'Profile',
  settingIcons: <PersonIcon />,
  link: '/profile',
}];

export default function Navbar () {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const local = localStorage.getItem("token");

  useEffect(() => {
    setAuthenticated(local !== null)
  }, [local]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setAnchorElUser(null);
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <AppBar sx={{background:"#191919"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EventPeak
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {authenticated ? pages.map((page) => (
                <Link to={page.link} key={page.settings} className='text-black'>
                  <MenuItem key={page.settings} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.settings}</Typography>
                  </MenuItem>
                </Link>
                  
                )) : notAuthenticated.map((item) => (
                  <Link to={item.link} key={item.settings} className='text-black'>
                    <MenuItem key={item.settings} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{item.settings}</Typography>
                    </MenuItem>
                  </Link>
                ))
              }
              
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EventPeak
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {authenticated ? pages.map((page) => (
              <Link to={page.link} key={page.settings}>
                <Button
                  key={page.settings}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.settings}
                </Button>
              </Link>
            )) : notAuthenticated.map((item) => (
              <Link to={item.link} key={item.settings}>
                <Button
                  key={item.settings}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.settings}
                </Button>
              </Link>
            ))
          }
            
          </Box>
          {authenticated ? 
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((item) => (
                  <Link key={item.setting} to={item.link} style={{color: "black", textDecoration: "none"}}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {item.settingIcons}
                      <Typography textAlign="center">{item.setting}</Typography>
                    </MenuItem>
                  </Link>
                  
                ))}
                <MenuItem 
                  onClick={logout}
                  sx={{ color: 'red' }}
                >
                  <LogoutIcon />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box> 
            : null
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}