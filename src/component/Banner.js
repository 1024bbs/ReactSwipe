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
            step:1,
            speed:'.3s',
        }
    }
    componentWillMount(){
        let {IMG_DATA}=this.props;
        IMG_DATA.unshift(IMG_DATA[IMG_DATA.length-1])
        IMG_DATA.push(IMG_DATA[1]);
        this.IMG_DATA=IMG_DATA;
    }
    componentDidMount(){
        this.autoMove();
    }
    shouldComponentUpdate(nextProps,nextState){
        let {step}=nextState,
           len=this.IMG_DATA.length
        //右边界处理
        if(step>=len){
            this.setState({
                step:1,
                speed:'0s',
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        step:2,
                        speed:'.3s'
                    })
                },0)//只是想把操作设置为异步操作而已
            })

            return false
        }

        //左边界处理
        if(step<=-1){
            this.setState({
                step:len-2,
                speed:'0s',
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        step:len-3,
                        speed:'.3s'
                    })
                },0)
            })
            return false
        }
        return true
    }
    render(){
        let IMG_DATA=this.IMG_DATA,
           {step,speed}=this.state;

        const wrapperStyle={
            width:`${IMG_DATA.length*1000}px`,
            left:`${-step*1000}px`,
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
            <BannerArrow callback={this.handArrow} step={step}/>
        </div>
    }

    //设置自动轮播
    autoMove=()=>{
        this.autoTimer=setInterval(()=>{
            let step=this.state.step;
            step++;
            this.setState({step})
        },this.props.interval)
    }

    //左右切换传递给子组件的方法
    handArrow=(newStep)=>{
        this.setState({
            step:newStep
        })
    }
}
