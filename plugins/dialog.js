
/**
 * This shortCode allow calling the data from another collection using the id,
 * to be transformed as a figure with figcaption.
 */

const slugify = require('slugify');
const markdownIt = require("markdown-it");
const markdownItPandoc = require("markdown-it-pandoc");

options = {
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
};

let markdownLib = markdownIt(options)
  .use(markdownItPandoc);

//add option to put image before or after the pararagph

module.exports = function (eleventyConfig, options) {
  eleventyConfig.addPairedShortcode("dialog", function (content, person, date) {
    let renderedDate = new Date(date).toLocaleDateString();
    console.log(person)
    let personname = slugify(person.toLowerCase());
    const output = `<section class="dialog ${personname}">
<date>${renderedDate}</date>
<div class="content">${markdownLib.render(content)}</div>
</section>`
    return  output 
  });
};


