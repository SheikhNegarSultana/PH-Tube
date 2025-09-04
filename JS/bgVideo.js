const video = document.getElementById("bgVideo");
let forward = true;

    
video.addEventListener("ended", () => {
    if (forward) {
       
        video.playbackRate = -1;
        video.currentTime = video.duration - 0.1; 
        video.play();

    } 

    else {
        
        video.playbackRate = 1;
        video.currentTime = 0;
        video.play();
      }
      
      forward = !forward;
    });
