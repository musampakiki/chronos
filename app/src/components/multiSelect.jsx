// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// // import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// // import NativeSelect from '@material-ui/core/NativeSelect';
//
// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(3),
//         minWidth: 120,
//         backgroundColor: theme.palette.background.paper,
//         border: '1px solid #ced4da',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },
// }));
//
// export default function NativeSelects() {
//     const classes = useStyles();
//     const [state, setState] = React.useState({
//         age: '',
//         name: 'hai',
//     });
//
//     const handleChange = (event) => {
//         const name = event.target.name;
//         setState({
//             ...state,
//             [name]: event.target.value,
//         });
//     };
//
//     return (
//         <div>
//             <FormControl variant="outlined" className={classes.formControl}>
//                 <InputLabel htmlFor="outlined-age-native-simple">Colors</InputLabel>
//                 <Select
//                     native
//                     value={state.age}
//                     onChange={handleChange}
//                     label="Age"
//                     inputProps={{
//                         name: 'age',
//                         id: 'outlined-age-native-simple',
//                     }}
//                 >
//                     <option aria-label="None" value="" />
//                     <option  value={11}>11</option>
//                     <option  value={12}>12</option>
//                     <option  value={13}>13</option>
//                 </Select>
//             </FormControl>
//         </div>
//     );
// }
