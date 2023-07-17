/******************************************************************************/
/****************"**************************************************************/
/* load braintree payment method form ui
 */
var nonceObj;

function paymentNonceGenerate(client_token) {
    var form = document.querySelector('#payment-form');
    // var button = document.querySelector('#submit-button');
    braintree.dropin.create({
        authorization: client_token,
        selector: '#bt-dropin',
        // paypal: {
        //     flow: 'vault'
        // }
    }, function(createErr, instance) {
        nonceObj = instance;
        if (createErr) {
            console.log('Create Error', createErr);
            return;
        }
        //   form.addEventListener('submit', function(event) {

        //       event.preventDefault();

        //       instance.requestPaymentMethod(function(err, payload) {
        //           if (err) {
        //               console.log('Request Payment Method Error', err);
        //               return;
        //           }

        //           // Add the nonce to the form and submit
        //           alert(payload.nonce);

        //           document.querySelector('#nonce').value = payload.nonce;

        //           //form.submit();
        //       });
        //   });
    });
}
/******************************************************************************/
/****************"**************************************************************/
/**
 *  ganarate nonce for  braintree payment method transesction
 */

function paymentMethodNonce(client_token) {
    // var form = document.querySelector('#payment-form');

    nonceObj.requestPaymentMethod(function(err, payload) {
        if (err) {
            console.log('Request Payment Method Error', err);
            return;
        }
        // Add the nonce to the form and submit
        //console.log(payload)
        document.querySelector('#nonce').value = payload.nonce;

        //       //form.submit();
    });
}

/******************************************************************************/
/****************"**************************************************************/

/* get card details from form ui --------------------------------------
 */
// function getIframeContent(frameID) {

//     var frameObj = document.getElementById(frameID);

//     // var frameContent = frameObj.contentWindow.document.getElementById("credit-card-number");

//     var frameVar = document.getElementById("credit-card-number");

//     frameContent = frameObj.contentWindow.postMessage(frameVar, 'https://assets.braintreegateway.com/web/3.85.3/html/hosted-fields-frame.min.html#bc8d098f-d122-4643-8494-d0a6fd7f5a6a');

//     console.log(frameContent);
// }

/******************************************************************************/
/****************"**************************************************************/
/**
 *close sweet alert after redirect to support ticket system
 */
function goToSupportTicket() {
    swal.clickConfirm();
}