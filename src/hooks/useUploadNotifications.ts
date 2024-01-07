import { useToast } from "@/components/use-toast";
import { useScopedI18n } from "@/locales/client";
import {
  parseJwt,
  SessionTokenData,
  getTokenFromCookie,
} from "@/services/auth";

import { useChannel } from "ably/react";
import { useCallback, useEffect, useState } from "react";

const useUploadNotifications = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const userId = parseJwt<SessionTokenData>(getTokenFromCookie()!)?.sub;
  const t = useScopedI18n(`upload`);
  const [status, setStatus] = useState<undefined | string>();

  const { channel } = useChannel(
    {
      channelName: `${userId}:upload-status`,
      skip: !userId,
    },
    (message) => {
      console.log(message);
      setStatus(message.data.toString());
      switch (message.data.toString()) {
        case `Success`:
          toast({
            title: t(`success`),
          });
          onSuccess();
          break;
        case `Failure`:
          toast({
            title: t(`error`),
          });
          break;
        case `Processing`:
          console.log(`Processing`);
          break;
        default:
          break;
      }
    }
  );

  const setInitialState = useCallback(async () => {
    const history = await channel.history();
    const first = history.items[0];
    setStatus(first?.data.toString());
  }, [channel]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  return { ...channel, status };
};

export default useUploadNotifications;
