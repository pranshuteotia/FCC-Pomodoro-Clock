const play= "fa fa-play";
const pause = "fa fa-pause";

class TimerButtons extends React.Component {
    render() {
        return(
            <div className="item-container">
                <button id={this.props.id1} value={this.props.updateText} onClick={this.props.updatePos} className="btn item-btn"><i className="fa fa-arrow-down"></i></button>
                <span id={this.props.id3} className="item-txt">{this.props.lenTxt}</span>
                <button id={this.props.id2} value={this.props.updateText} onClick={this.props.updateNeg} className="btn item-btn"><i className="fa fa-arrow-up"></i></button>
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
            breakTimer: 300,
            cls: play,
            currentCycle: 'Session'
        };

        this.incrementTime = this.incrementTime.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
        this.reset = this.reset.bind(this);
        this.playPause = this.playPause.bind(this);
        this.clockify = this.clockify.bind(this);
    }

    incrementTime(e) {
        if(e.currentTarget.value == "break") {
            if(this.state.breakLength == 1 || this.state.timerRunning)
                return;

            this.setState({
                breakLength: this.state.breakLength-1
            });
        }

        else {
            if(this.state.currentSession == 1 || this.state.timerRunning)
                return;

            this.setState({
                currentSession: this.state.currentSession-1,
                timer: this.state.timer-60
            });
        }
    }

    decrementTime(e) {
        if(e.currentTarget.value === 'break') {
            if(this.state.breakLength == 60 || this.state.timerRunning)
                return;

            this.setState({
                breakLength: this.state.breakLength+1
            });
        }

        else {
            if(this.state.currentSession == 60 || this.state.timerRunning)
                return;

            this.setState({
                currentSession: this.state.currentSession+1,
                timer: this.state.timer+60
            });
        }
    }

    reset() {
        this.setState({
            currentSession: 25,
            breakLength: 5,
            timerRunning: false,
            timer: 1500,
            breakTimer: 300,
            cls: play,
            currentCycle: 'Session'
        });
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
        clearInterval(this.interval);
    }

    playPause() {
        if(this.state.timerRunning) {
            this.setState({
               timerRunning: false,
               cls: play
            });
            clearInterval(this.interval);
        }

        else {
            this.setState({
                timerRunning: true,
                cls: pause,
            });
            this.interval = setInterval(() => {
                if(this.state.currentCycle === 'Session') {
                    if (this.state.timer === 0) {
                        this.audioBeep.play();
                        this.setState({
                            currentCycle: 'Break',
                            timer: this.state.currentSession*60
                        });
                    }
                    else
                        this.setState({timer: this.state.timer - 1});
                }

                else {
                    if(this.state.breakTimer === 0) {
                        this.audioBeep.play();
                        this.setState({
                            currentCycle: 'Session',
                            breakTimer: this.state.breakLength*60
                        });
                    }
                    else
                        this.setState({breakTimer: this.state.breakTimer-1});
                }
            },1000);
        }
    }

    clockify() {
        if(this.state.currentCycle === 'Session') {
            let minutes = Math.floor(this.state.timer / 60);
            let seconds = this.state.timer - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return minutes + ':' + seconds;
        }

        else {
            let minutes = Math.floor(this.state.breakTimer / 60);
            let seconds = this.state.breakTimer - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return minutes + ':' + seconds;
        }
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
                            id1="break-decrement"
                            id2="break-increment"
                            id3="break-length"
                        />
                    </div>

                    <div className="item">
                        <div id="session-label">Session Length</div>
                        <TimerButtons
                            lenTxt={this.state.currentSession}
                            updatePos={this.incrementTime}
                            updateNeg={this.decrementTime}
                            updateText="session"
                            id1="session-decrement"
                            id2="session-increment"
                            id3="session-length"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="timer-container">
                        <div id="timer-label">{this.state.currentCycle}</div>
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
                <audio id="beep" preload="auto"
                       src="https://goo.gl/65cBl1"
                       ref={(audio) => { this.audioBeep = audio; }} />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));