import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
export const CustomNavBar = () => {
  return (
    <React.Fragment>
      <Navbar color='primary' dark expand='md'>
        <NavbarBrand href='/'>Crud Con React</NavbarBrand>
      </Navbar>
    </React.Fragment>
  );
};
