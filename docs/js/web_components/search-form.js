import { html, LitElement } from "./lit-element/lit-element.js";
import "./search-input.js";

export class SearchForm extends LitElement {
  static get properties() {
    return {
      searchSettings: { type: Array },
    };
  }

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  renderSearchItems() {
    let contentHtml = this.searchSettings.map((item) => {
      switch (item.valueType) {
        case "text":
          return html`<search-input
            setting="${JSON.stringify(item)}"
          ></search-input>`;
        //可再扩展增加其他表单项
        default: {
          return html`<search-input
            setting="${JSON.stringify(item)}"
          ></search-input>`;
        }
      }
    });
    return html`${contentHtml}`;
  }

  render() {
    return html`
      <div class="layui-row layui-col-space10" style="margin-top: 5px">
        <form class="layui-form" action="">
          ${this.renderSearchItems()}

          <div class="layui-input-inline">
            <button
              class="layui-btn"
              id="searchBtn"
              lay-submit=""
              lay-filter="search"
            >
              搜索
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define("search-form", SearchForm);
