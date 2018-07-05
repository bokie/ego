/**
 * Tabs 组件
*/
(function (App) {
	function Tabs (options) {
		Object.assign(this, options); // _.extend(this, options);
		this.index = this.index || 0;
		// 缓存节点
		this.nTab = this.container.getElementsByTagName('ul')[0];
		this.nTabs = this.nTab.children;
		this.nThumb = this.container.getElementsByClassName('j_tabs_thumb')[0];
		// 动态构建滑动条
		// todo

		this.init();
	}
	Tabs.prototype.init = function () {
		// 绑定事件
		this.nTab.addEventListener('mouseover', function (e) {
			if (e.target.tagName.toLowerCase() !== 'li') return false;
			let index = e.target.dataset.index;
			this.highlight(index);
		}.bind(this));
		this.nTab.addEventListener('mouseleave', function (e) {
			this.highlight(0);
		}.bind(this));
	};

	/**
	 * 高亮当前 tab
	*/
	Tabs.prototype.highlight = function (index) {
		let tab = this.nTabs[index];
		this.setCurrent(index);
		this.nThumb.style.width = tab.offsetWidth + 'px';
		this.nThumb.style.left = tab.offsetLeft + 'px';
	};

	/**
	 * 设置当前选中 tab
	*/
	Tabs.prototype.setCurrent = function (index) {
		_.removeClass(this.nTabs[this.index], 'z-active');
		this.index = index;
		_.addClass(this.nTabs[index], 'z-active');
	};
	App.Tabs = Tabs;
})(window.App);