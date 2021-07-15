/* global data */
/* exported data */

var $form = document.querySelector('form');
var $elements = $form.elements;
var $photoUrl = $elements.photoUrl;
var $img = document.getElementsByTagName('img')[0];
var placeholder = $img.getAttribute('src');
var $entryTitle = $elements.title;
var $entryNotes = $elements.notes;

// console.log("hello");
// console.log(document.getElementsByTagName("i"));
// console.log(document.querySelector("edit-icon fas fa-pen fa-2x"));
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
  var $ul = document.querySelector('ul');
  $ul.prepend(entryTree($newEntry));
  switchView('entries');
  document.querySelector('.no-entries').className = 'no-entries hidden';
}

function entryTree(entry) {
  var notesText = document.createElement('p');
  notesText.className = 'bottom-padding';
  notesText.textContent = entry.notes;
  var entryHeading = document.createElement('h1');
  entryHeading.className = 'top-padding-one bottom-padding';
  entryHeading.textContent = entry.title;

  var iconEl = document.createElement('i');
  iconEl.className = 'edit-icon fas fa-pen fa-2x';

  var iconAnchor = document.createElement('a');
  iconAnchor.className = 'edit-pen';
  iconAnchor.setAttribute('href', '');
  iconAnchor.appendChild(iconEl);

  var headingRow = document.createElement('div');
  headingRow.className = 'row space-between';
  headingRow.appendChild(entryHeading);
  headingRow.appendChild(iconAnchor);

  var entryImg = document.createElement('img');
  entryImg.setAttribute('src', entry.photoUrl);

  var halfText = document.createElement('div');
  halfText.className = 'column-half bottom-padding';
  halfText.appendChild(headingRow);
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
    switchView('entries');
  } else if (event.target.matches('.new-button')) {
    switchView('entry-form');
  } else if (event.target.matches('.edit-pen')) {
    // console.log("hello this is editing page whooohoho!! yeee");

  }
}
document.querySelector('header').addEventListener('click', handleClick);
document.querySelector('.new-button').addEventListener('click', handleClick);
// document.querySelector('.edit-pen').addEventListener('click', handleClick);
var $viewList = document.querySelectorAll('.view');
function switchView(view) {
  for (var i = 0; i < $viewList.length; i++) {
    if (view !== $viewList[i].getAttribute('data-view')) {
      $viewList[i].className = 'view hidden';
    } else {
      $viewList[i].className = 'view';
    }
  }
}
