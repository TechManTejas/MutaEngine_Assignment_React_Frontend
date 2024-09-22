export interface IProduct {
    id: number;                  // Assuming the product has a primary key 'id'
    name: string;                // Product name
    description: string;         // Short description of the product
    detailed_description: string; // Detailed description of the product
    price: number;               // Price in decimal format
    cover_image: string;         // URL of the product's cover image
  }