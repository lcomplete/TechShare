module.exports = {
  base: "/TechShare/",
  title: "lcomplete 的技术分享",
  description:
    "分享Java、.NET、Javascript、效率、软件工程、编程语言等技术知识。",
  plugins:[
    ['@vuepress/back-to-top'],
    require('./plugins/read-time'),
  ],
  markdown: {
    anchor: {permalink: false},
    toc: {includeLevel: [2, 3]},
    extendMarkdown: md => {
      // md.use(require('markdown-it-mermaid').default);
      // md.use(require('markdown-it-sub'));
      // md.use(require('markdown-it-sup'));
      // md.use(require('markdown-it-abbr'));
      // md.use(require('markdown-it-ins'));
      // md.use(require('markdown-it-figure'));
      // md.use(require('markdown-it-smartarrows'));
      // md.use(require('markdown-it-fontawesome'));
    }
  },
  // 其它配置
  themeConfig: {
    // repo: 'lcomplete/TechShare',
    nav: [{ text: "GitHub", link: "https://github.com/lcomplete/TechShare" }],
    lastUpdated: '最后更新',
    sidebar: [
      {
        title: "目录",
        collapsable: false,
        path: "/SUMMARY.md",
      },
      {
        title: "Java",
        collapsable: false,
        children: [
          "/docs/java/俯瞰Java服务端开发",
          "/docs/java/part_one_of_java_engineer_path",
          "/docs/java/java_study_way",
          "/docs/java/liquibase",
          "/docs/java/unit_test",
          "/docs/java/api_error_handling",
        ],
      },
      {
        title: "软件工程",
        collapsable: false,
        children: [
          "/docs/engineering/devops",
          "/docs/engineering/gitflow",
        ],
      }, 
      {
        title: "Javascript",
        collapsable: false,
        children: [
          "/docs/js/lit_layui",
        ],
      },
      {
        title: "编程人生",
        collapsable: false,
        children: [
          "/docs/thinking/编码的道与禅",
          "/docs/thinking/程序员的职业素养",
          "/docs/thinking/coder_kpi",
        ],
      }, 
      {
        title: "编程语言",
        collapsable: false,
        children: [
          "/docs/lang/使用prolog解决爱因斯坦斑马难题",
          "/docs/lang/一段简单的ruby爬虫代码",
        ],
      }, 
      {
        title: "效率",
        collapsable: false,
        children: [
          "/docs/10x/script",
          "/docs/10x/terminal",
          "/docs/tools/我的效率工具箱",
          "/docs/tools/n8n",
        ],
      },
    ],
  },
};
