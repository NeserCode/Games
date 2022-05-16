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
    , stepCounter = {
        on: 'left',
        step: 1
    }
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
        clearInterval(timer[1])

        sBtn.innerHTML = "结束游戏"
        pBtn.innerHTML = "继续"
        scoreBody.innerHTML = `游戏暂停, 得分 ${score}`
    } else if (isStarted && isPause) {
        isPause = false
        sBtn.disabled = true
        mode.disabled = true

        //恢复游戏模式运动轨迹
        timer[1] = setInterval(() => {
            Lantain()
        }, 1000)

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

        //初始化游戏模式运动轨迹
        initLantain()
        timer[1] = setInterval(() => {
            Lantain()
        }, 1000)
    }
    else
        if (isStarted && isPause) {
            // 回到游戏开始
            isStarted = false
            sBtn.disabled = false
            pBtn.disabled = true
            mode.disabled = false

            clearInterval(timer[1])

            isPause = false
            pBtn.innerHTML = "暂停"
            sBtn.innerHTML = "开始游戏"
        }

    //初始化分数
    score = 0
    showScore()
}
; function GameOver() {
    if (isStarted && !isPause) {
        isStarted = !isStarted
        sBtn.disabled = false
        pBtn.disabled = true
        mode.disabled = false
        clearInterval(timer[1])

        sBtn.innerHTML = "开始游戏"
        pBtn.innerHTML = "暂停"
        scoreBody.innerHTML = `游戏结束, 得分 ${score}`
    }
}
; function Lantain() {
    const { step, on } = stepCounter
    if (on == 'left' && step < 5) {
        console.log('left', step)
        g.style.transform = `translate(${step * 100}%,0)`
        stepCounter.step++
        //do something
        if (on == 'left' && step == 4) {
            console.log('down corner')
            stepCounter.on = 'down'
            stepCounter.step = 1
            //do something
        }
    }
    else if (on == 'down' && step < 5) {
        console.log('down', step)
        g.style.transform = `translate(400%, ${step * 100}%)`
        stepCounter.step++
        //do something
        if (on == 'down' && step == 4) {
            console.log('right corner')
            stepCounter.on = 'right'
            stepCounter.step = 1
            //do something
        }
    }
    else if (on == 'right' && step < 5) {
        console.log('right', step)
        g.style.transform = `translate(${(4 - step) * 100}%, 400%)`
        stepCounter.step++
        //do something
        if (on == 'right' && step == 4) {
            console.log('up corner')
            g.style.transform = `translate(0, 400%)`
            stepCounter.on = 'up'
            stepCounter.step = 1
            //do something
        }

    }
    else if (on == 'up' && step < 5) {
        console.log('up', step)
        g.style.transform = `translate(0, ${(4 - step) * 100}%)`
        stepCounter.step++
        //do something
        if (on == 'up' && step == 4) {
            console.log('left corner')
            stepCounter.on = 'left'
            stepCounter.step = 1
            //do something
        }

    }
}
; function initLantain() {
    stepCounter.on = "left"
    stepCounter.step = 1
}

// init 初始化
(function () {
    showScore()
    changeMode()
})()