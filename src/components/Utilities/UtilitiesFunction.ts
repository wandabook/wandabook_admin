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