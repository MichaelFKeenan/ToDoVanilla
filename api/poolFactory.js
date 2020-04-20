import {
  Pool
} from 'pg';

const connectionString = process.env.DATABASE_URL

export const newPool = () => {
  const pool = new Pool({
    connectionString
  });

  pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    }
  });

  return pool;
}