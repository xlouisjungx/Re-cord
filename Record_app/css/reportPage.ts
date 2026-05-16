import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Constants.statusBarHeight + 75; // 슬림 헤더 높이 통일

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 5,
    marginRight: 10,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: { fontWeight: '800', fontSize: 16, color: '#fff' },
  mbtiTag: { fontSize: 11, color: '#FF4D4D', fontWeight: '600' },

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 120, // 하단 홈 바 대응
  },
  title: { fontSize: 24, fontWeight: '800', marginTop: 25, color: '#fff' },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#fff',
  },

  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  periodBtn: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedPeriodBtn: { backgroundColor: '#FF4D4D', borderColor: '#FF4D4D' },
  periodText: { fontSize: 12, color: '#777', fontWeight: '600' },
  selectedPeriodText: { color: '#fff', fontWeight: '700' },

  analyzeBtn: {
    backgroundColor: '#FF4D4D',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  analyzeBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  divider: { height: 1, backgroundColor: '#333', marginBottom: 30 },

  reportCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  tag: {
    backgroundColor: '#2D1A1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  tagText: { color: '#FF4D4D', fontSize: 11, fontWeight: '800' },
  dateText: { flex: 1, color: '#666', fontSize: 12 },

  insightText: {
    fontSize: 15,
    color: '#DDD',
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 20,
  },

  graphContainer: { marginTop: 10 },
  graphLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  graphLabel: { fontSize: 12, color: '#888', fontWeight: '600' },
  graphValue: { fontSize: 12, color: '#FF4D4D', fontWeight: '800' },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1A1A1A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF4D4D',
    borderRadius: 3,
  },

  emptyCard: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#555', fontSize: 14 },
});
