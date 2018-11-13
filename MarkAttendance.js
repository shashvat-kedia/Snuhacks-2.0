import React,{Component} from 'react';
import {View,Button} from 'react-native';
const cheerio = require('react-native-cheerio');

export default class MarkAttendance extends Component {
  constructor(props){
    super(props)
    this.state = {
      attendanceState: -1
    }
  }

  componentDidMount(){
    fetch("https://markattendance.webapps.snu.edu.in/public/application/login/loginAuthSubmit",
    {
      "method": "POST","credentials":"same-origin",
      "headers":{
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language":"en-US,en;q=0.9",
        "cache-control":"max-age=0",
        "content-type":"application/x-www-form-urlencoded",
        "upgrade-insecure-requests":"1"},
        "referrer":"https://markattendance.webapps.snu.edu.in/public/application/login/login",
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":"login_user_name=sk261&login_password=Dnisg%4012344",
        "method":"POST",
        "mod//e":"cors"
    }).then((response) => {
      fetch("https://markattendance.webapps.snu.edu.in/public/application/index/index",
       {
         "credentials":"include",
         "headers":{
           "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
           "accept-language":"en-US,en;q=0.9",
           "upgrade-insecure-requests":"1"},
           "referrer":"https://markattendance.webapps.snu.edu.in/public/application/index/summary",
           "referrerPolicy":"no-referrer-when-downgrade",
           "body":null,
           "method":"GET",
           "mode":"cors"
       }).then((response) => {
         const $ = cheerio.load(response._bodyText)
         if($('.alert-warning')){
           this.setState({attendanceState: 0})
           console.log("Attendance not yet started")
         }
         else if($('.alert-success')){
            this.setState({attendanceState: 1})
           console.log("Attendance marked successfully")
         }
         else{
           this.setState({attendanceState: 2})
           console.log("Failed")
         }
       }).catch((err) => {
         console.log(err)
       })
    }).catch((err) => {
      console.log(err)
    })
  }

  render(){
    switch(this.state.attendanceState){
      case -1 :
      return (
        <View>
        </View>
      )
      break;
      case 0:
      return (
        <View>
        </View>
      )
      break;
      case 1:
      return (
        <View>
        </View>
      )
      break;
    }
  }
}