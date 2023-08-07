export interface ModalType {
    open?: boolean, 
    CloseModal?:() =>void,
    title:string, 
    width:number
}
// modal
export interface  ModalContextType {
    isOpen?: boolean;
    modalTitle: string;
    handleModalClose?: () => void;
    handleAddModal?: (title: string) => void;
    handleEditModal?: (title: string) => void;
  }
// login
export  interface LoginType {
    remember: boolean;
    password:string,username:string
}