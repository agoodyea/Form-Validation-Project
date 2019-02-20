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

const insertMessage = (msgElement, beforeElement) => {
    varName = $(msgElement);
    varName.css('color', 'red');
    $(varName).insertBefore(beforeElement);
    $(varName).hide();
    return varName;
}

$nameError = insertMessage($('<p>Please enter a valid name</p>'), $('label:eq(0)'));
$emailError = insertMessage($('<p>Please enter a valid email</p>'), $('label:eq(1)'));
$activityError = insertMessage($('<p>Please choose atleast one activity</p>'), $('.activities label:eq(0)'));
$ccError = insertMessage($('<p>Please enter a valid credit card number (13-16 digits)</p>'), $('#credit-card'));
$zipError = insertMessage($('<p>Please enter a valid zip code</p>'), $('#credit-card'));
$cvvError = insertMessage($('<p>Please enter a valid CVV</p>'), $('#credit-card'));



// $nameError = $('<span>Please enter a valid name</span>');
// $($nameError).insertBefore('label:eq(0)');


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
    $('.activities span:eq(1)').show();

    if ($(event.target).is(':checked')) {
        activityTotal += cost;
        $('.activities span:eq(1)').text('$' + activityTotal);
    }else{
        activityTotal -= cost;
        $('.activities span:eq(1)').text('$' + activityTotal);
    }

    if (activityTotal === 0) {
        $('.activities span:eq(1)').hide();
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

$('#payment').parent().addClass('paymentField');
$('#payment option:eq(0)').remove();
$('.paymentField div p').hide();

$('#payment').on('change', function(e){
    if ($(e.target).val() === 'credit card') {
        $('div p').hide();

    }
    else if ($(e.target).val() === 'paypal') {
        $('.paymentField div p:eq(0)').show();
        $('.paymentField div p:eq(1)').hide();
    }
    else {
        $('.paymentField div p:eq(1)').show();
        $('.paymentField div p:eq(0)').hide();
    }
})

// FORM VALIDATION -----------------------------------------------------------

let name = false;
let email = false;
let activities = false;
let cc = false;
let zip = false;
let cvv = false;

function isNameTrue(name){
    return /^\w+$/.test(name)
}

function isEmailTrue(email){
    return /^[^@]+@[^@]+\.[a-z]+$/i.test(email);
}

function isCCTrue(number){
    return /^\d{13,16}$/.test(number);
}

function isZipTrue(zip){
    return /^\d{5}$/.test(zip);
}

function isCvvTrue(cvv){
    return  /^\d{3}$/.test(cvv);
}

// event listner functions
function NameEmailListner(isValid){
    return e => {
        const id = $(e.target).attr('id')
        const text = $(e.target).val();
        const valid = isValid(text);
        if(!valid){
            $(e.target).css('border-color', 'red');
            if(id === 'name' ){
                name = false;
                $nameError.show();
            }else{
                email = false;
                $emailError.show();
            }
        }else{
            $(e.target).css('border-color', '');
            if(id === 'name' ){
                name = true;
                $nameError.hide();
            }else{
                email = true;
                $emailError.hide();
            }
        }
    }
}

function paymentListner(isValid){
    return e => {
        const id = $(e.target).attr('id');
        const text = $(e.target).val();
        const valid = isValid(text);
        const selection = $('#payment').val();
        if(!valid && selection === 'credit card'){
            $(e.target).css('border-color', 'red');
            if(id === 'cc-num'){
                cc = false;
                $ccError.show();
            }else if(id === 'zip'){
                zip = false;
                $zipError.show();
            }else{
                cvv = false
                $cvvError.show();
            }

        }else{
            $(e.target).css('border-color', '');
            if(id === 'cc-num'){
                cc = true;
                $ccError.hide();
            }else if(id === 'zip'){
                zip = true;
                $zipError.hide();
            }else{
                cvv = true
                $cvvError.hide();
            }
        }
    } 
}

// Event Listners

//name
$('#name').on('blur', NameEmailListner(isNameTrue));

//email
$('#mail').on('blur', NameEmailListner(isEmailTrue));

//activities
$('.activities').on('change', function(){
    $('.activities label input').each(function(){
        if(!$(this).is(':checked')){
            $('.activities').css('color', 'red');
            activities = false;
            $activityError.show();
        }else{
            $('.activities:eq(0)').css('color', '');
            activities = true;
            $activityError.hide();
            return false;
        }
    }
    )   
    }
);

//payment
$('#payment').on('change', function(e){
    if($(e.target).val() !== 'credit card') {
        $('#cc-num').css('border-color', '');
        $('#zip').css('border-color', '');
        $('#cvv').css('border-color', '');
        $ccError.hide();
        $cvvError.hide();
        $zipError.hide();
    }
})

$('#cc-num').on('blur', paymentListner(isCCTrue));
$('#zip').on('blur', paymentListner(isZipTrue));
$('#cvv').on('blur', paymentListner(isCvvTrue));

$('form').on('submit', function(e){
    if(!name || !email || !cc || !zip || !cvv){
        console.log('yes');
        e.preventDefault();
    };
})



/*
I need to check each indiviual isTrue to see if they are all true, and if even one isnt preventDefault.
*/



