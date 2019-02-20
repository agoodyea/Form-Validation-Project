/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/


// initialisation code
let activityTotal = 0;
$('#name').focus();
$('#other-title').hide();
$('.activities').append($('span'));
$('.activities span').css('color', 'green');
$('.activities span').hide();
$('#colors-js-puns').hide();

// function to insert hidden error messages
const insertMessage = (msgElement, beforeElement) => {
    varName = $(msgElement);
    varName.css('color', 'red');
    $(varName).insertBefore(beforeElement);
    $(varName).hide();
    return varName;
}

// created error messages
$nameError = insertMessage($('<p>Please enter a valid name</p>'), $('label:eq(0)'));
$emailError = insertMessage($('<p>Please enter a valid email</p>'), $('label:eq(1)'));
$activityError = insertMessage($('<p>Please choose at least one activity</p>'), $('.activities label:eq(0)'));
$ccError = insertMessage($('<p>Please enter a valid credit card number that is between 13-16 digits long</p>'), $('#credit-card'));
$ccError2 = insertMessage($('<p>Please enter a valid credit card number</p>'), $('#credit-card'));
$zipError = insertMessage($('<p>Please enter a valid zip code</p>'), $('#credit-card'));
$cvvError = insertMessage($('<p>Please enter a valid CVV</p>'), $('#credit-card'));


// job title event listener
$('#title').on('change', function(e){
    if($(e.target).val() === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
})

// T-SHIRT SELECTION SECTION ----------------------------------------------

// event listner on design selection. Determines what is shown in the color selection field.
$('#design').on('change', function(e){
    if($(e.target).val() === 'js puns'){
        $('#colors-js-puns').show();
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
        $('#colors-js-puns').show();
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
            $('#colors-js-puns').hide();
            $(element).attr('selected', false);
            $(element).show();
        })
    }
});

$()

// ACTIVITIES SECTION -------------------------------------------------------

// listners to track and display total cost of activities
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

// organise payment section
$('#payment').parent().addClass('paymentField');
$('#payment option:eq(0)').remove();
$('.paymentField div p').hide();

// listner to determine when to show paypal and bitcoin messages
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

// boolean variables for each field. will be assigned true when valid.
let name = false;
let email = false;
let activities = false;
let cc = false;
let zip = false;
let cvv = false;

// regex's test functions for each form field.
function isNameTrue(name){
    return /^[A-Za-z ]+$/.test(name)
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

// event listner function for name and email.
// determines if inputs are valid and if error messages should be shown.
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

// event listner function for payment section.
// determines if inputs are valid and if error messages should be shown.
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
                if(text === ''){
                    $ccError2.show()
                    $ccError.hide();
                }else{
                    $ccError.show();
                    $ccError2.hide();
                }
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

// name
$('#name').on('blur', NameEmailListner(isNameTrue));

// email
$('#mail').on('input', NameEmailListner(isEmailTrue));

// activities listner that determines if at least one activity is selected
// else return error message.
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

//payment listner that disables error messages if paypal or bitcoin are selected.
$('#payment').on('change', function(e){
    if($(e.target).val() !== 'credit card') {
        $('#cc-num').css('border-color', '');
        $('#zip').css('border-color', '');
        $('#cvv').css('border-color', '');
        $ccError.hide();
        $cvvError.hide();
        $zipError.hide();
        cc = true;
        zip = true;
        cvv = true;
    }
})

// payment
$('#cc-num').on('blur', paymentListner(isCCTrue));
$('#zip').on('blur', paymentListner(isZipTrue));
$('#cvv').on('blur', paymentListner(isCvvTrue));

// form listner that prevents submission if one input isnt valid.
$('form').on('submit', function(e){
    if(!name || !email || !cc || !zip || !cvv){
        console.log('yes');
        e.preventDefault();
    };
})




