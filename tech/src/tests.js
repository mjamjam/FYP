import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('creates a new item', () => {
  const { getByText, getByLabelText } = render(<App />);
  const createButton = getByText('Add Patient');
  fireEvent.click(createButton);
  const nameInput = getByLabelText('Name');
  fireEvent.change(nameInput, { target: { value: 'New Item' } });
  const emailInput = getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'Email for new item' } });
  const contactInput = getByLabelText('Contact');
  fireEvent.change(contactInput, { target: { value: 'Contact for new item' } });
  const abnormalityInput = getByLabelText('Abnormality');
  fireEvent.change(abnormalityInput, { target: { value: 'Abnormality for new item' } });
  const fileInput = getByLabelText('File');
  const file = new File(['test file content'], 'test.txt', { type: 'text/plain' });
  fireEvent.change(fileInput, { target: { files: [file] } });
  const saveButton = getByText('Save');
  fireEvent.click(saveButton);
  const newItemName = getByText('New Item');
  expect(newItemName).toBeInTheDocument();
  expect(newItemName).toHaveTextContent('New Item');
  expect(getByText('Description for new item')).toBeInTheDocument();
  expect(getByText('test.txt')).toBeInTheDocument();
});


test('updates an existing item', () => {
  const { getByText, getByLabelText } = render(<App />);
  const editButton = getByText('Edit');
  fireEvent.click(editButton);
  const nameInput = getByLabelText('Name');
  fireEvent.change(nameInput, { target: { value: 'Updated Item' } });
  const emailInput = getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'Updated mail for the item' } });
  const contactInput = getByLabelText('Contact');
  fireEvent.change(contactInput, { target: { value: 'Updated Item' } });
  const abnormalityInput = getByLabelText('Abnormality');
  fireEvent.change(abnormalityInput, { target: { value: 'Updated Item' } });
  const saveButton = getByText('Save');
  fireEvent.click(saveButton);
  const updatedItemName = getByText('Updated Item');
  expect(updatedItemName).toBeInTheDocument();
  expect(updatedItemName).toHaveTextContent('Updated Item');
  expect(getByText('Updated description for the item')).toBeInTheDocument();
});
