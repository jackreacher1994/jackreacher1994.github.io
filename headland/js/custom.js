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