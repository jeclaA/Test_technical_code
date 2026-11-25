const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 5001; 

app.use(cors()); 
app.use(express.json()); 

function validateNumber(value) {
    if(value === undefined || value === null) {
        return "Input tidak boleh kosong."; 
    }
    const str = String(value);
    for(let i=0; i< str.length; i++) {
        if(str[i] < '0' || str[i] > '9') {
            return "Input harus angka."; 
        }
    }
    const number = Number(str);
    if(!Number.isSafeInteger(number)) {
        return "Angka yang di input terlalu besar."; 
    }
    return null; 
}

function generateSegitiga(number){
    const digits = String(number); 
    const result = []; 

    for (let i = 0; i < digits.length; i++) { 
        const digit = digits[i];
        const nol = "0".repeat(i+1); 

        result.push(digit + nol);
    }
    return result;
}

function generateGanjil(number){
    const result = []; 

    for (let i=0; i<=number; i++){
        if(i%2 != 0) {
            result.push(i); 
        }
    }
    return result; 
}

function generatePrima(number){
    const result = [];

    for(let i=2; i <= number; i++) {
        let isPrima = true;

        for(let j=2; j*j <= i; j++){
            if(i % j === 0) {
                isPrima = false;
                break;
            }
        }
        if(isPrima){
            result.push(i); 
        }
    }
    return result;
}

app.post("/api/generate/segitiga", (req,res) => {
    const error = validateNumber(req.body.number);

    if(error){ 
        return res.status(400).json({ error }); 
    }

    const number = Number(req.body.number);
    const result = generateSegitiga(number);

    res.json({ result }); 
}); 

app.post("/api/generate/ganjil", (req,res) => {
    const error = validateNumber(req.body.number);

    if(error){ 
        return res.status(400).json({ error }); 
    }

    const number = Number(req.body.number);
    const result = generateGanjil(number);

    res.json({ result }); 
}); 

app.post("/api/generate/prima", (req,res) => {
    const error = validateNumber(req.body.number);

    if(error){ 
        return res.status(400).json({ error }); 
    }

    const number = Number(req.body.number);
    const result = generatePrima(number);

    res.json({ result }); 
}); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 


