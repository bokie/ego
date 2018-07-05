/**
 * Validator 表单验证
*/
(function (App) {
	let Validator = {
		isEmpty: function (x) {
			return (x == false);
		},
		isPhone: function (x) {
			let pattern = /185|188|186|137|136\d{8}/;
			return pattern.test(x);
		},
	};

	App.Validator = Validator;
})(window.App);