import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, SubMenu, ProSidebarProvider } from "react-pro-sidebar";
import Logo from "../assets/img/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { TbApiApp } from "react-icons/tb";
import { GiToken } from "react-icons/gi";
import "../assets/sass/sidebarmenu.scss";
const NavigationMenu = (props) => {
  return (
    <>
      <div className="sidebarmenubar">
        <div className="sidebarmenulist">
          <div
            className={`pro-sidebar ${!props.menuCollapse ? "collapsed" : ""}`}
          >
            <div className="pro-sidebar-inner">
              <ProSidebarProvider
                className={props.menuCollapse ? null : "collapsed"}
              >
                {props.menuCollapse ? (
                  <div className="logo-field">
                    <img src={Logo} alt="logo" />
                  </div>
                ) : (
                  <img src={Logo} alt="logo" />
                )}
                <Menu iconShape="square">
                  <SubMenu icon={<MdOutlineDashboard />} label="Dashboard">
                    <MenuItem routerLink={<Link to="/Messages" />}>
                      Messages
                    </MenuItem>
                    <MenuItem> Languages</MenuItem>
                    <MenuItem> Social Links</MenuItem>
                  </SubMenu>
                  <SubMenu icon={<GiToken />} label="Manage Token">
                    <MenuItem routerLink={<Link to="/Token" />}>
                      Top Tokens
                    </MenuItem>
                    <MenuItem routerLink={<Link to="/SponsorToken" />}>
                      Sponsor Tokens
                    </MenuItem>
                    <MenuItem>Block Tokens</MenuItem>
                  </SubMenu>

                  <SubMenu icon={<TbApiApp />} label="Manage API">
                    <MenuItem> Enable Disable API</MenuItem>
                    <MenuItem> Check Status</MenuItem>
                  </SubMenu>
                </Menu>
              </ProSidebarProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
