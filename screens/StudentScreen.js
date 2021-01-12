import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'

export default class StudentScreen extends Component {

  constructor(){
    super()
    this.state = {
      userName : firebase.auth().currentUser.email,
      serviceName : "",
      description : "",
      requestedserviceName:"",
      serviceId:"",
      serviceStatus:"",
      docId: "",
      
     

    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addService= async(serviceName, description)=>{

    var userName = this.state.userName
    var serviceId = this.createUniqueId()
  
    db.collection("students_requests").add({
      "username"    : userName,
      "service"     : serviceName,
      "description" : description,
      "serviceId"   : serviceId,
      "service_status" : "requested",
      
        "date"       : firebase.firestore.FieldValue.serverTimestamp()

     })

     await this.getStudentRequest()
     db.collection('users').where("username","==",userName).get()
   .then()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{
       db.collection('users').doc(doc.id).update({
     IsStudentRequestActive: true
     })
   })
 })

     this.setState({
       serviceName : '',
       description :'',
       
     })

     return Alert.alert(
          'Service posted successfully',
          '',
          [
            {text: 'OK', onPress: () => {

              this.props.navigation.navigate('TeacherScreen')
            }}
          ]
      );
  }


  getIsStudentRequestActive(){
    db.collection('users')
    .where('username','==',this.state.userName)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          IsStudentRequestActive:doc.data().IsStudentRequestActive,
          userDocId : doc.id,
 
        })
      })
    })
  }

  getStudentRequest =()=>{
    // getting the requested item
  var studentRequest=  db.collection('student_requests')
    .where('username','==',this.state.userName)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().service_status !== "received"){
          this.setState({
            serviceId : doc.data().serviceId,
            requestedserviceName: doc.data().service_name,
            serviceStatus:doc.data().service_status,
            
            docId     : doc.id
          })
        }
      })
  })
}





  componentDidMount(){
    this.getStudentRequest()
    this.getIsStudentRequestActive()
   
  }


  receivedService=(serviceName)=>{
    var userId = this.state.userName
    var serviceId = this.state.serviceId
    db.collection('received_service').add({
        "user_id": userId,
        "service_name":serviceName,
        "service_id"  : serviceId,
        "recieveStatus"  : "received",

    })
  }

  updateStudentRequestStatus=()=>{
    db.collection('student_requests').doc(this.state.docId)
    .update({
      service_status : 'recieved'
    })

    db.collection('users').where('username','==',this.state.userName).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        //updating the doc
        db.collection('users').doc(doc.id).update({
          IsStudentRequestActive: false
        })
      })
    })

}
  sendNotification=()=>{
    //to get the first name and last name
    db.collection('users').where('username','==',this.state.userName).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var name = doc.data().first_name
        var lastName = doc.data().last_name

        // to get the donor id and item name
        db.collection('all_notifications').where('serviceId','==',this.state.serviceId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var donorId  = doc.data().donor_id

            //targert user id is the donor id to send notification to the user
            db.collection('all_notifications').add({
              "targeted_user_id" : donorId,
              "message" : name +" " + lastName + " service provided " + serviceName ,
              "notification_status" : "unread",
              "service_name" : serviceName
            })
          })
        })
      })
    })
  }

  render()
  {
    if (this.state.IsStudentRequestActive === true){
      // status screen
      return(
        <View style = {{flex:1,justifyContent:'center'}}>
         <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text>Service Name</Text>
         <Text>{this.state.requestedserviceName}</Text>
         </View>

         <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text> Service Status </Text>

         <Text>{this.state.serviceStatus}</Text>
         </View>

         <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
         onPress={()=>{
           this.sendNotification()
           this.updateStudentRequestStatus();
           this.receivedService(this.state.requestedserviceName)
         }}>
         <Text>I recieved the service</Text>
         </TouchableOpacity>
       </View>
     )

    }
    else {
      return(
        <View style={{flex:1}}>
        <MyHeader title="Request Service" navigation ={this.props.navigation}/>
        <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Service Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                serviceName: text
              })
            }}
            value={this.state.serviceName}
          />
          <TextInput
            multiline
            numberOfLines={4}
            style={[styles.formTextInput,{height:100}]}
            placeholder ={"Description"}
            onChangeText={(text)=>{
              this.setState({
                description: text
              })
            }}
            value={this.state.description}

          />
          
          <TouchableOpacity
            style={[styles.button,{marginTop:10}]}
            onPress = {()=>{this.addService(this.state.serviceName, this.state.description)}}
            >
            <Text style={{color:'#ffff', fontSize:18, fontWeight:'bold'}}>Add Service</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

})
