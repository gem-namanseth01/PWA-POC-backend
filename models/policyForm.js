import mongoose from 'mongoose';

const policyFormSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true }
});

const policyForm =  mongoose.model('policy-form', policyFormSchema);

export default policyForm;
