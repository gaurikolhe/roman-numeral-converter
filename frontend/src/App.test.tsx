import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Provider,
  defaultTheme
} from '@adobe/react-spectrum';
import App from './App';

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('App', () => {
  test('renders title, input, and button', () => {
    render(
      <Provider theme={defaultTheme} colorScheme='dark'>
          <App />
      </Provider>
    );
    expect(screen.getByText('Roman Numeral Converter')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter a number (1–3999)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Convert to Roman Numeral' })).toBeInTheDocument();
  });

  test('converts a valid number to Roman numeral', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ input: '1', output: 'I' }),
    });

    render(
      <Provider theme={defaultTheme} colorScheme='dark'>
          <App />
      </Provider>
    );
    const input = screen.getByRole('textbox', { name: 'Enter a number (1–3999)' });
    const button = screen.getByRole('button', { name: 'Convert to Roman Numeral' });

    await userEvent.clear(input);
    await userEvent.type(input, '1');
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === 'Roman numeral: I';
        })
      ).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/romannumeral?query=1');
  });

  test('displays error for invalid number', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Input must be an integer between 1 and 3999',
    });

    render(
      <Provider theme={defaultTheme} colorScheme='dark'>
          <App />
      </Provider>
    );
    const input = screen.getByRole('textbox', { name: 'Enter a number (1–3999)' });
    const button = screen.getByRole('button', { name: 'Convert to Roman Numeral' });

    await userEvent.clear(input);
    await userEvent.type(input, '0');
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === 'Error: Input must be an integer between 1 and 3999';
        })
      ).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/romannumeral?query=0');
  });

  test('displays error when no number is entered', async () => {
    render(
      <Provider theme={defaultTheme} colorScheme='dark'>
          <App />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Convert to Roman Numeral' });

    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === 'Error: Please enter a number';
        })
      ).toBeInTheDocument();
    }, { timeout: 1000 });
    expect(fetch).not.toHaveBeenCalled();
  });
});