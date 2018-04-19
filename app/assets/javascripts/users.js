/* global $, Stripe */
/* Javascript should prevent Pro form from submitting, when user fills it out,
and should send card info to Stripe. Stripe will return with a card token.*/

//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  //When user clicks form submit btn,
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

   //Use Stripe JS library to check for card errors.
   var error = false;

   //Validate card number.
   //Stripe.card.calidateCardNumber(cvcNum)
   if(!Stripe.card.validateCardNumber(ccNum)) {
   //If there are card errors, don't send to Stripe.
   error = true;
   alert('The Credit card number appears to be invalid');
   }
   //validateCVCNumber.
   if(!Stripe.card.validateCVCNumber(cvcNum)) {
   //If there are card errors, don't send to Stripe.
   error = true;
   alert('The CVC number appears to be invalid');
   }
   //Validate Expire Date.
   if(!Stripe.card.validateExpiry(expMonth, expYear)) {
   //If there are card errors, don't send to Stripe.
   error = true;
   alert('The Expiration date appears to be invalid');
   }
   if (error) {
      //If there are card errors, don't send to Stripe.
     submitBtn.prop('disabled', false).val("Sign Up");
   } else {
       //Send the card info to Stripe.
       Stripe.createToken({
         number: ccNum,
         cvc: cvcNum,
         exp_month: expMonth,
         exp_year: expYear
       }, stripeResponseHandler);
    }
    return false; //helps exit out of function
  });
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
     //Get token from the response.
     var token = response.id;
     //Inject card token as hidden field into form.
     theForm.append( $("<input type = "hidden" name = "user[stripe_card_token]">").val(token) );
     //Submit form to our Rails app.
     theForm.get(0).submit();
 }

});
