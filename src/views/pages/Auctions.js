import React from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import NftCard from "./NftCard";
import IMG1 from "./img/card 1.jpeg"
import IMG2 from "./img/card2.jpeg"
import IMG3 from "./img/card3.jpeg"
import IMG5 from "./img/card5.jpeg"
import IMG6 from "./img/card6.jpeg"
import { isMobile } from 'react-device-detect';

const AuctionPage = () => {
  const useStyles = makeStyles((theme) => ({
    main: {
      backgroundColor: '#D9AFD9',
      backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
      padding: "10px 10px 15px 10px",
      borderRadius: "10px",
      width: "300px",
      height: "50vh",
      margin: "12px",
      overflow: "hiiden",

    },
    imgParent: {
      width: "100%",
      height: "77%!important",
      cursor: "pointer",
      overflow: "hiiden",
      "&:hover": {
        "& img": {
          transform: "scale(1.03 ,1.03 )"
        },
      },
      "& img": {
        transition: ".2s all linear",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        overflow: "hiiden",
        width: "100%",
        height: "100%",


      },
    },
    nameSpec: {
      width: "100%",
      padding: "15px",
      background: "#eee",
      "& div": {
        width: "100%",
        textAlign: "center",
        fontSize: "16px",
      },
    },
  }))
  const classes = useStyles();
  var dataArray = [IMG1, IMG2, IMG3, IMG5, IMG6];

  return (
    <Container maxWidth='100%' style={{ padding: '0px' }} >
      {/* <Box align="center"
            style={{
              margin: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              mixBlendMode: 'darken',
              backgroundImage: 'url(/images/home/nft-comingsoon-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
            }}
            mt={4} mb={5}>
            <Typography
              variant="h1"
              style={{
                color: '#fffa',
                textAlign: 'center',
                fontSize: '10vw',
                textShadow: 'rgb(81 13 29) 1px 1px 4px'
              }}
            >
              COMING SOON
            </Typography>
          </Box> */}
      <Carousel infiniteLoop={false} centerMode={true} centerSlidePercentage={isMobile ? 80 : 30} numItemsPerView={2}>
        {dataArray.length > 0 ?
          dataArray.map((data, i) => {
            console.log(data)
            return (
              <NftCard
                data={data}
                key={i}
              />
            );
          })
          : <div> no Item</div>
        }
      </Carousel>
    </Container>
  );
};

export default AuctionPage;
