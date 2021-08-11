import React from "react";
import moment from "moment";
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {timeSince} from "../utils";
import Avatar from "../styles/Avatar";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: '20px',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        position: 'relative',
        maxWidth: 400,
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
        position: 'absolute',
        display:'flex',
        alignItems: "center",
        paddingLeft: 10,
        width: 200,
        height: 100,
        right:10,
        top:20,
        borderRadius: spacing(2),
        '& span' :{
            fontSize: spacing(3),
            lineHeight: spacing(1),
            paddingLeft: 5,

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
    const dispatch = useDispatch();
    const { isFetching, tasks } = useSelector((state) => state.tasksReducer);

    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();




    const props = { backgroundColor: `${task.List?.colorId}`}
    console.log('смотрим пропс',props)
    const classes = useStyles(props);


if(nousername) {
   return toast.error("no user name");
}
    if(hideavatar) {
        return toast.error("hide avatar");
    }
    if(isFetching && task.User.avatar === undefined){
        return toast.error("username undefined, please refresh page");
    }


    return (

        <Card className={cx(styles.root, shadowStyles.root)}>

             <CardContent>
                 <span>{timeSince(task.createdAt)} ago</span>

                <TextInfoContent
                    classes={contentStyles}
                    // overline={Date}
                    heading={task.title}
                    body={`description: ${task.description}`}
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
                   {/* <div className={classes.avatar}>
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
                    </div>*/}





            </CardContent>

        </Card>

    );
};

export default TaskCard;
