import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };
    this.memoizedFormatTime = this.memoize(this.formatTime);
    this.startTimer = this.startTimer.bind(this); // Bind the method to the component instance
    this.stopTimer = this.stopTimer.bind(this); // Bind the stopTimer method
  }

  memoize(fn) {
    const cache = {};
    return function (seconds) {
      if (cache[seconds]) {
        return cache[seconds];
      }
      const result = fn.call(this, seconds);
      cache[seconds] = result;
      return result;
    };
  }  

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  startTimer() {
    if (this.state.status === 'off') {
      this.setState({
        time: 1200,
        status: 'work',
        timer: setInterval(() => {
          this.setState((prevState) => ({
            time: prevState.time - 1,
          }), () => {
            if (this.state.time === 0) {
              this.setState((prevState) => ({ status: prevState.status === 'work' ? 'rest' : 'work', time: 5 }));
            }
          });
        }, 1000),
      });
    } else if (this.state.status === 'work' && this.state.time === 0) {
      this.setState({
        time: 20,
        status: 'rest',
        timer: setInterval(() => {
          this.setState((prevState) => ({
            time: prevState.time - 1,
          }), () => {
            if (this.state.time === 0) {
              this.setState({ status: 'work', time: 5 });
            }
          });
        }, 1000),
      });
    }
  }

  stopTimer() {
    clearInterval(this.state.timer); // Stop the interval timer
    this.setState({
      time: 0,
      status: 'off',
      timer: null,
    });
  }

  closeApp() {
    window.close();
  }

  render() {

    const { status, time, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        { status === 'off' && (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        { status === 'work' && (<img src="./images/Work.png" />)}
        { status === 'rest' && (<img src="./images/Rest.png" />)}
        { status !== 'off' && (
          <div className="timer">{this.memoizedFormatTime(time)}</div>
        )}
        { status === 'off' && (
          <button className="btn" onClick={this.startTimer}>
            Start
          </button>
        )}
        { status !== 'off' && (
          <button className="btn" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className="btn btn-close" onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
};

render(<App />, document.querySelector('#app'));
