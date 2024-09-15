function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const { Component } = React;

class App extends Component {
  constructor() {
    super();_defineProperty(this, "stopTimer",

    timer => {
      clearInterval(timer);
      timer = null;
    });_defineProperty(this, "handleStart",

    () => {
      if (!this.pomodoroStarted) {
        this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 });
        }, 1000);
        this.isStarted = !this.isStarted
        this.pomodoroStarted = !this.pomodoroStarted;
      }

      if (!this.time) {
        this.time = this.state.time;
        this.breakTime = this.state.breakTime;
      }
    });_defineProperty(this, "handlePause",

    () => {
      if (this.pomodoroStarted) {
        this.isPaused = true;
        this.setState(this.state);
        if (!this.breakStarted) {
          this.stopTimer(this.timer);
        }

        if (this.breakStarted) {
          this.stopTimer(this.breakTimer);
        }
      }
    });_defineProperty(this, "handleResume",

    () => {
      if (this.pomodoroStarted) {
        this.setState(this.state);
        this.isPaused = false;

        if (!this.breakStarted) {
          this.timer = setInterval(() => {
            this.setState({ time: this.state.time - 1 });
          }, 1000);
        }

        if (this.breakStarted) {
          this.breakTimer = setInterval(() => {
            this.setState({ breakTime: this.state.breakTime - 1 });
          }, 1000);
        }
      }
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        time: 1800,
        breakTime: 300 });

      this.stopTimer(this.timer);
      this.pomodoroStarted = false;
      this.stopTimer(this.breakTimer);
      this.breakStarted = false;
      this.isPaused = false;
      this.isStarted = false;
    });
    
    _defineProperty(this, "handleSet1hr",
    () => {
      this.setState({
        time: 3600,
        breakTime: 300 });

      this.stopTimer(this.timer);
      this.pomodoroStarted = false;
      this.stopTimer(this.breakTimer);
      this.breakStarted = false;
      this.isPaused = false;
      this.isStarted = false;
    });
    
    _defineProperty(this, "handleSet10min",
    () => {
      this.setState({
        time: 600,
        breakTime: 300 });

      this.stopTimer(this.timer);
      this.pomodoroStarted = false;
      this.stopTimer(this.breakTimer);
      this.breakStarted = false;
      this.isPaused = false;
      this.isStarted = false;
    });
    
    _defineProperty(this, "calculateTime",
    time => {
      return `${Math.floor(time / 60)}:${time % 60 > 9 ? "" + time % 60 : "0" + time % 60}`;
    });
    
    _defineProperty(this, "increaseTime",
    () => {
      if (!this.pomodoroStarted) {
        this.setState({ time: this.state.time + 60 });
      }
    });
    
    _defineProperty(this, "decreaseTime",
    () => {
      if (this.state.time > 60 && !this.pomodoroStarted) {
        this.setState({ time: this.state.time - 60 });
      }
    });this.state = { time: 1800, // Initial length of time
      breakTime: 300 // Initial time of break
    };this.breakTime = 300;this.pomodoroStarted = false;this.breakStarted = false;this.isPaused = false;this.isStarted=false;this.div = false;this.audio = new Audio('https://cdn.uppbeat.io/audio-files/d968f17d868777bda14c22e02398cd3d/170748f04afdded00b91d2c57ad9a0aa/cf1d5176932f5bed9ba2e6027205e8d4/STREAMING-digital-alarm-beeping-slava-pogorelsky-1-00-06.mp3');}componentDidUpdate() {
    if (this.state.time < 1) {
      this.audio.play();
      this.stopTimer(this.timer);
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "pomodoro" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { onClick: this.increaseTime }, "+")), /*#__PURE__*/

      React.createElement("div", { className: "timer" },
      this.breakStarted ?
      this.calculateTime(this.state.breakTime) :
      this.calculateTime(this.state.time)), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { onClick: this.decreaseTime }, "-"))), /*#__PURE__*/

      React.createElement("div", null,
      React.createElement("div", { className: "contain-it" }, /*#__PURE__*/
      React.createElement("div", { className: "reset" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.handleReset }, "Reset")), /*#__PURE__*/

      React.createElement("button", { onClick: this.isStarted ? (this.isPaused ? this.handleResume : this.handlePause) : this.handleStart, className: "start-pause"}, 
       this.isStarted ? (this.isPaused ? "Resume" : "Pause") : "Start"),
                          
      React.createElement("div", { className: "break-length" }, /*#__PURE__*/
      React.createElement("div", { className: "break-time" }, /*#__PURE__*/
 
      React.createElement("button", { onClick: this.handleSet10min }, "10m"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleSet1hr }, "1hr"))))), /*#__PURE__*/

      React.createElement("div", null,
      this.dev ? /*#__PURE__*/
      React.createElement("table", null, /*#__PURE__*/
      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("th", null, "State"), /*#__PURE__*/
      React.createElement("th", null, "Value")), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "this.state.time:"), /*#__PURE__*/
      React.createElement("td", null, this.state.time)), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "this.state.breakTime:"), /*#__PURE__*/
      React.createElement("td", null, this.state.breakTime)), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "This.time:"), /*#__PURE__*/
      React.createElement("td", null, this.time)), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "This.breakTime:"), /*#__PURE__*/
      React.createElement("td", null, this.breakTime)), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "This.pomodoroStarted:"), /*#__PURE__*/
      React.createElement("td", null, this.pomodoroStarted.toString())), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "breakStarted:"), /*#__PURE__*/
      React.createElement("td", null, this.breakStarted.toString())), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "isPaused:"), /*#__PURE__*/
      React.createElement("td", null, this.isPaused.toString())), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "This.timer:"), /*#__PURE__*/
      React.createElement("td", null, this.timer)), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", null, "This.breakTimer:"), /*#__PURE__*/
      React.createElement("td", null, this.breakTimer))) :
      "")));
  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
