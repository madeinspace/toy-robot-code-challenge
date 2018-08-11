import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import {
  Form,
} from 'reactstrap';
import Console from '../src/components/Console';
import Messages from '../src/components/Console/messages';

const setup = (state = null) => {
  const wrapper = shallow(<Console />);
  if (state) wrapper.setState(state);
  return wrapper;
};

// INTEGRATION TESTS

describe('The Console', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup({});
    expect(wrapper).toExist();
  });
  
  it('should print position when issued a report command', () => {
    const wrapper = setup({
      isPlaced: true,
      command: 'REPORT',
      coordinates: [0, 0],
      orientation: 'NORTH',
    });
    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.find('.reports')).toExist();
    expect(wrapper.find('.reports').render().text()).toEqual('0, 0, NORTH');
  });

  // UNIT TEST
  it('should validate the position based on coordinates and board size', () => {
    const wrapper = setup();
    expect(wrapper.instance().validatePosition([0, 0])).toBeTruthy();
    expect(wrapper.instance().validatePosition([10, 0])).toBeFalsy();
  });
});

describe('The Robot', () => {
  it('should not initialy be placed on the table', () => {
    const wrapper = setup();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  });

  it('should ignore the move command if hasn\'t been placed on table', () => {
    const wrapper = setup({
      isPlaced: false,
      command: 'MOVE',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  });

  it('should ignore the turn commands if hasn\'t been placed on table', () => {
    const wrapper = setup({
      isPlaced: false,
      command: 'LEFT',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  });

  it('should be positioned on a valid point on the table', () => {
    const wrapper = setup({
      coordinates: [],
      orientation: '',
      isPlaced: false,
      command: 'PLACE 0,0,NORTH',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeTruthy();
    expect(wrapper.state('coordinates')).toEqual([0, 0]);
    expect(wrapper.state('orientation')).toBe('NORTH');
  });

  it('should throw an error message if placed outside of bounds', () => {
    const wrapper = setup({
      coordinates: [],
      orientation: '',
      isPlaced: false,
      command: 'PLACE 10,0,NORTH',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('isPlaced')).toBeFalsy();
    expect(wrapper.state('message')).toEqual(Messages.outOfBounds);
    expect(wrapper.find('.reports').render().text()).toEqual(Messages.outOfBounds);
  });
  
  it('should ignore commands if moving out of bounds', () => {
    const wrapper = setup({
      isPlaced: true,
      command: 'MOVE',
      coordinates: [0, 0],
      orientation: 'WEST',
    });

    wrapper.instance().handleCommand();
    wrapper.update();
    expect(wrapper.state('coordinates')).toEqual([0, 0]);
  });

  it('Should call the handleCommand when clicking on the go button', () => {
    // const onSubmit = sinon.spy();
    // const wrapper = mount(
    //     <Form onSubmit={this.handleSubmit} />,
    // );
    // const button = wrapper.find('.subCom');
    // button.simulate('submit');
  });
});
