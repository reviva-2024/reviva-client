import React from 'react';
import PropTypes from 'prop-types';

const textStyles = {
  h1: {
    fontFamily: 'Raleway',
    fontStyle: 'bold',
    fontSize: '72px',
    lineHeight: '120%',
  },
  h2: {
    fontFamily: 'Raleway',
    fontStyle: 'bold',
    fontSize: '64px',
    lineHeight: '120%',
  },
  h3: {
    fontFamily: 'Raleway',
    fontStyle: 'bold',
    fontSize: '48px',
    lineHeight: '140%',
  },
  h4: {
    fontFamily: 'Raleway',
    fontStyle: 'bold',
    fontSize: '32px',
    lineHeight: '140%',
  },
  h5: {
    fontFamily: 'Raleway',
    fontStyle: 'medium',
    fontSize: '32px',
    lineHeight: '140%',
  },
  bodyBold: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: '12px',
    lineHeight: '150%',
  },
  bodyMedium: {
    fontFamily: 'Lato',
    fontStyle: 'medium',
    fontSize: '12px',
    lineHeight: '150%',
  },
  bodyRegular: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '150%',
  },
  paragraphBold: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: '14px',
    lineHeight: '150%',
  },
  paragraphMedium: {
    fontFamily: 'Lato',
    fontStyle: 'medium',
    fontSize: '14px',
    lineHeight: '150%',
  },
  paragraphRegular: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '150%',
  },
  paragraphLight: {
    fontFamily: 'Lato',
    fontStyle: 'light',
    fontSize: '14px',
    lineHeight: '150%',
  },
  subtitleBold: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: '24px',
    lineHeight: '100%',
  },
  subtitleMedium: {
    fontFamily: 'Lato',
    fontStyle: 'medium',
    fontSize: '24px',
    lineHeight: '150%',
  },
  smallTextBold: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: '11px',
    lineHeight: '150%',
  },
};

export const Text = ({ variant, children, className }) => {
  const style = textStyles[variant] || {};
  const classNames = className ? `${className}` : '';

  return (
    <span className={classNames} style={style}>
      {children}
    </span>
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'bodyBold',
    'bodyMedium',
    'bodyRegular',
    'subtitleBold',
    'subtitleMedium',
    'smallTextBold',
    'paragraphLight',
    'paragraphBold',
    'paragraphMedium',
    'paragraphRegular',
  ]),
  children: PropTypes.node.isRequired,
};

