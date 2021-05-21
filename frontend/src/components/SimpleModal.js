// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import { Avatar, Grid, TextField } from "@material-ui/core";

// function getModalStyle() {
//   return {
//     top: `50%`,
//     left: `50%`,
//     transform: `translate(-50%, -51%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// function SimpleModal() {
//   const classes = useStyles();
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const body = (
//     <div style={modalStyle} className={classes.paper}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             autoComplete="name"
//             name="user[name]"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             variant="outlined"
//             required
//             fullWidth
//             id="name"
//             label="Name"
//             autoFocus
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             variant="outlined"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="user[email]"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             autoComplete="email"
//           />
//         </Grid>
//         <Grid item xs={3} sm={2}>
//           <Avatar src={avatar}></Avatar>
//         </Grid>
//         <Grid item xs={3} sm={2}>
//           <input
//             type="file"
//             id="avatar"
//             name="avatar"
//             accept="image/png, image/jpeg"
//             onChange={(e) => getBase64(e.target.files[0])}
//           ></input>
//         </Grid>
//       </Grid>
//     </div>
//   );

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Open Modal
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// }
