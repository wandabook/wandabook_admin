import axios from "axios";

/* MENU */
export const fetchMenu = async () => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus`;
    try {
        const response = await axios (url, {
            params: {
                all: true
            },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response.data.body.results;
    } catch (error) {
        console.error('Database.fetchMenu.error ::', error);
        throw error;
    }
};
export const fetchSingleMenu = async (menuCode: string) => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus/items?MenuCode=${menuCode}`;
    try {
        const response = await axios (url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response.data.body.results;
    } catch (error) {
        console.error('Database.fetchMenu.error ::', error);
        throw error;
    }
};
export const createMenu = async (payload: any) => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus`;

    try {
        const response = await axios.post(url, { 
            Menu: payload
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.body;
    } catch (error) {
        console.log('Database.createMenu.error ::', error);
        throw error;
    }
};
export const cloneMenu = async (payload: any, parentCode: string|undefined) => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus/clone?MenuCode=${parentCode}&DeepClone=true`;
    try {
        const response = await axios.post(url, { 
            Menu: payload
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.body;
    } catch (error) {
        console.log('Database.createMenu.error ::', error);
        throw error;
    }
};
export const updateMenu = async (payload: any) => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus`;

    try {
        const response = await axios.put(url, { 
            Menu: payload
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.body;
    } catch (error) {
        console.log('Database.updateMenu.error ::', error);
        throw error;
    }
};
export const deleteMenu = async (codeList: any[]) => {
    const url =  `${import.meta.env.VITE_APP_MENU_BASE_URL_V1}/menus`;
    try {
        const response = await axios.delete(url,{
            data: { 
                Menus: codeList
            },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.body;
    } catch (error) {
        console.log('Database.createMenu.error ::', error);
        throw error;
    }
}


/* PLATE */
export const fetchPlate = async () => {
    const url =  `${import.meta.env.VITE_APP_PLAT_BASE_URL_V1}/plats`;

    try {
        const response = await axios (url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response.data.body.results;
    } catch (error) {
        console.error('Database.fetchPlate.error ::', error);
        throw error;
    }
}

/* PRODUCT */
export const fetchProduct = async () => {
    const url =  `${import.meta.env.VITE_APP_PRODUCT_BASE_URL_V1}/products`;

    try {
        const response = await axios (url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response.data.body.results;
    } catch (error) {
        console.error('Database.fetchProduct.error ::', error);
        throw error;
    }
}


/* CONTENT */
export const fetchConfig = async () => {
    const url =  `${import.meta.env.VITE_APP_CONFIG_BASE_URL_V1}/configs?categories=true&QuantityUnit=true`;

    try {
        const response = await axios (url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response.data.body.results;
    } catch (error) {
        console.error('Database.fetchProduct.error ::', error);
        throw error;
    }
}


export const generateCode = (title:string) => {
    let result = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * title.length);
        result += title[randomIndex];
    }

    return result;
}

export const formatedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont de 0 à 11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

