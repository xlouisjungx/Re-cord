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
  mbtiTag: { fontSize: 11, color: '#EAB877', fontWeight: '600' }, // 🌟 RED -> GOLD

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 120,
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
  selectedPeriodBtn: { backgroundColor: '#EAB877', borderColor: '#EAB877' }, // 🌟 RED -> GOLD
  periodText: { fontSize: 12, color: '#777', fontWeight: '600' },
  selectedPeriodText: { color: '#121212', fontWeight: '700' },

  analyzeBtn: {
    backgroundColor: '#EAB877', // 🌟 RED -> GOLD
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  analyzeBtnText: { color: '#121212', fontWeight: '800', fontSize: 16 },

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
    backgroundColor: '#2A2115', // 🌟 RED BG -> GOLD BROWN BG
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  tagText: { color: '#EAB877', fontSize: 11, fontWeight: '800' }, // 🌟 RED -> GOLD
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
  graphValue: { fontSize: 12, color: '#EAB877', fontWeight: '800' }, // 🌟 RED -> GOLD
  progressBarBg: {
    height: 6,
    backgroundColor: '#1A1A1A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#EAB877', // 🌟 RED -> GOLD
    borderRadius: 3,
  },

  emptyCard: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#555', fontSize: 14 },
});
