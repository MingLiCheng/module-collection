export async function routerBeforeEachFunc(to: any, from: any, next: any) {
           if (to.meta && to.meta.title) {
               document.title = to.meta.title
           } else {
              // document.title = to.meta.title
           }
           next()
       }

// 进入路由后
export function routerAfterEachFunc(to: any, from: any) {}
