function renderComponent(tagName, attrs) {
  const element = document.createElement(tagName);
  if (!!attrs) {
    for (const key in attrs) {
      if (Object.hasOwnProperty.call(attrs, key)) {
        const value = attrs[key];
        element.setAttribute(key, JSON.stringify(value));
      }
    }
  }
  document.write(element.outerHTML);
}

function renderTable(attrs, callback) {
  renderComponent("search-table", attrs);
  applyTableSetting(attrs, callback);
}

function applyTableSetting(attrs, callback) {
  const renderSetting = attrs.renderSetting;
  const toolbars = attrs.toolbars;
  const fieldToolbars = [];
  renderSetting.cols[0].forEach((col) => {
    if (col.toolbar && col.toolbars) {
      col.toolbars.map((bar) => fieldToolbars.push(bar));
    }
  });

  layui.use(["form", "table", "laytpl", "laydate"], function () {
    var form = layui.form,
      table = layui.table,
      layer = parent.layer === undefined ? layui.layer : parent.layer,
      $ = layui.jquery;

    const defaultRenderSetting = {
      elem: "#Table",
      toolbar: "#toolbar",
      defaultToolbar: [],
      even: true,
      url: "", //数据接口
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
      cols: [[]],
      done: function (res) {
        if (res.code != 0) {
          alert(res.msg);
        }
      },
    };

    const layRenderSetting = Object.assign(defaultRenderSetting, renderSetting);
    var tableIns = table.render(layRenderSetting);

    const defaultOpenSetting = {
      title: "",
      type: 2,
      shadeClose: false,
      maxmin: false,
      area: ["500px", "650px"],
      shift: 0,
      content: "",
      end: function () {
        tableIns.reload();
      },
    };

    //头工具栏事件
    table.on("toolbar(Lay)", function (obj) {
      var layEvent = obj.event; //获得 lay-event 对应的值

      let toolbar = null;
      toolbars.forEach((bar) => {
        if (bar.event === layEvent) {
          toolbar = bar;
        }
      });
      if (toolbar == null) {
        return;
      }

      const eventData = toolbar.onEvent(null, tableIns);
      // 存在数据时返回的时layer.open的设置
      if (!!eventData) {
        layer.open(Object.assign(defaultOpenSetting, eventData));
      }
    });

    //表格列工具栏操作
    table.on("tool(Lay)", function (obj) {
      var data = obj.data, //获得当前行数据
        layEvent = obj.event; //获得 lay-event 对应的值

      let toolbar = null;
      fieldToolbars.forEach((bar) => {
        if (bar.event === layEvent) {
          toolbar = bar;
        }
      });
      if (toolbar == null) {
        return;
      }

      const eventData = toolbar.onEvent(data, tableIns);
      // 存在数据时返回的时layer.open的设置
      if (!!eventData) {
        layer.open(Object.assign(defaultOpenSetting, eventData));
      }
    });

    //查询
    form.on("submit(search)", function (data) {
      var options = {
        where: {
          params: data.field,
        },
      };
      tableIns.reload(options);
      return false;
    });

    if (typeof callback === "function") {
      callback(table, tableIns);
    }
  });
}
