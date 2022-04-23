var clickArr = []   // 可否点击队列
    , timer = []    // 计时器队列
    , g = document.querySelector('.gameObject')
    , scoreBody = document.querySelector('.scoreShow')
    , sBtn = document.querySelector('.startBtn')
    , pBtn = document.querySelector('.pauseBtn')
    , mode = document.querySelector('#mode')
    , score = 0
    , isStarted = false
    , isPause = false
    ;
//方法定义
function getScore() {
    // 阻止事件向上冒泡
    window.event.stopPropagation()
    // 变换表情
    g.innerHTML = ":-O"
    // 加分
    if (isStarted && !isPause) {
        score++
        showScore()
    }

    if (timer[0]) clearTimeout(timer[0])
    else
        timer[0] = null

    backFace()
}
; function backFace() {
    timer[0] = setTimeout(() => {
        g.innerHTML = ":-)"
    }, 180)
}
; function showScore() {
    scoreBody.innerHTML = `${score} 分`
}
; function changeMode() {
    console.log(mode.value == 1 ? '走马' : '地鼠')
}
; function pause() {
    if (isStarted && !isPause) {
        isPause = true
        sBtn.disabled = false

        sBtn.innerHTML = "结束游戏"
        pBtn.innerHTML = "继续"
        scoreBody.innerHTML = `游戏暂停, 得分 ${score}`
    } else if (isStarted && isPause) {
        isPause = false
        sBtn.disabled = true
        mode.disabled = true

        sBtn.innerHTML = "游戏进行中"
        pBtn.innerHTML = "暂停"
        showScore()
    }
}
; function GameMain() {
    if (!isStarted) {
        // 游戏开始
        isStarted = true
        sBtn.disabled = true
        pBtn.disabled = false
        mode.disabled = true
    } else
        if (isStarted && isPause) {
            // 回到游戏开始
            isStarted = false
            sBtn.disabled = false
            pBtn.disabled = true
            mode.disabled = false

            isPause = false
            pBtn.innerHTML = "暂停"
            sBtn.innerHTML = "开始游戏"
        }

    score = 0
    showScore()
}
; function GameOver() {
    if (isStarted && !isPause) {
        isStarted = !isStarted
        sBtn.disabled = false
        pBtn.disabled = true
        mode.disabled = false

        sBtn.innerHTML = "开始游戏"
        pBtn.innerHTML = "暂停"
        scoreBody.innerHTML = `游戏结束, 得分 ${score}`
    }
}

// init 初始化
(function () {
    showScore()
    changeMode()
})()