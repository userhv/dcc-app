# react-native-rss-parser

## Parsed model

```js
{
  type: undefined,            // either `rss-v2` or `atom-v1`
  title: undefined,           // title of the channel
  links: [{
    url: undefined,           // url of the channel
    rel: undefined            // type of url (eg. alternate)
  }],
  description: undefined,     // description of the channel
  language: undefined,        // language of the channel in `en-us`
  copyright: undefined,       // copyright information about the channel
  authors: [{
    name: undefined           // channel author names
  }],
  lastUpdated: undefined,     // last updated date for the channel
  lastPublished: undefined,   // last published date for the channel
  categories: [{
    name: undefined           // categories the channel belong too
  }],
  image: {
    url: undefined,           // channel image url
    title: undefined,         // channel image title
    description: undefined,   // channel image description
    width: undefined,         // channel image width (pixels)
    height: undefined         // channel image height (pixels)
  },
  itunes: {                   // itunes specific channel information
    author: [{
      name: undefined         // channel author names
    }],
    block: undefined,         // if `yes` then the entire podcast isn't shown in iTunes directory
    categories: [{
      name: undefined,        // channel category names
      subCategories:[{
        name: undefined       // sub category names
      }]
    }],
    image: undefined,         // channel image url
    explicit: undefined,      // `yes`/`no` to indicate if channel contains explicit content
    complete: undefined,      // `yes` indicates the feed won't publish any new items in the future
    newFeedUrl: undefined,    // a url pointing to the new feed location
    owner: {
      name: undefined,        // owner name of the channel
      email: undefined,       // owner email address of the channel
    },
    subtitle: undefined,      // sub title of the channel
    summary: undefined,       // summary of the channel
  },
  items: [{                   // list of items in the feed
    id: undefined,            // item id
    title: undefined,         // item title
    imageUrl: undefined,      // item image url
    media: [{                 
      type: undefined,        //item media type
      url: undefined          //item media url
    }],
    links: [{
      url: undefined,         // item link url
      rel: undefined          // type of item link
    }],
    description: undefined,   // item description
    content: undefined,       // item HTML content
    categories: [{
      name: undefined         // categories the item belongs too
    }],
    authors: [{
      name: undefined         // item author names
    }],
    published: undefined,     // item published date
    enclosures: [{
      url: undefined,         // item media url
      length: undefined,      // item media length (bytes)
      mimeType: undefined     // item media mime type (eg audio/mpeg)
    }],
    itunes: {                 // itunes specific item information
      authors: [{
        name: undefined,      // item author names
      }],
      block: undefined,       // `yes` indicates the item won't be displayed in the iTunes directory
      duration: undefined,    // HH:MM:SS length of the item
      explicit: undefined,    // `yes`/`no` to indicate if item contains explicit content
      image: undefined,       // image url for the item
      isClosedCaptioned: undefined, // `yes` indicates if the item contains closed captioning
      order: undefined,       // item order number
      subtitle: undefined,    // item subtitle
      summary: undefined,     // item summary
    }
  }]
}
```


## Contributing

1. Forked by (<https://github.com/jameslawler/react-native-rss-parser>)

## License

Distributed under the MIT license. See `LICENSE` for more information.
