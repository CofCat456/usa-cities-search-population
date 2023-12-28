export function getHeightText(text: string, verifyText: string) {
  const regex = new RegExp(verifyText, 'gi')
  return text.replace(regex, `<span class="bg-highlight-1">${verifyText}</span>`)
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function isElementAtBottom(element: HTMLElement) {
  const scrollTop = element.scrollTop
  const visibleHeight = element.clientHeight
  const totalHeight = element.scrollHeight
  return scrollTop + visibleHeight >= totalHeight
}
