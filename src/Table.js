import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

 
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '5rem', height: '5rem' },
  borderColor: 'text.primary',
};

 
/*function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
 
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/
 
const  BasicTable= () => {
  const classes = useStyles();
  const [valueData, setValueData] = useState([]);
  useEffect(()=> { 
    axios.get('http://localhost:3001/api/scrumdemo/getScrumDetails')
      .then(json => {
        console.log(json.data)
        setValueData(json.data) // Used to change the state
      })

      .catch(e => console.log(e));
  },[]);
 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}
 >Emp.Code</TableCell>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}>Emp Name:</TableCell>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}>Job Role:</TableCell>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}> Plant:</TableCell>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}> Email:</TableCell>
            <TableCell align="left" style={{'border-style': 'solid', backgroundColor:'skyblue'}}> Mobile Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {valueData.map((index) => (
            <TableRow key={index.name}>
            <TableCell align="left" style={{'border-style': 'outset' }}>{index.EMP_CODE}</TableCell>
              <TableCell align="left"style={{'border-style': 'outset' }}>{index.EMP_NAME}</TableCell>
              <TableCell align="left"style={{'border-style': 'outset' }}>{index.JOB_ROLE}</TableCell>
              <TableCell align="left"style={{'border-style': 'outset' }}>{index.PLANT}</TableCell>
              <TableCell align="left"style={{'border-style': 'outset' }}>{index.EMAIL}</TableCell>
              <TableCell align="left"style={{'border-style': 'outset' }}>{index.MOBILE_NUMBER}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;