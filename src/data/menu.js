const menuData = [
  {
    name: "Biryani",
    children: [
      {
        name: "Chicken Biryani",
        price: 220,
        type: "nonveg",
        badge: "Bestseller",
      },
      {
        name: "Egg Biryani",
        price: 180,
        type: "nonveg",
      },
    ],
  },

  {
    name: "Tandoor",
    children: [
      {
        name: "Paneer Tikka",
        price: 180,
        type: "veg",
        badge: "Chef Special",
      },
    ],
  },

  {
    name: "Chinese",
    children: [
      {
        name: "Veg Chowmein",
        price: 120,
        type: "veg",
      },
    ],
  },
];

export default menuData;