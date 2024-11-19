import { Client, Account, Functions, ExecutionMethod, Databases, ID, Query } from 'appwrite';
export { ID } from 'appwrite';
export const client = new Client();
const databases = new Databases(client);
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('671629940021dc2b8ecb'); // Replace with your project ID

export const account = new Account(client);
const functions = new Functions(client);
export const getDocuments = async () => {
    return await databases.listDocuments(
        '671bb8f9000c6e9bf6a0',
        '671bb91d000cd2063080',
        [
        ]
    );
}
export const getSingleDocuments = async (documentId: string) => {
    return await databases.getDocument(
        '671bb8f9000c6e9bf6a0',
        '671bb91d000cd2063080',
        documentId
    );
}

export const getActivities = async (documentId: string) => {
    return await databases.listDocuments(
        '671bb8f9000c6e9bf6a0',
        '673c47ef003a877f040a',
        [Query.equal('patrons', documentId)]
    );
}

export const login = (email: string, password: string) => {
    return account.createEmailPasswordSession(email, password);
}

export const users = () => {

}
