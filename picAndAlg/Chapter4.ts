/** Chapter3：快速排序 */

//本章内容
//❑ 学习分而治之。有时候，你可能会遇到使用任何已知的算法都无法解决的问题。
//优秀的算法学家遇到这种问题时，不会就此放弃，而是尝试使用掌握的各种问题解决方法来找出解决方案。
//分而治之是你学习的第一种通用的问题解决方法。
//❑ 学习快速排序——一种常用的优雅的排序算法。快速排序使用分而治之的策略。
//
//前一章深入介绍了递归，本章的重点是使用学到的新技能来解决问题。
//我们将探索分而治之（divide and conquer, D&C）——一种著名的递归式问题解决方法。
//本书将深入算法的核心。只能解决一种问题的算法毕竟用处有限，而D&C提供了解决问题的思路，
//是另一个可供你使用的工具。面对新问题时，你不再束手无策，而是自问：“使用分而治之能解决吗？”
//在本章末尾，你将学习第一个重要的D&C算法——快速排序。快速排序是一种排序算法，
//速度比第2章介绍的选择排序快得多，实属优雅代码的典范。

Function.prototype.log = function (x) {
	console.log(this(x));
};

//4.1 分而治之-------------------------------------------------------------------------------------------------------------------------
//D&C算法是递归的。使用D&C解决问题的过程包括两个步骤。
//(1) 找出基线条件，这种条件必须尽可能简单。
//(2) 不断将问题分解（或者说缩小规模），直到符合基线条件。

//给定一个数字数组。你需要将这些数字相加，并返回结果。
//使用循环很容易完成这种任务。
function sum(ary) {
	let total = 0;

	for (const x of ary) {
		total += x;
	}

	return total;
}

// sum.log([1, 2, 3, 4]);

//使用递归函数来完成这种任务
function sum2(ary: []) {
	if (ary.length === 0) {
		return 0;
	} else {
		return ary.splice(0, 1)[0] + sum2(ary);
	}
}

// sum2.log([1, 2, 3, 4,5,6,7,8,9]);

//练习
//4.1 请编写前述sum函数的代码。
//
//答：见sum2

//4.2 编写一个递归函数来计算列表包含的元素数。
//
//答：
function elementsInList(list: []): number {
	let length = 0;

	if (list.length === 0) {
		return length;
	} else {
		length += 1;
		list.splice(0, 1);
		return length + elementsInList(list);
	}
}

// elementsInList.log([1, 2, 3, 4, 5, 6, 7]);

//4.3 找出列表中最大的数字。
//
//答：
function biggestNumberInList(list: number[]): number {
	if (list.length === 0) {
		return null;
	}

	let max = list[0];

	for (let i = 1; i < list.length; i++) {
		if (list[i] > max) {
			max = list[i];
		}
	}

	return max;
}

// biggestNumberInList.log([7, 9, 3, 5, 8, 10]);

//4.4 还记得第1章介绍的二分查找吗？它也是一种分而治之算法。你能找出二分查找算法的基线条件和递归条件吗？
//
//答：基线条件：指针low和high错位；
//       递归条件：指针low和high没有错位时，不断重置mid的位置

//4.2 快速排序-------------------------------------------------------------------------------------------------------------------------
//快速排序是一种常用的排序算法，比选择排序快得多。例如，C语言标准库中的函数qsort实现的就是快速排
//快速排序也使用了D&C。下面来使用快速排序对数组进行排序。对排序算法来说，最简单的数组什么样呢？
//还记得前一节的“提示”吗？就是根本不需要排序的数组。
function quickSort(list: number[]): number[] {
	if (list.length < 2) {
		return list;
	}

	//对于更长的数组
	//别忘了，你要使用D&C，因此需要将数组分解，直到满足基线条件。下面介绍快速排序的工作原理。
	//首先，从数组中选择一个元素，这个元素被称为基准值（pivot）。
	//稍后再介绍如何选择合适的基准值。我们暂时将数组的第一个元素用作基准值。
	//接下来，找出比基准值小的元素以及比基准值大的元素。
	//这被称为分区（partitioning）。现在你有：
	//❑ 一个由所有小于基准值的数字组成的子数组；
	//❑ 基准值；
	//❑ 一个由所有大于基准值的数组组成的子数组。
	//
	//这里只是进行了分区，得到的两个子数组是无序的。但如果这两个数组是有序的，
	//对整个数组进行排序将非常容易。
	//如果子数组是有序的，就可以像下面这样合并得到一个有序的数组：
	//左边的数组+基准值+右边的数组。在这里，就是[10,15]+[33]+[]，结果为有序数组[10, 15, 33]。
	//如何对子数组进行排序呢？对于包含两个元素的数组（左边的子数组）以及空数组（右边的子数组），
	//快速排序知道如何将它们排序，因此只要对这两个子数组进行快速排序，再合并结果，就能得到一个有序数组！

	const fundamental = list[0];
	let upperSector = [];
	let lowerSector = [];

	for (let i = 1; i < list.length; i++) {
		if (list[i] <= fundamental) {
			lowerSector.push(list[i]);
		} else if (list[i] > fundamental) {
			upperSector.push(list[i]);
		}
	}

	return quickSort(lowerSector).concat(fundamental).concat(quickSort(upperSector));
}

