import React from "react"
import PropTypes from "prop-types";
import "../css/bannerFocus.less";
export default class BannerFocus extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <ul className='banner-focus'>
            <li className='active'></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    }
}
