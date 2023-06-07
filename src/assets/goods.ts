type itemKeys = 'brand' | 'model' | 'year' | 'stock' | 'color' | 'size' | 'gaming' | 'popular';
interface LaptopData {
  id: number;
  brand: string;
  model: string;
  stock: number;
  year: number;
  color: string;
  size: string;
  gaming: string;
  popular: string;
}

const data: LaptopData[] = [
  {
    id: 1,
    brand: 'Lenovo',
    model: 'Ideapad Gaming 3',
    stock: 3,
    year: 2020,
    size: 'medium',
    color: 'blue',
    gaming: 'yes',
    popular: 'yes',
  },
  {
    id: 2,
    brand: 'Lenovo',
    model: 'Thinkpad X1 Carbon',
    stock: 6,
    year: 2014,
    size: 'medium',
    color: 'black',
    gaming: 'no',
    popular: 'no',
  },
  {
    id: 3,
    brand: 'Lenovo',
    model: 'IdeaPad Y900',
    stock: 2,
    year: 2016,
    size: 'large',
    color: 'black',
    gaming: 'yes',
    popular: 'no',
  },
  {
    id: 4,
    brand: 'Lenovo',
    model: 'IdeaPad Gaming 3',
    stock: 10,
    year: 2020,
    size: 'medium',
    color: 'black',
    gaming: 'yes',
    popular: 'yes',
  },
  {
    id: 5,
    brand: 'Dell',
    model: 'Latitude 5310',
    stock: 6,
    year: 2021,
    size: 'small',
    color: 'gray',
    gaming: 'no',
    popular: 'no',
  },
  {
    id: 6,
    brand: 'Dell',
    model: 'XPS 13',
    stock: 8,
    year: 2022,
    size: 'small',
    color: 'white',
    gaming: 'no',
    popular: 'no',
  },
  {
    id: 7,
    brand: 'Dell',
    model: 'XPS 13',
    stock: 7,
    year: 2022,
    size: 'small',
    color: 'gray',
    gaming: 'no',
    popular: 'no',
  },
  {
    id: 8,
    brand: 'Dell',
    model: 'Inspiron 15 5000',
    stock: 5,
    year: 2019,
    size: 'medium',
    color: 'blue',
    gaming: 'no',
    popular: 'yes',
  },
  {
    id: 9,
    brand: 'HP',
    model: 'Pavilion Gaming 15',
    stock: 4,
    year: 2018,
    size: 'medium',
    color: 'black',
    gaming: 'yes',
    popular: 'yes',
  },
  {
    id: 10,
    brand: 'HP',
    model: '17-by2051ur',
    stock: 3,
    year: 2017,
    size: 'large',
    color: 'white',
    gaming: 'no',
    popular: 'yes',
  },
  {
    id: 11,
    brand: 'HP',
    model: '17-cp0109ur',
    stock: 5,
    year: 2019,
    size: 'large',
    color: 'gray',
    gaming: 'no',
    popular: 'no',
  },
  {
    id: 12,
    brand: 'HP',
    model: 'Pavilion 15-p159nr',
    stock: 1,
    year: 2015,
    size: 'small',
    color: 'gray',
    gaming: 'no',
    popular: 'no',
  },
];

function getItemById(id: number) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) return data[i];
  }
}

export default data;
export { LaptopData, itemKeys, getItemById };
