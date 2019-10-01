import React from 'react';
import './MotherInterface.scss';
import logo from './nostromo.png';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class MotherInterface extends React.Component {
  constructor(props) {
    super(props)
    this.backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'
    this.ripleyInput = React.createRef()
    this.mothersLine = React.createRef()
    this.focusOnInput = this.focusOnInput.bind(this)
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
    this.chat = this.chat.bind(this)
    this.state = {
      mothersTurn: false,
      pastChats: [],
      mothersText: ''
    }
  }

  focusOnInput() {
    this.ripleyInput.current.focus()
  }

  preventDefaultBehaviour(event) {
    event.preventDefault()
  }

  async chat() {
    this.setState({
      mothersTurn: true,
      mothersText: 'MOTHER: '
    })
    const response = await fetch(this.backendUrl + '/chat', {
      method: 'POST',
      body: JSON.stringify({
        text: this.ripleyInput.current.value
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const responseJsoned = await response.json();
    const mothersChat = responseJsoned.text.toUpperCase()

    mothersChat.split('').forEach(async (letter, index) =>{
      await sleep(100 * index)
      this.setState({mothersText: this.state.mothersText + letter})
    })

    await sleep(100 * mothersChat.length + 1)
  }

  async handleInputKeyDown(event) {
    if(event.key === 'Enter'){
      let newPastChats = this.state.pastChats
      newPastChats.push('YOU: ' + this.ripleyInput.current.value.toUpperCase())
      await this.chat()
      newPastChats.push(this.state.mothersText)
      this.setState({
        mothersTurn: false,
        pastChats: newPastChats
      })
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
    const mothersTurn = this.state.mothersTurn
    const pastChats = this.state.pastChats
    const mothersText = this.state.mothersText
    let previousLines = []
    let activeLine

    pastChats.forEach((line, index) =>{
      previousLines.push(<span className="whole-width" key={'prev-chats-' + index}>{line}</span>)
    })

    if (!mothersTurn) {
      activeLine = (
        <div className="active-line">
          <label htmlFor="ripley-input">YOU:</label>
          <input 
            type="text" 
            maxLength="40"
            name="ripley-input" 
            ref={this.ripleyInput} 
            onKeyUp={this.handleInputKeyDown}
            onMouseDown={this.preventDefaultBehaviour}
            autoComplete="off"
            autoFocus></input>
          <span className="cursor"></span>
        </div>
      )     
    } else {
      activeLine = (
        <div className="active-line">
          <span>{mothersText}</span>
          <span className="cursor"></span>
        </div>
      )
    }

    return (
    <div className="Mother-interface" onClick={this.focusOnInput}>
      <header className="Mother-header">
        <h1>MU/TH/UR</h1>
        <h2>6000</h2>
        <img src={logo} className="Mother-logo" alt=""/>
      </header>
      <main className="Mother-main">
        <div className="chat-container">
          <div>
            {previousLines}
          </div>
          {activeLine}
        </div>
      </main>
    </div>
    )};
}

export default MotherInterface;
