/* global $, Stripe */
/* Javascript should prevent Pro form from submitting, when user fills it out,
and should send card info to Stripe. Stripe will return with a card token.*/

//Document ready.
$(document).on('turnolinks:load', function() {
   var theForm = $('#pro-form');
   var submitBtn = $('#form-submit-btn');
   //Set Stripe public key.
   Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );

   //When user clicks form sumbit btn.
   submitBtn.click(function(event){
      //prevent default submission.
      event.preventDefault();

      //Collect the credit card fields.
      var ccNum = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),
          expYear = $('#card_year').val();
      //Send the card info to Stripe.
      Stripe.createToken({
         number: ccNum,
         cvc: cvcNum,
         exp_month: expmonth,
         exp_year: expYear
      }, stripeResponseHandler)

   })
})





















/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  //When user clicks form submit btn,
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    //Send the card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  //Stripe will return a card token.
  //Inject card token as hidden field into form.
  //Submit form to our Rails app.
});
