import React from "react"
import PropTypes from "prop-types";
import "../css/banner.less"
import BannerFocus from "./BannerFocus";
import BannerArrow from "./BannerArrow";

export default class Banner extends React.Component{
    static defaultProps={
        /*设置默认值*/
        IMG_DATA:[],
        interval:2000
    }
    static propTypes={
        /*设置属性规则*/
        IMG_DATA:PropTypes.array.isRequired,
        interval:PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state={
            step:1,//记录当前需要展示轮播区域slide的索引
            speed:'.3s',//控制切换的速度(立即回到某一张的时候 需要把速度设置为0)
        }
    }
    componentWillMount(){
        //为了实现无缝衔接 我们把IMG_DATA进行修改
        //1.把真实的第一张克隆一份放在末尾
        //2.把真是的最后一张克隆一份放到开头
        //----
        //1.我们这一步操作应该处在第一次加载之前(执行一次即可 不能放在render中,这样的话每一次重新渲染都会新加很多数据)
        //2. 放在这里处理,想在render获取最新的数据,我们可以把最新的数据挂载到state上,或者挂载到实例上(但是不能修改props的值)

        //3.但是这时候焦点是克隆后的数量  我们应该显示真是的数量 一一对应
        let {IMG_DATA}=this.props;
        IMG_DATA.unshift(IMG_DATA[IMG_DATA.length-1])
        IMG_DATA.push(IMG_DATA[1]);
        this.IMG_DATA=IMG_DATA;
    }
    componentDidMount(){
        //=>第一次渲染完成
        //=>设置定时器 开启自动轮播(不死直接操作wrapper  而是操作step,控制组件重新渲染,实现wrapper的运动)
        setInterval(()=>{
            let step=this.state.step;
            step++;
            this.setState({step})
        },this.props.interval)
    }
    shouldComponentUpdate(nextProps,nextState){
        //=>这里面通过this.state获取的state的信息还是修改之前的.想要获取最新的 我们可以基于传递的形参获取
        let {step}=nextState;
        if(step>=this.IMG_DATA.length){
            //-> 情况:interval ms后 state再次累加,累加的结果已经超过克隆的边界了
            //-> 处理: 阻止重新渲染/设置step为1(让其运动到真实的第一张)/当立即运动完成之后 我们设置step为2 ,让其300毫秒(过渡动画的速度)运动到真实第二张
            this.setState({
                step:1,
                speed:'0s',
            },()=>{
                //=>setState是异步操作 回调函数代表状态改变后此时我们应该等到立即回到第一张后,让其运动到第二张(此时应该有过渡动画了)
                setTimeout(()=>{
                    this.setState({
                        step:2,
                        speed:'.3s'
                    })
                },0)//只是想把操作设置为异步操作而已
            })

            return false
        }
        return true
    }
    render(){
        let IMG_DATA=this.IMG_DATA,
           {step,speed}=this.state;

        //=> 动态计算wrapper的宽度
        const wrapperStyle={
            width:`${IMG_DATA.length*1000}px`,
            left:`${-step*1000}px`,
            //=>设置过渡效果:当wrapper的left值改变的时候,可以按照过渡动画完成
            transition:speed,
        }

        return <div className='container'>
            {/*轮播区域*/}
            <div className='wrapper' style={wrapperStyle}>
                {
                    IMG_DATA.map(({img,title='默认显示内容'},index)=>{
                        return <div className='slide' key={index}>
                            <img src={img} alt={title}/>
                        </div>
                    })
                }
            </div>
            {/* focus 焦点*/}
            <BannerFocus num={IMG_DATA.length-2} cur={step}/>
            {/*arrow 箭头切换*/}
            <BannerArrow/>
        </div>
    }
}
