var timesteps;
var colors = ["#FFFDB2", "#FF8F87", "#9FFF78"];

$(document).ready(function() {
	$('#play').prop('disabled', true);
	var graph;
	sigma.parsers.gexf('sample.gexf', { container: 'sigma'}, function(s) {
		graph = s.graph;
		$('#timestep').change(function () {
			var time = $(this).val();
			for (var node = 1; node < graph.nodes().length; node++) {
				var nodeprop = graph.nodes()[node];
				var id = nodeprop.id;
				nodeprop.color = colors[timesteps[id][time]];
				nodeprop.size = 1;
				//nodeprop.originalColor = colors[timesteps[id][time]];;
			}
			s.refresh();
		});
		var playing = false;
		var i = 1;                  	//  set your counter to 1
		function play () {        	//  create a loop function
	  		setTimeout(function () {    //  call a 3s setTimeout when the loop is called
				$('#timestep').val(i);
				$('#timestep').change();
				if (playing) {
					i++;                    //  increment the counter
		      		if (i < 60) {           //  if the counter < 10, call the loop function
		         		play();           //  ..  again which will trigger another 
		      		}
		      	}
	   		}, 200)
		} 
		$('#play').click(function () {
			if (!playing) {
				playing = true;
				play();
				$('#play').text('Playing (click to stop)');
				$('#play').parent().addClass('active');
			}
			else {
				playing = false;
				$('#play').text('Play');
			}
		});
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        timesteps = JSON.parse(xmlhttp.responseText);
		        console.log('json back');
				$('#play').prop('disabled', false);
				$('#play > span').text("Play");
				$('#timestep').change();
		   	}	
		};
		xmlhttp.open("GET", 'states.json', true);
		xmlhttp.send();
	});

});