import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';

import styles from '../../css/challengePage';
import globalStyles from '../../css/globalStyles';
import { useLogs } from '../context/LogContext';

const { width, height } = Dimensions.get('window');

export default function ChallengeScreen() {
  const router = useRouter();

  // 전역 상태에서 챌린지 리스트와 완료 토글 함수 가져오기
  const { challenges, toggleChallengeComplete } = useLogs();

  const moveAnim1 = useRef(
    new Animated.ValueXY({ x: width * 0.2, y: height * 0.2 }),
  ).current;
  const moveAnim2 = useRef(
    new Animated.ValueXY({ x: width * 0.6, y: height * 0.7 }),
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
            onPress={() => router.replace('/mainPage')}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>현식님</Text>
            <Text style={styles.mbtiTag}>성장 챌린지</Text>
          </View>
        </View>
        {/* 🌟 수정: 헤더 번개 아이콘 색상 RED -> GOLD */}
        <Ionicons
          name="flash"
          size={24}
          color="#EAB877"
          style={{ marginRight: 5 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.title}>오늘의 미션</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {challenges.length > 1 || challenges[0]?.id !== 'default_1'
                ? 'AI 분석 완료'
                : '대기 중'}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          최근 리포트를 바탕으로 생성된 맞춤 챌린지입니다.
        </Text>

        {challenges.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, item.completed && styles.completedCard]}
            onPress={() => toggleChallengeComplete(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardIcon}>
              {/* 🌟 수정: 미완료 미션의 기본 아이콘 컬러 RED -> GOLD */}
              <Ionicons
                name={item.completed ? 'checkmark-circle' : (item.icon as any)}
                size={28}
                color={item.completed ? '#00B894' : '#EAB877'}
              />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <Text
                  style={[
                    styles.cardTitle,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.title}
                </Text>
                <View
                  style={[
                    styles.diffBadge,
                    styles[
                      item.difficulty.toLowerCase() as
                        | 'easy'
                        | 'medium'
                        | 'hard'
                    ],
                  ]}
                >
                  <Text style={styles.diffText}>{item.difficulty}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.cardDesc,
                  item.completed && styles.completedText,
                ]}
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {challenges.length > 0 && (
          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#555"
            />
            <Text style={styles.infoText}>
              챌린지를 완료하면 내면 성장 포인트가 적립됩니다.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
