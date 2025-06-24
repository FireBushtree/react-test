export function createInstance(type: string, props: any) {
  const element = document.createElement(type)
  return element
}

export function createTextInstance(content: string) {
  return document.createTextNode(content)
}

export function appendInitialChild(parent: HTMLElement, child: any) {
  parent.appendChild(child)
}
