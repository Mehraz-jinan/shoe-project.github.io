
  $(document).ready(function () {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        } 
    });  
  });

const selectMenu = document.querySelector('#main-menu');
const selectToggle = document.querySelector('#toggle-icon');
selectToggle.addEventListener('click', () => {
    selectMenu.classList.toggle('menu');
    selectMenu.classList.toggle('side-menu');
    
});


const sideselectMenu = document.querySelector('#side-main-menu');
const sideselectToggle = document.querySelector('#toggle-icon');
selectToggle.addEventListener('click', () => {
    sideselectMenu.classList.toggle('side-nav-menu');
    sideselectMenu.classList.toggle('side-menu');
    
});



const selectProfile = document.querySelector('#profile-image');
const selectDropMenu = document.querySelector('#drop-menu');
selectProfile.addEventListener('click', () => {
    selectDropMenu.classList.toggle('menu-dropdown');
    selectDropMenu.classList.toggle('menu-dropdown-show');
    
});



// alert part js







const quantitySetup = function () {
  let inputBox = document.querySelector('#box-value');
  const selectIncrement = document.querySelector('#increment');
  const selectDecrement = document.querySelector('#decrement');
  const value = [];

  let boxValue = inputBox.innerHTML = 0;
  if (boxValue === 0) {
      selectDecrement.style.display = 'none';
  } else {
      selectDecrement.style.display = 'inline-block';
  }

  const incrementedValue = function () {
      const increment = boxValue += 1;
      boxValue = inputBox.innerHTML = increment;
      const insert = value.push(boxValue);
      const lastElement = value[value.length - 1];

      if (boxValue === 0) {
          selectDecrement.style.display = 'none';
      } else {
          selectDecrement.style.display = 'inline-block';
      }
  }
  const decrementedValue = function () {
      const decrement = boxValue -= 1;
      boxValue = inputBox.innerHTML = decrement;
      const insert = value.push(boxValue);
      const lastElement = value[value.length - 1];
      if (boxValue === 0) {
          selectDecrement.style.display = 'none';
      } else {
          selectDecrement.style.display = 'inline-block';
      }
  
  }
  selectIncrement.addEventListener('click', () => {
      incrementedValue();
  });
  selectDecrement.addEventListener('click', () => {
      decrementedValue();
  });

}

quantitySetup();




