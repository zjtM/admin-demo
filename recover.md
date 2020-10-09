记录写项目时踩到的各种坑

### vue-axios
1. 遇到这种样式的接口users/:uId/state/:type，需要直接在url上拼接参数。url:`/users/${uId}/state/${tate}`
2. body参数
    大概就是不直接拼接在url上的参数
3. post 请求使用 `application/x-www-form-urlencoded`格式
	这是方式是form表单的提交格式，参数格式为`name=张三&age=18`,axios默认的请求格式为json格式`{'name':'name','age':'18'}`，需要使用qs将格式转换为form表单提交模式
```js
	const qs = require('qs'); 
	const loginForm = qs.stringify(this.loginForm)
```

4. params和data的区别

   在使用axios时，注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。 

   　　因为params是添加到url的请求字符串中的，用于get请求。 

   　　而data是添加到请求体（body）中的， 用于post请求。
   
5. axios.creat

   创建axios实例，在创建实例时，允许配置各种参数。

   ```js
   const service = axios.create({
     // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
     // withCredentials: true, // send cookies when cross-domain requests
     timeout: 50000, // request timeout
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       },
     
     transformRequest: [function (data) { //在发送数据前修改数据格式，只修改post、put、patch
       // 将数据转换为表单数据
       
       return qs.stringify(data)
     }]
   })
   ```

   transformRequest：发送请求前，允许修改数据格式

   transformResponse：响应数据进入then/catch前，修改相应数据格式等。

6. Promise

   使用promise时，then和catch里面的返回函数写错了会报如下错误

   ![image-20200930111418742](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200930111418742.png)

### elementUI的坑

1. 分页

   使用分页时，由于数据是动态的，加载页面时，会优先使用预先写好的值，所以后面点击页数时，可能不会高亮，解决办法，使用v-if判断总条数是否加载完毕

2. dialog父子组件相互监听visible的变化。（不是很懂为啥要这么弄）

   需要在父组件引用时，在子组件上使用v-model绑定一个属性值，控制子组件的显示，
   子组件使用props接收这个值，并监听重新将此值赋值给visible的属性上。自己的visible属性也需要监听，并提交一个$emit事件`（this.$emit('input',val)`）。
   由此实现双向监听visible的变化。

3. message组件

   message需要的参数是string/vnode，传成其他的参数会报错，使用如下的写法即可

   ```js
   // 错误写法
   Message.error( error || 'Has Error' ) 
   // 正确写法
Message.error({ message: error || 'Has Error' })
   ```
   
   



### vue-router
1. 全局路由守卫

使用路由守卫时，可能会进入一个死循环

```javascript
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
```js
vue-router 更新后 push和replace需要写then和catch
router.push(location).then(onComplete).catch(onAbort)
```
最终解决办法参考：https://www.cnblogs.com/fsg6/p/13298470.html 未测试过

### this.$delete 和 delete

1. 删除数组
delete是js的原生方法，删除数组后，值变成undefined，不会改变数组长度
this.$delete是VUE提供的方法，删除数组值后，改变数组长度，变成一个新的数组

2. 删除对象
两者都可以删除对象中的属性
```js
//使用方法
delete obj.key
this.$delete(obj,'key')
```

### vue config 配置文件

1. webpack 配置 alias 路径别名
    vueCli3 不适用webpack.config 配置文件， 直接在vue.config中配置相关信息
    在webpack.config.js中，通过设置resolve属性可以配置查找“commonJS／AMD模块”的基路径，也可以设置搜索的模块后缀名，还可以设置别名alias。设置别名可以让后续引用的地方减少路径的复杂度

```js
const path = require('path') //需要引入path
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: { //类似于给src加上别名
        '@': resolve('src'),
        '_c': resolve('src/components')
      }
    }
  },
```

2. 代理设置
```js
    //设置代理
    proxy:{
      '/api':{
        target: process.env.VUE_APP_BASE_API,//目标API地址
        changeOrigin:true,//更改url地址
        ws:true,
        pathRewrite:{ 
          '^/api':'' //重写/api，如果请求的地址有问题，多半是这个地方重写错误。此处重写的地址会直接拼接到url上
        }
      }
    },
```

3. 配置多个代理
	代理可以配置多个，可以通过重写的路径来判断是走那个代理
```js
    //设置代理
    proxy:{
      '/API':{
        target: process.env.VUE_APP_BASE_API,//目标API地址
        changeOrigin:true,//更改url地址
        // ws:true,
        pathRewrite:{ 
          '^/API':'/API'  //根据此处来判断走的那个路径
        }
      },
      '/token':{
        target: process.env.VUE_APP_TOKEN_API,
        changeOrigin:true,
        pathRewrite:{
          '^/token':'/token' //根据此处来判断走的那个路径
        }
      }
    },

  // 请求头的baseURL就配置成/ 
    const service = axios.create({
      baseURL: '/', //配置baseURL的时候不写后面具体的代理路径
      timeout: 50000 // request timeout
    })

  // 请求的api在前面加上重写的路径， 用于区别到底是用的那个baseURL
    export function testApi(data){
      data = qs.stringify(data)
      return request({
        url:'/API/Bnd/qa', //写接口地址的时候再加重写的前缀
        method:'post',
        headers:{
          'Content-Type':'multipart/form-data'
        },
      data
      })
    }


    export function login(data) {
      return request({
        url: '/token',
        method: 'post',
        headers:{
          "Content-Type":'application/x-www-form-urlencoded', //只有登录和刷新token需要使用此种格式
        },
        data
      })
    }
