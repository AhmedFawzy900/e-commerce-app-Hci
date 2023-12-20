import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartItems,setCart] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  React.useEffect(() => {
      getAllCart(user && user.id);
  });
  const getAllCart = (userId) =>{
      fetch(`http://localhost:9000/cart/?user_id=${userId}`)
      .then(res=>res.json())
      .then(data=>setCart(data));
  }
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
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    
  };
  return (
    <AppBar position="static" className='nav'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'}>e-commerce</Link> 
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }  }}>
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
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/cart"} className='text-decoration-none text-black d-flex align-items-center'>
                    {cartItems.length > 0 && (
                      <span className='cart-count'>{cartItems.length}</span>
                    )}
                      <ShoppingCartIcon /> Cart
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/create"} className='text-decoration-none text-black d-flex align-items-center'>

                      <AddCircleOutlineIcon /> Create
                    </Link>
                  </Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to={'/'}>e-commerce</Link> 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:'flex-end',marginRight:'20px' }}>
            
              <Button
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >

                <Link to={"/cart"} className='link'>
                {cartItems.length > 0 && (
                  <span className='cart-count'>{cartItems.length}</span>
                )}
                  <ShoppingCartIcon /> Card
                </Link>
              </Button>
              <Button  
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                { user ? (
                    <Link to={"/create"} className='link'>

                    <AddCircleOutlineIcon /> Create
                  </Link>
                  ) : (
                    <Link to={"/login"} className='link'>

                  <AddCircleOutlineIcon /> Create
                </Link>
                  )}
                {/* <Link to={"/create"} className='link'>

                  <AddCircleOutlineIcon /> Create
                </Link>*/}
              </Button> 
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
              user ? (
                <>
                
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <img alt='avatar' src={user.image} className='profile-image' />
                    </IconButton>
                  </Tooltip> 
                  
                </>
                  
              ) : (
                <Button  
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={"/login"} className='link login btn btn-outline-light'>
                  login
                </Link>
              </Button>
              )
            }
           {user && (
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
            
              <MenuItem >
                <Link className='menu-link' to={'/profile'}>
                  <Typography textAlign="center">profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem >
                <Link className='menu-link' to={'/orders'}>
                  <Typography textAlign="center">orders</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">logout</Typography>
              </MenuItem>
            
              </Menu>
           )}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;