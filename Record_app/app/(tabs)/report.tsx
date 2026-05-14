import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

const HEADER_HEIGHT = Constants.statusBarHeight + 130;

// 리포트 타입 정의
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

  // 분석 생성 함수 (하드코딩 데이터 기반 시뮬레이션)
  const generateReport = () => {
    const newReport: AnalysisReport = {
      id: Date.now(),
      period: selectedPeriod,
      date: new Date().toLocaleDateString(),
      insight: getDummyInsight(selectedPeriod),
      score: Math.floor(Math.random() * 40) + 60, // 60~100점 사이 랜덤
    };

    setReports([newReport, ...reports]);
  };

  // 분석 멘트 하드코딩 로직
  const getDummyInsight = (period: string) => {
    const insights = {
      하루: '오늘 당신은 외부 자극보다 내면의 평온을 유지하려 노력했습니다.',
      한달: '지난 한 달간 INFJ 특유의 공감 능력이 빛을 발했지만, 에너지 소모가 컸던 것으로 보입니다.',
      두달: '두 달 전과 비교했을 때, 감정 기복을 다스리는 능력이 약 15% 향상되었습니다.',
      직접입력:
        '지정된 기간 동안 당신은 계획적인 완벽주의 성향을 강하게 보였습니다.',
    };
    return (
      insights[period as keyof typeof insights] || '분석된 데이터가 부족합니다.'
    );
  };

  // 삭제 함수
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
          <Text style={styles.mbtiTag}>패턴 분석 리포트</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>기간별 분석하기</Text>

        {/* 기간 선택 버튼 그룹 */}
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
                  <Ionicons name="trash-outline" size={20} color="#FF7675" />
                </TouchableOpacity>
              </View>

              <Text style={styles.insightText}>{report.insight}</Text>

              {/* 간단한 그래프 바 */}
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

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#f5f7f9' },
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

  title: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 15,
    color: '#2D3436',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2D3436',
  },

  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  periodBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  selectedPeriodBtn: { backgroundColor: '#6C5CE7', borderColor: '#6C5CE7' },
  periodText: { fontSize: 12, color: '#777', fontWeight: '600' },
  selectedPeriodText: { color: '#fff' },

  analyzeBtn: {
    backgroundColor: '#2D3436',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  analyzeBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  divider: { height: 1, backgroundColor: '#ddd', marginBottom: 25 },

  reportCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  tag: {
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  tagText: { color: '#6C5CE7', fontSize: 12, fontWeight: '800' },
  dateText: { flex: 1, color: '#999', fontSize: 13 },

  insightText: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 20,
  },

  graphContainer: { marginTop: 10 },
  graphLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  graphLabel: { fontSize: 13, color: '#777', fontWeight: '600' },
  graphValue: { fontSize: 13, color: '#6C5CE7', fontWeight: '800' },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 4,
  },

  emptyCard: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#999', fontSize: 15 },
});
