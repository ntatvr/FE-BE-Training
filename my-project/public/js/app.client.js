$(document).ready(function(){
    $('.btn-delete').on('click', function() {

    	var $this = $(this),
    		$form = $this.closest('form');
    		idUser = $this.closest('tr').find('input.is-user').val()
    		$inputIdUser = $form.find('input[name="iduser"]');
    	$inputIdUser.val(idUser);
    	$form.submit();
    });

	$('.btn-update').on('click', function() {
		alert("To be update");
	});
});