CMS.registerEditorComponent({
  // Internal id of the component
  id: 'sentence',
  // Visible label
  label: 'bulle',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'character',
      label: 'Personne',
      widget: 'select',
      options: ['ju', 'clem', 'antho'],
    },
    {
      name: 'face',
      label: 'tête',
      widget: 'select',
      options: [
        'circonspect',
        'colere',
        'coucou',
        'docte',
        'fatigue',
        'happy',
        'impressionne',
        'intello',
        'ordi',
        'sad',
        'smile',
        'talk',
      ],
    },

    {
      name: 'classe supplémentaire',
      label: 'classe',
      widget: 'string',
    },
    {
      name: 'content',
      label: 'discours',
      widget: 'markdown',
    },
  ],

  // Regex pattern used to search for instances of this block in the markdown document.
  // Patterns are run in a multline environment (against the entire markdown document),
  // and so generally should make use of the multiline flag (`m`). If you need to capture
  // newlines in your capturing groups, you can either use something like
  // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
  // which will cause `(.*)` to match newlines as well.
  //
  // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
  // `(.*?)` vs `(.*)`), especially if matching against newline characters.

  pattern:
    /^{% dialog "$\s*? (.*?)" "(.*?)" "(.*?)" "(.*?)" %}\s*\n(.*)\s{% enddialog %} $/ms,
  // Given a RegExp Match object
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
  // return an object with one property for each field defined in `fields`.
  //
  // This is used to populate the custom widget in the markdown editor in the CMS.
  fromBlock: function(match) {
    return {
      character: match[1],
      face: match[2],
      classe: match[3],
      content: match[4],
    }
  },
  // Given an object with one property for each field defined in `fields`,
  // return the string you wish to be inserted into your markdown.
  //
  // This is used to serialize the data from the custom widget to the
  // markdown document
  toBlock: function(data) {
    return `
{% dialog "${data.character}",  "${data.face}"  ${data.classe ? `", data.classe"` : ''
      } %}
\n
${data.content}
\n
{% enddialog %}
       `
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(data) {
    return `
        <div class="dialog">  
          <img src="${imgUrl ? 'imgUrl' : '/'}images/${data.character}_${data.face
      }.png
        <p class="content">${data.content}</p>
      </div>
       `
  },
})
