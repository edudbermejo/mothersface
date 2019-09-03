import React from 'react';
import './MotherInterface.scss';
import logo from './nostromo.png';

class MotherInterface extends React.Component {
  constructor(props) {
    super(props)
    this.ripleyInput = React.createRef()
    this.focusOnInput = this.focusOnInput.bind(this)
  }

  focusOnInput() {
    this.ripleyInput.current.focus()
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
            <input type="textarea" name="ripley-input" ref={this.ripleyInput} autoFocus></input>
            <span className="cursor"></span>
          </div>
        </div>
      </main>
    </div>
    )};
}

export default MotherInterface;
