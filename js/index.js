 document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if(event.scale > 1) {
      event.preventDefault();
    }
  }, false);

$(document).ready(function() {
		
			$('#button').click(function(){
				$('body').toggleClass('day');  
			});

		});