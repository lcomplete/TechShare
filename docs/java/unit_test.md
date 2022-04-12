---
layout: post
title: "[Java] 高级工程师的自我修养之单元测试（一）：DAO 层测试"
date: 2021-07-08T05:44:08+08:00
comments: true
tags: ["Java"]
categories: ["技术"]
---

# [Java 开发实战] 高级工程师的自我修养之单元测试（一）：DAO 层测试

## 开篇导读

对于程序员而言，单元测试是非常重要的一项技能，但在许多实际的项目开发过程中，单元测试却往往被忽略，这导致部分人也忽视其重要性，因此在开篇请允许笔者先唠叨几句关于它的重要性，若读者朋友对这部分内容已经了然于胸可直接前往 `DAO 层测试` 部分。

关于编写单元测试的一些基础知识，我在这篇 [Java 单元测试](https://github.com/lcomplete/TechShare/blob/master/docs/java/java%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95.pptx) PPT 中有过介绍，本系列文章不再赘述，而旨在讲解在企业级项目中该如何编写单元测试。

这个系列计划编写三篇文章，DAO 层测试、业务逻辑层测试、高效编写测试。

### 为什么单元测试很重要？

为什么说判断一个程序员是中级还是高级，看看 TA 会不会写单元测试就知道了，因为写单元测试不仅是写测试代码，往往还需要重新审视产品代码本身，必要的时候需要进行重构才能继续编写测试，在编写单元测试代码的过程中时刻都能体会到高内聚、低耦合的编程思想。写单元测试，其实是为对象模型添加了一个特殊用户，这个过程也迫使我们把对象模型设计的更加易用，总的说来编写单元测试可以加深对高内聚、低耦合、面向接口编程、依赖注入、API 设计、单一职责等`编程思想的掌握`，所以单元测试是如此重要，以至于可以很好地用来判断一个工程师的技术水平，或者至少用来判断其编程思想。

### 为什么单元测试难以实施?

很多小企业都难以实施单元测试，主要原因有：编写单元测试需要花费不少时间、单元测试并非想象中那样容易编写、开发人员对单元测试的理解不够全面等。还有一些更糟糕的情况，比如代码本身完成度不够，CRUD 功能背后缺少数据验证、服务端业务逻辑验证，系统本身就不堪一击，若要编写单元测试，需要做大量的代码改造工作，这种情况我愿称之为单元测试领域的「`戴维斯双杀`」效应——因为代码本身完成度低，原本完善的代码应当具有一定的复杂度，但在开发时却实现的极为简单，只满足了表面的功能，开发人员认为过于简单的代码没有编写单元测试的必要，导致产品代码质量下滑、对单元测试的理解扭曲的双重负循环。

单元测试难以实施，总的可以归结为开发能力和产品质量文化的原因，对于想长期发展的企业来说，无疑是会注重这两个方面，因此大多数企业也在不断克服这些问题，提升工程师的能力，加强编写单元测试的质量和效率，同时还要树立正确的产品质量观念，要知道即使是付出了额外的编写单元测试的时间，总的时间成本也并不会增加，因为「`质量是免费的`」，产品质量提升了，用于排查问题、修复 bug 的时间自然变少了。

在企业中注入产品质量文化，提升开发人员编写单元测试的能力，只要做到这些，实施单元测试也没有想象中困难。

## 单元测试基本原则

首先要明确单元测试的一些基本原则，优秀的单元测试具有以下特点：

- 自动的、可重复的
- 容易实现
- 一旦写好，将来都可使用
- 任何人都可运行
- 单击一个按钮就可运行
- 可以快速地运行

单元测试并非是随手写来验证功能的临时代码，而是需要符合 AIR 原则，所以编写起来是需要一定的功力的。

关于 AIR 原则在阿里的 Java 规范中有提及，其他相关的规范也值得学习，我在这里引用方便读者朋友查看，完整的规范可在 Github 中查看，地址：[p3c 单元测试](https://github.com/alibaba/p3c/blob/master/p3c-gitbook/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95.md)。

1. 【强制】好的单元测试必须遵守AIR原则。 
<br><span style="color:orange">说明</span>：单元测试在线上运行时，感觉像空气（AIR）一样并不存在，但在测试质量的保障上，却是非常关键的。好的单元测试宏观上来说，具有自动化、独立性、可重复执行的特点。 
 - A：Automatic（自动化） 
 - I：Independent（独立性） 
 - R：Repeatable（可重复） 
2. 【强制】单元测试应该是全自动执行的，并且非交互式的。测试用例通常是被定期执行的，执行过程必须完全自动化才有意义。输出结果需要人工检查的测试不是一个好的单元测试。单元测试中不准使用System.out来进行人肉验证，必须使用assert来验证。 
3. 【强制】保持单元测试的独立性。为了保证单元测试稳定可靠且便于维护，单元测试用例之间决不能互相调用，也不能依赖执行的先后次序。 <br><span style="color:red">反例</span>：method2需要依赖method1的执行，将执行结果作为method2的输入。 
4. 【强制】单元测试是可以重复执行的，不能受到外界环境的影响。 
<br><span style="color:orange">说明</span>：单元测试通常会被放到持续集成中，每次有代码check in时单元测试都会被执行。如果单测对外部环境（网络、服务、中间件等）有依赖，容易导致持续集成机制的不可用。 <br><span style="color:green">正例</span>：为了不受外界环境影响，要求设计代码时就把SUT的依赖改成注入，在测试时用spring 这样的DI框架注入一个本地（内存）实现或者Mock实现。 
5. 【强制】对于单元测试，要保证测试粒度足够小，有助于精确定位问题。单测粒度至多是类级别，一般是方法级别。 
<br><span style="color:orange">说明</span>：只有测试粒度小才能在出错时尽快定位到出错位置。单测不负责检查跨类或者跨系统的交互逻辑，那是集成测试的领域。 
6. 【强制】核心业务、核心应用、核心模块的增量代码确保单元测试通过。 
<br><span style="color:orange">说明</span>：新增代码及时补充单元测试，如果新增代码影响了原有单元测试，请及时修正。 

明确这些基本规范后，我们来开始动手编写单元测试。

完善的单元测试，应该对项目的每一层级代码都进行测试，本篇文章我们从 DAO 层开始。

## DAO 层单元测试

DAO 层由于依赖数据库，是比较难以测试的，这个章节将为你提供一些 DAO 层的测试方法。

以 MySQL 数据库为例，在运行 DAO 层的单元测试时，我们不能依赖外部的数据库，因为这会破坏 AIR 原则中的 I（独立性） 原则，要解除依赖有几种方式：

1. 使用嵌入式数据库：h2、moby 等。
2. 使用 Testcontainers 在 docker 中创建专为单元测试使用的数据库，执行完即销毁。

### 使用嵌入式数据库

我们先看第一种方式，以 h2 为例。

首先，在单元测试的应用配置 `application.yml` 中修改数据源为 h2。

```yml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:ufo
```

如果我们使用的是 JPA 进行数据持久化，配置这些即可，JPA 会在 h2 数据库中自动创建数据库。

若使用的是 MyBatis，则需要指定数据库的架构，增加以下配置，`data` 为数据初始化脚本。

```yml
spring:
  datasource:
    schema: classpath:db/schema-h2.sql
    data: classpath:db/data-h2.sql
```

假如我们的项目非常小，用这种方式就足够，但当数据库 `schema` 越来越庞大时，维护 sql 将变成一项耗时的工作，那么我们需要引入数据库的版本控制机制。

### 数据库版本控制

数据库版本控制可以使用 `flyway` 或者 `liquibase`，关于 liquibase 的用法，可以参考我写的 [5 分钟搞定 liquibase 数据库版本控制](https://lcomplete.github.io/TechShare/docs/java/liquibase.html) 。

以 liquibase 为例，引入后，我们在 `application.yml` 进行如下类似修改，单元测试运行时将首先通过 liquibase 初始化数据库。

```yml
spring:
  liquibase:
    change-log: classpath:liquibase/master.xml
    contexts: unit_test
    enabled: true
```

注意，此时我们编写的版本控制 sql 是为 MySQL 数据库准备的，若直接用于 h2 数据库，大概率会出现兼容性问题，此时我们有以下几个选择：

1. 将用于 MySQL 的 sql 脚本稍作修改，用于 h2 数据库初始化。
2. 使用 liquibase 的 xml 语法来定义数据库结构，减少兼容性问题。
3. 改用 `Testcontainers` 辅助测试。

前面两个选择，都需要增加不小的工作量，我们来看看使用 Testcontainers 会如何。

### 使用 Testcontainers

[Testcontainers](https://github.com/testcontainers/testcontainers-java)  是一个支持 `JUnit` 测试的开源库，可以利用 `Docker` 容器获得 `即用即丢` 数据库的能力。

我们跳过了别的选项，直接选择 Testcontainers，因为使用嵌入式数据库还有一些缺点，比如 DAO 层使用了特定数据库才有的语法，那么单元测试根本都无法通过，这在企业级项目中几乎是无法避免的，除非是特别独立单一的服务。

DAO 层单元测试不应该依赖外部数据库，但在执行时也应当使用类生产的环境，这样的测试结果才更准确的。

使用 Testcontainers 并 `不符合 AIR 原则`，因为其依赖了 Docker 环境，如果在一台没有 Docker 环境的机器上运行，那么测试就会失败，另外它也不符合可以快速地运行这一点，毕竟初始化 Docker 容器是需要一定的时间的。

我们看下如何在代码中使用 Testcontainers 。

首先定义一个抽象的测试基类，具体的单元测试继承自该类，以下写法可以确保数据库只初始化一次。

```java
@SpringBootTest
@ContextConfiguration(initializers = AbstractUnitTest.DockerMySQLDataSourceInitializer.class)
public abstract class AbstractUnitTest {

    private static final MySQLContainer<?> mysql;
    
    static {
       mysql = new MySQLContainer<>("mysql:8.0.11")
               .withDatabaseName("dbname");
       mysql.start();
    }

    public static class DockerMySQLDataSourceInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        @Override
        public void initialize(@NotNull ConfigurableApplicationContext applicationContext) {
            TestPropertySourceUtils.addInlinedPropertiesToEnvironment(
                   applicationContext,
                   "spring.datasource.url=" + mysql.getJdbcUrl(),
                   "spring.datasource.username=" + mysql.getUsername(),
                   "spring.datasource.password=" + mysql.getPassword(),
                   "spring.datasource.driver-class-name=" + mysql.getDriverClassName()
            );
        }

    }
}
```

准备就绪后，在单元测试执行时将首先创建 Docker 容器，然后运行 liquibase 初始化数据库。

来看一个简单的 DAO 层测试的例子。

```java
@SpringBootTest
@RunWith(SpringRunner.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NavSiteRepositoryTest extends AbstractUnitTest {

    @Autowired
    NavSiteRepository navSiteRepository;

    @BeforeClass
    void setUp() {
        NavSite navSite = new NavSite();
        navSite.setSiteName("");
        navSite.setSiteUrl("");
        navSite.setIconPath("");
        navSite.setSiteType(0);
        navSite.setSort(0);
        navSite.setCreateTime(new Date());
        navSite.setUpdateTime(new Date());
        navSiteRepository.save(navSite);
    }

    @Test
    void findBySiteType_UnknownSiteType_ZeroSize() {
        List<NavSite> navSites = navSiteRepository.findBySiteType(0);
        assertThat(navSites.size()).isEqualTo(1);
    }

    @Test
    void findBySiteType() {
        List<NavSite> navSites = navSiteRepository.findBySiteType(0);
        assertThat(navSites.size()).isEqualTo(1);
    }
}
```

至此，我们就实现了 `JUnit5 + Testcontainers + Liquibase` 进行 DAO 层测试。

### 方案取舍

应该在使用嵌入式数据库、Docker和专用测试数据库之间进行取舍，目前的持续集成环境中基本都有 Docker 环境，相信 Testcontainers 也会越来越流行，就算不用在单元测试中，在 `集成测试` 中进行使用也是非常有用的一大利器。

总结如下：

1. 在简单的项目中使用 h2 或其他嵌入式数据库进行 DAO 层测试。
2. 在特定的场景下选择 Testcontainers，可以设法令其符合 AIR 原则并能快速运行，比如在 liquibase 项目中用于测试版本控制 sql 就是个不错的选择。
3. 集成测试中可尽管选用 Testcontainers 。

## 写在最后

DAO 层的测试难点主要在解除数据库这一外部依赖上，DAO 层的业务逻辑代码较少，因此单元测试编写起来也比较简单，而复杂的 Service 层代码则不一样，容易出现单元测试难以编写的情况，这时需要优化代码设计，这部分内容我们在下一篇 `业务逻辑层测试` 中详述。