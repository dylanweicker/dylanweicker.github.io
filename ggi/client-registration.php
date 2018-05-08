<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="http://www.ggi.ca/wordpress/wp-content/uploads/2013/09/favicon3.jpg" />
        <link rel="icon" type="image/x-icon" href="http://www.ggi.ca/wordpress/wp-content/uploads/2013/09/favicon3.jpg" />
        <title>GGI Platform</title>
        <meta name="author" content="Dylan Weicker" />
        <meta name="description" content="" />
        <meta name="keywords"  content="" />
        <meta name="Resource-type" content="Document" />

        <link rel="stylesheet" href="./navbar.css">
        <link rel="stylesheet" href="./global.css">
        <link rel="stylesheet" href="./form-submission.css">
        <!--[if IE]>
            <script type="text/javascript">
                 var console = { log: function() {} };
            </script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./vendors/scrolloverflow.js"></script>
        <script type="text/javascript" src="./jquery.fullPage.js"></script>
        <script type="text/javascript" src="./script.js"></script>


        <!-- symbols -->
        <link rel="stylesheet" href="./icons/css/font-awesome.min.css">
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ" crossorigin="anonymous"></script>
        <!-- Latest compiled and minified CSS -->
        <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous"-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

        <!-- Custom CSS -->
        <link rel="stylesheet" href="./navbar.css">
        <link rel="stylesheet" href="./global.css">
        <link rel="stylesheet" href="./form-submission.css">

        <!-- Custom Scripts -->
        <script src="./script.js"></script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:400,700" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">

                    <!-- brand -->
                    <div class="navbar-header">
                        <a class="navbar-brand" href="./"><img src="./images/ggi-logo.png"><span class="nav-brand">GGI Platform</span></a>
                    </div>
                    <!--Navigation -->
                    <ul id="long-nav" class="nav navbar-nav navbar-right long-nav">
                        <li><a href="./">Home</a></li>
                        <li><a href="./associates/">Join Us</a></li>
                        <li><a href="./clients/">Hire Us</a></li>
                        <li><a href="./contact-us">Contact Us</a></li>
                    </ul>

                    <ul id="sandwich-btn" class="nav navbar-nav float-right sandwich-nav">
                        <li><a onclick="toggleHiddenMenu()"><span>Menu</span><i class="fa fa-bars"></i></a></li>
                    </ul>
                </div>
                <!--pop down-->
                <div id="hidden-menu" class="container-fluid" style="display: none;">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="./">Home</a></li>
                        <li><a href="./associates/">Join Us</a></li>
                        <li><a href="./clients/">Hire Us</a></li>
                        <li><a href="./contact-us">Contact Us</a></li>
                    </ul>
                </div>
         </nav>
         <div class="container">
<?php
if(isset($_POST['email'])) {
 
    function died($error) {
        // your error code can go here
        echo "<h1>Registration Failed</h1><p>";
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        echo "</p><button class='btn btn-lg btn-primary' onclick='goBack()'>Go Back</button>";
        die();
    }
 
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['organization']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['project']) ||
        !isset($_POST['services']) ||
        !isset($_POST['comments']) ||
        !isset($_POST['how-soon'])) {
        died('We are sorry, but there appears to be a problem with our form.');       
    }     
 
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // required
    
    
    $organization = $_POST['organization']; // not required
    $project = $_POST['project']; // not required
    $reference = $_POST['reference']; // not required
    $services = $_POST['services']; // not required
    $comments = $_POST['comments']; // not required
    $how_soon = $_POST['how-soon']; // not required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if(!preg_match($email_exp,$email_from)) {
      $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }
 
    if(strlen($name) < 4) {
      $error_message .= 'The name you entered is too short. Please enter your full name.<br />';
    }
 
    if(strlen($telephone) < 7) {
      $error_message .= 'The telephone you entered does not appear to be valid.<br />';
    }
   
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }  
    
    
    $email_message = "". clean_string($name). " would like to request a quote or more information. \n\n\n" ;
 
       
    // EDIT THE EMAIL AFTER TESTING
    $email_to = "dylanweicker@gmail.com";
    $email_subject = "Quote or Info Request: " .clean_string($name);
 
    $email_message .= "Name: ".clean_string($name)."\n";
    if($organization){
      $email_message .= "Organization: ".clean_string($organization)."\n";
    }
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n\n";
    
    if(strlen($project) > 0){
      $email_message .= "Project Description:\n". $project."\n\n";
    }
    
    if(strlen($comments) > 0){
      $email_message .= "Questions or Comments:\n". $project."\n\n";
    }
    
    if($services == 'yes'){
      $email_message .= "This client has explicitly requested more information about services.\n\n";
    }
    
    if(!strlen($how_soon) > 0){
      $email_message .= "Please contact back within:\n".clean_string($how_soon)."\n\n";
    }
 
// create email headers
$headers = "MIME-Version: 1.0" .
"\r\n". "Content-type:text/html;charset=UTF-8" .
"\r\n"'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
<h1>Registration Success</h1>
<p>Thank you for contacting us. We will be in touch with you very soon.</p>
 <a href="./"><button class="btn btn-primary btn-lg">Return Home</button></a>
<?php
 
}
?>
             
        </div>
    </body>
</html>