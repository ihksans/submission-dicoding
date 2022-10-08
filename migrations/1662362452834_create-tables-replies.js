/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('replies', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        content: {
            type: 'TEXT',
          },
        ownerid: {
         type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        commentid: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"comments"',
            onDelete: 'cascade',
          },
        createdat: {
              type: 'timestamp',
              notNull: true,
              default: pgm.func('current_timestamp'),
            },
        deletedat: {
              type: 'timestamp',
            },
      });
};

exports.down = pgm => {
    pgm.dropTable('replies');
};
