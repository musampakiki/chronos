import React, {useEffect, useState} from 'react';

import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
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








const usePersonStyles = makeStyles(() => ({
    text: {
        fontFamily: 'Barlow, san-serif',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    name: {
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
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
        padding: '0.125rem 0.75rem',
        borderColor: '#becddc',
        fontSize: '0.75rem',
        color: '#444444',
    },
}));

const PersonItem = ({ src, name, friendCount }) => {
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
                        {friendCount} mutual friends
                    </div>
                </Item>
                <Item position={'middle'}>
                    <Button className={styles.btn} variant={'outlined'}>
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
        margin: '0 20px',
    }
}));

const ListId = (nousername, hideavatar) => {
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

    // if (listFetching || listsFetching) {
    //     return <Skeleton />;
    // }

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
                    <div className={`${classes.foo}`} ></div>
                    <Item stretched className={styles.headline}>{list.name}</Item>
                    <Item className={styles.actions}>
                        {/*<Link className={styles.link}>Refresh</Link> •{' '}*/}
                        {/*<Link className={styles.link}>See all</Link>*/}
                        <Link to="/lists">
                            <Button grey>RETURN</Button>
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
                    <li><Link to={`/tasks/${task.id}`} key={index}> {task.title}</Link></li>
                )}


                {/*<Divider variant={'middle'} className={styles.divider} />*/}

                {/*<PersonItem name={list.User?.username} friendCount={6} src={list.User?.avatar} />*/}
                {/*<Divider variant={'middle'} className={styles.divider} />*/}

                {/*<PersonItem name={'Amber Matthews'} friendCount={6} src={'https://i.pravatar.cc/300?img=10'} />*/}
                {/*<Divider variant={'middle'} className={styles.divider} />*/}


                {/*<PersonItem name={'Russel Robertson'} friendCount={2} src={'https://i.pravatar.cc/300?img=20'} />*/}
                {/*<Divider variant={'middle'} className={styles.divider} />*/}

                {/*<PersonItem name={'Kathleen Ellis'} friendCount={2} src={'https://i.pravatar.cc/300?img=30'} />*/}
            </Column>
        </>
    );
}

export default ListId;