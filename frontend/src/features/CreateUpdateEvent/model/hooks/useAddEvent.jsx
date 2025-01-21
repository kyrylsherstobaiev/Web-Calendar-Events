import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { addEvent } from "../../../../shared/api/api_events/CRUID operations/api.js";
import { showToast } from "../../../../shared/ui/Toast/toast.js";

const EVENT_QUERY_KEY = ["events"];

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createEvent = useMutation({
    mutationKey: ["addEvent"],
    mutationFn: addEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: EVENT_QUERY_KEY });
      const prevEvents = queryClient.getQueryData(EVENT_QUERY_KEY);

      queryClient.setQueryData(EVENT_QUERY_KEY, (old) => {
        return [...old, newEvent];
      });
      return { prevEvents };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(EVENT_QUERY_KEY, context.prevEvents);
      showToast(toast, "error", "Event weren't added");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
      showToast(toast, "success", "Event was created!");
    },
  });

  return { createEvent };
};
