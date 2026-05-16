import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  recordBackground: {
    // 기기 전체 화면을 강제로 덮음
    width: width,
    height: height,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  topBlurCircle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(255, 77, 77, 0.2)', // 농도 살짝 높임
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 20,
    zIndex: -1,
  },
  bottomBlurCircle: {
    position: 'absolute',
    width: width * 1.0,
    height: width * 1.0,
    borderRadius: (width * 1.0) / 2,
    backgroundColor: 'rgba(108, 92, 231, 0.12)',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 120,
    elevation: 15,
    zIndex: -2,
  },
});
