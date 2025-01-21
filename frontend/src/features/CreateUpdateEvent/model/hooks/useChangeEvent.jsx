import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../../../../shared/api/api_events/CRUID operations/api.js";
import moment from "moment";
import { showToast } from "../../../../shared/ui/Toast/toast.js";
import { useToast } from "@chakra-ui/react";

const EVENT_QUERY_KEY = ["events"];

export const useChangeEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const changeEvent = useMutation({
    mutationKey: ["updateEvent"],
    mutationFn: updateEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: EVENT_QUERY_KEY });
      const prevEvents = queryClient.getQueryData(EVENT_QUERY_KEY);

      queryClient.setQueryData(EVENT_QUERY_KEY, (old) => {
        return old.map((event) => {
          if (event.id === newEvent.id) {
            return {
              ...event,
              ...newEvent,
              dateEvent: moment(newEvent.dateEvent).clone().format(),
            };
          }
          return event;
        });
      });
      return { prevEvents };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(EVENT_QUERY_KEY, context.prevEvents);
      showToast(toast, "error", "Event weren't updated");
    },
    onSuccess: () => {
      // noinspection JSIgnoredPromiseFromCall
      queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
      showToast(toast, "success", "Event was updated!");
    },
  });

  return { changeEvent };
};
