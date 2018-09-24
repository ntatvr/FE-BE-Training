$(document).ready(function(){

	var messages = [],
		socket = io.connect('http://localhost:3000'),
		$form_chat = $('form.form-chat'),
		$txtMessage = $form_chat.find('input.txt-message'),
		$btnSend = $form_chat.find('button.btn-send'),
		$data_messages = $('.data-messages'),
		$id_user = $form_chat.find('input[name="iduser"]'),
		$fileAvatar = $('#fileAvatar'),
		$txtUsername = $('#txtUsername');

	// get new ID
	$id_user.val(Math.floor((Math.random() * 100000000000) + 1));

	socket.on('message', function(messages) {
		if(messages) {
			$data_messages.html('');
            for (var i = 0; i < messages.length; i++) {
            	var item = messages[i],
            		html = '';
            	if (item.iduser === '') {
            		continue;
            	}

            	if (item.iduser === $id_user.val()) {
            		html = '<div class="chat-container">'
						  	+ '<img src="'
						  	+ ($fileAvatar.val() ? $fileAvatar.val() : '/image/avatar.jpg') + '" alt="Avatar" style="width:100%;">'
						  	+ '<p>'
						  	+ ($txtUsername.val() ? ('<b>' + $txtUsername.val() + ': </b>') : '') + item.message + '</p>'
						  	+ '<span class="time-right">' + timeFormatter(item.time) + '</span>'
						+ '</div>';
            	} else {
            		html = '<div class="chat-container">'
						  	+ '<img class="right" src="/image/avatar.jpg" alt="Avatar" style="width:100%;">'
						  	+ '<p>'
						  	+ ($txtUsername.val() ? ('<b>' + $txtUsername.val() + ': </b>') : '') + item.message + '</p>'
						  	+ '<span class="time-left">' + timeFormatter(item.time) + '</span>'
						+ '</div>';
            	}
            	$data_messages.append(html);
            }

			$data_messages.animate({scrollTop: $data_messages.prop("scrollHeight")});
        } else {
            console.log("There is a problem:", data);
        }
	});

	$btnSend.on('click',function() {
        var message = $txtMessage.val();

        if (message.trim() == '') {
        	return false;
        }

        var data = {
        	iduser : $id_user.val(),
        	message: message,
        	time: new Date()
        }

        socket.emit('send', data);
        $txtMessage.val('');
        return false;
    });

function timeFormatter(dateTime) {

	var date = new Date(dateTime);
	if (date.getHours()>=12){
	    var hour = parseInt(date.getHours()) - 12;
	    var amPm = "PM";
	} else {
	    var hour = date.getHours(); 
	    var amPm = "AM";
	}
	var time = (1990 + date.getYear()) + '-'
			+ (date.getMonth() + 1) 
			+ '-' + date.getDate() + ' ' 
			+ hour + ":" + date.getMinutes() + " " + amPm;
	console.log(time);
	return time;
	}

});