# [Java 开发实战] 你还在统一返回 ApiResultBean 吗？✋ duck 不必，快来看 API 错误处理的最佳实践 ✔️

## 为什么写这篇文章？

相信不少 Java 开发都在项目中使用过类似 `ApiResult` 这样的对象来包装 Api 返回类型，这相比什么都不包装有一定的好处，但这真的就是最好的做法吗？

关于封装 ResultBean 对象，晓风轻在他的 [程序员你为什么这么累](https://xwjie.github.io/rule/controller.html) 系列文章中有过不错的分享，但统一封装 ResultBean 实际上也是一种重复工作，秉承 `DRY` 的理念，还有必要对其继续优化。

统一返回 ApiResult 还不是最佳实践，必须不断思考优化，就像 React 所提倡的 `Rethinking Best Practices` 。

## ApiResult 现状

我们先看一个常见的 ApiResult 对象，代码如下：

```java
@Data
public class ApiResult<T> implements Serializable {
    private int code;
    private String message;
    private T data;
}
```

好处：客户端可以使用统一的处理方式。

存在的问题：

1. 在统一返回 ApiResult 的情况下，即使是正常返回，也会带上 code、message 属性，属于冗余。
2. `Controller` 层代码存在重复，返回对象重复定义、包装调用编写重复。

```java
public ApiResult<List<Data>> demo() {
    return ApiResult.ok(getList());
}
```

当 API 越来越多时，这些存在的问题会被被放大，如何解决这些问题呢？请接着看。

## 使用 HTTP 状态码

有许多项目采用的方式是，在 API 调用成功时使用正常的数据模型，而在出现错误时，返回相应的 `HTTP 错误码` 和描述信息。我们看一段 `jhipster` 中的代码：

```java
@GetMapping("/authors/{id}")
public ResponseEntity<AuthorDTO> getAuthor(@PathVariable Long id) {
    Optional<AuthorDTO> authorDTO = authorService.findOne(id);
    return ResponseUtil.wrapOrNotFound(authorDTO);
}
```

主要 HTTP 状态码的含义：

- 1XX – Informational
- 2XX – Success
- 3XX – Redirection
- 4XX – Client Error
- 5XX – Server Error

采用 HTTP 状态码就不再需要统一返回 ApiResult ，但问题也随之而来，那就是 ApiResult 中定义的 `error code` 很难跟 HTTP 错误码一一对应，光有 HTTP 错误码和描述信息是不够的，还需要定义专门的错误模型。

## API 错误模型

如何定义一个好的 API 错误模型，这需要根据 `业务的复杂程度` 来定，我们先来看看几个 `Big Company` 都是怎么做的。

先看 `twitter` 的，其中省略了无关的 HTTP 输出信息。

```json
HTTP/1.1 400 Bad Request

{"errors":[{"code":215,"message":"Bad Authentication data."}]}
```

使用了错误码，并且错误模型是一个数组，意味着可能会返回多个错误。

再来看 `Facebook` 的 Graph API。

```json
HTTP/1.1 200

{
  "error": {
    "message": "Syntax error \"Field picture specified more than once. This is only possible before version 2.1\" at character 23: id,name,picture,picture",
    "type": "OAuthException",
    "code": 2500,
    "fbtrace_id": "xxxxxxxxxxx"
  }
}
```

注意，其返回的是统一的 200 状态码，错误模型中还包含 `异常类型` 和 `trace_id`，这两个属性有助于排查错误。

最后看看巨头微软 `Bing` 的错误模型。

```json
HTTP/1.1 200

{
  "SearchResponse": {
    "Version": "2.2",
    "Query": { "SearchTerms": "api error codes" },
    "Errors": [
      {
        "Code": 1001,
        "Message": "Required parameter is missing.",
        "Parameter": "SearchRequest.AppId",
        "HelpUrl": "http\u003a\u002f\u002fmsdn.microsoft.com\u002fen-us\u002flibrary\u002fdd251042.aspx"
      }
    ]
  }
}
```

其返回的也是 200 状态码，但可以看到它使用了类似 ApiResult 的包装方式，并且还包含了 `输入信息`、`输入参数` 和 `帮助链接` ，原来这就是 `大佬` 的做事方式吗？

果然 API 错误模型的设计，根据业务复杂程序的不同，实现起来也不太一样，这三个中，我们参考 `twitter 的 API 设计` 来看看在 `Spring` 项目中实现起来有哪些需要注意的，毕竟绝大多数项目的复杂度都达不到 FB 和 Bing 的程度。

## Spring API 错误模型实战

错误模型的定义是非常简单的，代码如下。

ErrorResponse.java

```java
@Data
public class ErrorResponse implements Serializable {
    private ErrorDetail error;
}
```

ErrorDetail.java

```java
@Data
public class ErrorDetail implements Serializable {
    private int code;
    private String message;
    private String type;
}
```

错误详情中增加了一个 `type` 属性，可以帮助更好地定位到异常。

在 `Controller` 层编写时至需要返回正常的数据模型，如 `List、VO、DTO` 之类。 

异常使用 `AOP` 的方式来处理。

编写一个 `ControllerAdvice` 类，。

```java
@ControllerAdvice
@ResponseBody
@Slf4j
public class CustomExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception exception) {
        return serverErrorResponse(ApiCode.SYSTEM_EXCEPTION, exception);
    }

    private ResponseEntity<ErrorResponse> serverErrorResponse(ApiCode apiCode, Exception exception) {
        String message = apiCode.getMessage();
        //服务端异常需要记录日志
        log.error(message, exception);
        //服务端异常使用api code中的message，避免敏感异常信息发送到客户端
        return new ResponseEntity<>(errorResponse(apiCode, ErrorMessageType.API_CODE, exception), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorResponse> requestErrorResponse(ApiCode apiCode, Exception exception) {
        String message = apiCode.getMessage();
        //客户端请求错误只记录debug日志
        if (log.isDebugEnabled()) {
            log.debug(message, exception);
        }
        //客户端异常使用异常中的message
        return new ResponseEntity<>(errorResponse(apiCode, ErrorMessageType.EXCEPTION, exception), HttpStatus.BAD_REQUEST);
    }

    private ErrorResponse errorResponse(ApiCode code, ErrorMessageType messageType, Exception exception) {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setCode(code.getCode());
        if (messageType.equals(ErrorMessageType.API_CODE) || StrUtil.isBlank(exception.getMessage())) {
            errorDetail.setMessage(code.getMessage());
        } else {
            errorDetail.setMessage(exception.getMessage());
        }
        errorDetail.setType(exception.getClass().getSimpleName());

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(errorDetail);
        return errorResponse;
    }

    @ExceptionHandler(value = RequestVerifyException.class)
    public ResponseEntity<ErrorResponse> requestVerifyExceptionHandler(RequestVerifyException e) {
        return requestErrorResponse(ApiCode.PARAMETER_EXCEPTION, e);
    }

}
```

上面的代码只放了两个 `ExceptionHandler` ，一个是针对 `请求验证错误` ，一个是针对 `未知服务器错误` ，分别对应的是 `400` 和 `500` 的 HTTP 状态码。需要对其他异常做专门处理，也仍然是使用以上的公共 `errorResponse` 方法，就看异常被定义为 `请求异常` 还是 `服务端异常` 。

至此，API 就能返回 `"漂亮"` 的错误模型了。

## 结束了吗？

先别走，还没结束呢，如果正常和错误情况下返回的数据模型不一样，那接口文档该如何定义呢？如果使用了 swagger ，那么我们需要添加针对 400 和 500 状态码的 `全局输出模型`。

在最新版本的 `springfox` 中要实现起来还是有点费劲的，来看部分代码。

```java
@Bean
public Docket createRestApi(TypeResolver typeResolver) {
    //附加错误模型
    Docket builder = new Docket(DocumentationType.SWAGGER_2)
            .host(swaggerProperties.getHost())
            .apiInfo(apiInfo(swaggerProperties))
            .additionalModels(typeResolver.resolve(ErrorResponse.class));

    //添加400错误码输出模型
    List<Response> responseMessages = new ArrayList<>();
    ResponseBuilder responseBuilder = new ResponseBuilder();
    responseBuilder.code("400").description("");
    if (!StringUtils.isEmpty(globalResponseMessageBody.getModelRef())) {
        responseBuilder.representation(MediaType.APPLICATION_JSON)
            .apply(rep -> rep.model(m -> m.referenceModel(
                re -> re.key(key->key.qualifiedModelName(new QualifiedModelName("com.package.api","ErrorResponse")))
            )));
    }
    responseMessages.add(responseBuilder.build());

    builder.useDefaultResponseMessages(false)
        .globalResponses(HttpMethod.GET, responseMessages)
        .globalResponses(HttpMethod.POST, responseMessages);

    return builder.select().build();
}
```

以上仅为部分代码，主要在于 `需要附加模型` 并指定输出模型，在实际项目中应该将模型信息放在配置当中，根据配置自动添加，关于 swagger 的自动配置，若读者朋友感兴趣，可以有机会专门写篇文章来讲解。

## 写在最后

在每个接口中返回统一的 ApiResult，笔者觉得是一件挺无聊的事情，写程序应该是一件能发挥创造力的事情。不断去思考最佳实践，学习优秀的设计，这件小小的事情，我们在工作当中几乎每天都会碰到，它是值得被改进的。
