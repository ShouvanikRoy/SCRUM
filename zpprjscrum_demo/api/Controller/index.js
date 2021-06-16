let uuidV1 = require('uuid/v1'),
postdepmodel = require('../model/postSchema');
const { fill } = require('lodash');
const { response } = require('express');

exports.getScrumDetails = async(req,res) =>{
  let getDisplayData =  postdepmodel.postchk;
  getDisplayData.find()
  .then((response)=>{
      res.send(response);
  })
  .catch((err)=>{
      console.log("Error",err);
  })
}
exports.updateRecords = async(req,res)=>{
    const data = req.body;
    postdepmodel.postchk.updateOne({UID:req.body.UID},{$set:data})
      .then((response)=>{
          res.status(200).send('Data Updated Successfully!!!');
      })
      .catch((error)=>{
          res.status(400).send('Error',error);
      })
}
exports.postZpprjscrum = async (req,res) => {


    let payload = req.body;

    if(payload){
        // let deplomentObj = postdepmodel.deployments;
        let uuid = uuidV1();
       payload.UID = uuid;
        postdepmodel.postchk.insertMany(payload,(err, docs) => {
            if (err)
            {
            console.log("error", err);
            res.status(400).send(err);
          
            } else {
                      
            console.log("Multiple documents inserted to Collection");
            
            
            res.status(201).send('Data Created Successfully!!!');
                      
            console.log('Data Created Successfully!!!');

            }
                   
            })
            }

    }