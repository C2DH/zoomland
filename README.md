# Zooomland

## Description

Zoomland is a web game developed on react with Vite.

## Installation

```bash
npm install
```

## Usage

### Add a Price in the game

In the array of chapters in `src/data/chapters.json`, add the chapter metadata to which the price refers to, with the following properties:

- `viewType`: the type of the price (see `src/constants` for the list of available types)
- `category`: the category of the price (see `src/constants` for the list of available categories)
- `position`: the position of the price in the world
- `id`: the id of the chapter, usually its position in the list of chapters followed by a suffix, for example `0-introduction` for the introduction chapter and `1-adventure-in-zoomland` for the first chapter.

This way, we refer to the right chapter in the `<Price>` component.

Then add a related `<Price>` component inside the `<Physics>` tag in `src/components/World.jsx`:

```javascript
import Chapters from '../data/chapters'

return (
  // ... a lot of other stuff here
  <Price
    viewType={Chapters[1].viewType}
    category={Chapters[1].category}
    position={Chapters[1].position}
    id={Chapters[1].id}
  />
  // ... a lot of other stuff here
)
```

or, shortly

```javascript
<Price {...Chapters[1]} />
```

that's it!
