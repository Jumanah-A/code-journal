/* global data */
/* exported data */
var $form = document.querySelector('form');
var $elements = $form.elements;
var $photoUrl = $elements.photoUrl;
var $img = document.getElementsByTagName('img')[0];
var placeholder = $img.getAttribute('src');
var $entryTitle = $elements.title;
var $entryNotes = $elements.notes;
var $ul = document.querySelector('ul');

if (data.entries.length === 0) {
  document.querySelector('.no-entries').className = 'no-entries';

} else {
  document.querySelector('.no-entries').className = 'no-entries hidden';
}

function handlePhoto(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', placeholder);
  } else {
    $img.setAttribute('src', $photoUrl.value);
  }
}
$photoUrl.addEventListener('input', handlePhoto);

function handleSubmit(event) {
  event.preventDefault();
  var $newEntry = {};
  var len = data.entries.length;
  if (data.entries.length === 0) {
    $newEntry[$entryTitle.name] = $entryTitle.value;
    $newEntry[$photoUrl.name] = $photoUrl.value;
    $newEntry[$entryNotes.name] = $entryNotes.value;
    $newEntry.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift($newEntry);
    $ul.prepend(entryTree($newEntry));
  } else {
    for (var i = 0; i < len; i++) {
      if (data.editing !== null) {
        if (String(data.entries[i].entryId) === String(data.editing.entryId)) {
          var editCurrent = JSON.parse(JSON.stringify(data.editing));
          editCurrent[$entryTitle.name] = $entryTitle.value;
          editCurrent[$photoUrl.name] = $photoUrl.value;
          editCurrent[$entryNotes.name] = $entryNotes.value;
          $ul.replaceChild(entryTree(editCurrent), document.getElementById(data.editing.entryId));
          data.editing = null;
          break;
        }
      } else {
        $newEntry[$entryTitle.name] = $entryTitle.value;
        $newEntry[$photoUrl.name] = $photoUrl.value;
        $newEntry[$entryNotes.name] = $entryNotes.value;
        $newEntry.entryId = data.nextEntryId;
        data.nextEntryId += 1;
        data.entries.unshift($newEntry);
        $ul.prepend(entryTree($newEntry));
        break;
      }
    }

  }
  $form.reset();
  $img.setAttribute('src', placeholder);
  switchView('entries');
  document.querySelector('.no-entries').className = 'no-entries hidden';
}
$form.addEventListener('submit', handleSubmit);

function entryTree(entry) {
  var notesText = document.createElement('p');
  notesText.className = 'bottom-padding';
  notesText.textContent = entry.notes;

  var entryHeading = document.createElement('h1');
  entryHeading.className = 'top-padding-one bottom-padding';
  entryHeading.textContent = entry.title;

  var span = document.createElement('span');
  span.className = 'display-flex space-between';
  span.appendChild(entryHeading);

  var iconEl = document.createElement('i');
  iconEl.className = 'edit-icon fas fa-pen fa-2x';
  iconEl.id = entry.entryId;

  var iconAnchor = document.createElement('button');
  iconAnchor.className = 'edit-pen';
  iconAnchor.appendChild(iconEl);
  span.appendChild(iconAnchor);

  var entryImg = document.createElement('img');
  entryImg.setAttribute('src', entry.photoUrl);

  var halfText = document.createElement('div');
  halfText.className = 'column-half bottom-padding';
  halfText.appendChild(span);
  halfText.appendChild(notesText);

  var halfImg = document.createElement('div');
  halfImg.className = 'column-half bottom-padding';
  halfImg.appendChild(entryImg);

  var block = document.createElement('div');
  block.className = 'row entry';
  block.setAttribute('id', entry.entryId);
  block.appendChild(halfImg);
  block.appendChild(halfText);
  return block;
}

function handleEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryTree(data.entries[i]));
  }
}
window.addEventListener('DOMContentLoaded', handleEntry);

function handleEditing(entry) {
  document.querySelector('.title').textContent = 'Edit Entry';
  $photoUrl.value = entry.photoUrl;
  $img.setAttribute('src', $photoUrl.value);
  $entryTitle.value = entry.title;
  $entryNotes.value = entry.notes;
  return entry.entryId;
}

function handleClick(event) {
  if (event.target.matches('.entries-tab')) {
    switchView('entries');
  } else if (event.target.matches('.new-button')) {
    switchView('entry-form');
  } else if (event.target.className === 'edit-icon fas fa-pen fa-2x') {
    var curObject = data.entries.filter(j => String(j.entryId) === String(event.target.id))[0];
    data.editing = curObject;
    switchView('entry-form');
    handleEditing(curObject);

  }
}
document.querySelector('header').addEventListener('click', handleClick);
document.querySelector('.new-button').addEventListener('click', handleClick);
document.querySelector('ul').addEventListener('click', handleClick);

function switchView(view) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if (view !== $viewList[i].getAttribute('data-view')) {
      $viewList[i].className = 'view hidden';
    } else {
      $viewList[i].className = 'view';
    }
  }
}
