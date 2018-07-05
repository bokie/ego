/**
 * @name Modal 模态框(弹窗)组件
 * @version 0.0.1
 * @author bokie
*/
(function (App) {

	

	function Modal (opts) {
		let  defaults = {
			title: '',
		};

		this.options = Object.assign({}, defaults, opts)
		
	    this.wrapper = document.createElement('div');
	    this.wrapper.className = 'modal-wrapper';
	    
	    // 定义模板
	    let tpl = `
	        <div class="m-modal">
	            <div class="modal-header">
		            <span class="title">${this.options.title}</span>
		            <span class="close j_close"><a href="javascript:;"><i class="u-icon icon-delete"></i></a></span>
	            </div>
	            <div class="modal-body">
		            <div class="content"></div>
	            </div>
            </div>
	    `;

	    // 缓存节点
	    this.container = _.html2Node(tpl);
	    this.content = this.container.querySelector('.content');
	    this.body = this.container.querySelector('.modal-body');

	    this._initEvent();

	}

	let fn = {
		show: function () {
			if (this.options.mask) {
				this.setMask();
			}
			if (this.options.footer) {
				this.setFooter();
			}
			if (this.options.content) {
				this.setContent(this.options.content);
			}
			this.wrapper.appendChild(this.container);
			document.body.appendChild(this.wrapper);
		},
		hide: function () {
			document.body.removeChild(this.wrapper);
			document.body.style.overflow = '';
		},
		setMask: function () {
			let mask = document.createElement('div');
			mask.className = 'm-mask';
			this.wrapper.appendChild(mask);
			document.body.style.overflow = 'hidden';
		},
		setFooter: function () {
			let tpl = `
			    <div class="modal-footer">
			        <button class="u-btn u-btn-primary j_ok">确定</button>
			        <button class="u-btn j_cancel">取消</button>
		        </div>
			`;
			this.container.appendChild(_.html2Node(tpl));

			// 初始化事件
			this.container.querySelector('.j_ok').addEventListener(
				'click', this._onConfirm.bind(this)
				);
			this.container.querySelector('.j_cancel').addEventListener(
				'click', this._onCancel.bind(this)
				);

		},
		setContent: function (content) {
			if(!content) return;

			if(content.nodeType === 1){ 
				this.content.innerHTML = '';
				this.content.appendChild(content);
			}else{
				this.content.innerHTML = content;
			}
		},
		
		// 初始化事件
		_initEvent: function(){

			this.container.querySelector('.j_close').addEventListener(
					'click', this._onCancel.bind(this)
			);

			
		},
		_onConfirm: function(){
			// this.emit('confirm')
			this.hide();
		},
		_onCancel: function(){
			// this.emit('cancel')
			this.hide();
		}
	};

	Object.assign(Modal.prototype, fn);

	App.Modal = Modal;

})(window.App);

