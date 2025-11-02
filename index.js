
//menu nav

const $btn = document.querySelector('.bp-nav__toggle');
  const $nav = document.getElementById('bp-nav');

  if ($btn && $nav) {
    $btn.addEventListener('click', () => {
      const open = $btn.getAttribute('aria-expanded') === 'true';
      $btn.setAttribute('aria-expanded', String(!open));
      $nav.classList.toggle('is-open', !open);
      // animação do ícone (opcional)
      $btn.classList.toggle('is-open', !open);
    });

    // Fecha ao clicar em um link (opcional)
    $nav.addEventListener('click', (e) => {
      if (e.target.matches('.bp-nav__link')) {
        $btn.setAttribute('aria-expanded', 'false');
        $nav.classList.remove('is-open');
        $btn.classList.remove('is-open');
      }
    });

    // Acessibilidade: ESC fecha
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $btn.setAttribute('aria-expanded', 'false');
        $nav.classList.remove('is-open');
        $btn.classList.remove('is-open');
      }
    });
}

//carrossel

(function () {
  const carousel = document.querySelector('.bp-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.bp-carousel__track');
  const viewport = carousel.querySelector('.bp-carousel__viewport');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let index = 0;
  let maxIndex = 0;
  let cardWidth = 0;
  let stepCurrent = 1;

  function getCardsPerView() {
    if (window.matchMedia('(min-width:1024px)').matches) return 4;
    if (window.matchMedia('(min-width:768px)').matches) return 2;
    return 1;
  }

  function compute() {
    const cards = Array.from(track.children);
    if (!cards.length) return;

    const first = cards[0].getBoundingClientRect();
    const second = cards[1]
      ? cards[1].getBoundingClientRect()
      : { left: first.right };
    cardWidth = second.left - first.left || first.width;

    const perView = getCardsPerView();
    stepCurrent = perView >= 2 ? 2 : 1;
    maxIndex = Math.max(0, cards.length - perView);

    index = Math.min(index, maxIndex);
    moveTo(index);
    toggleButtons();
  }

  function moveTo(i) {
    const x = -(i * cardWidth);
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function toggleButtons() {
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - stepCurrent);
    moveTo(index);
    toggleButtons();
    viewport.focus();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(maxIndex, index + stepCurrent);
    moveTo(index);
    toggleButtons();
    viewport.focus();
  });

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  window.addEventListener('resize', compute, { passive: true });
  compute();
})();