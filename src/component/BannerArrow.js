import React from "react"
import "../css/bannerArrow.less";
export default class BannerArrow extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <div className='banner-arrow'>
            <a href="javascript:;" className='arrowLeft'></a>
            <a href="javascript:;" className='arrowRight'></a>
        </div>
    }
}
