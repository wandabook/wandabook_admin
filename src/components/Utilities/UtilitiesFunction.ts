
import { v4 as uuidv4 } from "uuid";

export async function handleResponse<T>(response: Response): Promise<{ jsonResponse: T; httpStatusCode: number }> {
    if (!response.ok) {
        console.log(response.json())
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
        const jsonResponse = await response.json();
        return { jsonResponse, httpStatusCode: response.status };
    } catch (err: unknown) {
        const errorMessage = (err as Error).message;
        throw new Error(`Error parsing response: ${errorMessage}`);
    }
}



export const generateCashPaymentLog = (
    userName: string,
    amount: number,
    agent: string,
    isRenewal: boolean,
    date = new Date()
) => {
    const type = isRenewal ? 'Réabonnement' : 'Nouvelle souscription'
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(date)

    return `[Paiement en espèce] - ${type} pour ${userName}.\nMontant reçu : ${amount.toLocaleString()} FCFA.\nOpérateur : ${agent}.\nDate : ${formattedDate}.`
}

/**
 * Convert a base64 string to a File object
 * @param base64 - The base64 string (with or without data URL prefix)
 * @param filename - The desired file name
 * @returns File
 */
export function base64ToFile(base64: string, filename: string): File {
    // Remove data URL prefix if present
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
// Helper: Upload a base64 image and get the URL
export async function uploadBase64Image(base64: string, filename: string, path: string) {
    
    const formData = new FormData();
    formData.append('file', base64ToFile(base64, filename));
    //formData.append('filename', filename);
    formData.append('path', path);
    const id = uuidv4();
    const response = await fetch(`${import.meta.env.VITE_APP_STORAGE_URL}/upload/${id}`, {
        method: 'POST',
        body: formData,
    });
    console.log('response', response)
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url; // The backend should return { url: "https://..." }
}