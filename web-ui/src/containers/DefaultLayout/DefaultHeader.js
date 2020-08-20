import React from "react";
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
} from "reactstrap";
import PropTypes from "prop-types";

import {
    AppAsideToggler,
    AppNavbarBrand,
    AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../Auth/actions";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = ({ children, ...attributes }) => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <AppNavbarBrand
                full={{
                    src: logo,
                    width: 89,
                    height: 25,
                    alt: "CoreUI Logo",
                }}
                minimized={{
                    src: sygnet,
                    width: 30,
                    height: 30,
                    alt: "CoreUI Logo",
                }}
            />
            <button
                className="btn btn-primary m-2"
                onClick={() => dispatch(logoutRequest())}
            >
                Logout
            </button>
        </React.Fragment>
    );
};

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
