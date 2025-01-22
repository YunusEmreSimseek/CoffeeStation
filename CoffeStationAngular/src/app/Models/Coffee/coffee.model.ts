
export interface CoffeeModel {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: string;
}

export interface CoffeeBasketDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: string;
  quantity: number;
}

export interface CreateCoffeeModel {
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: string;
}


// export class Coffeee {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   category: string;
//   quantity: number;

//   constructor(id: number, name: string, description: string, image: string, price: number, category: string, quantity: number = 0) {
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.image = image;
//     this.price = price;
//     this.category = category;
//     this.quantity = quantity;
//   }
// }
