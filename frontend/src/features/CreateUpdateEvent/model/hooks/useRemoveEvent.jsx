import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../../../../shared/api/api_events/CRUID operations/api.js";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../../../shared/ui/Toast/toast.js";

const EVENT_QUERY_KEY = ["events"];

export const useRemoveEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const removeEvent = useMutation({
    mutationKey: ["removeEvent"],
    mutationFn: deleteEvent,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: EVENT_QUERY_KEY });
      const prevEvents = queryClient.getQueryData(EVENT_QUERY_KEY);

      queryClient.setQueryData(EVENT_QUERY_KEY, (old) =>
        old.filter((event) => event.id !== id),
      );
      return { prevEvents };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(EVENT_QUERY_KEY, context.prevEvents);
      showToast(toast, "error", "Event wasn't removed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EVENT_QUERY_KEY,
      });
      showToast(toast, "info", "Event was removed");
    },
  });

  return { removeEvent };
};
