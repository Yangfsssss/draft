"use strict";
/** Chapter21：错误处理与调试 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//21.1 浏览器错误报告----------------------------------------------------------------------
//21.1.1 桌面控制台
//21.1.2 移动控制台
//21.2 错误处理-----------------------------------------------------------------------------
//当网页中的 JavaScript 脚本发生错误时，不同浏览器的处理方式不同。不过浏览器
//处理 JavaScript 报告错误的默认方式对用户并不友好。最好的情况是用户自己不知道发生了什么，然后
//再重试；最坏的情况是用户感觉特别厌烦，于是永远不回来了。有一个良好的错误处理策略可以让用户
//知道到底发生了什么。为此，必须理解各种捕获和处理 JavaScript 错误的方式。
//21.2.1 try/catch 语句
//任何可能出错的代码都应该放到 try 块中，而处理错误的代码则放在 catch 块中
//1. finally 子句
//try/catch 语句中可选的 finally 子句始终运行。
//try 或catch 块无法阻止 finally 块执行，包括 return 语句。
//即try/catch中的return语句会延后至finally子句执行完毕之后再执行
Function.prototype.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log(this.apply(void 0, args));
};
function testFinally() {
    var value = 0;
    try {
        value += 1;
        return value;
    }
    catch (e) {
        value += 2;
        return value;
    }
    finally {
        value += 3;
        //当finally子句中存在return表达式时，try/catch子句中的return表达式会被忽略
        // return value;
        console.log('value', value);
    }
}
// testFinally.log();
//2. 错误类型
//代码执行过程中会发生各种类型的错误。每种类型都会对应一个错误发生时抛出的错误对象。
//ECMA-262 定义了以下 8 种错误类型：
// Error
// InternalError
// EvalError
// RangeError
// ReferenceError 常见，找不到对象时发生。
// SyntaxError
// TypeError 常见，主要发生在变量不是预期类型，或者访问不存在的方法时。
// URIError
//Error 是基类型，其他错误类型继承该类型。因此，所有错误类型都共享相同的属性（所有错误对
//象上的方法都是这个默认类型定义的方法）。浏览器很少会抛出 Error 类型的错误，该类型主要用于开
//发者抛出自定义错误。
//在catch 块中，可以使用 instanceof 操作符确定错误的类型
//3. try/catch 的用法
//try/catch 语句最好用在自己无法控制的错误上。例如，假设你的代码中使用了一个大型 JavaScript
//库的某个函数，而该函数可能会有意或由于出错而抛出错误。因为不能修改这个库的代码，所以为防止
//这个函数报告错误，就有必要通过 try/catch 语句把该函数调用包装起来，对可能的错误进行处理。
//如果你明确知道自己的代码会发生某种错误，那么就不适合使用 try/catch 语句。例如，如果给
//函数传入字符串而不是数值时就会失败，就应该检查该函数的参数类型并采取相应的操作。这种情况下，
//没有必要使用 try/catch 语句。
//21.2.2 抛出错误
//与 try/catch 语句对应的一个机制是 throw 操作符，用于在任何时候抛出自定义错误。throw 操
//作符必须有一个值，但值的类型不限。
//
//throw 12345;
//throw "Hello world!";
//throw true;
//throw { name: "JavaScript" };
//
//使用 throw 操作符时，代码立即停止执行，除非 try/catch 语句捕获了抛出的值。
//可以通过内置的错误类型来模拟浏览器错误。每种错误类型的构造函数都只接收一个参数，就是错
//误消息。浏览器会像处理自己生成的错误一样来处理这个自定义错误。
//换句话说，浏览器会像通常一样报告这个错误，最终显示这个自定义错误。
//
//此外，通过继承 Error（第 6 章介绍过继承）也可以创建自定义的错误类型。创建自定义错误类型
//时，需要提供 name 属性和 message 属性
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'CustomError';
        _this.message = 'message';
        return _this;
    }
    return CustomError;
}(Error));
// throw new CustomError('My message');
//继承 Error 的自定义错误类型会被浏览器当成其他内置错误类型。自定义错误类型有助于在捕获
//错误时更准确地区分错误。
//1. 何时抛出错误
//抛出自定义错误是解释函数为什么失败的有效方式。在出现已知函数无法正确执行的情况时就应该
//抛出错误。换句话说，浏览器会在给定条件下执行该函数时抛出错误。
//
//实际编写 JavaScript 代码时，应该仔细评估每个函数，以及可能导致它们失败的情形。良好的错误
//处理协议可以保证只会发生你自己抛出的错误。
//2. 抛出错误与 try/catch
//如果你在编写一个可能用于很多应用程序的 JavaScript 库，或者一个会在应用程序的很多地方用到
//的实用函数，那么应该认真考虑抛出带有详细信息的错误。然后捕获和处理错误交给应用程序就行了。
//
//至于抛出错误与捕获错误的区别，可以这样想：应该只在确切知道接下来该做什么的时候捕获错
//误。捕获错误的目的是阻止浏览器以其默认方式响应；抛出错误的目的是为错误提供有关其发生原因的
//说明。
//21.2.3 error 事件
//任何没有被 try/catch 语句处理的错误都会在 window 对象上触发 error 事件。
//在任何错误发生时，无论是否是浏览器生成的，都会触发 error 事件并执行这个事件处理程序。
//然后，浏览器的默认行为就会生效，像往常一样显示这条错误消息。可以返回 false 来阻止浏览器默
//认报告错误的行为，如下所示：
window.onerror = function (message, url, line) {
    console.log(message);
    return false;
};
//
//通过返回 false，这个函数实际上就变成了整个文档的 try/catch 语句，可以捕获所有未处理的
//运行时错误。这个事件处理程序应该是处理浏览器报告错误的最后一道防线。理想情况下，最好永远不
//要用到。适当使用 try/catch 语句意味着不会有错误到达浏览器这个层次，因此也就不会触发 error
//事件。
//图片也支持 error 事件。任何时候，如果图片 src 属性中的 URL 没有返回可识别的图片格式，就
//会触发 error 事件。这个事件遵循 DOM 格式，返回一个以图片为目标的 event 对象。下面是个例子：
var image = new Image();
image.addEventListener('load', function (event) {
    console.log('Image loaded!');
});
image.addEventListener('error', function (event) {
    console.log('Image not loaded!');
});
// image.src = 'doesNotExist.png';
//21.2.4 错误处理策略
//任何 JavaScript 错误都可能导致网页无法使用，所以理解这些错误会在什么情况下发生以及为什么会发
//生非常重要。绝大多数 Web 应用程序的用户不懂技术，在碰到页面出问题时通常会迷惑。为解决问题，他
//们可能会尝试刷新页面，也可能会直接放弃。作为开发者，应该非常清楚自己的代码在什么情况下会失败，
//以及失败会导致什么结果。另外，还要有一个系统跟踪这些问题。
//21.2.5 识别错误
//错误处理非常重要的部分是首先识别错误可能会在代码中的什么地方发生。
//通常，需要注意 3 类错误：
// 类型转换错误
// 数据类型错误
// 通信错误
//上面这几种错误会在特定情况下，在没有对值进行充分检测时发生。
//1. 静态代码分析器
//通过在代码构建流程中添加静态代码分析或代码检查器（linter），可以预先发现非常多的错误。
//常用的静态分析工具是 JSHint、JSLint、Google Closure 和 TypeScript。
//2. 类型转换错误
//类型转换错误的主要原因是使用了会自动改变某个值的数据类型的操作符或语言构造。使用等于
//（==）或不等于（!=）操作符，以及在 if、for 或 while 等流控制语句中使用非布尔值，经常会导致
//类型转换错误。
//类型转换错误也会发生在流控制语句中。比如，if 语句会自动把条件表达式转换为布尔值，然后
//再决定下一步的走向。在实践中，if 语句是问题比较多的。来看下面的例子：
function concat(str1, str2, str3) {
    var result = str1 + str2;
    //在流控制语句中使用非布尔值作为条件是很常见的错误来源。为避免这类错误，需要始终坚持使用
    //布尔值作为条件。这通常可以借助某种比较来实现。
    if (typeof str3 === 'string') {
        //恰当的比较
        result += str3;
    }
    // if (str3) {
    // }
    return result;
}
// concat.log('o', 'k', 1);
//3. 数据类型错误
//因为 JavaScript 是松散类型的，所以变量和函数参数都不能保证会使用正确的数据类型。开发者需
//要自己检查数据类型，确保不会发生错误。数据类型错误常发生在将意外值传给函数的时候。
//不安全的函数，任何非字符串值都会导致错误
function getQueryString(url) {
    //通过类型检查保证安全
    if (typeof url === 'string') {
        var pos = url.indexOf('?');
        if (pos > -1) {
            return url.substring(pos + 1);
        }
    }
    return '';
}
// 不安全的函数，非数组值可能导致错误
function reverseSort(values) {
    // if (values) { //不要，任何非数组值都会被转换为true
    // if(values !== null){ //不要，与null/undefined比较不足以保证适当的值
    // if(typeof values.sort === 'function'){ //不要，传入非参数数组时会报错
    //修复
    if (values instanceof Array) {
        values.sort();
        values.reverse();
    }
}
//一般来说，原始类型的值应该使用 typeof 检测，而对象值应该使用 instanceof 检测。根据函数
//的用法，不一定要检查每个参数的数据类型，但对外的任何 API 都应该做类型检查以保证正确执行。
//4. 通信错误
//随着 Ajax 编程的出现，Web 应用程序在运行期间动态加载数据和功能成为常见的情形。JavaScript
//和服务器之间的通信也会出现错误。
//第一种错误是 URL 格式或发送数据的格式不正确。通常，在把数据发送到服务器之前没有用
//encodeURIComponent()编码，会导致这种错误。
//对于查询字符串，应该都要通过 encodeURIComponent()编码。
//21.2.6 区分重大与非重大错误
//任何错误处理策略中一个非常重要的方面就是确定某个错误是否为重大错误。具有以下一个或多个
//特性的错误属于非重大错误：
// 不会影响用户的主要任务；
// 只会影响页面中某个部分；
// 可以恢复；
// 重复操作可能成功。
//
//另一方面，重大错误具备如下特性：
// 应用程序绝对无法继续运行；
// 错误严重影响了用户的主要目标；
// 会导致其他错误发生。
//
//当重大错误发生时，应该立即发送消息让用户知晓自己不能再继续使用应用程序了。如果必须刷新
//页面才能恢复应用程序，那就应该明确告知用户，并提供一个自动刷新页面的按钮。
function initMods(mods) {
    for (var _i = 0, mods_1 = mods; _i < mods_1.length; _i++) {
        var mod = mods_1[_i];
        try {
            mod.init(); // 可能的重大错误
        }
        catch (ex) {
            //在这里处理错误
            logError('nonfatal', 'Module init failed: ${ex.message}');
        }
    }
}
//通过在 for 循环中加入 try/catch 语句，模块初始化过程中的任何错误都不会影响其他模块初始
//化。如果代码中有错误发生，则可以单独处理，并不会影响用户体验。
//21.2.7 把错误记录到服务器中
function logError(sev, msg) {
    var img = new Image(), encodedSev = encodeURIComponent(sev), encodedMsg = encodeURIComponent(msg);
    img.src = 'log.php?sev=${encodedSev}&msg=${encodedMsg}';
}
//记录到服务器的错误消息应该包含尽量多的上下文信息，以便找出错误的确切原因。
//21.3 调试技术------------------------------------------------------------------------------------------
//21.3.1 把消息记录到控制台：console
//21.3.2 理解控制台运行时
//21.3.3 使用 JavaScript调试器：debugger
//21.3.4 在页面中打印消息
//21.3.5 补充控制台方法：重写console.log
//21.3.6 抛出错误
//
//自定义用于抛出错误的assert函数
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
//21.4 旧版 IE 的常见错误------------------------------------------------------------------------------
//略
//21.5 小结-----------------------------------------------------------------------------------------------
//对于今天复杂的 Web 应用程序而言，JavaScript 中的错误处理十分重要。未能预测什么时候会发生
//错误以及如何从错误中恢复，会导致糟糕的用户体验，甚至造成用户流失。大多数浏览器默认不向用户
//报告 JavaScript 错误，因此在开发和调试时需要自己实现错误报告。不过在生产环境中，不应该以这种
//方式报告错误。
//
//下列方法可用于阻止浏览器对 JavaScript 错误作出反应。
// 使用 try/catch 语句，可以通过更合适的方式对错误做出处理，避免浏览器处理。
// 定义 window.onerror 事件处理程序，所有没有通过 try/catch 处理的错误都会被该事件处理
//程序接收到（仅限 IE、Firefox 和 Chrome）。
//
//开发 Web 应用程序时，应该认真考虑可能发生的错误，以及如何处理这些错误。
// 首先，应该分清哪些算重大错误，哪些不算重大错误。
// 然后，要通过分析代码预测很可能发生哪些错误。由于以下因素，JavaScript 中经常出现错误：
// 类型转换；
// 数据类型检测不足；
// 向服务器发送错误数据或从服务器接收到错误数据。
//
//IE、Firefox、Chrome、Opera 和 Safari 都有 JavaScript 调试器，有的内置在浏览器中，有的是作为扩
//展，需另行下载。所有调试器都能够设置断点、控制代码执行和在运行时检查变量值。
