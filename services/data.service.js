//importing jwt package
const jwt=require("jsonwebtoken")
const express=require("express")

accounts={
    1000:{"account_no":1000,"name":"Jaseel",phone:987654321,balance:1200000,password:"jaseel123",transaction:[]},
    1001:{"account_no":1001,"name":"Shani",phone:987654322,balance:120213,password:"shani123",transaction:[]},
    1002:{"account_no":1002,"name":"Fiju",phone:987654323,balance:12032300,password:"fiju123",transaction:[]},
    1003:{"account_no":1003,"name":"Jamshad",phone:98765424,balance:12002300,password:"jamshad123",transaction:[]},
 }





const register=(acno,uname,phone,pswd)=>{

    if (acno in accounts){
      return {
        status:false,
        message:"Account Already Exists!....Please Login!",
        statusCode:404
      }
    } 
    else{
      accounts[acno]={account_no:acno,name:uname,phone:phone,balance:0,password:pswd,transaction:[]}
      console.log(accounts)
      return {
        status:true,
        message:"Registration Completed",
        statusCode:201
      }
    }
   }

const login=(acno,pswd)=>{
    if(acno in accounts){
      if(accounts[acno].password==pswd){
        currentUser=accounts[acno].name
        currentAcno=acno
        token=jwt.sign(
          //acno of currentuser
          {currentAcno:acno},"secretsuperkey1234"
        )
        return {
          status:true,
          message:"Login SuccessFull",
          statusCode:200,
          currentUser,
          token
        }
      }
      else{
        return {
          status:false,
          message:"Invalid Password",
          statusCode:400
        }
      }
    }
    else{
      return {
        status:false,
        message:"Invalid Account Number",
        statusCode:400
      }
    }
   }

const deposit=(acc,pswd,amount)=>{
    if(acc in accounts){
      if(accounts[acc].password==pswd){
        accounts[acc].balance+=parseInt(amount)
        let details={"Type":"CREDIT","Amount":parseInt(amount),"Balance":accounts[acc].balance}
        accounts[acc].transaction.push(details)
        return {
          status:true,
          message:"Amount deposited to your account.Balance is:"+accounts[acc].balance,
          statusCode:200
        }
      }
      else{
        return {
          status:false,
          message:"Invalid Password",
          statusCode:400
        }
      }

    }
    else{
      return {
        status:false,
        message:"Invalid Account Number",
        statusCode:400
      }
    }
   }

const withdraw=(acc,pswd,amount)=>{
    if(acc in accounts){    
      if(accounts[acc].password==pswd){
        if (accounts[acc].balance < amount) {
          return {
            status:false,
            message:"Insufficient Balance",
            statusCode:422
          }
        }
        else{
          accounts[acc].balance-=parseInt(amount)
          // let details={"Type":"DEBIT","Amount":parseInt(amount)}
          accounts[acc].transaction.push({"Type":"DEBIT","Amount":parseInt(amount)})
        }  
        return {
          status:true,
          message:"Withdraw Successfull.Balance is:"+accounts[acc].balance,
          statusCode:200
        }
      }
      else{
        return {
          status:false,
          message:"Invalid Password!",
          statusCode:422
        }
      }
    }    
    else{
      return {
        status:false,
        message:"Invalid Account Number",
        statusCode:422
      }
    }
   }

const getTransaction=(acc)=>{
    if(acc in accounts){
      return {
        status:true,
        message:"success",
        data:accounts[acc].transaction,
        statusCode:200
      }
    }
    else{
      return {
        status:false,
        message:"Invalid Account",
        statusCode:422
      }
    }
   }








   module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
   }