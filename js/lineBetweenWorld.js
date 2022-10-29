// stolen from https://blog.greggant.com/posts/2018/10/16/drawing-svg-lines-between-multiple-dom-objects.html


/** createSvgEl
 * create svg line, arc and cirecle between two elements of the dom 
 * 
 * @param {string} shape - "line", "arc", "cercle"  
 * @param {number} thickness - thickness in px  
 * @param {string} color - "color", etc.
 * @returns {string}  
 *
 */

const createSvgEl = (shape, thickness, color, id) => {
  let outputShape;
    switch (shape) {
      case 'line':
          outputShape = `  <line id="${id}" stroke-width="${thickness}" stroke="${color}"  x1="0" y1="0" x2="100" y2="100"/>` 
        break;

      case 'arc':
          outputShape = `  <line id="${id}" stroke-width="${thickness}" stroke="${color}"  x1="0" y1="0" x2="100" y2="100"/>` 
        break;

      default:
        break;
    }
let object = `<svg>
  ${outputShape}
</svg>`
  

  return object
}

const config = {
  target: document.querySelectorAll(".clem"),
  line: document.querySelector(".line"),
  delay: 40 // enter zero for live resizing
}
const drawBetweenObjects = {
  //cmake the line
  makeLine: function(line, div1, div2) {
    const className = div1.id + div2.id;
    if ( className.includes("undefined") !== true ) { //error check
      const clone = line.cloneNode(true);
      clone.classList.remove('original').add(className, 'deleteMe')
      div1.insertAdjacentElement('afterend', clone)
      // document(line).clone().addClass('deleteMe').addClass(className).removeClass("original").insertAfter(line);
      //calculations (for legibility, these are separte vars)
      var x1 = div1.offset().left + (div1.width()/2);
      var y1 = div1.offset().top + (div1.height()/2);
      var x2 = div2.offset().left + (div2.width()/2);
      var y2 = div2.offset().top + (div2.height()/2);
      document.querySelectorAll("."+className).forEach(el => {
        el.setAttribute('x1',x1)
        el.setAttr.setAttribute('y1',y1)
        el.setAttr.setAttribute('x2',x2)
        el.setAttr.setAttribute('y2',y2);
      }) //svg attributes
    } else { console.error("undefined object") }
  },
  findLines: function(search) {
    document.querySelectorAll('.deleteMe').forEach(del =>{del.remove()}) //remove last set of lines
    let searches = document.querySelectorAll(search); 
    searches.forEach((search,index)=>{
      //only do drawBetweenObject if there is another.
      if(index + 1 < searches.length) {
        drawBetweenObjects.makeLine(config.line, search, searches[search + 1]);   //args order - line, div1 and div2 - the next div.
      }
    })
  } ,
  init: function() {
    drawBetweenObjects.findLines( config.target );
    //give resizing time to happen
    var resizeId;
    window.addEventListener('resize', function (){
      clearTimeout(resizeId);
      if (config.delay !== 0) {
        resizeId = setTimeout(doneResizing, config.delay);
      } else {
        drawBetweenObjects.findLines( config.target );
      }
    })
    function doneResizing(){
      drawBetweenObjects.findLines( config.target );
    }
  }
}

drawBetweenObjects.init();

// umimportant ugly scripting
// this just randomizes the points
// It's pretty ugly.
// $(".btn").click(function() {
//   var heightMax = $(document).height(),
//       widthMax = $(document).width();
//   function widthCalc () {
//     return Math.floor( Math.random() * widthMax );
//   }
//   function heightCalc() {
//     return Math.floor( Math.random() * heightMax )
//   }
//   $("#one").css({  left: widthCalc(),  top: heightCalc() });
//   $("#four").css({ left: widthCalc(),  top: heightCalc() });
//   $("#three").css({ right: widthCalc(), top: heightCalc() });
//   $("#two").css({ right: widthCalc(), top: heightCalc()  });
//    drawBetweenObjects.findLines( config.target );
// });
//

