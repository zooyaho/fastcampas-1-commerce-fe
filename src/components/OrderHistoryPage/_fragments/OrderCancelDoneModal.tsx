import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface OrderCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OrderCancelDoneModal({ isOpen, onClose }: OrderCancelModalProps) {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      blockScrollOnMount
    >
      <ModalOverlay />
      <ModalContent maxW="343px" h="300px">
        <ModalBody>
          <Center h="100%" mt="1rem">
            <Text textStyle="sm_wb">주문취소가 완료되었습니다.</Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Center w="100%">
            <Button
              type="button"
              w="50%"
              variant="primaryButton"
              onClick={onClose}
            >
              확인
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderCancelDoneModal;
