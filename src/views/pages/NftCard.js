import React from 'react'
import { Box, makeStyles, Card } from "@material-ui/core";
import "./style.css";
export default function MetaverseCard({ data, key }) {
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
    return (
        <div>
            <Card className={classes.main}>
                <div className={classes.imgParent}>
                    <img src={data} />
                </div>
                <div className={classes.nameSpec}>
                    <div>name : moudy</div>
                    <div>speciality : Developer</div>
                </div>
            </Card>
        </div >
    )
}
