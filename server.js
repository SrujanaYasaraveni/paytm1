const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyPraser = require('body.Parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(''
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err =>console.error(err));

//Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String,required: true,unique: true },
    password: { type: String, required: true },
    upi_id: { type: String,unique: true },
    balance: { type:Number}
});
//create user model
const User = mongoose.model('User', userSchema);

//define Transacton Schema
const transactionSchema = new mongoose.Schema({
    sender_upi_id: { type: String, required: true },
    reciever_upi_id: { type: String, required: true},
    amount: { type: Number, required: true},
    timestamp: {type: DataTransfer, default: Date.now}
});
//create transaction
const transaction = mongoose.model('transaction',transactionschema);

//function to generate a unique UPI ID
const generateUIP = () => {
    const randomId = crypto.randomBytes(4).toString('hex');//generate a random 8-character ID
    return ${randomId}@fastpay;
};

// signup Route
app.post('/api/signup', async (req,res) => {
    try {
        const {name, email, password} = req.body;
    
    //check if user already exists
    let user = await user.findone({ email });
if (user) {
    return res.status(400).send({ message: 'user already exists'});
    }

// generate UPI ID}
const upi_id = generateUPI();
const balance = 1000;

// create new user
user = new user({ name, email, password, upi_id, balance });
await user.save();
res.status(201).send({ message: 'user registered successfully!', upi_id});
}catch (error) {
    console.error(error);
    res.status(500).send({ message: 'server error' });
}
});

// Fetch User Details Route
app.get('/api/user/:upi_id', async (req, res) => {
    try{
        const { upi_id } = req.params;
        const user = await User.findone({ upi_id});
    
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

res.status(200).send(user);
}catch (error) {
    console.error('error fetching user:',error);
}
})