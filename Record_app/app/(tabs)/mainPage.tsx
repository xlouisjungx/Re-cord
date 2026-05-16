import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';

import styles from '../../css/mainPage';
import globalStyles from '../../css/globalStyles';

const { width, height } = Dimensions.get('window');

interface LogItem {
  id: number;
  emotion: string;
  content: string;
  time: string;
}

export default function MainScreen() {
  const [selectedEmo, setSelectedEmo] = useState('평온');
  const [inputText, setInputText] = useState('');
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  // --- 튕기는 원 애니메이션 설정 ---
  const moveAnim1 = useRef(
    new Animated.ValueXY({ x: width * 0.1, y: height * 0.1 }),
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
        duration: Math.random() * 3000 + 5000,
        useNativeDriver: false,
      }).start(() => createBouncingAnim(anim));
    };
    createBouncingAnim(moveAnim1);
    createBouncingAnim(moveAnim2);
  }, []);

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
    setLogs([newLog, ...logs]);
    setInputText('');
  };

  return (
    <View style={globalStyles.recordBackground}>
      {/* 꽉 찬 화면을 위해 translucent와 backgroundColor 설정 필수 */}
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

      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.profileArea}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>현식님</Text>
            <Text style={styles.mbtiTag}>INFJ - 분석가</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.moreBtn}
        >
          <Ionicons name="grid-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>오늘의 행동 로그</Text>
        <Text style={styles.subtitle}>유형에 갇히지 않은 당신의 진짜 모습</Text>

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

        <View style={styles.inputBox}>
          <Text style={styles.label}>상황 및 행동</Text>
          <TextInput
            style={styles.input}
            placeholder="상상하던 일을 기록해보세요..."
            placeholderTextColor="#555"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitText}>심리 분석 및 저장</Text>
        </TouchableOpacity>

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
      </ScrollView>

      {/* 메뉴 모달 */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.dropDownMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/reportPage');
              }}
            >
              <Ionicons name="analytics-outline" size={18} color="#fff" />
              <Text style={styles.menuText}>패턴 분석 리포트</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/challengePage');
              }}
            >
              <Ionicons name="flash-outline" size={18} color="#fff" />
              <Text style={styles.menuText}>마이크로 챌린지</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/blendPage');
              }}
            >
              <Ionicons name="git-network-outline" size={18} color="#fff" />
              <Text style={styles.menuText}>관계 블렌드</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
