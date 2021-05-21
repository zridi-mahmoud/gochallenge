import React, { useState } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import WifiIcon from "@material-ui/icons/Wifi";
import { green } from "@material-ui/core/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  ButtonBase,
  Container,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -51%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const [tmpAvatar, setTmpAvatar] = useState(user.avatar);
  const [tmpUser, setTmpUser] = useState(user);

  function getBase64(file) {
    if (file) {
      if (file.size <= 2097152) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setTmpAvatar(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
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
  }

  const handleOpen = () => {
    setOpen(true);
    setTmpAvatar(user.avatar);
    setTmpUser(user);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setTmpAvatar("");
  };
  const handleSave = () => {
    if (localStorage.getItem("id") !== 0) {
      // setUser({ ...user, avatar: tmpAvatar });
      setUser(tmpUser);
      setOpen(false);
      var config = {
        method: "put",
        url: `http://localhost:8000/user/${localStorage.getItem("id")}`,
        data: {
          name: tmpUser.name,
          email: tmpUser.email,
          avatar: tmpAvatar,
        },
      };

      axios(config)
        .then((response) => {
          if (!online) {
            toast.success("Connected successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setOnline(true);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: tmpUser.name,
              email: tmpUser.email,
              avatar: tmpAvatar,
            })
          );
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            toast.error("No Connection.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setOnline(false);
          } else {
            console.log(error);
          }
        });
    } else {
      history.push("/signup");
      return;
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="name"
            name="user[name]"
            value={tmpUser.name}
            onChange={(e) => setTmpUser({ ...tmpUser, name: e.target.value })}
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
            value={tmpUser.email}
            onChange={(e) => setTmpUser({ ...tmpUser, email: e.target.value })}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <Avatar src={tmpAvatar}></Avatar>
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
        <Grid item xs={12} sm={12}>
          <Button size="small" color="secondary" onClick={handleDelete}>
            Delete Avatar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button size="small" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <MenuAppBar avatar={user.avatar} />
      {online ? (
        <div style={{ padding: 10 }}>
          <WifiIcon style={{ color: green[500] }} />
        </div>
      ) : (
        <IconButton
          aria-label="Connection State"
          onClick={handleSave}
          color="inherit"
        >
          <WifiOffIcon color="secondary" />
          <ButtonBase>Check connection</ButtonBase>
        </IconButton>
      )}
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={user.avatar}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user["name"]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user["email"]}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={handleOpen}>
                  Edit
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Home;
