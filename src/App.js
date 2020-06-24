import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand } from 'reactstrap';
 import 'bootstrap/dist/css/bootstrap.css';

import VisitList from './components/visit_list.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
    <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/"><b>Alhambra</b></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
        </Navbar>
        <div className ="container">
            <VisitList />
        </div>
    </div>
    );
  }
}
