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
  var enterUrl = document.querySelector("#enterUrl");
  var enterAuthor = document.querySelector("#enterAuthor");
  var findTitle = document.querySelector("#findTitle");
  var findUrl = document.querySelector("#findUrl");
  var findAuthor = document.querySelector("#findAuthor");

  var getFileBtn = document.querySelector("#fileInp");
  var uploadBtn = document.querySelector("#uploadBtn");
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
            enterUrl.innerHTML = url;
            set(ref(db, "Videos/"+ enterTitle.value),{
          
                Title: enterTitle.value,
                Url: img.src,
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



  
  insertBtn.addEventListener('click', InsertData);
  updateBtn.addEventListener('click', UpdateData);
  removeBtn.addEventListener('click', RemoveData);
  findBtn.addEventListener('click', FindData);
  uploadBtn.addEventListener('click', uploadFile);
 getFileBtn.addEventListener('change', getFile);





