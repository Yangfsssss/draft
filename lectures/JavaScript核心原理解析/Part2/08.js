/** 08，x => x：函数式语言的核心抽象：函数与表达式的同一性 */

//语句执行是命令式范型的体现，而函数执行代表了 JavaScript 中对函数式范型的理解。

//从对象的角度来理解 JavaScript 中的函数，“函数就是具有[[Call]]私有槽的对象”。
//这是从静态视角来观察函数的结果。

//函数是执行结构，执行过程发生了什么呢？这个问题从对象的视角是既观察不到，也得不到答案的。
//并且，事实上如果上面这个问题问得稍稍深入一点，例如“对象的方法是怎么执行的呢”，
//那么就必须要回到“函数的视角”，或者运行期的、动态的角度来解释这一切了。

//函数的一体两面------------------------------------------------------------------------------------------------------
//用静态的视角来看函数，它就是一个函数对象（函数的实例）。
//如果不考虑它作为对象的那些特性，那么函数也无非就是“用三个语义组件构成的实体”。

//这三个语义组件是指：
//1，参数：函数总是有参数的，即使它的形式参数表为空；
//2，执行体：函数总是有它的执行过程，即使是空的函数体或空语句；
//3，结果：函数总是有它的执行的结果，即使是 undefined。

//当我们把这三个部分构成的一个整体看作执行体的时候：
//那么它的结果是一个函数类型的“数据”。
//这在函数式语言中称为“函数是第一类型的”，
//也就是说函数既是可以执行的逻辑，也同时是可以被逻辑处理的数据。

//函数作为数据时，它是“原始的函数声明”的一个实例（注意这里并不强调它是对象实例）。
//这个实例必须包括上述三个语义组件中的两个，即参数与执行体。
//否则，它作为实例将是不完整的、不能准确复现原有的函数声明的。
//为了达到这个目的，JavaScript 为每个实例创建了一个闭包，并且作为上述“函数类型的‘数据’”的实际结果。
function test() {
  var arr = new Array();

  for (var i = 0; i < 5; i++) arr.push(function f() {});

  console.log(arr);
  console.log(arr[0] === arr[1]);
}

//任何时候只要用户代码引用一次这样的函数（的声明或字面量），那么它就会拿到该函数的一个闭包。
//注意，得到这个闭包的过程与是否调用它是无关的。
// test();

//两个语义组件---------------------------------------------------------------------------------------------------------
//...

//函数表达式每执行一次，得到一个函数实例
//函数实例每调用一次，得到一个闭包

//函数表达式中的变量名绑定的并非函数的地址（引用），而是它的值
//因为表达式运算总是 lhs（名字） = GetValue（rhs（引用））
