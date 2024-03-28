import { create } from 'zustand'

type TransactionModalState = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useTransactionModal = create<TransactionModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
