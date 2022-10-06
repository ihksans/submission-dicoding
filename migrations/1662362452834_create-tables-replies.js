/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('replies', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        body: {
            type: 'TEXT',
          },
        ownerid: {
          type: 'VARCHAR(50)',
          notNull: true,
        },
        commentid: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"comments"',
            onDelete: 'cascade',
          },
        createdAt: {
              type: 'timestamp',
              notNull: true,
              default: pgm.func('current_timestamp'),
            },
        deletedAt: {
              type: 'timestamp',
            },
      });
};

exports.down = pgm => {
    pgm.dropTable('replies');
};
