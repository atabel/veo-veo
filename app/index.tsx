import { ResizeMode, Video } from "expo-av";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import Settings from "./settings";

export default function Index() {
  const progress = useSharedValue<number>(0);
  const rotation = useSharedValue(0);
  const router = useRouter();
  const carouselRef = useRef<ICarouselInstance>(null);
  const carouselData = [1, 2];
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000 }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  const handleSuggestionPress = () => {
    router.push('/suggestion');
  };

  const handlePersonalizePress = () => {
    setIsSettingsVisible(true);
  };

  return (
    <View style={{flex: 1}}>
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
      <View style={{position: 'absolute', top: 64, left: 16, flexDirection: 'row'}}>
        <Image
          source={require('@/assets/images/movistar.png')}
          style={{width: 32, height: 32, borderRadius: 16, borderColor: 'white', borderWidth: 1}}
        />
        <Image
          source={require('@/assets/images/netflix.png')}
          style={{width: 32, height: 32, borderRadius: 16, borderColor: 'white', borderWidth: 1, marginLeft: -8}}
        />
        <View style={{width: 32, height: 32, borderRadius: 16, borderColor: 'white', borderWidth: 1, marginLeft: -8, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path d="M8 2V14M2 8H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          gap: 40,
          alignItems: "center",
          // backgroundColor: 'rgba(0,0,0,0.6)', 
          paddingTop: 188
        }}
      >

        <View style={{ alignItems: "center", gap: 20 }}>
          <Text style={{ color: 'white', fontSize: 64, fontWeight: "bold", textAlign: "center" }}>Veo Veo</Text>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: "medium", textAlign: "center" }}>¿Qué verás hoy?</Text>
        </View>

        <View style={{ alignItems: "center", gap: 32 }}>
          <Carousel
            ref={carouselRef}
            loop={false}
            width={430}
            height={200}
            snapEnabled={true}
            pagingEnabled={true}
            data={carouselData}
            onProgressChange={progress}
            renderItem={({index}) => {
              return (
                <View key={index} style={{ alignItems: "center", gap: 20 }}>
                  <TouchableOpacity onPress={index === 0 ? handleSuggestionPress : handlePersonalizePress}>
                    <View>
                      <Animated.View style={animatedStyle}>
                        <Svg width="135" height="135" viewBox="0 0 135 135" fill="none" >
                          <Path d="M14.7879 27.114C17.8244 23.1422 22.2013 20.4103 27.1026 19.4269L28.4713 19.201L28.4721 19.2016L35.0778 18.319L35.0805 18.3186C37.1095 18.0409 38.9861 17.0875 40.4059 15.6117L40.4249 15.5917L40.4417 15.5714L41.039 14.8799L41.0584 14.8578L45.1761 9.47115C48.3712 5.29092 53.0443 2.49146 58.2375 1.64682C63.2684 0.828655 68.4182 1.90449 72.6944 4.65665L73.1056 4.92918L74.0562 5.61527L79.4189 9.71461C81.0462 10.9586 83.0548 11.6153 85.0862 11.5823L85.1174 11.5816L85.1499 11.5793L86.0549 11.5066L86.0811 11.5045L86.1057 11.5012L92.7072 10.624L92.7107 10.6242C97.9079 9.91526 103.18 11.2153 107.452 14.2593C111.721 17.302 114.67 21.8579 115.698 26.9989L115.92 28.3514L116.802 34.9565L116.803 34.9598C117.081 36.9888 118.034 38.8654 119.51 40.2852L119.529 40.3036L119.55 40.3217L120.241 40.9177L120.264 40.9377L125.651 45.0554C129.831 48.2505 132.631 52.9236 133.475 58.1168C134.318 63.3013 133.149 68.6118 130.207 72.9628L129.49 73.9573L125.407 79.2989L125.18 79.6078C124.085 81.1733 123.509 83.0469 123.539 84.9635L123.539 84.9969L123.542 85.0286L123.614 85.9336L123.617 85.9598L123.62 85.9858L124.496 92.5867L124.496 92.5902C125.205 97.7874 123.905 103.06 120.861 107.331C117.821 111.597 113.271 114.544 108.136 115.575L106.768 115.8L106.769 115.8L100.163 116.682L100.161 116.683L99.782 116.742C97.8987 117.081 96.1663 118.006 94.8352 119.39L94.8163 119.41L94.7995 119.43L94.2021 120.121L94.1836 120.144L90.0658 125.531C86.8707 129.711 82.1969 132.51 77.0037 133.354C71.9728 134.173 66.823 133.097 62.5467 130.345L62.1363 130.073L61.1857 129.387L55.8215 125.286C54.1966 124.045 52.2008 123.387 50.1564 123.419L50.1237 123.42L50.0921 123.423L49.1863 123.495L49.1355 123.5L42.534 124.377L42.5305 124.377L42.0426 124.438C37.0044 125.003 31.9274 123.691 27.7893 120.742C23.5197 117.699 20.5696 113.144 19.5419 108.003L19.3209 106.65L18.4391 100.045L18.4379 100.042C18.1603 98.0125 17.2068 96.1359 15.731 94.7161L15.7118 94.6977L15.6913 94.6796L15 94.0836L14.9779 94.0642L9.59125 89.9465L8.67981 89.2092C4.84144 85.9132 2.34998 81.3201 1.68044 76.3052C1.01213 71.2994 2.20438 66.222 5.03268 62.0387L5.73459 61.0658L5.73537 61.0664L9.8353 55.703C11.0765 54.0781 11.734 52.0823 11.7026 50.0378L11.7017 50.0052L11.6994 49.9727L11.6267 49.0677L11.6246 49.0416L11.6219 49.0161L10.7447 42.4147L10.7449 42.4111C10.3776 39.7208 10.5456 36.9844 11.2395 34.3593C11.89 31.8982 12.9908 29.5802 14.4843 27.5223L14.7879 27.114Z" stroke="url(#paint0_linear_91_4307)" strokeWidth="2"/>
                          <Defs>
                            <LinearGradient id="paint0_linear_91_4307" x1="13.9934" y1="26.5067" x2="109.221" y2="135.121" gradientUnits="userSpaceOnUse">
                              <Stop stopColor="#BB9058"/>
                              <Stop offset="1" stopColor="#802F47"/>
                            </LinearGradient>
                          </Defs>
                        </Svg>
                      </Animated.View>
                      {index === 0 ? (
                        <Svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{position: 'absolute', top: 135/2-22, left: 135/2-22}}>
                          <G clipPath="url(#clip0_64_40436)">
                            <Path d="M31.9956 24.3076L34.5583 26.8703" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M16.6196 8.93161L19.1823 11.4943" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M24.3076 16.6196L26.8703 19.1823" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M3.80626 21.7449L21.7449 3.80627C22.4246 3.1266 23.3464 2.74477 24.3076 2.74477C25.2688 2.74477 26.1906 3.1266 26.8703 3.80627L30.7143 7.65027C30.0346 8.32993 29.6528 9.25175 29.6528 10.2129C29.6528 11.1741 30.0346 12.0959 30.7143 12.7756C31.3939 13.4553 32.3158 13.8371 33.277 13.8371C34.2381 13.8371 35.16 13.4553 35.8396 12.7756L39.6836 16.6196C40.3633 17.2993 40.7451 18.2211 40.7451 19.1823C40.7451 20.1435 40.3633 21.0653 39.6836 21.7449L21.7449 39.6836C21.0653 40.3633 20.1435 40.7451 19.1823 40.7451C18.2211 40.7451 17.2993 40.3633 16.6196 39.6836L12.7756 35.8396C13.4553 35.16 13.8371 34.2381 13.8371 33.277C13.8371 32.3158 13.4553 31.394 12.7756 30.7143C12.0959 30.0346 11.1741 29.6528 10.2129 29.6528C9.25175 29.6528 8.32993 30.0346 7.65026 30.7143L3.80626 26.8703C3.1266 26.1906 2.74477 25.2688 2.74477 24.3076C2.74477 23.3464 3.1266 22.4246 3.80626 21.7449Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </G>
                          <Defs>
                            <ClipPath id="clip0_64_40436">
                              <Rect width="43.4899" height="43.4899" fill="white"/>
                            </ClipPath>
                          </Defs>
                        </Svg>
                      ): (
                        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{position: 'absolute', top: 135/2-24, left: 135/2-24}}>
                          <Path d="M6 14C6 15.5913 6.63214 17.1174 7.75736 18.2426C8.88258 19.3679 10.4087 20 12 20C13.5913 20 15.1174 19.3679 16.2426 18.2426C17.3679 17.1174 18 15.5913 18 14C18 12.4087 17.3679 10.8826 16.2426 9.75736C15.1174 8.63214 13.5913 8 12 8C10.4087 8 8.88258 8.63214 7.75736 9.75736C6.63214 10.8826 6 12.4087 6 14Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <Path d="M42 34C42 35.5913 41.3679 37.1174 40.2426 38.2426C39.1174 39.3679 37.5913 40 36 40C34.4087 40 32.8826 39.3679 31.7574 38.2426C30.6321 37.1174 30 35.5913 30 34C30 32.4087 30.6321 30.8826 31.7574 29.7574C32.8826 28.6321 34.4087 28 36 28C37.5913 28 39.1174 28.6321 40.2426 29.7574C41.3679 30.8826 42 32.4087 42 34Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <Path d="M26 14L42 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <Path d="M22 34H6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
                      )}
                    </View>
                  </TouchableOpacity>
                  {index === 0 ? (
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: "medium", textAlign: "center", width: 275 }}>Pulsa o agita para recomendación rápida</Text>
                  ) : (
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: "medium", textAlign: "center", width: 275 }}>Pulsa para personalizar la recomendación</Text>
                  )}
                </View>
              );
            }}
          />
          <Pagination.Basic
            progress={progress}
            data={carouselData}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
            activeDotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'white',
            }}
            containerStyle={{
              gap: 8,
              marginTop: 20,
            }}
            onPress={(index: number) => {
              carouselRef.current?.scrollTo({
                count: index - progress.value,
                animated: true,
              });
            }}
          />
        </View>
        
      </View>
      
      <Settings 
        isVisible={isSettingsVisible} 
        onClose={() => setIsSettingsVisible(false)}
        onSettingsSave={({genres, availableTime, audience}) => {
          console.log('navigate to suggestion with params', {genres, availableTime, audience});
          router.push({pathname: '/suggestion', params: {genres, availableTime, audience}});
        }}
      />
    </View>
  );
}
