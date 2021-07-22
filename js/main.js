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
var $deleteEntry = document.querySelector('.delete-entry');
var deleteId;

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

          data.entries[i].title = editCurrent[$entryTitle.name];
          data.entries[i].notes = editCurrent[$entryNotes.name];
          data.entries[i].photoUrl = editCurrent[$photoUrl.name];
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
  var curObject;
  var $editing = document.querySelector('.editing');
  // console.log($editing);
  // console.log($editing.className);
  if (event.target.matches('.entries-tab')) {
    switchView('entries');
  } else if (event.target.matches('.new-button')) {
    $editing.className = 'editing column-full display-flex flex-end';
    $deleteEntry.className = 'delete-entry hidden';
    switchView('entry-form');

  } else if (event.target.className === 'edit-icon fas fa-pen fa-2x') {
    // console.log("hileonklb");
    // console.log(event.target.id);
    deleteId = event.target.id;
    $editing.className = 'editing column-full display-flex space-between';
    $deleteEntry.className = 'delete-entry';
    // var curObject;
    for (var i = 0; i < data.entries.length; i++) {
      if (String(data.entries[i].entryId) === String(event.target.id)) {
        curObject = data.entries[i];
        break;
      }
    }
    // console.log(curObject);
    handleEditing(curObject);
    switchView('entry-form');
  } else if (event.target.className === 'delete-entry') {
    document.querySelector('.overlay').className = 'overlay';
  } else if (event.target.className === 'cancel') {
    // console.log("cancel is pressed");
    document.querySelector('.overlay').className = 'overlay hidden';
  } else if (event.target.className === 'confirm') {
    // console.log("confirm is pressed");
    handleDelete();
    switchView('entries');
  }
}
document.querySelector('header').addEventListener('click', handleClick);
document.querySelector('.new-button').addEventListener('click', handleClick);
document.querySelector('ul').addEventListener('click', handleClick);
document.querySelector('.delete-entry').addEventListener('click', handleClick);

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

document.querySelector('.confirm').addEventListener('click', handleClick);
document.querySelector('.cancel').addEventListener('click', handleClick);

function handleDelete(event) {
  $ul.removeChild(document.getElementById(deleteId));
  for (var i = 0; i < data.entries.length; i++) {
    if (JSON.stringify(data.entries[i].entryId) === deleteId) {
      data.entries.splice(i, 1);
      break;
    }
  }
}
