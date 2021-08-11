import React from "react";
// import Colors from "./Colors"
// import styled from "styled-components";


import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';


const useStyles = makeStyles(({ spacing }) => ({
    root: {
        marginTop: spacing(2),
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        position: 'relative',
        maxWidth: 200,
        marginLeft: 'auto',
        overflow: 'initial',
        backgroundColor: 'rgba(220,220,220, 0.9)',
        color: '#444444',
        textAlign: 'center',
        marginBottom: spacing(2),
        paddingBottom: spacing(2),
    },
    foo: props => ({
        backgroundColor: props.backgroundColor,
        boxShadow: '0 0 5px rgba(80, 120, 250, 1)',
        width: '100px',
        marginTop: spacing(1),
        height: '100px',
        borderRadius: '50px',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: spacing(2),
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






const ColorCard = ({ color }) => {

    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    const props = { backgroundColor: `${color.hex}`}
    console.log('смотрим пропс',props)
    const classes = useStyles(props);
    // const Date = list.createdAt

    return (
<>
        <Card className={cx(styles.root, shadowStyles.root)}>

                <TextInfoContent
                    classes={contentStyles}
                    // overline={Date}
                    heading={color.name}
                    body={color.hex}
                />

                    <div className={`${classes.foo}`} />

        </Card>
</>
    );
};








export default ColorCard;
