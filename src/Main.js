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
import './App.css';
import axios from 'axios';
import * as XLSX from "xlsx";
const Main = (props) => {
  const [data, setData] = useState(null);
  //const [MANDT, setMANDT] = useState(null);
  const [EMP_CODE, setEMP_CODE] = useState(null);
  const [EMP_NAME, setEMP_NAME] = useState(null);
  const [JOB_ROLE, setJOB_ROLE] = useState(null);
  const [PLANT, setPLANT] = useState(null);
  const [EMAIL, setEMAIL] = useState(null);
  const [MOBILE_NUMBER, setMOBILE_NUMBER] = useState(null);
  const [radio, setRadio] = useState(true);
  //const [valueData, setValueData] = useState(null);
  const errMsgAddressObj = {
    docType: '',
    file: ''
  };
  const hiddenFileInput = useRef();
  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  



  
  const [inputAddressErrMsg, setInputAddressErrMsg] = useState(
    errMsgAddressObj
  ); 

  console.log(inputAddressErrMsg,"excel")

  const onSubmit = () => {
    let obj = {};
    obj.EMP_CODE = EMP_CODE;
    obj.EMP_NAME = EMP_NAME;
    obj.JOB_ROLE = JOB_ROLE;
    obj.PLANT = PLANT;
    obj.EMAIL = EMAIL;
    obj.MOBILE_NUMBER = MOBILE_NUMBER;
    console.log(obj, "log")

    const requestOptions = {

      method: "POST",
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' },

    };

    axios.post('http://localhost:3001/api/scrumdemo/postzpprjscrum', obj)
      .then(json => { setData(json); console.log(json.data) })
      .catch(e => console.log(e));

      


    // fetch('http://localhost:3001/api/scrumdemo/postzpprjscrum', {requestOptions})
    //     .then(response => response.json())
    //     .then(json => {setData(json)})
    //     .catch (e=> console.log(e));

  }
  const convertToJson= (csv)=> {
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

  const readFile=()=> {
    const f = inputAddressErrMsg.file;
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
      console.log(`Data>>>${ data}`);// shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format
      
    };
    reader.readAsBinaryString(f);
  }
  const getFileFormat = (fileObj) => {
    const array = fileObj.name.split('.');
    if (array[array.length - 1] === 'xlsx' || array[array.length - 1] === 'xls') {
      return true;
    }
    // setErrorMsg(t('homeMove:uploadDocsError'));
    alert('Please select excel file')
    return false;
  };
  const modifyAddressInputFieldData = (key, value) => {
    const clone = { ...inputAddressErrMsg };
    clone[key] = value;
    setInputAddressErrMsg(clone);
  };
  const uploadAddressFile = (target) => {
    console.log(target, "target")
    const clone = { ...inputAddressErrMsg };
    clone.file = '';
    if (
      Object.keys(target.files).length > 0
      && getFileFormat(target.files[0])
    ) {
      modifyAddressInputFieldData('file', target.files[0]);
    }
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


  const onDisplay = () => {
    props.history.push('/display');
    /* axios.get('http://localhost:3001/api/scrumdemo/getScrumDetails')
      .then(json => {
        console.log(json.data)
        setValueData(json.data) // Used to change the state
      })

      .catch(e => console.log(e)); */
  }
  return (

    <div className="App">
      <h1> Table ZPPRJ_SCRUM </h1>
      <header className="App-header">
        <div className="flex pad-50">
          <label>
            <input name="radio" type="radio" value={radio} onChange={() => setRadio(!radio)} checked={radio} />
      Single Entry
      </label>
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
            </div>

            <div className="flex">
              <button className="button" type="button" onClick={onSubmit}>Add</button>
              <button className="button" type="button" onClick={onSubmit}>Change</button>
              <button className="button" type="button" onClick={onDisplay}>Display</button>

            </div>
          </>}
        {/* {valueData &&  <BasicTable valueData={valueData} />} */}
        {!radio &&
          <>
            {inputAddressErrMsg.file.name ?
              (<> {inputAddressErrMsg.file.name} file uploaded successfully 
              
              <button

          onClick={     readFile        }

        >

          Read File

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
                  onChange={(e) => uploadAddressFile(e.target)}
                  onKeyPress={(e) => uploadAddressFile(e.target)}
                />
              </>)}
          </>
        }
      </header>
    </div>
  );
}

export default Main;
