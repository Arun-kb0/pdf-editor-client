import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { PdfFileType } from "../constants/types";

type Action =
  | { type: 'ADD', payload: PdfFileType }
  | { type: 'UPDATE', payload: { pdfFileId: string, pdfFile: PdfFileType } }
  | { type: 'DELETE', payload: { pdfFileId: string } }
  | { type: 'SET', payload: { pdfFiles: PdfFileType[], currentPage: number, numberOfPages: number } }

type State = {
  pdfFiles: PdfFileType[]
  currentPage: number
  numberOfPages: number
}

const pdfFilesReducer = (state: State, action: Action) => {

  switch (action.type) {
    case 'SET': {
      const { pdfFiles: newPdfFiles, currentPage, numberOfPages } = action.payload
      if (currentPage === 1) {
        return {
          ...state,
          pdfFiles: newPdfFiles,
          currentPage,
          numberOfPages
        }
      }

      const ids = new Set(state.pdfFiles.map(item => item._id))
      const unique = newPdfFiles.filter(item => !ids.has(item._id))
      return {
        pdfFiles: [...state.pdfFiles, ...unique],
        currentPage,
        numberOfPages
      }

    } case 'ADD': {
      return {
        ...state,
        pdfFiles: [action.payload, ...state.pdfFiles]
      }

    } case 'UPDATE': {
      const updated = state.pdfFiles.filter(item => item._id !== action.payload.pdfFileId)
      updated.push(action.payload.pdfFile)
      return {
        ...state,
        pdfFiles: updated
      }

    } case 'DELETE': {
      const filtered = state.pdfFiles.filter(item => item._id !== action.payload.pdfFileId)
      return {
        ...state,
        pdfFiles: filtered
      }

    } default: {
      return state
    }

  }
}

interface PdfFilesContextProps {
  state: State,
  dispatch: Dispatch<Action>
}

const PdfFilesContext = createContext<PdfFilesContextProps | undefined>(undefined)

const initialState: State = {
  pdfFiles: [],
  currentPage: 1,
  numberOfPages: 1
}

export const PdfFilesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(pdfFilesReducer, initialState);

  return (
    <PdfFilesContext.Provider value={{ state, dispatch }}>
      {children}
    </PdfFilesContext.Provider>
  )
}

export const usePdfFiles = () => {
  const context = useContext(PdfFilesContext)
  if (!context) {
    throw new Error('usePdfFiles must be used with in the PdfFilesProvider')
  }
  return context
}