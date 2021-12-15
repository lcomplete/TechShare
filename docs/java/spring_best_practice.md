# Java Spring 项目开发最佳实践

## 零、前言

由阿里向 Java 社区开源的 Java 开发手册其中包含许多优秀的实践，本文档可作为该手册的扩展内容，针对许多项目开发现状而编写，其中部分内容来自于该手册，由于是重点内容，所以在该文档中再次强调。

本文在提供最佳实践的前提下尽可能保持规范的灵活性，因此在可以使用多种开发方式的情况下，本文列出多种较好方式，但更推荐排在前面的方式，也希望读者能够灵活运用该文档。

## 一、准备工作

### IDE 的选择

使用 IntelliJ IDEA 作为集成开发环境。

### IDEA 插件推荐

-   Alibaba Java Coding Guide
-   Lombok
-   Maven Helper
-   SonarLint
- GitToolBox

简单列举几个通用的五星插件，还有许多专门领域的插件，例如 MyBatis、JPA 等，后续专门写一篇文章来进行介绍。

### JDK 版本

默认使用 JDK 1.8，根据项目情况判断是否使用高版本。

### 编程规范

请阅读：

-   [阿里巴巴Java开发手册](https://github.com/alibaba/p3c)

<!---->

-   [Google Java编程风格指南](http://hawstein.com/2014/01/20/google-java-style/)

### 其他必用工具

Maven、Lombok、JUnit。

Maven 父 pom 为基础框架的 starter-parent，建议参考 `spring-boot-starter-parent` 项目进行编写。

## 二、命名规范

说明：当规范中包含多个名称时，优先使用前面的。

### 顶层包名规范

最外层包名结构：`com.${公司简拼}.${项目分组}.${项目名称}.${子包名}`

分段：包名至少为4段，小项目可以使用4段。

### 通用项目分层包名和类名规范

- 控制器层包名：controller

    类名：Controller

- Restful 控制器包名：controller.rest

    Restful 类名：Resource（偏 Restful 风格、包含数据的增删改查的控制器也可使用该后缀）

- 服务包名：service

    类名：Service

- SPI（Service Provider API）包名：spi

- 通用业务处理层包名：manager

    类名：Manager

- spring 配置包名：config

    类名：Config（符合国人编写习惯）、Configuration

- DAO 层包名：repository（使用 jpa 、jdbc等数据访问层技术时）、mapper（使用 mybatis 时）、dao

    类名：Repository（使用 jpa 、jdbc等数据访问层技术时）、Mapper（使用 mybatis 时）、DAO、CustomXXXRepository（自定义 jpa Repository）

- 数据库实体包名：entity（entity 相比 domain 更加精确）、domain.entity、domain

- DTO 包名：dto

    类名：DTO

- 视图模型对象包名：vo

    类名：VO

- 数据模型包名：model，这里放置业务相关的数据模型（更贴近领域模型而非数据库模型）。

- 枚举包名：enums

- 常量包名：constant

    类名：**禁止使用 Constants 类名（不允许使用含糊不清的名词，必须有具体的指向意义）** ，必须按类型进行常量的归类，应用相关的常量类命名为 AppConstants。

- Aspect 实现类包名：aop

    类名：Aspect

- 异常类包名：exception

    类名：Exception

- Spring Filter 包名：filter

    类名：Filter

- 安全相关类包名：security

- 工具类包名：util

    类名：Utils

- 注解包名：annotation

- 自定义 Spring 事件包名：event、event.listener (事件监听处理)、event.model（自定义事件模型）

    监听器类：Listener
    
    事件模型类：Event

### 项目包名类名示例

通用包名类名示例图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/111efc5f0a5043acbb2376b3a28915ae~tplv-k3u1fbpfcp-watermark.image?)

**注：这里仅作为包名示例，这些包不一定需要放置在最外层，需要根据实际情况组织层次结构。**

部分包可能会存在其他模块中，比如 util、filter、security 大多数时候都封装在其他模块中，如果该模块需要特殊定制才加入。

当一个项目出现这么多模块时，结构上可以重新组织，比如将数据模型相关的统一组织在 domain 包中，如下图所示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7215733a1faa4091ad4c286ce26c380b~tplv-k3u1fbpfcp-watermark.image?)

规范的包名能够起到见名知意的效果，但包的结构如何组织并非一成不变的，需要根据实际情况进行调整，**在同一层级的包名不宜过多，过多时需要重新组织，从而使代码所有者能够快速定位到所需代码中。**

## 三、项目结构

### 阿里应用分层规范

图中默认上层依赖于下层，箭头关系表示可直接依赖，如：开放接口层可以依赖于

Web 层，也可以直接依赖于 Service 层，依此类推。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e812e8e98cb24ced935e16a0e7fb6b44~tplv-k3u1fbpfcp-zoom-1.image)

