import request from 'supertest';
import express from 'express';
import { toRomanNumeral } from './utils/romanNumeral';

const app = express();

app.get('/romannumeral', (req, res) => {
  try {
    const query = req.query.query;
    const num = parseInt(query as string, 10);
    if (isNaN(num)) {
      return res.status(400).send('Invalid input: must be a number');
    }
    const output = toRomanNumeral(num);
    res.json({ input: num.toString(), output });
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

describe('GET /romannumeral', () => {
  test('converts 1 to I', async () => {
    const response = await request(app).get('/romannumeral?query=1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: '1', output: 'I' });
  });
  test('converts 3999 to MMMCMXCIX', async () => {
    const response = await request(app).get('/romannumeral?query=3999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: '3999', output: 'MMMCMXCIX' });
  });
  test('returns error for 0', async () => {
    const response = await request(app).get('/romannumeral?query=0');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Input must be an integer between 1 and 3999');
  });
  test('returns error for non-numeric input', async () => {
    const response = await request(app).get('/romannumeral?query=abc');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid input: must be a number');
  });
});