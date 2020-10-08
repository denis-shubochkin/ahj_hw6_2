const form = document.querySelector('.input-form');
const label = document.querySelector('.label');
const input = document.querySelector('.input');
const images = document.querySelector('.images');

const l = form.getBoundingClientRect().left;
label.style.top = `${form.offsetHeight / 2 - label.offsetHeight / 2}px`;
label.style.left = `${l + form.offsetWidth / 2 - label.offsetWidth / 2}px`;


function addImage(data) {
  const str = `<div class="img-container">
  <img class="img">
  <button class="delete">&#10005</button>
</div>`;
  images.insertAdjacentHTML('beforeend', str);
  const newEl = images.lastChild.querySelector('.img');
  const newDel = images.lastChild.querySelector('.delete');
  const reader = new FileReader();
  reader.onload = (event) => {
    newEl.src = event.target.result;
  };

  try {
    reader.readAsDataURL(data);
  } catch (e) {
    images.lastChild.remove();
    return;
  }

  newDel.addEventListener('click', () => {
    newDel.closest('.img-container').remove();
  });
}

input.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

input.addEventListener('drop', (evt) => {
  evt.preventDefault();
  const files = Array.from(evt.dataTransfer.files);
  files.forEach((el) => {
    addImage(el);
  });
});


input.addEventListener('change', (e) => {
  const data = e.target.files[0];
  addImage(data);
  e.target.value = '';
});
