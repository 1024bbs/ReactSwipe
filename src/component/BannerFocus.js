import React from "react"
import PropTypes from "prop-types";
import "../css/bannerFocus.less";
export default class BannerFocus extends React.Component{
    static defaultProps={
        cur:0
    }
    static propTypes={
        cur:PropTypes.number,
        num:PropTypes.number.isRequired
    }
    constructor(props) {
        super(props)
    }
    render(){
        let {num,cur:step}=this.props;

        //处理左右边界step的值 让其和focus的索引正对应
        step--;
        switch(step){
            case -1:
                step=num-1;
                break;
            case num:
                step=0;
                break;
        }

        return <ul className='banner-focus'>
            {
                new Array(num).fill('').map((item,index)=>{
                    return <li key={index} className={index===step?'active':''}></li>
                })
            }
        </ul>
    }
}
