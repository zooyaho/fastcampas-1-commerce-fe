import { Flex, IconButton, Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import MenuIcon from '@components/common/@Icons/System/Menu';

import { LAYOUT } from '@constants/layout';

import { HOME_HEADER_VARIANTS, CommonHeaderVariantType } from './CommonHeader.data';
import CommonHeaderDrawer from './_fragments/CommonHeaderDrawer';

interface CommonHeaderProps {
  variant?: CommonHeaderVariantType;
}

const CommonHeader = ({ variant = 'light' }: CommonHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cssByVariant = HOME_HEADER_VARIANTS[variant];

  return (
    <>
      <Flex //
        as="header"
        px={{ base: '16px', md: '80px' }}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        h={LAYOUT.HEADER.HEIGHT}
        {...cssByVariant.header}
      >
        <Image //
          src="/images/header/logo.png"
          w="74px"
          h="42px"
          cursor="pointer"
        />
        <Image src="/images/header/menu.png" w="24px" h="24px" />
        <IconButton //
          color={cssByVariant.pointColor}
          icon={<MenuIcon w="24px" h="24px" />}
          onClick={onOpen}
          cursor="pointer"
          bg="transparent"
          aria-label="btn-toggle-drawer"
        />
      </Flex>
      <CommonHeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        bodyProps={cssByVariant.drawer}
      />
    </>
  );
};

export default CommonHeader;
