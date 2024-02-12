import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, View, Linking, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, Text, Button, Modal, TextSizes } from "../../components";
import { typography } from "../../styles";
import styles from "./InfoModalStyles";

const donateUrl = 'https://www.buymeacoffee.com/connortyrrell';

const InfoModal = () => {
  const [showModal, setShowModal] = useState(false);;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  // Handlers for presses
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToDonateUrl = () => {
    Linking.openURL(donateUrl);
  }

  return (
    <>
      <Pressable onPress={openModal}>
        <Icon name='info' color={theme.colors.onPrimary} size={typography.fontSizeXXL} />
      </Pressable>
      <Modal
        isVisible={showModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        avoidKeyboard={true}
        style={{ padding: 0, margin: 0 }}
      >
        <View style={ss.modalBackground}>
          <View style={ss.modalBody}>
            <View style={ss.modalHeader}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button
                  onPress={closeModal}
                  variant='onModalHeader'
                  short
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  color={theme.colors.white}
                  bold
                  size={TextSizes.M}
                >
                  Info
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Button
                  onPress={goToDonateUrl}
                  variant='onModalHeader'
                  short
                >
                  Donate
                </Button>
              </View>
            </View>
            <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              <View>
                <Text size={'L'}>
                  This app was built by Connor Tyrrell, a tech-consultant with a love for building hobby-apps. Connor loves playing games with friends and family while his cats, Sherlock and Watson, sit close by.
                </Text>
                <View style={{paddingTop: 20}}>
                  <Text size={'L'}>
                    Connor and his wife have a deep love for Conversation Cards of all sorts but were disappointed to only find subscription-based apps. So while the pair were on a ski trip, Connor built out this ad-free and cost-free app both for them and for anyone else to enjoy. If you enjoy it and would like to support the cost, time, and effort that goes into building apps you can donate above!
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InfoModal;