// quickSort.log([33, 15, 10]);
// quickSort.log([10, 5, 2, 3]);

//归纳证明
//刚才你大致见识了归纳证明！归纳证明是一种证明算法行之有效的方式，它分两步：基线条件和归纳条件。
//是不是有点似曾相识的感觉？例如，假设我要证明我能爬到梯子的最上面。
//递归条件是这样的：如果我站在一个横档上，就能将脚放到上一个横档上。换言之，如果我站在第二个横档上，
//就能爬到第三个横档。这就是归纳条件。而基线条件是这样的，即我已经站在第一个横档上。因此，
//通过每次爬一个横档，我就能爬到梯子最顶端。对于快速排序，可使用类似的推理。在基线条件中，
//我证明这种算法对空数组或包含一个元素的数组管用。在归纳条件中，我证明如果快速排序对包含一个元素的数组管用，
//对包含两个元素的数组也将管用；如果它对包含两个元素的数组管用，对包含三个元素的数组也将管用，
//以此类推。因此，我可以说，快速排序对任何长度的数组都管用。这里不再深入讨论归纳证明，但它很有趣，
//并与D&C协同发挥作用。

//4.3 再谈大O表示法--------------------------------------------------------------------------------------------------------------------
//快速排序的独特之处在于，其速度取决于选择的基准值。

//4.3.1 比较合并排序和快速排序
//c是算法所需的固定时间量，被称为常量。通常不考虑这个常量，
//因为如果两种算法的大O运行时间不同，这种常量将无关紧要。
//
//但有时候，常量的影响可能很大，对快速查找和合并查找来说就是如此。快速查找的常量比合并查找小，
//因此如果它们的运行时间都为O(n log n)，快速查找的速度将更快。实际上，快速查找的速度确实更快，
//因为相对于遇上最糟情况，它遇上平均情况的可能性要大得多。
//
//此时你可能会问，何为平均情况，何为最糟情况呢？

//4.3.2 平均情况和最糟情况
//在这个示例中，层数为O(log n)（用技术术语说，调用栈的高度为O(log n)），而每层需要的时间为O(n)。
//因此整个算法需要的时间为O(n) ＊ O(log n)=O(n log n)。这就是最佳情况。
//
///在最糟情况下，有O(n)层，因此该算法的运行时间为O(n) ＊O(n)=O(n2)。
//
//知道吗？这里要告诉你的是，最佳情况也是平均情况。只要你每次都随机地选择一个数组元素作为基准值，
//快速排序的平均运行时间就将为O(n log n)。快速排序是最快的排序算法之一，也是D&C典范。

//练习
//使用大O表示法时，下面各种操作都需要多长时间？
//4.5 打印数组中每个元素的值。
//
//答：O(cn)

//4.6 将数组中每个元素的值都乘以2。
//
//答：O(n)

//4.7 只将数组中第一个元素的值乘以2。
//
//答：O(1)

//4.8 根据数组包含的元素创建一个乘法表，即如果数组为[2,3, 7, 8, 10]，首先将每个元素都乘以2，
//再将每个元素都乘以3，然后将每个元素都乘以7，以此类推。
//
//答：存在n个元素，对每个元素执行n次操作，时间复杂度为O(n^2)

//4.4 小结-------------------------------------------------------------------------------------------------------------------------
//❑ D&C将问题逐步分解。使用D&C处理列表时，基线条件很可能是空数组或只包含一个元素的数组。
//❑ 实现快速排序时，请随机地选择用作基准值的元素。快速排序的平均运行时间为O(n log n)。
//❑ 大O表示法中的常量有时候事关重大，这就是快速排序比合并排序快的原因所在。
//❑ 比较简单查找和二分查找时，常量几乎无关紧要，因为列表很长时，O(log n)的速度比O(n)快得多。