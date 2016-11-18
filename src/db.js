export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  const environment = process.env.NODE_ENV || 'development';
  
  callback();
}
