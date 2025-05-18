import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


export default function Modal({ deletarHabito, isDeleteModalOpen, setIsDeleteModalOpen, loading }) {
    return (
        <Dialog
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
        >
            <DialogTitle style={{ color: '#666666', fontFamily: "Lexend Deca"}}>
                Confirmar exclusão
            </DialogTitle>
            <DialogContent style={{fontFamily: "Lexend Deca"}}>
                <p>Tem certeza que deseja excluir este hábito?</p>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    style={{ color: '#666666', fontFamily: "Lexend Deca" }}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={deletarHabito}
                    style={{ color: '#ff4040', fontWeight: 'bold', fontFamily: "Lexend Deca" }}
                    disabled={loading}
                >
                    {loading ? 'Excluindo...' : 'Confirmar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

