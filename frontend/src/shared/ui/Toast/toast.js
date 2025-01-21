export const showToast = (toast, status, title) => {
  toast({
    title: title,
    status: status,
    duration: 2000,
    isClosable: true,
    position: "top",
  });
  console.log(title);
};
