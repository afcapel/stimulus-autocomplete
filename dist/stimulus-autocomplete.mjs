import{Controller as t}from"stimulus";import e from"lodash.debounce";import s from"keycode";var n=function(t){function n(){t.apply(this,arguments)}t&&(n.__proto__=t),(n.prototype=Object.create(t&&t.prototype)).constructor=n;var i={activeClassList:{configurable:!0},queryParam:{configurable:!0},src:{configurable:!0},minLength:{configurable:!0}};return n.prototype.connect=function(){this.resultsTarget.hidden=!0,this.inputTarget.setAttribute("autocomplete","off"),this.inputTarget.setAttribute("spellcheck","false"),this.mouseDown=!1,this.onInputChange=e(this.onInputChange.bind(this),300),this.onResultsClick=this.onResultsClick.bind(this),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onInputFocus=this.onInputFocus.bind(this),this.onKeydown=this.onKeydown.bind(this),this.inputTarget.addEventListener("keydown",this.onKeydown),this.inputTarget.addEventListener("focus",this.onInputFocus),this.inputTarget.addEventListener("blur",this.onInputBlur),this.inputTarget.addEventListener("input",this.onInputChange),this.resultsTarget.addEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.addEventListener("click",this.onResultsClick)},n.prototype.disconnect=function(){this.inputTarget.removeEventListener("keydown",this.onKeydown),this.inputTarget.removeEventListener("focus",this.onInputFocus),this.inputTarget.removeEventListener("blur",this.onInputBlur),this.inputTarget.removeEventListener("input",this.onInputChange),this.resultsTarget.removeEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.removeEventListener("click",this.onResultsClick)},n.prototype.sibling=function(t){var e=Array.from(this.resultsTarget.querySelectorAll('[role="option"]')),s=this.resultsTarget.querySelector('[aria-selected="true"]'),n=e.indexOf(s);return(t?e[n+1]:e[n-1])||(t?e[0]:e[e.length-1])},n.prototype.select=function(t){for(var e,s,n=0,i=this.resultsTarget.querySelectorAll('[aria-selected="true"]');n<i.length;n+=1){var r=i[n];r.removeAttribute("aria-selected"),(e=r.classList).remove.apply(e,this.activeClassList)}t.setAttribute("aria-selected","true"),(s=t.classList).add.apply(s,this.activeClassList),this.inputTarget.setAttribute("aria-activedescendant",t.id)},n.prototype.onKeydown=function(t){switch(s(t)){case"esc":this.resultsTarget.hidden||(this.hideAndRemoveOptions(),t.stopPropagation(),t.preventDefault());break;case"down":var e=this.sibling(!0);e&&this.select(e),t.preventDefault();break;case"up":var n=this.sibling(!1);n&&this.select(n),t.preventDefault();break;case"tab":var i=this.resultsTarget.querySelector('[aria-selected="true"]');i&&this.commit(i);break;case"enter":var r=this.resultsTarget.querySelector('[aria-selected="true"]');r&&!this.resultsTarget.hidden&&(this.commit(r),t.preventDefault())}},n.prototype.onInputFocus=function(){this.fetchResults()},n.prototype.onInputBlur=function(){this.mouseDown||(this.resultsTarget.hidden=!0)},n.prototype.commit=function(t){if("true"!==t.getAttribute("aria-disabled")){if(t instanceof HTMLAnchorElement)return t.click(),void(this.resultsTarget.hidden=!0);var e=t.textContent.trim(),s=t.getAttribute("data-autocomplete-value")||e;this.onSelect(t,e,s),this.hasHiddenTarget?this.hiddenTarget.value=s:this.inputTarget.value=s,this.element.dispatchEvent(new CustomEvent("autocomplete.change",{bubbles:!0,detail:{value:s,textValue:e}})),this.inputTarget.focus(),this.hideAndRemoveOptions()}},n.prototype.onSelect=function(t,e,s){this.inputTarget.value=t.textContent.trim()},n.prototype.onResultsClick=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.commit(e)}},n.prototype.onResultsMouseDown=function(){var t=this;this.mouseDown=!0,this.resultsTarget.addEventListener("mouseup",function(){return t.mouseDown=!1},{once:!0})},n.prototype.onInputChange=function(){this.element.removeAttribute("value"),this.fetchResults()},n.prototype.identifyOptions=function(){for(var t=0,e=0,s=this.resultsTarget.querySelectorAll('[role="option"]:not([id])');e<s.length;e+=1)s[e].id=this.resultsTarget.id+"-option-"+t++},n.prototype.hideAndRemoveOptions=function(){this.resultsTarget.hidden=!0,this.resultsTarget.innerHTML=null},n.prototype.fetchResults=function(){var t=this,e=this.inputTarget.value.trim();if(!e||e.length<this.minLength)this.hideAndRemoveOptions();else if(this.src){var s=new URL(this.src,window.location.href),n=new URLSearchParams(s.search.slice(1));n.append(this.queryParam,e),s.search=n.toString(),this.element.dispatchEvent(new CustomEvent("loadstart")),fetch(s.toString()).then(function(e){return t.handleAutocompleteResponse(e)}).then(function(e){t.resultsTarget.innerHTML=e,t.identifyOptions();var s=!!t.resultsTarget.querySelector('[role="option"]');t.resultsTarget.hidden=!s,t.element.dispatchEvent(new CustomEvent("load")),t.element.dispatchEvent(new CustomEvent("loadend"))}).catch(function(){t.element.dispatchEvent(new CustomEvent("error")),t.element.dispatchEvent(new CustomEvent("loadend"))})}},n.prototype.handleAutocompleteResponse=function(t){return t.text()},n.prototype.open=function(){this.resultsTarget.hidden&&(this.resultsTarget.hidden=!1,this.element.setAttribute("aria-expanded","true"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},n.prototype.close=function(){this.resultsTarget.hidden||(this.resultsTarget.hidden=!0,this.inputTarget.removeAttribute("aria-activedescendant"),this.element.setAttribute("aria-expanded","false"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},i.activeClassList.get=function(){return(this.data.has("active-class")?this.data.get("active-class"):"active").split(" ").map(function(t){return t.trim()}).filter(function(t){return null!=t&&""!=t})},i.queryParam.get=function(){return this.data.has("query")?this.data.get("query"):"q"},i.src.get=function(){return this.data.get("url")},i.minLength.get=function(){var t=this.data.get("min-length");return t?parseInt(t,10):0},Object.defineProperties(n.prototype,i),n}(t);n.targets=["input","hidden","results"];export{n as Autocomplete};
//# sourceMappingURL=stimulus-autocomplete.mjs.map
