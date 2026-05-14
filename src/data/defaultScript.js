export const defaultNodes = [
  {
    id: 'start',
    type: 'scriptNode',
    position: { x: 300, y: 50 },
    data: {
      nodeType: 'start',
      title: '挨拶・自己紹介',
      text: 'お世話になります。株式会社〇〇の田中と申します。\n突然のお電話失礼いたします。\n少々よろしいでしょうか？',
    },
  },
  {
    id: 'hearing',
    type: 'scriptNode',
    position: { x: 300, y: 250 },
    data: {
      nodeType: 'talk',
      title: 'ヒアリング',
      text: 'ありがとうございます。\n現在、〇〇に関してお困りのことはございますか？\n弊社では△△というサービスをご提供しており、\n多くのお客様にご活用いただいております。',
    },
  },
  {
    id: 'objection-busy',
    type: 'scriptNode',
    position: { x: 50, y: 500 },
    data: {
      nodeType: 'objection',
      title: '「今忙しい」切り返し',
      text: 'お忙しいところ大変失礼いたしました。\n5分ほどでご説明できる内容ですので、\nよろしければ改めてお電話させていただけますか？',
    },
  },
  {
    id: 'appoint',
    type: 'scriptNode',
    position: { x: 550, y: 500 },
    data: {
      nodeType: 'talk',
      title: 'アポ打診',
      text: 'ありがとうございます。\n一度詳しいご説明の場を設けさせていただければと思いますが、\n来週のご都合はいかがでしょうか？',
    },
  },
  {
    id: 'retry',
    type: 'scriptNode',
    position: { x: 50, y: 750 },
    data: {
      nodeType: 'talk',
      title: '再アタック日程確認',
      text: 'かしこまりました。\nそれでは改めてご連絡させていただきます。\nいつ頃がよろしいでしょうか？',
    },
  },
  {
    id: 'schedule',
    type: 'scriptNode',
    position: { x: 550, y: 750 },
    data: {
      nodeType: 'talk',
      title: '日程確認・クロージング',
      text: 'ありがとうございます。\nそれでは〇月〇日〇時にお伺いさせていただきます。\nご担当の〇〇様にお会いすれば大丈夫でしょうか？',
    },
  },
  {
    id: 'end',
    type: 'scriptNode',
    position: { x: 300, y: 1000 },
    data: {
      nodeType: 'end',
      title: '通話終了',
      text: 'それでは、よろしくお願いいたします。\nご連絡いただき、ありがとうございました。',
    },
  },
];

export const defaultEdges = [
  { id: 'e1', source: 'start', target: 'hearing', label: '次へ' },
  { id: 'e2', source: 'hearing', target: 'objection-busy', label: '今忙しい' },
  { id: 'e3', source: 'hearing', target: 'appoint', label: '話は聞ける' },
  { id: 'e4', source: 'objection-busy', target: 'retry', label: 'OK、折り返しで' },
  { id: 'e5', source: 'objection-busy', target: 'end', label: '断られた' },
  { id: 'e6', source: 'appoint', target: 'schedule', label: '日程OKをもらえた' },
  { id: 'e7', source: 'appoint', target: 'objection-busy', label: 'やっぱり断られた' },
  { id: 'e8', source: 'retry', target: 'end', label: '日程決まった' },
  { id: 'e9', source: 'schedule', target: 'end', label: '確定' },
];
