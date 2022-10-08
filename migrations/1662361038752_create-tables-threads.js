/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('threads', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        title: {
          type: 'TEXT',
        },
        body: {
            type: 'TEXT',
          },
        ownerId: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"',
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
    pgm.dropTable('threads');
};
