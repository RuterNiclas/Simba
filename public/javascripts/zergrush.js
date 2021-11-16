var oReq = new XMLHttpRequest();



window.onload = function() {
  
    var req = new XMLHttpRequest();  
    req.open('GET', 'http://www.aftonbladet.se/', false);   
    req.send(null);  
    if(req.status == 200)  {
       document.write(req.responseText);
    }
      

    oReq.addEventListener("progress", updateProgress);
    oReq.addEventListener("load", transferComplete);
    oReq.addEventListener("error", transferFailed);
    oReq.addEventListener("abort", transferCanceled);
    
    oReq.open('GET', 'http://www.aftonbladet.se/', true);
    oReq.send();
  
  };
 
  // ...
  
  // progress on transfers from the server to the client (downloads)
  function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total * 100;
      // ...
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }
  
  function transferComplete(evt) {
    console.log("The transfer is complete.");
  }
  
  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
  }
  
  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
  }