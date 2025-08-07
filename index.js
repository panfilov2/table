document.addEventListener('DOMContentLoaded', ()=> {
  const quaters = document.querySelectorAll('.sub-grid-quater')

  quaters.forEach((el)=>{
    el.addEventListener('click', ()=>{
      parentEl = el.parentElement
      parentEl.classList.toggle('closed')
      const target = parentEl.dataset.quater
      const tableContent = document.querySelectorAll(`.accordion-sub-grid[data-quater="${target}"]`)
      tableContent.forEach((el)=>{
        el.classList.toggle('closed')
      })
    })
  })

  const accordions = document.querySelectorAll('.accordion-title');

  function setZIndexForAccordions() {
    const accordionContainers = document.querySelectorAll('.accordion');
    accordionContainers.forEach((container, index) => {
      container.style.zIndex = accordionContainers.length - index;
      const content = container.querySelector('.accordion-content');

      if (!content) return;

      if (container.classList.contains('open')) {
        content.style.height = content.scrollHeight + 'px';
        content.style.transform = 'translateY(0)';
      } else {
        content.style.height = '0px';
        content.style.transform = `translateY(-${content.scrollHeight}px)`;
      }
    });
  }

  setZIndexForAccordions();


  accordions.forEach((el) => {
    el.addEventListener('click', (event) => {
      const container = event.target.closest('.accordion');
      if (!container) return;

      container.classList.toggle('open');
      const content = container.querySelector('.accordion-content');

      if (!content) return;

      if (container.classList.contains('open')) {
        content.style.height = content.scrollHeight + 'px';
        content.style.transform = 'translateY(0)';
      } else {
        content.style.height = '0px';
        content.style.transform = `translateY(-${content.scrollHeight}px)`;
      }
    });
  });

  const initialClosedAccordions = document.querySelectorAll('.accordion:not(.open)');

  initialClosedAccordions.forEach((el) => {
    const content = el.querySelector('.accordion-content');
    if (content) {
      content.style.transform = `translateY(-${content.scrollHeight}px)`;
    }
  });

  const select = document.querySelector('.select-current')
  const selectOptions = document.querySelector('.select-options')

  select.addEventListener('click', () => {
    selectOptions.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (!select.contains(event.target)) {
      selectOptions.classList.remove('open');
    }
  });
  const getCurrentQuaterAndScroll = () => {
    const gridContainer = document.querySelector('.grid-container');
    const targetElement = document.querySelector('.grid-header__sub-grid-quater.current');
    const colStart = document.querySelector('.col-start')
    const secondBlock = document.querySelector('.second-block')
    const secondBlockStyles = window.getComputedStyle(secondBlock)
    const gridContainerStyles = window.getComputedStyle(gridContainer)
    const gridMarginLeft = gridContainerStyles.getPropertyValue('margin-left')
    const marginLeft = secondBlockStyles.getPropertyValue('margin-left');
    const paddingLeft = secondBlockStyles.getPropertyValue('padding-left');
    if (gridContainer && targetElement) {
      gridContainer.scrollTo({
        left: targetElement.offsetLeft - colStart.offsetWidth - parseInt(paddingLeft) - parseInt(marginLeft) - (window.innerWidth <= 767 ? parseInt(gridMarginLeft) : 0),
        behavior: 'smooth'
      });
    }
  }
  getCurrentQuaterAndScroll()
})