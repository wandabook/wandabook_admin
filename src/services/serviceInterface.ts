export interface MenuRequest {
    Code: string | undefined,
    Title: string | undefined,
    Description: string | undefined,
    StartDate: string | undefined,
    EndDate: string | undefined,
}


export interface MenuItem {
    PlateCode?: string,
    QuantityAvailable?: string,
}

export interface Plat {
    Code: string,
    Title: string,
    BasePrice: number,
    Currency: string,
    CategoryCode: string,
    Likes: number,
    content: []
}