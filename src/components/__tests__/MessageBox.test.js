import MessageBox from '../MessageBox'
import renderer from 'react-test-renderer'

it('renders one message', () => {
  const messages = [
    { message: 'hi there', priority: 1}
  ]

  const component = renderer.create(
    <MessageBox messages={messages} ></MessageBox>
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})


it('renders multiple messages', () => {
  const messages = [
    { message: 'hi there', priority: 1 },
    { message: 'hi new message', priority: 1 }
  ]

  const component = renderer.create(
    <MessageBox messages={messages} ></MessageBox>
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
