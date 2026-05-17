import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // 앱 전체의 기본 도화지가 되는 딥 블랙 배경
  recordBackground: {
    flex: 1, // 강제 절대좌표 대신 flex: 1을 사용하여 기기별 스크린을 자연스럽게 채웁니다.
    backgroundColor: '#000000',
    overflow: 'hidden',
  },

  // 🌟 [디자인 싱크 수정] 좌측 상단/중단에서 은은하게 퍼지는 소프트 골드 빛 아우라
  topBlurCircle: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: 'rgba(234, 184, 119, 0.15)', // 시안의 부드러운 골드/엠버 톤 추출
    shadowColor: '#EAB877',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 110, // 경계선이 생기지 않도록 블러 반경을 더 넓게 설정
    elevation: 25,
    zIndex: -1, // 콘텐츠 텍스트 뒤로 숨김
  },

  // 🌟 [디자인 싱크 수정] 우측 하단에서 묵직하게 받쳐주는 따뜻한 브라운-황금빛 아우라
  bottomBlurCircle: {
    position: 'absolute',
    width: width * 1.2, // 더 거대하게 퍼지는 빛 효과를 위해 크기 확장
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    backgroundColor: 'rgba(212, 163, 89, 0.08)', // 대비감을 위해 약간 낮춘 농도
    shadowColor: '#D4A359',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 140,
    elevation: 20,
    zIndex: -2,
  },
});
