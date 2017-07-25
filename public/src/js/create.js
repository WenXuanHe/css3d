import '../scss/creation.scss';

var viewer = $('#viewer');
var cube = $('#contain');
var x1, y1, x2, y2, c_x_deg = 0,
    c_y_deg = 0;

viewer.on('touchstart', function(e) {
    x1 = $(this).offset().left; //$(this).offset().left;
    y1 = $(this).offset().top; //$(this).offset().top;
});
viewer.on('touchmove', function(e) {
    x2 = $(this).offset().left;
    y2 = $(this).offset().top;
    var dist_x = x2 - x1,
        dist_y = y2 - y1,
        deg_x = Math.atan2(dist_y, y1) / Math.PI * 180,
        deg_y = -Math.atan2(dist_x, x1) / Math.PI * 180,
        i;
    c_x_deg += deg_x;
    c_y_deg += deg_y;

    cube.css('transform', 'rotateX(' + deg_x + 'deg) rotateY(' + deg_y + 'deg)');
});

$('.control-audio-i').on('click', function() {
    var audio = $(this).next('audio');
    if (audio[0].paused) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
});
