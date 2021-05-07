



// Firebase
// import firebase from 'firebase';
// require('firebase/firestore');


firebase.initializeApp({
    apiKey: "AIzaSyDMCyzSVxUwdIKDszU99tSCs6n7hsN_eeY",
    authDomain: "demosite-be27a.firebaseapp.com",
    databaseURL: "https://demosite-be27a.firebaseio.com",
    projectId: "demosite-be27a",
    storageBucket: "demosite-be27a.appspot.com",
    messagingSenderId: "305343839498",
    appId: "1:305343839498:web:3545c7753b8705e5"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

// Firebase

// Initial Values
var email = "";
var name= "";
var message = "";
var dateTime = new Date();


// var instance = M.Modal.getInstance(elem);

// $('#submit-user').click(function() {document.forms[0].submit()});



function jsSubmit() {
        console.log("submit");
        $('.modal').modal('open');
}



$('input[name="submit"]').mouseup("click", function(event) {
    event.preventDefault();
    console.log("click");
    // Grabbed values from text boxes
    email = $("#email").val().trim();
    name = $("#name").val().trim();
    message = $("#message").val().trim();



    $("#email").val("");
    $("#name").val("");
    $("#message").val("");



    // Code for handling the push
    db.collection("emails").add({
        Name: name,
        Email: email,
        Message: message,

        dateTime: dateTime,

    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    // db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // });

});