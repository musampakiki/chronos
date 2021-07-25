import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";
import {Close, Edit} from "@material-ui/icons";
import NoResults from "../components/NoResults";
import Skeleton from "../skeletons/HomeSkeleton";
import EditColor from "./EditColor"
import DeleteColor from "./RemoveColor"


import { clearColor, getColor,} from "../reducers/colorReducer";
import { getColors } from "../reducers/colorsReducer";
import {
    // client,
    timeSince,
} from "../utils/index";
import Button from "../styles/Button";






const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .article-container .article-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .article-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .article-info-stats {
    display: flex;
    align-items: center;
  }

  .article-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-articles img {
    height: 140px;
  }

  .related-articles div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-articles {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .article-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const ColorToCard = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 0 3px #888888;
  background-color: ${(props) => props.color};
`;


const ColorId = () => {
    const { colorId } = useParams();

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false)

    const { isFetching: colorFetching, data: color } = useSelector(
        (state) => state.colorReducer
    );
    const { isFetching: colorsFetching, colors: next } = useSelector(
        (state) => state.colorsReducer
    );

    useEffect(() => {
        dispatch(getColor(colorId));
        dispatch(getColors());


        return () => {
            dispatch(clearColor());
        };
    }, [dispatch, colorId]);

    console.log("looking after dispatch", color, "end looking")

    if (colorFetching || colorsFetching) {
        return <Skeleton />;
    }

    if (!colorFetching && !color) {
        return (
            <NoResults
                title="Page not found"
                text="The page you are looking for is not found or it may have been removed"
            />
        );
    }

    return (
        <Wrapper>
            <div className="article-container">
                <div className="article-info">
                    <div className="article-info-stats">
                        <p>
                            <span>{timeSince(color.createdAt)} ago</span>
                        </p>

                        <div className="likes-dislikes flex-row">
                            <Link to="/colors">
                                <Button grey>RETURN</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="channel-info-description">
                    <div className="channel-info-flex">
                        <div className="channel-info flex-row">
                            <img
                                className="avatar md"
                                src={color.User?.avatar}
                                alt="channel avatar"
                            />

                            <div className="channel-info-meta">
                                <h4>
                                    <Link to={`/channel/${color.userId}`}>
                                        {color.User?.username}
                                    </Link>
                                </h4>

                            </div>
                            <ColorToCard color={color.hex} />
                        </div>

                    </div>

                    <h1>{color.hex}</h1>
                    <p>{color.name}</p>

                </div>
                <Link to={`/colors/${color.id}/edit`} onClick={() => setShowModal(true)}>
                    <Edit />
                </Link>
                {showModal && <EditColor closeModal={closeModal} />}
                <Link to={`/colors/${color.id}/remove`} onClick={() => setShowModal(true)}>
                    <Close />
                </Link>
                {showModal && <DeleteColor closeModal={closeModal} />}
            </div>

        </Wrapper>
    );
};

export default ColorId;
