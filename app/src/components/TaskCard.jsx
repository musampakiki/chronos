import React from "react";
import Tasks from "./Tasks"
import styled from "styled-components";


const Wrapper = styled.div`
`




const TaskCard = ({ task }) => {

    return (

        <Wrapper>

            <div className="Article-info-container">

                <div className="Article-info">
                    <div>
                        {task.title.length > 40
                            ? task.title.substring(0, 40) + "..."
                            : task.title}
                    </div>


                </div>
                <div>
                    <p className="secondary">
                        <span>list: {task.List?.name}</span>
                    </p>

                </div>




            </div>

        </Wrapper>

    );
};

export default TaskCard;
