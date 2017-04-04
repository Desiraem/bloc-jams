//var pointsArray = document.getElementsByClassName('point');

//var animatePoints = function(points) {
var animatePoints = function(){
    /* var revealPoint = function(ptnum) {
         points[ptnum].style.opacity = 1;
         points[ptnum].style.transform = "scaleX(1) translateY(0)";
         points[ptnum].style.msTransform = "scaleX(1) translateY(0)";
         points[ptnum].style.WebkitTransform = "scaleX(1) translateY(0)";
    */
    var revealPoint = function(){
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    
    /*for(var i = 0; i < 3; i++){
        revealPoint(i);
    }*/
    $.each($('.point'), revealPoint);
     };

//window.onload = function() {
    $(window).load(function() {
    if ($(window).height() > 950){
        animatePoints();
    }
    
    /*var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    */
        
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
        
    $(window).scroll(function(event){
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
    /*
    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
            animatePoints(pointsArray);
        }
    });
    */
});
    
   /* animatePoints(); */ 

  