import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { UserProvider, UserConsumer } from '../UserContext'
import { FAKE_USER } from '../api'

describe('test whether the user context is working properly', () => {
  test('user consumemr should render the default value of undefined', () => {
    let actualValue = 'replace me'

    render(
        <UserConsumer>
            {value => (actualValue = value)}
        </UserConsumer>
    )
    expect(actualValue).toBe(undefined)
  })

  test('should render the initial user of FAKEUSER', () => {
    const { container } = render(
        <UserProvider>
            <UserConsumer>
                {({ user }) => <div>{user.username}</div>}
            </UserConsumer>
        </UserProvider>
    )
    expect(container.textContent).toEqual(FAKE_USER.username)
  })

  test('should log a user in', () => {
    const { container } = render(
        <UserProvider>
            <UserConsumer>
                {({ user, onLogin }) => (
                    <div>
                        <span>{user.username}</span>
                        <button onClick={() => onLogin({ username: 'dave' })} />
                    </div>
                )}
            </UserConsumer>
        </UserProvider>
    )
    fireEvent.click(container.querySelector('button'))
    expect(container.querySelector('span').textContent).toEqual('dave')
  })

  test('should log a user out', () => {
    const { container } = render(
        <UserProvider>
            <UserConsumer>
                {({ user, onLogout }) => (
                    <div>
                        <span>{(user === null).toString()}</span>
                        <button onClick={() => onLogout()} />
                    </div>
                )}
            </UserConsumer>
        </UserProvider>
    )
    fireEvent.click(container.querySelector('button'))
    expect(container.querySelector('span').textContent).toEqual('true')
  })


})
