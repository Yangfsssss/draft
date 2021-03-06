/** Chapter6：广度优先搜索 */

//本章内容
//❑ 学习使用新的数据结构图来建立网络模型。
//❑ 学习广度优先搜索，你可对图使用这种算法回答诸如“到X的最短路径是什么”等问题。
//❑ 学习有向图和无向图。
//❑ 学习拓扑排序，这种排序算法指出了节点之间的依赖关系。

//本章将介绍图。首先，我将说说什么是图（它们不涉及X轴和Y轴），再介绍第一种图算法——
//广度优先搜索（breadth-firstsearch, BFS）。广度优先搜索让你能够找出两样东西之间的最短距离，
//不过最短距离的含义有很多！使用广度优先搜索可以：
//❑ 编写国际跳棋AI，计算最少走多少步就可获胜；
//❑ 编写拼写检查器，计算最少编辑多少个地方就可将错拼的单词改成正确的单词，
//如将READED改为READER需要编辑一个地方；
//❑ 根据你的人际关系网络找到关系最近的医生。在我所知道的算法中，图算法应该是最有用的。
//请务必仔细阅读接下来的几章，这些算法你将经常用到。

Function.prototype.log = function (x) {
	console.log(this(x));
};

Map.prototype.log = function (x) {
	console.log(this.get(x));
};

//6.1 图简介--------------------------------------------------------------------------------------------------------------------------
//解决最短路径问题的算法被称为广度优先搜索。要确定如何从双子峰前往金门大桥，需要两个步骤。
//(1) 使用图来建立问题模型。
//(2) 使用广度优先搜索解决问题。
//下面介绍什么是图，然后再详细探讨广度优先搜索。

//6.2 图是什么-----------------------------------------------------------------------------------------------------------------------
//图模拟一组连接。
//图由节点（node）和边（edge）组成。一个节点可能与众多节点直接相连，这些节点被称为邻居
//图用于模拟不同的东西是如何相连的。下面来看看广度优先搜索。

//6.3 广度优先搜索------------------------------------------------------------------------------------------------------------------
//广度优先搜索是一种用于图的查找算法，可帮助回答两类问题。
//❑ 第一类问题：从节点A出发，有前往节点B的路径吗？（寻找芒果经销商）
//❑ 第二类问题：从节点A出发，前往节点B的哪条路径最短？

//6.3.1 查找最短路径
//广度优先搜索就是这样做的！在广度优先搜索的执行过程中，搜索范围从起点开始逐渐向外延伸，
//即先检查一度关系，再检查二度关系。
//
//注意，只有按添加顺序查找时，才能实现这样的目的。有一个可实现这种目的的数据结构，那就是队列（queue）。

//6.3.2 队列
//队列类似于栈，你不能随机地访问队列中的元素。队列只支持两种操作：入队和出队。

//练习
//略

//6.4 实现图--------------------------------------------------------------------------------------------------------------------------
//首先，需要使用代码来实现图。
//图由多个节点组成。每个节点都与邻近节点相连，如果表示类似于“你→Bob”这样的关系呢？
//好在你知道的一种结构让你能够表示这种关系，它就是散列表！记住，散列表让你能够将键映射到值。
//在这里，你要将节点映射到其所有邻居。
function graph() {
	const graph = new Map();

	graph.set('sam', ['alice', 'claire', 'bob']);
	graph.set('alice', ['peggy']);
	graph.set('claire', ['thom']);
	graph.set('bob', ['anuj', 'peggy']);
	graph.set('peggy', ['sam']);
	graph.set('thom', []);
	graph.set('anuj', []);
	graph.set('jonnya', []);

	// graph.log('you');

	return graph;
}

// graph();

//6.5 实现算法-----------------------------------------------------------------------------------------------------------------------
function search_queue() {
	function checkSeller(name) {
		return name === 'jonnyaa';
		// return name === 'peggy';
	}

	const map = graph();

	const queue = ['sam', 'alice', 'claire', 'bob', 'peggy', 'thom', 'anuj', 'jonnya'];

	const checked = new Set();

	while (queue.length > 0) {
		let element = queue.shift();

		console.log('checked', checked);

		if (checked.has(element) === false) {
			if (checkSeller(element) === true) {
				return element;
			} else {
				checked.add(element);
				queue.push(...map.get(element));
			}
		}
	}

	return null;
}

// search_queue.log();

//6.6 小结----------------------------------------------------------------------------------------------------------------------------
//❑ 广度优先搜索指出是否有从A到B的路径。
//❑ 如果有，广度优先搜索将找出最短路径。
//❑ 面临类似于寻找最短路径的问题时，可尝试使用图来建立模型，再使用广度优先搜索来解决问题。
//❑ 有向图中的边为箭头，箭头的方向指定了关系的方向，例如，rama→adit表示rama欠adit钱。
//❑ 无向图中的边不带箭头，其中的关系是双向的，例如，ross - rachel表示“ross与rachel约会，而rachel也与ross约会”。
//❑ 队列是先进先出（FIFO）的。
//❑ 栈是后进先出（LIFO）的。
//❑ 你需要按加入顺序检查搜索列表中的人，否则找到的就不是最短路径，因此搜索列表必须是队列。
//❑ 对于检查过的人，务必不要再去检查，否则可能导致无限循环。
