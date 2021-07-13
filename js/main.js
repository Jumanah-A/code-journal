/* global data */
/* exported data */

var $form = document.querySelector('form');
var $elements = $form.elements;
var $photoUrl = $elements.photoUrl;
var $img = document.getElementsByTagName('img')[0];
var placeholder = $img.getAttribute('src');
var $entryTitle = $elements.title;
var $entryNotes = $elements.notes;

$photoUrl.addEventListener('input', handlePhoto);
function handlePhoto(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', placeholder);
  } else {
    $img.setAttribute('src', $photoUrl.value);
  }
}

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  var $newEntry = {};
  $newEntry[$entryTitle.name] = $entryTitle.value;
  $newEntry[$photoUrl.name] = $photoUrl.value;
  $newEntry[$entryNotes.name] = $entryNotes.value;
  $newEntry.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift($newEntry);
  $form.reset();
  $img.setAttribute('src', placeholder);
}
