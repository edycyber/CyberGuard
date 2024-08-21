<?php
// The URL you want to fetch
$url = "https://ai-guardian.flutterflow.app/";

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the content as a string
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects, if any

// Execute the request
$content = curl_exec($ch);

// Close the cURL session
curl_close($ch);

// Output the content
echo $content;
?>
