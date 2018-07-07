//document.addEventListener("contextmenu",function(e){e.preventDefault()},!1)

$('#team-slider2').owlCarousel({
    loop : true,
    dots : false,
    nav : false,
    autoplay : true,
    autoplayHoverPause : true,
    autoHeight : true,
    responsiveClass :true,
    responsive : {
        0 : {
            items: 1
        },
        540 : {
            items: 1,
        },
        720 : {
            items: 2,
        },
        992 : {
            items: 3,
        },
        1140 : {
            items: 4,
        },
    }
});

$('#myModal').on('show.bs.modal', function (e) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog bounceIn animated');
})
$('#myModal').on('hide.bs.modal', function (e) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog flipOutX animated');
})