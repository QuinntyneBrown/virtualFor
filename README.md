# virtualFor

virtualFor allows an app to show huge lists of items much more performantly than ng-repeat.

It renders into the DOM only as many items as are currently visible.

This means that on a phone screen that can fit eight items, only the eight items matching the current scroll position will be rendered.

## Usage

```html
    <div virtual-for='[
         { "name" : "Matrix" },
         { "name" : "This the End" },
         { "name" : "Ghostbusters" }]'
         virtual-for-of="movie">

        <h1>{{ movie.name }} </h1>

    </div>
```
