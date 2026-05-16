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
  backBtn: { padding: 5, marginRight: 10 },
  profileInfo: { justifyContent: 'center' },
  profileName: { fontWeight: '800', fontSize: 16, color: '#fff' },
  mbtiTag: { fontSize: 11, color: '#FF4D4D', fontWeight: '600' },

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 120, // 하단 홈 바 여백
  },
  titleSection: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  badge: {
    backgroundColor: '#2D1A1A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  badgeText: { color: '#FF4D4D', fontSize: 11, fontWeight: '700' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 5, marginBottom: 25 },

  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    padding: 20,
    borderRadius: 22,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  completedCard: {
    backgroundColor: 'rgba(0, 184, 148, 0.1)',
    borderColor: '#00B894',
  },
  cardIcon: { justifyContent: 'center', marginRight: 15 },
  cardContent: { flex: 1 },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  cardDesc: { fontSize: 13, color: '#bbb', lineHeight: 18 },
  completedText: { color: '#666', textDecorationLine: 'line-through' },

  diffBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  easy: { backgroundColor: '#1E3A5F' },
  medium: { backgroundColor: '#5D4037' },
  hard: { backgroundColor: '#421C1C' },
  diffText: { fontSize: 10, fontWeight: '700', color: '#fff' },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoText: { marginLeft: 8, fontSize: 12, color: '#555' },
});
