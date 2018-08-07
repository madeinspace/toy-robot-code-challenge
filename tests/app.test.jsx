import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Console from '../src/components/Console';

describe('The Console', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Console />)).toExist();
  });
});
