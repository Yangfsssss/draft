/** Chapter3：递归 */

//本章内容
//❑ 学习递归。递归是很多算法都使用的一种编程方法，是理解本书后续内容的关键。
//❑ 学习如何将问题分成基线条件和递归条件。第4章将介绍的分而治之策略使用这种简单的概念来解决棘手的问题。

Function.prototype.log = function (x) {
	console.log(this(x));
};

//3.1 递归-------------------------------------------------------------------------------------------------------------------------------
//下面是一种方法。
//(1) 创建一个要查找的盒子堆。
//(2) 从盒子堆取出一个盒子，在里面找。
//(3) 如果找到的是盒子，就将其加入盒子堆中，以便以后再查找。
//(4) 如果找到钥匙，则大功告成！
//(5) 回到第二步。
//
//下面是另一种方法。
//(1) 检查盒子中的每样东西。
//(2) 如果是盒子，就回到第一步。
//(3) 如果是钥匙，就大功告成！
//
//第一种方法使用的是while循环：只要盒子堆不空，就从中取一个盒子，并在其中仔细查找。
//第二种方法使用递归——函数调用自己。
//
//这两种方法的作用相同，但在我看来，第二种方法更清晰。递归只是让解决方案更清晰，
//并没有性能上的优势。实际上，在有些情况下，使用循环的性能更好。
//我很喜欢Leigh Caldwell在Stack Overflow上说的一句话：“如果使用循环，程序的性能可能更高；
//如果使用递归，程序可能更容易理解。如何选择要看什么对你来说更重要。”
//很多算法都使用了递归，因此理解这种概念很重要。

//3.2 基线条件和递归条件-----------------------------------------------------------------------------------------------------------
//由于递归函数调用自己，因此编写这样的函数时很容易出错，进而导致无限循环。
//例如，假设你要编写一个像下面这样倒计时的函数。
function countdown(i) {
	console.log(i);

	if (i <= 1) {
		//基线条件
		return;
	} else {
		//递归条件
		countdown(i - 1);
	}
}

// countdown(3);

//编写递归函数时，必须告诉它何时停止递归。正因为如此，每个递归函数都有两部分：
//基线条件（base case）和递归条件（recursive case）。递归条件指的是函数调用自己，
//而基线条件则指的是函数不再调用自己，从而避免形成无限循环。

//3.3 栈---------------------------------------------------------------------------------------------------------------------------------
//本节将介绍一个重要的编程概念——调用栈（call stack）。
//调用栈不仅对编程来说很重要，使用递归时也必须理解这个概念。

//3.3.1 调用栈
function t() {
	function greet(name) {
		console.log('hello ' + name + '!');

		greet2(name);

		console.log('getting ready to say bye...');

		bye();
	}

	function greet2(name) {
		console.log('how are you? ' + name + '?');
	}

	function bye() {
		console.log('ok bye!');
	}

	greet('maggie');
}

// t();

//计算机使用一个栈来表示这些内存块，其中第二个内存块位于第一个内存块上面。
//你打印how are you, maggie?，然后从函数调用返回。此时，栈顶的内存块被弹出。
//
//现在，栈顶的内存块是函数greet的，这意味着你返回到了函数greet。当你调用函数greet2时，
//函数greet只执行了一部分。这是本节的一个重要概念：调用另一个函数时，当前函数暂停并处于未完成状态。
//该函数的所有变量的值都还在内存中。执行完函数greet2后，你回到函数greet，并从离开的地方开始接着往下执行：
//首先打印getting ready to say bye…，再调用函数bye。
//
//在栈顶添加了函数bye的内存块。然后，你打印ok bye!，并从这个函数返回。
//现在你又回到了函数greet。由于没有别的事情要做，你就从函数greet返回。这个栈用于存储多个函数的变量，
//被称为调用栈。

//3.3.2 递归调用栈
function fact(x) {
	if (x === 1) {
		return 1;
	} else {
		return x * fact(x - 1);
	}
}

// console.log(fact(3));
// fact.log(3);

//使用栈很方便，因为你无需自己跟踪盒子堆——栈替你这样做了。
//使用栈虽然很方便，但是也要付出代价：存储详尽的信息可能占用大量的内存。每个函数调用都要占用一定的内存，
//如果栈很高，就意味着计算机存储了大量函数调用的信息。在这种情况下，你有两种选择。
//❑ 重新编写代码，转而使用循环。
//❑ 使用尾递归。这是一个高级递归主题，不在本书的讨论范围内。另外，并非所有的语言都支持尾递归。

//练习
//3.2
//假设你编写了一个递归函数，但不小心导致它没完没了地运行。正如你看到的，对于每次函数调用，
//计算机都将为其在栈中分配内存。递归函数没完没了地运行时，将给栈带来什么影响？
//
//答：栈所占用的内存将不断变大，最终造成内存溢出

//3.4 小结--------------------------------------------------------------------------------------------------------------------------------
//❑ 递归指的是调用自己的函数。
//❑ 每个递归函数都有两个条件：基线条件和递归条件。
//❑ 栈有两种操作：压入和弹出。
//❑ 所有函数调用都进入调用栈。
//❑ 调用栈可能很长，这将占用大量的内存。
