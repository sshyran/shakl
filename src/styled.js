import React from 'react';

import evaluate from './evaluate';
import flatten from './flatten';

const styled = (Component, { displayName /* withAttrs = {} */ } = {}) => {
  const styledFactory = (...styles) => {
    const Styled = React.forwardRef((props, ref) => {
      // const attrs = evaluate(withAttrs, props);

      return React.createElement(Component, {
        ...props,
        ref,
        // ...attrs,
        style: flatten([
          styles.map(style => evaluate(style, props)),
          // attrs.style,
          props.style // eslint-disable-line react/destructuring-assignment
        ])
      });
    });

    Styled.displayName =
      displayName || `styled(${Component.displayName || Component.name})`;

    Styled.extend = (...extendedStyles) => {
      const extendedFactory = styled(Component, { displayName })(
        ...styles,
        ...extendedStyles
      );

      // extendedFactory.attrs = props => styled(Styled, { displayName }, { withAttrs: props });
      // extendedFactory.withChild = () => {};

      return extendedFactory;
    };

    return Styled;
  };

  // styledFactory.attrs = props => styled(Component, { displayName }, { withAttrs: props });
  // styledFactory.withChild = () => {};

  return styledFactory;
};

export default styled;