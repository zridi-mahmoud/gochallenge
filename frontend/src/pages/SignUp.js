import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [redirct, setRedirect] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: avatar,
  });

  function getBase64(file) {
    if (file) {
      if (file.size <= 2097152) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setAvatar(reader.result);
          setUser({ ...user, avatar: reader.result });
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }
    } else {
      toast.error("Avatar size should be less than 2 Mb.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const submit = (e) => {
    e.preventDefault();
    var config = {
      method: "post",
      url: `http://localhost:8000/user`,
      data: {
        name: user.name,
        email: user.email,
        avatar: avatar,
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.InsertedID) {
          localStorage.setItem("id", response.data.InsertedID);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            })
          );
          setRedirect(true);
        } else {
          console.log("no acces Token");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (redirct) {
    history.push("/home");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={submit} method="post" className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="user[name]"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="user[email]"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Avatar src={avatar}></Avatar>
            </Grid>
            <Grid item xs={3} sm={2}>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => getBase64(e.target.files[0])}
              ></input>
            </Grid>
          </Grid>
          <Button
            type="submit"
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <ToastContainer />
    </Container>
  );
}
