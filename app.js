const canvas = document.getElementById('canvas');
const resetBtn = document.getElementById('resetBtn');

function createPlaced(src, x, y) {
  const el = document.createElement('img');
  el.src = src;
  el.className = 'placed';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  canvas.appendChild(el);
  enableDrag(el);
}

function enableDrag(el) {
  let offsetX, offsetY;

  function onPointerDown(e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  }

  function onPointerUp() {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
  }

  el.addEventListener('pointerdown', onPointerDown);
}

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('pointerdown', e => {
    createPlaced(tile.dataset.src, e.clientX - 30, e.clientY - 30);
  });
});

resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.placed').forEach(el => el.remove());
});
