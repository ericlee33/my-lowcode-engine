{
"version": 1,
"createTimestamp": 1733842949325,
"schemas": [
{
"type": "page",
"id": "df3e5787-2891-4d46-9e44-6916060cb6a1",
"children": [
{
"type": "Button",
"id": "2af1aa63-6278-4fcb-8aea-8364132104a4",
"children": [],
"parentId": "df3e5787-2891-4d46-9e44-6916060cb6a1"
}
],
"parentId": null
}
],
"dataSource": [
{
"name": "test",
"id": "0394acbb-0846-4546-ac04-44644522d536",
"type": "api",
"api": "http://localhost:3000/api/hello"
}
]
}

# highlights

- 拖拽
  组件产生 id

- 嵌套
- devtools
- setter

# 问题

- 响应式拖拽按钮之后，monaco 没更新
- 点击左下角 reset 之后，页面没更新

## 思考

- 只深度监听底下的值，而不是 ref！！！比如 message 的变化不被监听，只监听 message.abc
- 不要重新赋值，会导致响应式失效，所以要 extends

you can't re-assign another value to the observable variable, it'll destroy the observable. You need to mutate the observable. For example, you can directly assign values to existing properties or use extendObservable for assigning new properties to observable object.
https://stackoverflow.com/questions/49436754/mobx-observable-not-triggering-changes
