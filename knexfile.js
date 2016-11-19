export default {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/flow_todo_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
