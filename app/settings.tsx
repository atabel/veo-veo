import { useState } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export interface UserSettings {
  mood: MoodOption;
  availableTime: number;
  audience: AudienceOption;
}

interface SettingsProps {
  isVisible: boolean;
  onClose: () => void;
  onSettingsSave?: (settings: UserSettings) => void;
}

type MoodOption = "Adrenalina pura" | "corazón sensible" | "risas garantizadas" | "mente curiosa" | "intriga constante" | "suspenso atrapante" | "escape total";
type TimeOption = "menos de 30 minutos" | "entre 30 y 90 minutos" | "alrededor de una hora y media" | "mas de dos horas";
type AudienceOption = "adultos" | "adolescentes" | "con niños";

export default function Settings({ isVisible, onClose, onSettingsSave }: SettingsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<AudienceOption | null>(null);
  const insets = useSafeAreaInsets();

  const moodOptions: MoodOption[] = [
    "Adrenalina pura",
    "corazón sensible", 
    "risas garantizadas",
    "mente curiosa",
    "intriga constante",
    "suspenso atrapante",
    "escape total"
  ];

  const timeOptions: TimeOption[] = [
    "menos de 30 minutos",
    "entre 30 y 90 minutos", 
    "alrededor de una hora y media",
    "mas de dos horas"
  ];

  const audienceOptions: AudienceOption[] = [
    "adultos",
    "adolescentes",
    "con niños"
  ];

  const convertTimeToMinutes = (timeOption: TimeOption): number => {
    switch (timeOption) {
      case "menos de 30 minutos":
        return 30;
      case "entre 30 y 90 minutos":
        return 60; // Average of 30-90
      case "alrededor de una hora y media":
        return 90;
      case "mas de dos horas":
        return 150; // 2.5 hours average
      default:
        return 60;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (selectedMood && selectedTime && selectedAudience) {
      const settings: UserSettings = {
        mood: selectedMood,
        availableTime: convertTimeToMinutes(selectedTime),
        audience: selectedAudience
      };
      
      console.log('Settings saved:', settings);
      onSettingsSave?.(settings);
    }
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedMood(null);
    setSelectedTime(null);
    setSelectedAudience(null);
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedMood !== null;
      case 2:
        return selectedTime !== null;
      case 3:
        return selectedAudience !== null;
      default:
        return false;
    }
  };

  const renderProgressIndicator = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: insets.top + 20 }}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={{
            width: 60,
            height: 4,
            backgroundColor: step <= currentStep ? 'white' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );

  const renderOption = (option: string, isSelected: boolean, onSelect: () => void) => (
    <TouchableOpacity
      key={option}
      onPress={onSelect}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: isSelected ? 'white' : 'transparent',
        marginHorizontal: 8,
        marginVertical: 4,
      }}
    >
      <Text style={{ 
        color: isSelected ? 'black' : 'white', 
        fontSize: 16, 
        fontWeight: '500',
        textAlign: 'center'
      }}>
        {option}
      </Text>
    </TouchableOpacity>
  );

  const renderStep1 = () => (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ 
        color: 'white', 
        fontSize: 28, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 60
      }}>
        ¿Qué te apetece?
      </Text>
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: width - 40
      }}>
        {moodOptions.map((option) =>
          renderOption(
            option,
            selectedMood === option,
            () => setSelectedMood(option)
          )
        )}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ 
        color: 'white', 
        fontSize: 28, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 60
      }}>
        ¿Cuánto tiempo tienes?
      </Text>
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: width - 40
      }}>
        {timeOptions.map((option) =>
          renderOption(
            option,
            selectedTime === option,
            () => setSelectedTime(option)
          )
        )}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ 
        color: 'white', 
        fontSize: 28, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 60
      }}>
        ¿Para quién?
      </Text>
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: width - 40
      }}>
        {audienceOptions.map((option) =>
          renderOption(
            option,
            selectedAudience === option,
            () => setSelectedAudience(option)
          )
        )}
      </View>
    </View>
  );

  const renderBottomButtons = () => (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: 20,
      paddingBottom: insets.bottom + 20,
      paddingTop: 20
    }}>
      <TouchableOpacity
        onPress={currentStep === 1 ? handleClose : handleBack}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: 'transparent',
          minWidth: 100,
        }}
      >
        <Text style={{ 
          color: 'white', 
          fontSize: 16, 
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {currentStep === 1 ? 'Cancelar' : 'Atrás'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={currentStep === 3 ? handleContinue : handleNext}
        disabled={!canProceed()}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: canProceed() ? 'white' : 'rgba(255, 255, 255, 0.3)',
          minWidth: 100,
        }}
      >
        <Text style={{ 
          color: canProceed() ? 'black' : 'rgba(255, 255, 255, 0.6)', 
          fontSize: 16, 
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {currentStep === 3 ? 'Continuar' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
        {renderProgressIndicator()}
        
        <View style={{ flex: 1 }}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </View>

        {renderBottomButtons()}
      </View>
    </Modal>
  );
}