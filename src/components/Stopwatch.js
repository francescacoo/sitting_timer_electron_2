import React, { Component } from "react";

import "../App.css";
window.onbeforeunload = () => {
  localStorage.removeItem('mydata0');
  localStorage.removeItem('mydata1');
  localStorage.removeItem('mydata2');
  localStorage.removeItem('mydata3');

}
class Stopwatch extends Component {
  newcounter=0;
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    counter:0,
    selectedOption:'kneeling chair 1'

  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  saveSittingSession=() => {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let newtime=hours+":"+minutes+":"+seconds+":"+centiseconds;
    var data= this.state.selectedOption+" time: "+newtime;
    var datavar="mydata"+this.state.counter;
    localStorage.setItem(datavar, data);
  }

  resetTimer = () => {
    var mycounter = this.state.counter +1;
    this.setState({
      timerStart: 0,
      timerTime: 0,
      counter:mycounter
    });
   
    this.saveSittingSession();


  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    var history1;
    var history2;

    const historysitting =[]
    for (var i=0;  i<=this.state.counter;i++){
      
      history1=localStorage.getItem('mydata'+i);

      historysitting.push(<li key={i}>{history1}</li>)
    }
    return (
      <div className="Stopwatch">        
        <div className="history">{historysitting}</div>

        <div className="Stopwatch-header">Stopwatch</div>
        <div className="Stopwatch-display">
          {hours} : {minutes} : {seconds} : {centiseconds}
        </div>
       
        <form>
         

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="variable balans"
                checked={this.state.selectedOption === "variable balans" || !this.state.selectedOption}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              Variable Balans
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="kneelingChair2"
                checked={this.state.selectedOption === "kneelingChair2"}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              Kneeling chair 2
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="standing"
                checked={this.state.selectedOption === "standing"}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              standing
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="moving"
                checked={this.state.selectedOption === "moving"}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              moving
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="chair"
                checked={this.state.selectedOption === "chair"}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              chair
            </label>
          </div>

        </form>

        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>

        {this.state.timerOn === false && this.state.timerTime > 0 && (

        <button onClick={this.startTimer}>Resume</button>
        )}

        {this.state.timerOn === false && this.state.timerTime > 0 && (

        <button onClick={this.resetTimer}>Reset</button>
        )}
      </div>
      
    );
  }
}

export default Stopwatch;