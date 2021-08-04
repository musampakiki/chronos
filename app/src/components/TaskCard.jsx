import React from "react";
// import Tasks from "./Tasks"
import moment from "moment";

import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {timeSince} from "../utils";
import Avatar from "../styles/Avatar";

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
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    foo: props => ({
        // backgroundColor: props.backgroundColor,
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        width: 200,
        marginRight: spacing(2),
        height: 0,
        paddingBottom: '55%',
        borderRadius: spacing(2),
        position: 'relative',
        textAlign: 'center',
        '& span' :{
            fontSize: spacing(3),
            lineHeight: spacing(1),

        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
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
        marginTop: '20px',
        justifyContent: 'space-evenly',
        backgroundColor: '#181818',
        borderRadius: '10px',
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    flexText: {
        width: 420,
        display: 'flex',
        flexDirection: 'row',
        margin: spacing(2),
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 12,
        '& span' :{
            fontSize: spacing(2),
        },
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



const TaskCard = ({ nousername, hideavatar, task }) => {
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    const props = { backgroundColor: `${task.Color?.hex}`}
    console.log('смотрим пропс',props)
    const classes = useStyles(props);





    return (

        <Card className={cx(styles.root, shadowStyles.root)}>

             <CardContent>
                 <span>{timeSince(task.createdAt)} ago</span>

                <TextInfoContent
                    classes={contentStyles}
                    // overline={Date}
                    heading={task.title}
                    body={task.description}
                />
                <div className={classes.flexText}>
                             <div className={`${classes.foo}`}>list name: <span>{task.List?.name}</span></div>
                    <div className={classes.text}>
                              <p><span>task:</span> {task.text}</p>
                              <p><span>completed:</span> {task.completed}</p>
                              <p><span>date start:</span> {`${moment(task.dataCreated).format('DD-MMM-yyyy, h:mm a')}`}</p>
                              <p><span>date end:</span> {`${moment(task.dataEnd).format('DD-MMM-yyyy, h:mm a')}`}</p>
                    </div>
                </div>
                    <div className={classes.avatar}>
                        <div>
                            {!hideavatar && (
                                <Avatar className={classes.avatarImg}
                                    // style={{ marginRight: "0.8rem" }}
                                        src={task.User.avatar}
                                        alt="channel avatar"
                                />
                            )}

                        </div>
                        {!nousername && (
                            <span className={classes.avatarName}>{task.User.username}</span>
                        )}
                    </div>




            </CardContent>

        </Card>

    );
};

export default TaskCard;
