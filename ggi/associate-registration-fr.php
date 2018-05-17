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
                        <a class="navbar-brand" href="./"><img src="./images/ggi-logo.png"><span class="nav-brand">La Plateforme GGI</span></a>
                    </div>
                    <!--Navigation -->
                    <ul id="long-nav" class="nav navbar-nav navbar-right long-nav">
                        <li><a href="./">Page d'accueil</a></li>
                        <li><a href="./associates/">Rejoignez-nous</a></li>
                        <li><a href="./clients/">Embauchez nous</a></li>
                        <li><a href="./contact-us">Contactez nous</a></li>
                    </ul>

                    <ul id="sandwich-btn" class="nav navbar-nav float-right sandwich-nav">
                        <li><a onclick="toggleHiddenMenu()"><span>Menu</span><i class="fa fa-bars"></i></a></li>
                    </ul>
                </div>
                <!--pop down-->
                <div id="hidden-menu" class="container-fluid" style="display: none;">
                    <ul class="nav navbar-nav">
                        <li><a href="./">Page d'accueil</a></li>
                        <li><a href="./associates/">Rejoignez-nous</a></li>
                        <li><a href="./clients/">Embauchez nous</a></li>
                        <li><a href="./contact-us">Contactez nous</a></li>
                    </ul>
                </div>
         </nav>
         <div class="container">
<?php
if(isset($_POST['email'])) {
 
    function died($error) {
        // your error code can go here
        echo "<h1>Désolé, quelque chose s'est mal passé.</h1><p>";
        echo "Nous sommes vraiment désolés, mais des erreurs ont été détectées avec le formulaire que vous avez envoyé. ";
        echo "Ces erreurs apparaissent ci-dessous..<br /><br />";
        echo $error."<br /><br />";
        echo "Veuillez revenir en arrière et corriger ces erreurs.<br /><br />";
        echo "</p><button class='btn btn-lg btn-primary' onclick='goBack()'>Revenir</button>";
        die();
    }
 
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['organization']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['expertise']) ||
        !isset($_POST['specific-opportunity']) ||
        !isset($_POST['opportunity-description']) ||
        !isset($_POST['how-soon'])) {
        died('Nous sommes désolés, mais il semble y avoir un problème avec le formulaire que vous avez envoyé..');       
    }     
 
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // required
    if(isset($_POST['registering-as'])){
        $registering_as = $_POST['registering-as']; // required
    }
    $expertise = $_POST['expertise']; // required
    
    $organization = $_POST['organization']; // not required
    $specific_opportunity = $_POST['specific-opportunity']; // not required
    $opportunity_description = $_POST['opportunity-description']; // not required
    $how_soon = $_POST['how-soon']; // not required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if(!preg_match($email_exp,$email_from)) {
      $error_message .= 'L\'adresse e-mail que vous avez saisie ne semble pas être valide.<br />';
    }
 
    if(strlen($name) < 4) {
      $error_message .= 'Le nom que vous avez entré est trop court. S\'il vous plait entrez votre nom entier.<br />';
    }
 
    if(strlen($telephone) < 7) {
      $error_message .= 'Le téléphone que vous avez entré ne semble pas être valide.<br />';
    }
 
    if(!isset($_POST['registering-as'])) {
      $error_message .= 'Vous devez spécifier ce que vous enregistrez en tant que individu et / ou entreprise.<br />';
    }
    
    if(strlen($expertise) < 2) {
      $error_message .= 'Vous devez indiquer votre principal domaine d\'expertise ou d\'intérêt.<br />';
    }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }  
    
    
    $email_message = "". clean_string($name). " would like to register to be an Associate. <br><br><br>" ;
 
       
    // EDIT THE EMAIL AFTER TESTING
    $email_to = "Associates@GGIplatform.ca";
    $email_subject = "Associate Registration: " .clean_string($name);
 
    $email_message .= "Name: ".clean_string($name)."<br>";
    if($organization){
      $email_message .= "Organization: ".clean_string($organization)."<br>";
    }
    $email_message .= "Email: ".clean_string($email_from)."<br>";
    $email_message .= "Telephone: ".clean_string($telephone)."<br><br>";
    
    $email_message .= "Registering As: " .clean_string($registering_as)."<br><br>";
    
    $email_message .= "Field of Expertise:<br>" .clean_string($expertise)."<br><br>";
    
    if($specific_opportunity == 'yes'){
      $email_message .= "Specific opportuntiy:<br>".clean_string($opportunity_description)."<br><br>";
    }
    
    if(!strlen($how_soon) <2){
      $email_message .= "Please contact back within:<br>".clean_string($how_soon)."<br><br>";
    }
 
// create email headers
$headers = "MIME-Version: 1.0";
$headers .= "\r\n". "Content-type:text/html;charset=UTF-8"."\r\n"; 
$headers .= 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
<h1>Succès d'inscription</h1>
<p>Merci de nous contacter. Nous serons en contact avec vous très bientôt.</p>
 <a href="./"><button class="btn btn-primary btn-lg">Retour à la page d'accueil</button></a>
<?php
 
}
?>
             
        </div>
    </body>
</html>