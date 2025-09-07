import React from 'react';
import { render, screen } from '@testing-library/react';
import TestC from '../src/components/TestC';
import userEvent from '@testing-library/user-event'

test('Render Component', () => {
  render(<TestC />);
  const buttonElement = screen.getByRole("button", {
    name: /click me/i
  });
  expect(buttonElement).toBeInTheDocument();
});

test("Click Button to increment counter and Check if the value incremented", async()=>{
    render(<TestC />)
    const clickBtn = screen.getByRole("button", {
      name: /click me/i
    });

    await userEvent.click(clickBtn);

    expect(screen.getByText(1)).toBeInTheDocument();
});
