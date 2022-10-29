const config = require('./src/data/config.json');
const slugify = require('slugify')
const flaxaudio = require('./flaxaudio/') // For local development
const classy = require('markdown-it-classy')
const markdownIt = require('markdown-it')
const dialog = require('./plugins/dialog.js')
const markdownItPandoc = require('markdown-it-pandoc')
const yaml = require('js-yaml')
module.exports = function (eleventyConfig) {



  // change path on up
  const isProduction = process.env.NODE_ENV === `production`;

  eleventyConfig.addPassthroughCopy({ 'static/css': '/css' })
  eleventyConfig.addPassthroughCopy({ 'static/fonts': '/fonts' })
  eleventyConfig.addPassthroughCopy({ 'static/js': '/js' })
  eleventyConfig.addPassthroughCopy({ 'static/images': '/images' })
  eleventyConfig.addPassthroughCopy({ 'static/videos': '/videos' })
  eleventyConfig.addPassthroughCopy({ 'static/audio': '/audio' })

  let filters = `{% import "macros.njk" as macro with context %}`

  eleventyConfig.addPlugin(flaxaudio, {
    path: `/audio/`,
    audioEl: false,
  })

  // configure the library with options
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  }
  let markdownLib = markdownIt(options).use(classy).use(markdownItPandoc)

  // set the library to process markdown files
  eleventyConfig.setLibrary('md', markdownLib)

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents))

  // add plugins for dialog
  eleventyConfig.addPlugin(dialog)

  eleventyConfig.addFilter('slugify', function (value) {
    if(value) {return slugify(value)}
    return (value)
  })
  eleventyConfig.addFilter('markdownify', function (value) {
    return markdownIt.render(value)
  })

  eleventyConfig.addFilter('markdownifyInline', function (value) {
    return markdownIt.renderInline(value)
  })
  eleventyConfig.addFilter('monthYear', function (value) {
    return (date = new Date(value).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    }))
  })

  eleventyConfig.addCollection('things', (collection) => {
    return [
      ...collection.getFilteredByGlob([
        'src/content/journal/*.md',
        'src/content/intro.md',
        'src/content/talks/*.md',
        'src/content/demos/*.md',
        'src/content/mails/*.md',
      ]),
    ]
  })

  eleventyConfig.addCollection('mails', (collection) => {
    return [...collection.getFilteredByGlob('src/content/mails/**.md')]
  })
  eleventyConfig.addCollection('apropos', (collection) => {
    return [...collection.getFilteredByGlob('src/content/apropos.fr.md')]
  })
  eleventyConfig.addCollection('demos', (collection) => {
    return [...collection.getFilteredByGlob('src/content/sequences/demos/*.md')]
  })
  eleventyConfig.addCollection('talks', (collection) => {
    return [...collection.getFilteredByGlob('src/content/sequences/talks/*.md')]
  })
  eleventyConfig.addCollection('dialogues', (collection) => {
    return [
      ...collection.getFilteredByGlob('src/content/sequences/dialogues/*.md'),
    ]
  })

  eleventyConfig.addCollection('sequences', (collection) => {
    return [...collection.getFilteredByGlob('src/content/sequences/**/*.md')]
  })

  // folder structures
  // -----------------------------------------------------------------------------
  // content, data and layouts comes from the src folders
  // output goes to public (for gitlab ci/cd)
  // -----------------------------------------------------------------------------
  return {
    // run the md through the njk engine first to use macro
    markdownTemplateEngine: 'njk',
    pathPrefix: isProduction ? config.prefix : ``,
    dir: {
      input: 'src',
      output: 'public',
      includes: 'layouts',
      data: 'data',
    },
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
