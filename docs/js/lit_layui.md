# 使用 lit 编写 Web Components 简化 Layui 代码

# Layui 介绍

Layui 是一套开源的 Web UI 解决方案，主要面向的是不熟悉前端开发的后端开发人员，使用这套框架可以大大提升后台系统的开发效率，这套框架也有其不足之处，其未采用现代化的前端开发方式，而使用的是原生 html、css、js 的编写方式，所以许多前端工程师认为这套框架在技术上并没有多少创新之处并且也不适用于大型项目，这些看法并没有问题，但 Layui 也有其优势，毕竟许多后台系统或个人项目用不上太过复杂的前端技术。

在后台系统开发的初期，只需按照 Layui 提供的文档和 demo 依葫芦画瓢即可完成功能开发，但在系统功能越来越多的情况下，会发现存在许多重复模式的代码，比如下面的一个表单 html 代码片段。

```html
<form class="layui-form" action="">
  <div class="layui-inline"></div>
  <div class="layui-form-item">
    <label class="layui-form-label">名称:</label>
    <div class="layui-input-block" style="width: 200px">
      <input
        type="text"
        name="name"
        class="layui-input"
        autocomplete="off"
        lay-verify="required"
      />
    </div>
  </div>

  <div class="layui-inline"></div>
  <div class="layui-form-item">
    <label class="layui-form-label">编码:</label>
    <div class="layui-input-block" style="width: 200px">
      <input
        type="text"
        name="sourceCode"
        class="layui-input"
        autocomplete="off"
        lay-verify="required"
      />
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit="" lay-filter="save">保存</button>
      <button class="layui-btn layui-btn-primary" id="cancel" type="button">
        取消
      </button>
    </div>
  </div>
</form>
```

这种写法相比组件化开发的 React 或 Vue 确实差了许多，我们可以在 Layui 后台中引入 React 或 Vue 来混合使用，但这样一来增加了复杂性和学习成本，毕竟选用 Layui 作为后台框架的开发人员大多数是不熟悉前端开发的，那么在这种情况下，有没有一种方式在不增加多少复杂性和学习成本的前提下使得项目能应用上组件开发呢？答案是有的，Web Components 就是其中一个，其比 React 简单，且受浏览器原生支持。

# Web Components 介绍

随着 React 等技术的流行，前端工程化的发展越来越快，浏览器也在不断适应这种发展并且逐步开始原生支持一些优秀的技术，比如组件化开发，谷歌作为 Chrome 浏览器的拥有者，一直在推进 Web Components 技术的发展，目前许多主流浏览器已经支持 Web Components 技术。关于 Web Components 的简介可参考 http://www.ruanyifeng.com/blog/2019/08/web_components.html 这篇博客。

我们通过一个 hello world 示例来直观的看看 Web Components 的写法。

```js
<html>
<head>
  <script>
  class HelloWorld extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `<p>hello world</p>`;
    }
  }
  customElements.define('hello-world', HelloWorld);
  </script>
</head>
<body>
  <hello-world></hello-world>
</body>
</html>
```

