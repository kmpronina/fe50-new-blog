import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, ArtTrack } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  List,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import useThemeColors from '#hooks/useThemeColors';
import { useAppSelector } from '#store/store';
import { RouterLocationsEnum } from '#router/Router';
import {
  setDrawerOpen,
  setDrawerClose,
} from '#store/reducers/drawerReducer/actions';

interface Props extends PropsWithChildren {
  title?: string;
}

const ContentWithDrawer: React.FC<Props> = (props) => {
  const { children, title } = props;
  const { user } = useAppSelector((state) => state.userReducer);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.drawerReducer.isOpen);
  const { backgroundColor, textColor } = useThemeColors();

  const handleCloseDrawer = () => {
    dispatch(setDrawerClose());
  };
  const handleOpenDrawer = () => {
    dispatch(setDrawerOpen());
  };
  const handleNavigateToRoute = (route: RouterLocationsEnum) => {
    navigation(route);
  };

  return (
    <Box
      sx={{
        padding: '0 15px',
        minHeight: '100vh',
        background: backgroundColor,
        color: textColor,
      }}
    >
      <AppBar>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alingItems: 'center',
          }}
        >
          <Typography variant="h4" noWrap component="div">
            <Menu onClick={handleOpenDrawer} sx={{ cursor: 'pointer' }} />{' '}
            {title}
          </Typography>
          <Typography>{user && user.email}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={isOpen} onClose={handleCloseDrawer}>
        <List>
          <ListItem>
            <ListItemButton
              onClick={() =>
                handleNavigateToRoute(RouterLocationsEnum.blogPage)
              }
            >
              <ListItemIcon>
                <ArtTrack />
              </ListItemIcon>
              <ListItemText>Blog</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          position: 'relative',
          top: '64px',
          height: 'calc(100vh - 64px + 10px)',
          padding: '10px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default ContentWithDrawer;
