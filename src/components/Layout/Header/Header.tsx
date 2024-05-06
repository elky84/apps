
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
                내 앱
              </Typography>
            </Box>
            {["/", "/about", "/projects", "/blog"].map((path, index) => (
                <Button key={index} color="inherit"  component={RouterLink} to={path} sx={{ color: "primary.main" }}>
                    {["홈", "소개", "프로젝트", "블로그"][index]}
                </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
  
export default Header