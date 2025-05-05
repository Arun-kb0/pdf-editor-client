export type PdfFileType = {
  name: string
  file: {
    data: Buffer
    contentType: string
  }
  createdAt: string
  updatedAt: string
}

export type PdfFileDetailsType = Omit<PdfFileType,'file'>
