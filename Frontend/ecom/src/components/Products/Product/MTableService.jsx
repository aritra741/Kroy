import faker from "faker";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Link,
} from "@material-ui/core";
import axios from 'axios';
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button } from "../../button";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 450,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 450,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#264653",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  name: {
    fontWeight: "bold",
    color: "#264653",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

let USERS = [],
  STATUSES = ["Active", "Pending", "Blocked"];
for (let i = 0; i < 14; i++) {
  USERS[i] = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    joinDate: faker.date.past().toLocaleDateString("en-US"),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  };
}

function MTableService({id}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bids, setbids] = useState([])
  //const {id}= this.props.id

  useEffect(() => {

    async function fetchServices(){
        const {data}= await axios.get(`http://127.0.0.1:8000/store/servicebids/service/${id}/`)
        setbids(data)
        console.log(data)
    }

    fetchServices()
}, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history= useHistory()

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Price</TableCell>
            <TableCell className={classes.tableHeaderCell}>Quantity</TableCell>
            <TableCell className={classes.tableHeaderCell}>Image</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.slice(
          ).map((bids) => (
            <TableRow >
              <TableCell>
                    <Typography >{bids.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">
                  {bids.quantity}
    
                </Typography>
              </TableCell>
              <TableCell><img style={{ "height": "10", "width": "10" }} src={"http://127.0.0.1:8000"+bids.image} /></TableCell>
              <TableCell>
  
                 <div onClick={()=>{
                   history.push("../checkout");
                   localStorage.setItem('bid', bids.id)
                   }}>
                 <Button>
                   Buy
                 </Button>
                   </div>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTableService;
