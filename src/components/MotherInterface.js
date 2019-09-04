import React from 'react';
import './MotherInterface.scss';
import logo from './nostromo.png';

class MotherInterface extends React.Component {
  constructor(props) {
    super(props)
    this.ripleyInput = React.createRef()
    this.focusOnInput = this.focusOnInput.bind(this)
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
  }

  focusOnInput() {
    this.ripleyInput.current.focus()
  }

  preventDefaultBehaviour(event) {
    event.preventDefault()
  }

  handleInputKeyDown(event) {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
    } else {
      if(event.keyCode === 8) { // backspace
        this.ripleyInput.current.style.width = `${(this.ripleyInput.current.value.length - 1)*0.4}em`
      }
      else if(this.ripleyInput.current.value.length < 40){
        this.ripleyInput.current.style.width = `${(this.ripleyInput.current.value.length + 1)*0.4}em`
      }
    }
  }

  render() {
    return (
    <div className="Mother-interface" onClick={this.focusOnInput}>
      <header className="Mother-header">
        <h1>MU/TH/UR</h1>
        <h2>6000</h2>
        <img src={logo} className="Mother-logo" alt=""/>
      </header>
      <main className="Mother-main">
        <div className="chat-container">
          <div className="active-line">
            <label htmlFor="ripley-input">YOU:</label>
            <input 
              type="text" 
              maxLength="40"
              name="ripley-input" 
              ref={this.ripleyInput} 
              onKeyDown={this.handleInputKeyDown}
              onMouseDown={this.preventDefaultBehaviour}
              autoFocus></input>
            <span className="cursor"></span>
          </div>
        </div>
      </main>
    </div>
    )};
}

export default MotherInterface;
