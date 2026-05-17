import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 알림이 도착했을 때 OS 상단에 띄우기 위한 기본 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * 🔔 듀오링고 스타일 미접속 알림 예약 함수 (공감형 서사 + 10초 단위 테스트 버전)
 */
export async function scheduleAngryNotifications() {
  // 1. 푸시 알림 권한 확인 및 요청
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('알림 권한 거부됨');
    return;
  }

  // 2. 기존에 예약되어 있던 미래의 알림들을 모두 취소 (테스트 진입 시마다 초기화)
  await Notifications.cancelAllScheduledNotificationsAsync();

  // 3. Android용 알림 채널 설정 (필수)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#EAB877',
    });
  }

  // 4. 🧪 빠른 테스트를 위한 10초 단위 스케줄링 설정
  const TEST_INTERVAL = 10;

  // 🌟 [10초 뒤 알림] - 단계 1: 깊은 공감과 다정한 문열기
  // 혼자 생각과 고민을 삼키고 있을 현식님을 다정하게 부르는 톤입니다.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '현식님, 오늘 마음의 무게는 어땠나요? 💭',
      body: '수많은 생각들을 혼자서만 삼키고 계신 건 아니죠? 갇혀있던 감정과 진짜 행동의 조각들을 Re:cord에 편하게 털어놓아 주세요.',
      sound: true,
    },
    trigger: {
      type: 'timeInterval',
      seconds: TEST_INTERVAL, // 10초 뒤
    },
  });

  // 🌟 [20초 뒤 알림] - 단계 2: 과몰입과 섭섭함의 경계
  // 현식님의 내면 기록을 누구보다 기다리는 분석기로서 서운함을 표현합니다.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '현식님의 소식이 없으면 제 그래프도 멈춰요 🤨',
      body: '누구보다 깊은 사색을 하실 분인 걸 알지만, 이렇게 기록이 끊기면 저는 현식님의 다이내믹한 변화를 찾아낼 수 없단 말이에요...',
      sound: true,
    },
    trigger: {
      type: 'timeInterval',
      seconds: TEST_INTERVAL * 2, // 20초 뒤
    },
  });

  // 🌟 [30초 뒤 알림] - 단계 3: 진심 어린 정색과 독촉 (듀오링고 기믹)
  // 겉으로는 차갑게 화내지만 속으로는 현식님의 성장을 가장 바라는 츤데레 형태의 메시지입니다.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '로그 적으라고 하트까지 보냈을 텐데요? 🔪',
      body: '안전지대에만 숨어 있으면 내면의 틀을 깰 수 없다고 스승님이 말씀드렸을 텐데요. 냉정해진 그래프가 보고 싶지 않다면 지금 당장 기록하세요.',
      sound: true,
    },
    trigger: {
      type: 'timeInterval',
      seconds: TEST_INTERVAL * 3, // 30초 뒤
    },
  });

  console.log(
    '🧪 테스트용 [공감형 서사] 10초/20초/30초 알림 예약이 성공적으로 완료되었습니다.',
  );
}
