import React from "react";
import "../index.css";

const Card = (props) => {
    const {imagePath, title, description} = props;

return (

    <>
        <div className="card">
            <div className="card-container">
                <span className="card-title">{title}</span>
                <img src={imagePath} className="card-image" alt="" />
                <div className="card-description">{description}</div>
            </div>
        </div>
    </>
);
}
export default Card;