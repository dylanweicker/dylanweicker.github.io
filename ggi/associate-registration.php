<?php
if(isset($_POST['email'])) {
 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['organization']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['registering-as']) ||
        !isset($_POST['expertise']) ||
        !isset($_POST['specific-opportunity']) ||
        !isset($_POST['opportunity-description']) ||
        !isset($_POST['how-soon'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }     
 
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // required
    $registering_as = $_POST['registering-as']; // required
    $expertise = $_POST['expertise']; // required
    
    $organization = $_POST['organization']; // not required
    $specific_opportunity = $_POST['specific-opportunity']; // not required
    $opportunity_description = $_POST['opportunity-description']; // not required
    $how_soon = $_POST['how-soon']; // not required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if(!preg_match($email_exp,$email_from)) {
      $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }
 
    if(strlen(name) < 4) {
      $error_message .= 'The name you entered is too short. Please enter your full name.<br />';
    }
 
    if(strlen($telephone) < 7) {
      $error_message .= 'The telephone you entered does not appear to be valid.<br />';
    }
 
    if(!$registering_as) {
      $error_message .= 'You must specify what you are registering as (i.e. as an individual or a firm).<br />';
    }
    
    if(strlen(expertise) < 2) {
      $error_message .= 'You must specify your primary area of expertise or interest.<br />';
    }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "". clean_string($name). "would like to register to be an Associate.";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }    
    
    // EDIT THE EMAIL AFTER TESTING
    $email_to = "dylanweicker@gmail.com";
    $email_subject = "Associate Registration: " .clean_string($name);
 
    $email_message .= "<b>Name:</b> ".clean_string($name)."\n";
    if($organization){
      $email_message .= "<b>Organization:</b> ".clean_string(organization)."\n";
    }
    $email_message .= "<b>Email</b>: ".clean_string($email_from)."\n";
    $email_message .= "<b>Telephone:</b> ".clean_string($telephone)."\n\n";
    $email_message .= "<b>Registering As:</b> " .clean_string($registering_as)."\n";
    $email_message .= "<b>Field of Expertise:</b>\n " .clean_string($expertise)."\n\n";
    if($specific_opportunity == true){
      $email_message .= "<b>Specific opportuntiy:</b>\n ".clean_string($opportunity_description)."\n\n";
    }
    if(!strlen($how_soon) <2){
      $email_message .= "<b>Please contact back within:</b> ".clean_string($how_soon)."\n\n";
    }
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 
Thank you for contacting us. We will be in touch with you very soon.
 
<?php
 
}
?>