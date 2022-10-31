//menu!

const links = document.querySelectorAll('nav li')
links.forEach((link) => {
  link.addEventListener('click', () => {
    if (document.querySelector('.active')) {
      document.querySelector('.active').classList.remove('active')
    }
    link.classList.add('active')
  })
})

//resize event observer!

const screens = document.querySelectorAll('.screenshot')
const screenshotObserver = new ResizeObserver((screenshots) => {
  for (const screenshot of screenshots) {
    if (screenshot.contentBoxSize) {
      screens.forEach((screen) => {
        screen.dataset.width = Math.round(
          screenshot.contentBoxSize[0].inlineSize
        )
        screen.dataset.height = Math.round(
          screenshot.contentBoxSize[0].blockSize * 0.9
        )
      })
    }
    // screenshot.dataset.width = screenshot.contentBoxSize
  }
})

screens.forEach((screen) => {
  console.log(screen)
  screenshotObserver.observe(screen)
})

// window.addEventListener("load", function () {
//   if (window.location.hash.length > 1) {
//     document.querySelectorAll(".active")?.forEach((el) => {
//       el.classList.remove("active");
//     });
//     document
//       .querySelector(`nav a[href*='${window.location.hash}']`)
//       .closest("li")
//       .classList.add("active");
//   } else {
//     window.location.hash = "#hypercomics";
//   }
// });

window.addEventListener('hashchange', function () {
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active')
  }
  document
    .querySelector(`nav a[href*='${window.location.hash}']`)
    .closest('li')
    .classList.add('active')
})

let resizerButtons = document.querySelectorAll('button')

resizerButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const target = document.querySelector(this.dataset.target)
    switch (this.className) {
      case 'portrait':
        target.style.height = '70vmin'
        target.style.width = '40vmin'
        break

      case 'landscape':
        target.style.height = '30vmax'
        target.style.width = '70vmax'
        break

      case 'pause':
        target.classList.add('pause')
        target.classList.remove('play')
        target.querySelector('iframe').src = ''
        break

      case 'play':
        target.classList.remove('pause')
        target.classList.add('play')
        target.querySelector('iframe').src =
          target.querySelector('iframe').dataset.url
        break
    }
  })
})

//Pause the iframe (for memory)

document.querySelectorAll('.screenshot').forEach((frame) => {
  frame.addEventListener('click', function () {
    if (frame.classList.contains('play')) {
      frame.classList.add('pause')
      frame.classList.remove('play')
      frame.querySelector('iframe').src = ''
    }
    if (frame.classList.contains('pause')) {
      frame.classList.remove('pause')
      frame.classList.add('play')
      frame.querySelector('iframe').src =
        frame.querySelector('iframe').dataset.url
    }
  })
})

document.querySelectorAll('.audioplayer').forEach((listen) => {
  listen.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      return
    }
    if (document.querySelector('.active')) {
      document.querySelectorAll('.active').forEach((a) => {
        a.classList.remove('active')
      })
    }
    this.classList.add('active')
  })
})

// observation observer to get the element full on the page.

window.onload = () => {
  let dialogObserver = new IntersectionObserver(
    (observables) => {
      for (let observable of observables) {
        if (observable.intersectionRatio > 0.9) {
          observable.target.classList.add('shown')
        } else {
          observable.target.classList.remove('shown')
        }
      }
    },
    {
      threshold: [0.9],
    }
  )

  let tocObserver = new IntersectionObserver(
    (observables) => {
      for (let observable of observables) {
        if (observable.intersectionRatio > 0.5) {
          if (!observable.target.id) {
            return
          }
          updateToc(`#toc-${observable.target.id}`)
        }
      }
    },
    {
      threshold: [0.5],
    }
  )

  const dialogs = document.querySelectorAll('.dialog')
  const sections = document.querySelectorAll('section,article')

  for (let dialog of dialogs) {
    dialogObserver.observe(dialog)
  }
  for (let section of sections) {
    tocObserver.observe(section)
  }
}

function updateToc(id) {
  console.log(id)
  let tocItemToActivate = document.querySelector(id)
  if (!tocItemToActivate) return false
  const currentToc = document.querySelector('.activated')
  if (currentToc) {
    currentToc.classList.remove('activated')
  }
  tocItemToActivate.classList.add('activated')
}
