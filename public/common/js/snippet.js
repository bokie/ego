
/**
 * 搜索框组件
*/
(function (App) {
	function Search (container) {
		this.nForm = container;
		this.nKeyWord = this.nForm.getElementsByTagName('input')[0];
		this.init();
	}

	Search.prototype.init = function () {
		this.nForm.addEventListener('submit', this.search.bind(this));
	};
	Search.prototype.search = function (e) {
		// 验证表单输入是否为空，为空不提交

	};

	App.Search = Search;
})(window.App);


this.nLogin.addEventListener('click', function () {
	// 弹出登录弹窗
}.bind(this));
this.nRegister.addEventListener('click', function () {
	// 弹出注册弹窗
}.bind(this));


/**
 * 用户信息初始化展示
*/
initUserInfo: function (data) {
	let iconConfig = [
	    'u-icon-male',
	    'u-icon-female'
	];

	// 设置用户姓名和性别 Icon
	this.nName.innerText = data.nickname;
	_.addClassName(this.nSexIcon, iconConfig[data.sex]);

	// 隐藏登录和注册按钮， 显示用户信息
	_.addClassName(this.nGuest, 'f-dn')
	_.delClassName(this.nUser, 'f-dn')
}

/**
 * 退出登录
*/
this.nLogout.addEventListener('click', function () {
	_.ajax({
		url: '/api/logout',
		method: 'POST',
		data: {},
		success: function (data) {
			if (data.code === 200) {
				window.location.href = '/index';
			}
		},
		fail: function () {}
	});
});

/**
 * 获取当前用户登录状态
*/
initLoginStatus: function () {
	_.ajax({
		url: '/api/users?getloginuser',
		success: function (data) {
			if (data.code === 200) {
				this.initUserInfo(data.result)
				// todo
			}
		}.bind(this),
		fail: function (data) {}
	});
}

/**
 * 顶栏模块
*/
(function (App) {
	let nav = {
		init: function (options) {
			options = options || {};
			this.loginCallback = options.login;
			this.hdtab = new App.Tabs({
				container: _.$('hdtabs'),
				index: this.getTabIndex();
			});
			this.search = new App.Search(_.$('search'));
			// 绑定登录、注册、登出事件
			this.initLoginStatus()
		},
		getTabIndex: function () {},
		initLoginStatus: function () {},
		initUserInfo: function (data) {}
	};
	App.nav = nav;
})(window.App);


// 顶栏模块初始化
initNav: function () {
	App.nav.init({
		login: function (data) {
			// todo
		}.bind(this)
	});
}






// 明日之星
(function (App) {
	function StarList (container, data) {
		this.listInfo = data;
		this.container = container;
		this.followConfig = {};
		// 绑定事件
		this.container.addEventListener('click', this.followHandler.bind(this));
		this.render(data);
	}

	_.extend(StarList.prototype, App.emitter);

	// 渲染列表
	StarList.prototype.render = function (data) {
		var html = '';
		data.forEach(function (item) {
			html += this.renderItem(item);
		}).bind(this);
		this.container.innerHTML = html;
	};
	// 渲染列表单个项目
	// @param data {object}
	StarList.prototype.renderItem = function (data) {
		let config = followConfig[Number(!!data.isFollow)];
		let html = `
		    <li class="m-card">
				<img src="" alt="头像" class="card-avatar">
				<div class="card-info">
					<div>${data.nickname}</div>
					<div>
						<span>作品 ${data.workCount}</span><span>粉丝 ${data.followCount}</span>
					</div>
					<button class="u-btn u-btn-sm u-btn-primary z-follow" data-userid="10">
						<span class="u-icon"></span>${config.text}
					</button>
				</div>
			</li>
		`;
		return html;
	};
	// 点击关注
	StarList.prototype.followHandler = function (event) {
		let target = event.target;
		if (target.tagName === 'BUTTON') {
			let user = window.App.user;
			// 未登录情况
			if (user.username === undefined) {
				this.emit('login');
				return;
			}
			// 已登录状况
			let userId = target.dataset.userid;
			let data;  // 点击的用户信息

			if (_.hasClass(target, 'z-unfollow')) {
				this.follow(data, target.parentNode);
			} else {
				this.unfollow(data, target.parentNode);
			}
		}
	};
	StarList.prototype.follow = function (followInfo, replaceNode) {
		_.ajax({
			url: '/api/users?follow',
			method: 'POST',
			data: {
				id: followInfo.id,
			},
			success: function (data) {
				if (data.code == 200) {
					followInfo.isFollow = true;
					followInfo.followCount++;
					let newNode = _.html2Node(this.renderItem);
					replaceNode.parentNode.replaceChild(newNode, replaceNode);
				}
			}.bind(this),
			fail: function () {}
		});
	};
	StarList.prototype.unfollow = function (followInfo, replaceNode) {};
	
	App.StarList = StarList;

})(Window.App);


