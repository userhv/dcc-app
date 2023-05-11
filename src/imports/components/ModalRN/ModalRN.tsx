import React from 'react';
import {Portal, Modal, Text} from 'react-native-paper';
import {RenderableComponent} from '../GeneralComponents/GeneralComponents';
import {modalStyle} from './ModalStyle';

export interface IModalRN {
  renderedComponent:
    | RenderableComponent
    | ((props: {[key: string]: any}) => RenderableComponent);
  deviceDimensions: number[];
  visible: boolean;
  onDismiss: () => void;
  isFullScreen?: boolean;
}

/* renderedComponent espera que seja informado um elemento JSX válido. */
export const ModalRN = (props: IModalRN) => {
  const {visible, onDismiss, renderedComponent, deviceDimensions, ...others} =
    props;
  let styles = {};
  if (others.isFullScreen) {
    styles = {
      ...modalStyle.container,
      width: deviceDimensions[0],
      height: deviceDimensions[1],
	  margin: 0,
	  borderRadius: 0,
	  padding: 0
    };
  }

  const RenderedComponent = (renderedComponent as React.ReactNode)
    ? renderedComponent
    : (_props: {[key: string]: any}) => (
        <Text> {`Modal visível: ${_props.visible}`} </Text>
      );

  return (
    <Portal>
      <Modal
        theme={{
          colors: {
            backdrop: '#00000080',
          },
        }}
        dismissable={false}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles}>
        <RenderedComponent {...others} {...{visible, onDismiss}} />
      </Modal>
    </Portal>
  );
};
