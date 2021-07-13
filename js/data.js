/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var $img = document.getElementsByTagName('img')[0];
var placeholder = $img.getAttribute('src');
var $form = document.querySelector('form');
var $elements = $form.elements;
var $entryTitle = $elements.title;
var $photoUrl = $elements.photoUrl;
var $entryNotes = $elements.notes;

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  var $newEntry = {};
  $newEntry[$entryTitle.name] = $entryTitle.value;
  $newEntry[$photoUrl.name] = $photoUrl.value;
  $newEntry[$entryNotes.name] = $entryNotes.value;
  $newEntry.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift($newEntry);
  $form.reset();
  $img.setAttribute('src', placeholder);
  event.preventDefault();
}
var previousEntryJSON = localStorage.getItem('javascript-local-storage');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
function handleBeforeUnload(event) {
  localStorage.setItem('javascript-local-storage', JSON.stringify(data));
}