• 开放接口层：可直接封装 Service 方法暴露成 RPC 接口；通过 Web 封装成 http 接口；进行网关安

全控制、流量控制等。

• 终端显示层：各个端的模板渲染并执行显示的层。当前主要是 velocity 渲染，JS 渲染，JSP 渲染，移动端展示等。

• Web 层：主要是对访问控制进行转发，各类基本参数校验，或者不复用的业务简单处理等，**Controller 层不可以直接调用 DAO 层**。

• Service 层：相对具体的业务逻辑服务层。

• Manager 层：通用业务处理层，它有如下特征：

    1）对第三方平台封装的层，预处理返回结果及转化异常信息。

    2）对 Service 层通用能力的下沉，如缓存方案、中间件通用处理。

    3）与 DAO 层交互，对多个 DAO 的组合复用。

• DAO 层：数据访问层，与底层 MySQL、Oracle、Hbase 等进行数据交互。

• 外部接口或第三方平台：包括其它部门 RPC 开放接口，基础平台，其它公司的 HTTP 接口。

### 分层领域模型规约

• DO（Data Object，**不需要添加后缀**）：此对象与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。

• DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。

• BO（Business Object）：业务对象，由 Service 层输出的封装业务逻辑的对象。

• VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。

• Query：数据查询对象，各层接收上层的查询请求。注意超过 2 个参数的查询封装，禁止使用 Map 类来传输。

## 四、微服务项目结构

### 服务间通信实践

**可以暴露为 RPC（REST） 服务的分层：**

-   Controller
-   Service

**哪些情况下可以调用 Service 层的 RPC 服务？**

-   调用方属于当前领域限界上下文的服务，或者说调用方与提供方属于同一组微服务。

**不同领域限界上下文的服务，不能互相调用 Service 层级的 RPC 服务，必须通过 Controller 层进行 Api 交互（更好的方式是使用领域集成事件/消息异步通信）。**

**异步通信**

-   异步通信使用 Spring Cloud Bus。

### 服务提供方（Provider）开发实践

RPC 接口和实现各自放在独立的模块中，方便服务调用方重用服务接口。

**服务接口模块只能包含最基本的模块依赖（过多会导致依赖传递），dto 必须是 pojo 。**

服务的接口及相关模型必须放在同一模块中，该模块仅包含这些内容，**服务提供方的接口中不能指定 FeignClient 注解（在消费方指定），在方法中可以使用 RequestMapping 等注解**。

### 服务消费方（Consumer）开发实践

引用 RPC 接口模块，在消费方编写客户端类继承相关接口，在客户端接口上增加 FeignClient 注解即可。

### 微服务项目包名类名实践

- 服务提供方接口模块包名：service.contract、service.api 或 service.support 等

    RPC 服务接口名：Service

- 服务提供方模块包名：service.provider

    RPC 服务类：ServiceImpl、Resource（提供资源的增删改查时）

- 对外接口包名：api、portal（若不需要走网关）

- RPC 服务客户端类名：Client

## 五、Controller 层开发实践

### Controller 接口定义

-   Url 映射名与方法名应该保持高度相关性，尽量一致，当 url 需要设计的相对精简时可以有细微的命名差异。

-   请求参数注意事项：

    -   不能出现用户信息等敏感数据，相关信息应该通过加密 cookie 等方式传递。
    -   请求参数超过4个时，应当使用 VO 或 DTO 对象进行封装。

-   返回对象注意事项：

    -   返回类型必须使用强类型，错误示例：`ApiResult<Object>`、`Object`、`Map<String,Object>`。
    -   数据敏感性不高的情况下，返回信息尽量丰富，例如创建对象时不要仅返回是否成功，同时也返回对象Id，这样一来扩展性更高，比如用户创建后又可以立即根据这个Id来选择用户所在的角色组。

-   请求的访问方式

    -   查询数据时使用 GET。
    -   修改数据时使用 POST，特别要注意传递数据较少但实际会修改数据的情况下也必须使用 POST，如传递 id 删除数据时。
    -   构造 Restful 风格接口时参照 Restful 规范。

### Controller 中 ApiResult 的使用规约

