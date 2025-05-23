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

export interface Salesman {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Statement {
  id: number;
  description: string;
}

export interface Customer {
  id: number;
  idType: string;
  name: string;
  salespersonId: string;
}

export interface OrderProduct {
  quantity: number;
  priceAtOrder: number;
  product: Product;
}

export interface Order {
  id: number;
  status: string;
  createdAt: string;
  customer: Customer;
  orderProducts: OrderProduct[];
}

export interface ReportPeriod {
  type: "monthly" | "quarterly" | "yearly";
  start: string;
  end: string;
}

export interface ReportSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface Report {
  period: ReportPeriod;
  salesperson: Salesman;
  orders: Order[];
  summary: ReportSummary;
}

export interface Waypoint {
  id: string;
  location: string;
  stopover: boolean;
}
