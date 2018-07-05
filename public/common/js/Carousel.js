/**
 * @name Carousel 轮播图组件
 * @version v0.0.1
 * @author bokie
*/

(function (App) {
	let template = '<div class="m-carousel"></div>';

	/**
	 * @param options {object} - 参数
	 * options: {
	 *     - container:
	 *     - images:
	 *     - interval:
	 * }
	*/
	function Carousel (options) {
		_.extend(this, options);
		this.imgLength = this.images.length;
		this.interval = this.interval || 3000;

		// 组件节点
		this.carousel = _.html2Node(template);
		this.carousels = this.buildCarousel();
		this.cursors = this.buildCursor();
		// 初始化事件
		this.carousel.addEventListener('mouseover', this.stop.bind(this));
		this.carousel.addEventListener('mouseleave', this.autoplay.bind(this));
		// 初始化动作
		this.container.appendChild(this.carousel);
		this.nav(this.initIndex || 0);
		this.autoplay();
	}

	// 下一页
	Carousel.prototype.next = function () {
		let nextIndex = (this.index + 1) % this.imgLength;
		this.nav(nextIndex);
	};
	// 跳到指定页
	Carousel.prototype.nav = function (index) {
		if (this.index === index) return;
		this.last = this.index;
		this.index = index;

		this.fade();
		this.setCurrent();

	};
	// 设置当前选中状态
	Carousel.prototype.setCurrent = function () {
		// 去除之前选中节点的选中状态
		if (this.last !== undefined) {
			_.removeClass(this.cursors[this.last], 'z-active');
		}
		// 添加当前选中节点的选中状态
		_.addClass(this.cursors[this.index], 'z-active');
	};
	// 自动播放
	Carousel.prototype.autoplay = function () {
		this.timer = setInterval(function () {
			this.next()
		}.bind(this), this.interval);
	};
	// 停止自动播放
	Carousel.prototype.stop = function () {
		clearInterval(this.timer);
	};
	// 切换效果
	Carousel.prototype.fade = function () {
		if (this.last !== undefined) {
			this.carousels[this.last].style.opacity = 0;
		}
		this.carousels[this.index].style.opacity = 1;
	};

	Carousel.prototype.buildCarousel = function() {

		let carouselList = document.createElement('ul');
		let html = '';

		for (let i = 0; i < this.imgLength; i++) {
			html += `
			    <li class="carousel-img">
			        <img src="${this.images[i]}" alt="">
			        </li>
			`;
		}
		carouselList.innerHTML = html;
		this.carousel.appendChild(carouselList);
		return carouselList.children;
	};

	// 构造指示器节点
	Carousel.prototype.buildCursor = function () {
		let wrapper = document.createElement('div');
		wrapper.className = 'm-cursor';
		let cursor = document.createElement('ul');
		let html = '';

		cursor.className = 'cursors f-cb';
		for (let i = 0; i < this.imgLength; i++) {
			html += `<li data-index=${i}></li>`;
		}
		cursor.innerHTML = html;

		wrapper.appendChild(cursor)

		this.carousel.appendChild(wrapper);
		// 处理点击事件
		cursor.addEventListener('mouseover', function (e) {
			// index - 点击节点的下标
			if (!(e.target.tagName.toLowerCase() === 'li')) return false;
			let index = e.target.dataset.index;
			// _.log(index);
			this.nav(index);
		}.bind(this));
		return cursor.children;
	};

	App.Carousel = Carousel;

})(window.App);