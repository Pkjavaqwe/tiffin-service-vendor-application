export interface Tiffin {
    _id: string
    tiffin_image_url: string
    tiffin_name: string
    tiffin_available_quantity: number
    tiffin_description: string
    retailer_id: string | null
    tiffin_type: string
    tiffin_price: number
    tiffin_rating: number
    tiffin_isavailable: boolean
    isActive: boolean
    tiffin_created_at: Date
    tiffin_updated_at: Date

}
export interface TiffinApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: [];
    pagination: {
        currentPage: number,
        totalPages: number,
        totalItems: number
    }
}
export interface SingleTiffinApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: Tiffin;
    pagination: {
        currentPage: number,
        totalPages: number,
        totalItems: number
    }
}

export interface CloudinaryResponse {
    image: string
}