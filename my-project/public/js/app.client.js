$(document).ready(function(){
    $('.btn-delete').on('click', function() {

    	var $this = $(this),
    		$form = $this.closest('form'),
    		idUser = $this.closest('tr').find('input.is-user').val(),
    		$inputIdUser = $form.find('input[name="iduser"]');
    	$inputIdUser.val(idUser);

        if(confirm("Do you really want to do this?"))
            $form.submit();
        else
            return false;
    });

	$('.btn-update').on('click', function() {

        if(confirm("Do you really want to do this?")) {
            var $this = $(this),
                $trClosest = $this.closest('tr'),
                idUser = $trClosest.find('input.is-user').val(),
                username = $trClosest.find('input.username').val(),
                email = $trClosest.find('input.email').val(),
                isActive = $trClosest.find('input.is-active').val(),
                $addForm = $('form.add-form');

            $addForm.find('input[name="iduser"]').val(idUser);
            $addForm.find('input[name="username"]').val(username);
            $addForm.find('input[name="email"]').val(email);
            $addForm.find('input[name="isActive"]').prop('checked', (isActive === 'true'));
        } else {
            return false;
        }
	});
});