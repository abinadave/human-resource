$(function() {
	var $signedIn = $('#signed-in-user');
    $signedIn.text(sessionStorage.getItem('fullname')).addClass('text-info');
	if (Number(sessionStorage.getItem('usertype')) === 1) {
		 $signedIn.text('Administrator').addClass('text-primary');
	};
});

jQuery(document).ready(function($) {
	$('.navbar-nav').find('li').click(function(event) {
		/* Act on the event */
		$('.navbar-nav li').removeClass('active');
		$(this).addClass('active');
	});
});

function printSession() {
    $.post('ajax/select/get_session.php', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
    }).success(function(data){
        console.log(data);
    }).fail(function(xhr){
        alert('error type: '+xhr.status);
    });
}

