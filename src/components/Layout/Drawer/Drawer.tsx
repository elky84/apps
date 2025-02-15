import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <List>
          {["/", "/?category=game", "/?category=app", "/?category=library"].map((path, index) => (
            <ListItemButton key={index} component={RouterLink} to={path} onClick={onClose}>
              <ListItemText primary={["홈", "게임", "앱", "라이브러리"][index]} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default MenuDrawer;
