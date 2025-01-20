import { Client, Account, Databases, ID, Query, Functions, ExecutionMethod, } from 'appwrite';
import { patronCollection } from '../components/Utilities/constants';
export { ID } from 'appwrite';
export const client = new Client();
const databases = new Databases(client);
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('671629940021dc2b8ecb'); // Replace with your project ID

export const account = new Account(client);
const databaseId = '671bb8f9000c6e9bf6a0';
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

export const logout = async () => {
    await account.deleteSession('current');
}
export const users = async () => {
    const result = await functions.createExecution(
        '6725080b0013accf3a71', // functionId
        '', // body (optional)
        false, // async (optional)
        'users', // path (optional)
        ExecutionMethod.GET, // method (optional)
        {}, // headers (optional)
    );
    return result;
}

export const createUser = async (body: string) => {
    const result = await functions.createExecution(
        '6725080b0013accf3a71', // functionId
        body, // body (optional)
        false, // async (optional)
        'users', // path (optional)
        ExecutionMethod.POST, // method (optional)
        {}, // headers (optional)
    );
    return result;
}
export const getDocumentsGlobal = async (collectionId: string) => {
    return await databases.listDocuments(
        databaseId,
        collectionId,
        [
        ]
    );
}
export const getSingleDocumentsGlobal = async (documentId: string, collectionId: string) => {
    return await databases.getDocument(
        databaseId,
        collectionId,
        documentId
    );
}
export const createDocumentGlobal = async (collectionId: string, data: any) => {
    return await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data
    );
}
export const editDocumentGlobal = async (collectionId: string, documentId: string, data: any) => {
    return await databases.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data
    );
}
export const deleteDocumentGlobal = async (collectionId: string, documentId: string) => {
    return await databases.deleteDocument(
        databaseId,
        collectionId,
        documentId,
    );
}

const functions = new Functions(client);

export const deleteUser = async (data: any) => {
    const result = await functions.createExecution(
        '6724cc3e00047f95c411', // functionId
        JSON.stringify(data), // body (optional)
        false, // async (optional)
        'patron', // path (optional)
        ExecutionMethod.DELETE, // method (optional)
        {}, // headers (optional)
    );
    await deleteDocumentGlobal(patronCollection, data.documentId);
    return result;
}

export const updateUser = async (data: any, documentId: string) => {
    const dataJ = { ...data, freeze: data.freeze ? 1 : null }
    const result = await functions.createExecution(
        '6724cc3e00047f95c411', // functionId
        JSON.stringify(dataJ), // body (optional)
        false, // async (optional)
        'patron', // path (optional)
        ExecutionMethod.PUT, // method (optional)
        {}, // headers (optional)
    );
    await editDocumentGlobal(patronCollection, documentId, data);
    return result;
}

export const getDocumentsFreeze = async () => {
    return await databases.listDocuments(
        '671bb8f9000c6e9bf6a0',
        '671bb91d000cd2063080',
        [
            Query.equal('freeze', true)
        ]
    );
}
export const getUser = async () => {
    return await account.get()
}


export const addNewUser = async (data: any) => {
    const result = await functions.createExecution(
        '6724cc3e00047f95c411', // functionId
        data, // body (optional)
        false, // async (optional)
        'patron', // path (optional)
        ExecutionMethod.POST, // method (optional)
        {}, // headers (optional)
    );
    return result;
}

export const createNewUser = async (data: any) => {
    return databases.createDocument(
        '671bb8f9000c6e9bf6a0',
        '671bb91d000cd2063080',
        ID.unique(),
        data
    );
}


export const getDocumentsWithFilerGlobal = async (collectionId: string, filters: string[]) => {
    return await databases.listDocuments(
        databaseId,
        collectionId,
        filters
    );
}

