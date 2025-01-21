// noinspection JSValidateTypes

import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { yupSchemeCreateEvent } from "../model/yup/yupSchemeCreateEvent.js";
import { useAddEvent } from "../model/hooks/useAddEvent.jsx";
import { useChangeEvent } from "../model/hooks/useChangeEvent.jsx";
import { useRemoveEvent } from "../model/hooks/useRemoveEvent.jsx";
import { Input } from "../../../shared/ui/Input/index.js";
import { Select } from "../../../shared/ui/Select/index.js";
import { Button } from "../../../shared/ui/Button/index.js";

export const CreateUpdateEvent = ({
  isOpen,
  onClose,
  titleValue = null,
  dateValue = null,
  startTimeEventValue = null,
  endTimeEventValue = null,
  id = null,
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { createEvent } = useAddEvent();
  const { changeEvent } = useChangeEvent();
  const { removeEvent } = useRemoveEvent();

  const { user } = useSelector((state) => state.isSignedInUser);

  const options = new Array(24).fill(null).map((_, i) => i);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(yupSchemeCreateEvent),
  });

  const onSubmit = async (newEvent, e) => {
    try {
      e.preventDefault();

      const event = {
        ...newEvent,
        uid: user.uid,
        ...(titleValue && { id: id }),
      };

      if (!titleValue) {
        createEvent.mutate(event);
      } else {
        changeEvent.mutate(event);
      }

      reset();
      onClose();
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  // console.log(errors);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              {!titleValue ? "Create" : "Update"} your event
            </ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody pb={6}>
              <Input
                register={register}
                name="title"
                error={errors.title?.message}
                label="New event"
                placeholder="write event title"
                defaultValue={titleValue}
              />
              <Input
                register={register}
                name="dateEvent"
                error={errors.dateEvent?.message}
                label="Select date"
                type="date"
                defaultValue={dateValue}
              />
              <Flex gap={1}>
                <Controller
                  control={control}
                  name="startTimeEvent"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Select
                      title="-- Start event time --"
                      onSelected={onChange}
                      error={error?.message}
                      defaultValue={startTimeEventValue}
                      options={options}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="endTimeEvent"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Select
                      title="-- End event time --"
                      onSelected={onChange}
                      error={error?.message}
                      defaultValue={endTimeEventValue}
                      options={options}
                    />
                  )}
                />
              </Flex>
            </ModalBody>
            <ModalFooter gap={0.5}>
              <Button type="submit" className="btn-save">
                Save
              </Button>
              <Button
                handleClick={() => {
                  onClose();
                  reset();
                }}
                type="button"
                className="btn-cancel"
              >
                Cancel
              </Button>

              {titleValue ? (
                <Button
                  onClick={() => {
                    removeEvent.mutate(id);
                    reset();
                    onClose();
                  }}
                  className="btn-delete"
                >
                  Delete
                </Button>
              ) : null}
            </ModalFooter>
          </ModalContent>
        </Container>
      </Modal>
    </>
  );
};
