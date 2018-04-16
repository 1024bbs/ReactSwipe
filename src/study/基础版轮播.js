import React from "react"
import PropTypes from "prop-types";
import "../css/banner.less"
import BannerFocus from "./BannerFocus";
import BannerArrow from "./BannerArrow";

export default class Banner extends React.Component{
    static defaultProps={
        /*设置默认值*/
        IMG_DATA:[],
        interval:3000
    }
    static propTypes={
        /*设置属性规则*/
        IMG_DATA:PropTypes.array.isRequired,
        interval:PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state={
            step:0,//记录当前需要展示轮播区域slide的索引
        }
    }
    componentDidMount(){
        //=>第一次渲染完成
        //=>设置定时器 开启自动轮播(不死直接操作wrapper  而是操作step,控制组件重新渲染,实现wrapper的运动)
        setInterval(()=>{
            let step=this.state.step;
            step++;
            if (step>=this.props.IMG_DATA.length){
                step=0
            }
            this.setState({step})
        },this.props.interval)
    }
    render(){
        const {IMG_DATA}=this.props,
           {step}=this.state;

        //=> 动态计算wrapper的宽度
        const wrapperStyle={
            width:`${IMG_DATA.length*1000}px`,
            left:`${-step*1000}px`,
            //=>设置过渡效果:当wrapper的left值改变的时候,可以按照过渡动画完成
            transition:'.3s'
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
            <BannerFocus num={IMG_DATA.length} cur={step}/>
            {/*arrow 箭头切换*/}
            <BannerArrow/>
        </div>
    }
}
