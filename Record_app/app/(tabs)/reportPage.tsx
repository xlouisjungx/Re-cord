import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
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
import { useLogs } from '../context/LogContext';

const { width, height } = Dimensions.get('window');

export default function ReportScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('하루');

  // 전역 상태에서 리포트 목록과 동적 생성 기능 연동
  const { reports, generateDynamicReport, deleteReportState } = useLogs();

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

  const handleGenerate = () => {
    generateDynamicReport(selectedPeriod);
  };

  const deleteReport = (id: number) => {
    Alert.alert('리포트 삭제', '이 리포트를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteReportState(id),
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
            <Text style={styles.mbtiTag}>패턴 분석 리포트</Text>
          </View>
        </View>
        <Ionicons
          name="analytics"
          size={24}
          color="#EAB877"
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

        <TouchableOpacity style={styles.analyzeBtn} onPress={handleGenerate}>
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
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                >
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{report.period}</Text>
                  </View>

                  {report.mbtiTag && (
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: 'rgba(234, 184, 119, 0.15)',
                          borderColor: '#EAB877',
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          { color: '#EAB877', fontWeight: '700' },
                        ]}
                      >
                        {report.mbtiTag}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.dateText}>{report.date}</Text>
                <TouchableOpacity onPress={() => deleteReport(report.id)}>
                  <Ionicons name="trash-outline" size={20} color="#EAB877" />
                </TouchableOpacity>
              </View>

              <Text style={styles.insightText}>{report.insight}</Text>
              {/* 🌟 '심리적 안정도' 세션(graphContainer 영역) 전체 삭제 완료 */}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
