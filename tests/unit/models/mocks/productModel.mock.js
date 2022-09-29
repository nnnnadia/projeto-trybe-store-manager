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

const affectedRowsFromDB = [{ affectedRows: 1 }];

module.exports = {
  affectedRowsFromDB,
  insertIdFromDB,
  productsFromDB,
};
