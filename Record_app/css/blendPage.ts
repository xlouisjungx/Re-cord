import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Constants.statusBarHeight + 75;

export default StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight + 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { padding: 5, marginRight: 10 },
  profileInfo: { justifyContent: 'center' },
  profileName: { fontWeight: '800', fontSize: 16, color: '#fff' },
  mbtiTag: { fontSize: 11, color: '#EAB877', fontWeight: '600' }, // 🌟 RED -> GOLD

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 120,
  },

  // 요청 카드
  requestCard: {
    marginTop: 30,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  badge: {
    backgroundColor: '#EAB877', // 🌟 RED -> GOLD
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 15,
  },
  badgeText: { color: '#121212', fontSize: 10, fontWeight: '900' },
  requestText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 26,
    color: '#DDD',
  },
  btnRow: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    minWidth: 110,
    alignItems: 'center',
  },
  acceptBtn: { backgroundColor: '#EAB877' }, // 🌟 RED -> GOLD
  acceptBtnText: { color: '#121212', fontWeight: '800' },
  declineBtn: { backgroundColor: '#222' },
  declineBtnText: { color: '#888', fontWeight: '700' },

  // 아코디언 리포트
  title: { fontSize: 24, fontWeight: '800', marginVertical: 25, color: '#fff' },
  accordionContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 22,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  activeHeader: { borderBottomWidth: 1, borderBottomColor: '#333' },
  row: { flexDirection: 'row', alignItems: 'center' },
  friendName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginRight: 10,
  },
  miniBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  miniBadgeText: { fontSize: 12, color: '#EAB877', fontWeight: '800' }, // 🌟 RED -> GOLD

  // 리포트 상세 내용
  accordionContent: { padding: 20 },
  scoreSection: { alignItems: 'center', marginBottom: 25 },
  scoreText: { fontSize: 50, fontWeight: '900', color: '#EAB877' }, // 🌟 RED -> GOLD
  tagLabel: { fontSize: 14, color: '#888', fontWeight: '700', marginTop: 5 },
  infoBox: {
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    color: '#EAB877', // 🌟 RED -> GOLD
  },
  infoText: { fontSize: 13, color: '#BBB' },
  detailSection: { marginBottom: 20 },
  detailLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  detailBody: { fontSize: 14, lineHeight: 22, color: '#999' },

  // 모달
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    color: '#fff',
  },
  modalSub: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 30,
    lineHeight: 22,
  },
  gaugeBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#111',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gaugeFill: { height: '100%', backgroundColor: '#EAB877' }, // 🌟 RED -> GOLD
  percentText: { fontSize: 20, fontWeight: '900', color: '#EAB877' }, // 🌟 RED -> GOLD
});
