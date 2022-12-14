import React, { useState } from 'react';
import { Address } from 'react-daum-postcode';
import { Controller, UseFormReturn } from 'react-hook-form';

import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { localOrderListType } from '@apis/order/OrderApi.type';

import FormHelper from '@components/common/FormHelper';

import { LAYOUT } from '@constants/layout';

import OrderProductItem from './_fragments/OrderProductItem';
import SearchAddressModal from './_fragments/SearchAddressModal';
import { FormDataType } from './_hooks/useFormValidate';

import { CardPayIcon } from 'generated/icons/MyIcons';

interface FormPageProps extends BoxProps {
  formData: UseFormReturn<FormDataType>;
  orderList: localOrderListType[] | undefined;
  totalPrice: number | undefined;
}

const OrderPageView = ({
  formData: {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  },
  onSubmit,
  orderList,
  totalPrice,
  ...basisProps
}: FormPageProps) => {
  const [checkedOrderInfo, setCheckedOrderInfo] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: orderIsOpen,
    onOpen: orderOnOpen,
    onClose: orderOnClose,
  } = useDisclosure();

  const sameOrderInfoHandler = () => {
    setCheckedOrderInfo((checked) => !checked);
    const { username, phone, zonecode, address, addressDetail } = getValues();
    if (!checkedOrderInfo) {
      setValue('orderUsername', username);
      setValue('orderPhone', phone);
      setValue('orderZonecode', zonecode);
      setValue('orderAddress', address);
      setValue('orderAddressDetail', addressDetail);
    }
  };

  const searchCompleteHandler = (data: Address, type: string) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    if (type === 'ordererInfo') {
      setValue('address', fullAddress);
      setValue('zonecode', data.zonecode);
    } else if (type === 'shippingInfo') {
      setValue('orderAddress', fullAddress);
      setValue('orderZonecode', data.zonecode);
    }
  };

  return (
    <>
      <Box pt={LAYOUT.HEADER.HEIGHT}>
        <Text as="h2" textStyle="sl_wb" mt="1.6rem" px="1rem">
          ????????????
        </Text>
        <Box>
          <Text as="h3" textStyle="sm_wb" mt="3.75rem" px="1rem">
            ?????? ??????
          </Text>
          <Divider />
          {orderList && (
            <>
              {orderList.map((v) => {
                return (
                  <React.Fragment key={v.productId}>
                    <OrderProductItem productId={v.productId} count={v.count} />
                    <Divider />
                  </React.Fragment>
                );
              })}
            </>
          )}
        </Box>
        {/* s: Form */}
        <Box as="form" onSubmit={onSubmit} {...basisProps}>
          <Container>
            {/* s: ????????? ?????? */}
            <Box mb="3.125rem">
              <Text as="h3" textStyle="sm_wb" mt="3.75rem">
                ????????? ??????
              </Text>
              <FormHelper
                mt="2.5rem"
                mb="3.125rem"
                label="??????"
                errorText={errors.username?.message}
              >
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('username')}
                  autoComplete="off"
                  placeholder="?????????"
                />
              </FormHelper>
              <FormHelper
                mb="3.125rem"
                label="????????? ??????"
                errorText={errors.phone?.message}
              >
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('phone')}
                  autoComplete="off"
                  placeholder="01012341234"
                />
              </FormHelper>
              <FormHelper
                mb="3.125rem"
                label="??????"
                errorText={errors.address?.message}
              >
                <Flex gap=".7rem" mb=".7rem">
                  <Input
                    borderRadius="100px"
                    w="50%"
                    size="md"
                    borderColor="black"
                    {...register('zonecode')}
                    autoComplete="off"
                    placeholder="????????????"
                    onClick={onOpen}
                    disabled={getValues('zonecode') ? true : false}
                  />
                  <Button
                    variant="primaryButton"
                    w="30%"
                    h="40px"
                    borderRadius="5px"
                    onClick={onOpen}
                  >
                    <Text as="span" fontSize="12px">
                      ???????????? ??????
                    </Text>
                  </Button>
                  <SearchAddressModal
                    type="ordererInfo"
                    onClose={onClose}
                    isOpen={isOpen}
                    searchCompleteHandler={searchCompleteHandler}
                  />
                </Flex>
                <Input
                  borderRadius="100px"
                  mb=".7rem"
                  size="md"
                  borderColor="black"
                  {...register('address')}
                  autoComplete="off"
                  placeholder="??????"
                  onClick={onOpen}
                  disabled={getValues('address') ? true : false}
                />
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('addressDetail')}
                  autoComplete="off"
                  placeholder="?????? ??????"
                />
              </FormHelper>
            </Box>
            {/* e: ????????? ?????? */}
            <Divider />
            {/* s: ????????? ?????? */}
            <Box mb="3.125rem">
              <Flex justifyContent="space-between" mt="3.125rem">
                <Text as="h3" textStyle="sm_wb">
                  ????????? ??????
                </Text>
                <Checkbox
                  onChange={sameOrderInfoHandler}
                  colorScheme="primary"
                  size="lg"
                  isChecked={checkedOrderInfo}
                >
                  <Text textStyle="sm_wn_cg600">????????? ????????? ??????</Text>
                </Checkbox>
              </Flex>

              <FormHelper
                mt="2.5rem"
                mb="3.125rem"
                label="??????"
                errorText={errors.orderUsername?.message}
              >
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('orderUsername')}
                  autoComplete="off"
                  placeholder="?????????"
                />
              </FormHelper>
              <FormHelper
                mb="3.125rem"
                label="????????? ??????"
                errorText={errors.orderPhone?.message}
              >
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('orderPhone')}
                  autoComplete="off"
                  placeholder="01012341234"
                />
              </FormHelper>
              <FormHelper
                mb="3.125rem"
                label="??????"
                errorText={errors.orderAddress?.message}
              >
                <Flex gap=".7rem" mb=".7rem">
                  <Input
                    w="50%"
                    borderRadius="100px"
                    size="md"
                    borderColor="black"
                    {...register('orderZonecode')}
                    autoComplete="off"
                    placeholder="????????????"
                    onClick={onOpen}
                    disabled={getValues('orderZonecode') ? true : false}
                  />
                  <Button
                    variant="primaryButton"
                    w="30%"
                    h="40px"
                    borderRadius="5px"
                    onClick={orderOnOpen}
                  >
                    <Text as="span" fontSize="12px">
                      ???????????? ??????
                    </Text>
                  </Button>
                  <SearchAddressModal
                    type="shippingInfo"
                    onClose={orderOnClose}
                    isOpen={orderIsOpen}
                    searchCompleteHandler={searchCompleteHandler}
                  />
                </Flex>
                <Input
                  borderRadius="100px"
                  mb=".7rem"
                  size="md"
                  borderColor="black"
                  {...register('orderAddress')}
                  autoComplete="off"
                  placeholder="??????"
                  onClick={orderOnOpen}
                  disabled={getValues('orderAddress') ? true : false}
                />
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('orderAddressDetail')}
                  autoComplete="off"
                  placeholder="?????? ??????"
                />
              </FormHelper>
              <FormHelper mb="3.125rem" label="??????????????????">
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('orderRequest')}
                  autoComplete="off"
                />
              </FormHelper>
            </Box>
            {/* s: ????????? ?????? */}
            <Divider />
          </Container>

          {/* s: ?????? ?????? */}
          <Text as="h3" textStyle="sm_wb" mt="2.5rem" mb=".7rem" px="1rem">
            ????????????
          </Text>
          <Divider />
          <Flex px="1rem">
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field: { onChange } }) => (
                <FormHelper
                  my="1.8rem"
                  errorText={errors.paymentMethod?.message}
                >
                  <RadioGroup onChange={onChange}>
                    <Radio value="card" colorScheme="primary">
                      <Flex alignItems="center" ml=".7rem" gap=".7rem">
                        <CardPayIcon boxSize="50px" />
                        <Text>???????????? ??????</Text>
                      </Flex>
                    </Radio>
                  </RadioGroup>
                </FormHelper>
              )}
            />
          </Flex>
          <Divider />
          {/* e: ?????? ?????? */}

          {/* s: ?????? ?????? ?????? */}
          <Container>
            <Text as="h3" textStyle="sm_wb" mt="2.5rem" mb=".7rem">
              ?????? ????????????
            </Text>
            <Flex textColor="gray.600" mt="2.5rem">
              <Text>??? ????????????</Text>
              <Spacer />
              <Text>{totalPrice} ???</Text>
            </Flex>
            <Flex textColor="gray.600" mt=".7rem" mb="1.3rem">
              <Text>??? ?????????</Text>
              <Spacer />
              <Text>{totalPrice && totalPrice > 30000 ? 0 : 3000} ???</Text>
            </Flex>
            <Divider />
            <Flex my="1.3rem">
              <Text>????????????</Text>
              <Spacer />
              <Text textStyle="sm_wb_cp">
                {totalPrice && totalPrice > 30000
                  ? totalPrice
                  : totalPrice && 3000 + totalPrice}{' '}
                ???
              </Text>
            </Flex>
            <Divider />
            <Controller
              control={control}
              name="personalConsent"
              render={({ field: { onChange } }) => (
                <FormHelper errorText={errors.personalConsent?.message}>
                  <Checkbox
                    onChange={onChange}
                    colorScheme="primary"
                    size="lg"
                    my="1.25rem"
                  >
                    <Text as="span" textStyle="sm_wn_cg600" ml=".7rem">
                      ???????????? ?????? ?????? ??????(??????)
                    </Text>
                  </Checkbox>
                </FormHelper>
              )}
            />
            {/* Submit Button */}
            <Button
              variant="primaryButton"
              size="lg"
              mt="1.25rem"
              mb="5rem"
              type="submit"
            >
              ????????????
            </Button>
          </Container>
          {/* e: ?????? ?????? ?????? */}
        </Box>
        {/* e: Form */}
      </Box>
    </>
  );
};

export default OrderPageView;
