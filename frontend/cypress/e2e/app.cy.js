describe('Roman Numeral Converter Fullstack', () => {
  // Setup before each test: Visit the app and clear the input field
  beforeEach(() => {
    // Visit the app using the baseUrl from cypress.config.ts
    cy.visit('/');
    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .clear();
  });

  // Test successful conversion of 1 to I
  it('converts 1 to I', () => {
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=1', {
      statusCode: 200,
      body: { input: '1', output: 'I' },
    }).as('convertRequest');

    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('1')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    // Wait for the API request and verify the status code
    cy.wait('@convertRequest', { timeout: 15000 });
    // Verify the result is displayed
    cy.contains('Roman numeral: I').should('exist');
  });

  // Test successful conversion of 3999 to MMMCMXCIX
  it('converts 3999 to MMMCMXCIX', () => {
    // Stub the API response for a successful conversion
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=3999', {
      statusCode: 200,
      body: { input: '3999', output: 'MMMCMXCIX' },
    }).as('convertRequest');

    // Enter the number 3999 and trigger conversion
    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('3999')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    // Wait for the API request and verify the status code
    cy.wait('@convertRequest', { timeout: 15000 });
    // Verify the result is displayed
    cy.contains('Roman numeral: MMMCMXCIX').should('exist');
  });

  // Test successful conversion of 2025 to MMXXV
  it('converts 2025 to MMXXV', () => {
    // Stub the API response for a successful conversion
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=2025', {
      statusCode: 200,
      body: { input: '2025', output: 'MMXXV' },
    }).as('convertRequest');

    // Enter the number 2025 and trigger conversion
    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('2025')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    // Wait for the API request and verify the status code
    cy.wait('@convertRequest', { timeout: 15000 });
    // Verify the result is displayed
    cy.contains('Roman numeral: MMXXV').should('exist');
  });

  // Test error handling for input 0 (out of range)
  it('displays error for 0', () => {
    // Stub the API response for an out-of-range error
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=0', {
      statusCode: 400,
      body: 'Input must be an integer between 1 and 3999',
    }).as('convertRequest');

    // Enter the number 0 and trigger conversion
    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('0')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    // Wait for the API request and verify the status code
    cy.wait('@convertRequest', { timeout: 15000 });
    // Verify the error message is displayed
    cy.contains('Error: Input must be an integer between 1 and 3999').should('exist');
  });

  it('displays error for 4000 (out of range)', () => {
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=4000', {
      statusCode: 400,
      body: 'Input must be an integer between 1 and 3999',
    }).as('convertRequest');

    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('4000')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    cy.wait('@convertRequest', { timeout: 15000 });
    cy.contains('Error: Input must be an integer between 1 and 3999').should('exist');
  });

  // Test client-side validation for no input
  it('displays error when no number is entered', () => {
    // Click the convert button without entering a number
    cy.contains('button', 'Convert to Roman Numeral').click();
    // Verify the client-side error message
    cy.contains('Error: Please enter a number').should('exist');
  });

  // Test handling of network errors
  it('handles network errors', () => {
    // Stub the API response for a network error
    cy.intercept('GET', 'http://localhost:8080/romannumeral?query=1', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('convertRequest');

    // Enter a number and trigger conversion
    cy.contains('label', 'Enter a number')
      .parent()
      .find('input')
      .type('1')
      .blur();

    cy.contains('button', 'Convert to Roman Numeral').click();
    // Wait for the API request and verify the status code
    cy.wait('@convertRequest', { timeout: 15000 });
    // Verify the error message is displayed
    cy.contains('Error: Internal Server Error').should('exist');
  });
});