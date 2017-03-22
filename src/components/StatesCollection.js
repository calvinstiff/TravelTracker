import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';

class StatesCollection extends React.Component {

  constructor(){
    super();
    this.state = {
      states: []
    };
    this.fetchStates = this.fetchStates.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
    this.calcStateComp = this.calcStateComp.bind(this);
  }

  componentDidMount() {
    this.fetchStates();
  }

  prepareCollection(){
    return this.state.states.map(function(x){
      if (this.props.userStore.states.find(function(y){
        return y==x.name;
      })) {
        return (<ListGroupItem onClick={() => {this.props.userStore.toggleState(this.props.userStore.name, x.name);}} key={x.name}>
          <Glyphicon glyph="check" style={{color: "green"}}/> {x.name},</ListGroupItem>);
      } else {return <ListGroupItem onClick={() => {this.props.userStore.toggleState(this.props.userStore.name, x.name);}} key={x.name}>{x.name}</ListGroupItem>;}
    },this);
  }

  fetchStates() {
    fetch(`/states`)
    .then(result => result.json())
    .then(data => this.setState({states: data}));
  }

  calcStateComp() {
    return ((this.props.userStore.states.length/50)*100);
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};
    let progressStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto", width: "90%"};
    let imageStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto",
      width: "48vw", height: "65vh", border: "2px solid black"};
    return (
      <Row>
        <Col xs={12} md={9}>
          <div style={progressStyle}>
            <h3>States collection: {this.calcStateComp().toFixed(0)}%</h3>
            <ProgressBar active now={this.calcStateComp()}/>
            <img style={imageStyle} src={require('../img/us3.png')}/>
          </div>
        </Col>
        <Col xs={12} md={3}>
          States
          <ListGroup style={listStyle}>
            {this.prepareCollection()}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

StatesCollection.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(StatesCollection));
