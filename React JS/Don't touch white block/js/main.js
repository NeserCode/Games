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
            position: {
                direction: 'left',
                step: 1
            },
            timer: {
                emoji: null,
                bodyRuntime: null
            }
        }

        this.handleClickBlack = this.handleClickBlack.bind(this)
        this.setScore = this.setScore.bind(this)
        this.Score = this.Score.bind(this)
        this.startRender = this.startRender.bind(this)
        this.pauseRander = this.pauseRander.bind(this)
        this.resumeRander = this.resumeRander.bind(this)
        this.mainBodyProcess = this.mainBodyProcess.bind(this)
    }

    componentDidMount() {
        this._body = document.querySelector('.gameBody')
    }

    startRender() {
        this.mainBodyProcess()
    }

    pauseRander() {
        clearInterval(this.state.timer.bodyRuntime)
    }

    resumeRander() { this.mainBodyProcess() }

    mainBodyProcess() {
        this.setState({
            timer: {
                bodyRuntime: setInterval(() => {
                    const { direction, step } = this.state.position
                    if (direction == 'left' && step <= 3) {
                        this.setState({
                            position: {
                                direction,
                                step: step + 1
                            }
                        })
                    } else if (direction == 'left' && step === 4) {
                        this.setState({
                            position: {
                                direction: 'top',
                                step: 1
                            }
                        })
                    } else if (direction == 'top' && step <= 3) {
                        this.setState({
                            position: {
                                direction,
                                step: step + 1
                            }
                        })
                    } else if (direction == 'top' && step === 4) {
                        this.setState({
                            position: {
                                direction: 'right',
                                step: 1
                            }
                        })
                    } else if (direction == 'right' && step <= 3) {
                        this.setState({
                            position: {
                                direction,
                                step: step + 1
                            }
                        })
                    } else if (direction == 'right' && step === 4) {
                        this.setState({
                            position: {
                                direction: 'bottom',
                                step: 1
                            }
                        })
                    } else if (direction == 'bottom' && step <= 3) {
                        this.setState({
                            position: {
                                direction,
                                step: step + 1
                            }
                        })
                    } else if (direction == 'bottom' && step === 4) {
                        this.setState({
                            position: {
                                direction: 'left',
                                step: 1
                            }
                        })
                    }
                    console.log(this.state.position);
                    this.mainBodyProcessRender(this.state.position.direction, this.state.position.step)
                }, 800)
            }
        })
    }

    mainBodyProcessRender(direction, step) {
        if (direction === 'left')
            this._body.style.transform = `translateX(${step * 100}%) translateY(0)`
        else if (direction === 'top')
            this._body.style.transform = `translateX(400%) translateY(${step * 100}%)`
        else if (direction === 'right')
            this._body.style.transform = `translateX(${(4 - step) * 100}%) translateY(400%)`
        else if (direction === 'bottom')
            this._body.style.transform = `translateX(0) translateY(${(4 - step) * 100}%)`
    }

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
                        ? <span> Game over </span>
                        : <button type="button" onClick={this.props.gameStartFn}>{this.getComputedGameString()}</button>
                }
                {
                    this.props.isGameStarted
                        ? this.props.isGameOver
                            ? <button type="button" onClick={this.handleGameEnd}> Replay </button>
                            : <button type="button" onClick={this.handleGameEnd}> End Game </button>
                        : null
                }
            </div>
        )
    }
}



root.render(<GameBox />);