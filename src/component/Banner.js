import React from "react"
import PropTypes from "prop-types";
import BannerArrow from "./BannerArrow";
import "../css/banner.less";
export default class Banner extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <div className='container'>
            {/*轮播区域*/}
            <div className='wrapper'>
                <div className='slide'>
                    <img src="" alt=""/>
                </div>
            </div>
            {/* focus 焦点*/}
            <BannerFocus/>
            {/*arrow 箭头切换*/}
            <BannerArrow/>
        </div>
    }
}
