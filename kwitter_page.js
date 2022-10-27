//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyCImWfQk4PX8tKkRADILCHVZqFpeHiLBRc",
      authDomain: "twitter-website-ec3d0.firebaseapp.com",
      databaseURL: "https://twitter-website-ec3d0-default-rtdb.firebaseio.com",
      projectId: "twitter-website-ec3d0",
      storageBucket: "twitter-website-ec3d0.appspot.com",
      messagingSenderId: "899965336318",
      appId: "1:899965336318:web:4d70f679decc36e77c43af"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         //start code 
         console.log(firebase_message_id);
         console.log(messge_data);
         Name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_width_tag = "<h4>" + Name + "<img class='user_tick' src='tick.png'></h4>";
         message_width_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value = " + like + "onlick = 'updateLike()'>";
         span_width_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button>";

         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output"),innerHTML += row;
         //end code 
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("click on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes 
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeitem("room_name");
      window.location.replace("kwitter.html");
}