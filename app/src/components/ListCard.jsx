import React from "react";
import Avatar from "../styles/Avatar";
import { timeSince } from "../utils";
// import moment from "moment"

import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: '20px',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        position: 'relative',
        maxWidth: 500,
        marginLeft: 'auto',
        overflow: 'initial',
        backgroundColor: 'rgba(220,220,220, 0.9)',
        color: '#444444',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    foo: props => ({
        backgroundColor: props.backgroundColor,
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        width: '88%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-1),
        height: 0,
        paddingBottom: '55%',
        borderRadius: spacing(2),
        position: 'relative',
        [breakpoints.up('md')]: {
            width: '100%',
            marginLeft: spacing(-4),
            marginTop: 0,
            transform: 'translateX(-8px)',
        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: props.backgroundColor,
            boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
            borderRadius: spacing(2),
            opacity: 0.5,
        },
    }),
    avatar: {
        paddingTop: '10px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        // paddingBottom: spacing(1),
        marginTop: '20px',
        justifyContent: 'space-evenly',
        backgroundColor: '#181818',
        borderRadius: '10px',
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        marginLeft: 'auto',
        marginRight: 'auto',

},
    avatarImg: {
      marginRight: '100px',
      marginLeft: '20px',
    },
    avatarName:{
      marginRight:'20px',
        color: '#999999',
    },
    content: {
        padding: 24,
        color:'#999999',
    },
    cta: {
        marginTop: spacing(-5),
        color:'#999999',
    },
}));

const ListCard = ({ nousername, hideavatar, list }) => {
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    const props = { backgroundColor: `${list.Color?.hex}`}
    console.log('смотрим пропс',props)
    const classes = useStyles(props);
    // const Date = list.createdAt

    return (

        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <span>{timeSince(list.createdAt)} ago</span>
                <TextInfoContent
                    classes={contentStyles}
                    // overline={Date}
                    heading={list.name}
                    body={
                        ''
                    }
                />
                <div className={`${classes.foo}`} />
                <div className={classes.avatar}>
                    <div>
                                         {!hideavatar && (
                         <Avatar className={classes.avatarImg}
                          // style={{ marginRight: "0.8rem" }}
                           src={list.User.avatar}
                             alt="channel avatar"
                         />
                     )}

                </div>
                {!nousername && (
                    <span className={classes.avatarName}>{list.User.username}</span>
                )}
            </div>
            </CardContent>
        </Card>

    );
};

export default ListCard