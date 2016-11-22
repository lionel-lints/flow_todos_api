const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'flow_todo_dev'
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'postgres://localhost/flow_todo_test'
    },
    debug:true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

export default config;
