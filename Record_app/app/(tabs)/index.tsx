import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HEADER_HEIGHT = Constants.statusBarHeight + 130;

// 로그 아이템의 타입 정의
interface LogItem {
  id: number;
  emotion: string;
  content: string;
  time: string;
}

export default function MainScreen() {
  const [selectedEmo, setSelectedEmo] = useState('평온');
  const [inputText, setInputText] = useState('');
  const [logs, setLogs] = useState<LogItem[]>([]); // 기록된 로그를 담는 배열
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    if (!inputText.trim()) return;

    const newLog: LogItem = {
      id: Date.now(),
      emotion: selectedEmo,
      content: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // 최신글이 위로 오도록 새로운 배열 생성
    setLogs([newLog, ...logs]);
    setInputText(''); // 입력창 초기화
  };

  return (
    <View style={styles.fullContainer}>
      <StatusBar barStyle="light-content" />

      {/* 헤더 영역 */}
      <View style={styles.header}>
        <View style={styles.profileArea}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#2D3436" />
          </View>
          <Text style={styles.profileName}>현식님</Text>
          <Text style={styles.mbtiTag}>INFJ - 분석가</Text>
        </View>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.moreBtn}
        >
          <Ionicons name="grid-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>오늘의 행동 로그</Text>
        <Text style={styles.subtitle}>유형에 갇히지 않은 당신의 진짜 모습</Text>

        {/* 감정 선택 영역 */}
        <View style={styles.emotionRow}>
          {['평온', '당황', '분노', '슬픔'].map((e) => (
            <TouchableOpacity
              key={e}
              onPress={() => setSelectedEmo(e)}
              style={[styles.emoBtn, selectedEmo === e && styles.selectedEmo]}
            >
              <Text
                style={
                  selectedEmo === e ? styles.selectedEmoText : styles.emoText
                }
              >
                {e}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 입력 영역 */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>상황 및 행동</Text>
          <TextInput
            style={styles.input}
            placeholder="상대방의 말투에 나도 모르게 차갑게 대답했다..."
            placeholderTextColor="#999"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitText}>심리 분석 및 저장</Text>
        </TouchableOpacity>

        {/* 로그 스택 (기록 남기기 영역) */}
        {logs.length > 0 && (
          <View style={styles.logStackContainer}>
            <Text style={styles.logStackTitle}>최근 기록</Text>
            {logs.map((log) => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.logCardHeader}>
                  <View style={styles.logTag}>
                    <Text style={styles.logTagText}>{log.emotion}</Text>
                  </View>
                  <Text style={styles.logTimeText}>{log.time}</Text>
                </View>
                <Text style={styles.logContentText}>{log.content}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 더보기 메뉴 모달 */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.dropDownMenu}>
            {/* 1. 패턴 분석 리포트 */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/report');
              }}
            >
              <Ionicons name="analytics-outline" size={18} color="#333" />
              <Text style={styles.menuText}>패턴 분석 리포트</Text>
            </TouchableOpacity>

            {/* 2. 마이크로 챌린지 */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/challenge');
              }}
            >
              <Ionicons name="flash-outline" size={18} color="#333" />
              <Text style={styles.menuText}>마이크로 챌린지</Text>
            </TouchableOpacity>

            {/* 3. 관계 블렌드 */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/blend');
              }}
            >
              <Ionicons name="git-network-outline" size={18} color="#333" />
              <Text style={styles.menuText}>관계 블렌드</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight + 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D3436',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
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
  profileName: { fontWeight: '800', fontSize: 18, color: '#fff' },
  mbtiTag: { fontSize: 12, color: '#A29BFE', fontWeight: '600' },
  moreBtn: {
    position: 'absolute',
    right: 25,
    top: Constants.statusBarHeight + 35,
  },
  title: { fontSize: 24, fontWeight: '800', marginTop: 30, color: '#1A1A1A' },
  subtitle: { color: '#7F8C8D', fontSize: 14, marginBottom: 25, marginTop: 5 },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  emoBtn: {
    paddingVertical: 14,
    borderRadius: 15,
    backgroundColor: '#F7F9FB',
    width: '23%',
    alignItems: 'center',
  },
  emoText: { color: '#7F8C8D', fontWeight: '600' },
  selectedEmo: { backgroundColor: '#6C5CE7' },
  selectedEmoText: { color: '#fff', fontWeight: '700' },
  inputBox: {
    backgroundColor: '#F7F9FB',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    color: '#6C5CE7',
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#2C3E50',
  },
  submitBtn: {
    backgroundColor: '#2D3436',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitText: { color: '#fff', fontWeight: '800' },

  // 로그 스택 스타일
  logStackContainer: { marginTop: 10 },
  logStackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  logCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logTag: {
    backgroundColor: '#E0DEFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  logTagText: { color: '#6C5CE7', fontSize: 12, fontWeight: '700' },
  logTimeText: { color: '#999', fontSize: 12 },
  logContentText: { fontSize: 15, color: '#444', lineHeight: 22 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  dropDownMenu: {
    position: 'absolute',
    top: HEADER_HEIGHT - 10,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 190,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  menuText: { marginLeft: 10, fontSize: 15, color: '#333' },
});
