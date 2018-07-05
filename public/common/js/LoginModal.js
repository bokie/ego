/**
 * @name LoginModal 登录模态框(弹窗)

*/
(function (App) {
	let validator = App.validator;
	let html = `
	    <div class="m-login">
			<div class="login-header f-cb">
				<span class="title">欢迎回来</span>
				<div class="register">还没有账号？ <a href="" class="go-register">立即注册</a></div>
			</div>
			<div class="login-form">
				<form action="" id="j_login">
					<div class="account">
						<label>手机号</label>
						<input type="text" name="username" />
					</div>
					<div class="password">
						<label>密码</label>
						<input type="password" name="password" />
					</div>
					<div class="options f-cb">
						<div class="remember">
							<input type="checkbox" id="rememberme" />
							<label for="rememberme">保持登录</label>
						</div>
						<div class="forgot-pass">
							<a href="">忘记密码？</a>
						</div>
					</div>
					<div class="error-info">
						<i class="u-icon"></i><span>错误信息</span>
					</div>
					<button type="submit" class="btn-submit u-btn u-btn-primary">登录</button>
				</form>
			</div>
		</div>
	`;

	function LoginModal (opts) {
		this.node = _.html2Node(html);
		opts.content = this.node;

		App.Modal.call(this, opts); // 实现继承
		// 缓存节点
		//...
		this.initLoginEvent()
	}

	LoginModal.prototype = Object.create(App.Modal.prototype); // 实现继承

	LoginModal.prototype.initLoginEvent = function () {
		// 绑定提交事件

		let formEl = this.node.querySelector('#j_login');
		formEl.addEventListener('submit', this.submit.bind(this));

		// 绑定跳转注册事件
	};
	/* 表单验证 */
	LoginModal.prototype.check = function (data) {
		let isValid = true;
		let flag;

		// 验证用户名
		flag = flag && !validator.isEmpty(data.username);
		flag = flag && validator.isPhone(data.username);
		// !flag && this.showError(this.nUsername, true);
		isValid = isValid && flag;

		// 显示错误
		return isValid;
	};
	LoginModal.prototype.submit = function (e) {
		e.preventDefault();
		_.log(e.target.elements);
		let data = {};
		Array.from(e.target.elements).forEach(function (item) {
			_.log(item);
			if (item.name) {
				data[item.name] = item.value;
			}
			if (item.type === 'checkbox') {
				data.remember = !!item.checked;
			}
		});

		this.check(data);
		_.log(data);

		return;

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