```
### VUEX
1. 使用vuex储存数据时，如果是没有默认值的数据，直接储存，页面F5刷新后数据直接被刷掉，变成undefined，此时就需要借助本地会话或者cookie，先存，后赋值给vuex。

### cookie 和 token
1. 使用cookie保存数据，特殊字符会被自动转义（例如空格），拿出来的数据就不会获取到特殊字符。
2. token放在请求头中，通常由headers.Authorization携带过去，主要是用于后台验证前端请求的接口，不做登录验证。过期就重新刷新一次token，在登录的有效期内可以无限制的刷新token。
3. cookie 由前端自己保存，主要用于做登录的失效期。判断用户登录时间是否过期等。过期就重新登录。 如果cookie没有设置过期时间， 则效果和sessionStorage一样，关闭浏览器就销毁。

### eslint
1. 简单配置eslint
	直接使用eslint会有很多限制，使用 .eslintrc.js 文件配置规则， 使用 .eslintignore 文件忽略检查文件
```js
// .eslintrc.js
module.exports = {
    root: true,
    parserOptions: {
      sourceType: 'module',
      parser: "babel-eslint" 
    },
    parser: "vue-eslint-parser",
    env: {
      browser: true,
      node: true,
      es6: true, //使用es6语法
    },
    rules: {
      'no-console': 'off', //忽略console
      'no-debugger': 'off' //忽略debugger
    },
  }
------------------------------------------------------------

// .eslintignore 同.gitignore
build/*.js
src/assets
public
dist
src/*.vue
```

### es6
1. 获取对象的key和value
	可以直接使用 Object.keys(obj) 和 Object.values(obj) 获取， IE浏览器不支持
2. 拷贝数据 `Object.assign(target, ...sources)`,主要用于数据的合并。

显示的数据可能比需要提交的数据多，因此在提交前需要对数据做处理，使用Object.assign()拷贝数据。（浅拷贝）
`let obj = Object.assign(data)`, 直接这么使用，修改obj时，会将元数据一起修改，所以不能这么使用。相当于是直接将data重新复制给obj，内存地址并没有变化，还是同一个东西
`let obj = Object.assign({}, data)`, 将data和一个空对象进行合并，产生新的对象obj，内存地址改变。

### vue-element-admin

1. tagsview

   使用tegsView组件，需要将路由放在permission文件下的routes中，如果不用权限的话，需要删除tagsView文件中的相关代码。

   动态数据转成router时，一定要写name，不写name标签不会出来。

2. 动态路由生成侧边栏菜单

   用router.addRoutes()，添加路由，添加路由前需要将数据转成路由的格式

   处理后台传过来的数据，通过两次循环将数据的层级改成我需要的数据格式

   ```js
   newArr.forEach((item, index) => {
             if (item.parentId === '') {
               const obj = {
                 path: `/${item.url}`,
                 component: 'Layout',
                 id: item.id,
                 parentId: item.parentId,
                 name:item.url,
                 meta: { title: item.text }
               }
               menuLists.push(obj)
             }
             return menuLists
           })
   
           menuLists = menuLists.map((item, index) => {
             item.children = []
             for (let i = 0; i < newArr.length; i++) {
               if (newArr[i].parentId === item.id) {
                 const obj = {
                   path: `/${newArr[i].url}`,
                   component: newArr[i].url,
                   id: item.id,
                   parentId: item.parentId,
                   name:newArr[i].url,
                   meta: { title: newArr[i].text }
                 }
                 item.children.push(obj)
               }
             }
             return item
           })
   ```

   

   添加路由数据时需要做一次处理，

   ```js
   const actions = {
     // get user info
     getRouter({ commit }, routes) {
       return new Promise((resolve, reject) => {
         const accessedRoutes = filterAsyncRouter(routes)
         accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
         console.log(accessedRoutes)
         commit('SET_ROUTES', accessedRoutes)
         resolve(accessedRoutes)
       })
     }
   }
   // 遍历后台传来的路由字符串，转换为组件对象
   function filterAsyncRouter(asyncRouterMap) {
     return asyncRouterMap.filter(route => {
       delete route.id
       delete route.parentId
       if (route.component) {
         // Layout组件特殊处理
         if (route.component === 'Layout') {
           route.component = Layout
         } else {
           route.component = loadView(route.component)
         }
       }
       if (route.children != null && route.children && route.children.length) {
         route.children = filterAsyncRouter(route.children)
       }
       return true
     })
   }
   export const loadView = (view) => { // 路由懒加载
     return (resolve) => require([`@/views/${view}`], resolve)
   }
   
   ```

   最后在添加路由前，需要将更新好的数据复制给`router.options.routes = constantRoutes.concat(accessedRoutes)`，左侧菜单栏使用router.options.routes更新数据，完成后使用router.addRoutes()添加路由

   ```js
   const menuLists = store.getters.menuLists
             const accessedRoutes = await store.dispatch('permission/getRouter', menuLists)
             router.options.routes = constantRoutes.concat(accessedRoutes) //跟新所有路由并复制给router.options.routes
             router.addRoutes(accessedRoutes)
   ```

   

### scss

1. 深度选择器

   vue中需要修改单个组件中的三方组件样式，css中可以使用深度选择器（`>>>`） sass和less需要使用(`/deep/`)，而scss需要使用（`::v-deep`）

   ```scss
   ::v-deep .el-dialog__body{
     padding: 0px 20px !important;
   }
   ```

   

### JavaScript

1. href跳转页面

   浏览器兼容性问题使用`window.location.href('/login')`会报错，需要改成`window.location.href = '/login'`，如果火狐某些版本的浏览器还不兼容此写法，需要改成``window.location = '/login'``







