// 'use strict';

//grab a form
const form = document.querySelector('#contactForm');

//grab an input
const Email = form.querySelector('#email');
const Message = form.querySelector('#message');
const Name = form.querySelector('#name');
const honeypot = document.getElementById("subject").value;


//config your firebase push
const config = {
    apiKey: "AIzaSyDMCyzSVxUwdIKDszU99tSCs6n7hsN_eeY",
    authDomain: "demosite-be27a.firebaseapp.com",
    databaseURL: "https://demosite-be27a.firebaseio.com",
    projectId: "demosite-be27a",
    storageBucket: "demosite-be27a.appspot.com",
    messagingSenderId: "305343839498",
    appId: "1:305343839498:web:ae6eeef932f3ff85"
};


//create a functions to push
function firebasePush() {


    //prevents from braking
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    //push itself
    var mailsRef = firebase.database().ref('emails').push().set(
        {
            Name: Name.value,
            Email: Email.value,
            Message: Message.value
        }
    );
    success();
}

function success() {
    // Success message
    $('#success').html("<div class='alert alert-success'>");
    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
    $('#success > .alert-success')
        .append('</div>');
    $('#contactForm').trigger("reset");
}

function error() {
    // Fail message
    $('#success').html("<div class='alert alert-danger'>");
    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
    $('#success > .alert-danger').append('</div>');
    //clear all fields
    $('#contactForm').trigger("reset");
}

//push on form submit
// if (form) {
//
//         form.addEventListener('submit', function (evt) {
//             evt.preventDefault();
//             const honeypot = document.getElementById("subject").value;
//             if (honeypot == "") {
//                 firebasePush();
//             }
//             //shows alert if everything went well.
//             // return alert('Data Successfully Sent to Realtime Database');
//         });
// }


$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            if (honeypot == "") {
                firebasePush();
            }
            else {
                error();
            }

        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

