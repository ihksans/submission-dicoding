/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('comments', {
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
        threadid: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"threads"',
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
    pgm.dropTable('comments');
};
