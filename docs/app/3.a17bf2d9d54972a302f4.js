(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{261:function(t,e,n){},262:function(t,e,n){},842:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i=n(8),c=(n(261),n(262),n(1)),u=n.n(c);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=y(t);if(e){var r=y(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?d(t):e}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(a,t);var e,n,o,c=l(a);function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=c.call(this,t)).handleEditorChange=e.handleEditorChange.bind(d(e)),e.focus=e.focus.bind(d(e)),e.state={editorState:i.EditorState.createEmpty()},e}return e=a,o=[{key:"characteristics",get:function(){return{focusable:!0}}},{key:"propTypes",get:function(){return{view:u.a.object.isRequired,editorState:u.a.object.isRequired}}}],(n=[{key:"componentDidMount",value:function(){this.props.view.focus&&this.focus()}},{key:"focus",value:function(){this.editor.focus()}},{key:"handleEditorChange",value:function(t){this.setState({editorState:t}),this.props.updateEditorState(t)}},{key:"render",value:function(){var t=this,e=i.EditorState.acceptSelection(this.props.editorState,this.state.editorState.getSelection());return r.a.createElement("div",{className:"default-editor editor",onClick:this.focus},r.a.createElement(i.Editor,{ref:function(e){t.editor=e},editorState:e,onChange:this.handleEditorChange,placeholder:"write something..."}))}}])&&f(e.prototype,n),o&&f(e,o),a}(o.Component);e.default=h}}]);
//# sourceMappingURL=3.a17bf2d9d54972a302f4.js.map