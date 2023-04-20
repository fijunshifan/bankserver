//importing express framework
const express=require("express")
const jwt=require("jsonwebtoken")

const dataservice=require("./services/data.service")

//creating server app
const app=express()

//to parse json to js
app.use(express.json())

//middleware
const appMiddleware=(req,res,next)=>{
    try{
        token=req.headers["x-access-token"]
        res=jwt.verify(token,"secretsuperkey1234")
        console.log(res)
        next()
    }
    catch{
        res.status(400).json({
            status:false,
            message:"Invalid User...Please Login",
            statusCode:400
        })
    }
    
    //next()
}

//app specific mw
// app.use(appMiddleware)

//resolving requests:-
//REGISTER API
app.post('/register',(req,res)=>{

    const result=dataservice.register(req.body.acno,req.body.uname,req.body.phone,req.body.pswd)
    if(result.status==true){
        res.status(result.statusCode).json(result)
    }
    else{
        res.status(result.statusCode).json(result)
    }
})

//LOGIN API
app.post('/login',(req,res)=>{
    const result=dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
})

//DEPOSIT API
app.post('/deposit',appMiddleware,(req,res)=>{
    const result=dataservice.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
    
})

//WITHDRAW API
app.post('/withdraw',appMiddleware,(req,res)=>{
    const result=dataservice.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})

//TRANSACTION API
app.post('/transact',appMiddleware,(req,res)=>{
    const result=dataservice.getTransaction(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})



//GET-retrieve
app.get('/',(req,res)=>{
    res.send("GET request hit")
})

//POST-create
app.post('/',(req,res)=>{
    res.send("POST request hit")
})

//PUT-update
app.put('/',(req,res)=>{
    res.send("PUT request hit")
})

//PATCH-update partially
app.patch('/',(req,res)=>{
    res.send("PATCH request hit")
})

//DELETE-delete
app.delete('/',(req,res)=>{
    res.send("DELETE request hit")
})



//configuring port number for server app
app.listen(3000,()=>{
    console.log("server running on port 3000")
})