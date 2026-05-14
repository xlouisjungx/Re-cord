import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// 안드로이드에서 LayoutAnimation 활성화
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HEADER_HEIGHT = Constants.statusBarHeight + 130;

// 친구별 리포트 데이터 구조
const friendsData = [
  {
    id: '1',
    name: '김레코드',
    score: 94,
    tag: '환상의 페어링',
    good: '현식님의 체계적인 공학적 사고와 김레코드님의 섬세한 기록 습관이 만나면 데이터의 누수 없는 완벽한 아카이빙이 가능합니다. 특히 프로젝트 초기 설계 단계에서 엄청난 속도를 낼 수 있는 조합이에요.',
    better:
      '두 분 모두 결과물에 대한 기준이 높아 자칫 서로를 피로하게 만들 수 있습니다. 80%의 완성도에서 한 번 끊어가는 연습을 함께한다면 더 장기적인 협업이 가능할 거예요.',
    matchPoint: '기술적 집요함, 기록의 가치 공유, 높은 미적 기준',
  },
  {
    id: '2',
    name: '이디자인',
    score: 82,
    tag: '창의적 조력자',
    good: '현식님이 구현한 기능 위에 이디자인님의 시각적 감각이 입혀지면 사용자 경험이 극대화됩니다. 논리와 감성의 밸런스가 매우 훌륭한 관계입니다.',
    better:
      '구현 가능성과 디자인적 화려함 사이에서 의견 차이가 생길 수 있습니다. "왜" 이 기능이 필요한지에 대해 먼저 합의하는 과정이 필요합니다.',
    matchPoint: '상호 보완적 역량, 명확한 역할 분담, 새로운 시도 선호',
  },
];

export default function BlendScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'request' | 'loading' | 'result'>(
    'request',
  );
  const [progress] = useState(new Animated.Value(0));
  const [percent, setPercent] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>('1'); // 기본적으로 첫 번째 리포트 오픈

  const handleAccept = () => {
    setStatus('loading');
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const listener = progress.addListener(({ value }) => {
      setPercent(Math.floor(value * 100));
    });

    setTimeout(() => {
      progress.removeListener(listener);
      setStatus('result');
    }, 3000);
  };

  // 아코디언 토글 함수
  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.fullContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.profileArea}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#2D3436" />
          </View>
          <Text style={styles.profileName}>현식님</Text>
          <Text style={styles.mbtiTag}>관계 시너지 센터</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {status === 'request' && (
          <View style={styles.requestCard}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
            <Ionicons name="mail-unread-outline" size={44} color="#6C5CE7" />
            <Text style={styles.requestText}>
              <Text style={{ fontWeight: '800' }}>김레코드님</Text>이{'\n'}함께
              알아가보자고 합니다!
            </Text>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.declineBtn]}
                onPress={() => router.replace('/(tabs)')}
              >
                <Text style={styles.declineBtnText}>거절</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.acceptBtn]}
                onPress={handleAccept}
              >
                <Text style={styles.acceptBtnText}>수락</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {status === 'result' && (
          <View>
            <Text style={styles.title}>블렌드 리포트</Text>
            {friendsData.map((friend) => (
              <View key={friend.id} style={styles.accordionContainer}>
                <TouchableOpacity
                  style={[
                    styles.accordionHeader,
                    expandedId === friend.id && styles.activeHeader,
                  ]}
                  onPress={() => toggleAccordion(friend.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.row}>
                    <Text style={styles.friendName}>현식 + {friend.name}</Text>
                    <View style={styles.miniBadge}>
                      <Text style={styles.miniBadgeText}>{friend.score}%</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedId === friend.id ? 'chevron-up' : 'chevron-down'
                    }
                    size={20}
                    color={expandedId === friend.id ? '#6C5CE7' : '#B2BEC3'}
                  />
                </TouchableOpacity>

                {expandedId === friend.id && (
                  <View style={styles.accordionContent}>
                    <View style={styles.scoreSection}>
                      <Text style={styles.scoreText}>{friend.score}%</Text>
                      <Text style={styles.tagText}>{friend.tag}</Text>
                    </View>

                    <View style={styles.infoBox}>
                      <Text style={styles.infoTitle}>💎 핵심 매칭 포인트</Text>
                      <Text style={styles.infoText}>{friend.matchPoint}</Text>
                    </View>

                    <View style={styles.detailSection}>
                      <Text style={styles.detailLabel}>시너지 포인트 ✨</Text>
                      <Text style={styles.detailBody}>{friend.good}</Text>
                    </View>

                    <View style={styles.detailSection}>
                      <Text style={styles.detailLabel}>
                        주의가 필요한 점 🔍
                      </Text>
                      <Text style={styles.detailBody}>{friend.better}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 분석 중 모달 */}
      <Modal visible={status === 'loading'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>데이터 분석 중</Text>
            <Text style={styles.modalSub}>
              현식님과 김레코드님의{'\n'}협업 로그를 대조하고 있습니다.
            </Text>
            <View style={styles.gaugeBg}>
              <Animated.View
                style={[styles.gaugeFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.percentText}>{percent}%</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#FBFBFE' },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight + 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D3436',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: Constants.statusBarHeight + 35,
  },
  profileArea: { alignItems: 'center' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: { fontWeight: '700', fontSize: 18, color: '#fff' },
  mbtiTag: { fontSize: 12, color: '#A29BFE' },

  // 요청 카드
  requestCard: {
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  badge: {
    backgroundColor: '#FF7675',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 15,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  requestText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 26,
    color: '#2D3436',
  },
  btnRow: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    minWidth: 100,
    alignItems: 'center',
  },
  acceptBtn: { backgroundColor: '#6C5CE7' },
  acceptBtnText: { color: '#fff', fontWeight: '700' },
  declineBtn: { backgroundColor: '#F1F2F6' },
  declineBtnText: { color: '#636E72', fontWeight: '700' },

  // 아코디언 리포트
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    color: '#2D3436',
  },
  accordionContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F2F6',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  activeHeader: { borderBottomWidth: 1, borderBottomColor: '#F1F2F6' },
  row: { flexDirection: 'row', alignItems: 'center' },
  friendName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginRight: 10,
  },
  miniBadge: {
    backgroundColor: '#E0E0FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  miniBadgeText: { fontSize: 12, color: '#6C5CE7', fontWeight: '700' },

  // 리포트 상세 내용
  accordionContent: { padding: 20, backgroundColor: '#fff' },
  scoreSection: { alignItems: 'center', marginBottom: 20 },
  scoreText: { fontSize: 44, fontWeight: '900', color: '#6C5CE7' },
  tagText: { fontSize: 14, color: '#A29BFE', fontWeight: '700' },
  infoBox: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
    color: '#2D3436',
  },
  infoText: { fontSize: 13, color: '#636E72' },
  detailSection: { marginBottom: 15 },
  detailLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 6,
  },
  detailBody: { fontSize: 14, lineHeight: 22, color: '#636E72' },

  // 모달
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  modalSub: {
    textAlign: 'center',
    color: '#636E72',
    marginBottom: 30,
    lineHeight: 20,
  },
  gaugeBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gaugeFill: { height: '100%', backgroundColor: '#6C5CE7' },
  percentText: { fontSize: 18, fontWeight: '700', color: '#6C5CE7' },
});