这个示例很简单，但是细心的朋友还是会发现一些问题，比如上图中的 innerHTML 写的是字符串，这对于复杂组件的开发必然是不利的，虽然可以通过 template 标记来解决但仍然不是很好的方式，为了解决这类问题，谷歌开源了 [lit](https://github.com/lit/lit) 项目，使用这个组件可以让开发 Web 组件更加简便，当然其学习成本是很低的。

# lit 介绍

使用 lit 可以简化 Web 组件的开发，我们直接看一个示例代码。

```js
import {html, css, LitElement} from 'lit';
​
export class SimpleGreeting extends LitElement {
  static get styles() {
    return css`p { color: blue }`;
  }
​
  static get properties() {
    return {
      name: {type: String}
    }
  }
​
  constructor() {
    super();
    this.name = 'Somebody';
  }
​
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
​
customElements.define('simple-greeting', SimpleGreeting);
```

```html
<simple-greeting name="World"></simple-greeting>
```

这个示例相比前面的略微复杂一些，但增加了属性、样式和表达式的用法，这个简单的例子让我们已经有了大部分组件化开发的能力，下面就让我们使用 lit 编写 Web Components 来封装 Layui 代码。

# lit 结合 Layui

在后台系统中，列表页是最常见的功能之一，列表页上多数情况下也有搜索表单，我们先看使用 Layui 时的一个普遍写法，下面的代码包含列表查询、打开增加或修改窗口的代码。

```html
<div class="layui-fluid">
  <div class="layui-row layui-col-space10" style="margin-top: 5px">
    <form class="layui-form" action="">
      <div class="layui-input-inline">名称</div>
      <div class="layui-input-inline" style="width: 120px">
        <input
          type="text"
          class="layui-input"
          name="name"
          placeholder="请输入名称"
          value=""
        />
      </div>
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

  <!--定义表格-->
  <div class="layui-row">
    <table id="tb" lay-filter="Lay"></table>
  </div>
</div>

<script type="text/html" id="toolbar">
  <div class="layui-btn-container">
    <button class="layui-btn layui-btn-sm" lay-event="addBtn">添加</button>
  </div>
</script>
<script type="text/html" id="bar">
  <a class="layui-btn layui-btn-xs" lay-event="edit">修改</a>
</script>

<script>
  layui.use(["form", "table", "laytpl"], function () {
    var form = layui.form,
      table = layui.table,
      layer = parent.layer === undefined ? layui.layer : parent.layer,
      $ = layui.jquery;

    var tableIns = table.render({
      elem: "#tb",
      toolbar: "#toolbar",
      defaultToolbar: [],
      even: true,
      url: "/getList", //数据接口
      page: {
        limit: 20,
      },
      method: "post",
      height: "full-40",
      request: {
        pageName: "page", //页码的参数名称，默认：page
        limitName: "pageSize", //每页数据量的参数名，默认：limit
      },
      contentType: "application/json",
      parseData: function (res) {
        var data = {
          code: res.code, //解析接口状态
          msg: res.message, //解析提示文本
          count: 0, //解析数据长度
          data: null, //解析数据列表
        };
        if (res.code == 200) {
          data = {
            code: 0, //解析接口状态
            msg: res.message, //解析提示文本
            count: res.data.total, //解析数据长度
            data: res.data.list, //解析数据列表
          };
        }
        return data;
      },
      cols: [
        [
          { field: "name", title: "名称", align: "center" },
          { field: "code", title: "编码", align: "center" },
        ],
      ],
      done: function (res) {
        if (res.code != 0) {
          alert(res.msg);
        }
      },
    });

    //对表格工具栏的操作
    table.on("tool(Lay)", function (obj) {
      var data = obj.data, //获得当前行数据
        layEvent = obj.event; //获得 lay-event 对应的值
      if (layEvent === "edit") {
        layer.open({
          title: "编辑",
          type: 2,
          shadeClose: false,
          maxmin: false,
          area: ["450px", "550px"],
          shift: 0,
          content: "edit.html?id=" + data.id,
          end: function () {
            tableIns.reload();
          },
        });
      }
    });
    //查询
    form.on("submit(search)", function (data) {
      var options = {
        where: {
          params: {
            name: data.field.name,
          },
        },
      };
      tableIns.reload(options);
      return false;
    });

    //头工具栏事件
    table.on("toolbar(Lay)", function (obj) {
      if (obj.event == "addBtn") {
        layer.open({
          title: "添加",
          type: 2,
          shadeClose: false,
          maxmin: false,
          area: ["450px", "550px"],
          shift: 0,
          content: "add.html",
          end: function () {
            tableIns.reload();
          },
        });
      }
    });
  });
</script>
```

几乎每个列表页都要按照以下样板代码进行编写，新增一个列表页时必然是复制以下代码进行修改，导致整个系统到处充斥着重复代码。使用 Web Components 可以解决这些问题，下面我们看看使用 lit 如何将这些样板代码进行封装。

下面的代码定义了一个 **search-table** 组件，这个组件比原有的表格在功能上更加丰富，能够根据设置自动渲染搜索的表单和工具栏。

```js
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
```

由于 search-table 的属性是对象，而 html 标记上的属性只能设置字符串，因此在赋值时需要将 json 序列化后写在属性上，写法上并不方便，我们可再增加一个工具方法来优化组件的编写方式。

```js
function renderComponent(tagName, attrs) {
  const element = document.createElement(tagName);
  if (!!attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      element.setAttribute(key, JSON.stringify(value));
    }
  }
  document.write(element.outerHTML);
}

function renderTable(attrs, callback) {
  renderComponent("search-table", attrs);
  applyTableSetting(attrs, callback);
}
```

**renderTable** 方法中包含 **search-table** 组件的输出，并应用表格相关的设置。封装完成后我们看看最终的写法。

```html
<script>
  renderTable(
    {
      toolbars: [
        {
          text: "添加",
          event: "addBtn",
          onEvent: function (data, tableIns) {
            return {
              title: "添加",
              area: ["450px", "550px"],
              content: "add.html",
            };
          },
        }
      ],
      renderSetting: {
        url: "/getList",
        cols: [
          [
            { field: "name", title: "名称", search:true, align: "center" },
            { field: "code", title: "编码", align: "center" },
            },
            {
              field: "",
              title: "操作",
              align: "center",
              toolbar: "#bar",
              fixed: "right",
              width: "10%",
              toolbars: [
                {
                  text: "修改",
                  event: "edit",
                  onEvent: function (data) {
                    return {
                      title: "编辑",
                      area: ["450px", "550px"],
                      content:
                        "edit.html?id=" + data.id,
                    };
                  },
                },
              ],
            },
          ],
        ],
      },
    });
</script>
```

只需要这么一点代码就完成了最初 Layui 版本所实现的一样的功能，在封装时沿用并扩展了 Layui 表格的属性，使得兼容原有 Layui 的 api，注意在名称一列新增了 search 扩展属性，设置为 true 即将该字段自动加入到搜索表单中。

文章中仅包含部分代码，上文中涉及的 Web Components 的全部代码请查看 https://github.com/lcomplete/TechShare/tree/master/docs/js/web_components 。注意这里面许多代码是根据项目实际情况进行封装的，为进行简化，全部组件的封装代码也并未给出，希望读者朋友能够领会组件化开发和 DRY 的编程思想。