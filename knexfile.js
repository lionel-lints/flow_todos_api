const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'flow_todo_dev'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

export default config;
