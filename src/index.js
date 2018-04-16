import React from "react"
import ReactDom,{render} from "react-dom"
import "./css/reset.min.css";
import Banner from "./component/Banner";

/*--准备轮播图需要的数据(真正的应该是从服务器获取)*/
const IMG_DATA=[{
    id:1,
    title:'hello你好',
    img: require('./images/1.jpg')
},{
    id:2,
    title:'world世界',
    img: require('./images/2.jpg')
},{
    id:3,
    title:'hello,world你好世界',
    img: require('./images/3.jpg')
}];

render(<div>
    <Banner IMG_DATA={IMG_DATA}/>
</div>,window.root)

/*
* 在基于react 框架使用webpack打包  在js(或者是jsx)中使用图片 我们不能直接给图片src图片赋值相对的地址,这样编译完成后 是找不到资源文件的  需要把使用的图片通过require导入进来,然后赋值给src
*    <img src={require('../images/1.jpg')} alt=""/>
*
*    在js中修改css3中过渡动画的样式
*    div.style.transitionDuration="0s"
*    div.style.transitionDuration="0.3s"
*
*    第一条指令发送给浏览器,浏览器没有立即处理,他是等当前同步任务队列中的任务都完成,才会进行处理;此时如果同步任务队列中出现了第二条类似的指令,最后浏览器以最后一次发送的指令为执行标准:想要解决这个问题,我们可以把第二次指令写成异步操作;

* */