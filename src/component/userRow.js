import React, { useState } from 'react'
import { TableCell, TableRow, Typography, Button, Box, Avatar, makeStyles } from '@material-ui/core'
import { DonationPopUp } from 'src/component/Modals/DonationPopUp'
import { tokensDetails } from "src/constants";
import { useNavigate } from 'react-router-dom'
import { sortAddress } from "src/utils"
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(() => ({
  tbody: {
    minWidth: 320,
    border: '1px solid #e5e3dd',
    '& th': {
      border: '1px solid #e5e3dd',
      width: "50px!important"
    },
    '& td': {
      border: '1px solid #e5e3dd',
      // width: "10px!important",
    },
  },
  createButton: {
    color: '#fff',
    backgroundImage: 'linear-gradient(45deg, #240b36 30%, #c31432 90%)',
    margin: '0px 10px',
  },
}))
export default function ChildTableUser({ row, index }) {
  const classes = useStyles()
  const [openDonation, setOpenDonation] = useState(false)
  const navigate = useNavigate()
  const mastoken = tokensDetails[0];
  return (
    <>
      <TableRow className={classes.tbody} key={row.coinName}>

        <TableCell
          classsName={classes.img}
          style={{ color: 'black', width: "50px!important", padding: "5px!important" }}
          align="Center"
          component="th"
          scope="row"
        >
          {/* {index + 1} */}
          <Avatar
            style={{ width: "60px", height: "60px", backgroundColor: "#999" }}
            src={row.profilePic ? row.profilePic :
              `https://avatars.dicebear.com/api/miniavs/${row._id}.svg`}
            alt=""
          />
        </TableCell>
        {/* Start Second Row */}
        <TableCell
          style={{ cursor: 'pointer', textAlign: 'center' }}
          align="Center"
          onClick={() =>
            navigate('/user-profile/' + row.userName)
          }
        >
          <Box
            style={{

              alignItems: "center",
              justifyContent: 'flex-start'
            }}>

            <Box align='left' ml={2} >
              <Typography align="center" variant='h6' style={{ color: "#842448", fontSize: "20px", minWidth: "120px", }}>
                {row.name ? row.name : ''} {' '}
              </Typography>
              {/* <Typography variant='h5'>
                {' '} @{row.userName}
              </Typography> */}
              {/* <Typography variant='body2'>
                {sortAddress(row.ethAccount?.address)}

              </Typography> */}
            </Box>
          </Box>
        </TableCell>
        {/* End Secound Row */}

        {/* Start Third Row */}
        <TableCell style={{ color: 'black', width: "20px!important", padding: "5px!important" }} align="Center">
          <Button
            className={classes.createButton}
            onClick={() => setOpenDonation(true)}

            style={isMobile ? { padding: "" } : { padding: "4px 8px !important", lineHeight: "1.3" }}
          >
            Transfer Funds
          </Button>
        </TableCell>
        {/* End Third Row */}

        {/* Start Fourth Row */}
        <TableCell style={{ color: 'black' }} align="Center">
          <Typography variant='h5'>
            {/* {row.followers ? row.followers.length : 'N/A'} */}
            {sortAddress(row.walletAddress)}
            <CopyToClipboard
              text={row?.ethAccount?.address}
              style={{ cursor: "pointer", marginLeft: "3px" }}
            >
              <FiCopy onClick={() => toast.info("Copied")} />
            </CopyToClipboard>
          </Typography>
        </TableCell>
        {/* End Fourth Row */}

        {/* Start Fivth Row */}
        <TableCell style={{ color: 'black' }} align="Center">
          <Typography variant='h5'>
            {/* {row.supporters ? row.supporters.length : 'N/A'} */}
            {row.speciality}

          </Typography>
        </TableCell>
        {/* Start Fivth Row */}

        {/* Start Fivth Row */}
        {/* <TableCell style={{ color: 'black' }} align="Center">

          <Typography variant='h5'>
            {parseFloat(row.masBalance).toFixed(2)}
          </Typography>

        </TableCell> */}
        {/*End Fivth Row */}

        {/* Start six Row */}
        {/* <TableCell style={{ color: 'black' }} align="Center">

          <Typography variant='h5'>
            {parseFloat(row.referralBalance).toFixed(2)}
          </Typography>


        </TableCell> */}
        {/* End six Row */}



      </TableRow>

      <DonationPopUp
        open={openDonation}
        handleClose={() => setOpenDonation(false)}
        userData={row}
      />
    </>
  )
}
