(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{571:function(v,_,t){"use strict";t.r(_);var e=t(27),l=Object(e.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"网站项目-git-使用流程和规范"}},[v._v("网站项目 Git 使用流程和规范")]),v._v(" "),t("h2",{attrs:{id:"零、前言"}},[t("strong",[v._v("零、前言")])]),v._v(" "),t("ol",[t("li",[v._v("本文档适用于需要持续发布的网站项目（后端、前端），稍加修改可以适用于需要同时存在不同版本的项目（框架、组件、app等）。")]),v._v(" "),t("li",[v._v("该工作流程基于 git flow 分支策略，该策略的优点是分支清晰，能够应付开发流程中的许多情况，缺点是分支较多，开发过程中会经常需要进行合并操作，于是在基于该策略的基础上做适当的简化，并考虑并行迭代的情况，综合制定了该工作流程。")])]),v._v(" "),t("p",[v._v("本文档共包含分支策略、工作流程、分支使用规范、代码提交规范四个部分，分支策略主要是对 git flow 的介绍，工作流程部分则描述在具体开发过程中该如何实施，分支使用规范详细描述每种分支的用法，最后的代码提交规范是成功推进代码审查的关键因素。")]),v._v(" "),t("h3",{attrs:{id:"_1、术语说明"}},[t("strong",[v._v("1、术语说明")])]),v._v(" "),t("ul",[t("li",[v._v("持续集成/CI：使用该术语一般指 feature 分支的代码频繁集成到 develop 分支，并由CI自动构建到测试环境，feature 集成到 develop 一天内最少一次。")])]),v._v(" "),t("ul",[t("li",[v._v("持续集成环境：根据特定分支配置的自动构建、运行测试和部署测试程序的环境。")])]),v._v(" "),t("ul",[t("li",[v._v("预发布环境：接近生产的环境，而非测试环境。")])]),v._v(" "),t("h2",{attrs:{id:"一、分支策略"}},[t("strong",[v._v("一、分支策略")])]),v._v(" "),t("h3",{attrs:{id:"_1、分支策略"}},[t("strong",[v._v("1、分支策略")])]),v._v(" "),t("p",[v._v("主要分支策略基于 git flow，但基于复杂多变的项目研发过程会有所不同。")]),v._v(" "),t("p",[v._v("Git flow主要流程见下图，具体使用可参考："),t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2012/07/git.html",target:"_blank",rel:"noopener noreferrer"}},[v._v("http://www.ruanyifeng.com/blog/2012/07/git.html"),t("OutboundLink")],1)]),v._v(" "),t("p",[t("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb195d05989d49638aff53dd5d6d1fc7~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),v._v(" "),t("h3",{attrs:{id:"_2、长期分支"}},[t("strong",[v._v("2、长期分支")])]),v._v(" "),t("ul",[t("li",[v._v("master：用于存放对外发布的版本，任何时候在这个分支拿到的都是稳定的版本。")])]),v._v(" "),t("ul",[t("li",[v._v("develop：用于日常的开发，存放最新的开发版本。")])]),v._v(" "),t("h3",{attrs:{id:"_3、临时分支"}},[t("strong",[v._v("3、临时分支")])]),v._v(" "),t("ul",[t("li",[v._v("feature：用于开发特定功能从develop中分出来的，一个feature分支对应一次迭代开发，开发完成后合并到develop分支中；")])]),v._v(" "),t("ul",[t("li",[v._v("hotfix：用于修复bug，从master中分出来的，开发完成后合并到master、deveop分支。")])]),v._v(" "),t("ul",[t("li",[v._v("release：指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。")])]),v._v(" "),t("h2",{attrs:{id:"二、工作流程"}},[t("strong",[v._v("二、工作流程")])]),v._v(" "),t("p",[t("strong",[v._v("注：以下文字中粗体为特殊情况，大多数时候不需考虑，从流程中去除的话，该工作流程并不复杂。")])]),v._v(" "),t("h3",{attrs:{id:"_1、项目初始"}},[t("strong",[v._v("1、项目初始")])]),v._v(" "),t("ul",[t("li",[v._v("gitlab上创建项目")])]),v._v(" "),t("ul",[t("li",[v._v("创建develop分支，并将其设置为保护性分支，具有Maintainer权限的用户才可以直接push和merge，其他用户需要将代码提交到自己的分支后发起merge request（以下简称MR）请求，由Maintainer和团队成员进行代码评审决定是否接受合并。")])]),v._v(" "),t("ul",[t("li",[v._v("修改master分支为不允许任何人推送，该分支只能通过MR进行变更。")])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95f71972b0484b2eb57b46329bb1654e~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),v._v(" "),t("h3",{attrs:{id:"_2、迭代开始阶段"}},[t("strong",[v._v("2、迭代开始阶段")])]),v._v(" "),t("ul",[t("li",[v._v("情况1：迭代时间较长、分工明确")])]),v._v(" "),t("ul",[t("li",[v._v("开发人员各自新建属于自己的feature分支，代码持续集成到develop。")])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("情况2：迭代时间较短、分工不明确或需要多个人开发同一功能")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("开发人员共享一个feature分支，代码持续集成到develop。")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("情况3：迭代A、迭代B同时启动，A为主要迭代")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("主要迭代根据情况1、2选择开发方式，代码持续集成到develop")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("次要迭代从develop分出sprint-{版本}，feature基于该版本开发，代码持续集成到sprint-{版本}")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("情况4：主要迭代A已启动，突然启动迭代B")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("迭代B从master分出sprint-{版本}，feature基于该版本开发，代码持续集成到sprint-{版本}")])])]),v._v(" "),t("p",[t("strong",[v._v("注意：情况2、3、4均为特殊情况，应尽量避免")]),v._v("，尤其是3、4两种情况需要将代码持续集成到另一个版本，那么需要配置另一套持续集成环境，同时也加大了代码评审、分支合并的麻烦。下面描述的开发阶段以情况1为准，若为3、4情况，则需要将develop分支替换为sprint分支。")]),v._v(" "),t("h3",{attrs:{id:"_3、迭代开发阶段"}},[t("strong",[v._v("3、迭代开发阶段")])]),v._v(" "),t("ul",[t("li",[v._v("开发人员完成feature的开发或阶段性开发时，发起到develop的MR。")])]),v._v(" "),t("ul",[t("li",[v._v("Maintainer和团队成员对MR进行review，拒绝的需要提交者重新修改代码后再次提交MR，接受的将合并到develop，并自动构建到测试环境。")])]),v._v(" "),t("ul",[t("li",[v._v("迭代整体测试通过后进入发布准备阶段。")])]),v._v(" "),t("h3",{attrs:{id:"_4、发布准备阶段"}},[t("strong",[v._v("4、发布准备阶段")])]),v._v(" "),t("ul",[t("li",[v._v("对于无预发布环境的项目，跳过准备阶段，进入发布阶段。")])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("对于有预发布环境的项目，从develop中新建release为保护性分支（若已有则合并，该分支可在部署稳定后删除）。")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("release分支构建到预发布环境进行测试，若存在bug，在该分支上进行修改。")])])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("完成release分支的测试后，进入发布阶段。")])])]),v._v(" "),t("h3",{attrs:{id:"_5、发布阶段"}},[t("strong",[v._v("5、发布阶段")])]),v._v(" "),t("ul",[t("li",[v._v("提交发布申请，运维审核通过后进行代码合并")])]),v._v(" "),t("ul",[t("li",[v._v("存在release时，release分支合并到develop和master，不存在时，develop合并到master。")])]),v._v(" "),t("ul",[t("li",[v._v("通过master构建并发布到生产环境。")])]),v._v(" "),t("ul",[t("li",[v._v("在master上打上版本tag标签，标记发布。")])]),v._v(" "),t("h3",{attrs:{id:"_6、线上发布回滚情况"}},[v._v("6、线上发布回滚情况")]),v._v(" "),t("ul",[t("li",[v._v("出现发布回滚情况时，合并到master上的代码也需进行回滚操作。")])]),v._v(" "),t("h3",{attrs:{id:"_7、线上bug修复"}},[v._v("7、线上bug修复")]),v._v(" "),t("ul",[t("li",[v._v("从master新建hotfix分支用于修复bug。")])]),v._v(" "),t("ul",[t("li",[v._v("完成后将hotfix合并到develop进行测试。")])]),v._v(" "),t("ul",[t("li",[v._v("测试通过后合并到master进行发布，并打上小版本号的tag标签。")])]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("若当前存在release分支，还需将hotfix合并到release。")])])]),v._v(" "),t("ul",[t("li",[v._v("删除hotfix分支。")])]),v._v(" "),t("h2",{attrs:{id:"三、使用规范"}},[t("strong",[v._v("三、使用规范")])]),v._v(" "),t("h3",{attrs:{id:"_1、临时分支命名规范"}},[t("strong",[v._v("1、临时分支命名规范")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("临时分支")]),v._v(" "),t("th",[v._v("前缀")]),v._v(" "),t("th",[v._v("备注")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("feature")]),v._v(" "),t("td",[v._v("feature-")]),v._v(" "),t("td",[v._v("若gitlab中包含任务issue，可以采用feature-{issueid}-{简单描述}命名")])]),v._v(" "),t("tr",[t("td",[v._v("release")]),v._v(" "),t("td",[v._v("release-")]),v._v(" "),t("td",[v._v("以版本名称或版本号结尾")])]),v._v(" "),t("tr",[t("td",[v._v("hotfix")]),v._v(" "),t("td",[v._v("hotfix-")]),v._v(" "),t("td",[v._v("若gitlab中包含bug issue，可以采用feature-{issueid}-{简单描述}命名")])]),v._v(" "),t("tr",[t("td",[v._v("sprint")]),v._v(" "),t("td",[v._v("sprint-")]),v._v(" "),t("td",[v._v("以迭代名称或版本号结尾")])])])]),v._v(" "),t("p",[v._v("CI管道可通过前缀匹配进行相关的自动化操作。")]),v._v(" "),t("p",[v._v("分支前缀，一般用-/连接，很少用_，"),t("em",[v._v("表示两个词语有关联，feature分支这里实际上是一种分组，所以一般用-/，可以在前缀之后使用")]),v._v("。")]),v._v(" "),t("h3",{attrs:{id:"_2、feature-分支使用规范"}},[t("strong",[v._v("2、feature 分支使用规范")])]),v._v(" "),t("ul",[t("li",[v._v("分支粒度：以一个功能为单位，尽量对应gitlab上的一个任务issue，开发下一个功能时新建feature")])]),v._v(" "),t("ul",[t("li",[v._v("存在时间：尽量短，合并到develop后选择合适的时间点删除feature")])]),v._v(" "),t("ul",[t("li",[v._v("集成频率：每天最少一次，feature要经常合并到develop中，便于code review，开发要经常从develop中获取最新代码；")])]),v._v(" "),t("ul",[t("li",[v._v("合并请求：当feature完成的时候即可发起MR，但当一个feature开发时间较长时，也应当尽量提早发起MR，此时可在MR中添加WIP前缀，表示当前工作正在处理中，相关人员可以提前审核，但不合并")])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66303c1820e74334b0aaf59244128472~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),v._v(" "),t("h3",{attrs:{id:"_3、hotfix-分支使用规范"}},[t("strong",[v._v("3、hotfix 分支使用规范")])]),v._v(" "),t("ul",[t("li",[v._v("与feature鉴别：线上除紧急bug修复，当需要做功能性调整并快速上线时，也需要新建hotfix分支，而非feature。")])]),v._v(" "),t("h3",{attrs:{id:"_4、sprint-分支使用规范"}},[t("strong",[v._v("4、sprint 分支使用规范")])]),v._v(" "),t("ul",[t("li",[v._v("sprint的使用与develop相同，也为保护性分支。")])]),v._v(" "),t("ul",[t("li",[v._v("需要从sprint中分出feature分支进行开发，从feature提交MR到sprint中做代码审查。")])]),v._v(" "),t("h3",{attrs:{id:"_5、release分支使用规范"}},[t("strong",[v._v("5、release分支使用规范")])]),v._v(" "),t("ul",[t("li",[v._v("release为保护性分支。")])]),v._v(" "),t("ul",[t("li",[v._v("使用 hotfix 分支进行bug修复。")])]),v._v(" "),t("h2",{attrs:{id:"四、代码提交规范"}},[v._v("四、代码提交规范")]),v._v(" "),t("p",[v._v("先说说为什么要制定代码提交规范。")]),v._v(" "),t("ol",[t("li",[v._v("Git 是当前最流行的代码仓管理系统，可以说是开发者的必备技能。它非常强大，使用得当的话可以大幅助力个人效能的提升。如果一个团队的成员都能熟练使用 Git 的话，可以大大提高团队代码的模块化、可读性、可维护性，从而提高团队的研发效能。")]),v._v(" "),t("li",[v._v("成功推进代码审查的两个关键操作：一是注意审查提交的原子性，二是审查中关注提交说明（Commit Message）。")])]),v._v(" "),t("h3",{attrs:{id:"_1、代码提交原子性规范"}},[v._v("1、代码提交原子性规范")]),v._v(" "),t("p",[v._v("代码提交的原子性，是指一个提交包含一个不可分割的特性、修复或者优化，同时这个提交要尽可能小。如果用一个提交完成一个功能，这个提交还是会比较大的话，我们需要把这个功能再拆分为子功能。")]),v._v(" "),t("p",[v._v("原子性提交的优点：")]),v._v(" "),t("ol",[t("li",[v._v("可以让代码结构更清晰、更容易理解；")]),v._v(" "),t("li",[v._v("出了问题之后方便定位，并可以针对性地对问题提交进行“回滚”；")]),v._v(" "),t("li",[v._v("在功能开关的协助下，可以让开发者尽快把代码推送到 develop/master 上进行合并。这正是持续集成的基础。")])]),v._v(" "),t("p",[v._v("规范要求：")]),v._v(" "),t("ol",[t("li",[v._v("一个提交包含一个不可分割的特性、修复或者优化，同时这个提交要尽可能小。")])]),v._v(" "),t("p",[v._v("代码审查标准")]),v._v(" "),t("ol",[t("li",[v._v("不符合原子性提交的代码可以直接打回。")]),v._v(" "),t("li",[v._v("逐步要求提交的原子性，不要求一次性到位，但必须逐步改进。")])]),v._v(" "),t("h3",{attrs:{id:"_2、代码提交说明规范"}},[v._v("2、代码提交说明规范")]),v._v(" "),t("p",[v._v("好的提交说明可以提升代码可读性，同时也是提高代码审查效率的利器。通过制定严格的提交说明格式来规范其质量，可以方便审查者查理解被审查代码的意图、实现思路，并通过测试情况，加快对代码的理解，提高对代码质量的信心，从而大大提高审查者的效率。同时，严格的提交说明格式及好的说明质量也可以督促开发者提高代码质量。")]),v._v(" "),t("p",[v._v("好的格式应该包含以下几个方面：")]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("标题")]),v._v("，简明扼要地描述这个提交。这部分最好在 70 个字符之内，以确保在单行显示的时候能够显示完整。比如，在命令行常用的 git log --oneline 输出结果要能显示完全。")]),v._v(" "),t("li",[t("strong",[v._v("详细描述")]),v._v("，包括提交的目的、选择这个方法的原因，以及实现细节的总结性描述。这三个方面的内容最能帮助审查者阅读代码。")]),v._v(" "),t("li",[t("strong",[v._v("测试情况")]),v._v("，描述的是你对这个提交做了什么样的测试验证，具体包括正常情况的输出、错误情况的输出，以及性能、安全等方面的专项测试结果。这部分内容，可以增加审查者对提交代码的了解程度以及信心。")]),v._v(" "),t("li",[t("strong",[v._v("与其他工具和系统相关的信息")]),v._v("，比如相关任务 ID、相关的冲刺（sprint，也可翻译为“迭代”）链接。这些信息对工具的网状互联提供基础信息，非常重要。")])]),v._v(" "),t("p",[v._v("规范要求：")]),v._v(" "),t("ol",[t("li",[v._v("提交说明必须包括"),t("strong",[v._v("标题、测试情况")]),v._v("两个部分。")]),v._v(" "),t("li",[v._v("提交说明需要符合格式要求，根据提交的代码量，有必要时增加"),t("strong",[v._v("详细描述、相关信息")]),v._v("两部分。")]),v._v(" "),t("li",[v._v("基本格式要求（其中标题、测试两个部分必须包括，标题必须使用 "),t("strong",[v._v("type(scope)")]),v._v("  形式）：")])]),v._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[v._v("标题\n\n描述:\n\n测试:\n\n相关信息:\n")])])]),t("p",[v._v("提交说明模板：")]),v._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[v._v("$type($scope): \n\nsummary: \n\ntest: \n\ntask id: \n\nBREAKING CHANGE: \n\nCloses：关闭issue，如#123\n")])])]),t("p",[v._v("type 可使用以下选项：")]),v._v(" "),t("ul",[t("li",[v._v("feat：新功能")]),v._v(" "),t("li",[v._v("fix：修补 bug")]),v._v(" "),t("li",[v._v("docs：仅文档的改动")]),v._v(" "),t("li",[v._v("style：代码格式的改动，不影响代码运行的变动。")]),v._v(" "),t("li",[v._v("refactor：重构，即不是新增功能，也不是修改bug的代码变动")]),v._v(" "),t("li",[v._v("perf：性能优化")]),v._v(" "),t("li",[v._v("test： 增加测试")]),v._v(" "),t("li",[v._v("build：构建过程")]),v._v(" "),t("li",[v._v("chore: 不修改源代码的杂项变动")])]),v._v(" "),t("p",[v._v("scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。")]),v._v(" "),t("p",[v._v("在末尾说明其他重要信息，比如不兼容的改动、修复的 bug id 等。")])])}),[],!1,null,null,null);_.default=l.exports}}]);