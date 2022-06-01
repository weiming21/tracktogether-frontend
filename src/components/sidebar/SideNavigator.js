// import React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// // import MuiAppBar from '@mui/material/AppBar';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import Navigator from '../navbar/Navigator';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// // const DrawerHeader = styled('div')(({ theme }) => ({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'flex-end',
// //   padding: theme.spacing(0, 1),
// //   // necessary for content to be below app bar
// //   ...theme.mixins.toolbar,
// // }));

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   ...(open && {
//     ...openedMixin(theme),
//     '& .MuiDrawer-paper': openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     '& .MuiDrawer-paper': closedMixin(theme),
//   }),
// }));

// function SideNavigator() {
//   // const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     // <Box sx={{ display: 'flex' }}>
//     // <CssBaseline />
//     <>
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Navigator />
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <Toolbar />
//         {/* <DrawerHeader> */}
//         <IconButton onClick={handleDrawer}>
//           {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuIcon />} */}
//           <MenuIcon />
//         </IconButton>
//         {/* </DrawerHeader> */}
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}>
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}>
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </>
//   );
// }

import { React, useContext } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';

function SideNavigator() {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'auto',
        // position: 'absolute',
      }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}>
            TrackTogether
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/home">
              <CDBSidebarMenuItem
                icon="home"
                active={matchPath(location.pathname, '/home')}>
                {' '}
                Home
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/personal">
              <CDBSidebarMenuItem
                icon="user"
                active={matchPath(location.pathname, '/personal')}>
                Personal
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/group" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="users"
                active={matchPath(location.pathname, '/group')}>
                Group
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/outstanding" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="hand-holding-usd"
                active={matchPath(location.pathname, '/outstanding')}>
                Outstanding
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <NavLink
            exact
            to="/"
            activeClassName="activeClicked"
            onClick={authCtx.logout}>
            <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideNavigator;
