export interface Tiffin {
    tiffin_image_url: string | null
    tiffin_name: string | null
    tiffin_available_quantity: number | null
    tiffin_description: string | null
    retailer_id: string | null
    tiffin_type: string | null
    tiffin_price: number | null
    tiffin_rating: number | null
    tiffin_isavailable: boolean | null
    isActive: boolean | null
    tiffin_created_at: Date | null
    tiffin_updated_at: Date | null

}
export interface TiffinApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: [];
}