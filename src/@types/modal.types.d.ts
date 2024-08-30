export type ModalMetadata = {
  close?: {
    condition?: boolean
    message?: string
    preventBackgroundTouch?: boolean
  }
  [key: string]: any
}
