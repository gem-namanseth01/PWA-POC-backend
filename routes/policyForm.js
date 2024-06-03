import express from 'express';
import policyForm from '../models/policyForm.js';

const router = express.Router();

router.post("/policy-form-save", async (req, res) => {
  try {
    console.log(req.body);
    const policyFormData = new policyForm(req.body);
    policyFormData.save().then(data => {
      console.log(data);
      res.status(200).send({msg: 'Data updated successfully!', data});
    })     
  } catch(err) { 
    console.error(err);
  }
});

export default router;