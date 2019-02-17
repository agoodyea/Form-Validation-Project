/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/

$('#name').focus();
$('#other-title').hide();

$('#title').on('change', function(e){
    if($(e.target).val() === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
})

$('#design').on('change', function(e){
    if($(e.target).val() === 'js puns'){
        $('#color option:eq(0)').attr('selected', true);
        $('#color option:eq(3)').attr('selected', false);

        $('#color option').each(function(index, element){           
            if (index <= 2){
                $(element).show();
            }else{
                $(element).hide()
            }
        })
    }else if($(e.target).val() === 'heart js'){
        $('#color option:eq(3)').attr('selected', true);
        $('#color option:eq(0)').attr('selected', false);

        $('#color option').each(function(index, element){
            if (index > 2){
                $(element).show();
            }else{
                $(element).hide()
            }
    })
    }else{
        $('#color option').each(function(index, element){
            $(element).attr('selected', false);
            $(element).show();
        })
    }
});