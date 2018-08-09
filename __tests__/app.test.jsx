import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import Regex from '../src/components/Console/regex';
import Console from '../src/components/Console';

/**
 * 
 * @param {*} state 
 */
const setup = (state = null) => {
  const wrapper = shallow(<Console />);
  if (state) wrapper.setState(state)
  return wrapper;
}

describe('The Console', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toExist();
  });
});

describe('The Robot', () => {

  it('should not initialy be placed on the table', () => {
    const wrapper = setup();
    expect(wrapper.state('isPlaced')).toBeFalsy();
  })

  it('should ignore move, left and right commands if hasn\'t been placed on table', () => {
    // do we test the regex?
    throw new Error();
  });

  it('should position itself on a valid point on the table', () => {
    // Unit test for validateMove?
    throw new Error();
  });
  
  it('should move one unit when issued with move command', () => {
    // check for coord changes?  
    throw new Error();
  });

  it('should ignore commands if moving out of bounds', () => {
    // same as above might be redundant
    throw new Error();
  });
  
  it('should turn left when issued with left command', () => {
    // test for state change? if north then west?
    throw new Error();
  });

  it('should turn right when issued with right command', () => {
    // test for state change? if north then east?
    throw new Error();
  });

  it('should print position when issued a report command', () => {
    // snapshot?
    throw new Error();
  });

});
