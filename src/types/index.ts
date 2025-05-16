export interface Warehouse {
  id: string;
  address: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface Inventory {
  quantity: number;
  productId: number;
  warehouseId: number;
}
