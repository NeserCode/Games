new Vue({
	el: '#app',
	data: {
		player: "",
		model: "开始游戏",
		modelCode: -1,
		pause: "暂停",
		modelSetInterval: [],
		score: 0,
		widthORT: 1,
		heightORT: 1,
		isShow: true,
		isDeath: false,
		clickable: false,
		isPause: true,
	},
	methods: {
		modelStart: function() {
			clearInterval(this.modelSetInterval[1]);

			if (this.modelCode == 1 || this.modelCode == -1) {
				this.modelSetInterval[0] = setInterval(() => {
					var status = Math.random(0, 1);

					if (status <= .35) {
						this.isShow = false;
					} else {
						this.isShow = true;
					}

					if (this.widthORT == 1 && this.heightORT <= 5 && this.heightORT >= 2) {
						document.querySelector('#blackBlock').style.display = `block`;
						document.querySelector('#blackBlock').style.top = `calc(9rem + ` + ((this.heightORT - 2) * 6) + `rem )`;
						this.heightORT--;
						this.widthORT = 1;
					} else if (this.widthORT == 5 && this.heightORT < 5) {
						document.querySelector('#blackBlock').style.display = `block`;
						document.querySelector('#blackBlock').style.top = `calc(9rem + ` + (this.heightORT * 6) + `rem )`;
						this.heightORT++;
						this.widthORT = 5;
					} else if (this.heightORT == 5 && this.widthORT <= 5 && this.widthORT >= 2) {
						document.querySelector('#blackBlock').style.display = `block`;
						document.querySelector('#blackBlock').style.left = `calc(50% - 15rem + ` + ((this.widthORT - 2) * 6) +
							`rem )`;
						this.widthORT--;
						this.heightORT = 5;
					} else if (this.widthORT < 5) {
						document.querySelector('#blackBlock').style.display = `block`;
						document.querySelector('#blackBlock').style.left = `calc(50% - 15rem + ` + (this.widthORT * 6) + `rem )`;
						this.widthORT++;
						this.heightORT = 1;
					}

					this.clickable = true;
					
				}, 500)

				this.model = "走马灯模式";
				this.modelCode = 2;

			} else if (this.modelCode == 2) {
				clearInterval(this.modelSetInterval[0]);

				this.modelSetInterval[1] = setInterval(() => {
					var widthR = Math.random();
					var heightR = Math.random();

					document.querySelector('#blackBlock').style.display = `block`;
					document.querySelector('#blackBlock').style.left = `calc(50% - 15rem + ` + (widthR * 24) + `rem )`;
					document.querySelector('#blackBlock').style.top = `calc(9rem + ` + (heightR * 24) + `rem )`;

					this.clickable = true;
					
				}, 800)

				this.model = "打地鼠模式";
				this.modelCode = 1;

			} else if (this.modelCode == -2) {
				window.location = "index.html";
			}
		},
		clearFunc: function() {
			if (this.modelCode == -2) {
				alert("游戏已经结束了哦，再来一局！");
			} else if (!this.isPause && this.modelCode != -1) {
				this.modelCode--;
				this.modelStart();
				this.pause = "暂停";
			} else if (this.modelCode == -1) {
				alert("您好像还没有开始游戏哦！");
			} else if (this.isPause && this.modelCode != -1) {
				clearInterval(this.modelSetInterval[0]);
				clearInterval(this.modelSetInterval[1]);
				this.pause = "继续";
				this.clickable = false;
			}

			this.isPause = !this.isPause;
		},
		addScore: function() {
			if (this.clickable) {
				this.score++;
			}

			if (!this.isDeath) {
				document.querySelector('#blackBlock').innerHTML = `<b>:&nbsp;o</b>`;
				setTimeout(() => {
					document.querySelector('#blackBlock').innerHTML = `<b>:&nbsp;)</b>`;
				}, 150)
			}

			this.clickable = false;
		},
		deathFunc: function() {

			if (this.modelCode != -1 && this.clickable) {
				for (var i = 0; i < this.modelSetInterval.length; i++) {
					clearInterval(this.modelSetInterval[i]);
				}

				document.querySelector('#blackBlock').style.display = `block`;
				document.querySelector('#blackBlock').innerHTML = `<b>:&nbsp;(</b>`;
				document.querySelector('#score').innerHTML = `游戏结束，你的得分：` + this.score;

				this.modelCode = -2;
				this.model = "重新载入";
				this.isDeath = true;
			}
		}
	}
})