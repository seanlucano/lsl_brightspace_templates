/** Prompt **/

//selectors
 const promptFeedbackButton = document.querySelector('#prompt .btn.reveal');
 const promptResetButton = document.querySelector("#prompt .reset");
 const promptFeedbackText = document.querySelector("#prompt .feedback")
 const promptTextArea = document.querySelector('#prompt textarea');
 const promptResult = document.querySelector('#prompt .result');
 
//listeners
 promptFeedbackButton.addEventListener("click", reveal);
 promptResetButton.addEventListener("click", reset);

//handlers
 function reveal(event) {
   console.log(event);
   promptFeedbackButton.classList.add('hidden');
   promptResetButton.classList.remove('hidden');
   promptFeedbackText.classList.remove('hidden');
   promptTextArea.classList.add('hidden');
   promptResult.innerHTML = 'You answered:<br> ' + promptTextArea.value;
   promptResult.classList.remove('hidden');
 }

 function reset(event) {
   promptFeedbackButton.classList.remove('hidden');
   promptResetButton.classList.add('hidden');
   promptFeedbackText.classList.add('hidden');
   promptTextArea.classList.remove('hidden');
   promptResult.classList.add('hidden');
   promptTextArea.value = '';
 }

 /** Multiple Choice **/



/** Feedback **/


// selectors
  const form = document.getElementById('feedback-form');
  const feedbackButtons = document.querySelectorAll('.feedback-btn')
  const positiveBtn = document.getElementById('positive');
  const negativeBtn = document.getElementById('negative');
  const submissionArea = document.getElementById('submission-area');
  const selectionFeedback = document.getElementById('selection-feedback')
  const sendCommentsBtn = document.getElementById('send-comments');
  const feedbackText = document.getElementById('feedback-text');
  const variableText = document.querySelector('.variable-text');

//data variables to be sent on form actions
  let feedback_type = "";
  let feedback_text = "";

// selecting feedback type
feedbackButtons.forEach(button => button.addEventListener("click", setFeedbackType)); 
  
function setFeedbackType(event) {
  feedback_type = event.currentTarget.value;
  // console.log(event.currentTarget.value);
  submissionArea.classList.remove('hidden');
  feedbackButtons.forEach(button => button.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
  variableText.innerHTML = feedback_type;
} 


// user submits form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  feedbackSentMessage();
  feedback_text = feedbackText.value;
  feedbackButtons.forEach(button => button.setAttribute("disabled", " "));
       
  // prepare form data for post 
  const data = new FormData(form);
  
  let date = new Date()
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  date = mm + '/' + dd + '/' + yyyy;
  const action = e.target.action;
  const url = window.location.href;
  
  

  data.append("url", url);
  data.append("date", date);
  data.append("feedback_type", feedback_type);
  data.append("feedback_text", feedback_text);

  fetch(action, {
    method: 'POST',
    body: data,
  })
  .then(() => {
  feedback_type = "";
  
  })
});

//feedback message 
function feedbackSentMessage(event) {
submissionArea.innerHTML = "<h4>Thank you for your feedback!</h4> <p>This feedback will not go directly to your instructor. If you have a timely question and need a response, please contact them directly.</p>"
}

window.onbeforeunload = function(){
 if (feedback_type != false) {
  form.requestSubmit();
  console.log(".submit");
 }
}
   
 
