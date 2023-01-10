import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Typography,
  Paper,
  Container,
  Grid,
  InputAdornment,
  Input,
} from "@material-ui/core";
import NoDataFound from "src/component/NoDataFound";
import SearchIcon from "@material-ui/icons/Search";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import Loader from "src/component/Loader";
import { Pagination } from "@material-ui/lab";
import ChildTableUser from "../../../component/userRow";
import { UserContext } from "src/context/User";
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(() => ({
  LoginBox: {
    paddingBottom: "50px",
  },
  websiteButton: {
    border: "solid 0.5px #707070",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: "17.5px",
    color: "#141518",
    width: "100%",
    borderRadius: "0",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    marginTop: "30px",
    "& h6": {
      fontSize: "28px",
      color: "#000",
    },
  },
  paddingContainer: {
    padding: "0px 30px",
    marginTop: "-30px",
  },
  table: {
    minWidth: 320,
  },
  table: {
    border: "1px solid #e5e3dd",
    "& th": {
      border: "1px solid #e5e3dd",
      padding: "10px!important",
    },
    "& td": {
      border: "1px solid #e5e3dd",
      padding: "6px!important",
    },
  },
  createButton: {
    color: "#fff",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    margin: "0px 10px",
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
  },
  whitebox: {
    background: "#FFFFFF",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "15px",
  },

  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  ss: {
    width: "700px!important",
  },
  ranking: {
    padding: "1px!important"
  },
  profile: {
    padding: "1px!important",
  },
  input_fild2: {
    "&:before": {
      width: "0!important"
    },
  }
}));

export default function UsersList() {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allUserList, setAllUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [filterData, setFilterData] = useState({
    userType: "",
    searchKey: "",
  });
  const _onInputChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    setPage(1);
  };
  const getAllUserListHandler = async () => {
    setIsLoadingData(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.allUserList,

        params: {
          search: filterData.searchKey != "" ? filterData.searchKey : null,
          type: filterData.userType != "" ? filterData.userType : null,
          limit: 100,
          page: page,

        },
      });
      if (res.data.statusCode === 200) {
        let rankingOrder = res.data.result.docs;
        rankingOrder.sort((a, b) => b.masBalance - a.masBalance || b.followers.length - a.followers.length)
        setAllUserList(rankingOrder);
        setIsLoadingData(false);
        setPages(res.data.result.pages)
      }
    } catch (error) {
      console.log(error);
      setIsLoadingData(false);
    }
  };
  useEffect(() => {
    getAllUserListHandler();
  }, [page, filterData]);

  return (
    <Box className={classes.paddingContainer}>
      <Box className={classes.LoginBox} mb={5}>
        {/* Start Title */}
        <Box className={classes.masBoxFlex}>
          {/* {isMobile ? "" : <Typography variant="h6">Users</Typography>} */}
          <Box variant="h6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span style={{ fontSize: "22px", fontWeight: "700" }}>
              Users
            </span>
            <Input
              placeholder="Find User"
              className={classes.input_fild2}
              value={filterData.searchKey}
              style={{ width: "180px", marginLeft: "110px", border: "1px solid #DDD", borderRadius: "10px", padding: "2px 5px" }}
              type="text"
              name="searchKey"
              onChange={_onInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        {/* End Title */}

        {/* Start Serach */}
        {/* {!isMobile &&
          <Box className={classes.whitebox}>
            <Container>
              <Box className={classes.idtxt}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={8} className={classes.dlflex}>
                    {isMobile ? "" : <label style={{ padding: "0px" }}>Search</label>}
                    <Input
                      placeholder="Search by wallet Address or name"
                      className={classes.input_fild2}
                      value={filterData.searchKey}
                      fullWidth
                      type="text"
                      name="searchKey"
                      onChange={_onInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>


              </Box>
            </Container>
          </Box>} */}
        {/*End Serach */}

        {/* Start Table */}
        <TableContainer style={isMobile ? { width: "400px!important" } : { width: "100%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">

            {/* Start Head */}
            <TableHead
              style={{
                background: "linear-gradient(180deg, #c04848 0%, #480048 100%)",
              }}
            >
              <TableRow>
                <TableCell className={classes.ranking} align="Center" style={{ color: "white", padding: "1px", width: "10px!important" }}>
                  Img
                </TableCell>
                <TableCell className={classes.profile} align="Center" style={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell align="Center" style={{ color: "white" }}>
                  Action
                </TableCell>
                <TableCell align="Center" style={{ color: "white", fontSize: "10px" }}>
                  Wallet Address
                </TableCell>
                <TableCell align="Center" style={{ color: "white" }}>
                  Sepeciality
                </TableCell>
                {/* <TableCell align="Center" style={{ color: "white" }}>
                  Total earning
                </TableCell> */}
                {/* <TableCell align="Center" style={{ color: "white" }}>
                  Total referral earning
                </TableCell> */}

              </TableRow>
            </TableHead>
            {/* End Head */}

            {/* Start Body */}
            <TableBody>
              {allUserList &&
                allUserList?.map((row, index) => (
                  <ChildTableUser row={row} index={index} key={index} />
                ))}
            </TableBody>
            {/* End Body */}

          </Table>
        </TableContainer>
        {/* End Table */}

        <Box mt={3}>{isLoadingData && <Loader />}</Box>
        <Box mt={3}>
          {!isLoadingData && allUserList && allUserList.length === 0 && (
            <NoDataFound />
          )}
        </Box>
        <Box mb={2} mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
}