(function (App) {
	let validator = App.validator;
	let html = ``;

	function LoginModal () {
		this.node = _.html2Node(html);
		App.Modal.call(this, {}); // 实现继承
		// 缓存节点
		//...
		this.initLoginEvent()
	}

	LoginModal.prototype = Object.create(App.Modal.prototype); // 实现继承

	LoginModal.prototype.initLoginEvent = function () {
		// 绑定提交事件
		// 绑定跳转注册事件
	};
	/* 表单验证 */
	LoginModal.prototype.check = function () {
		let isValid = true;
		let flag;

		// 验证用户名
		flag = flag && !validator.isEmpty(this.nUsername.value);
		flag = flag && validator.isPhone(this.nUsername.value);
		!flag && this.showError(this.nUsername, true);
		isValid = isValid && flag;

		// 显示错误
		return isValid;
	};
	LoginModal.prototype.submit = function (e) {
		e.preventDefault();

		if (this.check()) {
			let data  = {
				username: this.nUsername.value.trim(),
				password: hex_md5(this.nPassword.value),
				remember: !!this.nRemember.checked,
			};
			_.ajax({
				url: '',
				method: 'POST',
				data: data,
				success: function (data) {
					if (data.code === 200) {
						this.hide();
						this.emit('ok', data.result);
					} else {
						// 根据错误码显示不同的错误提示
						switch (data.code) {
							case 400:
							    this.nError.innerText = '密码错误，请重新输入';
							    break;
							case 404:
							    this.nError.innerText = '用户不存在，请重新输入';
						}
						this.showError(this.nForm, true);
					}
				}.bind(this),
				fail: function () {},
			});
		}
	};

	App.LoginModal = LoginModal;

})(window.App);


_.$('goregister').addEventListener('click', function () {
	this.emit('register');
}).bind(this);

this.nLogin.addEventListener('click', function () {
	this.modal = new App.LoginModal();
	this.modal.on('ok', function (data) {
		this.initUserInfo(data);
		this.loginCallback && this.loginCallback(data);
	}).bind(this);
	this.modal.on('register', function () {
		this.modal.hide();
		this.nRegister.click();
	}).bind(this);
}).bind(this);


/** 注册 Modal */
(function (App) {
	let html = `<div>...</div>`;
	function RegisterModal () {
		this.node = _.html2Node(html);
		App.Modal.call(this, {});
		// 缓存节点
		// todo
		this.initSelect();
		this.initRegisterEvent();
	}

	RegisterModal.prototype = Object.create(App.Modal.prototype);
	RegisterModal.prototype.initRegisterEvent = function () {};
	RegisterModal.prototype.initSelect = function () {};
	RegisterModal.prototype.resetCaptcha = function () {
		this.captchaImg.src = '/captcha?t=' + +new Date();
	};
	RegisterModal.prototype.submit = function () {
		// ...
		if (this.check()) {
			let data = {
				username: this.phone.value.trim(),
				nickname: this.nick.value.trim(),
				password: hex_md5(this.pwd.value),
				sex: this.getRadioValue('registerform', 'sex'),
				captcha: this.captcha.value.trim()
			};

			this.birthday = this.birthdaySelect.getValue().join('-');
			this.location = this.locationSelect.getValue();
			data.province = this.location[0];
			data.city = this.location[1];
			data.district = this.location[2];
			data.birthday = this.birthday;

			_.ajax({
				url: '/api/register',
				method: 'POST',
				data: data,
				success: function (data) {
					if (data.code === 200) {
						this.hide();
						this.emit('ok');
					} else {
						this.nError.innerText = data.msg;
						this.showError(this.nForm, true);
					}
				}.bind(this),
				fail: function () {},
			});

		}
	};
	// 表单验证
	RegisterModal.prototype.check = function () {
		let isValid = true;
		let errorMsg = '';
		let checkList = [
		    [this.phone, ['required', 'phone']],
		    [this.nick, ['required', 'nickname']],
		    [this.pwd, ['required', 'length']],
		    [this.confirmpwd, ['required', 'length']],
		    [this.captcha, ['required']],
		];

		isValid = this.checkRules(checkList);
		if (!isValid) {
			errorMsg = '输入有误'；
		}

		// 验证两次密码
		// 验证条款是否为空
		// 显示错误
		return isValid;
	};
	RegisterModal.prototype.checkRules = function (checkRules) {
		//...
		for (let i = 0; i < checkRules.length; i++) {
			let checkItem = checkRules[i][0];
			let rules = checkRules[i][1];
			let flag;
			for (let j = 0; j < rules.length; j++) {
				let key = rules[j];
				switch (key) {
					//...
					case 'nickname':
					    flag = validator.isNickName(checkItem.value);
					    break;
					case 'length':
					    flag = validator.isLength(checkItem.value, 6, 16);
					    break;
				}
				if (!flag) {
					break;
				}
			}
			// 显示错误
		}
	};


    /* 验证码 */
    this.nCaptchaImg.addEventListener('click', function () {
    	this.resetCaptcha();
    }.bind(this));



	App.RegisterModal = RegisterModal;

})(window.App);

