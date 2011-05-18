$(document).ready(function(){

	$.getJSON(sbRoot+'/home/addShows/getDownloadPriorities', {}, function(data){
        var resultStr = '';

        if (data.results.length == 0) {
            resultStr = '<option value="0" selected="selected">Normal</option>';
        } else {
            var current_priority = false;
            
            var keys = []
            
            $.each(data.results, function(index, obj){
            	keys.push(index);
            });
            
            keys.sort();
            keys.reverse();
            
            for (i in keys){
            	var key = keys[i]
                if (key == 0) {
                        selected = ' selected="selected"';
                        current_priority = true;
                }
                else
                        selected = '';

                resultStr += '<option value="' + key + '"' + selected + '>' + data.results[key] + '</option>';
            }
        }
        $('#prioritySelect').html(resultStr)
  	});

    $('#saveDefaultsButton').click(function() {
        var anyQualArray = new Array();
        var bestQualArray = new Array();
        $('#anyQualities option:selected').each(function(i,d){anyQualArray.push($(d).val())});
        $('#bestQualities option:selected').each(function(i,d){bestQualArray.push($(d).val())});

        $.get(sbRoot+'/config/general/saveAddShowDefaults', {defaultStatus: $('#statusSelect').val(),
                                                             anyQualities: anyQualArray.join(','),
                                                             bestQualities: bestQualArray.join(','),
                                                             defaultSeasonFolders: $('#seasonFolders').attr('checked')} );
        $(this).attr('disabled', true);
        $.pnotify({
            pnotify_title: 'Saved Defaults',
            pnotify_text: 'Your "add show" defaults have been set to your current selections.'
        });
    });

    $('#statusSelect, #qualityPreset, #seasonFolders, #anyQualities, #bestQualities, #prioritySelect').change(function(){
        $('#saveDefaultsButton').attr('disabled', false);
    });

});