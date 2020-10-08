import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Button,
  Dropdown,
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/LOGO.png";
import sygnet from "../../assets/img/brand/favicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { authenticationLogout } from "../Auth/actions";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = ({ children, ...attributes }) => {
  const dispatch = useDispatch();
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const { username } = useSelector((state) => state.auth.toJS().userInfo);

  return (
    <React.Fragment>
      <Dropdown
        id='usernameDropdown'
        color="primary"
        isOpen={dropdownToggled}
        toggle={() => setDropdownToggled(!dropdownToggled)}>
        <DropdownToggle color="primary" className='m-2'>
          {username}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => dispatch(authenticationLogout())}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AppNavbarBrand
        full={{
          src: logo,
          width: 150,
          height: 50,
          alt: "CoreUI Logo",
        }}
        minimized={{
          src: sygnet,
          width: 30,
          height: 30,
          alt: "CoreUI Logo",
        }}
      />
      {/* <button
        className='btn btn-primary m-2'
        onClick={() => dispatch(authenticationLogout())}>
        Logout
      </button> */}
    </React.Fragment>
  );
};

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
