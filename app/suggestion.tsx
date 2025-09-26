import { api, type MovieOrSeries } from "@/api";
import { ResizeMode, Video } from "expo-av";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from "react";
import { Alert, ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Defs, Path, Rect, Stop, LinearGradient as SvgLinearGradient } from "react-native-svg";

export default function Suggestion  () {
  const params = useLocalSearchParams();
  const { mood, availableTime, audience } = params;

  const [suggestions, setSuggestions] = React.useState<MovieOrSeries[]>([]);
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);
  const [status, setStatus] = React.useState("loading");
  const [isLoadingUrl, setIsLoadingUrl] = React.useState(false);

  const currentSuggestion = suggestions[suggestionIndex];
  const hasMoreSuggestions = suggestionIndex < suggestions.length - 1;

  const showNextSuggestion = () => {
    if (hasMoreSuggestions) {
      setSuggestionIndex(prev => prev + 1);
    }
  };

  const openStreamingService = async (watchmodeId: number) => {
    if (isLoadingUrl) return;
    
    setIsLoadingUrl(true);
    try {
      const netflixId = 203;
      const amazonPrimeId = 26;
      const movistarId = 456;
      const knownServices = [netflixId, amazonPrimeId, movistarId];
      const streamingServices = await api.getStreamingServices(watchmodeId);
      const url = streamingServices.find(service => service.region === 'ES' && knownServices.includes(service.source_id))?.web_url;
      if (!url) {
        Alert.alert('No disponible', 'Lo sentimos, esta película o serie no está disponible en Netflix, Amazon Prime o Movistar+ en tu región.');
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir Netflix');
      console.error('Error opening Netflix:', error);
    } finally {
      setIsLoadingUrl(false);
    }
  };

  React.useEffect(() => {
    api.getSuggestion({availableTime: Number(availableTime)}).then((data) => {
      setSuggestions(data);
      setStatus("loaded");
    }).catch((error) => {
      console.error(error);
      setStatus("error");
    });
  }, [availableTime]);

  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0.3);
  
  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000 }),
      -1,
      false
    );
    opacity.value = withRepeat(
      withTiming(0.8, { duration: 1500 }),
      -1,
      true
    );
  }, [rotation, opacity]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const skeletonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (status === "loading" || status === 'error' || suggestions.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
          <Video
            source={require('@/assets/videos/background.mp4')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            resizeMode={ResizeMode.STRETCH}
            isLooping
            isMuted
            shouldPlay
          />
          {status === "loading" && (
            <View style={{gap: 32}}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: "medium", textAlign: "center" }}>Hoy verás...</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Svg width="232" height="349" viewBox="0 0 232 349" fill="none">
                  <Defs>
                    <SvgLinearGradient id="paint0_linear_64_38003" x1="116" y1="0" x2="10.5" y2="349" gradientUnits="userSpaceOnUse">
                      <Stop stopColor="#BB9058"/>
                      <Stop offset="1" stopColor="#802F47"/>
                    </SvgLinearGradient>
                  </Defs>
                  <Rect x="1" y="1" width="230" height="347" rx="23" stroke="url(#paint0_linear_64_38003)" strokeWidth="2"/>
                </Svg>
                <Animated.View style={[{
                  position: 'absolute',
                  top: '80%',
                  left: '50%',
                  marginTop: -14, // Half of skeleton height (28/2)
                  marginLeft: -81, // Half of skeleton width (162/2)
                }, skeletonAnimatedStyle]}>
                  <Svg width="162" height="28" viewBox="0 0 162 28" fill="none">
                    <Rect width="162" height="8" rx="4" fill="white" fillOpacity="0.3"/>
                    <Rect y="20" width="92" height="8" rx="4" fill="white" fillOpacity="0.3"/>
                  </Svg>
                </Animated.View>
                <Animated.View style={[{ 
                  position: 'absolute', 
                  top: '40%', 
                  left: '50%', 
                  marginTop: -67.5, // Half of SVG height (135/2)
                  marginLeft: -67.5 // Half of SVG width (135/2)
                }, animatedStyle]}>
                  <Svg width="135" height="135" viewBox="0 0 135 135" fill="none" >
                    <Path d="M14.7879 27.114C17.8244 23.1422 22.2013 20.4103 27.1026 19.4269L28.4713 19.201L28.4721 19.2016L35.0778 18.319L35.0805 18.3186C37.1095 18.0409 38.9861 17.0875 40.4059 15.6117L40.4249 15.5917L40.4417 15.5714L41.039 14.8799L41.0584 14.8578L45.1761 9.47115C48.3712 5.29092 53.0443 2.49146 58.2375 1.64682C63.2684 0.828655 68.4182 1.90449 72.6944 4.65665L73.1056 4.92918L74.0562 5.61527L79.4189 9.71461C81.0462 10.9586 83.0548 11.6153 85.0862 11.5823L85.1174 11.5816L85.1499 11.5793L86.0549 11.5066L86.0811 11.5045L86.1057 11.5012L92.7072 10.624L92.7107 10.6242C97.9079 9.91526 103.18 11.2153 107.452 14.2593C111.721 17.302 114.67 21.8579 115.698 26.9989L115.92 28.3514L116.802 34.9565L116.803 34.9598C117.081 36.9888 118.034 38.8654 119.51 40.2852L119.529 40.3036L119.55 40.3217L120.241 40.9177L120.264 40.9377L125.651 45.0554C129.831 48.2505 132.631 52.9236 133.475 58.1168C134.318 63.3013 133.149 68.6118 130.207 72.9628L129.49 73.9573L125.407 79.2989L125.18 79.6078C124.085 81.1733 123.509 83.0469 123.539 84.9635L123.539 84.9969L123.542 85.0286L123.614 85.9336L123.617 85.9598L123.62 85.9858L124.496 92.5867L124.496 92.5902C125.205 97.7874 123.905 103.06 120.861 107.331C117.821 111.597 113.271 114.544 108.136 115.575L106.768 115.8L106.769 115.8L100.163 116.682L100.161 116.683L99.782 116.742C97.8987 117.081 96.1663 118.006 94.8352 119.39L94.8163 119.41L94.7995 119.43L94.2021 120.121L94.1836 120.144L90.0658 125.531C86.8707 129.711 82.1969 132.51 77.0037 133.354C71.9728 134.173 66.823 133.097 62.5467 130.345L62.1363 130.073L61.1857 129.387L55.8215 125.286C54.1966 124.045 52.2008 123.387 50.1564 123.419L50.1237 123.42L50.0921 123.423L49.1863 123.495L49.1355 123.5L42.534 124.377L42.5305 124.377L42.0426 124.438C37.0044 125.003 31.9274 123.691 27.7893 120.742C23.5197 117.699 20.5696 113.144 19.5419 108.003L19.3209 106.65L18.4391 100.045L18.4379 100.042C18.1603 98.0125 17.2068 96.1359 15.731 94.7161L15.7118 94.6977L15.6913 94.6796L15 94.0836L14.9779 94.0642L9.59125 89.9465L8.67981 89.2092C4.84144 85.9132 2.34998 81.3201 1.68044 76.3052C1.01213 71.2994 2.20438 66.222 5.03268 62.0387L5.73459 61.0658L5.73537 61.0664L9.8353 55.703C11.0765 54.0781 11.734 52.0823 11.7026 50.0378L11.7017 50.0052L11.6994 49.9727L11.6267 49.0677L11.6246 49.0416L11.6219 49.0161L10.7447 42.4147L10.7449 42.4111C10.3776 39.7208 10.5456 36.9844 11.2395 34.3593C11.89 31.8982 12.9908 29.5802 14.4843 27.5223L14.7879 27.114Z" stroke="url(#paint0_linear_91_4307)" strokeWidth="2"/>
                    <Defs>
                      <SvgLinearGradient id="paint0_linear_91_4307" x1="13.9934" y1="26.5067" x2="109.221" y2="135.121" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#BB9058"/>
                        <Stop offset="1" stopColor="#802F47"/>
                      </SvgLinearGradient>
                    </Defs>
                  </Svg>
                </Animated.View>
                <View style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  marginTop: -28, // Half of SVG height (56/2)
                  marginLeft: -28, // Half of SVG width (56/2)
                }}>
                  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <Path d="M28 39.6667V39.69" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M28 31.5C27.9571 30.7426 28.1614 29.9917 28.5822 29.3604C29.0031 28.7291 29.6177 28.2517 30.3334 28C31.2104 27.6647 31.9976 27.1303 32.633 26.4389C33.2685 25.7476 33.7347 24.9182 33.9951 24.0161C34.2555 23.1139 34.303 22.1637 34.1337 21.2401C33.9645 20.3165 33.5832 19.4448 33.0198 18.6936C32.4564 17.9424 31.7263 17.3322 30.8871 16.9111C30.0478 16.4901 29.1222 16.2695 28.1833 16.2669C27.2443 16.2643 26.3175 16.4797 25.4759 16.8961C24.6344 17.3126 23.9009 17.9187 23.3334 18.6667" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </View>
              </View>
            </View>
          )}
          {status === 'error' && (
            <Text style={{ color: 'white', fontSize: 20, fontWeight: "medium", textAlign: "center" }}>Error al cargar sugerencias</Text>
          )}
          {status === 'loaded' && suggestions.length === 0 && (
            <Text style={{ color: 'white', fontSize: 20, fontWeight: "medium", textAlign: "center" }}>No hay sugerencias disponibles</Text>
          )}
      </View>
    );
  }

  const body = (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ gap: 0, paddingBottom: 24}}>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: "bold" }}>{currentSuggestion?.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: "medium" }}>{currentSuggestion?.type === 'movie' ? 'Película' : 'Serie'} · {currentSuggestion?.genres[0]?.name}</Text>
          <TouchableOpacity 
            style={{
              height: 40,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 20,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              router.push({
                pathname: '/ficha',
                params: {
                  id: currentSuggestion?.id,
                }
              });
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'medium' }}>Ficha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
        {status === 'loaded' && <ImageBackground
          source={{uri: currentSuggestion.artwork || currentSuggestion.poster }}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }} />
        }
        {/* Gradient overlay positioned behind everything */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 400, // Covers the text area and bottom bar
            zIndex: 0,
          }}
        />
        <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1, padding: 16, justifyContent: 'flex-end', paddingBottom: 116, zIndex: 1, position: 'relative' }}>
          <View>{body}</View>
        </ScrollView>
        <View
          style={{
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: 116,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
          {/* Left button - Otra */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}
              onPress={showNextSuggestion}
              disabled={!hasMoreSuggestions}
            >
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>→</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'medium' }}>Otra</Text>
          </View>

          {/* Center button - Reproducir */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isLoadingUrl ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}
              onPress={() => openStreamingService(currentSuggestion?.watchmodeId)}
              disabled={isLoadingUrl}
            >
              <Text style={{ color: 'black', fontSize: 24 }}>
                {isLoadingUrl ? '⋯' : '▶'}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'medium' }}>
              {isLoadingUrl ? 'Cargando...' : 'Reproducir'}
            </Text>
          </View>

          {/* Right button - Guardar */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}
              onPress={() => {
                // Add save functionality here
                Alert.alert('Guardar', 'Funcionalidad de guardar pendiente');
              }}
            >
              <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'medium' }}>Guardar</Text>
          </View>
          </BlurView>
        </View>
    </View>
  );
}
