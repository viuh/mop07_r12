import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })

const fu = () => {
  console.log('in a fu')
}


describe.only('<Blog />', () => {

it('after clicking name the details are displayed', () => {

  const blog = {
    title: "testaanpa testailen 1",
    author: "N. Nobody",
    likes: 2
  }

  const mockHandler = jest.fn()

  // haetaan klikattava osa komponentista
  const blogComponent =  shallow(<Blog blog={blog} onClick={mockHandler} />)

  
  //console.log('Test:', blogComponent.debug())

  const nameDiv = blogComponent.find('.blogheader')
  expect(nameDiv.text()).toContain(blog.title)
  expect(nameDiv.text()).toContain(blog.author)


  nameDiv.simulate('click')
  // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
  const contentDiv = blogComponent.find('.visible') 
  //console.log('222', contentDiv.debug())
  expect(contentDiv.text()).toContain(blog.likes)

  const likeDiv = blogComponent.find('.likebutton') 
  expect(likeDiv.text()).toContain('like')
  

}
)
})

