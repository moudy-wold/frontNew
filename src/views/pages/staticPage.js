import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import parse from 'html-react-parser';
import { useLocation, useParams } from "react-router";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import MetaverseCard from "./MetaverseCard";
import IMG1 from "./img/card 1.jpeg"
import IMG2 from "./img/card2.jpeg"
import IMG3 from "./img/card3.jpeg"
import IMG5 from "./img/card5.jpeg"
import IMG6 from "./img/card6.jpeg"
import { isMobile } from 'react-device-detect';
const useStyles = makeStyles((theme) => ({

  title: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "solid 1px #e5e3dd",
    paddingBottom: "10px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
}));



export default function StaticPage() {
  var dataArray = [IMG1, IMG2, IMG3, IMG5, IMG6];

  const classes = useStyles();
  const location = useLocation();
  const { pageName } = useParams();
  let data = location.state?.data;
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [datas, setdatas] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!data) {
      const fetcher = async (url) => axios.get(url).then(res => {
        setTitle(res.data.result.title);
        setContent(res.data.result.description);
      });
      fetcher(Apiconfigs.viewStaticPage + `?type=${pageName}`)
    } else {
      setTitle(data.title);
      setContent(data.html);
    }
  }, [data])


  return (title && content) ? (
    <Container maxWidth="lg">
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      <Carousel infiniteLoop={false} centerMode={true} centerSlidePercentage={isMobile ? 80 : 30} numItemsPerView={2}>
        {dataArray.length > 0 ?
          dataArray.map((data, i) => {
            console.log(data)
            return (
              <MetaverseCard
                data={data}
                key={i}
              />
            );
          })
          : <div> no Item</div>
        }
      </Carousel>

    </Container>
  ) : null
}
