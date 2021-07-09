import { useState, useRef } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BasicTable from './Table';
import logo from './logo.svg';
import { ExcelRenderer } from "react-excel-renderer"
import './App.css';
import axios from 'axios';
import * as XLSX from "xlsx";
import { CallMerge } from '@material-ui/icons';
const Main = (props) => {
  const [data, setData] = useState(null);
  //const [MANDT, setMANDT] = useState(null);
  const [EMP_CODE, setEMP_CODE] = useState(null);
  const [search, setSearch] = useState(null);

  
  const [EMP_NAME, setEMP_NAME] = useState(null);
  const [JOB_ROLE, setJOB_ROLE] = useState(null);
  const [PLANT, setPLANT] = useState(null);
  const [EMAIL, setEMAIL] = useState(null);
  const [MOBILE_NUMBER, setMOBILE_NUMBER] = useState(null);
  const [radio, setRadio] = useState(true);
  const [fileName, setFileName] = useState(null)
  //const [valueData, setValueData] = useState(null);

  const hiddenFileInput = useRef();

  const [state, setState] = useState([]);

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    setFileName(fileObj)
    ExcelRenderer(fileObj, (err, resp) => {
      console.log(resp, "response")
      if (err) {
        console.log(err);
      }
      else {
        let newRows = [];
        resp.rows.map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              "EMP_CODE": row[1],
              "EMP_NAME": row[2],
              "JOB_ROLE": row[3],
              "PLANT": row[4],
              "EMAIL": row[5],
              "MOBILE_NUMBER": row[6],
            });
          }
        });
        setState(newRows);
        onUpload(newRows);
      }
    });

  }

  const onUpload = (rows) => {
  console.log(state,"state")

    axios.post('http://localhost:3001/api/scrumdemo/postzpprjscrum', rows)
      .then(json => { setData(json); console.log(json.data) })
      .catch(e => console.log(e));
  }

  const onSubmit = () => {
    let obj = {};
    obj.EMP_CODE = EMP_CODE;
    obj.EMP_NAME = EMP_NAME;
    obj.JOB_ROLE = JOB_ROLE;
    obj.PLANT = PLANT;
    obj.EMAIL = EMAIL;
    obj.MOBILE_NUMBER = MOBILE_NUMBER;
    axios.post('http://localhost:3001/api/scrumdemo/postzpprjscrum', obj)
      .then(json => { setData(json); console.log(json.data); alert("Data Added Successfully") })
      .catch(e => console.log(e));
    }


    // fetch('http://localhost:3001/api/scrumdemo/postzpprjscrum', {requestOptions})
    //     .then(response => response.json())
    //     .then(json => {setData(json)})
    //     .catch (e=> console.log(e));

  const convertToJson = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 2; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    // return result; //JavaScript object
    return JSON.stringify(result); // JSON
  }

  const readFile = () => {
    const f = fileName;
    const { name } = f;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log(`Data>>>${data}`);// shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format

    };
    reader.readAsBinaryString(f);
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const onDisplay = () => {
    props.history.push('/display/'+EMP_CODE+'/'+PLANT);
  }
  const onChange = () => {
    // props.match.push({Onchagne: true })
    console.log(props.history.location.search,"ll");
    props.history.push('/display/'+EMP_CODE+'/'+PLANT+'?source=change');
  }
  return (

    <div className="App">
      <h1> Table ZPPRJ_SCRUM </h1>
      <header className="App-header">
        <div className="flex pad-50">
          <div className="Bhaskar"> 
          <label>
            <input name="radio" type="radio" value={radio} onChange={() => setRadio(!radio)} checked={radio} />
            Single Entry
            </label>
          </div>
          <label>
            <input name="radio1" type="radio" value={!radio} onChange={() => setRadio(!radio)} checked={!radio} />
            Multiple Entries
          </label>
        </div> {radio &&
          <>
            <div className="input1">
              <div className="input2">EMP_CODE:
                {'  '}
                <input
                  type="text"
                  value={EMP_CODE}
                  onChange={(e) => setEMP_CODE(e.currentTarget.value)}
                />
              </div>
              <div className="input2">EMP_NAME:
                {'  '}
                <input
                  type="text"
                  value={EMP_NAME}
                  onChange={(e) => setEMP_NAME(e.currentTarget.value)}
                />         </div>
              <div className="input2">JOB_ROLE:
                {'  '}
                <input
                  type="text"
                  value={JOB_ROLE}
                  onChange={(e) => setJOB_ROLE(e.currentTarget.value)}
                />
              </div>
              <div className="input2">PLANT :
                {'  '}
                <input
                  type="text"
                  value={PLANT}
                  onChange={(e) => setPLANT(e.currentTarget.value)}
                />
              </div>
              <div className="input2">EMAIL :
                {'  '}
                <input
                  type="text"
                  value={EMAIL}
                  onChange={(e) => setEMAIL(e.currentTarget.value)}
                />
              </div>
              <div className="input2">MOBILE_NUMBER :
                {'  '}
                <input
                  type="text"
                  value={MOBILE_NUMBER}
                  onChange={(e) => setMOBILE_NUMBER(e.currentTarget.value)}
                /></div>
                {/* <div className="input2">MOBILE_NUMBER1 :
                {'  '}
                <input
                  type="text"
                  value={MOBILE_NUMBER}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                /></div> */}
            </div>


            <div className="flex">
              <button className="button" type="button" onClick={onSubmit}>Add</button>
              <button className="button" type="button" onClick={onChange}>Change</button>
              <button className="button" type="button" onClick={onDisplay}>Display</button>

            </div>
          </>}
        {/* {valueData &&  <BasicTable valueData={valueData} />} */}
        {!radio &&
          <>
            {fileName?.name ?
              (<> {fileName.name} file uploaded successfully

                <button
                  onClick={readFile}
                >
                  Upload File 
                </button>
              </>)
              :
              (<>
                Upload the excel file
                <button className="button" type="button" onClick={handleClick} style={{ width: "108px" }}>Select File</button>
                <input
                  data-testid="fileUpload"
                  tabIndex={0}
                  type="file"
                  style={{ display: 'none' }}
                  ref={hiddenFileInput}
                  onChange={(e) => fileHandler(e)}
                  onKeyPress={(e) => fileHandler(e)}
                />
              </>)}
          </>
        }
      </header>
    </div>
  );
}

export default Main;