/* Dropdowns */
(function (App) {
	let _ = App.util;
	let template = `<div class="m-select"></div>`

	function Select (options) {
		_.extend(this, options);
		this.body = _.html2Node(template);
		// 缓存节点
		// todo
		this.init();
	}

	_.extend(Select.prototype, App.emitter);

	Select.prototype.init = function () {};
	Select.prototype.initEvent = function () {
		this.body.addEventListener('click', this.clickHandler.bind(this));
		document.addEventListener('click', this.close().bind(this));
	};
	// 渲染下拉列表
	Select.prototype.render = function (data, defaultIndex) {
		let optionsHTML = '';

		for (let i = 0; i < data.length; i++) {
			// 格式化数据： {name: value}
			optionsHTML += `<li data-index="${i}">${data[i].name}</li>`;
		}

		this.nOption.innerHTML = optionsHTML;
		this.nOptions = this.nOption.children;
		this.options = data;
		this.selectedIndex = undefined;
		// 默认选中第一项
		this.setSelect(defaultIndex || 0);
	};
	Select.prototype.clickHandler = function () {
		// this.setSelect() || this.toggle()
	};
	// 打开 / 关闭 下拉菜单
	Select.prototype.open = function () {
		_.delClassName(this.nOption, 'f-dn');
	};
	Select.prototype.close = function () {
		_.delClassName(this.nOption, 'f-dn');
	};
	// 切换下拉菜单状态
	Select.prototype.toggle = function (e) {
		_.hasClassName(this.nOption, 'f-dn')
		    ?
		    this.open()
		    :
		    this.close()
		;
	};
	// 获取当前选中项的值
	Select.prototype.getValue = function () {
		return this.options[this.selectedIndex].value;
	};
	// 设置选中项的选中状态
	Select.prototype.setSelect = function (index) {
		// 取消上次选中效果
		if (this.selectedIndex !== undefined) {
			_.delClassName(this.nOptions[this.selectedIndex], 'z-select');
		}
		// 设置选中
		this.selectedIndex = index;
		this.nValue.innerText = this.options[this.selectedIndex].name;
		_.addClassName(this.nOptions[this.selectedIndex], 'z-select');

		this.emit('select', this.getValue());
	};

	App.Select = Select;

})(window.App);




/* 级联选择器*/
(function (App) {
	function CascadeSelect (options) {
		_.extend(this, options);
		this.selectList = [];
		this.init();
	}
	CascadeSelect.prototype.init = function () {
		for (let i = 0; i < 3; i++) {
			let select = new App.Select({
				container: this.container
			});
			select.on('select', this.onChange.bind(this, i));
			this.selectList[i] = select;
		}
		this.selectList[0].render(this.data);
	};
	CascadeSelect.prototype.getValue = function () {};
	// 响应 select 事件， 渲染下一个 Select 数据
	CascadeSelect.prototype.onChange = function (index) {
		let next = index + 1;
		if (next === this.selectList.length) return;
		this.selectList[next].render(this.getList(next));
	};
	// 获取第N个Select的数据
	CascadeSelect.prototype.getList = function (index) {

	};

	App.CascadeSelect = CascadeSelect;
})(window.App);





(function (App) {})(window.App);
(function (App) {})(window.App);