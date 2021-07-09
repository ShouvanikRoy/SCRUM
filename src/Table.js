import React, { useEffect, useState } from 'react';
// import canUseDOM from 'can-use-dom';
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
//import getQueryStringParameters from './App';



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

const BasicTable = (props) => {
  const classes = useStyles();
  // const router = useRouter();
  //  const g = getQueryStringParameters(router?.asPath) || {};
  //   getQueryStringParams = query => {
  //     return query
  //         ? (/^[?#]/.test(query) ? query.slice(1) : query)
  //             .split('&')
  //             .reduce((params, param) => {
  //                     let [key, value] = param.split('=');
  //                     params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
  //                     return params;
  //                 }, {}
  //             )
  //         : {}
  // };
  const [valueData, setValueData] = useState([]);
  const [radio, setRadio] = useState();
  const [MOBILE_NUMBER, setMOBILE_NUMBER] = useState(null);
  const [JOB_ROLE, setJOB_ROLE] = useState(null);
  const [PLANT, setPLANT] = useState(null);
  const [EMAIL, setEMAIL] = useState(null);
  let empcode = props.match.params.empcode;
  let plnt = props.match.params.plnt;
  let isChannge = props.history.location.search;
  let qstr = "";
  debugger
  if (empcode && empcode !== "null") {
    qstr += "?empcode=" + empcode;
  }
  else if (plnt && plnt !== "null") {
    qstr += "?plnt=" + plnt;
  }
  useEffect(() => {
    axios.get('http://localhost:3001/api/scrumdemo/getScrumDetails' + qstr)
      .then(json => {
        console.log(json.data)
        setValueData(json.data) // Used to change the state
      })

      .catch(e => console.log(e));
  }, []);
  const onSubmit = () => {
    let obj = {};
    obj.EMP_CODE = radio.EMP_CODE;
    obj.EMP_NAME = radio.EMP_NAME;
    obj.JOB_ROLE = JOB_ROLE;
    obj.PLANT = PLANT;
    obj.EMAIL = EMAIL;
    obj.MOBILE_NUMBER = MOBILE_NUMBER;
    axios.put('http://localhost:3001/api/scrumdemo/updatedetails', obj)
      .then(() => { alert("Change Successful") })
      .catch(e => console.log(e));
  }
  console.log(radio, "radio")
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {isChannge.includes('source=change') &&
              <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}
              >Edit radio</TableCell>
            }
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}
            >Emp.Code</TableCell>
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}>Emp Name:</TableCell>
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}>Job Role:</TableCell>
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}> Plant:</TableCell>
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}> Email:</TableCell>
            <TableCell align="left" style={{ 'border-style': 'solid', backgroundColor: 'skyblue' }}> Mobile Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {valueData.map((index) => (
            <TableRow key={index.name}>
              {isChannge.includes('source=change') &&
                <TableCell align="left" style={{ 'border-style': 'outset' }}>
                  <input type="radio" id="html" name="fav_language" value={radio} onChange={() => {
                    setRadio(index);
                    setJOB_ROLE(index.JOB_ROLE);
                    setPLANT(index.PLANT);
                    setEMAIL(index.EMAIL);
                    setMOBILE_NUMBER(index.MOBILE_NUMBER);
                    }} />
                </TableCell>}
              <TableCell align="left" style={{ 'border-style': 'outset' }}>
                {index.EMP_CODE}
              </TableCell>
              <TableCell align="left" style={{ 'border-style': 'outset' }}>
                {index.EMP_NAME}
              </TableCell>
              <TableCell align="left" style={{ 'border-style': 'outset' }}>
                {radio === index ?
                  <input
                    type="text"
                    value={JOB_ROLE}
                    onChange={(e) => setJOB_ROLE(e.currentTarget.value)}
                  />
                  :
                  <>  {index.JOB_ROLE}</>
                }
              </TableCell>
              <TableCell align="left" style={{ 'border-style': 'outset' }}> {radio === index ?
                <input
                  type="text"
                  value={PLANT}
                  onChange={(e) => setPLANT(e.currentTarget.value)}
                />
                :
                <>  {index.PLANT}</>
              }
              </TableCell>
              <TableCell align="left" style={{ 'border-style': 'outset' }}>
                {radio === index ?
                  <input
                    type="text"
                    value={EMAIL}
                    onChange={(e) => setEMAIL(e.currentTarget.value)}
                  />
                  :
                  <>  {index.EMAIL}</>
                }
              </TableCell>
              <TableCell align="left" style={{ 'border-style': 'outset' }}>
                {radio === index ?
                  <input
                    type="text"
                    value={MOBILE_NUMBER}
                    onChange={(e) => setMOBILE_NUMBER(e.currentTarget.value)}
                  />
                  :
                  <> {index.MOBILE_NUMBER}</>
                }
              </TableCell>
              {isChannge.includes('source=change') &&
                <TableCell align="left" style={{ 'border-style': 'outset' }}>
                  {radio === index ?
                    <button className="button" type="button" onClick={onSubmit}>Add</button> : <> </>
                  }
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;