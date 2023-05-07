console.log("Hello World");



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {getDatabase, set, get, update, remove, ref, child,}

from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAC_Elz1slOzB-AGtqnKLdWIuNeJ_efv4",
  authDomain: "slutproject-bc218.firebaseapp.com",
  databaseURL: "https://slutproject-bc218-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutproject-bc218",
  storageBucket: "slutproject-bc218.appspot.com",
  messagingSenderId: "318530280842",
  appId: "1:318530280842:web:9cbe51efd55cfa6da03c73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);


  const db = getDatabase();

  var findTitle = document.querySelector("#findTitle");
  var findUrl = document.querySelector("#findUrl");
  var findAuthor = document.querySelector("#findAuthor");

  var insertBtn = document.querySelector("#insert");

  var findBtn = document.querySelector("#find");
  console.log(insertBtn)
  console.log(findBtn)

  function FindData() {
      const dbref = ref(db);

      get(child(dbref, "Videos/" + findTitle.value))
      .then((snapshot)=>{
          if(snapshot.exists()){
           console.log(snapshot.val().Url)  
            var li = ` <li> <video controls="controls" src=" ${snapshot.val().Url} " type="video/mp4" width="400px" height="200px"></video>`
            $(findUrl).append(li);
            findAuthor.innerHTML = "Author: " + snapshot.val().Author;
          } else {
              alert("No data found");
          }
      })
      .catch((error)=>{
          alert(error)
      })
      
  }






  


 findBtn.addEventListener('click', FindData);






