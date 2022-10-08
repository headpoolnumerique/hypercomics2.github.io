
const slugify = require('slugify')
const flaxaudio = require("./flaxaudio/"); // For local development
const classy = require("markdown-it-classy"); 
const markdownIt = require("markdown-it");
const dialog = require('./plugins/dialog.js')

module.exports = function (eleventyConfig) {

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  // add class to the MD
  

 eleventyConfig.setLibrary("md", markdownIt(options).use(classy));

  eleventyConfig.addPassthroughCopy({ "static/css": "/css" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "static/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "static/images": "/images" });
  eleventyConfig.addPassthroughCopy({ "static/videos": "/videos" });
  eleventyConfig.addPassthroughCopy({ "static/audio": "/audio" });


  let filters = `{% import "macros.njk" as macro with context %}`


  eleventyConfig.addPlugin(flaxaudio, {
    path: `/audio/`,
    audioEl: false
  });


  eleventyConfig.addPlugin(dialog)


  eleventyConfig.addFilter('slugify', function (value) {
    return slugify(value);
  })

  eleventyConfig.addFilter('monthYear', function (value) {
    return date = new Date(value).toLocaleDateString(undefined, {month: 'long', year:'numeric'});
  })

  eleventyConfig.addCollection("things", collection => {
    return [...collection.getFilteredByGlob(["src/content/journal/*.md","src/content/intro.md","src/content/talks/*.md", "src/content/demos/*.md"])]
  })

  
  eleventyConfig.addCollection("demos", collection => {
    return [...collection.getFilteredByGlob("src/content/demos/*.md")]
  })
  eleventyConfig.addCollection("talks", collection => {
    return [...collection.getFilteredByGlob("src/content/talks/*.md")]
  })

  eleventyConfig.addCollection("dialogues", collection => {
    return [...collection.getFilteredByGlob("src/content/dialogues/*.md")]
  })
  eleventyConfig.addCollection("posts", collection => {
    collection = collection.getFilteredByGlob("src/content/posts/**/*.md");
    collection.forEach(el => {

      // add macros on the fly to the collection
    
      el.template.inputContent = el.template.inputContent.replace('---\n\n', `---\n\n${filters}\n`)
      el.template.frontMatter.content = `${filters}\n${el.template.frontMatter.content}`
    })

    return collection;
  });



  // folder structures
  // -----------------------------------------------------------------------------
  // content, data and layouts comes from the src folders
  // output goes to public (for gitlab ci/cd)
  // -----------------------------------------------------------------------------
  return {
    // run the md through the njk engine first to use macro
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      includes: "layouts",
      data: "data",
    },
  };
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
