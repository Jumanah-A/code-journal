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
  document.querySelector('.entries').className = 'entries';
  document.querySelector('.entry-form').className = 'entry-form hidden';
  document.location.reload();

}

function entryTree(entry) {
  var notesText = document.createElement('p');
  notesText.className = 'bottom-padding';
  notesText.textContent = entry.notes;
  var entryHeading = document.createElement('h1');
  entryHeading.className = 'top-padding-one bottom-padding';
  entryHeading.textContent = entry.title;

  var entryImg = document.createElement('img');
  entryImg.setAttribute('src', entry.photoUrl);

  var halfText = document.createElement('div');
  halfText.className = 'column-half bottom-padding';
  halfText.appendChild(entryHeading);
  halfText.appendChild(notesText);

  var halfImg = document.createElement('div');
  halfImg.className = 'column-half bottom-padding';
  halfImg.appendChild(entryImg);

  var block = document.createElement('div');
  block.className = 'row entry';
  block.appendChild(halfImg);
  block.appendChild(halfText);
  return block;
}
window.addEventListener('DOMContentLoaded', handleEntry);
function handleEntry(event) {
  var $ul = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryTree(data.entries[i]));
  }
}

if (data.entries.length === 0) {
  document.querySelector('.no-entries').className = 'no-entries';

} else {
  document.querySelector('.no-entries').className = 'no-entries hidden';
}

function handleClick(event) {
  if (event.target.matches('.entries-tab')) {
    document.querySelector('.entries').className = 'entries';
  } else if (event.target.matches('.new-button')) {
    document.querySelector('.entry-form').className = 'entry-form';
    document.querySelector('.entries').className = 'entries hidden';
  }
}
document.querySelector('header').addEventListener('click', handleClick);
document.querySelector('.new-button').addEventListener('click', handleClick);
