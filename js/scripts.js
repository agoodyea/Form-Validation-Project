/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/

let activityTotal = 0;

// initialisation code
$('#name').focus();
$('#other-title').hide();
$('.activities').append($('span'));
$('.activities span').css('color', 'green');
$('.activities span').hide();


// job title event listener
$('#title').on('change', function(e){
    if($(e.target).val() === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
})

// T-SHIRT SELECTION SECTION ----------------------------------------------

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

// ACTIVITIES SECTION -------------------------------------------------------

// track and display total cost
$('.activities').on('change', function(e){
    let $activityText = $(e.target).parent().text();
    let strEnd = $activityText.length;
    let cost = parseInt($activityText.slice(-3, strEnd));
    $('.activities span').show();

    if ($(event.target).is(':checked')) {
        activityTotal += cost;
        $('.activities span').text('$' + activityTotal);
    }else{
        activityTotal -= cost;
        $('.activities span').text('$' + activityTotal);
    }

    if (activityTotal === 0) {
        $('.activities span').hide();
    }
})

// variables and function for activity clashes
const $jsFrameWorks = $('.activities label input:eq(1)');
const $jsLibs = $('.activities label input:eq(2)');
const $express = $('.activities label input:eq(3)');
const $nodeJs = $('.activities label input:eq(4)');

function stateAndStyleEvent(checkbox){
    return e => {
        if($(e.target).is(':checked')){
            $(checkbox).attr('disabled', true);
            $(checkbox).parent().css('text-decoration', 'line-through');
            $(checkbox).parent().css('color', 'grey');
        }else{
            $(checkbox).attr('disabled', false);
            $(checkbox).parent().css('text-decoration', '');
            $(checkbox).parent().css('color', '');
        }
    }
}

// event listners for individual workshop checkboxes
$($jsFrameWorks).on('change', stateAndStyleEvent($express));
$($jsLibs).on('change', stateAndStyleEvent($nodeJs));
$($express).on('change', stateAndStyleEvent($jsFrameWorks));
$($nodeJs).on('change', stateAndStyleEvent($jsLibs));


// PAYMENT SECTION --------------------------------------------------------

$('#payment option:eq(0)').remove();
$('div p').hide();

$('#payment').on('change', function(e){
    if ($(e.target).val() === 'credit card') {
        $('div p').hide();

    }
    else if ($(e.target).val() === 'paypal') {
        $('div p:eq(0)').show();
        $('div p:eq(1)').hide();
    }
    else {
        $('div p:eq(1)').show();
        $('div p:eq(0)').hide();
    }
})





// if($(e.target).is(':checked')){
//     $($express).attr('disabled', true);
//     $($express).parent().css('text-decoration', 'line-through');
//     $($express).parent().css('color', 'grey');
// }else{
//     $($express).attr('disabled', false);
//     $($express).parent().css('text-decoration', '');
//     $($express).parent().css('color', '');
// }

/*

    -when the js framworks is checked, disable express
    -when the js framworks is unchecked, enable express

    -when js lib is checked, disable node.js
    -when js lib is unchecked, enable node.js

    -when express is checked, disable js frameworks
    -when express is unchecked, enable js frameworks

    -when node.js is checked, disable js lib
    -when node.js is unchecked, enable js lib
*/



