import {SyncConnectCallCompositeProps} from "../../../../core/models/call-composite.model";
import React, {useCallback} from "react";
import {
  CallAdapter,
  CallAdapterLocator,
  CallComposite,
  useAzureCommunicationCallAdapter
} from "@azure/communication-react";
import {AzureCommunicationTokenCredential} from "@azure/communication-common";
import {initializeIcons, registerIcons} from "@fluentui/react";

initializeIcons();
registerIcons({icons: {}})

export const SyncConnectCallComposite: React.FC<SyncConnectCallCompositeProps> = (props: SyncConnectCallCompositeProps) => {

  const userId = props.config.userId;
  const displayName = props.config.displayName;
  const credential = new AzureCommunicationTokenCredential(props.config.token);
  const locator: CallAdapterLocator = { roomId: props.config.roomId };

  const adapter = useAzureCommunicationCallAdapter(
    {userId, displayName, credential, locator},
  );

  if (!adapter) {
    return <div>No adapter</div>
  }

  return <CallComposite adapter={adapter}/>
}
