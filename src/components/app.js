import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import * as Actions from '../actions'
import Alerts from './alerts'
import Alert from './alert'

import PlayerModal from './players'

import Api from '../utils/api'

const App = props => {

  if (!Api.gameIdIsSet()) props.showPlayerModal(true)

  const handleDropdownAction = key => {
    switch (key) {
      case 'cancel':
        props.undoLastTurn()
        break
      case 'clear':
        Api.submitScores(props.players, props.scoreBoard)
        Api.resetGameId()
        props.clearTurns()
        props.showPlayerModal(true)
        break
      case 'players':
        props.showPlayerModal(true)
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
                Help
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
                New game
              </MenuItem>
              <MenuItem eventKey={'players'}>
                Edit players
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <PlayerModal
        text={props.players.join('\n')}
        changePlayers={(text) => {
          props.changePlayers(text.split('\n'))
          props.showPlayerModal(false)
          if (!Api.gameIdIsSet()) Api.resetGameId()
        }}
        visible={props.playerModalVisible}
        toggle={() => props.showPlayerModal(!props.playerModalVisible)}
      />
    </div>
  )
}

App.propTypes = {
  undoLastTurn: PropTypes.func,
  clearTurns: PropTypes.func,
  alerts: PropTypes.array,
  children: PropTypes.element,
  showPlayerModal: PropTypes.func,
  players: PropTypes.array,
  changePlayers: PropTypes.func,
  playerModalVisible: PropTypes.bool,
  scoreBoard: PropTypes.array
}



function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    players: state.players,
    scoreBoard: state.scoreBoard,
    playerModalVisible: state.playerModalVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      undoLastTurn: Actions.undoLastTurn,
      clearTurns: Actions.clearTurns,
      showPlayerModal: Actions.showPlayerModal,
      changePlayers: Actions.changePlayers
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
