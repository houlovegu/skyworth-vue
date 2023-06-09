export function getAsyncRoutes(routes) {
    const res = []
    routes.forEach(route => {
         // 所有菜单都是二级结构，一级没有页面功能，所以只要添加二级菜单的路由
         if (route.childMenuInfoTreeSet.length !== 0) {
            const children = []
            route.childMenuInfoTreeSet.forEach(menu => {
                 // 二级菜单需匹配页面
                 children.push({path: menu.url,name: menu.componentName.split('/')[1],
                 // 此处使用require，由于import会有奇怪的错误
                 component: (resolve) => require([`@/views${route.componentName + menu.componentName}`], resolve),meta: { title: menu.menuName }})})
                 res.push({
                    path: route.url,
                    component: Layout,
                    children: children
                })
         }
        })
        
        return res
}