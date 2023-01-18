import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Avatar, Tooltip, Badge, IconButton, Button, Card, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import { BsChat } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  cards: {
    backgroundColor: '#D9AFD9',
    backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
    padding: "10px",
    borderRadius: "10px",
    width: "260px",
    minHeight: "320px",
    margin: "12px",
    position: "relative",
    display: 'flex',
    flexDirection: "column",
    position: 'relative',
    alignItems: "stretch",
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundImage: 'linear-gradient(0deg, #D9AFD955 0%, #97D9E199 100%)',
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    position: "relative",
    backdropFilter: "blur(3px)",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "15px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },
      "& span": {
        color: "#000",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
    },
    "& p": {
      fontSize: "12px",
    },
  },

  boxActions: {
    padding: '4px',
    marginTop: '4px',
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
    borderRadius: "4px",
    background: "#fff4",
    backdropFilter: "blur(2px)",
    alignSelf: "flex-end",
    zIndex: 100
  },

  subButton: {
    "& button": {
      backgroundImage: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: "#fff",
      width: "90px",
      height: "30px",
      fontSize: "11px",
      padding: "2px"
    },
  },
  userImg: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    borderRadius: "10px"
  },
}));

export default function UserDetailsCard(data) {
  // url: Apiconfigs.latestUserList,
  const userCardData = data.data;
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useContext(UserContext);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);
  // start Handle subscribe function
  const subscribeToUserHandler = async () => {
    if (auth.userData?._id) {
      await axios({
        method: "GET",
        url: Apiconfigs.followProfile + userCardData._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            setisSubscribed(res.data.result.subscribed == "yes");
            setnbSubscribed(res.data.result.nb);
          } else {
            toast.error(res.data.result);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.responseMessage);
        });
    } else {
      toast.error("Please Login");
    }
  }
  // End Handle subscribe function

  const likeDislikeUserHandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeUser + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setisLike((liked) => !liked);
          setnbLike((nb) => isLike ? nb - 1 : nb + 1)
        } else {
          setisLike(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      toast.error("Please Login");
    }
  };

  useEffect(() => {
    setnbLike(userCardData.likesUsers.length);
    setnbSubscribed(userCardData.followers.length);
    if (auth.userData?._id) {
      setisLike(userCardData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(userCardData.followers?.includes(auth.userData._id));
    }
    console.log(userCardData._id)

  }, [])

  return (
    <Card className={classes.cards}>
      {/* Start Img */}
      <Box style={{ height: "200px", marginBottom: "10px", cursor: "pointer" }}
        onClick={() => {
          navigate("/user-profile/" + userCardData.userName)
        }}>
        <img className={classes.userImg}

          src={userCardData.profilePic}
        />
      </Box>
      {/* End Img */}

      {/* Start  speciality name like */}
      <Box>
        {/* Start Name Speciality */}
        <Box className={classes.cardContent}>
          <Box style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "40px",
          }}>
            <Box onClick={() => { navigate("/user-profile/" + userCardData.userName) }}>
              {/* Start User Name */}
              <Typography
                variant="h4"
                component="h4"
                style={{
                  color: "#fbfafa",
                  cursor: "pointer",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "auto",
                  textAlign: "center"
                }}
              >
                {userCardData && userCardData.name
                  ? userCardData.name
                  : userCardData.userName}
              </Typography>
              {/* End User Name */}

              {/* Start Specility */}
              <Box>
                {
                  userCardData.speciality &&
                  <Typography
                    style={{
                      color: "#000",
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: "12px"
                    }}
                  >
                    {userCardData.speciality}
                  </Typography>
                }
              </Box>
              {/* End Speciality */}
            </Box>
          </Box>
        </Box>
        {/* End Name Speciality */}

        {/* Start Buttons */}
        <Box
          className={classes.boxActions}>
          {/* Start Subscribe Option */}
          <Box className={classes.subButton}>
            {/* Start Subscribe Button */}
            <Button onClick={subscribeToUserHandler}>
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            {/* End Subscribe Button */}

            {/* Start Subscribe Count */}
            <span
              style={{
                color: "#000",
                fontWeight: "600",
                fontSize: "12px",
                padding: '2px'
              }}
            >
              {
                nbSubscribed ?
                  nbSubscribed > 0 ?
                    nbSubscribed + " subs" :
                    '0 sub' : "0 sub"
              }
            </span>
            {/* End Subscribe Count */}
          </Box>
          {/* End Subscribe Option */}

          {/* Start Chat */}
          <Box>
            <Tooltip title="Chat" placement="bottom">
              <IconButton onClick={() => navigate(`/chat/t${userCardData._id}`)}>
                <Badge badgeContent={Object.keys(auth.unreadChats).length} overlap="rectangular" color="primary">
                  <BsChat style={{ color: "#000" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
          {/* End Chat */}

          {/* Start Like */}
          <Box style={{
            cursor: "pointer",
            margin: "0 3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} >
            <span style={{ fontSize: '12px', margin: "1px 2px" }}>
              {nbLike && nbLike}
            </span>
            <FaHeart
              style={isLike ? { color: "red" } : { color: "#ffa0a0" }}
              onClick={() => likeDislikeUserHandler(userCardData._id)}
            />
          </Box>
          {/* End Like */}

        </Box>
        {/* End Buttons */}
      </Box>
      {/* End  speciality name like */}

    </Card>
  );
}
