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
        ownerId: {
         type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        commentId: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"comments"',
            onDelete: 'cascade',
          },
        date: {
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
