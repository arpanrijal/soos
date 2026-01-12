
function deleteItem(id) {
  fetch(`/delete/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log("Deleted:", data);
      window.location.href = '/';
    });
}
function togglebtn(id) {
  const editBtns = document.querySelectorAll('#editbtn');
  const deleteBtns = document.querySelectorAll('.delbtn');
  const updateBtns = document.querySelectorAll('.updbtn');
  const cancelBtns = document.querySelectorAll('.canbtn');
  const title_of_todo = document.querySelectorAll('.todotasktitle');
  const editinputfield = document.querySelectorAll('.editinputfield');

  editBtns.forEach((elem, index) => {
    if (elem.dataset.id === id) {
      const isinEditMode = !editBtns[index].classList.contains('hidden')

      if (isinEditMode) {
        elem.classList.add('hidden');
        deleteBtns[index].classList.add('hidden');
        updateBtns[index].classList.remove('hidden');
        cancelBtns[index].classList.remove('hidden');
        title_of_todo[index].classList.add('hidden');
        editinputfield[index].classList.remove('hidden');
        editinputfield[index].value = title_of_todo[index].innerText.trim();
        editinputfield[index].focus();
        editinputfield[index].setSelectionRange(editinputfield[index].value.length, editinputfield[index].value.length);
      } else {
        elem.classList.remove('hidden');
        deleteBtns[index].classList.remove('hidden');
        updateBtns[index].classList.add('hidden');
        cancelBtns[index].classList.add('hidden');
        editinputfield[index].classList.add('hidden');
        title_of_todo[index].classList.remove('hidden');
      }
    }
  });
}

function destroytostalert(id) {
  let errorMsg = document.getElementById(`error-msg-${id}`);
  errorMsg.classList.add('hidden');
}

function generatetostalert(id) {
  let errorMsg = document.getElementById(`error-msg-${id}`);
  errorMsg.classList.remove('hidden');
  return
}

async function changebtn(id) {
  let upd_data = document.getElementById(`editinputfield-${id}`);
  const title_of_todo = document.querySelector(`#todotasktitle-${id}`);
  const content_of_todo = title_of_todo.dataset.old;
  if (upd_data.value.length < 2) {
    generatetostalert(id);
    return;
  } else {
    destroytostalert(id);
  }
  if (upd_data.value.trim() === content_of_todo) {
      togglebtn(id);
      return;
    }
    
  await fetch(`/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      updatetask: upd_data.value,
    }),
  })
    .then(response => {
      if (!response.ok) {
        console.log("Something went wrong check deletetask.js")
      } else {
        console.log("Data updated Sucessfully")
      }
    })
    .then(() => {
      console.log("Task Updated sucessfully!")
      window.location.href = '/'
    })
    .catch(err => {
      console.log('Fetch error', err)
    })
}