export default interface ToastPayload {
    type: 'info' | 'success' | 'danger' | 'warning';
    message: string;
}