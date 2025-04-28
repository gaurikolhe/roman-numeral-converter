import { useState } from 'react';
import {
  Button,
  NumberField,
  Text,
  View,
  Flex,
  Heading,
} from '@adobe/react-spectrum';

function App() {
  // State for the input number, conversion result, and error message
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  // Handle the conversion request when the button is clicked
  const handleConvert = async () => {
    // Client-side validation: Ensure a number is entered
    if (number === undefined) {
      setError('Please enter a number');
      setResult('');
      return;
    }
    try {
      // Make API request to the backend to convert the number
      const response = await fetch(`${API_BASE_URL}/romannumeral?query=${number}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      // Update state with the conversion result
      setResult(data.output);
      setError('');
    } catch (err) {
      // Handle errors (e.g., network errors, invalid input responses)
      setError((err as Error).message);
      setResult('');
    }
  };

  return (
    <View
        backgroundColor="gray-50"
        borderWidth="thin"
        borderColor="gray-200"
        borderRadius="medium"
        padding="size-400"
        maxWidth="size-6000"
        marginStart="auto"
        marginEnd="auto"
        minHeight="size-4600"
      >
        <Flex direction="column" gap="size-300" alignItems="center">
          <Heading level={2}>Roman Numeral Converter</Heading>
          {/* Input field for entering a number */}
          <NumberField
            label="Enter a number (1–3999)"
            value={number}
            onChange={setNumber}
            width="size-4600"
            marginBottom="size-200"
          />
          {/* Button to trigger the conversion */}
          <Button
            variant="accent"
            onPress={handleConvert}
            width="size-2600"
          >
            Convert to Roman Numeral
          </Button>
          {/* Display the conversion result*/}
          {result && (
            <Text>
              <strong>Roman numeral:</strong> {result}
            </Text>
          )}
          {/* Display error messages*/}
          {error && (
            <Text
              UNSAFE_style={{ color: 'var(--spectrum-global-color-red-600)' }}
            >
              <strong>Error:</strong> {error}
            </Text>
          )}
        </Flex>
    </View>
  );
}

export default App;