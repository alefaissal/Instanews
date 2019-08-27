
// All JS/jQuery and AJAX goes inside this function
$(function () {
    const $timesMenu = $('#times-menu');
    const $timesLoading = $('.loading');
    const $timesLogo = $('#logo');
    const $timesDrogMenu = $('#drop-menu');
    const $timesUl = $('ul');

    //whats is going to happen after change on selection menu
    $timesMenu.on('change', function () {
        $timesLoading.append('<img class="loading-gif" src="images/newLoader.gif" alt="loading gif" height="60px" width="60px">');
        const selected = $(this).val();
        if (selected !== '') {
            //console.log('The value picked is ' + selected);
            $timesLogo.addClass('logo-animation');
            $timesDrogMenu.addClass('menu-animation');
            loadArticles(selected);

        } else {
            $timesUl.html('');
            $timesLogo.removeClass('logo-animation');
            $timesDrogMenu.removeClass('menu-animation');
            setTimeout(() => { // to slow down the loading gif
                $timesLoading.html('');
            }, 1000);

        }

    });

    //Function to load the articles (img, text and link)
    function loadArticles(selected) {
        $timesUl.html('');
        $.getJSON('https://api.nytimes.com/svc/topstories/v2/' +
            selected + '.json?api-key=F1xf3ui78H7Qu4HpUjn3uwmx5wpEr0V2')
            .done(function (data) {
                const articlesArray = data.results;
                let backImage;  // assign to the image
                let newsUrl;    // assign to the url
                let abstract;   //assign to the text
                let contentToBeAppend;


                //function to append every loop inside the <ul>
                function appendingToAJAX(newsUrl, abstract, backImage) {
                    contentToBeAppend =
                        '<li><a href =' + newsUrl +
                        ' target="_blank" ><div style="background: url(' + backImage + ')  no-repeat center; background-size: cover;">' +
                        '<article>' +
                        '<p>' +
                        abstract +
                        '</p>' +
                        '</article>' +
                        '</div>' +
                        '</a>' +
                        '</li >';

                }


                const filteredArticles = articlesArray.filter((value) => {
                    return value.multimedia[4] !== undefined;
                }).slice(0, 12);

                //console.log(filteredArticles);

                $.each(filteredArticles, function (index, article) {

                    // defining the variables
                    backImage = article.multimedia[4].url;
                    newsUrl = article.url;
                    abstract = article.abstract;

                    // Running func to append variables
                    appendingToAJAX(newsUrl, abstract, backImage);

                    //Appending content to elements
                    $timesUl.append(contentToBeAppend);
                });

            })
            .fail(function (err) {
                console.log(err);

            })
            .always(function () {
                setTimeout(() => { 
                    $timesLoading.html('');
                }, 1000);

            });
    }

}); //end of document ready