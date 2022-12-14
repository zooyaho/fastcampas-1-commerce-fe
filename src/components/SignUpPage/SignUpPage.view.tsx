/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { MY_IMAGES } from '@image';

import {
  Box,
  BoxProps,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Link,
  Select,
  Spacer,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import FormHelper from '@components/common/FormHelper';

import { LAYOUT } from '@constants/layout';

import { FormDataType } from './_hooks/useSignupValidate';

import {
  CheckLineIcon,
  CircleCheckIcon,
} from 'generated/icons/MyIcons';

interface FormPageProps extends BoxProps {
  formData: UseFormReturn<FormDataType>;
}

const FormPageView = ({
  formData: {
    register,
    control,
    formState: { errors, isValid },
  },
  onSubmit,
  ...basisProps
}: FormPageProps) => {
  const [isAllAgreeFlag, setAllAgreeFlag] = useBoolean();
  const [isServiceAgreeFlag, setServiceAgreeFlag] = useBoolean();
  const [isPersonalInfoAgreeFlag, setPersonalInfoAgreeFlag] = useBoolean();
  const [isMarketingAgreeFlag, setMarketingAgreeFlag] = useBoolean();

  useEffect(() => {
    setServiceAgreeFlag.off();
    setPersonalInfoAgreeFlag.off();
    setMarketingAgreeFlag.off();
    if (isAllAgreeFlag) {
      setServiceAgreeFlag.on();
      setPersonalInfoAgreeFlag.on();
      setMarketingAgreeFlag.on();
    } else {
      setServiceAgreeFlag.off();
      setPersonalInfoAgreeFlag.off();
      setMarketingAgreeFlag.off();
    }
  }, [
    isAllAgreeFlag,
    setServiceAgreeFlag,
    setPersonalInfoAgreeFlag,
    setMarketingAgreeFlag,
  ]);

  return (
    <>
      <Box
        as="header"
        height={LAYOUT.HEADER.HEIGHT}
        position="absolute"
        top="0"
        right="0"
        left="0"
      >
        <Flex alignItems="center" h="inherit" ml="1rem">
          <Image
            src={MY_IMAGES.IMAGES.LOGO.src}
            alt={MY_IMAGES.IMAGES.LOGO.alt}
          />
        </Flex>
      </Box>
      <Container as="main" mt={LAYOUT.HEADER.HEIGHT}>
        <Text as="h2" textStyle="sxl_wb" mt="1.6rem">
          ????????????
        </Text>
        {/* s: Form */}
        <Box as="form" onSubmit={onSubmit} {...basisProps}>
          {/* ?????????????????? */}
          <Box mb="5rem">
            <Text as="h3" textStyle="sm_wb" my="3.75rem">
              ??????????????????
            </Text>
            <FormHelper
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
              label="?????????"
              errorText={errors.nickname?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('nickname')}
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
                placeholder="01012345678"
              />
            </FormHelper>
            <FormHelper
              mb="3.125rem"
              label="????????? ??????"
              errorText={errors.email?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('email')}
                autoComplete="off"
                placeholder="gildong123@gmail.com"
              />
            </FormHelper>
          </Box>

          {/* ?????????????????? */}
          <Box mb="5rem">
            <Text as="h3" textStyle="sm_wb" mb="2.5rem">
              ??????????????????
            </Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange } }) => {
                return (
                  <FormHelper
                    mb="40px"
                    label="??????"
                    outline="none"
                    errorText={errors.gender?.message}
                  >
                    <Select
                      variant="flushed"
                      iconColor="black"
                      iconSize="3rem"
                      focusBorderColor="primary.500"
                      onChange={onChange}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        ????????? ???????????????
                      </option>
                      <option value="male">??????</option>
                      <option value="female">??????</option>
                    </Select>
                  </FormHelper>
                );
              }}
            />
            <Controller
              control={control}
              name="age"
              render={({ field: { onChange } }) => (
                <FormHelper
                  mb="40px"
                  border="none"
                  label="?????????"
                  errorText={errors.age?.message}
                >
                  <Select
                    variant="flushed"
                    iconColor="black"
                    iconSize="3rem"
                    focusBorderColor="primary.500"
                    onChange={onChange}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      ???????????? ???????????????
                    </option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50??? ??????</option>
                  </Select>
                </FormHelper>
              )}
            />
          </Box>

          {/* s: ?????????????????? */}
          <Box mb="5rem" textStyle="ss_wn_cg600">
            <Text as="h3" textStyle="sm_wb" mb="2.5rem">
              ??????????????????
            </Text>

            {/* ?????? ?????? ?????? */}
            <Flex
              alignItems="center"
              borderBottom="2px solid"
              borderBottomColor="primary.500"
              pb=".5rem"
            >
              <Text as="p" textStyle="sm_wb_cp">
                ?????? ????????? ?????? ???????????????.
              </Text>
              <Spacer />
              <Button
                variant="transparentButton"
                rightIcon={
                  <CircleCheckIcon
                    boxSize="24px"
                    color={isAllAgreeFlag ? 'primary.500' : 'gray.400'}
                  />
                }
                onClick={setAllAgreeFlag.toggle}
              />
            </Flex>

            <Flex alignItems="center" mt="37px" mb="1rem">
              <Link
                textDecoration="underline"
                _hover={{ textDecoration: 'underline' }}
                href="https://toktokhan.notion.site/6e7a309e8d14464cad38fc86656d564a"
                isExternal
              >
                ????????? ????????? ?????? ???????????? ??????
              </Link>
              <Spacer />
              <Button
                variant="transparentButton"
                rightIcon={
                  <CheckLineIcon
                    boxSize="24px"
                    color={isServiceAgreeFlag ? 'primary.500' : 'gray.400'}
                  />
                }
                onClick={setServiceAgreeFlag.toggle}
              />
            </Flex>
            <Flex alignItems="center" my="1rem">
              <Link
                textDecoration="underline"
                _hover={{ textDecoration: 'underline' }}
                href="https://toktokhan.notion.site/3-2261ee2f25024c0a9b6a82a6f43fd0dc"
                isExternal
              >
                ?????????????????? ??? ??????, ???3??? ?????? ??????
              </Link>
              <Spacer />
              <Button
                variant="transparentButton"
                rightIcon={
                  <CheckLineIcon
                    boxSize="24px"
                    color={isPersonalInfoAgreeFlag ? 'primary.500' : 'gray.400'}
                  />
                }
                onClick={setPersonalInfoAgreeFlag.toggle}
              />
            </Flex>
            <Flex alignItems="center" my="1rem">
              <Link
                textDecoration="underline"
                _hover={{ textDecoration: 'underline' }}
                href="https://toktokhan.notion.site/24f69842ebec48df89a3656bac7cf4c9"
                isExternal
              >
                ????????? ?????? ?????? ??? ????????? ?????? ??????(??????)
              </Link>
              <Spacer />
              <Button
                variant="transparentButton"
                rightIcon={
                  <CheckLineIcon
                    boxSize="24px"
                    color={isMarketingAgreeFlag ? 'primary.500' : 'gray.400'}
                  />
                }
                onClick={setMarketingAgreeFlag.toggle}
              />
            </Flex>
          </Box>
          {/* e: ?????????????????? */}

          {/* Submit Button */}
          <Button
            size="lg"
            mb="3.125rem"
            type="submit"
            disabled={
              isValid &&
                ((isServiceAgreeFlag &&
                  isPersonalInfoAgreeFlag &&
                  isMarketingAgreeFlag) ||
                  isAllAgreeFlag)
                ? false
                : true
            }
            variant="primaryButton"
          >
            ???????????? ??????
          </Button>
        </Box>
        {/* e: Form */}
      </Container>
    </>
  );
};

export default FormPageView;
