只减少一层嵌套：
    思路：
        push(...item)(数组)/push(item)(非数组)
        concat(...item)

连环问：减少所有嵌套
    思路：
        递归
    
    巧妙的解决方案：toString()，不具有完整性。

划重点：
    高质量代码的特点：编码规范性，功能完整性，鲁棒性。
    题目事例是number类型，但你要考虑其他类型。
    慎用那些看似巧妙的方法，可能有坑。