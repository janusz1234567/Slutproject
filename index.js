console.log("Hello World");


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
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

import {getDatabase, set, get, update, remove, ref, child}
from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
  

  const db = getDatabase();

  var enterID = document.querySelector("#enterID");
  var enterName = document.querySelector("#enterName");
  var enterAge = document.querySelector("#enterAge");
  var findID = document.querySelector("#findID");
  var findName = document.querySelector("#findName");
  var findAge = document.querySelector("#findAge");


  var insertBtn = document.querySelector("#insert");
  var updateBtn = document.querySelector("#update");
  var removeBtn = document.querySelector("#remove");
  var findBtn = document.querySelector("#find");
  console.log(insertBtn)
  console.log(findBtn)
  function InsertData() {
      set(ref(db, "Videos/"+ enterID.value),{
          
          Title: enterID.value,
          Url: enterName,
          Aurhor: enterAge.value
         
      })
      .then(()=>{
          alert("Data added successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  function FindData() {
      const dbref = ref(db);

      get(child(dbref, "Videos/" + findID.value))
      .then((snapshot)=>{
          if(snapshot.exists()){
              findName.innerHTML = "Name: " + snapshot.val().Name;
              findAge.innerHTML = "Age: " + snapshot.val().Age;
          } else {
              alert("No data found");
          }
      })
      .catch((error)=>{
          alert(error)
      })
      
  }

  function UpdateData(){
      update(ref(db, "Videos/"+ enterID.value),{
          Name: enterName,
          Age: enterAge.value
      })
      .then(()=>{
          alert("Data updated successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  function RemoveData(){
      remove(ref(db, "Videos/"+ enterID.value))
      .then(()=>{
          alert("Data deleted successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  insertBtn.addEventListener('click', InsertData);
  updateBtn.addEventListener('click', UpdateData);
  removeBtn.addEventListener('click', RemoveData);
  findBtn.addEventListener('click', FindData);



$('#addPhotosBtn').click(function() {
  $(this).parents().find('#addPhotosInput').click();
});

document.getElementById('addPhotosInput').onchange = e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const li = ` <li> <img src=" ${url} ">
   <span><i class="fa fa-trash"></i></span>
   </li>`
  $('.photos-list ul').append(li);
};

$('#addVideosBtn').click(function() {
  $(this).parents().find('#addVideosInput').click();
});

document.getElementById('addVideosInput').onchange = e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const li = ` <li> <video controls="controls" src=" ${url} " type="video/mp4" width="400px" height="200px"></video>
       <span><i class="fa fa-trash"></i></span>
   </li>`
  $('.video-list ul').append(li);
  $("#enterName").append(url);
  console.log(enterName)
};




