import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';

import styles from '../../css/blendPage';
import globalStyles from '../../css/globalStyles';

const { width, height } = Dimensions.get('window');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const friendsData = [
  {
    id: '1',
    name: '김레코드',
    score: 94,
    tag: '환상의 페어링',
    good: '현식님의 체계적인 공학적 사고와 김레코드님의 섬세한 기록 습관이 만나 완벽한 아카이빙이 가능합니다.',
    better:
      '둘 다 기준이 높아 피로할 수 있으니 80% 완성도에서 끊어가는 연습이 필요합니다.',
    matchPoint: '기술적 집요함, 기록의 가치 공유',
  },
  {
    id: '3',
    name: '박빌런',
    score: 3,
    tag: '극과 극의 평행선',
    good: '서로의 사고방식이 너무나 달라, 아예 새로운 시각을 강제로(?) 경험하게 해주는 자극제가 될 수 있습니다.',
    better:
      '사소한 단어 선택부터 가치관까지 충돌할 가능성이 매우 높습니다. 업무적 접점을 최소화하거나 제3의 중재자가 필수적입니다.',
    matchPoint: '희박한 공통점, 극단적인 소통 방식 차이',
  },
];

export default function BlendScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'request' | 'loading' | 'result'>(
    'request',
  );
  const [progress] = useState(new Animated.Value(0));
  const [percent, setPercent] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>('1');

  // 배경 애니메이션
  const moveAnim1 = useRef(
    new Animated.ValueXY({ x: width * 0.4, y: height * 0.2 }),
  ).current;
  const moveAnim2 = useRef(
    new Animated.ValueXY({ x: width * 0.2, y: height * 0.6 }),
  ).current;

  useEffect(() => {
    const createBouncingAnim = (anim: Animated.ValueXY) => {
      Animated.timing(anim, {
        toValue: {
          x: Math.random() * (width - 150),
          y: Math.random() * (height - 150),
        },
        duration: Math.random() * 3000 + 5000,
        useNativeDriver: false,
      }).start(() => createBouncingAnim(anim));
    };
    createBouncingAnim(moveAnim1);
    createBouncingAnim(moveAnim2);
  }, []);

  const handleAccept = () => {
    setStatus('loading');
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
    const listener = progress.addListener(({ value }) =>
      setPercent(Math.floor(value * 100)),
    );
    setTimeout(() => {
      progress.removeListener(listener);
      setStatus('result');
    }, 3000);
  };

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={globalStyles.recordBackground}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[globalStyles.topBlurCircle, moveAnim1.getLayout()]}
      />
      <Animated.View
        style={[globalStyles.bottomBlurCircle, moveAnim2.getLayout()]}
      />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>현식님</Text>
            <Text style={styles.mbtiTag}>관계 시너지 센터</Text>
          </View>
        </View>
        <Ionicons
          name="git-network"
          size={22}
          color="#FF4D4D"
          style={{ marginRight: 5 }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {status === 'request' && (
          <View style={styles.requestCard}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
            <Ionicons name="mail-unread-outline" size={48} color="#FF4D4D" />
            <Text style={styles.requestText}>
              <Text style={{ fontWeight: '800', color: '#fff' }}>
                김레코드님
              </Text>
              이{'\n'}블렌딩 요청을 보냈습니다!
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
                    <View
                      style={[
                        styles.miniBadge,
                        friend.score < 10 && { backgroundColor: '#331111' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.miniBadgeText,
                          friend.score < 10 && { color: '#FF4D4D' },
                        ]}
                      >
                        {friend.score}%
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedId === friend.id ? 'chevron-up' : 'chevron-down'
                    }
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>

                {expandedId === friend.id && (
                  <View style={styles.accordionContent}>
                    <View style={styles.scoreSection}>
                      <Text
                        style={[
                          styles.scoreText,
                          friend.score < 10 && { color: '#FF4D4D' },
                        ]}
                      >
                        {friend.score}%
                      </Text>
                      <Text style={styles.tagLabel}>{friend.tag}</Text>
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

      <Modal visible={status === 'loading'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>데이터 분석 중</Text>
            <Text style={styles.modalSub}>
              두 분의 협업 데이터를{'\n'}블렌딩하고 있습니다.
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
