/**
 * This shortCode allow calling the data from another collection using the id,
 * to be transformed as a figure with figcaption.
 */

const config = require("../src/data/config.json");
const isProduction = process.env.NODE_ENV === `production`;

//
const imgUrl = isProduction ? config.prefix : "";
   
console.warn(imgUrl);

const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItPandoc = require("markdown-it-pandoc");

options = {
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
};

let markdownLib = markdownIt(options).use(markdownItPandoc);

const arc = (seed) => {
  // get width from the seed → number of character of the sentence

  const width = 80;

  return `<svg 
width="100%" height="100%" 
stroke-linecap="round" 
height="100%" 
stroke-width=".4"
class="dialoglines" 
fill="none" 
style="stroke: var(--color-stroke, black);" 
preserveAspectRatio="none"  
viewBox="0 0 100 20" 
xmlns="http://www.w3.org/2000/svg">
  <path class="left" d="M0,15 Q50,20 50,0"/>
  <path class="right" d="M96,15 Q50,20 50,0"/>
</svg>`;
};

//add option to put image before or after the pararagph

module.exports = function (eleventyConfig, options) {
  eleventyConfig.addPairedShortcode(
    "dialog",
    function (content, person, face, className) {
      let personname = slugify(person.toLowerCase());
      const output = `<section class="dialog ${personname} ${ className ? className : "" }">
      <div class="content">${markdownLib.render(content)}</div>
      ${arc(content.length)}
      <div class="face">
        <img src="${imgUrl}/images/${
          face
            ? personname + "_" + face + ".png"
            : personname + "_talk.png"
        }"   alt="face of ${person}"/>
      </div>
    </section>`;
      return output;
    }
  );

  eleventyConfig.addShortcode("ladate", function (date) {
    return `<h4 class="date"><date>${new Date(
      date
    ).toLocaleDateString()}</date></h4>`;
  });
  eleventyConfig.addFilter("ladate", function (date) {
    return new Date(date).toLocaleDateString();
  });
};
