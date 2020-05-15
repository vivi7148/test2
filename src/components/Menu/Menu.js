import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/id" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Manage Authors
      </a>
      <a href="/loan-management" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Loan Books
        </a>
      <a href="/member-management" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Manage Members
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
