require.config({
    paths:{
        jquery:'jquery-3.3.1',
        common:'common',
        base:'base',
        xZoom:'../lib/jquery-xZoom/jquery.xZoom'
    },
    // 配置依赖
    shim:{
        common:['jquery'],
        xZoom:['jquery']
    }
});