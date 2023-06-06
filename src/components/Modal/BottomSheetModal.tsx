import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as BaseModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

import React, {PropsWithChildren, useCallback, useEffect, useRef} from 'react';
import {Dimensions, Keyboard, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ModalName} from '../../app/Modals/constants';
import {spacing} from '../../utils/styles/sizing';

const {width, height} = Dimensions.get('window');

type Props = PropsWithChildren<{
  disableSwipe?: boolean;
  hideHandlebar?: boolean;
  name: ModalName;
  onClose?: () => void;
  snapPoints?: Array<string | number>;

  fullScreen?: boolean;
  backgroundColor?: string;
  blurredBackground?: boolean;
  isDismissible?: boolean;
  renderBehindInset?: boolean;
  hideKeyboardOnDismiss?: boolean;
}>;

const APPEARS_ON_INDEX = 0;
const DISAPPEARS_ON_INDEX = -1;

const Backdrop = (props: BottomSheetBackdropProps): JSX.Element => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={APPEARS_ON_INDEX}
      disappearsOnIndex={DISAPPEARS_ON_INDEX}
      opacity={0.4}
    />
  );
};

const CONTENT_HEIGHT_SNAP_POINTS = ['CONTENT_HEIGHT'];
const FULL_HEIGHT = 0.91;

export function BottomSheetModal({
  children,
  name,
  onClose,
  snapPoints = CONTENT_HEIGHT_SNAP_POINTS,
  fullScreen,
  hideHandlebar,
  backgroundColor,
  blurredBackground = false,
  isDismissible = true,
  renderBehindInset = false,
  hideKeyboardOnDismiss = false,
}: Props): JSX.Element {
  const insets = useSafeAreaInsets();
  const modalRef = useRef<BaseModal>(null);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={APPEARS_ON_INDEX}
        disappearsOnIndex={DISAPPEARS_ON_INDEX}
        opacity={blurredBackground ? 0.2 : 0.4}
        pressBehavior={isDismissible ? 'close' : 'none'}
      />
    ),
    [isDismissible],
  );

  useEffect(() => {
    modalRef.current?.present();
  }, [modalRef]);

  const fullScreenContentHeight =
    (renderBehindInset ? 1 : FULL_HEIGHT) * height;

  const backdrop = {backdropComponent: renderBackdrop};

  const onAnimate = useCallback(
    (fromIndex: number, toIndex: number): void => {
      if (
        hideKeyboardOnDismiss &&
        fromIndex === APPEARS_ON_INDEX &&
        toIndex === DISAPPEARS_ON_INDEX
      ) {
        Keyboard.dismiss();
      }
    },
    [hideKeyboardOnDismiss],
  );

  return (
    <BaseModal
      ref={modalRef}
      contentHeight={animatedContentHeight}
      enableContentPanningGesture={isDismissible}
      enableHandlePanningGesture={isDismissible}
      handleHeight={animatedHandleHeight}
      snapPoints={animatedSnapPoints}
      topInset={renderBehindInset ? undefined : insets.top}
      onAnimate={onAnimate}
      onDismiss={onClose}>
      <BottomSheetView
        style={[
          {height: fullScreen ? fullScreenContentHeight : undefined},
          BottomSheetStyle.view,
          renderBehindInset ? {...BottomSheetStyle.behindInset} : undefined,
        ]}
        onLayout={handleContentLayout}>
        {children}
      </BottomSheetView>
    </BaseModal>
  );
}

export function BottomSheetDetachedModal({
  children,
  name,
  onClose,
  snapPoints = CONTENT_HEIGHT_SNAP_POINTS,

  fullScreen,
  hideHandlebar,
  backgroundColor,
}: Props): JSX.Element {
  const insets = useSafeAreaInsets();
  const modalRef = useRef<BaseModal>(null);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const fullScreenContentHeight = FULL_HEIGHT * height;

  useEffect(() => {
    modalRef.current?.present();
  }, [modalRef]);

  return (
    <BaseModal
      ref={modalRef}
      backdropComponent={Backdrop}
      bottomInset={spacing.spacing48}
      contentHeight={animatedContentHeight}
      detached={true}
      handleHeight={animatedHandleHeight}
      snapPoints={animatedSnapPoints}
      style={BottomSheetStyle.detached}
      topInset={insets.top}
      onDismiss={onClose}>
      <BottomSheetView
        style={[
          {
            height: fullScreen ? fullScreenContentHeight : undefined,
          },
          BottomSheetStyle.view,
        ]}
        onLayout={handleContentLayout}>
        {children}
      </BottomSheetView>
    </BaseModal>
  );
}

const BottomSheetStyle = StyleSheet.create({
  behindInset: {
    overflow: 'hidden',
  },
  detached: {
    marginHorizontal: spacing.spacing12,
  },
  view: {
    flex: 1,
  },
});

const BlurViewStyle = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
