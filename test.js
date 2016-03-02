$(document).ready(function() {
    $(window).load(function () {

        var accessToken = "?access_token=<token>";
        var issuesURL = "https://api.github.com/repos/<user>/<repo>/issues" + accessToken;
        $( '#result' ).html( "" );
        var html = "<h2>Reported Issues</h2>";

        function get_URL(url) {
            return $.ajax({
                url: issuesURL,
                dataType: "jsonp",
                data: url
            });
        }

        var body = $('textarea.comment').val();
        var html2 = "<li>";

        get_URL().done(function(data){
            $.each( data.data, function ( i, item ) {
                var comments = this.comments;
                var login = this.user.login;
                var id = this.number;

                //console.log(issues_url);
                $.ajax({
                    url : this.comments_url + accessToken,
                    dataType : "jsonp",
                    success : function ( returndata ) {
                        if (comments > 0) {
                                $.each(returndata.data, function (i, item) {
                                    for (var i = 0; i < $(returndata).length; i++) {
                                        var url = this.issue_url;
                                        var lastTwo = url.substr(url.length - 2);
                                        console.log(lastTwo);
                                        html2 += '<li><b>User </b>' + login + ' commented:' +
                                            '<li>' + this.body + '</li>';
                                    }
                                });
                        }
                        $('#'+id).append(html2);
                    }, // close success handler
                });

            });
            html2 += '<li>' + '<textarea class="comment" rows="4" cols="50" placeholder="Comments? Leave them here! "></textarea>' + '</li>' +
                '</li>';
        });

//TODO: milestone and comments plus input comment form
        $.ajax( {
            url : issuesURL,
            dataType : "jsonp",
            success : function ( returndata ) {
                $.each( returndata.data, function ( i, item ) {
                    var string_labels = JSON.stringify(this.labels); //turn labels array into string
                    var jsonData = JSON.parse(string_labels);        //turn string into javascript object
                    for (var i = 0; i < jsonData.length; i++) {
                        var counter = jsonData[i];
                        var labels = (counter.name);
                    }
                    html += '<li>' +
                    '<h4>' + this.title + '</h4>' +
                    '<ul>' +
                    '<li>' + '<b>Issue Number: </b>' + this.number + '</li>' +
                    '<li>' + '<b>Status: </b>' + this.state + '</li>' +
                    '<li>' + '<b>Tags: </b>' + labels + '</li>' +
                    '<li>' + '<b>Description: </b>' + this.body + '</li>' +
                    '<li>' + '<b>Comments: </b>' + this.comments + '</li>' +
                    '<div class="comments" id='+ this.number +'></div>'+
                    '</ul>' +
                    '</li>';
                } );
                $( '#result' ).append( html );

            }, // close success handler
            error: function(returndata) {
                console.log(returndata);
            }
        });



});
    //data: JSON.stringify({
      //  'body': body
   //}),


        vex.defaultOptions.className = 'vex-theme-flat-attack';                       //styling Vex Frame
        $('body').on('click', '.start', function(){ vex_issuesForm(); } );         // adding event to submit button

        var vex_issuesForm = function() {
            vex.dialog.open({
                message: '<div>Please enter your issue here:</div>', //first element of content in frame
                input: '<input type=\"text\" class=\"title\" name=\"title\" required placeholder=\"Title\"  />\n ' +
                '<textarea class=\"body\" rows=\"8\" cols=\"50\" placeholder=\"Submit details of your issue here ... \"></textarea>\n' +
                '<input type=\"email\" class=\"email\" required placeholder=\"Email\" />',
                showCloseButton: true,                                          // default is false for vex.dialog
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {text: 'Submit'}),     // For Yes
                ],
                callback: function (response) {
                    if (response == false) return false;                        // call when window is closed
                    else return ajaxCall();                                     // call Ajax on submit
                }
            });
        }

        function ajaxCall () {
            var title = $('input.title').val();
            var user = $('input.email').val();
            var body = $('textarea.body').val() + ('<br />') + user;
            var accessToken = "?access_token=<token>";
            var issuesURL = "https://api.github.com/repos/<user>/<repo>/issues" + accessToken;

            $.ajax({
                type: "POST",
                url: issuesURL,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    'title': title,
                    'body': body
                }),
                success: function (response) {
                    // console.log(response);
                    return vex_success();
                },
                error: function() {
                    return vex_error();
                },
            });
        }

        var vex_success = function() {
            vex.open({
                content: '<div>Your issue has been submitted!<br /> Please allow up to 3 business days for a response.</div>'
            });
        };
        var vex_error = function() {
            vex.open({
                content: '<div>Oh no!<br /> Looks like something went wrong,<br /> please refresh page and resubmit the issue.</div>'
            });
        };
});
