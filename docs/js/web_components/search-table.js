import { html, LitElement } from "./lit-element/lit-element.js";
import "./search-form.js";

export class SearchTable extends LitElement {
  static get properties() {
    return {
      renderSetting: { type: Object },
      toolbars: { type: Array },
    };
  }

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="layui-fluid">
        ${this.renderSearchForm()}

        <!--定义表格-->
        <div class="layui-row">
          <table id="Table" lay-filter="Lay"></table>
        </div>

        ${this.renderTableToolbar()} ${this.renderFieldToolbar()}
      </div>
    `;
  }

  renderSearchForm() {
    const searchSettings = this.searchSettings();
    if (searchSettings.length > 0) {
      return html`
        <search-form
          searchSettings=${JSON.stringify(searchSettings)}
        ></search-form>
      `;
    }
  }

  searchSettings() {
    const searchSettings = [];
    this.renderSetting.cols[0].forEach((col) => {
      if (col.search) {
        const searchSetting = {
          field: col.field,
          label: col.label || col.title,
          valueType: col.valueType,
          valueEnum: col.valueEnum,
          tooltip: col.tooltip,
        };
        searchSettings.push(searchSetting);
      }
    });
    return searchSettings;
  }

  renderTableToolbar() {
    if (!!this.toolbars && this.toolbars.length > 0) {
      return this.renderToolbar("toolbar", this.toolbars);
    }
  }

  renderToolbar(id, toolbars) {
    if (!!toolbars && toolbars.length > 0) {
      return html`
        <script type="text/html" id="${id}">
          <div class="layui-btn-container">
            ${toolbars.map(
              (bar) => html`
                <button class="layui-btn layui-btn-sm" lay-event="${bar.event}">
                  ${bar.text}
                </button>
              `
            )}
          </div>
        </script>
      `;
    }
  }

  renderFieldToolbar() {
    const fieldBars = [];
    this.renderSetting.cols[0].forEach((col) => {
      if (col.toolbar && col.toolbars) {
        const bar = {
          toolbars: col.toolbars,
          id: col.toolbar.replace("#", ""),
        };
        fieldBars.push(bar);
      }
    });

    return html`
      ${fieldBars.map(
        (bar) => html` ${this.renderToolbar(bar.id, bar.toolbars)} `
      )}
    `;
  }
}

customElements.define("search-table", SearchTable);
