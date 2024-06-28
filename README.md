# detect-sticky [WIP]

Detects when a sticky element is in its `stuck` state.

> Currently works only on the top of the viewport

## ToDos

- [ ] Add support for bottom, left & right sticky elements (with logical properties, too)
- [ ] Check support for nested sticky elements
- [ ] Add support for viewport changes (resize,
- [ ] Add support for changes in the top value of the sticky element, e.g via media query or clamp function)

## Custom Element

1. import `detect-sticky/element` into your project.

2. Wrap your sticky element with the `detect-sticky` element.

```html
<detect-sticky>
  <div class="sticky-element">I'm a sticky element</div>
</detect-sticky>
```

> _Important_: Only one child element is allowed inside the `detect-sticky` element.

### Function

The `detect-sticky` element has a `stuck` boolean property that is toggled when the sticky element is in its `stuck` state. It has `display: contents` so it doesn't affect the layout.

Also, the child element receives a `data-stuck` attribute when it is in its `stuck` state.

### Styling

#### Via custom state pseudo-class selector — modern browsers only ([Caniuse](https://caniuse.com/mdn-css_selectors_state))

```css
detect-sticky:state(stuck) > .sticky-element {
  …
}
```

#### Variant 2 — via custom attribute selector on the `detect-sticky` element

```css

detect-sticky[stuck] > .sticky-element {
  …
}
```

#### Variant 3 — via custom attribute selector on the sticky element

```css
.sticky-element[data-stuck] {
  …
}
```
