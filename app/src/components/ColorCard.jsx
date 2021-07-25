import React from "react";
// import Colors from "./Colors"
// import styled from "styled-components";









const ColorCard = ({ color }) => {

    return (

        <>

            <div className="Article-info-container">

                <div className="Article-info">
                    <div>
                        {color.hex.length > 40
                            ? color.hex.substring(0, 40) + "..."
                            : color.hex}
                    </div>

                </div>
                <div>
                        <p className="secondary">
                              <span>color: {color.name}</span>
                        </p>

                </div>




            </div>

        </>

    );
};








export default ColorCard;
