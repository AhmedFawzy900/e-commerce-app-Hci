import AdbIcon from '@mui/icons-material/Adb';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer() {
    return (
        <footer class="footer-59391">
        <div class="border-bottom pb-5 mb-4">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-3">
                <form action="#" class="subscribe mb-4 mb-lg-0">
                  <div class="form-group">
                  <input type="email" class="form-control" placeholder="Enter your email" />
                  <button><span class="icon-keyboard_backspace"></span></button>
                  </div>
                </form>
              </div>
              <div class="col-lg-6 text-lg-center">
                <ul class="list-unstyled nav-links nav-left mb-4 mb-lg-0">
                  <li><a className='text-decoration-none' href="#">Features</a></li>
                  <li><a className='text-decoration-none' href="#">Blog</a></li>
                  <li><a className='text-decoration-none' href="#">Pricing</a></li>
                  <li><a className='text-decoration-none' href="#">Services</a></li>
                </ul>
              </div>
              <div class="col-lg-3">
                <ul class="list-unstyled nav-links social nav-right text-lg-right">
                  <li><a className='text-decoration-none text-skyblue' href="#"><FacebookIcon/></a></li>
                  <li><a className='text-decoration-none' href="#"><InstagramIcon/></a></li>
                  <li><a className='text-decoration-none' href="#"><WhatsAppIcon/></a></li>
                  <li><a className='text-decoration-none' href="#"><LinkedInIcon/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-4 text-lg-center d-flex align-items-center justify-content-center site-logo order-1 order-lg-2 mb-3 mb-lg-0">
            <AdbIcon sx={{ display:'flex', mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display:'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to={'/'} className='text-decoration-none text-black'>e-commerce</Link> 
          </Typography>
            </div>
            <div class="col-lg-4 order-2 order-lg-1 mb-3 mb-lg-0">
              <ul class="list-unstyled nav-links m-0 nav-left">
                <li><a href="#">Terms</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div class="col-lg-4 text-lg-right order-3 order-lg-3">
              <p class="m-0 text-muted"><small>&copy; 2019. All Rights Reserved.</small></p>
            </div>
          </div>
        </div>

    </footer>
    );
}