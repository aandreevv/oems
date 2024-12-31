import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {
  CallAdapter,
  CallComposite,
  useAzureCommunicationCallAdapter
} from '@azure/communication-react';
import { initializeIcons } from '@fluentui/react';
import React, { useMemo } from 'react';

initializeIcons();

export type ContainerProps = {
  userId: CommunicationUserIdentifier;
  token: string;
  roomId: string;
  displayName: string;
};

export const ContosoCallContainer = (props: ContainerProps): JSX.Element => {
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(props.token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [props.token]);

  const locator: {roomId: string} = useMemo(() => ({roomId: props.roomId}), [props.roomId]);

  const adapter = useAzureCommunicationCallAdapter(
    {
      userId: props.userId,
      displayName: props.displayName, // Max 256 Characters
      credential,
      locator
    },
    undefined,
    leaveCall
  );

  if (!locator) {
    return <>Provided call locator '{props.roomId}' is not recognized.</>;
  }

  if (adapter) {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <CallComposite
          adapter={adapter}
        />
      </div>
    );
  }
  if (credential === undefined) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  return <>Initializing...</>;
};

const leaveCall = async (adapter: CallAdapter): Promise<void> => {
  await adapter.leaveCall().catch((e) => {
    window.location.reload();
    console.error('Failed to leave call', e);
  });
};
