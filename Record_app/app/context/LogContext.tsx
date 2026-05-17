import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LogItem {
  id: number;
  emotion: string;
  content: string;
  time: string;
}

export interface AnalysisReport {
  id: number;
  period: string;
  date: string;
  insight: string;
  score: number;
  mbtiTag?: string; // mbti 기반 반전 성향 배지용 태그
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
}

interface LogContextType {
  logs: LogItem[];
  mbti: string;
  setMbtiState: (mbti: string) => void;
  addLog: (emotion: string, content: string) => void;
  reports: AnalysisReport[];
  generateDynamicReport: (period: string) => void;
  deleteReportState: (id: number) => void;
  challenges: Challenge[];
  toggleChallengeComplete: (id: string) => void;
  blendStatus: 'request' | 'loading' | 'result';
  setBlendStatusState: (status: 'request' | 'loading' | 'result') => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [blendStatus, setBlendStatus] = useState<
    'request' | 'loading' | 'result'
  >('request');
  const [mbti, setMbti] = useState<string>('INFJ'); // 기본 매인 스팟 MBTI 설정

  // 최초 진입 시 보여줄 기본 가이드 미션
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'default_1',
      title: '첫 감정 기록하기',
      description:
        '오늘 하루의 감정을 메인 스크린에 기록하고 맞춤 미션을 받아보세요.',
      icon: 'book-outline',
      difficulty: 'Easy',
      completed: false,
    },
  ]);

  // 1. 새로운 감정 로그 추가 및 미션 실시간 동적 생성
  const addLog = (emotion: string, content: string) => {
    const newLog: LogItem = {
      id: Date.now(),
      emotion,
      content,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setLogs((prev) => [newLog, ...prev]);
    updateDynamicChallenges(emotion);
  };

  // 최근 감정에 따른 챌린지 분기문
  const updateDynamicChallenges = (latestEmotion: string) => {
    let newMissions: Challenge[] = [];

    if (latestEmotion === '분노') {
      newMissions = [
        {
          id: 'ang_1',
          title: '심호흡 4-7-8 법칙',
          description:
            '4초간 숨을 마시고, 7초 멈춘 뒤, 8초 동안 내쉬며 분노를 가라앉히세요.',
          icon: 'heart-outline',
          difficulty: 'Easy',
          completed: false,
        },
        {
          id: 'ang_2',
          title: '감정 분리 산책',
          description:
            '지금 즉시 자리를 벗어나 물리적으로 10분간 조용히 걸어보세요.',
          icon: 'walk-outline',
          difficulty: 'Medium',
          completed: false,
        },
      ];
    } else if (latestEmotion === '당황') {
      newMissions = [
        {
          id: 'puz_1',
          title: '오직 팩트만 한 줄 기록',
          description:
            '당황스러운 감정을 배제하고 발생한 주된 원인 사실만 담백하게 적어보세요.',
          icon: 'create-outline',
          difficulty: 'Easy',
          completed: false,
        },
        {
          id: 'puz_2',
          title: '중재자 혹은 조언자 찾기',
          description:
            '혼자 판단하기 어려운 변수이므로 신뢰하는 동료에게 상황을 공유해 피드백을 구하세요.',
          icon: 'chatbubble-ellipses-outline',
          difficulty: 'Medium',
          completed: false,
        },
      ];
    } else if (latestEmotion === '슬픔') {
      newMissions = [
        {
          id: 'sad_1',
          title: '온전한 위로의 음료',
          description:
            '내가 좋아하는 따뜻한 음료를 마시며 수고한 나 자신을 격려하세요.',
          icon: 'cafe-outline',
          difficulty: 'Easy',
          completed: false,
        },
        {
          id: 'sad_2',
          title: '나만의 디톡스 룸',
          description:
            '30분간 자극적인 스마트폰 알림을 끄고 조용한 음악 속에 머무르세요.',
          icon: 'moon-outline',
          difficulty: 'Hard',
          completed: false,
        },
      ];
    } else {
      // 평온
      newMissions = [
        {
          id: 'cal_1',
          title: '평온한 순간 리마인드',
          description:
            '지금 이 긍정적인 에너지를 다이어리나 캘린더에 짧게 박제해두세요.',
          icon: 'camera-outline',
          difficulty: 'Easy',
          completed: false,
        },
        {
          id: 'cal_2',
          title: '따뜻한 관조와 칭찬',
          description:
            '내면이 평화로울 때 주변 동료에게 사소하지만 기분 좋은 칭찬을 한 마디 건네세요.',
          icon: 'happy-outline',
          difficulty: 'Medium',
          completed: false,
        },
      ];
    }

    setChallenges(newMissions);
  };

  // 2. 사용자가 쌓은 감정로그 + 설정된 MBTI를 다각도로 연산하여 매칭 리포트 생성
  const generateDynamicReport = (period: string) => {
    if (logs.length === 0) {
      const emptyReport: AnalysisReport = {
        id: Date.now(),
        period,
        date: new Date().toLocaleDateString(),
        insight: `아직 축적된 행동 로그 데이터가 확인되지 않습니다. 메인 화면에서 오늘 느낀 감정과 상황을 기록하시면 현재 설정된 [${mbti}] 정서 프레임과 비교한 '진짜 모습 분석 리포트'가 해제됩니다.`,
        score: 50,
        mbtiTag: `${mbti} 가이드`,
      };
      setReports((prev) => [emptyReport, ...prev]);
      return;
    }

    const emotionCounts = logs.reduce(
      (acc, log) => {
        acc[log.emotion] = (acc[log.emotion] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const primaryEmotion = Object.keys(emotionCounts).reduce((a, b) =>
      emotionCounts[a] > emotionCounts[b] ? a : b,
    );

    const calmCount = emotionCounts['평온'] || 0;
    const computedScore = Math.floor((calmCount / logs.length) * 40) + 60;

    const mergedContent = logs.map((l) => l.content).join(' ');
    let calculatedInsight = `최근 누적된 행동 데이터 분석 결과, 현식님은 주로 [${primaryEmotion}]의 상태를 중심적으로 경험하셨습니다. `;
    let customMbtiTag = `이면의 ${mbti}`;

    if (mbti === 'INFJ') {
      if (
        primaryEmotion === '분노' ||
        mergedContent.includes('거절') ||
        mergedContent.includes('말했다') ||
        mergedContent.includes('이야기했다')
      ) {
        customMbtiTag = '외유내강형 INFJ';
        calculatedInsight += `보통 INFJ는 갈등을 극도로 꺼려 참아 넘기는 경향이 짙지만, 현식님은 주관이나 기준이 침범당했을 때 주저하지 않고 감정을 표출하거나 의사를 명확히 전달하는 단단한 면모를 보였습니다. 16가지 성격 유형의 획일화된 박스에 가둬둘 수 없는 '건강한 내면 방어선'이 돋보입니다.`;
      } else if (
        primaryEmotion === '당황' ||
        mergedContent.includes('갑자기') ||
        mergedContent.includes('계획')
      ) {
        customMbtiTag = '철저한 계획가 INFJ';
        calculatedInsight += `미래를 예측하고 조화를 추구하는 INFJ의 특성에 맞닿아 있어, 일상의 돌발 변수나 불합리한 흐름을 마주할 때 리스크 감지 레이더가 작동해 '당황'의 비율이 높아진 것으로 보입니다. 다만 상황을 한 발짝 떨어져 기록화하는 필터링 태도 자체가 매우 우수한 자아 성찰 역량입니다.`;
      } else if (primaryEmotion === '슬픔') {
        customMbtiTag = '초공감러 INFJ';
        calculatedInsight += `타인의 감정 동기나 환경적 결핍을 지나치게 깊이 흡수하여 내면 방전 상태에 이르렀을 가능성이 큽니다. 타인을 구제하려는 페르소나를 잠시 차단하고, 내 영혼을 먼저 수리하는 이기적인 고독의 시간을 확보하는 것을 추천합니다.`;
      } else {
        customMbtiTag = '균형 잡힌 INFJ';
        calculatedInsight += `인간관계와 업무 환경 사이에서 이상적인 밸런스를 유도해내고 있습니다. INFJ 특유의 깊은 직관력과 공학적 통찰이 고르게 어우러져 가장 편안하고 안전한 주파수에 안착해 있는 정서 상태입니다.`;
      }
    } else {
      customMbtiTag = `입체적 ${mbti}`;
      calculatedInsight += `통상적으로 알려진 ${mbti}의 전형적인 행동 지표와 달리, 현식님이 일상에 대응하고 감정을 묘사하는 문장들의 밀도는 훨씬 다채로운 개성을 내포하고 있습니다. 단순 텍스트 프레임 너머의 입체적인 진면목을 포착했습니다.`;
    }

    const newReport: AnalysisReport = {
      id: Date.now(),
      period: period,
      date: new Date().toLocaleDateString(),
      insight: calculatedInsight,
      score: Math.min(computedScore, 100),
      mbtiTag: customMbtiTag,
    };

    setReports((prev) => [newReport, ...prev]);
  };

  const deleteReportState = (id: number) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleChallengeComplete = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c)),
    );
  };

  return (
    <LogContext.Provider
      value={{
        logs,
        mbti,
        setMbtiState: setMbti,
        addLog, // 🌟 [핵심 수정] 여기에 제대로 주입해주어야 메인 스크린에서 구조 분해 할당이 작동합니다!
        reports,
        generateDynamicReport,
        deleteReportState,
        challenges,
        toggleChallengeComplete,
        blendStatus,
        setBlendStatusState: setBlendStatus,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

export function useLogs() {
  const context = useContext(LogContext);
  if (!context) throw new Error('useLogs must be used within a LogProvider');
  return context;
}
