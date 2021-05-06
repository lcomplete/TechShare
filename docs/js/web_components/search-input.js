import { html, LitElement } from "./lit-element/lit-element.js";

export class SearchInput extends LitElement {

  static get properties(){
    return {
      setting:{type:Object}
    }
  }

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="layui-input-inline" style="margin: 0 6px 0 10px">${this.setting.label}</div>
      <div class="layui-input-inline" style="width: 120px">
        <input
          type="text"
          class="layui-input"
          name="${this.setting.field}"
          placeholder="请输入${this.setting.label}"
          value=""
        />
      </div>
    `;
  }
}

customElements.define("search-input", SearchInput);
