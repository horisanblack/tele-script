export const gittyNodes = [
  {
    id: 'start',
    type: 'scriptNode',
    position: { x: 400, y: 50 },
    data: {
      nodeType: 'start',
      title: 'オープニング（担当者接続後）',
      text: '採用のご担当者様でいらっしゃいますか？\nGittyというエンジニア採用サービスの\nご案内でお電話しております。\n\n実は今、御社のエリアで\n新卒の候補者が10名、\n転職希望の方が20名いらっしゃいまして、\nそのご案内でご連絡しました。',
    },
  },
  {
    id: 'hearing',
    type: 'scriptNode',
    position: { x: 400, y: 300 },
    data: {
      nodeType: 'talk',
      title: 'ヒアリング（課題を引き出す）',
      text: 'エンジニアの採用は今進めていらっしゃいますか？\n\n（YES）\n採用を進める中で、\n応募自体が少ないとかお困りではないですか？',
    },
  },
  {
    id: 'pitch',
    type: 'scriptNode',
    position: { x: 400, y: 570 },
    data: {
      nodeType: 'talk',
      title: '課題確認後のピッチ',
      text: 'やはりそうですよね。\nエンジニアの採用って求人を出しても\nなかなか応募が来ないとお声をよくいただきます。\n\nGittyの場合、先ほどお伝えした\n御社エリアの候補者に直接アプローチできるので、\n"待つ採用"ではなく"取りに行く採用"ができます。\n\nしかも完全成果報酬なので、\n採用が決まるまで一切費用はかかりません。',
    },
  },
  {
    id: 'appoint',
    type: 'scriptNode',
    position: { x: 400, y: 860 },
    data: {
      nodeType: 'talk',
      title: 'アポ打診',
      text: '一度、御社エリアの候補者リストを見ながら\n15分ほどオンラインでご説明させてください。\n\nもし合わなければ無理にとは申しません。\n来週のご都合はいかがでしょうか？',
    },
  },
  {
    id: 'schedule',
    type: 'scriptNode',
    position: { x: 400, y: 1100 },
    data: {
      nodeType: 'talk',
      title: '日程確定・クロージング',
      text: 'ありがとうございます。\nそれでは〇月〇日〇時にオンラインでご説明いたします。\n\nご担当の〇〇様にお繋ぎいただければ大丈夫でしょうか？\nよろしくお願いいたします。',
    },
  },
  {
    id: 'end',
    type: 'scriptNode',
    position: { x: 400, y: 1340 },
    data: {
      nodeType: 'end',
      title: '通話終了',
      text: 'それでは、よろしくお願いいたします。\nご連絡いただき、ありがとうございました。',
    },
  },
  {
    id: 'obj-busy',
    type: 'scriptNode',
    position: { x: 40, y: 390 },
    data: {
      nodeType: 'objection',
      title: '「今忙しい」切り返し',
      text: 'お忙しいところ大変失礼いたしました。\n改めてご連絡させていただきます。\n\n来週でしたら火曜か木曜、\nどちらがご都合よろしいでしょうか？',
    },
  },
  {
    id: 'obj-other',
    type: 'scriptNode',
    position: { x: 40, y: 660 },
    data: {
      nodeType: 'objection',
      title: '「他の媒体使ってます」切り返し',
      text: 'ありがとうございます、どちらをお使いですか？\n\n（聞く）\n\nあちらは応募母集団の形成には強いですよね。\nGittyが違うのは"応募の前にスキルが見える"点で、\n書類選考の段階で技術力が確認できるため\nミスマッチが減ります。\n\n今お使いの媒体とは目的が違うので\n併用されているお客様が多く、\nしかも完全成果報酬なので費用リスクもありません。',
    },
  },
  {
    id: 'obj-no-budget',
    type: 'scriptNode',
    position: { x: 40, y: 930 },
    data: {
      nodeType: 'objection',
      title: '「予算がない」切り返し',
      text: 'ご安心ください、完全成果報酬です。\n採用が決まった時だけ費用が発生する仕組みなので、\n初期費用も月額費用も一切かかりません。\n\n採用できなければ0円です。',
    },
  },
  {
    id: 'retry',
    type: 'scriptNode',
    position: { x: 40, y: 1150 },
    data: {
      nodeType: 'talk',
      title: '再アタック日程確認',
      text: 'かしこまりました。\nそれでは改めてご連絡させていただきます。\n\n来週でしたら火曜か木曜、\nどちらがご都合よろしいでしょうか？',
    },
  },
  {
    id: 'obj-no-plan',
    type: 'scriptNode',
    position: { x: 760, y: 480 },
    data: {
      nodeType: 'objection',
      title: '「採用予定がない」切り返し',
      text: 'そうですか、承知しました。\n\n今いる候補者の情報だけでも\nお送りしておきましょうか？\n\nエンジニアの採用って急に必要になることも多いので、\n候補者のリストだけ持っておいていただくと\nいざという時に動けます。\n\nメールアドレスをいただけますか？',
    },
  },
  {
    id: 'obj-wrong-person',
    type: 'scriptNode',
    position: { x: 760, y: 720 },
    data: {
      nodeType: 'objection',
      title: '「担当が違う」切り返し',
      text: '失礼いたしました。\n採用のご判断をされているのは\nどなたになりますか？\n\nご紹介いただけますでしょうか。',
    },
  },
];

export const gittyEdges = [
  { id: 'g1',  source: 'start',           target: 'hearing',        label: '次へ' },
  { id: 'g2',  source: 'hearing',          target: 'pitch',          label: '課題あり・話聞ける' },
  { id: 'g3',  source: 'hearing',          target: 'obj-busy',       label: '今忙しい' },
  { id: 'g4',  source: 'hearing',          target: 'obj-other',      label: '他の媒体使ってます' },
  { id: 'g5',  source: 'hearing',          target: 'obj-no-plan',    label: '採用予定がない' },
  { id: 'g6',  source: 'hearing',          target: 'obj-wrong-person', label: '担当が違う' },
  { id: 'g7',  source: 'pitch',            target: 'appoint',        label: '興味あり' },
  { id: 'g8',  source: 'pitch',            target: 'obj-other',      label: '他媒体の話になった' },
  { id: 'g9',  source: 'pitch',            target: 'obj-no-budget',  label: '費用が心配' },
  { id: 'g10', source: 'obj-busy',         target: 'retry',          label: '折り返しOK' },
  { id: 'g11', source: 'obj-busy',         target: 'end',            label: '断られた' },
  { id: 'g12', source: 'obj-other',        target: 'appoint',        label: '興味持ってもらえた' },
  { id: 'g13', source: 'obj-other',        target: 'end',            label: 'やはり不要' },
  { id: 'g14', source: 'obj-no-budget',    target: 'appoint',        label: '成果報酬で納得' },
  { id: 'g15', source: 'obj-no-budget',    target: 'end',            label: 'それでも断られた' },
  { id: 'g16', source: 'obj-no-plan',      target: 'end',            label: '了解・後日連絡OK' },
  { id: 'g17', source: 'obj-wrong-person', target: 'end',            label: '担当者に繋いでもらった' },
  { id: 'g18', source: 'appoint',          target: 'schedule',       label: '日程OKをもらえた' },
  { id: 'g19', source: 'appoint',          target: 'retry',          label: 'やっぱり難しい' },
  { id: 'g20', source: 'retry',            target: 'end',            label: '日程決まった' },
  { id: 'g21', source: 'schedule',         target: 'end',            label: '確定' },
];
