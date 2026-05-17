import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';

import styles from '../../css/mbtiAnalysisPage';
import globalStyles from '../../css/globalStyles';
import { useLogs } from '../context/LogContext'; // 전역 로그 컨텍스트 수신

const { width, height } = Dimensions.get('window');

// 🔍 텍스트 내 특정 단어의 등장 횟수를 카운트하는 헬퍼 함수 (중첩 누적용)
const countOccurrences = (text: string, keyword: string): number => {
  if (!text || !keyword) return 0;
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 정규식 이스케이프
  const regex = new RegExp(escapedKeyword, 'g');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

export default function MbtiAnalysisScreen() {
  const router = useRouter();
  const { logs } = useLogs(); // 실시간 연동 로그

  const baseMbti = 'INFJ';

  // 📊 실시간 행동 데이터 퍼센트 상태 (0% 초기화)
  const [stats, setStats] = useState({
    challenge: 0,
    social: 0,
    emotional: 0,
    rational: 0,
  });

  const [insightMessage, setInsightMessage] = useState(
    '오늘의 일과를 기록해 보세요. 고정된 성격 틀을 깨는 변화를 분석해 드립니다.',
  );

  // 🎬 그래프 바 애니메이션을 위한 레퍼런스 배열 선언
  const challengeAnim = useRef(new Animated.Value(0)).current;
  const socialAnim = useRef(new Animated.Value(0)).current;
  const emotionalAnim = useRef(new Animated.Value(0)).current;
  const rationalAnim = useRef(new Animated.Value(0)).current;

  // 📝 로그 분석 및 스탯 중첩 계산 부
  useEffect(() => {
    // 1. 로그가 없으면 전부 0% 및 초기 안내 메시지 세팅
    if (!logs || logs.length === 0) {
      setStats({ challenge: 0, social: 0, emotional: 0, rational: 0 });
      setInsightMessage(
        '아직 오늘 작성된 행동 로그가 없습니다. 메인 페이지에서 내면의 기록을 남겨 스탯을 깨워보세요!',
      );

      // 애니메이션도 0으로 리셋
      Animated.parallel([
        Animated.timing(challengeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(socialAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(emotionalAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(rationalAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
      return;
    }

    const totalLogsCount = logs.length;
    const combinedText = logs.map((l) => l.content).join(' ');

    // 2. 키워드별 중첩 카운팅 가중치 설계
    // [사회성/연결 키워드]
    const socialKeywords = [
      '만났다',
      '친구',
      '대화',
      '가족',
      '사람',
      '카페',
      '약속',
      '선배',
      '동기',
    ];
    const socialCount = socialKeywords.reduce(
      (acc, cur) => acc + countOccurrences(combinedText, cur),
      0,
    );

    // [도전/확장 키워드]
    const challengeKeywords = [
      '도전',
      '새로운',
      '처음',
      '시도',
      '시작',
      '공부',
      '프로젝트',
      '개발',
    ];
    const challengeCount = challengeKeywords.reduce(
      (acc, cur) => acc + countOccurrences(combinedText, cur),
      0,
    );

    // [감정/개방 키워드]
    const emotionalKeywords = [
      '우울',
      '슬픔',
      '기쁨',
      '행복',
      '설렘',
      '화남',
      '감동',
      '느꼈다',
      '생각',
    ];
    const emotionalCount = emotionalKeywords.reduce(
      (acc, cur) => acc + countOccurrences(combinedText, cur),
      0,
    );

    // 3. 중첩 스탯 스택 계산 공식 (최대 100% 상한선 적용)
    // 기록을 적을 때마다 개당 기본 가중치가 깔리고, 특정 키워드 중첩 횟수에 따라 배배로 스택 증가
    const nextChallenge = Math.min(
      totalLogsCount * 8 + challengeCount * 15,
      100,
    );
    const nextSocial = Math.min(totalLogsCount * 5 + socialCount * 15, 100);
    const nextEmotional = Math.min(
      totalLogsCount * 10 + emotionalCount * 12,
      100,
    );

    // 이성 몰입도는 기록된 총 텍스트 길이에 정밀하게 비례하여 중첩 빌드업
    const nextRational = Math.min(
      totalLogsCount * 5 + Math.floor(combinedText.length * 0.15),
      100,
    );

    // 상태 업데이트
    setStats({
      challenge: nextChallenge,
      social: nextSocial,
      emotional: nextEmotional,
      rational: nextRational,
    });

    // 4. 수치 변화에 따른 게이지 액티브 애니메이션 구동
    Animated.parallel([
      Animated.timing(challengeAnim, {
        toValue: nextChallenge,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(socialAnim, {
        toValue: nextSocial,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(emotionalAnim, {
        toValue: nextEmotional,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(rationalAnim, {
        toValue: nextRational,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();

    // 5. 조건별 유동적 인사이트 메시지 매칭
    if (nextSocial > 50 || nextChallenge > 50) {
      setInsightMessage(
        `오늘 현식님은 고정된 [${baseMbti}]의 내향적 안전지대에 머무르지 않았습니다. 로그가 축적될수록 과감한 사교성과 확장성이 뚜렷하게 관측되며, 실제 행동 스택이 내면의 한계를 깨뜨리고 있음을 증명합니다.`,
      );
    } else {
      setInsightMessage(
        `현재까지 누적된 기록에 따르면 [${baseMbti}] 고유의 깊은 사색과 감정선을 정돈하는 정적인 에너지 레벨을 유지하고 있습니다. 나를 책임감 있게 회고하려는 안정적인 제어력이 돋보입니다.`,
      );
    }
  }, [logs]);

  // 배경 아우라 애니메이션 (기존 유지)
  const moveAnim1 = useRef(
    new Animated.ValueXY({ x: width * 0.1, y: height * 0.3 }),
  ).current;
  const moveAnim2 = useRef(
    new Animated.ValueXY({ x: width * 0.5, y: height * 0.6 }),
  ).current;

  useEffect(() => {
    const createBouncingAnim = (anim: Animated.ValueXY) => {
      Animated.timing(anim, {
        toValue: {
          x: Math.random() * (width - 150),
          y: Math.random() * (height - 150),
        },
        duration: Math.random() * 4000 + 6000,
        useNativeDriver: false,
      }).start(() => createBouncingAnim(anim));
    };
    createBouncingAnim(moveAnim1);
    createBouncingAnim(moveAnim2);
  }, []);

  return (
    <View style={globalStyles.recordBackground}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 배경 은하수 아우라 */}
      <Animated.View
        style={[globalStyles.topBlurCircle, moveAnim1.getLayout()]}
      />
      <Animated.View
        style={[globalStyles.bottomBlurCircle, moveAnim2.getLayout()]}
      />

      {/* 상단 슬림 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.replace('/mainPage')}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: '#fff' }]}>현식님</Text>
            <Text style={styles.mbtiTag}>다이내믹 아이덴티티</Text>
          </View>
        </View>
        <Ionicons
          name="git-branch-outline"
          size={22}
          color="#EAB877"
          style={{ marginRight: 5 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: '#fff' }]}>내면 행동 그래프</Text>
        <Text style={styles.subtitle}>
          고정된 유형에 갇히지 않는 실제 액션 분석 스택
        </Text>

        {/* 🔮 중앙 코어 및 스탯 그래프 섹션 */}
        <View style={styles.coreContainer}>
          <View style={styles.mbtiSphere}>
            <Text style={styles.mbtiCoreText}>{baseMbti}</Text>
          </View>

          <View style={styles.graphWrapper}>
            {/* 스탯 바 1: 외향적 확장 / 도전성 */}
            <View style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text style={[styles.statLabel, { color: '#fff' }]}>
                  외향적 확장 / 도전성
                </Text>
                <Text style={styles.statValueText}>{stats.challenge}%</Text>
              </View>
              <View style={styles.trackBg}>
                {/* 🌟 기존 View 스타일을 Animated.View로 변경하고 width 연동 */}
                <Animated.View
                  style={[
                    styles.fillBar,
                    {
                      width: challengeAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>

            {/* 스탯 바 2: 외부 연결 / 사교성 */}
            <View style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text style={[styles.statLabel, { color: '#fff' }]}>
                  외부 연결 / 사교성
                </Text>
                <Text style={styles.statValueText}>{stats.social}%</Text>
              </View>
              <View style={styles.trackBg}>
                <Animated.View
                  style={[
                    styles.fillBar,
                    {
                      width: socialAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>

            {/* 스탯 바 3: 내면 표출 / 감성 개방 */}
            <View style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text style={[styles.statLabel, { color: '#fff' }]}>
                  내면 표출 / 감성 개방
                </Text>
                <Text style={styles.statValueText}>{stats.emotional}%</Text>
              </View>
              <View style={styles.trackBg}>
                <Animated.View
                  style={[
                    styles.fillBar,
                    {
                      width: emotionalAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>

            {/* 스탯 바 4: 체계 분석 / 이성 몰입 */}
            <View style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text style={[styles.statLabel, { color: '#fff' }]}>
                  체계 분석 / 이성 몰입
                </Text>
                <Text style={styles.statValueText}>{stats.rational}%</Text>
              </View>
              <View style={styles.trackBg}>
                <Animated.View
                  style={[
                    styles.fillBar,
                    {
                      width: rationalAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* 📝 실시간 행동 양식 인사이트 분석 카드 */}
        <View style={styles.insightCard}>
          <View style={styles.insightTitleRow}>
            <Ionicons name="sparkles" size={16} color="#EAB877" />
            <Text style={styles.insightTitle}>
              Re:cord 실시간 액션 인사이트
            </Text>
          </View>
          <Text style={[styles.insightBody, { color: '#f5f5f5' }]}>
            {insightMessage}
          </Text>
        </View>

        {/* 🏠 하단 탈출구: 메인으로 돌아가기 버튼 */}
        <TouchableOpacity
          style={{
            backgroundColor: '#1E1E1E',
            borderWidth: 1,
            borderColor: '#333',
            borderRadius: 16,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            flexDirection: 'row',
            gap: 8,
          }}
          onPress={() => router.replace('/mainPage')}
        >
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
            오늘의 행동 로그 작성하러 가기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
