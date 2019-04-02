import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import MessageViewer from '../MessageViewer'
import { EmailContext } from '../EmailContext'

const email = {
    subject: 'Black Friday!',
    body: 'So many sales!'
};

describe('testing the Message Viewer Component', () => {
  test('should render the view email Component', () => {
    const { container } = render(
        <EmailContext.Provider value={{
            currentEmail: email
        }}>
            <MessageViewer />
        </EmailContext.Provider>
    )
    expect(container.querySelector('h2').textContent).toEqual(email.subject)
    expect(container.querySelector('h2 + p').textContent).toEqual(email.body)
  })
  test('the back button should back to the mesageList', () => {
    const mockCallback = jest.fn();
    const { container } = render(
        <EmailContext.Provider value={{
            currentEmail: email,
            onSelectEmail: mockCallback
        }}>
            <MessageViewer />
        </EmailContext.Provider>
    )
    fireEvent.click(container.querySelector('button'))
    expect(mockCallback).toBeCalledWith(null)
  })


})
