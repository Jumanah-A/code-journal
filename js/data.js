/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('javascript-local-storage');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
function handleBeforeUnload(event) {
  localStorage.setItem('javascript-local-storage', JSON.stringify(data));
}
