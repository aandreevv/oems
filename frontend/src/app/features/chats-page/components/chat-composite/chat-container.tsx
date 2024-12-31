import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {
  ChatComposite,
  CompositeLocale,
  fromFlatCommunicationIdentifier,
  useAzureCommunicationChatAdapter
} from '@azure/communication-react';
import { PartialTheme, Theme } from '@fluentui/react';
import React, { useMemo, useEffect, useState } from 'react';

export type ContainerProps = {
  /** UserIdentifier is of type CommunicationUserIdentifier see below how to construct it from a string input */
  userIdentifier: string;
  token: string;
  displayName: string;
  threadId: string;
  fluentTheme?: PartialTheme | Theme;
  rtl?: boolean;
  errorBar?: boolean;
  participants?: boolean;
  topic?: boolean;
  locale?: CompositeLocale;
  formFactor?: 'desktop' | 'mobile';
};

export const ContosoChatContainer = (props: ContainerProps): JSX.Element => {
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(props.token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [props.token]);

  const userId = useMemo(
    () => fromFlatCommunicationIdentifier(props.userIdentifier) as CommunicationUserIdentifier,
    [props.userIdentifier]
  );

  // Add throttling for setting display name during typing
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDisplayName(props.displayName);
    }, 500);
    return () => clearTimeout(handle);
  }, [props.displayName]);

  const adapter = useAzureCommunicationChatAdapter({
    endpoint: 'https://communication-oems.europe.communication.azure.com/',
    userId,
    displayName,
    credential,
    threadId: props.threadId
  });

  if (adapter) {
    return (
      <div style={{ height: '88vh' }}>
        <ChatComposite
          adapter={adapter}
          fluentTheme={props.fluentTheme}
          rtl={props.rtl ?? false}
          options={{
            errorBar: props.errorBar,
            topic: props.topic
          }}
          locale={props.locale}
        />
      </div>
    );
  }
  if (credential === undefined) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  return <div style={{ height: '88vh', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
};
