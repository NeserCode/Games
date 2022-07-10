const root = ReactDOM.createRoot(document.getElementById('mainContainer'));

class GameBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGameStarted: false,
            isGameOver: false,
        }
    }
    render() {
        return (<div className="gameBox">
            <GameBody />
        </div>)
    }
}

class GameBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameStatus: true,
            isActiveScore: false,
            timer: {
                emoji: null,
                bodyRuntime: null
            }
        }

        this.handleClickBlack = this.handleClickBlack.bind(this)
    }

    getComputedEmoji() {
        return this.state.gameStatus ? this.state.isActiveScore ? ': o' : ': )' : ': ('
    }

    handleClickBlack() {
        if (this.state.gameStatus)
            this.setState((prev) => ({
                isActiveScore: !prev.isActiveScore
                , timer: {
                    emoji: setTimeout(() => {
                        if (this.state.isActiveScore)
                            this.setState({ isActiveScore: prev.isActiveScore })
                    }, 100),
                    ...prev.timer,
                }
            }))
    }

    render() {
        return (<div className="gameBody" onClick={this.handleClickBlack}>
            {this.getComputedEmoji()}
        </div>)
    }
}

root.render(<GameBox />);