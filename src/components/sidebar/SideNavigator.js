import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

function SideNavigator() {
  return (
    <div
      style={{ display: 'flex', height: '90vh', overflow: 'scroll initial' }}>
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
            <NavLink exact to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/personal" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Personal</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/group" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Group</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/outstanding" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hand-holding-usd">
                Outstanding
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideNavigator;
