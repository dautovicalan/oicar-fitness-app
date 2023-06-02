import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../Components/RegistrationForm.jsx';
import { getByRole, getByText } from '@testing-library/react';
import Gdpr from '../Components/Gdpr.jsx'

describe('RegistrationForm', () => {
  it('should navigate to Gdpr component when hyperlink is clicked', () => {
    // Arrange
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    // Act
    fireEvent.click(getByText('terms of service'));
    console.log(screen.debug()); 
    // Assert
    expect(getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
  });
});