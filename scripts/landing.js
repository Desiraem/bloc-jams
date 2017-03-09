var animatePoints = function() {

     var points = document.getElementsByClassName('point');

     var revealPoint = function(ptnum) {
         points[ptnum].style.opacity = 1;
         points[ptnum].style.transform = "scaleX(1) translateY(0)";
         points[ptnum].style.msTransform = "scaleX(1) translateY(0)";
         points[ptnum].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    
    for(var i = 0; i < 3; i++){
        revealPoint(i);
    }

     };

   /* animatePoints(); */ 

  