import { StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Constants.statusBarHeight + 75;

// 재사용 가능한 테마 컬러 정의 (유지보수성 향상)
const COLORS = {
  bgDark: '#0D0D0D',
  surface: 'rgba(30, 30, 30, 0.55)',
  surfaceBorder: 'rgba(255, 255, 255, 0.08)',
  accent: '#EAB877',
  accentDark: 'rgba(234, 184, 119, 0.12)',
  textMain: '#FFFFFF',
  textSub: '#A0A0A0',
  textMuted: '#666666',
  trackBg: '#1A1A1A',
};

export default StyleSheet.create({
  // 🌌 전체 스크린 배경용 (필요시 컨테이너에 적용)
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },

  // 🔔 상단 헤더 영역
  header: {
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    borderBottomLeftRadius: 24, // 지나치게 큰 라운딩을 조금 더 트렌디하게 조정
    borderBottomRightRadius: 24,
    zIndex: 10,
    // 헤더 하단에 은은한 경계선 추가
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 8, // 터치 영역 확보
    marginRight: 8,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontWeight: '800',
    fontSize: 17,
    color: COLORS.textMain,
    letterSpacing: -0.3,
  },
  mbtiTag: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 2,
  },

  // 📜 스크롤 콘텐츠
  scrollContent: {
    paddingHorizontal: 20, // 양옆 여백을 20으로 맞추어 헤더와 통일감 부여
    paddingTop: 20,
    paddingBottom: 140, // 하단 탭바나 네비게이션 고려 여유공간 확보
  },
  title: {
    fontSize: 26,
    fontWeight: '850',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.textSub,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
  },

  // 🔮 중앙 MBTI 스탯 코어 영역
  coreContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 24,
    // iOS/Android 그림자 최적화
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  mbtiSphere: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.accentDark,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // 구체 글로우 효과 강화
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 18,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  mbtiCoreText: {
    fontSize: 40,
    fontWeight: '950', // 더 굵고 직관적인 폰트 스타일
    color: COLORS.accent,
    letterSpacing: 4,
    paddingLeft: 4, // 글자 간격(letterSpacing)으로 인한 우측 치우침 방지
  },

  // 📊 역동적 행동 실시간 바 그래프 영역
  graphWrapper: {
    width: '100%',
    gap: 18,
  },
  statRow: {
    width: '100%',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: '700',
  },
  statValueText: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '800',
  },
  trackBg: {
    height: 10, // 조금 더 도톰하게 만들어 터치감 및 시인성 개선
    backgroundColor: COLORS.trackBg,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  fillBar: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 5,
  },

  // 📝 AI 실시간 행동 통찰 카드
  insightCard: {
    backgroundColor: 'rgba(43, 35, 26, 0.65)', // 살짝 톤을 올려 가독성 확보
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(234, 184, 119, 0.25)', // 골드빛 도는 보더라인 선명화
    marginTop: 16,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: -0.2,
  },
  insightBody: {
    fontSize: 14,
    color: '#E2E2E2',
    lineHeight: 22, // 텍스트 가독성을 위한 행간 확보
  },

  emptyText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginVertical: 50,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
