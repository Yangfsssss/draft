/** Chapter5：JavaScript的函数式语言特性 */
//5.1 概述--------------------------------------------------------------
//■ 数学函数是集合A（称为定义域）中成员到集合B（称为值域）中成员的映射。
//■ 函数式程序设计就是对函数定义、函数应用加以说明，其运算过程即是对函数应用求值。
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
//函数式语言，就是通过连续表达式运算来求值的语言
//5.1.1 从代码风格说起--------------------------------------------------------------
//在一些语言中，连续运算被认为是不良的编程习惯。我们被要求运算出一个结果值，
//先放到中间变量中，然后用中间变量继续参与运算。
//其中的原因之一在于，这样容易形成良好的代码风格
//不同语言中所谓的“良好风格”看起来是没有统一标准的。
//或者说，语言风格的好坏并非判断“连续运算（或某种语言）”价值的重要依据。
//5.1.2 为什么常见的语言不赞同连续求值------------------------------------------------
//问题的根源并不在于“代码是否更加漂亮”，而是LISP—这种函数式语言—本身
//的某些特性需要“这样一种”复杂的代码风格，如同冯·诺依曼体系需要“那样一种”风格一样。
//5.1.3 函数式语言的渊源----------------------------------------------------------------
//大多数人都在使用基于冯·诺依曼体系的命令式语言，但为了获得特别的计算能力或者编程特性，
//这些语言在逻辑层实现了一种适用于函数式语言范型的环境。这样的现实状况，
//一方面产生了类似JavaScript这样的多范型语言，另一方面则产生了类似.NET或JVM的、
//能够进行某些函数式运算的虚拟机环境
//5.2 从运算式语言到函数式语言------------------------------------------------------------------
//连续运算是函数式语言的基本语言特征之一。其基本运算模型就是：
//■ 运算（表达式）以产生结果。
//■ 结果（值）用于更进一步的运算。
//至于从LISP开始引用的“函数”这个概念，其实在演算过程中只有“结果（值）”的价值：
//它是一组运算的封装，产生的效果是返回一个可供后续运算的值。
//所以函数式语言中所谓的“函数”并不是真正的精髓，真正的精髓在于“运算”，
//而函数只是封装“运算”的一种手段。
//到了这里，如果假设系统的结果只是一个值，那么必然可以通过一系列连续的运算来得到这个值。
//而这也就是一个机器系统“可计算”的基本假设。
//5.2.1 JavaScript中的几种连续运算-------------------------------------------------------------
//5.2.1.1 连续赋值
function test() {
    var a, b, c, d;
    a = b = c = d = 100;
}
//5.2.1.2 三元表达式的连用
//三元表达式是推荐连用的，这样能够充分发挥连续运算的特性。不过在连用三元表达式时，要注意代码的清晰与规整
//(switch)
//“运算”产生值，“值”参与运算—这个逻辑是三元表达式能够连续运算的关键，而不仅仅是语法表面上的一种代码风格。
//5.2.1.3 连续逻辑运算
//连续逻辑运算也常用于弥补三元表达式在语义上的不足
//5.2.1.4 逗号运算符与连续运算
//逗号运算符表明从左至右地计算两个操作数，并且返回右操作数的值。
//这意味着如果一个表达式连用多个逗号运算符（可称为连续表达式），那么它的最终结果是最右侧表达式的值。
//5.2.1.5 解构赋值
//5.2.1.6 函数与方法的调用
//对象的构造、函数与方法的调用等，本质上都是表达式运算，而非语句。
//5.2.2 如何消灭语句------------------------------------------------------------------------------
//表达式总是在进行顺序逻辑的运算（从左至右，或者从右至左），
//但它是否只具有“顺序”这样一个逻辑呢？又或者说，既然函数式语言是以“连续运算”为核心特性的，
//那么它是否能用“表达式运算”来完成全部的程序逻辑呢？
//如果要通过“连续运算”来实现足够复杂的系统，那么我们需要：
//1.消灭“语句”这个语法元素[插图]，只剩下表达式；
//2.通过“表达式”来陈述三种基本逻辑；
//3.运算。
//5.2.2.1 通过表达式消灭分支语句
//单个分支的if条件语句可以被转换成布尔表达式。
//而if条件语句（单个或多个分支）也总是可以被转换为三元表达式。
//switch语句与if语句连用等效。而后者可以被三元表达式连用替代。
//5.2.2.2 通过函数递归消灭循环语句
//循环语句可以通过函数递归来模拟，这一点也是经过证实的。
function test1() {
    var loop = 100;
    var i = loop;
    do {
        console.log(0);
        i--;
    } while (i > 0);
    function foo(i) {
        console.log(1);
        if (--i > 0) {
            foo(i);
        }
    }
    foo(loop);
}
// test1();
//5.2.2.3 其他可以被消灭的语句
//5.2.3 运算式语言------------------------------------------------------------------------------
//5.2.3.1 运算的实质是值运算
//由此可见，所有不确定结果的运算都是用于“取得一个操作数”的，这通常是为了下一个
//运算而准备数据（包括暂存为变量等）。而除此之外的其他操作（表5-1中列出的）
//则都是“运算以产生值类型的结果”。因此我们可以推论，运算的目的就是“产生值”。
//更进一步地，由于“所有逻辑结构的语句都可以被消灭”，所以：
//■ 系统的结果必然是值，并且可以通过一系列的运算来得到这一结果。
//我们知道，计算机其实只能表达值数据。任何复杂的现象（例如界面、动画或模拟现实），
//在运算系统看来其实只是某种输出设备对数值的理解而已；运算系统只需要得到这些数值，
//至于如何展示，则是另一个物理系统（或其他运算系统）来负责的事情。
//所以运算的实质其实是值的运算。至于像“指针”“对象”这样抽象的结构，从运算系统来看，
//其实只是定位到“值”以进行后续运算的工具而已—换言之，它们是不参与“求值”运算的。
//5.2.3.2 运算式语言的应用
//5.2.4 重新认识函数------------------------------------------------------------------------------
//5.2.4.1 函数是对运算式语言的补充
function test2() {
    function chars() {
        var result = [];
        var c = 'a'.charCodeAt(0);
        console.log('c', c);
        for (var i = 0; i < 26; i++) {
            result.push(c + i);
        }
        console.log('result', result);
        return String.fromCharCode(...result);
    }
    var str = `the string is "${chars()}"`;
    console.log(str);
    var str2 = `the strings is :\n${(function () {
        return new Array(3).fill(chars());
    })().join('\n')}`;
    console.log(str2);
}
// test2();
//5.2.4.2 函数是代码的组织形式
//我们当然可以使用连续的表达式运算来完成足够复杂的系统，这一点在前面已经论证过了。
//但是如果真的这样去做，那么与使用一条无限长的穿孔纸带来完成复杂系统并没有区别—在代码
//（连续的表达式）达到某种长度之后，将难于阅读和调试，
//最终系统将因为复杂性（而不是可计算性）而崩溃。
//在大型系统中，“良好的代码组织”也是降低复杂性的重要手段。
//对于运算式语言来说，使用函数来封装表达式是实现良好的代码组织的有效途径之一。
//从语义上来讲，一个函数调用过程其实只相当于表达式运算中的一个求值操作：
function test3() {
    //表达式一
    var a;
    a = v1 + v2 * v3 - v4;
    //示例1：
    a =
        v1 +
            (function () {
                return v2 * v3 - v4;
            })();
    //示例2：
    a = v1 + (v2 * v3 - v4);
    //示例3：
    function calc() {
        return v2 * v3 - v4;
    }
    a = v1 + calc();
}
//在运算式语言中，函数不但是削减循环等语句的一个必要补充，也是一种削减代码复杂性的组织形式。
//5.2.4.3 当运算符等义于某个函数时
//在一个JavaScript表达式到一行纯粹的函数式语言代码的变化过程中，我们只做出了一个假设：
//■ 如果运算符等义于某个函数。
//5.2.5 函数式语言------------------------------------------------------------------------------
//整个编程模式—函数式语言范型—被简化成函数与其参数（function and arguments）的运算，
//而在这个模式上的连续运算就构成了系统—整个系统不再需要第二种编程范型或冗余规则（例如赋值等）。
//并不是一种语言支持函数，这种语言就可以叫作“函数式语言”。函数式语言中的“函数（function）”除了能被调用之外，
//还具有其他三个方法的性质：是操作数、可保存数据，以及无副作用。
//JavaScript中的函数是完全满足这三个特性的，这才是它能够被称作“函数式语言”的真正原因。
//5.2.5.1 “函数”===“Lambda”
//函数===Lambda
//5.2.5.2 函数是操作数
//当JavaScript中的函数作为参数时，也是传递引用的，
//但并没有地址概念。由于彻底地杜绝了地址运算，也就没有了上述的隐患。
//由于参数是“函数调用”运算的操作数，因此当函数也是参数时它就只有操作数的含义了
//（而不再有地址含义），与普通参数并没有什么特别不同。
//5.2.5.3 在函数内保存数据
//在命令式语言中，函数内部的私有变量（局部变量）通常是不能保存的。
//局部变量将在执行期间临时分配在栈上，执行结束后就被释放了。
//在JavaScript的函数中，函数内的私有变量可以被修改，而且当再次“进入”该函数内部时，
//这个被修改的状态仍将持续。
function test4() {
    function MyFunc() {
        //初值
        var value = 100;
        //内部的函数，用于访问value
        function setValue(v) {
            value = v;
        }
        function getValue() {
            return value;
        }
        //将内部函数公布到全局
        return [setValue, getValue];
    }
    var [setter, getter] = MyFunc();
    console.log(getter());
    setter(300);
    console.log(getter());
}
//在函数内保持数据的特性被称为“闭包（Closure）”，
//闭包是函数执行时的现场，以及在执行后可观察、可重入的历史。
// test4();
//5.2.5.4 函数内的运算对函数外无副作用
//运算对函数外无副作用，是函数式语言应当达到的一种特性。
//然而在JavaScript中，这项特性只能通过开发人员的编程习惯来保证。
//所谓运算对函数外无副作用，其含义在于：
//■ 函数使用入口参数进行运算，而不修改它（作为值参数而不是变量参数使用）。
//■ 在运算过程中不会修改函数外部的其他数据的值（例如全局变量）。
//■ 运算结束后通过函数返回向外部系统的传值。
//如果把“不在函数内修改对象成员”这个原则，与面向对象系统的属性存取器结合起来，
//那么系统的稳定性还能够进一步增强。在这种情况下，对象向外部系统展现的都是接口方法
//（包括读写器方法），从而有效地避免了外部系统“直接修改对象成员”。
//由此可见，函数式中所要求的“（函数）无副作用”特性，其实可以与面向对象系统很好地结合起来。
//二者并不矛盾，在编程习惯上也并非格格不入。
//5.2.5.5 函数式的特性集
//我们也知道，不能通过重新设计JavaScript来使得它表现出这种“语言的纯粹性”。
//因此这里提炼并阐述一个最小特性集，以便在后文更好地讨论这些特性。这样的一个特性集是：
//■ 在函数外消除语句，只使用表达式和函数，通过连续求值来组织代码。
//◎ 在值概念上，函数可作为操作数参与表达式运算。
//◎ 在逻辑概念上，函数等义于表达式运算符，其参数是操作数，返回运算结果。
//■ 函数严格强调无副作用。
//这样的语言特性集的要点在于：关注运算，以及运算之间的关系。
//使用者必须认识到：连续运算是这个语言特性集的核心，而运算的结果就是我们想要的系统目标。
//5.3 JavaScript中的函数------------------------------------------------------------------------------
//我们在前面已经约定，在JavaScript中使用函数式风格编程，
//应优先使用表达式连续运算来组织代码，并且注意如下概念：
//1.函数可以作为操作数参与运算；
//2.函数可以等义于一个运算符。
//接下来我们将详细讨论JavaScript中的函数的种种特性。
//这些特性是JavaScript中的函数能够成为“函数语言中的函数（Lambda）”的根源
//—也或许会表现为某些不足。当然，反过来说，正是为了让JavaScript成为一种函数式语言，
//设计者才为function这种类型添加了这些语言特性。
//5.3.1 参数----------------------------------------------------------------------------------------------
//在JavaScript中，函数参数值只支持一种调用约定。它的特点表现为：
//■ 传入参数是从左至右求值的。
//■ 传入参数的值（或其引用）在函数内的重写是无副作用的。
//■ 传入参数的个数相对于函数声明时的形式参数是可变的。
//5.3.1.1 可变参数
//JavaScript并不检查函数声明与函数调用时的参数类型、个数的关系。
//弱类型检查是JavaScript的核心语言特性之一，它提供给开发人员自行检查
//与处理这类问题的手段和一个基本（且简单）的规则：
//■ 访问一个不存在的参数时会得到undefined值。无论这个参数是没有声明还是声明了没有传入，
//或者根本就是传入了undefined值的，这个规则是完全一样的。
//5.3.1.2 默认参数
//JavaScript允许在参数的任意位置使用默认参数，一旦该参数不传入或者传入undefined，
//那么该参数在函数内将使用默认值。
//5.3.1.3 剩余参数
//剩余参数（rest parameters）用于“一个标识符对应多个传入参数”的情况。
//它声明在参数列表尾部，以“收集”所有未被其他形式参数匹配的传入参数，
//##剩余参数与展开语法并没有直接的联系
//5.3.1.4 模板参数
//5.3.1.5 参数对象
//参数对象arguments只有一个简单的规则：用一个类数组的对象顺序包含全部传入参数。
//arguments是函数内部的代码可以访问的一个变量。除了箭头函数之外，
//所有函数在被调用时都自动创建一个对象用作该变量。属性arguments.length总是表明
//实际传入的参数个数。由于它是类数组的，所以可以使用绝大多数数组操作（包括模板赋值、
//展开语法和剩余参数等）。
//■ 默认情况下，形式参数与arguments中的传入值是绑定的，所以向该参数写值，
//会影响到arguments中的成员，反之亦然。
//■ 除了直接使用arguments[x]，其他方式得到的arguments成员都不会有上述（
//与形式参数绑定）效果。
function test5() {
    function foo(filename) {
        var [filename2, ...args] = arguments;
        //filename会影响arguments
        filename = 'new file name';
        console.log(arguments[0]);
        console.log(filename2);
        //arguments也会影响filename
        arguments[0] = filename2;
        console.log(filename);
        //使用filename2时没有影响
        filename2 = 'update again';
        console.log(arguments[0]);
        console.log(filename);
    }
    foo('test.txt');
}
// test5();
//todo
//5.3.1.6 非简单参数
//5.3.1.7 非惰性求值
//5.3.1.8 传值参数
//5.3.2 函数----------------------------------------------------------------------------------------------
//5.3.2.1 一般函数
//一般函数（Ordinary or normal function）是指用函数声明语法声明的具名函数或匿名函数，
//其中匿名函数不能直接作为在代码上下文中的“声明”，只能作为表达式操作数，亦称为普通函数。
function test6() {
    function foo() {
        function func() { }
        if (true) {
            //函数声明不是块级作用域
            function func2() { }
        }
        console.log(typeof foo, typeof func, typeof func2);
    }
    foo();
    console.log(typeof foo, typeof func, typeof func2);
    var f = function func2() {
        console.log(typeof func2);
    };
    f();
    console.log(typeof func2);
    var x = function () { };
    var y = function foo() { };
    console.log(x.name, y.name); //x,foo
}
// test6();
//具名函数与匿名函数的差异也仅仅体现在这两个方面：
//1.是否有一个可影响当前作用域的标识符；
//2.是否可以用作声明语句。
//除此之外，它们具有的函数性质是一样的
//5.3.2.2 生成器函数
//5.3.2.3 类
function test7() {
    const A = class {
        constructor(props) {
            this.value = props;
        }
    };
    const a = new A(3);
    console.log(a);
}
// test7();
//类可以是声明语句（具名的），也可以是表达式的操作数（具名的或匿名的）。
//当它是声明语句时，在标识符方面的特性与普通函数是一样的。
//当它是表达式时，在标识符方面的特性与匿名函数是一样的。
//5.3.2.4 方法
//“ES6风格的方法”又与经典方法有什么不同呢？主要体现在三个方面：
//■ 方法不能作为构造器使用。
//■ 方法没有prototype属性（生成器作为方法时例外）。
//■ 方法不能具名。
//“不能具名”则是语法限制。在所有方法声明中，方法名既不是上下文中的标识符，也不在方法（函数体）内部可见
//方法的最后一项特性，是在它的函数体内部可以使用super这个关键字，
//这包括“super调用（Super call）”和“super引用（Super reference）”两种形式。
//5.3.2.5 箭头函数
//箭头函数除了在语法形式上“更简单”之外，主要的特点是：
//1.它永远不持有自己的this引用；
//出于这一点限制，apply/call调用也无法传入thisArg，
//且bind()方法也无法将新的thisArg关联给它，尽管bind()方法会返回一个有效的绑定函数。
//2.不会有参数对象（arguments）来代表传入参数。
//5.3.2.6 绑定函数
//绑定函数（Bound function）是一个计算值，通过目标函数的bind()方法返回结果来得到
//绑定函数与调用目标函数的apply/call方法在效果上并没有区别，因为它们用类似的逻辑处理thisArg和arg1...n这些参数。
//但是绑定函数是一个真实的函数，可以被引用、暂存或放到闭包（上下文）中。
//此外，绑定函数也确实有自己的一些特殊性质，包括：
//■ 内部原型被置为与targetFunc的原型一致。
//■ 没有自有的prototype属性。
//这意味着在boundFunc上调用targetFunc的那些继承自原型的方法是安全的，但却无法调用targetFunc的自有方法或访问自有属性。
//同样的原因（不能访问targetFunc的自有属性），绑定函数无法在类声明中替代目标函数用作父类。
//其根本原因在于JavaScript处理类声明以构建子类时，需要引用parentClass.prototype。
//对于绑定函数来说，这由两个方面的因素来决定：
//其一，如果targetFunc的原型是没有prototype属性的，那么boundFunc将不能用作父类（会导致执行期异常）；
//其二，如果targetFunc的原型有prototype属性，那么boundFunc尽管能用作父类，却不能替代targetFunc。
//绑定函数没有自有的prototype属性，因此它可以自由地添加这样一个属性（并且不会影响到目标函数）。
//然而这个动态添加的自有prototype属性在多数运算中都是无效的（它可能会产生一些预期之外的结果）。
//可以对绑定函数调用call/apply/bind方法。其中thisArg总是使用bind()方法传入的参数且不可替换，
//而新的、在调用绑定函数时传入的参数会追加在已绑定的arg1...n参数的后面。
//在绑定函数作为构造器使用时，arg1...n的使用规则不变，但thisArg值是没有意义的。
//因为绑定的thisArg并不会传递给构造过程，且在构造过程中的this引用总是由new运算符创建的。
//并且，在这种情况下，JavaScript除了会把构造过程中的对象原型设为目标函数的原型（targetFunc.prototype）之外，还会将new.target设为目标函数。
//这些对thisArg和arg1...n参数的处理，以及在构造过程中处理new.target等逻辑，都是绑定函数所固有的，因此它被视为一类有确定行为的、独立的函数。
function test8() {
    const targetFunc = function () { };
    targetFunc.method = () => console.log(3);
    // targetFunc.__proto__.method = console.log(5);
    Object.getPrototypeOf(targetFunc).method = () => console.log(5);
    const boundFunc = targetFunc.bind();
    boundFunc.method(); //5
    console.log(boundFunc.prototype);
    console.log(targetFunc.prototype);
    console.log(Object.getPrototypeOf(targetFunc).prototype);
}
// test8();
//5.3.2.7 代理函数
//如果使用Proxy()类创建一个函数的代理，那么这个代理对象也将具有函数的性质。
//出于JavaScript代理机制的设计，代理对象（Proxy object）自身既可能是定制过apply/construct行为的对象，
//也可能是没有使用陷阱而直接穿透到源对象。用户代码无法有效地检测这两种情况。
function test9() {
    class MyClass {
    }
    // MyClass();
    const p = new Proxy(MyClass, {
        apply() {
            console.log('Hi,apply!');
        },
    });
    p();
}
// test9();
//5.3.3 函数的数据性质---------------------------------------------------------------------------------------------------------------
//从JavaScript语言的数据视角来观察函数，它是一个引用类型的数据，并且更确切地说：它是一种对象。
//然而，如果从函数式的角度来观察函数的话，
//那么它就既是可执行的函数（operators），
//又是函数执行中被运算的数据（variables/data）。
//5.3.3.1 函数是第一型
//在JavaScript中的第一型，就是指7种基本类型：undefined、string、boolean、number、symbol、object和function。
//在基本类型的视角下，函数与对象是无关的，函数也并不是对象的一个子类类型。
//注意，事实上这7个基本类型都是第一型的，它们相互之间没有类型衍生关系。
//5.3.3.2 数据态的函数
//从函数式语言的角度来说，“所有的东西都是值”。
//这里的“值”是指“可操作的数据对象”与“操作数据对象所产生的结果”
//函数是第一型—可以作为值来使用、传递等，也正好可以阐释这一观念。
//因为函数是值，所以函数可以作为数据存储到变量中，也可声明它的字面量—数据的字面表达形式。
//因为函数是值，所以函数可以直接参与表达式运算。
//所有运算的最终目的都是“产生值类型的结果”，因此要么是在求值，要么是在准备求值的数据（例如访问对象属性）
//因为函数是值，所以它也可以作为其他函数的参数传入，或者作为结果值传出。
//5.3.3.3 类与对象态的函数
function test10() {
    function foo() { }
    //函数是对象
    console.log(foo instanceof Object); // true
    //所有函数都是Function()的实例
    console.log(foo instanceof Function); // true
    //Function()自身作为函数，也是它自己的实例
    console.log(Function instanceof Function); // true
    //Function自身作为对象，也是Object的实例
    console.log(Function instanceof Object); // true
    //由于Function也是构造器，因此它能作为其他类的父类（可以派生子类）
    class MyFunction extends Function {
    }
    //按照“面向对象系统”的概念，Function的子类（以及更深继承层次的子类）的实例也是函数，并且也当然还是对象：
    console.log(typeof new MyFunction()); //'function'
    console.log(new MyFunction() instanceof Function); // true
    console.log(new MyFunction() instanceof Object); // true
    //综上，Function()类及其子类都是对象态的函数。当然，基于它们的性质，它们也是构造器。
    //这样的子类在JavaScript原生的对象系统中还有三个，只不过它们都是隐藏的：
    //在语义上，GeneratorFunction()时是Function的子类，类似如下声明：
    class GeneratorFunction extends Function {
    }
    GeneratorFunction = function* () { }.constructor;
    //在语义上，AsyncFunction()时是Function的子类，类似如下声明：
    class AsyncFunction extends Function {
    }
    AsyncFunction = (() => __awaiter(this, void 0, void 0, function* () { })).constructor;
    //在语义上，AsyncGeneratorFunction()时是Function的子类，类似如下声明：
    class AsyncGeneratorFunction extends Function {
    }
    AsyncGeneratorFunction = function () { return __asyncGenerator(this, arguments, function* () { }); }.constructor;
}
// test10();
//然而函数在对象系统中的形态是有多种的，包括：函数对象、代理函数、类，等等。
//要理解对象态的函数，首先得理解Function()这个类。并且，得稍稍再提及一下“构造器”。
//构造器是JavaScript在早期约定的“类”的形式，如果一个函数能用来进行new运算，那么它就是构造器[插图]（例如，MyConstructor）。
//new运算总是会使用MyConstructor.prototype为原型创建一个对象实例，并接下来将MyConstructor作为初始化函数调用。
//在这个过程中：
//1.new运算创建了实例；
//2.MyConstructor在函数体中通过this引用对上述实例进行初始化。
//这也就是所谓“构造器”的全部秘密了。
//而Function()就是一个这样的构造器，它能构造实例，也有Function.prototype作为所有实例的原型。
//而且重要的是，它所构造出来的实例就是函数—对象态的函数。
//尽管并非所有的函数（作为实例）都是由Function()构造出来的，但是JavaScript将所有函数的原型链的顶端都设为Function.prototype，
//从而抹去了这一细节。在使用者看来，所有的函数都是Function()的实例；亦即是说，都是对象态的。
//类—Function()类及其子类—的实例仍然是函数，并且也仍然是对象态的（记住，我们目前讨论到的所有函数都是对象态的）。
//它们的特点包括：
//■ 是不具名的。
//■ 具有对象的全部特征，并以TheFunctionClass.prototype为原型。
//对于一般函数的类（Function）来说，在默认情况下：
//■ theFunctionInstance.prototype.constructor指向theFunctionInstance自身。
//除生成器函数和异步生成器函数之外，其他4种都没有o.prototype属性。
//而生成器和异步生成器通过产生的tor对象，被视为它的实例。
//但特殊之处在于，它们所有的原型属性o.prototype都不是自有的，而是直接继承自它们的类。
//最后一种类型是“异步函数（AsyncFunction）”，它既不支持x=new o这一语法，也没有o.prototype这一属性，因此也不具有上述这项性质。
//所有的这些函数都具有“对象的全部特征”。
//5.3.3.4 代理态的函数
//代理函数也可以称为一个函数的代理态。并且这个代理函数在撤销（revoke）之后仍然是一个函数，
//仍然处于代理态，只是由于不存在代理目标因而将无法实施行为。
function test11() {
    var { proxy: func, revoke } = Proxy.revocable(new Function('x', 'y', 'console.log("executed")'), {});
    //可以实施行为
    func();
    //撤销
    revoke();
    //仍然是函数
    console.log(typeof func);
    //无法实施行为
    try {
        func();
    }
    catch (e) {
        console.log('ERROR: ', e.message);
    }
}
// test11();
//函数与一般对象的区别在于，前者的内部结构中初始化了[[Call]]和[[Construct]]这两个内部方法（之一或全部）。
//之前讨论到的绑定函数，就是通过定制这两个内部方法来实现的：
//它重写这两个方法并使其分别指向一段特有的调用或构建逻辑（以处理暂存在内部槽中的thisArg和arg1...n参数）。
//而这里的代理类（Proxy）则重写了对象的全部13个内部方法，因此借助代理类也可以实现与绑定函数完全相同的功能。
//当然，需要在handlers上添加自己的陷阱，以处理[[Call]]和[[Construct]]行为。
//如果不借助创建代理时的handlers，那么没有有效的方法来分辨一般函数或代理函数，
//也无法侦测一个函数是在代理态，或是被代理的一般函数。
//唯一需要补充的是，handlers是可以动态维护的—不需要在new Proxy()时一次性地设置好全部陷阱，
//而这意味着代理态的函数可能没有静态的、确定的行为。
//5.3.4 函数与逻辑结构--------------------------------------------------------------------------------------------------------------------------
//我们说函数式语言的基本特征之一就是“连续运算”，这其中便隐含地陈述了一个事实：这些函数（运算）在逻辑结构上是顺序执行的。
//而分支与循环是顺序逻辑的两个特例。由于分支逻辑可以由三元运算和布尔运算符来替代，
//所以“如何通过函数实现循环逻辑”是唯一需要在函数式语言风格中被详细讨论的逻辑结构。
//在JavaScript语言中设计了一些机制作为在函数式语言风格下对循环逻辑的补充。
//这主要是指基于纯粹函数概念的递归和尾递归优化，以及面向特定“可迭代对象”的“迭代-生成器”机制
//（还包括在此基础上的for...of语句和Array迭代方法）。
//5.3.4.1 递归
//函数的递归就是函数调用自身。
//由于可以使用函数参数来传递循环逻辑所必需的控制变量，因此—在不引入新的语义/概念的前提下—递归是实现循环逻辑的首选。
//唯一需要解决的问题就是“在函数内识别函数自身”。
Number.prototype.log = function () {
    console.log(this.toString());
};
function test12() {
    //方法1：具名函数
    function foo() {
        return foo();
    }
    //方法2：匿名函数
    (function () {
        return arguments.callee();
    });
    //再后来JavaScript有了严格模式，而在严格模式中的arguments.callee属性不再可用，
    //于是“匿名函数该如何递归”的问题就再次出现了。
    //解决这一问题的思路之一是多声明一个可访问的标识符
    //方法3：使用const声明
    const fact = (x) => (x && x * fact(x - 1)) || 1;
    // console.log(fact(9));
    //但是在JavaScript中“声明标识符”是语句特性—你没有办法在一个表达式中为当前上下文声明出一个标识符。
    //同样的原因，你也没有办法在类或对象的方法声明中使用这一技巧。
    //并且，对于方法来说，在调用它的时候还存在一个关键问题：如何维护this引用。
    //进一步地讲，方法不能递归的根本限制也与此有关：直接递归函数时，是不能传递this引用的。
    //在这种情况下可以选择一个特殊的实现技巧：用属性存取器来取代方法声明。
    var obj = {
        get foo() {
            return 3;
        },
    };
    //在这个声明中，如果get foo()声明中返回的是一个函数，那么这个属性使用起来跟方法就并没有什么区别。
    // 考虑到我们需要维护this引用，因此在这里可以返回一个箭头函数来做递归
    //方法4：用属性来替代方法，并在递归中维护this引用
    var obj1 = {
        get fact() {
            const fact = (x) => (x && x * fact(x - 1)) || this.power || 1;
            console.log(this === obj1);
            return fact;
        },
    };
    obj1.power = 100;
    obj1.fact(9).log();
    //当然，既然我们事实上是使用箭头函数来维护this引用的，
    //那么如下声明方法的方式也是可行的（在原理上与声明属性并无不同）
    //方法5：直接声明方法，以及递归调用
    var obj2 = {
        fact(...args) {
            const fact = (x) => (x && x * fact(x - 1)) || this.power || 1;
            return fact(...args);
        },
    };
    obj2.fact(8).log();
    //最后讨论一下绑定函数。
    //因为绑定函数是执行结果，所以它自身没有函数体，也就不能“在绑定函数内调用自身”。
    //但是通过声明常量的方法，也是可以对绑定函数做安全的递归调用的。
}
// test12();
//5.3.4.2 函数作为构造器的递归
//构造过程整体是不应当被递归的，因为new运算会创建this，若这一过程递归则会创建不确定数量的实例。
//然而仅讨论构建实例之后的实例初始化，那么可以存在递归。
function test13() { }
//5.3.4.3 块级作用域中的函数
//JavaScript中的函数可以是块级作用域的一部分，这意味着函数也是该作用域的逻辑—例如，循环或分支—的一部分。
//所以即使两个函数体相同，只要它们在不同的块中，那么它们就是不同的函数；又或者在循环的不同迭代中的函数，也是不同的。
function test14() { }
//嵌套函数或函数作为表达式操作数时是性能更低的。
//函数声明是在语法分析期完成的，但函数实例的初始化是在运行期进行的。
//因此函数初始化的位置与运行期性能有关，这也是更推荐将函数放在模块中的原因：
//相较于在函数甚至循环体内“即用即声明”，在最外层的块级作用域中初始化次数最少。
//简而言之，不要将函数声明作为循环逻辑的一部分。
