import { Client, Account, Functions, ExecutionMethod, Databases, ID } from 'appwrite';
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

const login = (email: string, password: string) => {
    account.createEmailPasswordSession(email, password);
}
