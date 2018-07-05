let App = {};
window.App = App;


// (function (App) {
// 	var page = {
// 		init: function () {
// 			this.initNav();
// 			this.initStarList();
// 			this.slider = new App.Slider({
// 				container: _.$('banner'),
// 				imgList: [],
// 			});
// 			this.sideTab = new App.Tabs({
// 				container: _.$('sidetabs')
// 			});
// 		},
// 		initNav: function (params) {
// 			App.nav.init({
// 				login: function (data) {
// 					if (!window.App.user.username) {
// 						window.App.user = data;
// 						this.initStarList();
// 					}
// 				}.bind(this),
// 			});
// 		},
// 		initStarList: function (params) {
// 			_.ajax({
// 				url: '/api/users?getstarlist',
// 				success: function (data) {
// 					if (data.code === 200) {
// 						if (!this.starList) {
// 							this.starList = new App.StarList(_.$('starlist'), data.result);
// 							this.starList.on('login', function () {
// 								this.nav.showLogin();
// 							}.bind(this))
// 						} else {
// 							this.starList.render(data.result);
// 						}
// 					}
// 				}.bind(this),
// 				fail: function () {}
// 			});
// 		}
// 	};

// 	//页面初始化
// 	document.addEventListener('DOMContentLoded', function (e) {
// 		page.init();
// 	});
// })(window.App);