import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, ArtTrack } from "@mui/icons-material";
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
} from "@mui/material";
import useThemeColors from "#hooks/useThemeColors";
import { useAppSelector } from "#store/store";
import { RouterLocationsEnum } from "#router/Router";
import {
  setDrawerOpen,
  setDrawerClose,
} from "#store/reducers/drawerReducer/actions";
import ThemeController from "#components/themeController";
import PostSearch from "#components/postSearch";

interface Props extends PropsWithChildren {
  title?: string;
}

const ContentWithDrawer: React.FC<Props> = (props) => {
  const { children, title } = props;
  const { user } = useAppSelector((state) => state.userReducer);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.drawerReducer.isOpen);
  const { backgroundColor, textColor, cardBgColor, titleColor } =
    useThemeColors();

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
        padding: "0 15px",
        minHeight: "100vh",
        background: backgroundColor,
        color: textColor,
        transition: "0.2s",
        paddingBottom: "124px",
      }}
    >
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alingItems: "center",
            background: cardBgColor,
            color: titleColor,
            transition: "0.2s",
          }}
        >
          <Typography variant="h4" noWrap component="div">
            <Menu onClick={handleOpenDrawer} sx={{ cursor: "pointer" }} />
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <PostSearch />
            <Typography sx={{ color: titleColor }}>
              {user && user.email}
            </Typography>
            <ThemeController />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={isOpen} onClose={handleCloseDrawer}>
        <List sx={{ background: cardBgColor, color: titleColor }}>
          <ListItem key={"menuListItem-1"}>
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
          {/* <ListItem key={"menuListItem-2"}></ListItem> */}
          {/* <ListItem key={"menuListItem-3"}></ListItem> */}
          {/* <ListItem key={"menuListItem-4"}></ListItem> */}
        </List>
      </Drawer>
      <Box
        sx={{
          position: "relative",
          top: "64px",
          // height: "calc(100vh - 64px + 10px)",
          height: "100%",
          padding: "10px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default ContentWithDrawer;
