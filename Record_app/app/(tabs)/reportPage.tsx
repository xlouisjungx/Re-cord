import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';

import styles from '../../css/reportPage';
import globalStyles from '../../css/globalStyles';

const { width, height } = Dimensions.get('window');

interface AnalysisReport {
  id: number;
  period: string;
  date: string;
  insight: string;
  score: number;
}

export default function ReportScreen() {
  const router = useRouter();
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('하루');

  // --- 배경 애니메이션 (메인과 동일한 무드 유지) ---
  const moveAnim1 = useRef(
    new Animated.ValueXY({ x: width * 0.7, y: height * 0.1 }),
  ).current;
  const moveAnim2 = useRef(
    new Animated.ValueXY({ x: width * 0.1, y: height * 0.8 }),
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

  const generateReport = () => {
    const newReport: AnalysisReport = {
      id: Date.now(),
      period: selectedPeriod,
      date: new Date().toLocaleDateString(),
      insight: getDummyInsight(selectedPeriod),
      score: Math.floor(Math.random() * 40) + 60,
    };
    setReports([newReport, ...reports]);
  };

  const getDummyInsight = (period: string) => {
    const insights = {
      하루: '오늘 당신은 외부 자극보다 내면의 평온을 유지하려 노력했습니다.',
      한달: '지난 한 달간 INFJ 특유의 공감 능력이 빛을 발했지만 에너지가 소모되었습니다.',
      두달: '두 달 전과 비교했을 때, 감정 기복 다스리는 능력이 15% 향상되었습니다.',
      직접입력:
        '지정 기간 동안 당신은 계획적인 완벽주의 성향을 강하게 보였습니다.',
    };
    return insights[period as keyof typeof insights] || '데이터가 부족합니다.';
  };

  const deleteReport = (id: number) => {
    Alert.alert('리포트 삭제', '이 리포트를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setReports(reports.filter((r) => r.id !== id)),
      },
    ]);
  };

  return (
    <View style={globalStyles.recordBackground}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 배경 애니메이션 원 */}
      <Animated.View
        style={[globalStyles.topBlurCircle, moveAnim1.getLayout()]}
      />
      <Animated.View
        style={[globalStyles.bottomBlurCircle, moveAnim2.getLayout()]}
      />

      {/* 헤더 영역 (mainPage와 동일한 슬림 디자인) */}
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
            <Text style={styles.mbtiTag}>패턴 분석 리포트</Text>
          </View>
        </View>
        <Ionicons
          name="analytics"
          size={24}
          color="#FF4D4D"
          style={{ marginRight: 5 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>기간별 분석하기</Text>

        <View style={styles.periodRow}>
          {['하루', '한달', '두달', '직접입력'].map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setSelectedPeriod(p)}
              style={[
                styles.periodBtn,
                selectedPeriod === p && styles.selectedPeriodBtn,
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === p && styles.selectedPeriodText,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.analyzeBtn} onPress={generateReport}>
          <Text style={styles.analyzeBtnText}>
            {selectedPeriod} 데이터 리포트 생성
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.subTitle}>분석 리포트 스택</Text>

        {reports.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>아직 생성된 리포트가 없습니다.</Text>
          </View>
        ) : (
          reports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.cardHeader}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{report.period}</Text>
                </View>
                <Text style={styles.dateText}>{report.date}</Text>
                <TouchableOpacity onPress={() => deleteReport(report.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF4D4D" />
                </TouchableOpacity>
              </View>

              <Text style={styles.insightText}>{report.insight}</Text>

              <View style={styles.graphContainer}>
                <View style={styles.graphLabelRow}>
                  <Text style={styles.graphLabel}>심리적 안정도</Text>
                  <Text style={styles.graphValue}>{report.score}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${report.score}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
