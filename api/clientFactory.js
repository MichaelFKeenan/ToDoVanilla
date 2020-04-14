import {
  Client
} from 'pg';

//move this into local env var
const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgresql://postgres:hwaaw488@localhost:5432/todo'

export const newClient = () => {
  const client = new Client({
      connectionString
  });

  client.connect(err => {
      if (err) {
          console.error('connection error', err.stack)
      }
  });

  return client;
}