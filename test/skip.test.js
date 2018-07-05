import React from 'react';

import { Animated, View } from 'react-native';

import { create as r } from 'react-test-renderer';

import s from '../src';

// investigate whether this should be supported
it.skip('creates a styled component of a functional component', () => {
  const Foo = () => <View />;
  const Bar = s(Foo)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// investigate whether this should be supported
it.skip('creates a styled component of a class component', () => {
  // eslint-disable-next-line react/prefer-stateless-function
  class Foo extends React.Component {
    render() {
      return <View />;
    }
  }
  const Bar = s(Foo)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// faulty
it.skip('applies animated styles to animated components', () => {
  const opacity = new Animated.Value(0);
  const Foo = s(Animated.View)({ opacity });
  const foo = r(<Foo />).toJSON();
  expect(opacity).toBe(0);
  expect(foo.props.style).toEqual({ opacity: 0 });
  Animated.timing(opacity, { toValue: 1, duration: 250 }).start();
  // TODO: figure out jest timers
  jest.useFakeTimers();
  setTimeout(() => expect(foo.props.style).toEqual({ opacity: 1 }), 250);
  jest.runAllTimers();
  expect(opacity).toBe(1);
  expect(foo.props.style).toEqual({ opacity: 1 });
  expect(foo).toMatchSnapshot();
});

// faulty, may require lib edits
it.skip('should throw when called with an invalid element', () => {
  const Foo = () => <View />;
  // eslint-disable-next-line react/prefer-stateless-function, react/no-multi-comp
  class Bar extends React.Component {
    render() {
      return <View />;
    }
  }
  const els = [undefined, null, 123, [], <Foo />, <Bar />];
  els.forEach(el => expect(() => s(el)()).toThrow());
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// requires some lib edits, it's better to have clean props
it.skip("shouldn't append style prop if empty", () => {
  const Foo = s.View();
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).not.toBeDefined();
  expect(foo).toMatchSnapshot();
});

// TODO
it.skip('should keep prop types from parent', () => {});
it.skip('should keep default props from parent', () => {});
it.skip('should keep custom static member from parent', () => {});
