export type PdfFileType = {
  _id: string
  name: string
  file: {
    data: Buffer
    contentType: string
  }
  createdAt: string
  updatedAt: string
}

export type PdfFileDetailsType = Omit<PdfFileType,'file'>
