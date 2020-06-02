<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 1000');
	header("X-Frame-Options: SAMEORIGIN");
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
		header("X-Frame-Options: SAMEORIGIN");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }
    exit(0);
}
$entityBody = file_get_contents('php://input');
$result = json_decode($entityBody);

$dom = new DOMDocument();	

@$dom->loadHTML($result->data);
//$dom->loadHTML($result->data);
   
$file_youtube_link = '';
$array = [];
$array['instructions'] = '';
$instructions = '';
$submissionDate = '';
foreach ($dom->getElementsByTagName('p') as $item) {
	
	if(isset($item->firstChild->tagName) && $item->firstChild->tagName !== 'a') {
		if (stripos($item->nodeValue, 'date') !== false){
			$submissionDate = $item->nodeValue;
		} else {
			$instructions.= "<li>".$item->nodeValue."</li>";
		}						
	}	
	if(isset($item->firstChild->wholeText)){
		if (stripos($item->firstChild->wholeText, 'date') !== false){
			$submissionDate = $item->firstChild->wholeText;
		} else {
			$instructions.= "<li>".$item->firstChild->wholeText."</li>";
		}
	}
	if(isset($item->firstChild->tagName) && $item->firstChild->tagName == 'a') {
		$file_youtube_link = $item->firstChild;
		foreach($file_youtube_link->attributes as $attr){
			if(strpos($attr->value,"youtu")!== false){
				$array['youtubelink'] = $attr->value;
				$array['youtubename'] = $file_youtube_link->nodeValue;
			}	
			else {
				if($attr->name == 'href') {
					$array['filelink'] = $attr->value;
				}
				$array['filename'] = $file_youtube_link->nodeValue;
			}
		}
	}
}
if(!empty($dom->getElementsByTagName('object'))){
	foreach ($dom->getElementsByTagName('object') as $item) {
		foreach($item->attributes as $attr){
			if($attr->name == 'data-attachment') {
				$array['objectFilename'] = $attr->value;
			} else if($attr->name == 'type') {
				$array['filetype'] = $attr->value;
			} else if($attr->name == 'data') {
				$array['fileObject'] = str_replace("siteCollections","sites",$attr->value);
			}	
		}
	}
}	
$array['instructions'] = $instructions;
$array['submissionDate'] = $submissionDate;
//echo "<pre>";print_r($array);
echo json_encode($array);