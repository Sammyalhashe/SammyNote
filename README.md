# SammyNote

This is a personal note template based on [RelaxedJS](https://github.com/RelaxedJS/ReLaXed).

It comes with a set of predefined fonts (in Fonts/) and styles (in globalStyle/style.scss). I have also configured a local blank stylesheet to add more configuration and style to (localStyle/local.scss). The reason I made this was to create notes with a set and consistent style using markdown. However, there is more flexibility.

To create a note, you must have [node](https://nodejs.org/en/) installed and then run `npm i -g relaxedjs`. This will install relaxedJS globally on your system. 

To then create the pdf, run `relaxed index.pug` (or whatever your main `.pug` file is named). This will build a pdf and watch your directory for any changes. Any change that occurs will trigger the pdf to be built again.


## Editing:
To edit the pdf, you can edit the `.pug` file. By default, the `.pug` file links to a markdown Note (Notes/Note.md). The mardown is by default placed under the `.main` div in the `.pug` file. This is where the majority of the default styling has been configured. 

In summary, editing with markdown under the `.main` div will give you a consistent style for notes, while editing the `.pug` gives you more flexiblility. However, I have also added the ability to add classes and id's to elements in markdown. Although you can insert html in the markdown, it can be bulky. I created this syntax as an extra:

```markdown
### four colons (::::) acts as the opening and closing tag 
elementType:class:id::Text::::
```

This is equivalent to (in HTML): 

```html
<elementType class="class" id="id">Text</elementType>
```

For images, the syntax is:

```markdown
  img:class:id::::::{alt="" src="" title=""}
```

The supported element types are described in this mapping (blank defaults to `span`): 

```
const mapping = {
  "a": "a",
  "b": "b",
  "i": "i",
  "d": "div",
  "q": "q",
  "str": "strong",
  "sub": "sub",
  "sup": "sup",
  "blk": "blockquote",
  "img": "img",
  "important": "important",
  "warning": "warning",
  "figcaption": "figcaption",
  "": "",
}
```
