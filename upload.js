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

  var enterTitle = document.querySelector("#enterTitle");
  var enterAuthor = document.querySelector("#enterAuthor");


  var getFileBtn = document.querySelector("#fileInp");
  var uploadBtn = document.querySelector("#uploadBtn");
  var insertBtn = document.querySelector("#insert");
  var findBtn = document.querySelector("#find");
  console.log(insertBtn)
  console.log(findBtn)
 

  var fileText = document.querySelector(".fileText");
  var uploadPercentage = document.querySelector(".uploadPercentage");
  var progress = document.querySelector(".progress");
  var precentVal;
  var fileItem;
  var fileName;
  var img = document.querySelector(".img");
 
  
  
  function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName; 
  
  
  }
  
    function uploadFile(){
        let storageRef = firebase.storage().ref("Videos/" + fileName);
        let uploadTask = storageRef.put(fileItem);
  
        uploadTask.on("state_changed", (snapshot)=>{
            console.log(snapshot)
            precentVal = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(precentVal);
            uploadPercentage.innerHTML= precentVal + "%";
            progress.style.width = precentVal + "%";
    }, (error)=>{
        console.log(error.message);
    }, ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url);

          if(url != ""){
              img.setAttribute("src", url);
              img.style.display = "block";
          }
          set(ref(db, "Videos/"+ enterTitle.value),{
          
            Title: enterTitle.value,
            Url: url,
            Author: enterAuthor.value,
           
  
           
        })
        .then(()=>{
            alert("Data added successfully");
        })
        .catch((error)=>{
            alert(error);
        });

  })
    })
  }



  


 
uploadBtn.addEventListener('click', uploadFile);
 getFileBtn.addEventListener('change', getFile);





