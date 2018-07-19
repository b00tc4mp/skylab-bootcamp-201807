// $().ready(function () {
$(window).on('load', function () {
    console.log('running main script');

    // $('form').on('submit', function(e) {
    // 	e.preventDefault();

    // 	var $form = $(this);

    // 	var input = $form.find('input')[0];

    // 	console.log($(input).val());
    // });

    $('form').on('submit', function (e) {
        e.preventDefault()

        console.log('form', this);

        var $form = $(this);

        var input2 = $form.find('input')[1];

        console.log($(input2).val());
    });

    $('.num-list li').click(function () { $(this).toggleClass('active'); });

    // $('form').on('submit', function(e) {
    // 	e.preventDefault();

    // 	var $form = $(this);

    // 	var $input = $form.find('input');

    // 	console.log($input.val());
    // });

    // var $form = $('form');

    // $form.on('submit', function(e) {
    // 	e.preventDefault();

    // 	var $input = $form.find('input');

    // 	console.log($input.val());
    // });

    // $('form').on('submit', function(e) {
    // 	e.preventDefault();

    // 	var $form = $(this);

    // 	var $input = $form.find('input').eq(1);

    // 	console.log($input.val());
    // });

    $("#clickme").click(function () {
        $("#book").animate({
            opacity: 0.25,
            left: "+=50",
            height: "toggle"
        }, 5000, function () {
            // Animation complete.
        });
    });


    var $img = $('#book-2');
    console.log('img', $img.width(), $img.height());
});