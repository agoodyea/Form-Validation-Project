/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/

// initialisation code
$('#name').focus();
$('#other-title').hide();

// job title event listener
$('#title').on('change', function(e){
    if($(e.target).val() === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
})

// t-shirt selection event listner
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

// activities
$('.activities').on('change', function(e){
    total
})

/*
    -When an activity is checked, see if there is another activity
     with a conflicting time and disable it.
    -When an activity is unchecked, see if there is a confilicting time
     that can be undisabled. 
    -Add the price of checked activity to the total price.
    -Remove price of unchecked activity from total price. 

    -write a get cost function to extract the cost of event as numeral using slice()
    -write a get date/time function to exact d/t and return using search()
*/



