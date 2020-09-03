记录写此项目时踩到的各种坑

### 请求接口
1. 遇到这种样式的接口users/:uId/state/:type，需要直接在url上拼接参数。url:`/users/${uId}/state/${tate}`

2. body参数
    大概就是不直接拼接在url上的参数

### elementUI的坑
1. 分页

使用分页时，由于数据是动态的，加载页面时，会优先使用预先写好的值，所以后面点击页数时，可能不会高亮，解决办法，使用v-if判断总条数是否加载完毕

2. dialog父子组件相互监听visible的变化。（不是很懂为啥要这么弄）

需要在父组件引用时，在子组件上使用v-model绑定一个属性值，控制子组件的显示，
子组件使用props接收这个值，并监听重新将此值赋值给visible的属性上。自己的visible属性也需要监听，并提交一个$emit事件`（this.$emit('input',val)`）。
由此实现双向监听visible的变化。

### 提交参数前的数据操作
1. 拷贝数据 `Object.assign(target, ...sources)`,主要用于数据的合并。

显示的数据可能比需要提交的数据多，因此在提交前需要对数据做处理，使用Object.assign()拷贝数据。（浅拷贝）
`let obj = Object.assign(data)`, 直接这么使用，修改obj时，会将元数据一起修改，所以不能这么使用。相当于是直接将data重新复制给obj，内存地址并没有变化，还是同一个东西
`let obj = Object.assign({}, data)`, 将data和一个空对象进行合并，产生新的对象obj，内存地址改变。

### vue-router
1. 全局路由守卫

使用路由守卫时，可能会进入一个死循环

```
router.beforeEach((to, from, next) => {
    //to 要跳转的路径
    // from  从那里跳转过来
    //next 是一个函数,表示放行
    if (to.path === '/login') {
        next()
    } else {
        const token = sessionStorage.getItem('token')
        if (!token) { //没有这个会进入router死循环
            next('/login')
        }else{
            next() 
        }
    }
})
```

2. 使用router.push 和 router.replace,

使用这两种方法跳转路由时，控制台可能会报`NavigationDuplicated`，需要在后面写一个catch，抛出异常
```
vue-router 更新后 push和replace需要写then和catch
router.push(location).then(onComplete).catch(onAbort)
```
最终解决办法参考：https://www.cnblogs.com/fsg6/p/13298470.html 未测试过