**接口需不需要统一返回 ApiResult 包装的对象？不是绝对的，视项目情况而定，以跟客户端开发协商的为准，如果你觉得返回 ApiResult 很麻烦，可以看看我写的另一篇文章 [API 错误处理的最佳实践](https://juejin.cn/post/6982901297758339102)。**

**需要使用 ApiResult 的情况有：**

-   提供给第三方使用的 Api 。
-   修改数据的接口。
-   可能具有多个返回状态码的接口。

**Service 层是否可以返回 ApiResult ？**

-   一般性原则是不可以，除非在 Service 层有重用需求（一般而言 Service 层方法的粒度较粗，可重用性不高，可重用高的可以下沉到 Manager 层）。

**ApiResult 不允许向下传递（ApiResult 面向的是 Api 调用方，而非开发人员）。**

-   ApiResult 是作为最终结果输出到调用方，而不应该在开发程序的时候多方传递，这样会降低可读性（增加了if、else的编写），因此 ApiResult 不允许向下传递。

### 统一 Controller 层的异常处理

-   优先使用 ExceptionHandler 方式进行全局异常处理，其次是 AOP 实现。
-   Controller 中可以进行业务相关的异常处理，不需要进行通用异常处理。

### 参数校验规约

-   使用 JSR 验证机制。
-   Controller 层可以进行参数的校验工作，也可以下放至 service 层进行校验，取决于代码的重用程度和验证的层次，Controller 主要进行基本参数验证，业务逻辑上的参数验证应该放到 service 层。
-   校验方法必须放在单独的方法中。

### API 优先设计

-   使用 API 优先设计的思想进行 Controller 层的开发，大多数情况下使用 API Code First 模式，提供外部 API 时可以考虑 API Design First。

    -   扩展项目：<https://github.com/swagger-api/swagger-codegen>、<https://github.com/OpenAPITools/openapi-generator>

-   项目中需要引入 Swagger 组件。

-   在生产环境禁用 Swagger 。

## 六、Service 层开发实践

### Service 层方法签名

方法参数注意事项：

-   必须使用强类型。
-   超过 4 个参数时使用数据模型类进行封装。
-   不允许使用复杂对象，如：Request、Response 等。

方法返回值注意事项：

-   **不允许返回 ApiResult**，返回 ApiResult 容易使 Controller 层变为幽灵类，即 Controller 层毫无作用，减少了分层层次。

### Servce 层编写注意事项

-   不应该包含非业务逻辑相关的代码，如国际化信息、导出 Excel 实现等。
-   不能包含 DAO 层实现代码。

### Service 接口编写规约

**Service 接口是必须的吗？不是。**

**需要编写 Service 接口的情况有：**

-   Service 可能需要多个实现（这种情况也可考虑将 Service 接口放入 spi 包中）。
-   需要直接使用 Service 接口做 rpc 调用时。

**其他情况下不需要编写 Service 接口。**

**不编写 Service 接口时的注意事项：**

-   不要在 private 方法上编写注解。
-   Service 类不应该继承包含增删改善功能的基类。

## 七、DAO 层开发实践

### 数据访问组件的选择

-   管理后台项目统一使用 jpa、jOOQ 或其他 ORM 框架以提升开发效率。
-   客户端/网站接口可使用组合使用 jpa、mybatis 等技术，按性能需要为准。

### 注意事项

-   数据分页必须在数据库层面进行。
-   不使用存储过程。

## 八、其他实践

### 异常处理实践

-   DAO 层不需要手动抛出异常，若有底层数据访问类，可在底层封装 DAOException，**DAO层可以不捕获异常，若捕获必须向上传递异常，在该层不需要打印异常日志**。
-   Service 层可以捕获异常，在一些情况下可通过异常控制代码流程，比如通过参数校验异常控制程序不往下执行，通过这些方式，减少 if 代码，**Service 层捕获异常后可向上传递异常，若不传递则必须记录异常日志，若向上传递则不记录日志**。
-   Controller 层与 Service 层的异常处理方式一致，**向上传递异常时，由 Controller 上的切面进行日志记录和返回结果的包装**。
-   **原则：自行处理异常必须记录日志（完整异常堆栈），向上传递异常则不需要，DAO 层必须向上传递异常。**
-   不允许忽略异常（try 后什么都不做）。
-   一级自定义异常继承自 RunTimeException 。

### 单元测试实践

-   单元测试必须遵守 AIR（Automatic、Independent、Repeatable） 原则。
-   单元测试必须保证依赖的测试环境是受控的，测试用例执行的成功与否是符合预期的。
-   代码仓库中的单元测试执行失败时会阻碍后续工作的进行，一旦出错必须立即解决。

### 对象映射

-   使用 MapStruct 等工具组织类之间的映射关系，以提升对象映射执行效率和代码可读性。

## 九、数据库版本控制

-   使用 liquibase 或 flyway 做数据库版本控制。
-   数据库版本控制代码放在单独的 git 项目中（方便设置部署流水线），按项目进行分组，一个 git 项目中可存在多个数据库版本控制代码。

## 十、部署相关实践

-   Dockerfile 需要支持 SkyWalking，以进行链路追踪。
-   配置中心使用 apollo，灵活管理项目配置。
-   线上使用 logback 日志系统写入日志到 ELK。

## 十一、Java 微服务项目常规架构示例图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ced89ebeab994cb5a74d0b57e16060c4~tplv-k3u1fbpfcp-zoom-1.image)