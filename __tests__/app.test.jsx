import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import Console from '../src/components/Console';
import Messages from '../src/components/Console/messages'

/**
 * 
 * @param {*} state 
 */
const setup = (state = null) => {
  const wrapper = shallow(<Console />);
  if (state) wrapper.setState(state)
  return wrapper;
}

// UNIT TEST

describe('The Console', () => {
  it('should validate the position based on coordinates and board size', () => {
    let wrapper = setup();
    expect(wrapper.instance().validatePosition([0, 0])).toBeTruthy();
    expect(wrapper.instance().validatePosition([10, 0])).toBeFalsy();
  });
});

// INTEGRATION TESTS

describe('The Console', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup({});
    expect(wrapper).toExist();
  });
});

describe('The Robot', () => {

  it('should not initialy be placed on the table', () => {
    const wrapper = setup();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  })

  it('should ignore the move command if hasn\'t been placed on table', () => {

    let wrapper = setup({
      isPlaced: false,
      command:'MOVE',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  });

  it('should ignore the LEFT commands if hasn\'t been placed on table', () => {

    let wrapper = setup({
      isPlaced: false,
      command:'LEFT',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
    
  });

  it('should be positioned on a valid point on the table', () => {
    let wrapper = setup({
      coordinates: [],
      orientation: '',
      isPlaced: false,
      command:'PLACE 0,0,NORTH',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeTruthy();
    expect(wrapper.state('coordinates')).toEqual([0,0]);
    expect(wrapper.state('orientation')).toBe('NORTH');
  });

  it('should throw an error message if placed outside of bounds', () => {
    let wrapper = setup({
      coordinates: [],
      orientation: '',
      isPlaced: false,
      command:'PLACE 10,0,NORTH',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
    expect(wrapper.state('message')).toEqual(Messages.outOfBounds);
  });
  
  it('should ignore commands if moving out of bounds', () => {
    let wrapper = setup({
      isPlaced: true,
      command:'MOVE',
      coordinates: [0, 0],
      orientation: 'WEST',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('coordinates')).toEqual([0, 0]);

  });

  it('should print position when issued a report command', () => {
    let wrapper = setup({
      isPlaced: true,
      command:'REPORT',
      coordinates: [0, 0],
      orientation: 'NORTH',
    });
    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.find('.reports')).toExist();
    // TODO: check against rendered html
    // expect(wrapper.find('.reports').text()).toEqual('[0, 0, NORTH]');
  });

});
