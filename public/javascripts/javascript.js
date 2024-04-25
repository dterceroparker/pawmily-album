//-------------> Instructor Ben Manley's Code for Date Object <-------------//
const dateInputEl = document.getElementById('date-input')
const hiddenDateInputEl = document.getElementById('hidden-date')

let offset = new Date().getTimezoneOffset() * 60000
let oneYearFromNow = new Date().setFullYear(new Date().getFullYear() + 1)
let localISOTime = new Date(oneYearFromNow - offset).toISOString().slice(0, 16)

window.addEventListener('load', function() {
  if (!dateInputEl.value) {
    dateInputEl.value = localISOTime
  }
  hiddenDateInputEl.value = localISOTime
})
//-------------> Instructor Ben Manley's Code for Date Object <-------------//