/** Chapter1：算法简介 */

//1.1 引言-------------------------------------------------------------------------------------
//算法是一组完成任务的指令。任何代码片段都可视为算法。
//对于每种算法，本书都将首先进行描述并提供示例，
//再使用大O表示法讨论其运行时间，最后探索它可以解决的其他问题。

//1.1.1 性能方面
//在本书中，你将学习比较不同算法的优缺点：该使用合并排序算法还
//是快速排序算法，或者该使用数组还是链表。仅仅改用不同的数据结构
//就可能让结果大不相同。

//1.1.2 问题解决技巧
//读完本书后，你将熟悉一些使用最为广泛的算法。利用这些新学到的知识，
//你可学习更具体的AI算法、数据库算法等，还可在工作中迎接更严峻的挑战。

//1.2 二分查找-------------------------------------------------------------------------------
//二分查找是一种算法，其输入是一个有序的元素列表
//（必须有序的原因稍后解释）。
//如果要查找的元素包含在列表中，二分查找返回其位置；否则返回null。

//1.2.1 更佳的查找方式
//一般而言，对于包含n个元素的列表，用二分查找最多需要log2n步，
//而简单查找最多需要n步。
function binary_search(list: any[], item: any) {
	let low = 0;
	let high = list.length - 1;
	let mid = Math.floor((low + high) / 2);

	// console.log('low', low);
	// console.log('mid', mid);
	// console.log('high', high);

	while (low <= high) {
		mid = Math.floor((low + high) / 2);
		let guess = list[mid];

		if (guess < item) {
			low = mid + 1;
		} else if (guess > item) {
			high = mid - 1;
		} else if (guess === item) {
			return console.log(mid);
		}
	}

	return console.log(null);
}

// binary_search([1, 3, 5, 7, 9], 3);
// binary_search([1, 3, 5, 7, 9], -1);

//练习：
//1.1 假设有一个包含128个名字的有序列表，你要使用二分查找在
//其中查找一个名字，请问最多需要几步才能找到？
//答：log128 = 7

//1.2 1.2 上面列表的长度翻倍后，最多需要几步？
//答：log256 = 8

//1.2.2 运行时间
//每次介绍算法时，我都将讨论其运行时间。一般而言，
//应选择效率最高的算法，以最大限度地减少运行时间或占用空间。

//最多需要猜测的次数与列表长度相同，这被称为线性时间（linear time）。
//二分查找的运行时间为对数时间（或log时间）

//1.3 大O表示法----------------------------------------------------------------------------
//大O表示法是一种特殊的表示法，指出了算法的速度有多快。
//实际上，你经常要使用别人编写的算法，在这种情况下，
//知道这些算法的速度大有裨益，本节将介绍大O表示法是什么，
//并使用它列出一些最常见的算法运行时间。

//1.3.1 算法的运行时间以不同的速度增加
//仅知道算法需要多长时间才能运行完毕还不够，还需知道
//运行时间如何随列表增长而增加。这正是大O表示法的用武之地。

//大O表示法让你能够比较操作数，它指出了算法运行时间的增速。

//1.3.2 理解不同的大O运行时间
//假设你要画一个网格，它包含16个格子。

//1.3.3 大O表示法指出了最糟情况下的运行时间
//大O表示法说的是最糟的情形

//1.3.4 一些常见的大O运行时间
//❑ O(log n)，也叫对数时间，这样的算法包括二分查找。
//❑ O(n)，也叫线性时间，这样的算法包括简单查找。
//❑ O(n ＊ log n)，这样的算法包括第4章将介绍的快速排序——一种
//速度较快的排序算法。
//❑ O(n2)，这样的算法包括第2章将介绍的选择排序——一种速度较慢的排序算法。
//❑ O(n! )，这样的算法包括接下来将介绍的旅行商问题的解决方案——一种
//非常慢的算法。

//实际上，并不能如此干净利索地将大O运行时间转换为操作数，
//但就目前而言，这种准确度足够了。

//当前，我们获得的主要启示如下。
//❑ 算法的速度指的并非时间，而是操作数的增速。
//❑ 谈论算法的速度时，我们说的是随着输入的增加，
//其运行时间将以什么样的速度增加。
//❑ 算法的运行时间用大O表示法表示。
//❑ O(log n)比O(n)快，当需要搜索的元素越多时，前者比后者快得越多。

//1.3.5 旅行商
//对于每种顺序，他都计算总旅程，再挑选出旅程最短的路线。
//5个城市有120种不同的排列方式。因此，在涉及5个城市时，
//解决这个问题需要执行120次操作。涉及6个城市时，需要执行720次
//操作（有720种不同的排列方式）。涉及7个城市时，需要执行5040次操作！

//推而广之，涉及n个城市时，需要执行n!（n的阶乘）次操作才能计算出结果。
//因此运行时间为O(n! )，即阶乘时间

//对于这个问题，目前还没有找到更快的算法，有些很聪明的
//人认为这个问题根本就没有更巧妙的算法。面对这个问题，
//我们能做的只是去找出近似答案，更详细的信息请参阅第10章。

//1.4 小结------------------------------------------------------------------------------------
//❑ 二分查找的速度比简单查找快得多。
//❑ O(log n)比O(n)快。需要搜索的元素越多，前者比后者就快得越多。
//❑ 算法运行时间并不以秒为单位。
//❑ 算法运行时间是从其增速的角度度量的。
//❑ 算法运行时间用大O表示法表示。
