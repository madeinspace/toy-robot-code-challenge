import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Console from '../src/components/Console';

describe('The Console', () => {
  it('should render without throwing an error', () => {
    const wrapper = shallow(<Console />);
    expect(wrapper).toExist();
  });
});

describe('The Robot', () => {

  it('should ignore commands if hasn\'t been placed on table', () => {
    // do we test the regex?
  });

  it('should position itself on a valid point on the table', () => {
    // Unit test for validateMove?
  });
  
  it('should move one unit when issued with move command', () => {
    // check for coord changes?  
  });

  it('should ignore commands if moving out of bounds', () => {
    // same as above might be redundant
  });
  
  it('should turn left when issued with left command', () => {
    // test for state change? if north then west?
  });

  it('should turn right when issued with right command', () => {
    // test for state change? if north then east?
  });

  it('should print position when issued a report command', () => {
    // snapshot?
  });

});
