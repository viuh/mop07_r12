import React from 'react'
import { mount } from 'enzyme'
import LoginForm from './LoginForm'
import Wrapper from './Wrapper'
import Togglable from './Togglable'
import Blog from './Blog'

import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })


describe.only('LoginForm initial state', () => {

/*it('content starts off hidden', ()=> {
  const blog1 = {
    author: 'Ani Anybody',
    title: 'Blog Blog Title',
    likes: 5
  }

  const blogCompo = mount(
    <Togglable buttonLabel="login">
    <Blog blog={blog1}/>
    </Togglable>
  )
  //console.log(blogCompo.debug())
})*/


it('renders content', () => {
  const onSubmit = jest.fn()
  const onChange = jest.fn()

  const wrapper = mount(
    <Wrapper onSubmit={onSubmit} handleSubmit={onSubmit} handleChange={jest.fn()} onChange={onChange}/>
  )
  //console.log('koko:', wrapper.debug())

  const button = wrapper.find('button')  //login button
  button.simulate('submit')    // after which login fields should appear.

  //console.log('But', wrapper.debug())
 
  const inputit3= wrapper.find('input').first()

  //console.log('3:',inputit3) 
  inputit3.simulate('change', { target: { value: 'strange' } })
  button.simulate('submit')

  //username has changed and submit has been clicked
  expect(wrapper.state().username).toBe('strange')
  console.log('wrapper?', wrapper.state())  
  expect(wrapper.state().handleChange).toBe(1) 
  expect(wrapper.state().handleSubmit).toBe(1) 
  
})
})