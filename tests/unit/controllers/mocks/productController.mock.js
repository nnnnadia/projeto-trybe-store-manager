const productsFromDB = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ],
];

const insertIdFromDB = [{ insertId: 42 }];

const newlyCreatedProductFromDB = [
  [
    {
      id: 42,
      name: 'produto incrível',
    }
  ]
];

module.exports = {
  productsFromDB,
  insertIdFromDB,
  newlyCreatedProductFromDB,
};
