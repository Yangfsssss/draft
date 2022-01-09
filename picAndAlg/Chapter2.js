"use strict";
/** Chapter2：选择排序 */
//本章内容
//❑ 学习两种最基本的数据结构——数组和链表，它们无处不在。
//第1章使用了数组，其他各章几乎也都将用到数组。数组是个重要的主题，
//一定要高度重视！但在有些情况下，使用链表比使用数组更合适。本章阐述数组和链表的优缺点，
//让你能够根据要实现的算法选择合适的一个。
//❑ 学习第一种排序算法。很多算法仅在数据经过排序后才管用。还记得二分查找吗？
//它只能用于有序元素列表。本章将介绍选择排序。很多语言都内置了排序算法，
//因此你基本上不用从头开始编写自己的版本。但选择排序是下一章将介绍的快速排序的基石。
//快速排序是一种重要的算法，如果你熟悉其他排序算法，理解起来将更容易。
//2.1 内存的工作原理------------------------------------------------------------------------------------------
//计算机就像是很多抽屉的集合体，每个抽屉都有地址。
//需要将数据存储到内存时，你请求计算机提供存储空间，计算机给你一个存储地址。
//需要存储多项数据时，有两种基本方式——数组和链表。但它们并非都适用于所有的情形，
//因此知道它们的差别很重要
//2.2 数组和链表----------------------------------------------------------------------------------------------
//使用数组意味着所有待办事项在内存中都是相连的（紧靠在一起的）。
//在数组中添加新元素也可能很麻烦。如果没有了空间，就得移到内存的其他地方，
//因此添加新元素的速度会很慢。
//
//一种解决之道是“预留座位”：即便当前只有3个待办事项，也请计算机提供10个位置，
//以防需要添加待办事项。这样，只要待办事项不超过10个，就无需转移。
//这是一个不错的权变措施，但你应该明白，它存在如下两个缺点。
//
//❑ 你额外请求的位置可能根本用不上，这将浪费内存。你没有使用，别人也用不了。
//❑ 待办事项超过10个后，你还得转移。
//
//因此，这种权宜措施虽然不错，但绝非完美的解决方案。对于这种问题，可使用链表来解决。
//2.2.1 链表
//链表中的元素可存储在内存的任何地方。
//链表的每个元素都存储了下一个元素的地址，从而使一系列随机的内存地址串在一起。
//只要有足够的内存空间，就能为链表分配内存。
//
//链表的优势在插入元素方面，那数组的优势又是什么呢？
//2.2.2 数组
//在需要读取链表的最后一个元素时，你不能直接读取，因为你不知道它所处的地址，
//必须先访问元素#1，从中获取元素#2的地址，再访问元素#2并从中获取元素#3的地址，
//以此类推，直到访问最后一个元素。需要同时读取所有元素时，链表的效率很高：
//你读取第一个元素，根据其中的地址再读取第二个元素，以此类推。但如果你需要跳跃，
//链表的效率真的很低。
//
//数组与此不同：你知道其中每个元素的地址。例如，假设有一个数组，它包含五个元素，
//起始地址为00，那么元素#5的地址是多少呢？只需执行简单的数学运算就知道：04。
//需要随机地读取元素时，数组的效率很高，因为可迅速找到数组的任何元素。在链表中，
//元素并非靠在一起的，你无法迅速计算出第五个元素的内存地址，而必须先访问第一个元素
//以获取第二个元素的地址，再访问第二个元素以获取第三个元素的地址，
//以此类推，直到访问第五个元素。
//2.2.3 术语
//            数组   链表
//读取   O(1)    O(n)
//插入  O(n)    O(1)
//问题：在数组中插入元素时，为何运行时间为O(n)呢？假设要在数组开头插入一个元素，
//你将如何做？这需要多长时间？
//练习2.1
//假设你要编写一个记账的应用程序。你每天都将所有的支出记录下来，
//并在月底统计支出，算算当月花了多少钱。因此，你执行的插入操作很多，
//但读取操作很少。该使用数组还是链表呢？
//
//答：链表，插入时间复杂度为O(1)
//2.2.4 在中间插入
//使用链表时，插入元素很简单，只需修改它前面的那个元素指向的地址。
//而使用数组时，则必须将后面的元素都向后移。
//如果没有足够的空间，可能还得将整个数组复制到其他地方！
//因此，当需要在中间插入元素时，链表是更好的选择。
//2.2.5 删除
//如果你要删除元素呢？链表也是更好的选择，因为只需修改前一个元素指向的地址即可。
//而使用数组时，删除元素后，必须将后面的元素都向前移。
//不同于插入，删除元素总能成功。如果内存中没有足够的空间，
//插入操作可能失败，但在任何情况下都能够将元素删除。
//            数组   链表
//读取   O(1)    O(n)
//插入  O(n)    O(1)
//删除  O(n)    O(1)
//
//需要指出的是，仅当能够立即访问要删除的元素时，删除操作的运行时间才为O(1)。
//通常我们都记录了链表的第一个元素和最后一个元素，因此删除这些元素时运行时间为O(1)。
//
//本书经常说数组的读取速度更快，这是因为它们支持随机访问。很多情况都要求能够随机访问，
//因此数组用得很多。数组和链表还被用来实现其他数据结构，这将在本书后面介绍。
//练习
//2.2
//假设你要为饭店创建一个接受顾客点菜单的应用程序。这个应用程序存储一系列点菜单。
//服务员添加点菜单，而厨师取出点菜单并制作菜肴。这是一个点菜单队列：
//服务员在队尾添加点菜单，厨师取出队列开头的点菜单并制作菜肴。
//你使用数组还是链表来实现这个队列呢？（提示：链表擅长插入和删除，
//而数组擅长随机访问。在这个应用程序中，你要执行的是哪些操作呢？）
//
//答：链表，在这种环境下主要执行的操作是插入和删除
//2.3
//我们来做一个思考实验。假设Facebook记录一系列用户名，每当有用户试图登录Facebook时，
//都查找其用户名，如果找到就允许用户登录。由于经常有用户登录Facebook，
//因此需要执行大量的用户名查找操作。假设Facebook使用二分查找算法，
//而这种算法要求能够随机访问——立即获取中间的用户名。考虑到这一点，
//应使用数组还是链表来存储用户名呢？
//
//答：数组，数组的读取操作时间复杂度为O(1)
//2.4
//经常有用户在Facebook注册。假设你已决定使用数组来存储用户名，
//在插入方面数组有何缺点呢？具体地说，在数组中添加新用户将出现什么情况？
//
//答：数组的插入操作时间复杂度为O(n)，随着用户数越来越多，插入新的用户
//会越来越耗时
//2.5
//实际上，Facebook存储用户信息时使用的既不是数组也不是链表。
//假设Facebook使用的是一种混合数据：链表数组。这个数组包含26个元素，
//每个元素都指向一个链表。例如，该数组的第一个元素指向的链表包含所有以A打头的用户名，
//第二个元素指向的链表包含所有以B打头的用户名，以此类推。
//
//假设Adit B在Facebook注册，而你需要将其加入前述数据结构中。
//因此，你访问数组的第一个元素，再访问该元素指向的链表，并将Adit B添加到这个链表末尾。
//现在假设你要查找Zakhir H。因此你访问第26个元素，再在它指向的链表
//（该链表包含所有以z打头的用户名）中查找Zakhir H。
//
//请问，相比于数组和链表，这种混合数据结构的查找和插入速度更慢还是更快？
//你不必给出大O运行时间，只需指出这种新数据结构的查找和插入速度更快还是更慢。
//
//答：
//2.3 选择排序---------------------------------------------------------------------------------------------------------------------
//假设你的计算机存储了很多乐曲。对于每个乐队，你都记录了其作品被播放的次数。
//你要将这个列表按播放次数从多到少的顺序排列，从而将你喜欢的乐队排序。
//
//该如何做呢？一种办法是遍历这个列表，找出作品播放次数最多的乐队，并将该乐队添加到一个新列表中。
//再次这样做，找出播放次数第二多的乐队。
//继续这样做，你将得到一个有序列表。
//
//下面从计算机科学的角度出发，看看这需要多长时间。别忘了，O(n)时间意味着查看列表中的每个元素一次。
//例如，对乐队列表进行简单查找时，意味着每个乐队都要查看一次。要找出播放次数最多的乐队，
//必须检查列表中的每个元素。正如你刚才看到的，这需要的时间为O(n)。因此对于这种时间为O(n)的操作，
//你需要执行n次。需要的总时间为O(n × n)，即O(n2)。
//
//选择排序是一种灵巧的算法，但其速度不是很快。快速排序是一种更快的排序算法，
//其运行时间为O(n log n)，这将在下一章介绍。
//示例代码
function selectionSort(ary) {
    function findSmallest(ary) {
        var smallest = ary[0];
        var smallest_index = 0;
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] < smallest) {
                smallest = ary[i];
                smallest_index = i;
            }
        }
        return smallest_index;
    }
    var newAry = [];
    for (var i = 0, l = ary.length; i < l; i++) {
        var smallest = findSmallest(ary);
        newAry.push.apply(newAry, ary.splice(smallest, 1));
    }
    return console.log(newAry);
}
// selectionSort([5, 3, 6, 2, 10]);
//2.4 小结-------------------------------------------------------------------------------------
//❑ 计算机内存犹如一大堆抽屉。
//❑ 需要存储多个元素时，可使用数组或链表。
//❑ 数组的元素都在一起。
//❑ 链表的元素是分开的，其中每个元素都存储了下一个元素的地址。
//❑ 数组的读取速度很快。
//❑ 链表的插入和删除速度很快。
//❑ 在同一个数组中，所有元素的类型都必须相同（都为int、double等）。
