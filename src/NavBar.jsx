import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavBar = ({ setCoin, coin }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#f8c8d8', width: '700px', margin:'auto' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* אפשרויות ניווט */}
        <div>
          <Button component={Link} to="list" sx={{ color: '#fff' }}>
            לכל התרומות
          </Button>
          <Button component={Link} to="toDonate" sx={{ color: '#fff' }}>
            תרום עכשיו
          </Button>
        </div>

        {/* כפתור שינוי המטבע */}
        <div>
          <Button 
            variant="outlined" 
            value="SHEKEL" 
            onClick={(e) => setCoin({ ...coin, type: e.target.value })}
            sx={{ color: '#fff', borderColor: '#fff', marginRight: 1 }}
          >
            Shekel
          </Button>
          <Button 
            variant="outlined" 
            value="DOLLAR" 
            onClick={(e) => setCoin({ ...coin, type: e.target.value })}
            sx={{ color: '#fff', borderColor: '#fff' }}
          >
            Dollar
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
