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


// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});  

  const db = getDatabase();

  var enterTitle = document.querySelector("#enterTitle");
  var enterUrl = document.querySelector("#enterUrl");
  var enterAuthor = document.querySelector("#enterAuthor");
  var findTitle = document.querySelector("#findTitle");
  var findUrl = document.querySelector("#findUrl");
  var findAuthor = document.querySelector("#findAuthor");


  var insertBtn = document.querySelector("#insert");
  var updateBtn = document.querySelector("#update");
  var removeBtn = document.querySelector("#remove");
  var findBtn = document.querySelector("#find");
  console.log(insertBtn)
  console.log(findBtn)
  function InsertData() {
      set(ref(db, "Videos/"+ enterTitle.value),{
          
          Title: enterTitle.value,
          Url: enterUrl.textContent,
          Author: enterAuthor.value,
         

         
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

  function UpdateData(){
      update(ref(db, "Videos/"+ enterTitle.value),{
          Url: enterUrl.textContent,
          Author: enterAuthor.value
      })
      .then(()=>{
          alert("Data updated successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  function RemoveData(){
      remove(ref(db, "Videos/"+ enterTitle.value))
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
    $("#enterUrl").append(url);
    console.log(enterUrl.textContent)
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
  $("#enterUrl").append(url);
  console.log(enterUrl.textContent)
};




