import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import * as Actions from '../actions'
import Alerts from './alerts'
import Alert from './alert'


const App = props => {
  const handleDropdownAction = key => {
    switch (key) {
      case 'cancel':
        props.undoLastTurn()
        break
      case 'clear':
        props.clearTurns()
        break
      default:
        break
    }
  }

  return (
    <div>
      <Alerts alerts={props.alerts}>
        <Alert />
      </Alerts>
      {props.children}
      <Navbar fixedBottom>
        <Navbar.Header>
          <Link to="/scorecard">
            <Navbar.Brand>
              SikaScore
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/scorecard">
              <NavItem eventKey={1}>
                Submit scores
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/scoreboard">
              <NavItem eventKey={2}>
                Scoreboard
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/help">
              <NavItem eventKey={3}>
                Ohjeet
              </NavItem>
            </LinkContainer>
            <NavDropdown
              title="Control"
              id="label-mode-dropdown"
              onSelect={handleDropdownAction}
            >
              <MenuItem eventKey={'cancel'}>
                Undo last
              </MenuItem>
              <MenuItem eventKey={'clear'}>
                Clear scoreboard
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

App.propTypes = {
  undoLastTurn: React.PropTypes.func,
  clearTurns: React.PropTypes.func,
  alerts: React.PropTypes.array,
  children: React.PropTypes.element
}



function mapStateToProps(state) {
  return {
    alerts: state.alerts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      undoLastTurn: Actions.undoLastTurn,
      clearTurns: Actions.clearTurns
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
