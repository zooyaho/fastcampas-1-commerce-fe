import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import {
  Box,
  BoxProps,
  Button,
  ChakraProps,
  Container,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

import FormHelper from '@components/common/FormHelper';

import { LAYOUT } from '@constants/layout';

import WithdrawDoneModal from './_fragments/WithdrawDoneModal';
import { FormDataType } from './_hooks/useFormValidate';
import { WITHDRAWAL_REASON } from './withdrawPage.data';

interface WithdrawPageViewProps extends ChakraProps, BoxProps {
  formData: UseFormReturn<FormDataType>;
  isOpen: boolean;
  onClose: () => void;
}

function WithdrawPageView({
  formData: {
    register,
    control,
    formState: { errors },
  },
  onSubmit,
  isOpen,
  onClose,
  ...basisProps
}: WithdrawPageViewProps) {
  const { REJOIN, LOW_PURCHASE_FREQ, DISSATISFACTION, USE_OTHER_BRANDS, ETC } =
    WITHDRAWAL_REASON;

  return (
    <Box pt={LAYOUT.HEADER.HEIGHT}>
      <Text as="h2" textStyle="sl_wb" mt="1.6rem" px="1rem">
        회원 탈퇴
      </Text>
      <Text p="1.1rem 1rem" bg="gray.100" mt="5rem">
        회원 탈퇴 시 개인 정보 및 인코스런에서 만들어진 모든 데이터는
        삭제됩니다. 한 번 삭제된 정보는 복구가 불가능합니다.
      </Text>
      <Container borderBottom="solid 10px #F9F9F9">
        <Text as="h3" py=".8rem" textStyle="sm_wb">
          회원 정보
        </Text>
        <Divider />
        <Flex flexDirection="column" gap=".7rem" my="1rem">
          <Flex>
            <Text minW="30%">이름</Text>
            <Text textColor="gray.700">박지우</Text>
          </Flex>
          <Flex>
            <Text minW="30%">핸드폰 번호</Text>
            <Text textColor="gray.700">010-1234-1234</Text>
          </Flex>
          <Flex>
            <Text minW="30%">이메일 주소</Text>
            <Text textColor="gray.700">incourse.run@gmail.com</Text>
          </Flex>
        </Flex>
      </Container>
      <Box as="form" onSubmit={onSubmit} {...basisProps}>
        <Container borderBottom="solid 10px #F9F9F9">
          <Text as="h3" py=".8rem" textStyle="sm_wb">
            탈퇴 사유
          </Text>
          <Divider />
          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormHelper
                    mt="1rem"
                    mb="1rem"
                    errorText={errors.reason?.message}
                  >
                    <RadioGroup onChange={onChange} value={value}>
                      <Stack direction="column" spacing=".7rem">
                        <Radio value={REJOIN} colorScheme="primary">
                          아이디 변경(재가입)
                        </Radio>
                        <Radio value={LOW_PURCHASE_FREQ} colorScheme="primary">
                          낮은 구매 빈도
                        </Radio>
                        <Radio value={DISSATISFACTION} colorScheme="primary">
                          서비스 및 고객지원 불만족
                        </Radio>
                        <Radio value={USE_OTHER_BRANDS} colorScheme="primary">
                          타 브랜드 이용
                        </Radio>
                        <Radio value={ETC} colorScheme="primary">
                          기타
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormHelper>
                  {(value as unknown as string) === ETC && (
                    <Input
                      borderRadius="100px"
                      size="md"
                      borderColor="black"
                      mb="1rem"
                      {...register('additionalReason')}
                      autoComplete="off"
                      placeholder="사유를 입력해주세요."
                    />
                  )}
                </>
              );
            }}
          />
        </Container>
        <Container>
          <Text as="h3" py=".8rem" textStyle="sm_wb">
            인코스런을 입력해주세요
          </Text>
          <FormHelper errorText={errors.requireText?.message}>
            <Input
              borderRadius="100px"
              size="md"
              borderColor="black"
              {...register('requireText')}
              autoComplete="off"
              placeholder="인코스런"
            />
          </FormHelper>
        </Container>
        {/* Button */}
        <Flex mt="5rem" pb="2rem" mx="1rem" gap=".7rem">
          <Button
            type="button"
            fontSize="md"
            flexGrow="1"
            variant="whiteButton"
          >
            취소
          </Button>
          <Button type="submit" variant="primaryButton" flexGrow="1">
            탈퇴하기
          </Button>
          <WithdrawDoneModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>
    </Box>
  );
}

export default WithdrawPageView;
