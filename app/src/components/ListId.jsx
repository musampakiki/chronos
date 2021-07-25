import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";
import {Close, Edit} from "@material-ui/icons";
import NoResults from "../components/NoResults";
import Skeleton from "../skeletons/HomeSkeleton";
import EditList from "./EditList"
import DeleteList from "./RemoveList"


import { clearList, getList,} from "../reducers/listReducer";
import { getLists } from "../reducers/listsReducer";
import {
    // client,
    timeSince,
} from "../utils/index";
// import Button from "../styles/Button";


import cx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { createTheme } from '@material-ui/core/styles'

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 70% 1fr;
//   grid-gap: 2rem;
//   padding: 1.3rem;
//   padding-bottom: 7rem;
//
//   .article-container .article-info {
//     margin-top: 1rem;
//     margin-bottom: 1rem;
//   }
//
//   .article-info span {
//     color: ${(props) => props.theme.secondaryColor};
//   }
//
//   .channel-info-flex {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//
//   .article-info-stats {
//     display: flex;
//     align-items: center;
//   }
//
//   .article-info-stats div {
//     margin-left: 6rem;
//     position: relative;
//     top: -2px;
//   }
//
//   .channel-info-flex button {
//     font-size: 0.9rem;
//   }
//
//   .channel-info-description {
//     padding-top: 1rem;
//     border-bottom: 1px solid ${(props) => props.theme.darkGrey};
//     border-top: 1px solid ${(props) => props.theme.darkGrey};
//   }
//
//   .channel-info-description p {
//     font-size: 0.9rem;
//     padding: 1rem 0;
//   }
//
//   .related-articles img {
//     height: 140px;
//   }
//
//   .related-articles div {
//     margin-bottom: 1rem;
//   }
//
//   svg {
//     fill: ${(props) => props.theme.darkGrey};
//   }
//
//   ${(props) =>
//     props.filledLike &&
//     css`
//       .like svg {
//         fill: ${(props) => props.theme.blue};
//       }
//     `}
//
//   ${(props) =>
//     props.filledDislike &&
//     css`
//       .dislike svg {
//         fill: ${(props) => props.theme.blue};
//       }
//     `}
//
// 	@media screen and (max-width: 930px) {
//     grid-template-columns: 90%;
//     .related-articles {
//       display: none;
//     }
//   }
//
//   @media screen and (max-width: 930px) {
//     grid-template-columns: 1fr;
//   }
//
//   @media screen and (max-width: 425px) {
//     .article-info-stats div {
//       margin-left: 1rem;
//     }
//   }
// `;

// const ColorToCard = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   box-shadow: 0 0 3px #888888;
//   background-color: ${(props) => props.color};
// `;


const usePersonStyles = makeStyles(() => ({
    text: {
        fontFamily: 'Barlow, san-serif',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    title: {
        marginRight: '10rem',
        textAlign: 'center',
    },
    name: {
        fontWeight: 600,
        fontSize: '1rem',
        color: 'rgba(80, 120, 250, 1)',
    },
    caption: {
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
    },
    avatarImg: {
        marginRight: '100px',
        marginLeft: '20px',
    },
    avatarName:{
        marginRight:'20px',
        color: '#999999',
    },
    btn: {
        borderRadius: 20,
        padding: '0.2rem 0.75rem',
        borderColor: '#999999',
        fontSize: '0.75rem',
        color: '#999999',
    },
}));
const PersonItem = ({ src, name, friendCount, link, title }) => {
    const avatarStyles = useDynamicAvatarStyles({ size: 56 });
    const styles = usePersonStyles();
    return (
        <Row gap={2} p={2.5}>
            <Item>
                <Avatar classes={avatarStyles} src={src} />
            </Item>
            <Row wrap grow gap={0.5} minWidth={0}>
                <Item grow minWidth={0}>
                    <div className={cx(styles.name, styles.text)}>{name}</div>
                    <div className={cx(styles.caption, styles.text)}>
                        {friendCount} mutual user
                    </div>
                </Item>
                <Item position={'middle'}>
                    <h3 className={styles.title}>{title}</h3>
                </Item>
                <Item position={'middle'}>
                    <Button className={styles.btn} variant={'outlined'} link={link}>
                        Follow
                    </Button>
                </Item>
            </Row>
        </Row>
    );
};
const useStyles = makeStyles(() => ({
    card: {
        width: '90%',
        marginTop: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 16,
        boxShadow: '0 0 5px 0 rgba(80, 120, 250, 1)',
        overflow: 'hidden',
    },
    header: {
        fontFamily: 'Barlow, san-serif',
        backgroundColor: 'rgba(220,220,220, 0.9)',
    },
    foo: props => ({
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        marginRight: '20px',
        backgroundColor: props.backgroundColor,
    }),

    headline: {
        color: '#122740',
        fontSize: '1.25rem',
        fontWeight: 600,
    },
    link: {
        color: '#2281bb',
        padding: '0 0.25rem',
        fontSize: '0.875rem',
    },
    actions: {
        color: '#BDC9D7'
    },
    divider: {
        backgroundColor: '#d9e2ee',
        margin: '15px 20px',
    }
}));


const ListId = () => {
    const styles = useStyles();
    const { listId } = useParams();

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false)

    const { isFetching: listFetching, data: list } = useSelector(
        (state) => state.listReducer
    );
    const { isFetching: listsFetching, lists: next } = useSelector(
        (state) => state.listsReducer
    );

    const props = { backgroundColor: `${list.Color?.hex}`}
    const classes = useStyles(props);


    useEffect(() => {
        dispatch(getList(listId));
        dispatch(getLists());


        return () => {
            dispatch(clearList());
        };
    }, [dispatch, listId]);

    // console.log("looking after dispatch", list, "end looking")

    if (listFetching || listsFetching) {
        return <Skeleton />;
    }

    if (!listFetching && !list) {
        return (
            <NoResults
                title="Page not found"
                text="The page you are looking for is not found or it may have been removed"
            />
        );
    }
    console.log("info list",list)
    return (
        <>
            <NoSsr>
                <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
            </NoSsr>
            <Column p={0} gap={0} className={styles.card}>
                        <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
                            <Item className={`${classes.foo}`}></Item>
                            <Item stretched className={styles.headline}><h2>{list.name}</h2></Item>
                                <Item className={styles.link}>{timeSince(list.createdAt)} ago</Item>
                            <Item className={styles.actions}>
                                <Link to="/lists">
                                    <Button>RETURN</Button>
                                </Link>
                                <Link to={`/lists/${list.id}/edit`} onClick={() => setShowModal(true)}>
                                    <Button><Edit /> EDIT</Button>
                                </Link>
                                {showModal && <EditList closeModal={closeModal} />}
                                <Link to={`/lists/${list.id}/remove`} onClick={() => setShowModal(true)}>
                                    <Button><Close /> DELETE</Button>
                                </Link>
                                {showModal && <DeleteList closeModal={closeModal} />}
                            </Item>
                        </Row>

                    {list.tasks.map((task, index) =>
                        <Link key={index} to={`/tasks/${task.id}`}>
                            {/*<h3 key={task.id}>{task.title}</h3>*/}
                            <PersonItem
                                src={task.User?.avatar}
                                name={task.User?.username}
                                title={task.title}
                                link={`/tasks/${task.id}`}/>
                            <Divider variant={'middle'} className={styles.divider} />
                        </Link>
                    )}

            </Column>

        </>
    );
};

export default ListId;
