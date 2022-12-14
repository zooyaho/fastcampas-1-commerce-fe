import React from 'react';

import { Box, ContainerProps, Flex } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import CommonFooter from './_fragments/CommonFooter';
import CommonHeader from './_fragments/CommonHeader';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const CommonLayout = ({
  //
  header = <CommonHeader />,
  footer = <CommonFooter />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <Box h="auto" maxW="375px">
      {header}
      <Box as="main" {...containerProps}>
        {content}
      </Box>
      {footer}
    </Box>
  );
};

export default CommonLayout;
