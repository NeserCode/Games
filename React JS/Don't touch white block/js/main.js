const root = ReactDOM.createRoot(document.getElementById('mainContainer'));

class GameBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGameStarted: false,
            isGamePaused: false,
            isGameOver: false,
        }

        this.handleClickWhite = this.handleClickWhite.bind(this)
        this.handleGameStart = this.handleGameStart.bind(this)
        this.handleGameEnd = this.handleGameEnd.bind(this)
    }

    handleClickWhite() {
        if (this.state.isGameStarted) {
            this.setState({
                isGameOver: true
            })
        }
        console.log(this.state);
    }

    handleGameStart(e) {
        e.stopPropagation()

        if (this.state.isGameStarted && !this.state.isGameOver)
            this.setState((prev) => ({
                isGamePaused: !prev.isGamePaused
            }))
        else if ((this.state.isGameOver || !this.state.isGameStarted) && !this.state.isGamePaused)
            this.setState({
                isGameStarted: true,
                isGamePaused: false,
                isGameOver: false,
            })
        console.log(this.state);
    }

    handleGameEnd(e) {
        e.stopPropagation()

        this.setState({
            isGameStarted: false,
            isGamePaused: false,
            isGameOver: false,
        })
    }

    render() {
        return (<div className="gameBox" onClick={this.handleClickWhite}>
            <GameBody
                isGameStarted={this.state.isGameStarted}
                isGamePaused={this.state.isGamePaused}
                isGameOver={this.state.isGameOver}
            />
            <GameBtns
                isGameStarted={this.state.isGameStarted}
                isGamePaused={this.state.isGamePaused}
                isGameOver={this.state.isGameOver}
                gameStartFn={this.handleGameStart}
                gameEndFn={this.handleGameEnd}
            />
        </div>)
    }
}

class GameBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isActiveScore: false,
            score: 0,
            timer: {
                emoji: null,
                bodyRuntime: null
            }
        }

        this.handleClickBlack = this.handleClickBlack.bind(this)
        this.Score = this.Score.bind(this)
    }

    getComputedEmoji() {
        return !this.props.isGameOver ? this.state.isActiveScore ? ': o' : ': )' : ': ('
    }

    handleClickBlack(e) {
        e.stopPropagation()

        if (!this.props.isGameOver)
            this.setState((prev) => ({
                isActiveScore: !prev.isActiveScore
                , score: this.props.isGameStarted ? prev.score + 1 : 0
                , timer: {
                    emoji: setTimeout(() => {
                        if (this.state.isActiveScore)
                            this.setState({ isActiveScore: prev.isActiveScore })
                    }, 100),
                    ...prev.timer,
                }
            }))
        console.log(this.props.isGameOver);
    }

    Score() {
        return (
            <span className="gameScore">{this.state.score}</span>
        )
    }

    render() {
        return (<div className="gameBody" onClick={this.handleClickBlack}>
            <span>{this.getComputedEmoji()}</span>
            <this.Score />
        </div>)
    }
}

class GameBtns extends React.Component {
    constructor(props) {
        super(props)
    }

    getComputedGameString() {
        return this.props.isGameStarted ? this.props.isGamePaused ? 'Return' : 'Pause' : 'Start'
    }

    render() {
        return (
            <div className="gameBtns">
                <button onClick={this.props.gameStartFn}>{this.getComputedGameString()}</button>
                {this.props.isGameStarted
                    ? <button onClick={this.props.gameEndFn}>End Game</button>
                    : null
                }
            </div>
        )
    }
}



root.render(<GameBox />);