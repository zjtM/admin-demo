const BaseTool = {
    Strorege: {
        //localStrorege
        setStrorage(StorageName,value){
            localStorage.setItem(StorageName,JSON.stringify(value)) //JSON.stringify转成json格式
        },
        getStrorage(StorageName){
            if(!StorageName) return
            JSON.parse(localStorage.getItem(StorageName)) //JSON.parse 转成js对象
        },
        removeStrorage(StorageName){
            localStorage.removeItem(StorageName)
        },
        clearStrorage(){
            localStorage.clearStrorege()
        },
        //sessionStorege
        setSessionStorage(StorageName,value){
            sessionStorage.setItem(StorageName,JSON.stringify(value)) //JSON.stringify转成json格式
        },
        getSessionStorage(StorageName){
            if(!StorageName) return
            JSON.parse(sessionStorage.getItem(StorageName)) //JSON.parse 转成js对象
        },
        removeSessionStorage(StorageName){
            sessionStorage.removeItem(StorageName)
            
        },
        clearSessionStorage(){
            sessionStorage.clearStrorege()
        },
    }
}
export default BaseTool