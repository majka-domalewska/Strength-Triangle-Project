import { View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";
import LanguageSelector from "@/components/languageSelector";
import { useTranslation } from 'react-i18next';
import '../backend/i18n.js';
import DisplayAnswers from "@/components/abChoiceScreen";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PaperProvider>
      <View style={styles.view}>
        <LanguageSelector />
        <DisplayAnswers />
        {/* <Text>{t('welcome_message')}</Text>
        <Text>{t('description')}</Text> */}
      </View>
    </PaperProvider>
  );
}



const styles = StyleSheet.create({
  view: {
    height: 100
  }
})

export default HomePage;