const root = ReactDOM.createRoot(document.getElementById('mainContainer'));

class GameBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGameStarted: false,
            isGamePaused: false,
            isGameOver: false,
        }

        this.gameBody = React.createRef()

        this.handleClickWhite = this.handleClickWhite.bind(this)
        this.handleGameStart = this.handleGameStart.bind(this)
        this.handleGameEnd = this.handleGameEnd.bind(this)
        this.handleSetScore = this.handleSetScore.bind(this)
    }

    handleClickWhite() {
        if (this.state.isGameStarted && !this.state.isGamePaused) {
            this.setState({
                isGameOver: true
            })
        }
    }

    handleGameStart(e) {
        e.stopPropagation()

        if (this.state.isGameStarted && !this.state.isGameOver) {
            this.setState((prev) => ({
                isGamePaused: !prev.isGamePaused
            }))
            // 运转逻辑:暂停游戏->恢复游戏
            if (this.state.isGamePaused) this.gameBody.current.resumeRander()
            else this.gameBody.current.pauseRander()
        }
        else if ((this.state.isGameOver || !this.state.isGameStarted) && !this.state.isGamePaused) {
            this.setState({
                isGameStarted: true,
                isGamePaused: false,
                isGameOver: false,
            })

            // 运转逻辑:开始游戏
            this.gameBody.current.startRender()
        }
    }

    handleGameEnd(e) {
        e.stopPropagation()

        this.setState({
            isGameStarted: false,
            isGamePaused: false,
            isGameOver: false,
        })
    }

    handleSetScore() {
        if (!this.state.isGamePaused) {
            this.gameBody.current.setScore(0)
        }


    }

    render() {
        return (<div className="gameBox" onClick={this.handleClickWhite}>
            <GameBody
                isGameStarted={this.state.isGameStarted}
                isGamePaused={this.state.isGamePaused}
                isGameOver={this.state.isGameOver}
                ref={this.gameBody}
            />
            <GameBtns
                isGameStarted={this.state.isGameStarted}
                isGamePaused={this.state.isGamePaused}
                isGameOver={this.state.isGameOver}
                gameStartFn={this.handleGameStart}
                gameEndFn={this.handleGameEnd}
                setScoreFn={this.handleSetScore}
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
        this.setScore = this.setScore.bind(this)
        this.Score = this.Score.bind(this)
    }

    startRender() { console.log('start render'); }

    pauseRander() { console.log('pause render'); }

    resumeRander() { console.log('resume render'); }

    getComputedEmoji() {
        return !this.props.isGameOver ? this.state.isActiveScore ? ': o' : ': )' : ': ('
    }

    handleClickBlack(e) {
        e.stopPropagation()

        if (!this.props.isGameOver) {
            this.setState((prev) => ({
                isActiveScore: !prev.isActiveScore
                , score: (!this.props.isGamePaused && this.props.isGameStarted && !this.props.isGameOver)
                    ? prev.score + 1
                    : this.props.isGameOver
                        ? 0
                        : prev.score
                , timer: {
                    emoji: setTimeout(() => {
                        if (this.state.isActiveScore)
                            this.setState({ isActiveScore: prev.isActiveScore })
                    }, 100),
                    ...prev.timer,
                }
            }))
        }
    }

    setScore(newVal) {
        if (this.props.isGameStarted) {
            this.setState({
                score: newVal
            })
        }
    }

    Score() {
        return (
            <span className="gameScore"> {this.state.score} </span>
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

        this.handleGameEnd = this.handleGameEnd.bind(this)
    }

    getComputedGameString() {
        return this.props.isGameStarted ? this.props.isGamePaused ? 'Return' : 'Pause' : 'Start'
    }

    handleGameEnd(e) {
        this.props.setScoreFn(0)
        this.props.gameEndFn(e)
    }

    render() {
        return (
            <div className="gameBtns">
                {
                    this.props.isGameOver
                        ? <span>Game over</span>
                        : <button onClick={this.props.gameStartFn}>{this.getComputedGameString()}</button>
                }
                {
                    this.props.isGameStarted
                        ? this.props.isGameOver
                            ? <button onClick={this.handleGameEnd}> Replay </button>
                            : <button onClick={this.handleGameEnd}> End Game </button>
                        : null
                }
            </div>
        )
    }
}



root.render(<GameBox />);