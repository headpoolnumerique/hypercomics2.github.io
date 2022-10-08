//menu!

const links = document.querySelectorAll('nav li');
links.forEach(link => {
  link.addEventListener('click', () => {
 if  (document.querySelector(".active") ) {document.querySelector(".active").classList.remove('active')};
    link.classList.add('active');
    
  })
} )


//resize event observer!

const screens = document.querySelectorAll('.screenshot')
const screenshotObserver = new ResizeObserver(screenshots =>{
  for (const screenshot of screenshots) {
    if (screenshot.contentBoxSize) {
screens.forEach(screen =>  {
      screen.dataset.width = Math.round(screenshot.contentBoxSize[0].inlineSize);
      screen.dataset.height = Math.round( screenshot.contentBoxSize[0].blockSize * 0.9 );
}) 
    }
    // screenshot.dataset.width = screenshot.contentBoxSize
  }
})


screens.forEach(screen =>  {
  console.log(screen)
  screenshotObserver.observe(screen)
}) 





window.addEventListener('load', function () {
  if (window.location.hash.length > 1) {
      document.querySelectorAll(".active")?.forEach(el => {el.classList.remove('active')})
    document.querySelector(`nav a[href*='${window.location.hash}']`).closest('li').classList.add('active')
    }
    else {
      window.location.hash = "#hypercomics"
    }
})

window.addEventListener('hashchange', function () {
  if  (document.querySelector(".active") ) {document.querySelector(".active").classList.remove('active')};
  document.querySelector(`nav a[href*='${window.location.hash}']`).closest('li').classList.add('active')
});


