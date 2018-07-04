const play= "fa fa-play";
const pause = "fa fa-pause";

class TimerButtons extends React.Component {
    render() {
        return(
            <div className="item-container">
                <button value={this.props.updateText} onClick={this.props.updatePos}><i className="fa fa-arrow-up"></i></button>
                <span>{this.props.lenTxt}</span>
                <button value={this.props.updateText} onClick={this.props.updateNeg}><i className="fa fa-arrow-down"></i></button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            currentSession: 25,
            breakLength: 5,
            timerRunning: false,
            timer: 1500,
            cls: play
        };

        this.incrementTime = this.incrementTime.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
        this.reset = this.reset.bind(this);
        this.playPause = this.playPause.bind(this);
        this.clockify = this.clockify.bind(this);
    }

    incrementTime(e) {
        if(e.currentTarget.value == "break") {
            if(this.state.breakLength == 30 || this.state.timerRunning)
                return;

            this.setState({
                breakLength: this.state.breakLength+1
            });
        }

        else {
            if(this.state.currentSession == 60 || this.state.timerRunning)
                return;

            this.setState({
                currentSession: this.state.currentSession+1
            });
        }
    }

    decrementTime(e) {
        if(e.currentTarget.value === 'break') {
            if(this.state.breakLength == 1 || this.state.timerRunning)
                return;

            this.setState({
                breakLength: this.state.breakLength-1
            });
        }

        else {
            if(this.state.currentSession == 15 || this.state.timerRunning)
                return;

            this.setState({
                currentSession: this.state.currentSession-1
            });
        }
    }

    reset() {
        this.setState({
            currentSession: 25,
            breakLength: 5,
            timerRunning: false,
            timer: 1500,
            cls: play
        });
    }

    playPause() {
        if(this.state.timerRunning) {
            this.setState({
               timerRunning: false,
               cls: play
            });
        }

        else {
            this.setState({
                timerRunning: true,
                cls: pause
            });
        }
    }

    clockify() {
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1>Pomodoro Clock</h1>
                </div>

                <div className="row">
                    <div className="item">
                        <div id="break-label">Break Length</div>
                        <TimerButtons
                            lenTxt={this.state.breakLength}
                            updatePos={this.incrementTime}
                            updateNeg={this.decrementTime}
                            updateText="break"
                        />
                    </div>

                    <div className="item">
                        <div id="session-label">Session Length</div>
                        <TimerButtons
                            lenTxt={this.state.currentSession}
                            updatePos={this.incrementTime}
                            updateNeg={this.decrementTime}
                            updateText="session"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="timer-container">
                        <div id="timer-label">Session</div>
                        <div id="time-left">{this.clockify()}</div>
                    </div>
                </div>

                <div className="row">
                    <button id="start_stop" onClick={this.playPause}><i className={this.state.cls} ></i></button>
                    <button id="reset" onClick={this.reset}><i className="fa fa-refresh"></i></button>
                </div>

                <div className="row">
                    <h3>Designed and Coded by Pranshu Teotia</h3>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));