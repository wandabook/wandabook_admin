
import axios from "axios";
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
    // Cloudinary config
    const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME as string;
    const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET as string;

    // Remove data URL prefix if present
    const base64Data = base64.startsWith('data:') ? base64 : `data:image/png;base64,${base64}`;

    const formData = new FormData();
    formData.append('file', base64Data);
    formData.append('upload_preset', uploadPreset);
    formData.append('public_id', `${path}/${filename}`);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Cloudinary upload failed');
    const data = await response.json();
    // Cloudinary returns the URL in 'secure_url'
    return data.secure_url as string;
}
export function generateTemporaryPassword(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    try {
        const response = await axios.post(import.meta.env.VITE_APP_SEND_EMAIL_ROUTE, {
            to,
            subject,
            text
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Failed to send email');
        }
        throw error;
    }
}

export const generateWelcomeMessage = (
  firstName: string,
  cardCode: string,
  temporaryPassword: string,
  loginLink: string
): string => {
  return `Bonjour ${firstName},

Merci pour votre abonnement !

Voici vos identifiants pour accéder à votre compte :
- Code de carte : ${cardCode}
- Mot de passe temporaire : ${temporaryPassword}

Vous pouvez vous connecter à votre espace ici : ${loginLink}

Cordialement,  
L'équipe`;
};