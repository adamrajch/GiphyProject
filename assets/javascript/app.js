$(document).ready(function () {

    var myKey = 'Nz7emjGc1BLJWOpArzK8tQH641rEB6XO';
    var topics = ['fashion', 'streetwear', 'romania', 'grip', 'kpop', 'guitars', 'fish', 'sharks', 'puppies', 'anime'];
    var currentTopic;
    var topicAPI;
    var gifOffset = 0;
    for (let i = 0; i < topics.length; i++) {
        var topicButton = $('<button>');
        topicButton.text(topics[i].toUpperCase());
        topicButton.addClass('butt');
        topicButton.data('unique', topics[i])
        $('.buttonHolder').append(topicButton);
    }

    $(document).on('click', '.butt', function () {
        // event.preventDefault();
        topicAPI = $(this).data().unique;
        var customKey = 'https://api.giphy.com/v1/gifs/search?q=' + topicAPI + '&api_key=' + myKey + '&limit=10&type=CLICK';

        if (currentTopic == null) {
            currentTopic = topicAPI;

            $.ajax({
                url: customKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for (let i = 0; i < 10; i++) {

                    var newP = $('<div>').text('Rating: ' + response.data[i].rating + '    Title: ' + response.data[i].title)

                    newP.append('<br><img src= ' + response.data[i].images.fixed_width_still.url + ' data-still= ' + response.data[i].images.fixed_width_still.url + ' data-animate= "' + response.data[i].images.fixed_width.url + '" data-state ="still" class ="gif"><br>')
                    newP.addClass('title', response.data[i].title);
                    var faveDL = $('<button>').addClass('fave').text('Fave')
                    newP.append(faveDL)
                    var newDiv = $('<div>')
                    newP.addClass('rating')
                    newDiv.addClass('gifDiv');
                    newDiv.append(newP);
                    $('.gifHolder').append(newDiv)
                }

            })
        }
        else if (currentTopic != topicAPI) {
            gifOffset = 0;
            currentTopic = topicAPI;
            $('.gifHolder').empty();
            $.ajax({
                url: customKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for (let i = 0; i < 10; i++) {

                    var newP = $('<p>').text('Rating: ' + response.data[i].rating)
                    newP.append('<br><img src= ' + response.data[i].images.fixed_width_still.url + ' data-still= ' + response.data[i].images.fixed_width_still.url + ' data-animate= "' + response.data[i].images.fixed_width_still.url + '" data-state ="still" class ="gif">')
                    var newDiv = $('<div>')
                    newDiv.addClass('gifDiv');
                    newDiv.append(newP);
                    $('.gifHolder').append(newDiv)
                }

            })
        }
        else {
            gifOffset += 10;
            currentTopic = topicAPI;
            customKey = customKey + '&offset=' + gifOffset
            $.ajax({
                url: customKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for (let i = 0; i < 10; i++) {

                    var newP = $('<p>').text('Rating: ' + response.data[i].rating)
                    newP.append('<br><img src= ' + response.data[i].images.fixed_width_still.url + ' data-still= ' + response.data[i].images.fixed_width_still.url + ' data-animate= "' + response.data[i].images.fixed_width_still.url + '" data-state ="still" class ="gif">')
                    var newDiv = $('<div>')
                    newDiv.addClass('gifDiv');
                    newDiv.append(newP);
                    $('.gifHolder').append(newDiv)
                }

            })
        }

    })
    $('#addGif').on('click', function (event) {
        // event.preventDefault();
        console.log($('.newTopic').val().length)
        if ($('.newTopic').val().length == 0) {

        }
        else {
            var val = $('.newTopic').val();
            var topicButton = $('<button>');
            topicButton.text(val.toUpperCase());
            topicButton.addClass('butt');
            topicButton.data('unique', val)
            $('.buttonHolder').append(topicButton);
        }

    })

    $(document).on('click', '.gif', function () {
        console.log($(this));
        console.log($(this).data().state);

        if ($(this).data().state == 'still') {

            $(this).attr('src', $(this).attr('data-animate'))
            $(this).data().state = 'animate';
            console.log($(this).attr('data-state'))
            console.log($(this).data().state)
        }
        else if ($(this).data().state == 'animate') {

            $(this).attr('src', $(this).attr('data-still'))
            $(this).data().state = 'still';
        }

    })
    // $(document).on('mouseover', '.gif', function () {
    //     console.log('working')
    //     var newD = $('<div>')



    // })
    $(document).on('click', '#favorites', function () {
        $('.gifHolder').empty();

    })
    $(document).on('click', '.fave', function () {
        console.log('yeet')
        console.log($(this).parent())

    })
})



