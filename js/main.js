/* global data */
/* exported data */

var $form = document.querySelector('form');
var $elements = $form.elements;
var $photoUrl = $elements.photoUrl;
var $img = document.getElementsByTagName('img')[0];
var placeholder = $img.getAttribute('src');

$photoUrl.addEventListener('input', handlePhoto);
function handlePhoto(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', placeholder);
  } else {
    $img.setAttribute('src', $photoUrl.value);
  }
}
