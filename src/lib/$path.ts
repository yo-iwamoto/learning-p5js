export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _gitkeep: '/.gitkeep',
  img: {
    cat_png: '/img/cat.png',
    dog_png: '/img/dog.png'
  }
} as const

export type StaticPath = typeof staticPath
