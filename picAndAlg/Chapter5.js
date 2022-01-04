"use strict";
/** Chapter5：散列表 */
//本章内容
//❑ 学习散列表——最有用的基本数据结构之一。散列表用途广泛，本章将介绍其常见的用途。
//❑ 学习散列表的内部机制：实现、冲突和散列函数。这将帮助你理解如何分析散列表的性能。
Function.prototype.log = function (x) {
    console.log(this(x));
};
Map.prototype.log = function (x) {
    console.log(this.get(x));
};
//5.1 散列函数------------------------------------------------------------------------------------------------------------
//散列函数是这样的函数，即无论你给它什么数据，它都还你一个数字。
function Maggie() {
    var ary = new Array(5);
    var apple = 0;
    var apple1 = 1;
    var apple2 = 2;
    var apple3 = 3;
    var apple4 = 4;
    ary[0] = 1.49;
    ary[1] = 1.49;
    ary[2] = 1.49;
    ary[3] = 0.67;
    ary[4] = 1.49;
    var query = function (name) {
        return ary[name];
    };
    query.log(apple3);
    var fruitMap = new Map();
    fruitMap.set('peer', 1);
    fruitMap.set('peer1', 2);
    fruitMap.set('peer2', 3);
    fruitMap.set('peer3', 4);
    fruitMap.set('peer4', 5);
    fruitMap.log('peer3');
}
// Maggie();
//练习
//对于同样的输入，散列表必须返回同样的输出，这一点很重要。如果不是这样的，
//就无法找到你在散列表中添加的元素！请问下面哪些散列函数是一致的？
//
//答：1,0,0,0
//5.2 应用案例---------------------------------------------------------------------------------------------------------------------
//散列表用途广泛，本节将介绍几个应用案例。
//5.2.1 将散列表用于查找
//散列表被用于大海捞针式的查找。例如，你在访问像http://adit.io这样的网站时，
//计算机必须将adit.io转换为IP地址。无论你访问哪个网站，其网址都必须转换为IP地址。
//这不是将网址映射到IP地址吗？好像非常适合使用散列表啰！这个过程被称为DNS解析（DNS resolution），
//散列表是提供这种功能的方式之一。
//5.2.2 防止重复
//5.2.3 将散列表用作缓存
//缓存具有如下两个优点。
//❑ 用户能够更快地看到网页，就像你记住了月球与地球之间的距离时一样。
//下次你侄女再问你时，你就不用再使用Google搜索，立刻就可以告诉她答案。
//❑ Facebook需要做的工作更少。缓存是一种常用的加速方式，所有大型网站都使用缓存，
//而缓存的数据则存储在散列表中！
//
//仅当URL不在缓存中时，你才让服务器做些处理，并将处理生成的数据存储到缓存中，再返回它。
//这样，当下次有人请求该URL时，你就可以直接发送缓存中的数据，而不用再让服务器进行处理了。
//5.2.4 小结
//这里总结一下，散列表适合用于：
//❑ 模拟映射关系；
//❑ 防止重复；
//❑ 缓存/记住数据，以免服务器再通过处理来生成它们。
//5.3 冲突---------------------------------------------------------------------------------------------------------------------------
//❑ 散列函数很重要。前面的散列函数将所有的键都映射到一个位置，而最理想的情况是，
//散列函数将键均匀地映射到散列表的不同位置。
//❑ 如果散列表存储的链表很长，散列表的速度将急剧下降。然而，如果使用的散列函数很好，
//这些链表就不会很长！
//
//散列函数很重要，好的散列函数很少导致冲突。那么，如何选择好的散列函数呢？这将在下一节介绍！
//5.4 性能---------------------------------------------------------------------------------------------------------------------------
//在最糟情况下，散列表所有操作的运行时间都为O(n)——线性时间，这真的很慢。
//我们来将散列表同数组和链表比较一下。在平均情况下，散列表的查找（获取给定索引处的值）速度与数组一样快，
//而插入和删除速度与链表一样快，因此它兼具两者的优点！但在最糟情况下，散列表的各种操作的速度都很慢。
//因此，在使用散列表时，避开最糟情况至关重要。为此，需要避免冲突。而要避免冲突，需要有：
//❑ 较低的填装因子；
//❑ 良好的散列函数。
//5.4.1 填装因子
//填装因子 = 散列表包含的元素数 / 位置总数
//5.4.2 良好的散列函数
//良好的散列函数让数组中的值呈均匀分布。
//练习
//散列函数的结果必须是均匀分布的，这很重要。它们的映射范围必须尽可能大。
//最糟糕的散列函数莫过于将所有输入都映射到散列表的同一个位置。
//
//假设你有四个处理字符串的散列函数。
//A．不管输入是什么，都返回1。
//B．将字符串的长度用作索引。
//C．将字符串的第一个字符用作索引。即将所有以a打头的字符串都映射到散列表的同一个位置，以此类推。
//D．将每个字符都映射到一个素数：a=2, b=3, c=5, d=7,e=11，等等。对于给定的字符串，
//这个散列函数将其中每个字符对应的素数相加，再计算结果除以散列表长度的余数。例如，如果散列表的长度为10，
//字符串为bag，则索引为(3 + 2 + 17) % 10=22 % 10=2。
//
//在下面的每个示例中，上述哪个散列函数可实现均匀分布？假设散列表的长度为10。
//
//5.5 将姓名和电话号码分别作为键和值的电话簿，其中联系人姓名为Esther、Ben、Bob和Dan。
//5.6 电池尺寸到功率的映射，其中电池尺寸为A、AA、AAA和AAAA。
//5.7 书名到作者的映射，其中书名分别为Maus、FunHome和Watchmen。
//5.5 小结--------------------------------------------------------------------------------------------------------------------------------
//你几乎根本不用自己去实现散列表，因为你使用的编程语言提供了散列表实现。你可使用Python提供的散列表，
//并假定能够获得平均情况下的性能：常量时间。
//
//散列表是一种功能强大的数据结构，其操作速度快，还能让你以不同的方式建立数据模型。
//你可能很快会发现自己经常在使用它。
//
//❑ 你可以结合散列函数和数组来创建散列表。
//❑ 冲突很糟糕，你应使用可以最大限度减少冲突的散列函数。
//❑ 散列表的查找、插入和删除速度都非常快。
//❑ 散列表适合用于模拟映射关系。
//❑ 一旦填装因子超过0.7，就该调整散列表的长度。
//❑ 散列表可用于缓存数据（例如，在Web服务器上）。
//❑ 散列表非常适合用于防止重复。
