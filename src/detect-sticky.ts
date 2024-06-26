const customSheet = new CSSStyleSheet()
customSheet.replaceSync(`:host{display: contents;}`)

/**
 * TODO:
 * - react to changes in the top value of the sticky element, e.g via media query or clamp function
 * - detect viewport changes
 * - also for left, right, bottom values
 * - document :state(stuck) vs :--stuck vs [stuck]
 */

class DetectSticky extends HTMLElement {
  private _internals: ElementInternals
  private observer: IntersectionObserver

  constructor() {
    super()
    this._internals = this.attachInternals()
    const shadow = this.attachShadow({
      mode: "open",
    })

    shadow.adoptedStyleSheets = [customSheet]
    shadow.appendChild(document.createElement("slot"))

    this.observer
  }

  get stuck() {
    return this._internals?.states.has("stuck")
  }

  set stuck(value) {
    if (value) {
      this._internals.states.add("stuck")
      this.attributes.setNamedItem(document.createAttribute("stuck"))
    } else {
      this._internals.states.delete("stuck")
      if (this.attributes.getNamedItem("stuck"))
        this.attributes.removeNamedItem("stuck")
    }
  }

  connectedCallback() {
    const childElement = this.children[0]
    let topValue = parseFloat(getComputedStyle(childElement).top) || 0

    if (topValue > 0) {
      topValue = topValue * -1 - 1
    } else {
      topValue = topValue - 1
    }

    this.observer = new IntersectionObserver(
      ([e]) => {
        this.stuck = e.intersectionRatio < 1
      },
      {
        // TODO: document.body.offsetHeight is just a workaround
        rootMargin: `${topValue}px 0px ${
          document.body.offsetHeight * 1.5
        }px 0px`,
        threshold: [1],
        root: null,
      }
    )
    this.observer.observe(childElement)
  }

  disconnectedCallback() {
    this.observer.disconnect()
  }
}

customElements.define("detect-sticky", DetectSticky)
