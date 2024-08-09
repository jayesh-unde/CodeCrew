import React from "react";
import "../index.css";
import Card from "./Card";
import data from "../assets/data";

const Holder = () => {

    const {imagePaths, titles, descriptions} = data;

    return (
        <>
            <div class="main-card-holder">
                <Card imagePath = {imagePaths[0]} title = {titles[0]} description = {descriptions[0]}/>
                <Card imagePath = {imagePaths[1]} title = {titles[1]} description = {descriptions[1]}/>
                <Card imagePath = {imagePaths[2]} title = {titles[2]} description = {descriptions[2]}/>
            </div>
        </>
    );
}
export default Holder;